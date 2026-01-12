import { Form, Outlet } from "react-router";
import styles from "./createLayout.module.css";

export default function Create() {
  return (
    <>
      <h2 className={styles.title}>Create your game</h2>
      <Outlet />
    </>
  );
}
