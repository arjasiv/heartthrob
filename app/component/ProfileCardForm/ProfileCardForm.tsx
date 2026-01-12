import { traits } from "~/data/traits";
import styles from "./ProfileCardForm.module.css";
import { Rounds } from "~/enums/Rounds.enum";
import type { Route } from "../../routes/+types/game";
import type { Profile } from "~/customTypes/Profile";
import ImageUpload from "@component/ImageUpload/ImageUpload";
import { Form } from "react-router";

type ProfileProps = {
  round: number;
  profile?: Profile | null;
};

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return Number(params.round);
}

const ProfileCardForm = ({ round, profile }: ProfileProps) => {
  return (
    <div className={styles.profile}>
      <label>
        Name:
        <input
          className={styles.name}
          type="text"
          name="name"
          defaultValue={profile?.name || ""}
        />
      </label>
      <ImageUpload previewProp={profile?.displayPicture || null} />

      {/* <div className={styles.traits}>
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
      </div> */}
    </div>
  );
};

export default ProfileCardForm;
