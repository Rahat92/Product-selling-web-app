import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editProduct, getSingleProduct } from './actions';
import EditProductInfo from './EditProductInfo';
const Product = ({ productName, productPrice, productPhoto, productCategory }) => {
  const navigate = useNavigate()
  const parameter = useParams()
  const dispatch = useDispatch()
  const {product} = useSelector(state => state.singleProduct)
  const { user, loading } = useSelector(state=>state.user)
  const { editedProduct } = useSelector(state=>state)
  useEffect(()=> {
    if(!productName||!productPrice || !productPhoto || !productCategory ){
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
  const onSubmit = (formData) => {
    // e.preventDefault();
    // const newProductName = e.target.product.value;
    // const newPrice = e.target.price.value;
    // const formData = new FormData()
    // formData.append('name', newProductName)
    // formData.append('price', newPrice)
    // formData.append('photo', photo )
    dispatch(editProduct(parameter.id,formData,navigate))
  }
  if(!productName||!productPrice||!productCategory||!productPhoto){
    if(!product){
      return <h1>loading...</h1>
    }
  }
  return(
    !loading&&
    <div>
      {user&&user.role==='admin'?(
        <EditProductInfo
          // onSubmit = { onSubmit }
          productName = {productName} 
          product = {product} 
          parameter = {parameter} 
          productPrice = {productPrice} 
          productPhoto = { productPhoto }
          productCategory = { productCategory }
        />
      ):navigate('/')}
    </div>
  )
}
export default Product;