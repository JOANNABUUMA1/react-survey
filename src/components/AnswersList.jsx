/* eslint-disable react/prop-types */
import AnswersItem from "./AnswersItem";

export default function AnswersList(props) {
  const { answersList, editAnswer, deleteAnswer } = props;
  return (
    <ul>
      {answersList.map((answerItem, index) => (
        <AnswersItem
          answerItem={answerItem}
          key={index}
          index={index}
          editAnswer={editAnswer}
          deleteAnswer={deleteAnswer}
        />
      ))}
    </ul>
  );
}
