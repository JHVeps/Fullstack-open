import { useState } from "react";

const Headers = (props) => {
  return <h1>{props.header}</h1>;
};

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.title}</button>;
};

const StatisticsLine = (props) => {
  return (
    <>
      {props.text} {props.value}
    </>
  );
};

const Statistics = (props) => {
  if (props.clicks.all === 0) {
    return (
      <div>
        <Headers header={props.headers.statisticsHeader} />
        <p>{props.headers.noFeedbackText}</p>
      </div>
    );
  }
  return (
    <div>
      <Headers header={props.headers.statisticsHeader} />
      <table>
        <tbody>
          <tr>
            <td>
              <StatisticsLine text={"good"} value={props.clicks.good} />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticsLine text={"neutral"} value={props.clicks.neutral} />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticsLine text={"bad"} value={props.clicks.bad} />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticsLine text={"all"} value={props.clicks.all} />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticsLine
                text={"average"}
                value={props.clicks.average / props.clicks.all}
              />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticsLine
                text={"positive"}
                value={(props.clicks.good / props.clicks.all) * 100}
              />
              %
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const headers = {
    buttonsHeader: "give feedback",
    statisticsHeader: "statistics",
    noFeedbackText: "no feedback given",
  };

  const [clicks, setClicks] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    all: 0,
    average: 0,
  });

  const handleGoodClick = () => {
    const newClicks = {
      ...clicks,
      good: clicks.good + 1,
      all: clicks.all + 1,
      average: clicks.average + 1,
    };
    setClicks(newClicks);
  };

  const handleNeutralClick = () => {
    const newClicks = {
      ...clicks,
      neutral: clicks.neutral + 1,
      all: clicks.all + 1,
    };
    setClicks(newClicks);
  };

  const handleBadClick = () => {
    const newClicks = {
      ...clicks,
      bad: clicks.bad + 1,
      all: clicks.all + 1,
      average: clicks.average - 1,
    };
    setClicks(newClicks);
  };

  return (
    <div>
      <Headers header={headers.buttonsHeader} />
      <Button title="good" handleClick={handleGoodClick} />
      <Button title="neutral" handleClick={handleNeutralClick} />
      <Button title="bad" handleClick={handleBadClick} />
      <Statistics headers={headers} clicks={clicks} />
    </div>
  );
};

export default App;
