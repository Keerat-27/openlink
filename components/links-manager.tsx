"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { GripVertical, Plus, Trash2 } from "lucide-react";

import {
  createLink,
  updateLink,
  deleteLink,
  reorderLinks,
} from "@/app/admin/actions";

import { useAdmin } from "@/components/admin-provider";
import { Link } from "@/lib/types";

export function LinksManager({ }: { initialLinks?: Link[] }) {
  const { links, setLinks } = useAdmin();
  const [isAdding, setIsAdding] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // minimum distance to activate 
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Removed initialLinks sync because AdminProvider handles it

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id && over) {
      setLinks((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);

        const newLinks = arrayMove(items, oldIndex, newIndex);
        
        // Update database (optimistic UI)
        const updates = newLinks.map((link, index) => ({
          id: link.id,
          order: index,
        }));
        reorderLinks(updates).catch(console.error);

        return newLinks;
      });
    }
  };

  const handleAddLink = async () => {
    try {
      setIsAdding(true);
      const newLink = await createLink();
      setLinks((prev) => [newLink, ...prev]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setLinks((prev) => prev.filter((link) => link.id !== id));
      await deleteLink(id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <Button
        onClick={handleAddLink}
        disabled={isAdding}
        className="w-full bg-black text-white hover:bg-slate-800 rounded-xl py-6 font-medium shadow-sm transition-all cursor-pointer"
      >
        <Plus className="mr-2 h-5 w-5" />
        Add Link
      </Button>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={links} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {links.map((link) => (
              <SortableLinkCard
                key={link.id}
                link={link}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

function SortableLinkCard({
  link,
  onDelete,
}: {
  link: Link;
  onDelete: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: link.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  const [title, setTitle] = useState(link.title || "");
  const [url, setUrl] = useState(link.url || "");
  const [isActive, setIsActive] = useState(link.is_active || false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleBlur = async () => {
    // only update if changed
    if (title !== link.title || url !== link.url) {
      await updateLink(link.id, { title, url });
    }
  };

  const handleSwitchChange = async (checked: boolean) => {
    setIsActive(checked);
    await updateLink(link.id, { is_active: checked });
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(link.id);
    setIsDeleting(false); // only needed if onDelete fails
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow group ${
        isDragging ? "ring-2 ring-black opacity-50 shadow-lg" : ""
      }`}
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="flex items-center justify-center cursor-grab active:cursor-grabbing text-slate-300 group-hover:text-slate-500 transition-colors"
      >
        <GripVertical className="h-5 w-5" />
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center gap-4">
        <div className="flex-1 flex flex-col gap-1">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleBlur}
            placeholder="Title"
            className="h-8 text-sm font-semibold bg-transparent border-transparent hover:border-slate-200 focus-visible:border-black focus-visible:ring-black rounded-lg shadow-none px-2 text-slate-900 transition-all"
          />
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onBlur={handleBlur}
            placeholder="URL"
            className="h-8 text-sm bg-transparent border-transparent hover:border-slate-200 focus-visible:border-black focus-visible:ring-black rounded-lg shadow-none px-2 text-slate-600 transition-all"
          />
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl cursor-pointer transition-colors h-9 w-9"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Switch checked={isActive} onCheckedChange={handleSwitchChange} />
        </div>
      </div>
    </div>
  );
}
