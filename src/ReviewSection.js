import React, {memo, useEffect} from "react"
import { Link } from "react-router-dom"
import CreateReviewForm from "./CreateReviewForm"
import Modal from "./Modal"
import UpdateReviewForm from "./UpdateReviewForm"
import './ReviewSection.css';
import { useDispatch, useSelector } from "react-redux"
import { createReview, getProductReviews } from "./actions"
import DeleteIcon from '@mui/icons-material/Delete';

const ReviewSection = memo(({ getProduct, productClick, setId,id, productChange,clickProduct, createUserReview, setCreateUserReview, deleteOneReview,setDeleteClick, deleteClick,editReviewClick, editMyReview, moreComment,Loading, reviewEditCancel, editReview, updateMyReview}) => {
  const dispatch = useDispatch()
  const { reviews, result, recentNum,totalReview, currentPage,isLoading } = useSelector(state=>state.reviews);
  const {product} = useSelector(state=>state.singleProduct)
  let totalReviewFromProduct = product&&product.review&&product.review.length
  if(totalReview){
    totalReviewFromProduct = totalReview
  }
  useEffect(()=>{
    setCreateUserReview(false)
  },[dispatch, productClick.isChange])
  const previousCommentClickButton = (productId) => {
    dispatch(getProductReviews(productId, currentPage-1))
  }
  const moreCommentButtonClick = (productId) => {
    dispatch(getProductReviews(productId, currentPage+1))
  }
  const sendReview = (e,productId) => {
    e.preventDefault()
    const review = e.target.review.value;
    const rating = e.target.rating.value;
    dispatch(createReview(review,rating,getProduct,productId, setCreateUserReview))
  }
  const deleteReview = (id) => {
    setDeleteClick(true)
    setId(id)
  }
  
  let myLoading = false;

  // if(productChange){
  //   myLoading = isLoading
  // }
  const {user} = useSelector(state=>state.user)
  
  return(
    <div className="super_div">
      <h2 style={{marginBottom:'.2rem'}}>Comments: {totalReviewFromProduct}</h2>
      {totalReviewFromProduct === 0?(<div><h2 style={{color:'red'}}>No comment available</h2></div>):(
        <div style={{borderRadius:'3px', color:'brown', overflow:'hidden'}}>
          <div>
        <button type='button' style={{border:'none', marginBottom:'.5rem', visibility:`${(currentPage>1)||((currentPage>1)&&(!myLoading)&&totalReviewFromProduct>0)?'visible':'hidden'}`, fontWeight:'700'}} onClick={()=>previousCommentClickButton(product._id)}>Previous review</button>
      </div>
        {
          
        reviews&&reviews.length>0&&reviews.map(el=>{
          return editReviewClick&&user&&el.user._id === user._id?
            <div style = {{border:`${user&&el.user._id === user._id?'2px':'1px'} solid ${user&&el.user._id === user._id?'red':''}`, padding:'.5rem'}}>
              <UpdateReviewForm reviewEditCancel={reviewEditCancel} editReview = {editReview} updateMyReview={(e)=>updateMyReview(e,el._id,product._id, reviewEditCancel)} />
            </div>    

          :totalReviewFromProduct>0&&
            <div className={`comment ${user&&el.user&&el.user._id === user._id&& 'user_comment'}`} style = {{ position:'relative', padding:'.4rem', opacity: isLoading&&productChange&&'.5'}}>
              <h4 style = {{color:user&&el.user&&el.user._id === user._id?'green':'', padding:'0px', margin:'0', fontSize: user&&el.user&&el.user._id === user._id? '1.5rem':'1rem', fontWeight:user&&el.user&&el.user._id === user._id?700:400}}>
                {el.user?(
                <Link to = {user&&el.user&&el.user._id === user._id?'/me':`/profile/${el.user._id}`}>
                  {el.user&&el.user.name}
                </Link>
                ):<h4 style={{color:'white'}}>Removed user</h4>}
              </h4>
              <h4 style = {{color:user&&el.user&&el.user._id === user._id?'green':'', margin:'.7rem 0'}}>{el.review}</h4>
              {user&&el.user&&el.user._id === user._id&&(
                <div>
                  <button onClick= {()=>deleteReview(el._id)}>delete</button>
                  <button onClick={()=>editMyReview(el._id, el.review, el.rating)}>edit</button>
                  {deleteClick? <Modal setCreateUserReview = {setCreateUserReview} currentPage = {currentPage} result = {result} productId={product.id} id = {id} setDeleteClick = {setDeleteClick} deleteClick = {deleteClick} getProduct = {getProduct} deleteOne = {deleteOneReview} />:''}
                </div>
              )}
              {user&&user.role === 'admin'&&(
                <div>
                  <button onClick= {()=>deleteReview(el._id)} style={{position: 'absolute', top: '.5rem', right:'.5rem'}} type='button'><DeleteIcon /></button>
                  {deleteClick&& el._id === id? <Modal productId={product.id} id = {id} setDeleteClick = {setDeleteClick} deleteClick = {deleteClick} deleteOne = {deleteOneReview} />:''}
                </div>
              )}
            </div>
        })
        
        }
      </div>
      )}
        
      <div style={{ position:'relative', display:'flex', alignItems:'flex-start', justifyContent:'space-between'}}>
        <button ref={moreComment} type='button' style={ {outline:'0', marginTop:'.5rem', border:'none', visibility:`${!myLoading&&recentNum !==0&&totalReviewFromProduct>recentNum&&result>0?'visible':'hidden'}`, fontWeight:'700'} } onClick = {()=>moreCommentButtonClick(product&&product._id)}>More comments</button>
        {recentNum !==0&&totalReviewFromProduct&&!myLoading&&reviews&&reviews.length>0?(
          <h4 style={{ marginTop:'.5rem' }}>{recentNum} of {totalReviewFromProduct}</h4>
        ):''}
      </div>
      {user&&user.role === 'user'&&!createUserReview&&!myLoading&&
        (product&&product.review&&!product.review.find(el=>el.user&&el.user._id === user._id)&&
        <CreateReviewForm sendReview={(e) => sendReview(e,product&&product.id, createUserReview)} />
      )}
  </div>
  )
})
export default ReviewSection