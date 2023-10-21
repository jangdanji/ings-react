/* eslint-disable */

import './App.scss';

import { Routes, Route, Link, useNavigate } from 'react-router-dom';

import Home from './pages/Home'
import Board from './pages/Board'


function App() {


  return (
    <div className="App">
      <header className="header">
        <nav className='navbar'>
          <div className='logo'>(로고)</div>
          <div className='user-menu'>
            <ul>
              <li><input type='text' placeholder='검색'></input></li>
            </ul>
          </div>
        </nav>
      </header>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/board/:id' element={<Board></Board>}></Route>
      </Routes>
      


    </div>
  );
}

export default App;
