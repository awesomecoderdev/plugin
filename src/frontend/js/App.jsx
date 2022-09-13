import { Fragment, useState } from 'react';
import Main from './components/Main';
import Timetable from './components/Timetable';
import Time from './components/Time';

function App() {

  const [isShowing, setIsShowing] = useState(false)

  return (
    <Fragment>
      <div className="m-5">
        {/* <Main /> */}
        <Time />
      </div>
    </Fragment>
  );
}

export default App;