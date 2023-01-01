import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Modal.css';
const Modal = ({ item,setClickProduct, setDeleteClick, setCreateUserReview, currentPage, result, userId, deleteClick, id, deleteOne, getProduct, productId, setReviewPageNo }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const dismiss = () => {
    console.log('should dismissed')
    setDeleteClick(false)
  }
  return(
    ReactDOM.createPortal(
      <div onClick={dismiss} style = {{top:'0', zIndex: '100', bottom:'0', left:'0', right:'0', backgroundColor:'rgba(0,0,0, .6', position:'fixed', display: `${deleteClick?'block':'none'}`}}>
        <div onClick={(e)=>e.stopPropagation()} style={{position: 'absolute', top:'50%', left:'50%', transform: 'translate(-50%,-50%)', color:'white'}}>
          <h2 style = {{color:'white', fontWeight:500, lineHeight:'1.2', letterSpacing:'1px'}}>Are you sure you want to delete <span style = {{color:'red'}}>{item?item.name:'this'}</span> from<br /> your list?</h2>
          <div>
            <button className='modalButton' onClick={()=>setDeleteClick(false)}>cancel</button>
            <button className='modalButton' onClick={()=>dispatch(deleteOne(id, setDeleteClick,productId, setCreateUserReview,setClickProduct))}>delete</button>
          </div>
        </div>
        
      </div>,
      document.querySelector('#modal')
    )
  )
}
export default Modal;
