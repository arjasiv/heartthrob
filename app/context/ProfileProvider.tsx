import { useState, createContext, useContext, type ReactNode } from "react";
import type { Profile } from "~/customTypes/Profile";
import type { Traits } from "~/customTypes/Traits";

const ProfilesContext = createContext<ProfilesContextType | null>(null);

interface ProfilesContextType {
  profiles: Profile[] | null;
  traits: Traits | null;
  setProfiles: (profiles: Profile[]) => void;
  setTraits: (traits: Traits) => void;
}

export const ProfilesProvider = ({ children }: { children: ReactNode }) => {
  const [profiles, setProfiles] = useState<Profile[] | null>(null);
  const [traits, setTraits] = useState<Traits | null>(null);

  return (
    <ProfilesContext.Provider
      value={{ profiles, setProfiles, traits, setTraits }}
    >
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
