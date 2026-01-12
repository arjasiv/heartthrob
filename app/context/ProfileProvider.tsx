import { useState, createContext, useContext, type ReactNode } from "react";
import type { Profile } from "~/customTypes/Profile";

const ProfilesContext = createContext<ProfilesContextType | null>(null);

interface ProfilesContextType {
  profiles: Profile[] | null;
  setProfiles: (profiles: Profile[]) => void;
}

export const ProfilesProvider = ({ children }: { children: ReactNode }) => {
  const [profiles, setProfiles] = useState<Profile[] | null>(null);

  return (
    <ProfilesContext.Provider value={{ profiles, setProfiles }}>
      {children}
    </ProfilesContext.Provider>
  );
};

export const useProfiles = (): ProfilesContextType => {
  const context = useContext(ProfilesContext);
  if (!context) {
    throw new Error("useProfiles must be used within a ProfilesProvider");
  }
  return context;
};
