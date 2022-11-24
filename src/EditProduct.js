import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editProduct, getSingleProduct } from './actions';
import EditProductInfo from './EditProductInfo';
const Product = ({ productName, productPrice }) => {
  const navigate = useNavigate()
  const parameter = useParams()
  const dispatch = useDispatch()
  const selector = useSelector(state => state.singleProduct)
  const { user } = useSelector(state=>state.user)
  const { editedProduct } = useSelector(state=>state)
  useEffect(()=> {
    if(!productName&&!productPrice){
      dispatch(getSingleProduct(parameter.id))    
    }
    // dispatch(getMe())
  },[parameter.id, editedProduct.data])
  // if(user&&user.role !== 'admin'){
  //   navigate('/good/book')
  // }
  if(user === null){
    navigate('/login')
  }
  const onSubmit = (e) => {
    e.preventDefault();
    const productName = e.target.product.value;
    const price = e.target.price.value;
    dispatch(editProduct(parameter.id,productName, price,navigate))
  }
  if(!productName&&!productPrice){
    if(!selector.doc){
      return <h1>loading...</h1>
    }
  }
  return(
    <div>
      {user&&user.role==='admin'?(
        <EditProductInfo
          onSubmit = { onSubmit }
          productName = {productName} 
          selector = {selector} 
          parameter = {parameter} 
          productPrice = {productPrice} 
        />
      ):navigate('/')}
    </div>
  )
}
export default Product;