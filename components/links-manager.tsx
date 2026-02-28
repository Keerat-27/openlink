"use client";

import { useState, useEffect } from "react";
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

export interface Link {
  id: string;
  profile_id: string;
  title: string | null;
  url: string | null;
  order: number;
  is_active: boolean;
  icon: string | null;
}

export function LinksManager({ initialLinks }: { initialLinks: Link[] }) {
  const [links, setLinks] = useState<Link[]>(initialLinks);
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

  useEffect(() => {
    setLinks(initialLinks);
  }, [initialLinks]);

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
    <div className="space-y-4">
      <Button
        onClick={handleAddLink}
        disabled={isAdding}
        className="w-full rounded-xl py-6 hover:bg-primary/90 cursor-pointer"
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
    <Card
      ref={setNodeRef}
      style={style}
      className={`border border-gray-200 shadow-sm rounded-2xl bg-white overflow-hidden ${
        isDragging ? "ring-2 ring-primary opacity-50 shadow-lg" : ""
      }`}
    >
      <CardContent className="p-0 flex">
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="flex items-center justify-center px-3 border-r bg-gray-50/50 hover:bg-gray-100 cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="h-5 w-5 text-gray-400" />
        </div>

        {/* Content */}
        <div className="flex-1 p-5 space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 space-y-3">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={handleBlur}
                placeholder="Title"
                className="text-sm font-semibold rounded-lg border-transparent hover:border-gray-200 focus-visible:border-gray-300 focus-visible:ring-0 shadow-none px-2"
              />
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onBlur={handleBlur}
                placeholder="URL"
                className="text-sm rounded-lg border-transparent hover:border-gray-200 focus-visible:border-gray-300 focus-visible:ring-0 shadow-none px-2 text-muted-foreground"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center gap-4 text-sm text-gray-500">
             {/* optional icons/badges could go here */}
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDelete}
                disabled={isDeleting}
                className="text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-colors h-9 w-9"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <Switch checked={isActive} onCheckedChange={handleSwitchChange} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
