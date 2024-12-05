import { useState } from "react";

const Display = ({ title, buttons, feedbackTitle, feedback }) => {
  return (
    <>
      <h1>{title}</h1>
      {buttons}
      <h1>{feedbackTitle}</h1>
      {feedback}
    </>
  );
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const CreateButtons = ({ buttons }) => {
  return (
    <div>
      <Button onClick={buttons.button1Handler} text={buttons.button1Text} />
      <Button onClick={buttons.button2Handler} text={buttons.button2Text} />
      <Button onClick={buttons.button3Handler} text={buttons.button3Text} />
    </div>
  );
};

const CreateFeedbackDisplay = ({ good, neutral, bad }) => {
  return (
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
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
    button1Text: "good",
    button2Handler: () => setToValue(setNeutral, neutral + 1),
    button2Text: "neutral",
    button3Handler: () => setToValue(setBad, bad + 1),
    button3Text: "bad",
  };

  return (
    <div>
      <Display
        title={title}
        buttons={<CreateButtons buttons={buttons} />}
        feedbackTitle={feedbackTitle}
        feedback={
          <CreateFeedbackDisplay good={good} neutral={neutral} bad={bad} />
        }
      />
    </div>
  );
};

export default App;
