import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteOneUser, getAllUser, updateUserRole } from './actions';
import Modal from './Modal';
const AllUser = ({ getUserData }) => {
  const [deleteClick, setDeleteClick] = useState(false);
  const [ id, setId ] = useState()
  const [ needUpdateUserId, setNeedUpdateUserId ] = useState(null)
  const [ updateRoleClick, setUpdateRoleClick] = useState(false);
  const { users, message, documentNumber } = useSelector(state => state.users)
  const dispatch = useDispatch()
  useEffect(()=> {
    dispatch(getAllUser())
  },[])
  const deleteUser = (userId) => {
    setDeleteClick(true)
    setId(userId)
  }
  const updateRoleButtonClick = (userId) => {
    console.log(userId)
    setNeedUpdateUserId(userId)
    setUpdateRoleClick(true)
  }
  const setUserRole = (e,userId) => {
    console.log(e.target.value)
    dispatch(updateUserRole(userId, e.target.value, setUpdateRoleClick))
  }
  const goProfile = (name, email, role, photo) => {
    getUserData(name, email, role, photo)
  }
  // if(message){
  //   return (
  //     <div>
  //       <h3 style = { { color: 'red' } }>{message.message}</h3>
  //     </div>
  //   )
  // }
  // if(!users){
  //   return (
  //     <div>
  //       <h3>Loading...</h3>
  //     </div>
  //   )
  // }
  return(
    <div>
      <h2>Total Users: {documentNumber}</h2>
      <ul style={{listStyle: 'none'}}>
        {users.map(el=>{
            return (
              <div style={{display:'flex', alignItems:'center'}}>
                <img style={{width:'50px', height: '50px', borderRadius:'50%', marginRight:'.6rem'}} src= {`/public/img/users/${el.photo}`} alt = 'profile pic' />
                <li onClick={() => goProfile(el.name, el.email, el.role, el.photo)}><h3><Link to = {`/profile/${el._id}`}>{el.name} ({el.role})</Link> &nbsp;
                {updateRoleClick&&needUpdateUserId === el._id?(
                  <form style={{display: 'inline-block'}}>
                  <select onChange={(e) => setUserRole(e, el._id)} defaultValue = {el.role}>
                    <option>user</option>
                    <option>admin</option>
                  </select>
                </form>
                ):(
                  <button onClick={()=>updateRoleButtonClick(el._id)}>Update User Role</button>
                )}
                &nbsp;
                <button onClick={()=>deleteUser(el._id)}>delete</button></h3></li>
                {deleteClick? <Modal id = {id} setDeleteClick = {setDeleteClick} deleteClick = {deleteClick} deleteOne = {deleteOneUser} />:''}
              </div>
            )
        })}
      </ul>
    </div>
  )
}
export default AllUser;