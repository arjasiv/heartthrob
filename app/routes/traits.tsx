import { useState } from "react";
import { Form, useNavigate, useSearchParams } from "react-router";
import type { Route } from "./+types/create";
import { useProfiles } from "~/context/ProfileProvider";
import { Rounds } from "~/enums/Rounds.enum";
import styles from "~/styles/Traits.module.css";
import { rounds } from "~/data/rounds";
import { sampleTraits, sampleTraits2, sampleTraits3 } from "~/data/traits";

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

  const populateWithExampleTraits = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    setTraits({} as Traits);

    mouseclick();

    const updatedTraits = {
      ...traits,
      [rounds[activeFieldset]]: generateTraitsForRound(activeFieldset),
    } as Traits;
    console.log(updatedTraits);

    setTraits(updatedTraits);
  };

  const generateTraitsForRound = (roundIndex: number) => {
    const currentRound = rounds[roundIndex];
    const sample1 = sampleTraits[currentRound];
    const sample2 = sampleTraits2[currentRound];
    const sample3 = sampleTraits3[currentRound];

    const mixedTraits = sample1.map((_, index) => {
      const rand = Math.random();
      if (rand < 0.33) return sample1[index];
      if (rand < 0.66) return sample2[index];
      return sample3[index];
    });

    return mixedTraits;
  };

  const handleAutofillAndSubmit = () => {
    let updatedTraits = {} as Traits;

    updatedTraits = {
      ...traits,
      [rounds[0]]: generateTraitsForRound(0),
      [rounds[1]]: generateTraitsForRound(1),
      [rounds[2]]: generateTraitsForRound(2),
      [rounds[3]]: generateTraitsForRound(3),
    } as Traits;

    setProfiles(
      profiles?.map((profile, index) => ({
        ...profile,
        [Rounds.Personality]: updatedTraits[Rounds.Personality][index],
        [Rounds.HobbiesHabits]: updatedTraits[Rounds.HobbiesHabits][index],
        [Rounds.RedFlags]: updatedTraits[Rounds.RedFlags][index],
        [Rounds.Aspirations]: updatedTraits[Rounds.Aspirations][index],
      })) || []
    );

    nextSound();

    navigate("/game/1");
  };

  const [traitsInput, setTraitsInput] = useState<string[]>([]);

  return (
    <>
      <h2>Traits</h2>
      <Form className={styles.form} onSubmit={handleSubmit} method="post">
        <fieldset className={styles.inputWrapper}>
          <label htmlFor={rounds[activeFieldset]}>
            <span>{rounds[activeFieldset]}</span>
            <button
              type="button"
              onClick={populateWithExampleTraits}
              className={styles.extraBtn}
            >
              I'm not feeling creative
            </button>
          </label>
          {profiles?.map((profile, index) => (
            <input
              key={traits?.[rounds[activeFieldset]]?.[index] || "" + index}
              type="text"
              id={rounds[activeFieldset] + index}
              name={rounds[activeFieldset]}
              defaultValue={traits?.[rounds[activeFieldset]]?.[index] || ""}
              onChange={keyboardclick}
            />
          ))}
          <div className={styles.navigation}>
            {activeFieldset > 0 && (
              <button
                className={styles.backBtn}
                type="button"
                onClick={() => navigate("?step=" + activeFieldset)}
              >
                Back to {rounds[activeFieldset - 1]}
              </button>
            )}
            <button className={styles.submitBtn} type="submit">
              {activeFieldset === 3
                ? "Start game"
                : "Continue to " + rounds[activeFieldset + 1]}
            </button>
          </div>
          <button
            type="button"
            className={styles.autofillBtn}
            onClick={handleAutofillAndSubmit}
          >
            OMG, just let me play the game
          </button>
        </fieldset>
      </Form>
    </>
  );
}
