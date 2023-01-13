import { useState } from "react";

const Headers = (props) => {
  return <h1>{props.header}</h1>;
};

const App = () => {
  const header = {
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
  if (clicks.all === 0) {
    return (
      <div>
        <Headers header={header.topText} />
        <button onClick={handleGoodClick}>good</button>
        <button onClick={handleNeutralClick}>neutral</button>
        <button onClick={handleBadClick}>bad</button>
        <Headers header={header.bottomText} />
        <p>good {clicks.good}</p>
        <p>neutral {clicks.neutral}</p>
        <p>bad {clicks.bad}</p>
        <p>all {clicks.all}</p>
        <p>average {clicks.average}</p>
        <p>positive 0</p>
      </div>
    );
  }
  return (
    <div>
      <Headers header={header.topText} />
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      <Headers header={header.bottomText} />
      <p>good {clicks.good}</p>
      <p>neutral {clicks.neutral}</p>
      <p>bad {clicks.bad}</p>
      <p>all {clicks.all}</p>
      <p>average {clicks.average / clicks.all}</p>
      <p>positive {(clicks.good / clicks.all) * 100}</p>
    </div>
  );
};

export default App;
