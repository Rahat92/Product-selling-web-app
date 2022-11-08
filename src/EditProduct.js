import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editProduct, getMe, getSingleProduct, handleChange } from './actions';
const Product = ({ productName, productRating }) => {
  console.log(productName, productRating)
  const navigate = useNavigate()
  const parameter = useParams()
  const dispatch = useDispatch()
  const selector = useSelector(state => state.singleProduct)
  const { editedProduct, user }  = useSelector(state=>state)

  useEffect(()=> {
    if(!productName&&!productRating){
      dispatch(getSingleProduct(parameter.id))    
    }
    dispatch(getMe())
  },[parameter.id, editedProduct.data])
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
    dispatch(editProduct(parameter.id,productName, rating,navigate))
    // setTimeout(()=>{
    //   if(editedProduct&&editedProduct.data.status === 'success'){
    //     navigate('/')
    //   }else{
    //     navigate('/about')
    //   }
    // },500)
  }
  if(!selector.doc){
    return 'loading...'
  }
  return(
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={onsubmit}>
        product Name: <br />
        <input type = "text" name = 'product' defaultValue = {!productName?selector.doc._id === parameter.id?selector.doc.name:'':productName} /><br />
        Product Rating: <br />
        <input type= 'number' name = 'rating' defaultValue = {!productRating?selector.doc._id === parameter.id?selector.doc.ratingsAverage:'':productRating}/>
        <input type= 'submit' value={'update'} />
      </form>
    </div>
  )
}
export default Product;