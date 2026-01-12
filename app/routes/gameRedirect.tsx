import { redirect } from "react-router";

export async function clientLoader() {
  return redirect("/game/1");
}

export default function GameRedirect() {
  return null;
}
