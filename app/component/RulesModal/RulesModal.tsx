import styles from "./RulesModal.module.css";
// @ts-ignore - sounds.js doesn't have type definitions
import { woodClick } from "~/utils/sounds";

type RulesModalProps = {
  onClick: () => void;
};

const RulesModal = ({ onClick }: RulesModalProps) => {
  return (
    <>
      <button onClick={onClick} className={styles.container}></button>
      <div className={styles.modal}>
        <button
          className={styles.closeBtn}
          onClick={() => {
            woodClick();
            onClick();
          }}
        >
          x
        </button>
        A party game to play with friends based on the 90s board game
        Heartthrob. Insert photos of celebrity crushes, friends or potential
        lovers. Customize your own game with different personalities and traits,
        or quick-play a randomized game. <br />
        <br /> Main Game:
        <br />
        Each round will reveal a new traits about your potential heartthrob. For
        each round the players selects their favorite hearthrob, while also
        guessing which heartthrob the other players will chose. Each player gets
        one point for each co-player's choice they guess correctly.
        <br />
        <br />
        The player with the most correct guesses wins the game. <br />
        <br /> Queen B version:
        <br /> If there are too many players or the night is all about one of
        the players, one player goes into the firepit to choose their favorite
        heartthrob while all other players will guess that players choice.
        <br />
        <br /> Drinking game version:
        <br /> Player takes a shot for each incorrect guess.
      </div>
    </>
  );
};

export default RulesModal;
