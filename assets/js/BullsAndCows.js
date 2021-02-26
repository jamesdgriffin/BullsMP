import React, { useState, useEffect } from 'react';
import { ch_join, ch_push, ch_reset, ch_guess, ch_login } from './socket';

function Play({state}) {
  let {user, guesses, results, text, message} = state;
  let view = text;

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

  function enter(ev) {
    if (ev.key == "Enter") {
      guess();
    }
  }

  return (
    <div className="App">
      <h1>Bulls and Cows game!</h1>
      <h2>User: {user}</h2>
      <input type="text" value={text} onChange={changeText}
      onKeyPress={enter}/>
      <p>
        <button onClick={guess}>Guess</button>
        <button onClick={reset}>Reset</button>
      </p>
      <h2>{message}</h2>
      <div>
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
      </div>
    </div>
  );
}

function Login() {
  const [user, setUser] = useState("");

  return (
    <div className="row">
      <div className="column">
        <input type="text"
               value={user}
               onChange={(ev) => setUser(ev.target.value)} />
      </div>
      <div className="column">
        <button onClick={() => ch_login(user)}>Login!</button>
      </div>
    </div>
  );
}

function reset() {
  console.log("reset");
  ch_reset();
}

function BullsAndCows() {
  const [state, setState] = useState({
    user: "",
    guesses: [],
    results: [],
    text: "",
    message: "",
  });

  useEffect(() => {
    ch_join(setState);
  });

  let body = null;

  function win() {
    let st1 = Object.assign({}, state, {message: "You Win!"});
    setState(st1);
  }

  function lose() {
    let st1 = Object.assign({}, state, {message: "You Lose! Press Reset button to try again."});
    setState(st1);
  }

  if(state.user == "") {
    body = <Login />
  }
  else if((state.message=="You Win!") ||
  (state.message=="You Lose! Press Reset button to try again.")) {
    body =
      <div>
        <h1>Bulls and Cows game!</h1>
        <input type="text" value=""/>
        <p>
          <button>Guess</button>
          <button onClick={reset}>Reset</button>
        </p>
        <h2>{message}</h2>
        <div>
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
      </div>
    </div>;
  }
  else {
    body = <Play state={state} />
  }

  return (
    <div className="App">
    {body}
    </div>
  );

}

export default BullsAndCows;
