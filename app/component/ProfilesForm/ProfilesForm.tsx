import styles from "./ProfilesForm.module.css";
import { useState } from "react";
import type { Profile } from "~/customTypes/Profile";
import ProfileCardForm from "@component/ProfileCardForm/ProfileCardForm";
import { Form, useNavigate } from "react-router";
import type { Route } from "../../routes/+types/create";
import { useProfiles } from "~/context/ProfileProvider";
// @ts-ignore - sounds.js doesn't have type definitions
import { mouseclick, woodClick } from "~/utils/sounds";

type ProfileProps = {
  round: number;
  name?: string;
};

const ProfilesForm = ({ round, name }: ProfileProps) => {
  const { profiles, setProfiles } = useProfiles();
  const [numberOfProfiles, setNumberOfProfiles] = useState<number>(
    profiles?.length || 5,
  );

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mouseclick();
    // Process form data here if needed
    const formData = new FormData(e.currentTarget);

    const names = formData.getAll("name");
    const pics = formData.getAll("pic") as File[];

    const updatedProfiles = names.map((name, index) => ({
      name: name.toString(),
      displayPicture:
        pics[index].size > 0
          ? URL.createObjectURL(pics[index])
          : profiles?.[index]?.displayPicture || null,
    }));

    setProfiles(updatedProfiles as Profile[]);

    navigate("/create/traits?step=1");
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
                <ProfileCardForm
                  key={index}
                  round={round}
                  profile={profiles?.[index] || null}
                />
              ))}
          </div>

          <button
            className={styles.addButton}
            type="button"
            onClick={() => {
              woodClick();
              setNumberOfProfiles((prev) => prev + 1);
            }}
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
