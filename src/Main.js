import React, { useEffect, useState, useRef, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSearchParams, useSearchParams, useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { trackSortedValue,decrease, increase, fetchProducts, getSingleProduct, deleteOneProduct, editProduct, createNewProduct, createAProduct, getMe, createReview, deleteOneReview, updateReview, getProductReviews } from './actions';
import './Main.css';
import ProductDetail from './ProductDetail';
import Container from './Container';
import ReviewSection from './ReviewSection';
import Products from './Products';
import FilterProduct from './FilterProduct';
const Main = memo(({anyFunc}) => {
  const [ clickProduct, setClickProduct ] = useState();
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
    if(yourpage){
      selector.currentNum = yourpage
    }
    const request = () => {
      dispatch(fetchProducts(selector.currentNum || myPage,price, search))
    }
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
    setDeleteClick(true)
    setId(id)
  } 
  const deleteReview = (id) => {
    setDeleteClick(true)
    setId(id)
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
          <Products 
            yourpage = {yourpage}
            deleteOneProduct = {deleteOneProduct} 
            createProduct = {createProduct}
            postProduct = {postProduct}
            changeProductPhoto = {changeProductPhoto}
            doDecrease = {doDecrease}
            doIncrease = {doIncrease} 
            selector = {selector}
            clickProduct = {clickProduct}
            id = {id}
            product = {product}
            setDeleteClick = {setDeleteClick}
            deleteClick = {deleteClick}
            getProduct = {getProduct}
            user = {user}
            deleteProduct = {deleteProduct}
            sendProductDataToEditForm = {sendProductDataToEditForm}
          />
          {
            product.photo&&
            <div style = {{display:'flex', boxSizing:'border-box', flex: '0 0 75%' , alignItems:'flex-start', margin: '3rem', justifyContent: 'space-around'}}>
              <Container>
                <ProductDetail product = {product} Loading = {Loading} />
              </Container>
              <ReviewSection 
                product = {product} 
                editReview = {editReview} 
                updateMyReview = {updateMyReview} 
                isLoading = {isLoading} 
                reviews = {reviews} 
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
  // const gotoParams = () => {
  //   navigate({
  //     pathname:'/params',
  //     search:`?${createSearchParams(params)}`
  //   })
  // }
  return (
    <div className='main'>
        <FilterProduct 
          search={search} 
          searchFor = {searchFor}
          trackSortValue = {trackSortValue}
        />
      <div>
        {allProduct()} 
      </div>     
    </div>
  );
})

export default Main;
