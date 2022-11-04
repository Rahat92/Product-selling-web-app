import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editProduct, getMe, getSingleProduct, handleChange } from './actions';
const Product = () => {
  const navigate = useNavigate()
  const parameter = useParams()
  const dispatch = useDispatch()
  const selector = useSelector(state => state.singleProduct)
  const { editedProduct, user }  = useSelector(state=>state)

  useEffect(()=> {
    dispatch(getSingleProduct(parameter.id))    
    dispatch(getMe())
  },[parameter.id])
  if(user.user === null){
    navigate('/login')
  }
  if(user.user&&user.user.role !== 'admin'){
    navigate('/')
  }
  console.log(user)
  const onsubmit = (e) => {
    e.preventDefault();
    const productName = e.target.product.value;
    const rating = e.target.rating.value;
    dispatch(editProduct(parameter.id,productName, rating))
    setTimeout(()=>{
      if(editedProduct&&editedProduct.data.status === 'success'){
        navigate('/')
      }else{
        navigate('/about')
      }
    },500)
  }
  if(!selector.doc){
    return 'loading...'
  }
  return(
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={onsubmit}>
        product Name: <br />
        <input type = "text" name = 'product' defaultValue = {selector.doc._id === parameter.id?selector.doc.name:''} /><br />
        Product Rating: <br />
        <input type= 'number' name = 'rating' defaultValue = {selector.doc._id === parameter.id?selector.doc.ratingsAverage:''}/>
        <input type= 'submit' />
      </form>
    </div>
  )
}
export default Product;