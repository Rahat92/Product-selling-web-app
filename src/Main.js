import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSearchParams, useSearchParams, useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { trackSortedValue,decrease, increase, fetchProducts, getSingleProduct, deleteOneProduct, editProduct, createNewProduct, createAProduct, getMe, createReview, deleteOneReview, updateReview, getProductReviews } from './actions';
import CreateReviewForm from './CreateReviewForm';
import Modal from './Modal';
import UpdateReviewForm from './UpdateReviewForm';
import './Main.css';
import ProductDetail from './ProductDetail';
import ReviewSection from './ReviewSection';
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
                return (
                  <div className= {clickProduct&& el.id === product.id?'active_product':''}>
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
             <div style = {{display:'flex',alignItems:'flex-start', margin: '3rem'}}>
              <ProductDetail product = {product} Loading = {Loading} />
              <ReviewSection 
                product = {product} 
                editReview = {editReview} 
                updateMyReview = {updateMyReview} 
                isLoading = {isLoading} 
                reviews = {reviews} 
                user = {user} 
                reviewEditCancel = {reviewEditCancel}
                recentNum = {recentNum}
                totalReview = {totalReview}
                moreComment = {moreComment}
                moreCommentButtonClick = {moreCommentButtonClick}
                Loading = {Loading}

                currentPage = {currentPage}
                previousCommentClickButton = {previousCommentClickButton}
                editReviewClick = {editReviewClick}
                deleteReview = {deleteReview}
                editMyReview = {editMyReview}
                deleteClick = {deleteClick}
                id = {id}
                setDeleteClick = {setDeleteClick}
                setReviewPageNo = {setReviewPageNo}
                deleteOneReview = {deleteOneReview}
                result = {result}
                createUserReview = {createUserReview}
                sendReview = {sendReview}
              />
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
