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

  const handleBgImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `bg-${Math.random()}.${fileExt}`;
      const filePath = `${profile.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      updateProfile({ bg_image_url: data.publicUrl });
      await supabase.from("profiles").update({ bg_image_url: data.publicUrl }).eq("id", profile.id);
    } catch (error) {
      console.error("Error uploading background image:", error);
      alert("Failed to upload image.");
    } finally {
      setIsUploading(false);
    }
  };

  const removeBgImage = async () => {
    updateProfile({ bg_image_url: null });
    await supabase.from("profiles").update({ bg_image_url: null }).eq("id", profile.id);
  };


  return (
    <div className="space-y-6 pb-10">
      {/* Profile Section */}
      <Card className="glass rounded-2xl shadow-xl shadow-black/10">
        <CardHeader className="p-6 md:p-8 pb-0">
          <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
            Profile Details
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 md:p-8 pt-0 space-y-6">
          <div className="flex items-center gap-6">
            <div className="relative h-24 w-24 rounded-full overflow-hidden flex items-center justify-center border border-white/10 shrink-0 bg-white/[0.04] ring-2 ring-white/[0.06]">
              {profile.avatar_url ? (
                <img src={profile.avatar_url} alt="Avatar" className="h-full w-full object-cover" />
              ) : (
                <span className="text-2xl font-bold text-muted-foreground">
                  {profile.display_name?.[0] || profile.username?.[0]?.toUpperCase()}
                </span>
              )}
              {isUploading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
                  <Loader2 className="h-6 w-6 animate-spin text-purple-400" />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Button variant="outline" className="relative cursor-pointer glass border-white/10 hover:bg-white/10 rounded-xl text-foreground transition-all duration-200">
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
              <p className="text-xs text-muted-foreground">Recommended size: 256x256px</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-foreground font-medium text-sm">Display Name</Label>
            <Input 
              defaultValue={profile.display_name || ""} 
              onBlur={(e) => handleBlur('display_name', e.target.value)}
              placeholder="Your Name"
              className="rounded-xl bg-white/5 border-white/10 shadow-none text-foreground placeholder:text-muted-foreground transition-all duration-300 focus-visible:border-purple-500/50 focus-visible:ring-purple-500/20 text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-foreground font-medium text-sm">Bio</Label>
            <Textarea 
              defaultValue={profile.bio || ""} 
              onBlur={(e) => handleBlur('bio', e.target.value)}
              placeholder="Tell us about yourself"
              className="resize-none rounded-xl bg-white/5 border-white/10 shadow-none text-foreground placeholder:text-muted-foreground transition-all duration-300 focus-visible:border-purple-500/50 focus-visible:ring-purple-500/20 text-sm"
              maxLength={150}
            />
          </div>
        </CardContent>
      </Card>

      {/* Theming Section */}
      <Card className="glass rounded-2xl shadow-xl shadow-black/10">
        <CardHeader className="p-6 md:p-8 pb-0">
          <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
            Theming
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 md:p-8 pt-0 space-y-8">
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-foreground font-medium text-sm">Background Color</Label>
              <div className="flex gap-3">
                <div className="h-10 w-10 rounded-xl border border-white/10 shadow-sm overflow-hidden shrink-0 ring-1 ring-white/5">
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
                  className="rounded-xl bg-white/5 border-white/10 shadow-none font-mono text-sm text-foreground transition-all duration-300 focus-visible:border-purple-500/50 focus-visible:ring-purple-500/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-foreground font-medium text-sm">Theme Color (Buttons/Text)</Label>
              <div className="flex gap-3">
                <div className="h-10 w-10 rounded-xl border border-white/10 shadow-sm overflow-hidden shrink-0 ring-1 ring-white/5">
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
                  className="rounded-xl bg-white/5 border-white/10 shadow-none font-mono text-sm text-foreground transition-all duration-300 focus-visible:border-purple-500/50 focus-visible:ring-purple-500/20"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-foreground font-medium text-sm">Background Image</Label>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              {profile.bg_image_url ? (
                <div className="relative h-24 w-full sm:w-48 rounded-xl overflow-hidden border border-white/10 shrink-0 bg-white/[0.04]">
                  <img src={profile.bg_image_url} alt="Background" className="h-full w-full object-cover" />
                </div>
              ) : (
                <div className="h-24 w-full sm:w-48 rounded-xl border border-dashed border-white/20 flex items-center justify-center bg-white/[0.02] shrink-0">
                  <span className="text-xs text-muted-foreground">No Image</span>
                </div>
              )}
              <div className="flex flex-col gap-2 w-full">
                <div className="flex gap-2">
                  <Button variant="outline" className="relative cursor-pointer glass border-white/10 hover:bg-white/10 rounded-xl text-foreground flex-1">
                    <UploadCloud className="h-4 w-4 mr-2" />
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBgImageUpload}
                      disabled={isUploading}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </Button>
                  {profile.bg_image_url && (
                    <Button variant="outline" onClick={removeBgImage} className="border-red-500/20 text-red-400 hover:bg-red-500/10 hover:border-red-500/30 rounded-xl">
                      Remove
                    </Button>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">Appears behind the card. Max 5MB.</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-foreground font-medium text-sm">Button Style</Label>
            <RadioGroup 
              defaultValue={profile.button_style || 'solid'} 
              onValueChange={(val) => handleBlur('button_style', val)}
              className="grid grid-cols-3 gap-4"
            >
              <div>
                <RadioGroupItem value="solid" id="solid" className="peer sr-only" />
                <Label
                  htmlFor="solid"
                  className="flex flex-col items-center justify-center rounded-xl border-2 border-transparent bg-white/[0.04] p-4 hover:bg-white/[0.08] peer-data-[state=checked]:border-purple-500/50 peer-data-[state=checked]:bg-purple-500/5 cursor-pointer transition-all duration-200 h-24"
                >
                  <div className="w-full h-8 bg-white/80 rounded-lg mb-2" />
                  <span className="text-xs font-semibold text-foreground">Solid</span>
                </Label>
              </div>

              <div>
                <RadioGroupItem value="outline" id="outline" className="peer sr-only" />
                <Label
                  htmlFor="outline"
                  className="flex flex-col items-center justify-center rounded-xl border-2 border-transparent bg-white/[0.04] p-4 hover:bg-white/[0.08] peer-data-[state=checked]:border-purple-500/50 peer-data-[state=checked]:bg-purple-500/5 cursor-pointer transition-all duration-200 h-24"
                >
                  <div className="w-full h-8 border-2 border-white/60 rounded-lg mb-2 bg-transparent" />
                  <span className="text-xs font-semibold text-foreground">Outline</span>
                </Label>
              </div>

              <div>
                <RadioGroupItem value="rounded" id="rounded" className="peer sr-only" />
                <Label
                  htmlFor="rounded"
                  className="flex flex-col items-center justify-center rounded-xl border-2 border-transparent bg-white/[0.04] p-4 hover:bg-white/[0.08] peer-data-[state=checked]:border-purple-500/50 peer-data-[state=checked]:bg-purple-500/5 cursor-pointer transition-all duration-200 h-24"
                >
                  <div className="w-full h-8 bg-white/80 rounded-full mb-2" />
                  <span className="text-xs font-semibold text-foreground">Rounded</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
