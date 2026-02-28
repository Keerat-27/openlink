export interface ProfileData {
  id: string;
  username: string;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  theme_color: string | null;
  bg_color: string | null;
  button_style: string | null;
}

export interface Link {
  id: string;
  profile_id: string;
  title: string | null;
  url: string | null;
  order: number;
  is_active: boolean;
  icon: string | null;
}
