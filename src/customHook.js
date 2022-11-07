import React, {useState, useEffect} from 'react';

const CountNum = (num) => {
  const [ number, setNumber ] = useState();

  useEffect(()=> {
    setNumber(0)
  },[])

  const doCount = (num) => {
    if(num <0){
      setNumber(number+num)
    }else{
      setNumber(number+num)
    }
  }

  return [number, doCount]

}
export default CountNum;