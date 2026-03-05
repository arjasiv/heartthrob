import { Link, Outlet } from "react-router";
import styles from "./layout.module.css";
import { useState } from "react";
import RulesModal from "@component/RulesModal/RulesModal";
// @ts-ignore - sounds.js doesn't have type definitions
import { mouseclick } from "~/utils/sounds";

export default function Layout() {
  const [showRules, setShowRules] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <Link to={"/"} className={styles.headerLink} reloadDocument>
          <h1>Heartthrob</h1>
        </Link>
      </header>
      {showRules && <RulesModal onClick={() => setShowRules(false)} />}
      <div className={styles.layout} inert={showRules}>
        <Outlet />
      </div>
      <button
        className={styles.rulesButton}
        type="button"
        onClick={() => {
          mouseclick();
          setShowRules(!showRules);
        }}
      >
        ?
      </button>
    </>
  );
}
