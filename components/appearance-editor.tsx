"use client";

import { useState } from "react";
import { useAdmin } from "@/components/admin-provider";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2, UploadCloud } from "lucide-react";

export function AppearanceEditor() {
  const { profile, updateProfile } = useAdmin();
  const [isUploading, setIsUploading] = useState(false);
  const supabase = createClient();

  if (!profile) return null;

  const handleBlur = async (field: keyof typeof profile, value: string) => {
    if (profile[field] === value) return;
    
    // Optimistic UI update
    updateProfile({ [field]: value });

    // Save to DB
    await supabase.from("profiles").update({ [field]: value }).eq("id", profile.id);
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${profile.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      updateProfile({ avatar_url: data.publicUrl });
      await supabase.from("profiles").update({ avatar_url: data.publicUrl }).eq("id", profile.id);
    } catch (error) {
      console.error("Error uploading avatar:", error);
      alert("Failed to upload image. Did you create the public 'avatars' storage bucket?");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Profile Section */}
      <Card className="bg-white border border-slate-200/60 shadow-[0_2px_8px_rgb(0,0,0,0.04)] rounded-2xl">
        <CardHeader className="p-6 md:p-8 pb-0">
          <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Profile Details</CardTitle>
        </CardHeader>
        <CardContent className="p-6 md:p-8 pt-0 space-y-6">
          <div className="flex items-center gap-6">
            <div className="relative h-24 w-24 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border shrink-0">
              {profile.avatar_url ? (
                <img src={profile.avatar_url} alt="Avatar" className="h-full w-full object-cover" />
              ) : (
                <span className="text-2xl font-bold text-gray-400">
                  {profile.display_name?.[0] || profile.username?.[0]?.toUpperCase()}
                </span>
              )}
              {isUploading && (
                <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Button variant="outline" className="relative cursor-pointer bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-900">
                <UploadCloud className="h-4 w-4 mr-2" />
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  disabled={isUploading}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </Button>
              <p className="text-xs text-slate-500">Recommended size: 256x256px</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-slate-900 font-medium text-sm">Display Name</Label>
            <Input 
              defaultValue={profile.display_name || ""} 
              onBlur={(e) => handleBlur('display_name', e.target.value)}
              placeholder="Your Name"
              className="rounded-xl border-slate-200 shadow-sm focus-visible:border-black focus-visible:ring-black transition-all bg-white text-sm text-slate-600"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-900 font-medium text-sm">Bio</Label>
            <Textarea 
              defaultValue={profile.bio || ""} 
              onBlur={(e) => handleBlur('bio', e.target.value)}
              placeholder="Tell us about yourself"
              className="resize-none rounded-xl border-slate-200 shadow-sm focus-visible:border-black focus-visible:ring-black transition-all bg-white text-sm text-slate-600"
              maxLength={150}
            />
          </div>
        </CardContent>
      </Card>

      {/* Theming Section */}
      <Card className="bg-white border border-slate-200/60 shadow-[0_2px_8px_rgb(0,0,0,0.04)] rounded-2xl md:-mt-2">
        <CardHeader className="p-6 md:p-8 pb-0">
          <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Theming</CardTitle>
        </CardHeader>
        <CardContent className="p-6 md:p-8 pt-0 space-y-8">
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-slate-900 font-medium text-sm">Background Color</Label>
              <div className="flex gap-3">
                <div className="h-10 w-10 rounded-xl border border-slate-200 shadow-sm overflow-hidden shrink-0">
                  <input 
                    type="color" 
                    defaultValue={profile.bg_color || "#f3f4f6"}
                    onBlur={(e) => handleBlur('bg_color', e.target.value)}
                    className="h-14 w-14 -m-2 cursor-pointer"
                  />
                </div>
                <Input 
                  defaultValue={profile.bg_color || "#f3f4f6"}
                  onBlur={(e) => handleBlur('bg_color', e.target.value)}
                  className="rounded-xl border-slate-200 shadow-sm focus-visible:border-black focus-visible:ring-black transition-all bg-white font-mono text-sm text-slate-600"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-900 font-medium text-sm">Theme Color (Buttons/Text)</Label>
              <div className="flex gap-3">
                <div className="h-10 w-10 rounded-xl border border-slate-200 shadow-sm overflow-hidden shrink-0">
                  <input 
                    type="color" 
                    defaultValue={profile.theme_color || "#09090b"}
                    onBlur={(e) => handleBlur('theme_color', e.target.value)}
                    className="h-14 w-14 -m-2 cursor-pointer"
                  />
                </div>
                <Input 
                  defaultValue={profile.theme_color || "#09090b"}
                  onBlur={(e) => handleBlur('theme_color', e.target.value)}
                  className="rounded-xl border-slate-200 shadow-sm focus-visible:border-black focus-visible:ring-black transition-all bg-white font-mono text-sm text-slate-600"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-slate-900 font-medium text-sm">Button Style</Label>
            <RadioGroup 
              defaultValue={profile.button_style || 'solid'} 
              onValueChange={(val) => handleBlur('button_style', val)}
              className="grid grid-cols-3 gap-4"
            >
              <div>
                <RadioGroupItem value="solid" id="solid" className="peer sr-only" />
                <Label
                  htmlFor="solid"
                  className="flex flex-col items-center justify-center rounded-xl border-2 border-transparent bg-gray-50 p-4 hover:bg-gray-100 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-colors h-24"
                >
                  <div className="w-full h-8 bg-zinc-900 rounded-lg mb-2" />
                  <span className="text-xs font-semibold">Solid</span>
                </Label>
              </div>

              <div>
                <RadioGroupItem value="outline" id="outline" className="peer sr-only" />
                <Label
                  htmlFor="outline"
                  className="flex flex-col items-center justify-center rounded-xl border-2 border-transparent bg-gray-50 p-4 hover:bg-gray-100 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-colors h-24"
                >
                  <div className="w-full h-8 border-2 border-zinc-900 rounded-lg mb-2 bg-white" />
                  <span className="text-xs font-semibold">Outline</span>
                </Label>
              </div>

              <div>
                <RadioGroupItem value="rounded" id="rounded" className="peer sr-only" />
                <Label
                  htmlFor="rounded"
                  className="flex flex-col items-center justify-center rounded-xl border-2 border-transparent bg-gray-50 p-4 hover:bg-gray-100 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-colors h-24"
                >
                  <div className="w-full h-8 bg-zinc-900 rounded-full mb-2" />
                  <span className="text-xs font-semibold">Rounded</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
