import styles from "./Profiles.module.css";
import ProfileCard from "@component/ProfileCard/ProfileCard";
import { useProfiles } from "~/context/ProfileProvider";

type ProfileProps = {
  round: number;
};

const Profiles = ({ round }: ProfileProps) => {
  const { profiles, setProfiles } = useProfiles();

  return (
    <div className={styles.container}>
      {profiles?.map((profile, index) => (
        <ProfileCard
          key={profile?.name || "" + index}
          round={round}
          profile={profile}
        />
      ))}
    </div>
  );
};

export default Profiles;
