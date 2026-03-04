"use client";

import { useAdmin } from "@/components/admin-provider";
import { Link2 } from "lucide-react";

export function MobilePreview() {
  const { profile, links } = useAdmin();

  if (!profile) return null;

  const activeLinks = links.filter((l) => l.is_active).sort((a, b) => a.order - b.order);

  // default theming if not set
  const bgColor = profile.bg_color || "#f3f4f6";
  const themeColor = profile.theme_color || "#09090b";
  
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
          borderRadius: '9999px'
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
    <div className="relative">
      {/* Glow effect behind phone */}
      <div className="absolute inset-0 bg-gradient-brand rounded-[3rem] blur-2xl opacity-20 scale-95" />
      
      {/* Phone frame */}
      <div className="relative w-[320px] h-[650px] rounded-[3rem] overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-white/10"
        style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))' }}
      >
        {/* Inner bezel */}
        <div className="absolute inset-[3px] rounded-[2.75rem] overflow-hidden">
          {/* Dynamic Island */}
          <div className="absolute top-3 inset-x-0 z-10 flex justify-center">
            <div className="h-[28px] w-[100px] bg-black rounded-full shadow-inner" />
          </div>

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
                className="w-24 h-24 rounded-full object-cover mb-4 ring-2 ring-white/50 shadow-lg"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-white/80 flex items-center justify-center mb-4 text-gray-400 ring-2 ring-white/50 shadow-lg">
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
                  className="flex w-full items-center justify-center px-4 py-4 text-sm font-semibold transition-all duration-200 hover:scale-[1.02] min-h-[50px] break-all shadow-sm"
                  style={getButtonStyle()}
                >
                  <span className="line-clamp-2 text-center">{link.title || "Untitled"}</span>
                </a>
              ))}
            </div>
            
            {/* Footer */}
            <div className="mt-8 pb-4 opacity-40">
              <Link2 className="w-5 h-5 text-gray-900" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
