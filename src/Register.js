import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "./actions";
const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const registrationValue = (e) => {
    e.preventDefault()
    const name = e.target.name.value;
    const role = e.target.role.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const passwordConfirm = e.target.passwordConfirm.value;
    console.log(name, email, password, passwordConfirm)
    dispatch(registerUser(name, role, email, password, passwordConfirm,navigate ))
  }
  return (
    <div>
      <form onSubmit={registrationValue}>
        <input type= 'text' name="name" placeholder="Your name"/><br />
        <input type= 'text' name="role" placeholder="Your role"/><br />
        <input type= 'email' name="email" placeholder="Your email"/><br />
        <input type= 'password' name="password" placeholder="password"/><br />
        <input type= 'password' name="passwordConfirm" placeholder="password Confirm"/><br />
        <input type= 'submit' value= 'register'/>
      </form>
    </div>
  )
}
export default Register;