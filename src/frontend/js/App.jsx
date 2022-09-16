import { Fragment, useState } from 'react';
import Main from './components/Main';
import Timetable from './components/Timetable';
import Time from './components/Time';

// console.log("showTimeTable",showTimeTable);

function App() {

  const [isShowing, setIsShowing] = useState(false)

  return (
    <Fragment>
      {showTimeTable ? <Time /> : <Main />}
    </Fragment>
  );
}

export default App;