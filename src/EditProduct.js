import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editProduct, getMe, getSingleProduct, handleChange } from './actions';
import EditProductInfo from './EditProductInfo';
const Product = ({ productName, productRating }) => {
  console.log(productName, productRating)
  const navigate = useNavigate()
  const parameter = useParams()
  const dispatch = useDispatch()
  const selector = useSelector(state => state.singleProduct)
  const { user } = useSelector(state=>state.user)
  const { editedProduct } = useSelector(state=>state)
  useEffect(()=> {
    if(!productName&&!productRating){
      dispatch(getSingleProduct(parameter.id))    
    }
    // dispatch(getMe())
  },[parameter.id, editedProduct.data])
  // if(user&&user.role !== 'admin'){
  //   navigate('/good/book')
  // }
  console.log(user&&user.role)
  if(user === null){
    navigate('/login')
  }
  console.log(user)
  const onSubmit = (e) => {
    e.preventDefault();
    const productName = e.target.product.value;
    const rating = e.target.rating.value;
    dispatch(editProduct(parameter.id,productName, rating,navigate))
  }
  if(!productName&&!productRating){
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
          productRating = {productRating} 
        />
      ):navigate('/')}
    </div>
  )
}
export default Product;