import Profile from "@component/ProfileCard/ProfileCard";
import styles from "./RoundDescription.module.css";

type Props = {};

const RoundDescription = (props: Props) => {
  return (
    <div className={styles.container}>
      <p>Question: Who would you ask to the school dance?</p>
    </div>
  );
};

export default RoundDescription;
