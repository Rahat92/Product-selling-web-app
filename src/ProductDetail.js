import React, {memo, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductReviews, getSingleProduct } from './actions';
import './ProductDetail.css';
const ProductDetail = memo(({productChange, clickProduct}) => {
  const { product, Loading } = useSelector(state=>state.singleProduct)
  let myLoading = false;

  if(productChange&&clickProduct){
    myLoading = Loading
  }
  return (
    <div className='super_div'>
      <div className='main_div'>
        <h3><span>Name: </span><span>{product&&product.name}</span><br/></h3>
        <div style = {{width: '320px',height: '250px', position:'relative', margin:'1rem 0'}}>
          {
            product&&product.photo&&<img style={{border: '.5px solid rgba(0,0,0,.5)',opacity:myLoading?'.3':'1', borderRadius:'10px', display:'flex',justifyContent:'center'}} className='product_img' src = { `/public/img/users/${product&&product.photo}` } />
          }
        </div>
          <h3><span>Category: </span><span>{product&&product.category}</span></h3>
          <h3><span>Price: </span><span>{product&&product.price}</span></h3>
          <h3><span>Total ratings: </span><span>{product&&product.numberOfRatings}</span></h3>
          <h3><span>Ratings: </span><span>{product&&product.ratingsAverage}</span></h3>
          <h3>{product&&product.review&&product.review.length} reviews</h3>
      </div>
    </div>
  )
})
export default ProductDetail;