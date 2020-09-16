import React, { useState } from "react";
import RxValue, { useComputedValue } from "./RxValue";
import { interval } from "rxjs";
import { map, startWith } from "rxjs/operators";

function App({ counter }) {
  console.log("add render");
  const [round, setRound] = useState(1);
  const nextRound = () => setRound(round + 1);
  const external = useComputedValue(counter, () =>
    counter.pipe(map((c) => `external ${c}`))
  );
  return (
    <div className="App">
      <RxValue>
        {/* generate new observable in each render */}
        {interval(1000).pipe(
          startWith(-1),
          map((time) => `round ${round} time: ${time + 1}`)
        )}
      </RxValue>
      <br />
      <button onClick={nextRound}> round({round}) </button>
      <br />
      <RxValue>{external}</RxValue>
    </div>
  );
}

export default App;
