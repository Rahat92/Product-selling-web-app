import React, {memo} from "react"
import { Link } from "react-router-dom"
import CreateReviewForm from "./CreateReviewForm"
import Modal from "./Modal"
import UpdateReviewForm from "./UpdateReviewForm"
import './ReviewSection.css';
const ReviewSection = memo(({user,sendReview, createUserReview,result, deleteOneReview,setReviewPageNo,setDeleteClick, deleteClick, id,editReviewClick, editMyReview, deleteReview,currentPage,previousCommentClickButton, totalReview, moreComment,moreCommentButtonClick,Loading, recentNum, product, reviewEditCancel, editReview, updateMyReview, isLoading, reviews}) => {
  return(
    <div className="super_div">
      <h2 style={{marginBottom:'.2rem'}}>Comments:</h2>
      {!isLoading&&reviews&&reviews.length === 0?(<div><h2 style={{color:'red'}}>No comment available</h2></div>)
        :
      <div>
        <button type='button' style={{border:'none', marginBottom:'.5rem', visibility:`${currentPage>1?'visible':'hidden'}`, fontWeight:'700'}} onClick={()=>previousCommentClickButton(product._id)}>Previous review</button>
      </div>
      }
    
      <div style={{borderRadius:'3px', color:'brown', overflow:'hidden'}}>
        {isLoading?'Loading...':(

        reviews&&reviews.length>0&&reviews.map(el=>{
          return editReviewClick&&user&&el.user._id === user._id?
            <div style = {{border:`${user&&el.user._id === user._id?'2px':'1px'} solid ${user&&el.user._id === user._id?'red':''}`, padding:'.5rem'}}>
              <UpdateReviewForm reviewEditCancel={reviewEditCancel} editReview = {editReview} updateMyReview={(e)=>updateMyReview(e,el._id,product._id)} />
            </div>

          :
            <div className={`comment ${user&&el.user&&el.user._id === user._id&& 'user_comment'}`} style = {{ position:'relative', padding:'.5rem'}}>
              <h4 style = {{color:user&&el.user&&el.user._id === user._id?'green':'', padding:'0px', margin:'0', fontSize: user&&el.user&&el.user._id === user._id? '1.5rem':'1rem', fontWeight:user&&el.user&&el.user._id === user._id?700:400}}>
                {el.user?(
                <Link to = {user&&el.user&&el.user._id === user._id?'/me':`/profile/${el.user._id}`}>
                  {el.user&&el.user.name}
                </Link>
                ):<h4 style={{color:'white'}}>Removed user</h4>}
              </h4>
              <h4 style = {{color:user&&el.user&&el.user._id === user._id?'green':''}}>{el.review}</h4>
              {user&&el.user&&el.user._id === user._id&&(
                <div>
                  <button onClick= {()=>deleteReview(el._id)}>delete</button><button onClick={()=>editMyReview(el._id, el.review, el.rating)}>edit</button>
                  {deleteClick? <Modal productId={product.id} id = {id} setDeleteClick = {setDeleteClick} deleteClick = {deleteClick} setReviewPageNo = {setReviewPageNo} deleteOne = {deleteOneReview} />:''}
                </div>
              )}
              {user&&user.role === 'admin'&&(
                <div>
                  <button onClick= {()=>deleteReview(el._id)} style={{position: 'absolute', top: '.5rem', right:'.5rem'}} type='button'>delete</button>
                  {deleteClick? <Modal productId={product.id} id = {id} setDeleteClick = {setDeleteClick} deleteClick = {deleteClick} deleteOne = {deleteOneReview} />:''}
                </div>
              )}
            </div>
        })
        
        )}
      </div>
      <div style={{ position:'relative', display:'flex', alignItems:'flex-start', justifyContent:'space-between'}}>
        <button ref={moreComment} type='button' style={ {outline:'0', marginTop:'.5rem', border:'none', visibility:`${product&&product.review&&product.review.length>recentNum&&result!==0&&!Loading?'visible':'hidden'}`, fontWeight:'700'} } onClick = {()=>moreCommentButtonClick(product&&product._id)}>More comments</button>
        {!isLoading&&reviews.length>0?(
          <h4 style={{ marginTop:'.5rem' }}>{recentNum} of {totalReview}</h4>
        ):''}
      </div>
      {user&&user.role === 'user'&&!createUserReview&&
        (!isLoading&&product&&product.review&&!product.review.find(el=>el.user&&el.user._id === user._id)&&
        <CreateReviewForm sendReview={(e) => sendReview(e,product&&product.id)} />
      )}
  </div>
  )
})
export default ReviewSection