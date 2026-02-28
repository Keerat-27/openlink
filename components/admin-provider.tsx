"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ProfileData, Link } from "@/lib/types";

type AdminContextType = {
  profile: ProfileData | null;
  updateProfile: (updates: Partial<ProfileData>) => void;
  links: Link[];
  setLinks: (links: Link[] | ((prev: Link[]) => Link[])) => void;
  updateLinkContext: (id: string, updates: Partial<Link>) => void;
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({
  children,
  initialProfile,
  initialLinks,
}: {
  children: ReactNode;
  initialProfile: ProfileData;
  initialLinks: Link[];
}) {
  const [profile, setProfileState] = useState<ProfileData>(initialProfile);
  const [links, setLinksState] = useState<Link[]>(initialLinks);

  useEffect(() => {
    setProfileState(initialProfile);
  }, [initialProfile]);

  useEffect(() => {
    setLinksState(initialLinks);
  }, [initialLinks]);

  const updateProfile = (updates: Partial<ProfileData>) => {
    setProfileState((prev) => ({ ...prev, ...updates }));
  };

  const updateLinkContext = (id: string, updates: Partial<Link>) => {
    setLinksState((prev) =>
      prev.map((link) => (link.id === id ? { ...link, ...updates } : link))
    );
  };

  return (
    <AdminContext.Provider
      value={{
        profile,
        updateProfile,
        links,
        setLinks: setLinksState,
        updateLinkContext,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
