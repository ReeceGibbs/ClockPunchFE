import React from 'react'
import './style/style.scss'
import Footer from './components/Footer'
import Logo from './images/icons/coffee-break.png'
import Menu from './components/Menu'

function App() {
  return (
    <div className="App">
      <Menu />
      <Footer text="ClockPunch" logo={Logo}/>
    </div>
  );
}

export default App;
