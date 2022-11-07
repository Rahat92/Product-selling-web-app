import CountNum from "./customHook";
const CountMany = () => {
  const [number, setNumber] = CountNum()
  return(
    <div>
      <h1>Count {number}</h1>
      <button type = "button" onClick={()=>setNumber(-1)}>Decrement</button>
      <button type = "button" onClick={()=>setNumber(1)}>Increment</button>
    </div>
  )
}
export default CountMany;