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
      {feedback.badLabel} {feedback.badInt} <br></br>
      {feedback.allLabel} {feedback.allInt} <br></br>
      {feedback.averageLabel} {feedback.averageFloat} <br></br>
      {feedback.positiveLabel} {feedback.positiveFloat} %
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const title = "Give feedback";
  const feedbackTitle = "Statistics";

  const setToValue = (handler, newValue) => {
    // console.log("value now", newValue);
    handler(newValue);
  };

  const buttons = {
    button1Handler: () => {
      const updatedGoodValue = good + 1;
      const updatedAllValue = all + 1;

      setToValue(setGood, updatedGoodValue);
      setToValue(setAll, updatedAllValue);
      setToValue(setAverage, (updatedGoodValue - bad) / updatedAllValue);
      setToValue(setPositive, (updatedGoodValue / updatedAllValue) * 100);
    },
    button1Label: "good",
    button2Handler: () => {
      const updatedNeutralValue = neutral + 1;
      const updatedAllValue = all + 1;

      setToValue(setNeutral, updatedNeutralValue);
      setToValue(setAll, updatedAllValue);
      setToValue(setAverage, (good - bad) / updatedAllValue);
      setToValue(setPositive, (good / updatedAllValue) * 100);
    },
    button2Label: "neutral",
    button3Handler: () => {
      const updatedBadValue = bad + 1;
      const updatedAllValue = all + 1;

      setToValue(setBad, updatedBadValue);
      setToValue(setAll, updatedAllValue);
      setToValue(setAverage, (good - updatedBadValue) / updatedAllValue);
      setToValue(setPositive, (good / updatedAllValue) * 100);
    },
    button3Label: "bad",
  };

  const feedback = {
    goodInt: good,
    goodLabel: "good",
    neutralInt: neutral,
    neutralLabel: "neutral",
    badInt: bad,
    badLabel: "bad",
    allInt: all,
    allLabel: "all",
    averageFloat: average,
    averageLabel: "average",
    positiveFloat: positive,
    positiveLabel: "positive",
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
