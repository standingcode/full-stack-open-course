import { useState } from "react";

const Display = ({ title, buttons, StatisticsDataTitle, StatisticsData }) => {
  return (
    <>
      <h1>{title}</h1>
      <Button handler={buttons.button1Handler} label={buttons.button1Label} />
      <Button handler={buttons.button2Handler} label={buttons.button2Label} />
      <Button handler={buttons.button3Handler} label={buttons.button3Label} />
      <h1>{StatisticsDataTitle}</h1>
      <Statistics StatisticsData={StatisticsData} />
    </>
  );
};

const Button = ({ handler, label }) => {
  return (
    <>
      <button onClick={handler}>{label}</button>
    </>
  );
};

const Statistics = ({ StatisticsData }) => {
  if (StatisticsData.allInt === 0) {
    return <div>No feedback given</div>;
  }

  return (
    <div>
      <StatisticLine text="good" value={StatisticsData.goodInt} />
      <br></br>
      <StatisticLine text="neutral" value={StatisticsData.neutralInt} />
      <br></br>
      <StatisticLine text="bad" value={StatisticsData.badInt} />
      <br></br>
      <StatisticLine text="all" value={StatisticsData.allInt} />
      <br></br>
      <StatisticLine text="average" value={StatisticsData.averageFloat} />
      <br></br>
      <StatisticLine text="positive" value={StatisticsData.positiveFloat} /> %
    </div>
  );
};

const StatisticLine = ({ text, value }) => (
  <>
    {text} {value}
  </>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const title = "Give Feedback";
  const StatisticsDataTitle = "StatisticsData";

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

  const StatisticsData = {
    goodInt: good,
    neutralInt: neutral,
    badInt: bad,
    allInt: all,
    averageFloat: average,
    positiveFloat: positive,
  };

  return (
    <div>
      <Display
        title={title}
        buttons={buttons}
        StatisticsDataTitle={StatisticsDataTitle}
        StatisticsData={StatisticsData}
      />
    </div>
  );
};

export default App;
