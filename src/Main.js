import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSearchParams, useSearchParams, useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { trackSortedValue,decrease, increase, fetchProducts, getSingleProduct, deleteOneProduct, editProduct, createNewProduct, createAProduct, getMe, createReview, deleteOneReview, updateReview, getProductReviews } from './actions';
import CreateReviewForm from './CreateReviewForm';
import Modal from './Modal';
import UpdateReviewForm from './UpdateReviewForm';
import './Main.css';
const Main = ({anyFunc}) => {
  const [ clickProduct, setClickProduct ] = useState();
  const [padding, setPadding] = useState('bad')
  const moreComment = useRef();
  let styl;
  if(moreComment.current){
    if(moreComment.current.style.visibility === 'hidden'){
      styl = '3px'
    }
  }
  const { isAuthenticated, user, loading } = useSelector(state=>state.user)
  const [ createUserReview, setCreateUserReview ] = useState(false)
  const navigate = useNavigate()
  // const param = useParams();
  const [search, setSearch] = useState('');
  const [ editReviewClick, setEditReviewClick ] = useState(false)
  const [ editReview, setEditReview ] = useState({
    review:'',
    rating:''
  })
  const [ photo, setPhoto ] = useState('')

  // const currentUrl = window.location.pathname;
  const [deleteClick, setDeleteClick] = useState(false);
  const [ id, setId ] = useState()
  const { reviews, result, recentNum, currentPage, totalReview, isLoading } = useSelector(state=>state.reviews)
  const [ reviewPageNo, setReviewPageNo ] = useState(1)
  const [searchParam, setSearchParams] = useSearchParams();
  let yourpage = searchParam.get('page')
  const myPage = new URLSearchParams().get('page')
  console.log('mypage', myPage)
  // const sortvalue = new URLSearchParams(location).get('sort')
  const selector = useSelector(state=> state)
  const { product,Loading } = useSelector(state=> state.singleProduct)
  console.log(product)
  const dispatch = useDispatch();
  const price = selector.sortValue === 'price'?'-price':selector.sortValue
  if(yourpage === null){
    yourpage = 1
  }
  useEffect(()=>{
    console.log(yourpage)
    setCreateUserReview(false)
    setEditReviewClick(false)
    // if(!search){
    //   dispatch(getMe())
    // }
    
    if(yourpage){
      selector.currentNum = yourpage
    }
    const request = () => {
      dispatch(fetchProducts(selector.currentNum || myPage,price, search))
    }

    // selector.currentNum = selector.currentNum
    // if(selector.allProduct.data){
    //   if(selector.allProduct.data.result<4 && search.length>0){
    //     selector.currentNum = 1
    //   }
    // }
    let timer;
    
    if(selector.allProduct.data){
      if(search){
        selector.currentNum= 1
      }else{
        selector.currentNum = selector.currentNum;
      }
    }
    if(search){
      timer = setTimeout(()=>{
        // if(selector.allProduct.data.result>4){
        //   console.log('hello world')
        //   selector.currentNum = selector.currentNum
        // }
        // if(selector.allProduct.data.result<=4){
        //   selector.currentNum = 1
        // }
        
        request()
      },500)
    }
    if(search.length === 0){
      request()
    }
    return ()=> clearTimeout(timer)

  },[user,selector.deleteproduct.data,reviews, selector.createBrandNewProduct.data,price, selector.currentNum,search])
  const doIncrease = () => {
    dispatch(increase())
    setSearchParams({
      page: yourpage*1+1
    })
  }
  const doDecrease = () => {
    dispatch(decrease());
    setSearchParams({
      page: yourpage*1-1
    })
  }
  const getProduct = (id) => {
    dispatch(getSingleProduct(id))
    setClickProduct(true)
    setReviewPageNo(1)
  }
  const deleteProduct = (id) => {
    // dispatch(deleteOneProduct(id))
    setDeleteClick(true)
    setId(id)
  } 
  const deleteReview = (id) => {
  // const deleteReview = (id) => {
    setDeleteClick(true)
    setId(id)
    // dispatch(deleteOneReview(id))
  }
  const editProduct = (id) => {
    dispatch(editProduct(id))
  }
  const sendReview = (e,productId) => {
    e.preventDefault()
    const review = e.target.review.value;
    const rating = e.target.rating.value;
    dispatch(createReview(review,rating,getProduct,productId, setCreateUserReview))
  }
  const createProduct = () => {
    dispatch(createNewProduct())
  }
  const postProduct = (e) => {
    e.preventDefault();
    console.log(photo)
    selector.createAProduct = false;
    let formData = new FormData();
    formData.append('name', e.target.productName.value)
    formData.append('category', e.target.productCategory.value)
    formData.append('price', e.target.price.value)
    formData.append('photo', photo)
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
  }
    dispatch(createAProduct(formData, navigate))
  }
  const trackSortValue =(e)=> {
    dispatch(trackSortedValue(e.target.value))
    setSearchParams({
      sort: e.target.value
    })
  }
  
  const searchFor = (e) => {
    setSearch(e.target.value)
  }
  const editMyReview = (id, review, rating) => {
    setEditReviewClick(true)
    setEditReview({
      review,
      rating
    })
  }
  const reviewEditCancel = () => {
    setEditReviewClick(false)  
  }
  const updateMyReview = (e, id, productId) => {
    e.preventDefault()
    console.log('should update')
    dispatch(updateReview(id, e.target.review.value, e.target.rating.value, getProduct, productId, setEditReviewClick, setReviewPageNo, reviewPageNo))
  }
  const sendProductDataToEditForm = (productName, productPrice, productPhoto, productCategory, id) => {
    anyFunc(productName, productPrice, productPhoto, productCategory)
    navigate(`product/${id}`)
  }
  // const getReviews = () => {
  //   console.log(reviewPageNo+1)
  // }
  const previousCommentClickButton = (productId) => {
    setReviewPageNo(reviewPageNo-1);
    dispatch(getProductReviews(productId, reviewPageNo-1))
  }
  const moreCommentButtonClick = (productId) => {
    setReviewPageNo(reviewPageNo+1);
    console.log(reviewPageNo+1)
    dispatch(getProductReviews(productId, reviewPageNo+1))
  }
  const changeProductPhoto = (e) => {
    setPhoto(e.target.files[0])
  }
  const allProduct = () => {
    if(!selector.allProduct.data){
      return <p>Loading data, Please wait...</p>
    }
    return(
        <div style={{display:'flex'}}>
          <div>
            <h1>Total Documents: {selector.allProduct.data.docNum}</h1>
            <ul style={{listStyle: 'none'}}>
              {selector.allProduct.data.docs.length>0?selector.allProduct.data.docs.map(el=>{
                {console.log(el.photo)}
                return (
                  <div>
                    <li key = {el.id}>{el.name}({el.price}) <button key = {el.id} onClick={()=>getProduct(el.id)}>Detail</button>{user&&user.role === 'admin'&&(<><button onClick={()=>deleteProduct(el.id)}>delete</button><button onClick={()=>sendProductDataToEditForm(el.name, el.price, el.photo, el.category, el.id)}>edit product</button></>)}</li>
                    {deleteClick? <Modal id = {id} setDeleteClick = {setDeleteClick} deleteClick = {deleteClick} deleteOne = {deleteOneProduct} />:''}
                  </div>
                )
              }):<div><h1 style={{color:'red'}}>No more document found</h1></div>}
            </ul>
            {console.log(yourpage)}
            <button onClick={doDecrease} disabled = {yourpage*1 === 1||selector.currentNum ===1 ? true:false}>decrease</button>
            <button onClick={doIncrease} disabled = {selector.allProduct.data&& yourpage >= selector.allProduct.data.totalPage?true:false}>increase</button><br/>
            {user&&user.role === 'admin'&&(!selector.createAProduct?
            (
              <button type = 'button' onClick={createProduct}>create new Product</button>
            ):(
              <form onSubmit={postProduct}>
                ProductName &nbsp;:&nbsp;
                <input type = 'text' name = 'productName' /><br /><br />
                ProductCategory &nbsp;:&nbsp;
                <input type = 'text' name = 'productCategory' /> <br /> <br />
                Price &nbsp;:&nbsp;
                <input type = 'number' name = 'price' /><br />
                <input type = 'file' onChange={changeProductPhoto} name = 'photo' />
                <input type= 'submit' value= 'create'/>
              </form>
            ) )}
            <br />
          </div>
          {
             clickProduct&&product&&product.photo&&
             <div style = {{display:'flex', margin: '3rem'}}>
               <div>
                 <h2><span style = {{background:'grey', padding:'.3rem', borderRadius:'3px'}}>{product&&product.name}</span>'s details</h2>
                 <span style={{color:'red', fontSize:'30px', fontWeight:'bolder'}}>Name: </span><span style={{color:'green', fontWeight:'bolder', fontSize:'30px'}}>{product&&product.name}</span><br/>
                 <img style={{width:'200px', height: '200px', borderRadius:'5px'}} src = { `/public/img/users/${!Loading&&product?product.photo:'loading'}` } /><br />
                 <span style={{color:'red', fontSize:'20px', fontWeight:'bolder'}}>Category: </span><span style={{color:'green', fontWeight:'bolder', fontSize:'30px'}}>{product&&product.category}</span><br/>
                 <span style={{color:'red', fontSize:'20px', fontWeight:'bolder'}}>Price: </span><span style={{color:'green', fontWeight:'bolder', fontSize:'30px'}}>{product&&product.price}</span><br/>
                 <span style={{color:'red', fontSize:'20px', fontWeight:'bolder'}}>Total ratings: </span><span style={{color:'green', fontWeight:'bolder', fontSize:'30px'}}>{product&&product.numberOfRatings}</span><br/>
                 <span style={{color:'red', fontSize:'20px', fontWeight:'bolder'}}>Ratings: </span><span style={{color:'green', fontWeight:'bolder', fontSize:'30px'}}>{product&&product.ratingsAverage&&product.ratingsAverage.toFixed()}</span>
                 <h3>{product&&product.review&&product.review.length} reviews</h3>
               </div>
               <div style={{ overflow:'hidden', borderRadius:'7px', marginLeft:'1rem', padding:'0rem 1rem', boxShadow: '0px 0px 10px 3px rgba(0,0,0,.2)', minWidth:'300px'}}>
                   <h2 style={{marginBottom:'.2rem'}}>Comments:</h2>
                   {!isLoading&&reviews&&reviews.length === 0?(<div><h2 style={{color:'red'}}>No comment available</h2></div>)
                     :
                   <div>
                     <button type='button' style={{border:'none', marginBottom:'.5rem', visibility:`${currentPage>1?'visible':'hidden'}`, fontWeight:'700'}} onClick={()=>previousCommentClickButton(product._id)}>Previous review</button>
                   </div>
                   }
                   <div style={{borderRadius:'3px', color:'brown', overflow:'hidden'}}>
                     {!isLoading&&reviews&&reviews.length>0&&reviews.map(el=>{
                       return el.user&&editReviewClick&&user&&el.user._id === user._id?
                         <div style = {{border:`${user&&el.user._id === user._id?'2px':'1px'} solid ${user&&el.user._id === user._id?'red':''}`, padding:'.5rem'}}>
                           <UpdateReviewForm reviewEditCancel={reviewEditCancel} editReview = {editReview} updateMyReview={(e)=>updateMyReview(e,el._id,product._id)} />
                         </div>
   
                       :
                         <div className={`comment ${user&&el.user&&el.user._id === user._id&& 'user_comment'}`} style = {{ position:'relative', padding:'.5rem'}}>
                           <h4 style = {{color:user&&el.user&&el.user._id === user._id?'green':'', padding:'0px', margin:'0', fontSize: user&&el.user&&el.user._id === user._id? '1.5rem':'1rem', fontWeight:user&&el.user&&el.user._id === user._id?700:400}}>
                             {el.user?(
                             <Link to = {user&&el.user&&el.user._id === user._id?'/me':`/profile/${el.user._id}`}>
                               {el.user.name}
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
                     }
                   </div>
                   <div style={{ position:'relative', display:'flex', alignItems:'flex-start', justifyContent:'space-between'}}>
                     <button ref={moreComment} type='button' style={ {outline:'0', marginTop:'.5rem', border:'none', visibility:`${product&&product.review&&product.review.length>recentNum&&result!==0&&!Loading?'visible':'hidden'}`, fontWeight:'700'} } onClick = {()=>moreCommentButtonClick(product&&product._id)}>More comments</button>
                     {!isLoading&&reviews.length>0?(
                       <h4 style={{ marginTop:'.5rem' }}>{recentNum} of {totalReview}</h4>
                     ):''}
                   </div>
                   
                   {user&&user.role === 'user'&&!createUserReview&&
                     (product&&product.review&&!product.review.find(el=>el.user&&el.user._id === user._id)&&
                     <CreateReviewForm sendReview={(e) => sendReview(e,product&&product.id)} />
                   )}
   
               </div>
             </div> 
          }
      </div>
    )
  }
  const params = {
    name:'rahat',
    age:30,
    hobby:'gardening'
  }
  const gotoParams = () => {
    navigate({
      pathname:'/params',
      search:`?${createSearchParams(params)}`
    })
  }
  return (
    <div className='main'>
        <input style={{marginTop:'1.5rem'}} placeholder='Search product by name' onChange = {searchFor} type = 'text' value={search} name = 'keyword'/>
      <br />
      {/* <button type='button' onClick={gotoParams}>params</button> */}
      <br />      
        <select onChange={trackSortValue}>
          <option>price</option>
          <option>ratingsAverage</option>
        </select>
      {allProduct()}
      
      {/* { !selector.deleteproduct.data?'':afterDelete() } */}
    </div>
  );
}

export default Main;
