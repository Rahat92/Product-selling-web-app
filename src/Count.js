import React, { useState, useEffect, useRef } from 'react';
import CountNum from './customHook';
const Count = () => {
  const myRef = useRef();
  console.log(myRef)
  const [number, doCount] = CountNum();
  

  
  return (
    <>
      <h1>Count: {number}</h1>
      {/* <button type = 'button' onClick={doDecrease} >Decrease</button>
      <button type = 'button' onClick={doIncrease} >Increase</button> */}
      <button ref={myRef} type = 'button' onClick={()=>doCount(-1)} >Decrease</button>
      <button type = 'button' onClick={()=>doCount(1)} >Increase</button>
    </>
  )
}
export default Count;