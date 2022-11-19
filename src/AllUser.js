import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOneUser, getAllUser } from './actions';
import Modal from './Modal';
const AllUser = () => {
  const [deleteClick, setDeleteClick] = useState(false);
  const [ id, setId ] = useState()
  const dispatch = useDispatch()
  const { users, message, documentNumber } = useSelector(state => state.users)
  console.log(users)
  useEffect(()=> {
    dispatch(getAllUser())
  },[])
  const deleteUser = (userId) => {
    setId(userId)
    setDeleteClick(true)
  }
  if(message){
    return (
      <div>
        <h3 style = { { color: 'red' } }>{message.message}</h3>
      </div>
    )
  }
  return(
    <div>
      <h2>Total Users: {documentNumber}</h2>
      <ul style={{listStyle: 'none'}}>
        {users&&users.docs&&users.docs.map(el=>{
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