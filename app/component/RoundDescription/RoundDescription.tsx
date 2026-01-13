import styles from "./RoundDescription.module.css";

type Props = {
  round?: number;
};

const roundQuestions = [
  "Who would you ask out on a date?",
  "Who would you hook-up with?",
  "Who would you enter a relationship with?",
  "Who would you introduce to your family?",
];

const RoundDescription = ({ round }: Props) => {
  const question = round ? roundQuestions[round - 1] : roundQuestions[0];

  return (
    <div className={styles.container}>
      <h2>Question: {question}</h2>
    </div>
  );
};

export default RoundDescription;
