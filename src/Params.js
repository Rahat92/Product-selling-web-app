import { useLocation } from "react-router-dom";

const Params = () =>{
  const params = useLocation().search
  console.log(params)
  const name = new URLSearchParams(params).get('name')
  console.log(name)
  return(
    <div>{name}</div>
  )
}
export default Params;