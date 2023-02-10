import React, { useState, useEffect } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [rolls, setRolls] = useState(0);

  const diceElement = dice.map((element) => {
    return (
      <Die
        key={element.id}
        {...element}
        holdDice={() => holdDice(element.id)}
      />
    );
  });

  function allNewDice() {
    const diceArray = [];
    for (let i = 0; i < 10; i++) {
      const newDie = {
        value: randomDieValue(),
        isHeld: false,
        id: nanoid(),
      };
      diceArray.push(newDie);
    }
    return diceArray;
  }
  function randomDieValue() {
    return Math.ceil(Math.random() * 6);
  }

  function rollDice() {
    setRolls((prevRolls) => prevRolls + 1);
    setDice((oldDices) =>
      oldDices.map((die) => {
        return die.isHeld === true ? die : { ...die, value: randomDieValue() };
      })
    );
  }

  function holdDice(id) {
    setDice((oldDices) =>
      oldDices.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  useEffect(() => {
    const allSame = dice.every(
      (die) => die.value === dice[0].value && die.isHeld
    );
    if (allSame) {
      setTenzies(true);
      console.log("You've won!");
    }
  }, [dice]);

  return (
    <main className="mx-auto my-auto flex h-[400px] w-[400px] flex-col items-center justify-center rounded-lg bg-white p-1">
      {tenzies && <Confetti />}
      <h1 className="text-4xl">Tenzies</h1>
      <p className="mt-4 text-gray-500">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="flex flex-wrap justify-center gap-5 p-4">
        {diceElement}
      </div>
      <button
        className="mt-4 rounded-lg bg-sky-600 px-6 py-2 text-white"
        onClick={() => {
          if (tenzies) {
            setTenzies(false);
            setDice(allNewDice());
            setRolls(0);
          } else {
            rollDice();
          }
        }}
      >
        {tenzies ? "New Game" : "Roll"}
      </button>
      <p className="mt-4 text-gray-500">Number of rolls: {rolls}</p>
    </main>
  );
}

export default App;
