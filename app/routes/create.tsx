import ImageUpload from "@component/ImageUpload/ImageUpload";
import ProfilesForm from "@component/ProfilesForm/ProfilesForm";
import { useState } from "react";
import { Form, Link } from "react-router";
import type { Route } from "./+types/create";

export default function Create() {
  const [cont, setCont] = useState<boolean>(false);

  return (
    <>
      <ProfilesForm round={0}></ProfilesForm>
    </>
  );
}
