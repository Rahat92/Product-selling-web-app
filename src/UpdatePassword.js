import { useDispatch } from "react-redux";
import { updateUserPassword } from "./actions";

const UpdatePassword = () => {
  const dispatch = useDispatch()
  const updateCurrentPassword = (e) => {
    e.preventDefault()
    // console.log('hello world')
    // let formData = new FormData();
    // formData.set('currentPassword',e.target.currentPassword.value)
    // formData.set('password',e.target.newPassword.value)
    // formData.set('passwordConfirm',e.target.confirmPassword.value)
    // for (var pair of formData.entries()) {
    //   console.log(pair[0]+ ', ' + pair[1]); 
    // }
    dispatch(updateUserPassword(e.target.currentPassword.value, e.target.newPassword.value, e.target.confirmPassword.value))
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
    </div>
  )
}
export default UpdatePassword;