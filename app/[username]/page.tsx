import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Link2 } from "lucide-react";
import { Metadata } from "next";

// Helper to determine text color based on background luminance
function getContrastYIQ(hexcolor: string) {
  // Remove hash if valid
  hexcolor = hexcolor.replace("#", "");
  
  // Parse hex
  const r = parseInt(hexcolor.substr(0, 2), 16);
  const g = parseInt(hexcolor.substr(2, 2), 16);
  const b = parseInt(hexcolor.substr(4, 2), 16);
  
  // Calculate relative luminance
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  
  // Return black or white depending on luminance
  return yiq >= 128 ? '#000000' : '#ffffff';
}

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const username = resolvedParams.username;
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name, bio")
    .eq("username", username)
    .single();

  if (!profile) {
    return {
      title: "User Not Found | OpenLink",
    };
  }

  return {
    title: `${profile.display_name || username} | OpenLink`,
    description: profile.bio || `Check out ${profile.display_name || username}'s links on OpenLink.`,
  };
}

export default async function PublicProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  const username = resolvedParams.username;
  const supabase = await createClient();

  // 1. Fetch Profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  if (!profile) {
    notFound();
  }

  // 2. Fetch Active Links
  const { data: links } = await supabase
    .from("links")
    .select("*")
    .eq("profile_id", profile.id)
    .eq("is_active", true)
    .order("order", { ascending: true });

  const activeLinks = links || [];

  // 3. Styling Configuration
  const bgColor = profile.bg_color || "#f3f4f6"; // gray-100 default
  const themeColor = profile.theme_color || "#09090b"; // zinc-950 default
  const textColor = getContrastYIQ(bgColor);

  const getButtonStyle = () => {
    switch (profile.button_style) {
      case "outline":
        return {
          backgroundColor: "transparent",
          border: `2px solid ${themeColor}`,
          color: themeColor,
          borderRadius: "12px",
        };
      case "rounded":
        return {
          backgroundColor: themeColor,
          color: getContrastYIQ(themeColor),
          borderRadius: "9999px",
        };
      default: // solid
        return {
          backgroundColor: themeColor,
          color: getContrastYIQ(themeColor),
          borderRadius: "12px",
        };
    }
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center py-16 px-4"
      style={{ backgroundColor: bgColor }}
    >
      <div className="w-full max-w-xl flex flex-col items-center">
        {/* Profile Info */}
        {profile.avatar_url ? (
          <img
            src={profile.avatar_url}
            alt={profile.display_name || profile.username}
            className="w-24 h-24 rounded-full object-cover mb-4 shadow-sm"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-4 text-gray-400 shadow-sm">
            <span className="text-2xl font-bold">
              {profile.display_name?.[0] || profile.username[0].toUpperCase()}
            </span>
          </div>
        )}

        <h1
          className="text-2xl font-bold tracking-tight mb-2 text-center"
          style={{ color: textColor }}
        >
          {profile.display_name || `@${profile.username}`}
        </h1>

        {profile.bio && (
          <p
            className="text-base text-center mb-8 px-4"
            style={{ color: textColor, opacity: 0.8 }}
          >
            {profile.bio}
          </p>
        )}

        {/* Links List */}
        <div className="w-full space-y-4">
          {activeLinks.length > 0 ? (
            activeLinks.map((link) => (
              <a
                key={link.id}
                href={link.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center px-6 py-4 text-base font-semibold transition-transform hover:scale-[1.02] active:scale-[0.98] min-h-[60px] shadow-sm break-all"
                style={getButtonStyle()}
              >
                <span className="text-center">{link.title || "Untitled Link"}</span>
              </a>
            ))
          ) : (
            <p
              className="text-center text-sm mt-8"
              style={{ color: textColor, opacity: 0.6 }}
            >
              No links available yet.
            </p>
          )}
        </div>

        {/* Branding Footer */}
        <Link
          href="/"
          className="mt-16 flex items-center gap-2 hover:opacity-100 transition-opacity"
          style={{ color: textColor, opacity: 0.5 }}
        >
          <Link2 className="w-5 h-5" />
          <span className="text-sm font-semibold tracking-tight">OpenLink</span>
        </Link>
      </div>
    </div>
  );
}
