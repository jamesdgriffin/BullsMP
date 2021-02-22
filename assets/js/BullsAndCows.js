import React, { useState, useEffect } from 'react';
import { getRandom, getResult, valid } from './game.js';
import { ch_join, ch_push, ch_reset, ch_guess } from './socket';

function BullsAndCows() {
  const [state, setState] = useState({
    guesses: [],
    results: [],
    text: "",
    message: "",
  });

  let {guesses, results, text, message} = state;
  let view = text;

  useEffect(() => {
    ch_join(setState);
  });

  function changeText(ev) {
    //setText(ev.target.value);
    let st1 = Object.assign({}, state, {text: ev.target.value});
    //setState(st1);
    ch_push(st1);
  }

  function guess() {
    console.log(state.text);
    let st1 = Object.assign({}, state, {
      text: "",
      guesses: state.guesses.concat(state.text),
    });
    ch_guess(st1);
  }

  function win() {
    let st1 = Object.assign({}, state, {message: "You Win!"});
    setState(st1);
  }

  function lose() {
    let st1 = Object.assign({}, state, {message: "You Lose! Press Reset button to try again."});
    setState(st1);
  }

  function reset() {
    console.log("reset");
    ch_reset();
  }

  function enter(ev) {
    if (ev.key == "Enter") {
      guess();
    }
  }

  if((message=="You Win!") ||
  (message=="You Lose! Press Reset button to try again.")) {
    return (
      <div className="App">
        <h1>Bulls and Cows game!</h1>
        <h2>{message}</h2>
        <input type="text" value=""/>
        <p>
          <button>Guess</button>
          <button onClick={reset}>Reset</button>
        </p>
        <p>
          <table>
          <tr>
            <th>Guesses</th>
            <th>Results</th>
          </tr>
          <tr>
            <td>{guesses[0]}</td>
            <td>{results[0]}</td>
          </tr>
          <tr>
            <td>{guesses[1]}</td>
            <td>{results[1]}</td>
          </tr>
          <tr>
            <td>{guesses[2]}</td>
            <td>{results[2]}</td>
          </tr>
          <tr>
            <td>{guesses[3]}</td>
            <td>{results[3]}</td>
          </tr>
          <tr>
            <td>{guesses[4]}</td>
            <td>{results[4]}</td>
          </tr>
          <tr>
            <td>{guesses[5]}</td>
            <td>{results[5]}</td>
          </tr>
          <tr>
            <td>{guesses[6]}</td>
            <td>{results[6]}</td>
          </tr>
          <tr>
            <td>{guesses[7]}</td>
            <td>{results[7]}</td>
          </tr>
        </table>
      </p>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Bulls and Cows game!</h1>
      <h2>{message}</h2>
      <input type="text" value={text} onChange={changeText}
      onKeyPress={enter}/>
      <p>
        <button onClick={guess}>Guess</button>
        <button onClick={reset}>Reset</button>
      </p>
      <p>
        <table>
          <tr>
            <th>Guesses</th>
            <th>Results</th>
          </tr>
          <tr>
            <td>{guesses[0]}</td>
            <td>{results[0]}</td>
          </tr>
          <tr>
            <td>{guesses[1]}</td>
            <td>{results[1]}</td>
          </tr>
          <tr>
            <td>{guesses[2]}</td>
            <td>{results[2]}</td>
          </tr>
          <tr>
            <td>{guesses[3]}</td>
            <td>{results[3]}</td>
          </tr>
          <tr>
            <td>{guesses[4]}</td>
            <td>{results[4]}</td>
          </tr>
          <tr>
            <td>{guesses[5]}</td>
            <td>{results[5]}</td>
          </tr>
          <tr>
            <td>{guesses[6]}</td>
            <td>{results[6]}</td>
          </tr>
          <tr>
            <td>{guesses[7]}</td>
            <td>{results[7]}</td>
          </tr>
        </table>
      </p>
    </div>
  );
}

export default BullsAndCows;
