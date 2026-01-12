import Profile from "@component/ProfileCard/ProfileCard";
import styles from "./RoundDescription.module.css";

type Props = {};

const RoundDescription = (props: Props) => {
  return (
    <div className={styles.container}>
      <h2>Question: Who would you ask to the school dance?</h2>
    </div>
  );
};

export default RoundDescription;
