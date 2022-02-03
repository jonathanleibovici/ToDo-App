import React, {Fragment} from 'react';
import './App.css';
//components requirments 

import Inputanime from './components/Inputanime';
import Listanime from './components/Listanime';

function App() {
  return (
  <Fragment>
    <div className='container'>

    <Inputanime />
    <Listanime />
    

    </div>

  </Fragment>
  );
}

export default App;
