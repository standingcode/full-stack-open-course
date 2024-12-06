import { useState } from "react";

const Display = ({ title, buttons, StatisticsTitle, Statistics }) => {
  return (
    <>
      <h1>{title}</h1>
      <CreateButtonsDisplay buttons={buttons} />
      <h1>{StatisticsTitle}</h1>
      <CreateStatisticsDisplay Statistics={Statistics} />
    </>
  );
};

const CreateButtonsDisplay = ({ buttons }) => {
  return (
    <div>
      <button onClick={buttons.button1Handler}>{buttons.button1Label}</button>
      <button onClick={buttons.button2Handler}>{buttons.button2Label}</button>
      <button onClick={buttons.button3Handler}>{buttons.button3Label}</button>
    </div>
  );
};

const CreateStatisticsDisplay = ({ Statistics }) => {
  if (Statistics.allInt === 0) {
    return <div>No feedback given</div>;
  }

  return (
    <div>
      {Statistics.goodLabel} {Statistics.goodInt} <br></br>
      {Statistics.neutralLabel} {Statistics.neutralInt} <br></br>
      {Statistics.badLabel} {Statistics.badInt} <br></br>
      {Statistics.allLabel} {Statistics.allInt} <br></br>
      {Statistics.averageLabel} {Statistics.averageFloat} <br></br>
      {Statistics.positiveLabel} {Statistics.positiveFloat} %
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

  const title = "Give Feedback";
  const StatisticsTitle = "Statistics";

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

  const Statistics = {
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
        StatisticsTitle={StatisticsTitle}
        Statistics={Statistics}
      />
    </div>
  );
};

export default App;
