import { Fragment, useState } from 'react';
import Main from './components/Main';
import Timetable from './components/Timetable';
import Time from './components/Time';

// console.log("showTimeTable",showTimeTable);

function App() {

  const [isShowing, setIsShowing] = useState(false)

  return (
    <Fragment>
      <div className="m-5">
        {showTimeTable ? <Time /> : <Main />}
      </div>
    </Fragment>
  );
}

export default App;