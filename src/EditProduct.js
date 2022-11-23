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
  if(user.user === null){
    navigate('/login')
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
  if(!productName&&!productRating){
    if(!selector.doc){
      return <h1>loading...</h1>
    }
  }
  return(
    <div>
      {user&&user.role==='admin'?(
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
      ):navigate('/')}
    </div>
  )
}
export default Product;