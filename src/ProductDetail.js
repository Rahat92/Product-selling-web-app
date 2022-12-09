import React, {memo} from 'react';
import './ProductDetail.css';
const ProductDetail = memo(({product, Loading}) => {
  return (
    <div className='super_div'>
      <div className='main_div'>
        <h3><span>Name: </span><span>{product&&product.name}</span><br/></h3>
          <div style = {{width: '300px',height: '250px', position:'relative', margin:'2rem 0'}}>
            {Loading?<div style = {{width: '100%', height: '100%'}}></div>:(
              <img style={{border: !Loading&&'.5px solid rgba(0,0,0,.5)', borderRadius:'10px'}} className='product_img' src = { `/public/img/users/${!Loading&&product&&product.photo}` } />
            )}
          </div>
        <h3><span>Category: </span><span>{product&&product.category}</span></h3>
        <h3><span>Price: </span><span>{product&&product.price}</span></h3>
        <h3><span>Total ratings: </span><span>{product&&product.numberOfRatings}</span></h3>
        <h3><span>Ratings: </span><span>{product&&product.ratingsAverage&&product.ratingsAverage.toFixed()}</span></h3>
        <h3>{product&&product.review&&product.review.length} reviews</h3>
      </div>
    </div>
  )
})
export default ProductDetail;