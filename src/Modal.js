import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';

const Modal = ({ state, click }) => {
  const navigate = useNavigate()
  const dismiss = () => {
    console.log('should dismissed')
    state(false)
    console.log(state)
  }
  return(
    ReactDOM.createPortal(
      <div onClick={dismiss} style = {{top:'0', zIndex: '100', bottom:'0', left:'0', right:'0', backgroundColor:'rgba(0,0,0, .8', position:'fixed', display: `${click?'block':'none'}`}}>
        <div onClick={(e)=>e.stopPropagation()} style={{position: 'absolute', top:'50%', left:'50%', transform: 'translate(-50%,-50%)', color:'white'}}>
          <h2>As-salamu-alaikum</h2>
          <h3>Are you sure you want to delete this product from your list?</h3>
          <div>
            <button onClick={()=>state(false)}>cancel</button>
            <button>delete</button>
          </div>
        </div>
        
      </div>,
      document.querySelector('#modal')
    )
  )
}
export default Modal;
