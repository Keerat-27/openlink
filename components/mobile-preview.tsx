"use client";

import { useAdmin } from "@/components/admin-provider";
import { Link2 } from "lucide-react";

export function MobilePreview() {
  const { profile, links } = useAdmin();

  if (!profile) return null;

  const activeLinks = links.filter((l) => l.is_active).sort((a, b) => a.order - b.order);

  // default theming if not set
  const bgColor = profile.bg_color || "#f3f4f6"; // gray-100
  const themeColor = profile.theme_color || "#09090b"; // zinc-950
  
  // button style
  const getButtonStyle = () => {
    switch(profile.button_style) {
      case 'outline':
        return {
          backgroundColor: 'transparent',
          border: `2px solid ${themeColor}`,
          color: themeColor,
          borderRadius: '12px'
        };
      case 'rounded':
        return {
          backgroundColor: themeColor,
          color: '#ffffff',
          borderRadius: '9999px' // full
        };
      default: // solid
        return {
          backgroundColor: themeColor,
          color: '#ffffff',
          borderRadius: '12px'
        };
    }
  }

  return (
    <div className="w-[320px] h-[650px] border-[10px] border-zinc-900 rounded-[3rem] overflow-hidden shadow-2xl relative shrink-0">
      {/* notch mockup */}
      <div className="absolute top-0 inset-x-0 h-6 bg-zinc-900 rounded-b-xl w-32 mx-auto z-10" />

      {/* Actual user page preview */}
      <div 
        className="w-full h-full overflow-y-auto px-6 pt-16 pb-12 flex flex-col items-center" 
        style={{ backgroundColor: bgColor }}
      >
        {/* Profile */}
        {profile.avatar_url ? (
          <img 
            src={profile.avatar_url} 
            alt={profile.display_name || profile.username}
            className="w-24 h-24 rounded-full object-cover mb-4"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-4 text-gray-400">
            <span className="text-xl font-bold">{profile.display_name?.[0] || profile.username[0].toUpperCase()}</span>
          </div>
        )}

        <h2 className="text-xl font-bold tracking-tight text-gray-900 mb-1">
          {profile.display_name || `@${profile.username}`}
        </h2>
        {profile.bio && (
          <p className="text-sm text-gray-600 text-center mb-6">{profile.bio}</p>
        )}

        {/* Links */}
        <div className="w-full space-y-3 mt-4 flex-1">
          {activeLinks.map((link) => (
            <a
              key={link.id}
              href={link.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center px-4 py-4 text-sm font-semibold transition-transform hover:scale-105 min-h-[50px] break-all"
              style={getButtonStyle()}
            >
              <span className="line-clamp-2 text-center">{link.title || "Untitled"}</span>
            </a>
          ))}
        </div>
        
        {/* Footer hidden or simple logo */}
        <div className="mt-8 pb-4 opacity-50">
          <Link2 className="w-5 h-5 text-gray-900" />
        </div>
      </div>
    </div>
  );
}
