import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Modal = ({ item, setDeleteClick, setCreateUserReview, currentPage, result, userId, deleteClick, id, deleteOne, getProduct, productId, setReviewPageNo }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const dismiss = () => {
    console.log('should dismissed')
    setDeleteClick(false)
  }
  return(
    ReactDOM.createPortal(
      <div onClick={dismiss} style = {{top:'0', zIndex: '100', bottom:'0', left:'0', right:'0', backgroundColor:'rgba(0,0,0, .4', position:'fixed', display: `${deleteClick?'block':'none'}`}}>
        <div onClick={(e)=>e.stopPropagation()} style={{position: 'absolute', top:'50%', left:'50%', transform: 'translate(-50%,-50%)', color:'white'}}>
          <h3>Are you sure you want to delete <span style = {{color:'red'}}>{item?item.name:'this'}</span> from your list?</h3>
          <div>
            <button onClick={()=>setDeleteClick(false)}>cancel</button>
            <button onClick={()=>dispatch(deleteOne(id, setDeleteClick, getProduct&&getProduct,productId, setReviewPageNo, currentPage, result, setCreateUserReview))}>delete</button>
          </div>
        </div>
        
      </div>,
      document.querySelector('#modal')
    )
  )
}
export default Modal;
