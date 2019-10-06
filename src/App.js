import React from 'react';
import Routes from './Routes'
import './App.css';

function App() {
  return (
      <div className="container">
        <main>
            <div className={'row'}>
                <div className={'col-md text-center'}>
                    <h1 className={'app-title'}><a href={"#/home"}>Improvify</a></h1>
                    <p>Because practice is waaaayyyyyyy better with emojis 🤓😎🤩🥳🤪</p>
                    <hr/>
                </div>
            </div>
            <Routes/>
        </main>
      </div>
  )
}

export default App;
