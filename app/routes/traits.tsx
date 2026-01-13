import { useState, useEffect } from "react";
import { Form, useNavigate, useSearchParams } from "react-router";
import type { Route } from "./+types/create";
import { useProfiles } from "~/context/ProfileProvider";
import { Rounds } from "~/enums/Rounds.enum";
import styles from "~/styles/Traits.module.css";
import { rounds } from "~/data/rounds";

// @ts-ignore - sounds.js doesn't have type definitions
import { mouseclick, keyboardclick, nextSound } from "~/utils/sounds";

import type { Traits } from "~/customTypes/Traits";

function generateUniquePositionLists(
  arrayCount: number, // how many arrays you want
  maxNumberValue: number // max number in the range (0 to maxNumberValue)
): number[][] {
  const numberPool = Array.from({ length: maxNumberValue + 1 }, (_, i) => i);
  if (arrayCount > numberPool.length) {
    throw new Error(
      "arrayCount cannot be greater than the number of unique numbers in the pool"
    );
  }

  const result: number[][] = Array.from({ length: arrayCount }, () => []);

  for (let position = 0; position < 4; position++) {
    const shuffledPool = [...numberPool].sort(() => Math.random() - 0.5);
    for (let arrIndex = 0; arrIndex < arrayCount; arrIndex++) {
      result[arrIndex][position] = shuffledPool[arrIndex];
    }
  }

  return result;
}
export default function Traits({ actionData }: Route.ComponentProps) {
  const [cont, setCont] = useState<boolean>(false);
  const { profiles, setProfiles, traits, setTraits } = useProfiles();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const activeFieldset = parseInt(searchParams.get("step") || "1") - 1;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (activeFieldset == 3) {
      nextSound();
    } else {
      mouseclick();
    }

    const formData = new FormData(e.currentTarget);

    const traitsInput = formData.getAll(rounds[activeFieldset]);
    console.log("handling submit");

    if (!profiles) return;

    const randomValues = generateUniquePositionLists(
      profiles.length,
      profiles.length - 1
    );

    const updatedTraits = {
      ...traits,
      [rounds[activeFieldset]]: Array.from(traitsInput),
    } as Traits;

    setTraits(updatedTraits);

    if (activeFieldset < 3) {
      setSearchParams({ step: (activeFieldset + 2).toString() });
      return;
    }

    setProfiles(
      profiles.map((profile, index) => ({
        ...profile,
        [Rounds.Personality]:
          updatedTraits[Rounds.Personality][randomValues[index][0]],
        [Rounds.HobbiesHabits]:
          updatedTraits[Rounds.HobbiesHabits][randomValues[index][1]],
        [Rounds.RedFlags]:
          updatedTraits[Rounds.RedFlags][randomValues[index][2]],
        [Rounds.Aspirations]:
          updatedTraits[Rounds.Aspirations][randomValues[index][3]],
      }))
    );

    navigate("/game/1");
  };

  return (
    <>
      <h2>Traits</h2>
      <Form className={styles.form} onSubmit={handleSubmit} method="post">
        <fieldset className={styles.inputWrapper}>
          <label htmlFor={rounds[activeFieldset]}>
            {rounds[activeFieldset]}
          </label>
          {profiles?.map((profile, index) => (
            <input
              key={rounds[activeFieldset] + index}
              type="text"
              id={rounds[activeFieldset] + index}
              name={rounds[activeFieldset]}
              defaultValue={traits?.[rounds[activeFieldset]]?.[index] || ""}
              onChange={keyboardclick}
            />
          ))}
          <button type="submit">
            {activeFieldset === 3 ? "Start game" : "Continue"}
          </button>
        </fieldset>
      </Form>
    </>
  );
}
