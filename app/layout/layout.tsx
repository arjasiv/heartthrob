import { Outlet } from "react-router";
import styles from "./layout.module.css";
import { useState } from "react";
import RulesModal from "@component/RulesModal/RulesModal";

export default function Layout() {
  const [showRules, setShowRules] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <h1>Heartthrob</h1>
      </header>
      <div className={styles.layout}>
        {showRules && <RulesModal onClick={() => setShowRules(false)} />}
        <button
          className={styles.rulesButton}
          type="button"
          onClick={() => {
            setShowRules(true);
          }}
        >
          ?
        </button>
        <Outlet />
      </div>
    </>
  );
}
