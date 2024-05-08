/* eslint-disable react/prop-types */
// Components don't need to be separeted into individual files
// Here we have a smaller component that helps compose the AnswersItem below

const answersSet = {
  swimming: "Swimming",
  bathing: "Bathing",
  chatting: "Chatting",
  noTime: "I don't like to spend time with it",
};

function ItemsList({ list }) {
  return (
    <ul>
      {list.map((item, index) => (
        <li key={index}>{answersSet[item]}</li>
      ))}
    </ul>
  );
}

// This is the main component being exported from this file
export default function AnswersItem({
  // Feel free to change this props names to what suits you best
  // Rememeber here we're destructuring answerItem, which is the prop name that we've passed
  answerItem,
  index,
  editAnswer,
  deleteAnswer,
}) {
  //const { answerItem, index, editAnswer, deleteAnswer } = props
  const { username, color, spentTime, review } = answerItem;
  return (
    <li>
      <article className="answer">
        <h3>{username || "Anon"} said:</h3>
        <div>
          <em>How do you rate your rubber duck colour?</em>
          <span className="answer__line">{color}</span>
        </div>
        <div>
          <em>How do you like to spend time with your rubber duck?</em>
          <ItemsList list={spentTime} />
        </div>
        <div>
          <em>What else have you got to say about your rubber duck?</em>
          <span className="answer__line">{review}</span>
        </div>
        <button id={index} onClick={editAnswer}>
          Edit
        </button>
        <button id={index} onClick={deleteAnswer}>
          Delete
        </button>
      </article>
    </li>
  );
}
