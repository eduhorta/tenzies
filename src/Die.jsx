import React, { useState } from "react";

function Die(props) {
  return (
    <div className="flex" onClick={props.holdDice}>
      {props.isHeld ? (
        <h2 className="boxShadow w-[50px] rounded-lg border-2 bg-green-400 p-4 text-3xl">
          {props.value}
        </h2>
      ) : (
        <h2 className="boxShadow w-[50px] rounded-lg border-2 p-4 text-3xl">
          {props.value}
        </h2>
      )}
    </div>
  );
}

export default Die;
