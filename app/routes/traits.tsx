import ImageUpload from "@component/ImageUpload/ImageUpload";
import ProfilesForm from "@component/ProfilesForm/ProfilesForm";
import { useState } from "react";
import { Form, Link, useNavigate } from "react-router";
import type { Route } from "./+types/create";
import { useProfiles } from "~/context/ProfileProvider";
import type { Profile } from "~/customTypes/Profile";
import { Rounds } from "~/enums/Rounds.enum";
import { traits } from "~/data/traits";

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
  const { profiles, setProfiles } = useProfiles();

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!profiles) return;

    const randomValues = generateUniquePositionLists(
      profiles.length,
      profiles.length - 1
    );

    setProfiles(
      profiles.map((profile, index) => ({
        ...profile,
        [Rounds.Personality]:
          traits[Rounds.Personality][randomValues[index][0]],
        [Rounds.HobbiesHabits]:
          traits[Rounds.HobbiesHabits][randomValues[index][1]],
        [Rounds.RedFlags]: traits[Rounds.RedFlags][randomValues[index][2]],
        [Rounds.Aspirations]:
          traits[Rounds.Aspirations][randomValues[index][3]],
      }))
    );
    navigate("/game/1");

    return;
  };

  return (
    <>
      <h1>Traits</h1>
      <Form onSubmit={handleSubmit} method="post">
        <input type="text" name="trait1" />
        <input type="text" name="trait2" />
        <input type="text" name="trait3" />
        <button type="submit">Continue</button>
      </Form>
    </>
  );
}
