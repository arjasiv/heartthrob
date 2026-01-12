import { Rounds } from "~/enums/Rounds.enum";

export type Profile = {
  name: string;
  displayPicture: string;
  [Rounds.Personality]: string;
  [Rounds.HobbiesHabits]: string;
  [Rounds.RedFlags]: string;
  [Rounds.Aspirations]: string;
};
