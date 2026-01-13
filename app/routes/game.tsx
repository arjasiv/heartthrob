import Profiles from "@component/Profiles/Profiles";
import RoundDescription from "@component/RoundDescription/RoundDescription";
import type { Route } from "./+types/game";
import { redirect, useNavigate } from "react-router";
import { rounds } from "~/data/rounds";
import { useProfiles } from "~/context/ProfileProvider";

// @ts-ignore - sounds.js doesn't have type definitions
import { mouseclick } from "~/utils/sounds";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  if (params.round && (Number(params.round) < 1 || Number(params.round) > 4)) {
    return redirect("/game");
  }

  return Number(params.round);
}

export default function Game({ loaderData, actionData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const { profiles } = useProfiles();

  return (
    <>
      <RoundDescription round={loaderData}></RoundDescription>
      <Profiles round={loaderData}></Profiles>

      {(loaderData < 4 || !loaderData) && (
        <button
          onClick={() => {
            mouseclick();
            navigate(`/game/${loaderData ? loaderData + 1 : 1}`, {});
          }}
        >
          {!loaderData
            ? `First round: ${rounds[0]}`
            : `Next round: ${rounds[loaderData]}`}
        </button>
      )}
    </>
  );
}
