import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOneUser, getAllUser } from './actions';
import Modal from './Modal';
const AllUser = () => {
  const [deleteClick, setDeleteClick] = useState(false);
  const [ id, setId ] = useState()
  const { users, message, documentNumber } = useSelector(state => state.users)
  const dispatch = useDispatch()
  useEffect(()=> {
    dispatch(getAllUser())
  },[])
  const deleteUser = (userId) => {
    setDeleteClick(true)
    setId(userId)
  }
  if(message){
    return (
      <div>
        <h3 style = { { color: 'red' } }>{message.message}</h3>
      </div>
    )
  }
  if(!users){
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    )
  }
  return(
    <div>
      <h2>Total Users: {documentNumber}</h2>
      <ul style={{listStyle: 'none'}}>
        {users.map(el=>{
          return(
            <div>
              <li><h3>{el.name} <button>update role</button> <button onClick={()=>deleteUser(el._id)}>delete</button></h3></li>
              {deleteClick? <Modal id = {id} setDeleteClick = {setDeleteClick} deleteClick = {deleteClick} deleteOne = {deleteOneUser} />:''}
            </div>
          )
        })}
      </ul>
    </div>
  )
}
export default AllUser;