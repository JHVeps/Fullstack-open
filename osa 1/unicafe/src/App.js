import { useState } from "react";

const Headers = (props) => {
  return <h1>{props.header}</h1>;
};

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.title}</button>;
};

const Statistics = (props) => {
  if (props.clicks.all === 0) {
    return (
      <div>
        <Headers header={props.headers.bottomText} />
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <div>
      <Headers header={props.headers.bottomText} />
      <p>good {props.clicks.good}</p>
      <p>neutral {props.clicks.neutral}</p>
      <p>bad {props.clicks.bad}</p>
      <p>all {props.clicks.all}</p>
      <p>average {props.clicks.average / props.clicks.all}</p>
      <p>positive {(props.clicks.good / props.clicks.all) * 100}</p>
    </div>
  );
};

const App = () => {
  const headers = {
    topText: "give feedback",
    bottomText: "statistics",
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
      <Headers header={headers.topText} />
      <Button title="good" handleClick={handleGoodClick} />
      <Button title="neutral" handleClick={handleNeutralClick} />
      <Button title="bad" handleClick={handleBadClick} />
      <Statistics headers={headers} clicks={clicks} />
    </div>
  );
};

export default App;
