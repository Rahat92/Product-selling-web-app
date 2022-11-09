import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProductsNameAndPrice, getProductsNameAndPrice } from './actions';

const Names = () => {
  // const [ name, setName ] = useState([])
  const { products } = useSelector(state => state)
  useEffect(() => {
    dispatch(getProductsNameAndPrice())
  },[])
  const dispatch = useDispatch()
  const addName = (e) => {
    e.preventDefault();
    const newName = e.target.name.value
    const newPrice = e.target.price.value;
    dispatch(createProductsNameAndPrice(newName, newPrice))
    // setName([...name, newName])
  }
  // console.log(name)
  return (
    <div>
      <form onSubmit={addName}>
        name
        <input type = 'text' name = 'name' /><br />
        price
        <input type = 'number' name = 'price' /><br />
        <input type = 'submit' value={'addname'} />
      </form>
      {/* {name.map(el=>{
        return(
          <div>{el}</div>
        )
      })} */}

      {products&&products.map(el=>{
        return(
          <div>{el.name}</div>
        )
      })}
    </div>
  )
}
export default Names;