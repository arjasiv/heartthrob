import { Rounds } from "~/enums/Rounds.enum";

import { rounds } from "~/data/rounds";

import { sampleTraits, sampleTraits2 } from "~/data/traits";
import type { Traits } from "~/customTypes/Traits";
import type { Profile } from "~/customTypes/Profile";

const generateTraitsForRound = (roundIndex: number) => {
  const currentRound = rounds[roundIndex];
  const sample1 = sampleTraits[currentRound];
  const sample2 = sampleTraits2[currentRound];

  const mixedTraits = sample1.map((_, index) => {
    return Math.random() < 0.5 ? sample1[index] : sample2[index];
  });

  return mixedTraits;
};

export const generateAutofilledProfiles = (profiles: Profile[]) => {
  let traits = {} as Traits;

  traits = {
    [rounds[0]]: generateTraitsForRound(0),
    [rounds[1]]: generateTraitsForRound(1),
    [rounds[2]]: generateTraitsForRound(2),
    [rounds[3]]: generateTraitsForRound(3),
  } as Traits;

  const updatedProfiles = profiles?.map((profile, index) => ({
    ...profile,
    [Rounds.Personality]: traits[Rounds.Personality][index],
    [Rounds.HobbiesHabits]: traits[Rounds.HobbiesHabits][index],
    [Rounds.RedFlags]: traits[Rounds.RedFlags][index],
    [Rounds.Aspirations]: traits[Rounds.Aspirations][index],
  }));

  return updatedProfiles;
};
