import styles from "./ProfilesForm.module.css";
import { traits } from "~/data/traits";
import { Rounds } from "~/enums/Rounds.enum";
import { useEffect, useState } from "react";
import ProfileCard from "@component/ProfileCard/ProfileCard";
import type { Profile } from "~/customTypes/Profile";
import ProfileCardForm from "@component/ProfileCardForm/ProfileCardForm";
import { Form, useNavigate } from "react-router";
import type { Route } from "../../routes/+types/create";
import { useProfiles } from "~/context/ProfileProvider";

type ProfileProps = {
  round: number;
  name?: string;
};

const ProfilesForm = ({ round, name }: ProfileProps) => {
  // const [profiles, setProfiles] = useState<Profile[]>([
  //   {
  //     name: "Jungkook",
  //     displayPicture: "/images/profile1.jpg",
  //     [Rounds.Personality]: "",
  //     [Rounds.HobbiesHabits]: "",
  //     [Rounds.RedFlags]: "",
  //     [Rounds.Aspirations]: "",
  //   },
  //   {
  //     name: "Namjoon",
  //     displayPicture: "/images/profile2.jpg",
  //     [Rounds.Personality]: "",
  //     [Rounds.HobbiesHabits]: "",
  //     [Rounds.RedFlags]: "",
  //     [Rounds.Aspirations]: "",
  //   },
  //   {
  //     name: "Tae",
  //     displayPicture: "/images/profile3.jpg",
  //     [Rounds.Personality]: "",
  //     [Rounds.HobbiesHabits]: "",
  //     [Rounds.RedFlags]: "",
  //     [Rounds.Aspirations]: "",
  //   },
  //   {
  //     name: "JK",
  //     displayPicture: "/images/profile1.jpg",
  //     [Rounds.Personality]: "",
  //     [Rounds.HobbiesHabits]: "",
  //     [Rounds.RedFlags]: "",
  //     [Rounds.Aspirations]: "",
  //   },
  //   {
  //     name: "Justin Seagull",
  //     displayPicture: "/images/profile1.jpg",
  //     [Rounds.Personality]: "",
  //     [Rounds.HobbiesHabits]: "",
  //     [Rounds.RedFlags]: "",
  //     [Rounds.Aspirations]: "",
  //   },
  // ]);

  // function generateUniquePositionLists(
  //   arrayCount: number, // how many arrays you want
  //   maxNumberValue: number // max number in the range (0 to maxNumberValue)
  // ): number[][] {
  //   const numberPool = Array.from({ length: maxNumberValue + 1 }, (_, i) => i);
  //   if (arrayCount > numberPool.length) {
  //     throw new Error(
  //       "arrayCount cannot be greater than the number of unique numbers in the pool"
  //     );
  //   }

  //   const result: number[][] = Array.from({ length: arrayCount }, () => []);

  //   for (let position = 0; position < 4; position++) {
  //     const shuffledPool = [...numberPool].sort(() => Math.random() - 0.5);
  //     for (let arrIndex = 0; arrIndex < arrayCount; arrIndex++) {
  //       result[arrIndex][position] = shuffledPool[arrIndex];
  //     }
  //   }

  //   return result;
  // }

  // useEffect(() => {
  //   const randomValues: number[][] = generateUniquePositionLists(
  //     profiles.length,
  //     profiles.length - 1
  //   );

  //   setProfiles(
  //     profiles.map((profile, index) => ({
  //       ...profile,
  //       [Rounds.Personality]:
  //         traits[Rounds.Personality][randomValues[index][0]],
  //       [Rounds.HobbiesHabits]:
  //         traits[Rounds.HobbiesHabits][randomValues[index][1]],
  //       [Rounds.RedFlags]: traits[Rounds.RedFlags][randomValues[index][2]],
  //       [Rounds.Aspirations]:
  //         traits[Rounds.Aspirations][randomValues[index][3]],
  //     }))
  //   );

  //   console.log("Profiles:", profiles);
  // }, []);

  const { profiles, setProfiles } = useProfiles();
  const [numberOfProfiles, setNumberOfProfiles] = useState<number>(
    profiles?.length || 5
  );

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Process form data here if needed
    const formData = new FormData(e.currentTarget);

    const names = formData.getAll("name");
    const pics = formData.getAll("pic") as File[];

    console.log(pics[0]);
    console.log(profiles?.[0].displayPicture);

    const updatedProfiles = names.map((name, index) => ({
      name: name.toString(),
      displayPicture:
        pics[index].size > 0
          ? URL.createObjectURL(pics[index])
          : profiles?.[index]?.displayPicture || null,
    }));

    console.log("Updated Profiles:", updatedProfiles);

    setProfiles(updatedProfiles as Profile[]);

    navigate("/create/traits");
  };

  return (
    <>
      <h2 className={styles.title}>The contenders</h2>
      <Form className={styles.form} onSubmit={handleSubmit} method="post">
        <div className={styles.containerWrapper}>
          <div className={styles.container}>
            {Array(numberOfProfiles)
              .fill(null)
              .map((_, index) => (
                <ProfileCardForm key={index} round={round} profile={profiles?.[index] || null} />
              ))}
          </div>
          <button
            className={styles.addButton}
            type="button"
            onClick={() => setNumberOfProfiles((prev) => prev + 1)}
          >
            +
          </button>
        </div>
        <button type="submit">Continue</button>
      </Form>
    </>
  );
};

export default ProfilesForm;
