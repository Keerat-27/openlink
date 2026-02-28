import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Link2 } from "lucide-react";
import type { Metadata } from "next";

// Helper to determine text color based on background luminance
function getContrastYIQ(hexColor: string) {
  const cleaned = hexColor.replace("#", "");

  if (cleaned.length !== 6) {
    return "#000000";
  }

  const r = parseInt(cleaned.substring(0, 2), 16);
  const g = parseInt(cleaned.substring(2, 4), 16);
  const b = parseInt(cleaned.substring(4, 6), 16);

  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  return yiq >= 128 ? "#000000" : "#ffffff";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const username = resolvedParams.username;
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name, bio, avatar_url")
    .eq("username", username)
    .single();

  if (!profile) {
    return {
      title: "User Not Found | OpenLink",
    };
  }

  const title = `${profile.display_name || username} | OpenLink`;
  const description =
    profile.bio ||
    `Check out ${profile.display_name || username}'s links on OpenLink.`;
  const ogImage = profile.avatar_url || "https://example.com/default-og.png";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "profile",
      url: `/${username}`,
      images: [
        {
          url: ogImage,
          width: 800,
          height: 800,
          alt: `${profile.display_name || username}'s avatar`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
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

  const buttonShapeClass =
    profile.button_style === "rounded" ? "rounded-full" : "rounded-2xl";

  const isOutline = profile.button_style === "outline";

  const getButtonStyle = () => {
    if (isOutline) {
      return {
        borderColor: themeColor,
        color: themeColor,
        backgroundColor: "rgba(255,255,255,0.08)",
      };
    }

    return {
      backgroundColor: themeColor,
      color: getContrastYIQ(themeColor),
    };
  };

  return (
    <div
      className="min-h-screen w-full bg-gradient-to-b from-black/5 via-black/0 to-black/10"
      style={{ backgroundColor: bgColor }}
    >
      <div className="mx-auto flex min-h-screen max-w-md flex-col px-6 pt-16 pb-12">
        <div className="relative flex flex-1 flex-col items-center justify-start text-center">
          {/* Ambient glow */}
          <div className="pointer-events-none absolute inset-x-6 -top-6 h-40 rounded-3xl bg-white/30 blur-3xl opacity-60" />

          {/* Card */}
          <div className="relative w-full rounded-[32px] border border-white/20 bg-white/70 p-8 shadow-[0_24px_60px_rgba(15,23,42,0.25)] backdrop-blur-2xl">
            {/* Profile */}
            <div className="flex flex-col items-center">
              {profile.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={profile.display_name || profile.username}
                  className="h-28 w-28 rounded-full object-cover shadow-xl ring-2 ring-white/70"
                />
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-slate-100 via-white to-slate-200 text-slate-500 shadow-xl ring-2 ring-white/70">
                  <span className="text-3xl font-bold">
                    {profile.display_name?.[0] ||
                      profile.username[0]?.toUpperCase()}
                  </span>
                </div>
              )}

              <h1
                className="mt-6 text-3xl font-extrabold tracking-tight"
                style={{ color: textColor }}
              >
                {profile.display_name || `@${profile.username}`}
              </h1>

              {profile.bio && (
                <p
                  className="mt-3 max-w-sm text-base leading-relaxed text-gray-700/80"
                  style={{ color: textColor, opacity: 0.8 }}
                >
                  {profile.bio}
                </p>
              )}
            </div>

            {/* Links */}
            <div className="mt-10 space-y-4">
              {activeLinks.length > 0 ? (
                activeLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`/api/click?linkId=${link.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={[
                      "group relative flex w-full items-center justify-center overflow-hidden px-6 py-4 text-lg font-semibold",
                      "text-center transition-all duration-300 cursor-pointer",
                      "shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-95",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
                      buttonShapeClass,
                      isOutline
                        ? "border-2 backdrop-blur-sm"
                        : "border border-black/5",
                    ].join(" ")}
                    style={getButtonStyle()}
                  >
                    <span className="relative z-10 break-words">
                      {link.title || "Untitled Link"}
                    </span>

                    {!isOutline && (
                      <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <span className="absolute inset-x-0 -top-6 h-16 bg-white/15 blur-2xl" />
                      </span>
                    )}
                  </a>
                ))
              ) : (
                <p
                  className="mt-6 text-sm text-gray-700/70"
                  style={{ color: textColor, opacity: 0.7 }}
                >
                  No links available yet.
                </p>
              )}
            </div>
          </div>

          {/* Brand footer */}
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-black/40 transition-opacity hover:opacity-100"
            style={{ color: textColor, opacity: 0.5 }}
          >
            <Link2 className="h-4 w-4" />
            <span>OpenLink</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
