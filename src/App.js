import React from 'react'
import ReactDOM from 'react-dom'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Footer from './components/Footer'
import Logo from './images/icons/coffee-break.png'


function App() {
  return (
    <div className="App">
      <Container maxWidth="sm" className="main-container">
        <Button variant="contained" id="new-log-btn">New Log</Button>
      </Container>
      <Footer text="ClockPunch" logo={Logo}/>
    </div>
  );
}

export default App;
