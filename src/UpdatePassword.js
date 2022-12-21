import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserPassword } from "./actions";
import { CLEARERROR } from "./const";

const UpdatePassword = () => {
  const { message } = useSelector(state=>state.user)
  useEffect(()=>{
    console.log(message)
    if(message){
      setTimeout(()=>{
        dispatch({
          type:CLEARERROR
        })
      },5000)
    }
  },[message])
  const dispatch = useDispatch()
  const updateCurrentPassword = (e) => {
    e.preventDefault()
    dispatch(updateUserPassword(e,e.target.currentPassword.value, e.target.newPassword.value, e.target.confirmPassword.value))
  }
  return (
    <div style={{marginTop: '2rem'}}>
      <form onSubmit={(e)=>updateCurrentPassword(e)}>
        <table>
          <tr>
            <td><label>Current password: </label></td>
            <td><input type = 'password' name = 'currentPassword' placeholder='Current password'/></td>
          </tr>
          <tr>
            <td><label>New password: </label></td>
            <td><input type = 'password' name = 'newPassword' placeholder='New password'/></td>
          </tr>
          <tr>
            <td><label>Password confirm: </label></td>
            <td><input type = 'password' name = 'confirmPassword' placeholder='Confirm password'/></td>
          </tr>
        </table>
        <input type = 'submit' value = 'Update'/>
      </form>
      {message&&(
        <div style={{color:'red'}}>
          {message}
        </div>
      )}
    </div>
  )
}
export default UpdatePassword;