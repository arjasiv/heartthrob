import { traits } from "~/data/traits";
import styles from "./ProfileCard.module.css";
import { Rounds } from "~/enums/Rounds.enum";
import type { Route } from "../../routes/+types/game";
import type { Profile } from "~/customTypes/Profile";

type ProfileProps = {
  round: number;
  profile: Profile;
};

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return Number(params.round);
}

const ProfileCard = ({ round, profile }: ProfileProps) => {
  if (!profile) {
    return;
  }

  console.log(profile.displayPicture);

  return (
    <div className={styles.profile}>
      <h3 className={styles.name}>{profile.name}</h3>
      {profile.displayPicture ? (
        <div className={styles.imgWrapper}>
          <img className={styles.img} src={profile.displayPicture}></img>
        </div>
      ) : (
        <div className={styles.imgWrapper}>
          Oops, you forgot to upload a photo
        </div>
      )}

      <div className={styles.traits}>
        {round >= 1 && (
          <div>
            <p>{profile.Personality}</p>
          </div>
        )}
        {round >= 2 && (
          <div>
            <p>{profile[Rounds.HobbiesHabits]}</p>
          </div>
        )}
        {round >= 3 && (
          <div>
            <p>{profile[Rounds.RedFlags]}</p>
          </div>
        )}
        {round == 4 && (
          <div>
            <p>{profile[Rounds.Aspirations]}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
