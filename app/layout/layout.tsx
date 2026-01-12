import { Outlet } from "react-router";
import styles from "./layout.module.css";

export default function Layout() {
  return (
    <>
      <header className={styles.header}>
        <h1>Heartthrob</h1>
      </header>
      <div className={styles.layout}>
        <Outlet />
      </div>
      <p className={styles.signature}>Website by Arja</p>
    </>
  );
}
