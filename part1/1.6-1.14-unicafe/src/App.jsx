import { useState } from "react";

const Display = ({ title, buttons, feedbackTitle, feedback }) => {
  return (
    <>
      <h1>{title}</h1>
      <CreateButtons buttons={buttons} />
      <h1>{feedbackTitle}</h1>
      <CreateFeedbackDisplay feedback={feedback} />
    </>
  );
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const CreateButtons = ({ buttons }) => {
  return (
    <div>
      <Button onClick={buttons.button1Handler} text={buttons.button1Label} />
      <Button onClick={buttons.button2Handler} text={buttons.button2Label} />
      <Button onClick={buttons.button3Handler} text={buttons.button3Label} />
    </div>
  );
};

const CreateFeedbackDisplay = ({ feedback }) => {
  return (
    <div>
      {feedback.goodLabel} {feedback.goodInt} <br></br>
      {feedback.neutralLabel} {feedback.neutralInt} <br></br>
      {feedback.badLabel} {feedback.badInt}
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const title = "Give feedback";
  const feedbackTitle = "Statistics";

  const setToValue = (handler, newValue) => {
    // console.log("value now", newValue);
    handler(newValue);
  };

  const buttons = {
    button1Handler: () => setToValue(setGood, good + 1),
    button1Label: "good",
    button2Handler: () => setToValue(setNeutral, neutral + 1),
    button2Label: "neutral",
    button3Handler: () => setToValue(setBad, bad + 1),
    button3Label: "bad",
  };

  const feedback = {
    goodInt: good,
    goodLabel: "good",
    neutralInt: neutral,
    neutralLabel: "neutral",
    badInt: bad,
    badLabel: "bad",
  };

  return (
    <div>
      <Display
        title={title}
        buttons={buttons}
        feedbackTitle={feedbackTitle}
        feedback={feedback}
      />
    </div>
  );
};

export default App;
