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
  const [ clickProduct, setClickProduct ] = useState(false);
  const [ id, setId ] = useState()
  const [ createUserReview, setCreateUserReview ] = useState(false)
  const [search, setSearch] = useState('');
  const [ editReviewClick, setEditReviewClick ] = useState(false)
  const [ photo, setPhoto ] = useState('')
  const [deleteClick, setDeleteClick] = useState(false);
  const [ editReview, setEditReview ] = useState({
    review:'',
    rating:''
  })
  const [productClick, setProductClick] = useState({
    id:'',
    isChange: false
  })
  
  const moreComment = useRef();
  let styl;
  if(moreComment.current){
    if(moreComment.current.style.visibility === 'hidden'){
      styl = '3px'
    }
  }
  const {  user } = useSelector(state=>state.user)
  const { product,Loading } = useSelector(state=> state.singleProduct)
  const { result, isLoading } = useSelector(state=>state.reviews)
  const { productsLoading } = useSelector(state=> state.allProduct)

 
  const navigate = useNavigate()
  // const param = useParams();

  // const currentUrl = window.location.pathname;

  const [searchParam, setSearchParams] = useSearchParams();
  let yourpage = searchParam.get('page')
  const myPage = new URLSearchParams().get('page')
  // const sortvalue = new URLSearchParams(location).get('sort')
  const selector = useSelector(state=> state)
  const dispatch = useDispatch();
  const price = selector.sortValue === 'price'?'-price':selector.sortValue
  if(yourpage === null){
    yourpage = 1
  }
  useEffect(()=>{
    document.title = 'Home'
    // setId(null)
    // setClickProduct(prev=>false)
    // setCreateUserReview(false)
    // setEditReviewClick(false)
    // setProductClick({
    //   id: null,
    //   isChange: null
    // })
    // setClickProduct(false)
    if(yourpage){
      selector.currentNum = yourpage
    }
    const request = () => {
      dispatch(fetchProducts(selector.currentNum || myPage,price, search))
    }
    let timer;
    
    if(!productsLoading){
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
    return ()=> {
      console.log('clean works')
      clearTimeout(timer)
      setClickProduct(null)
      setId(null)
    }

  },[search,yourpage, price, myPage])
  useEffect(() => {
    if(id&&clickProduct){
      dispatch(getSingleProduct(id))
      dispatch(getProductReviews(id))
    }
    // return () => {
    //   setId(null)
    // }
  },[productClick.id, productClick.isChange])
  console.log('clickProduct',clickProduct)
  console.log('id',id)
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
  
  const getProduct = (productId) => {
    // dispatch(getSingleProduct(productId))
    // dispatch(getProductReviews(productId))
    setId(productId)
    setCreateUserReview(false)
    setClickProduct(true)
    setProductClick(prev=>{
      return{
        id:productId,
        isChange:prev.id !== productId?true:false
      }
    })
  }
  const deleteProduct = (id) => {
    setDeleteClick(true)
    setId(id)
  } 

  const editProduct = (id) => {
    dispatch(editProduct(id))
  }
  
  const createProduct = () => {
    dispatch(createNewProduct())
  }
  const postProduct = (e) => {
    e.preventDefault();
    selector.createAProduct = true;
    let formData = new FormData();
    formData.append('name', e.target.productName.value)
    formData.append('category', e.target.productCategory.value)
    formData.append('price', e.target.price.value)
    console.log(photo)
    if(photo){
      formData.append('photo', photo)
    }
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }
    dispatch(createAProduct(formData, navigate,undefined, e))
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
  const updateMyReview = (e, id, productId,reviewEditCancel) => {
    e.preventDefault()
    dispatch(updateReview(id, e.target.review.value, e.target.rating.value, getProduct, productId, setEditReviewClick, reviewEditCancel, productClick, setProductClick))
  }
  const sendProductDataToEditForm = (productName, productPrice, productPhoto, productCategory, id) => {
    anyFunc(productName, productPrice, productPhoto, productCategory)
    navigate(`product/${id}`)
  }
  
  const changeProductPhoto = (e) => {
    setPhoto(e.target.files[0])
  }
  const allProduct = () => {
      return(
          <div style={{display:'flex'}}>
            <Products 
              yourpage = {yourpage}
              deleteOneProduct = {deleteOneProduct} 
              setClickProduct = {setClickProduct}
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
              clickProduct&&
              <div style = {{display:'flex', boxSizing:'border-box', flex: '0 0 74%' , alignItems:'flex-start', margin: '1rem 3rem', gap:'50px', justifyContent: 'space-between'}}>
                <Container>
                  <ProductDetail productChange = {productClick.isChange} />
                </Container>
                <ReviewSection 
                  clickProduct = {clickProduct}
                  product = {product} 
                  productClick = {productClick}
                  setId = {setId}
                  getProduct = {getProduct}
                  editReview = {editReview} 
                  updateMyReview = {updateMyReview} 
                  isLoading = {isLoading} 
                  reviewEditCancel = {reviewEditCancel}
                  moreComment = {moreComment}
                  Loading = {Loading}
                  productChange = {productClick.isChange}
                  editReviewClick = {editReviewClick}
                  editMyReview = {editMyReview}
                  deleteClick = {deleteClick}
                  id = {id}
                  setDeleteClick = {setDeleteClick}
                  deleteOneReview = {deleteOneReview}
                  result = {result}
                  createUserReview = {createUserReview}
                  setCreateUserReview = {setCreateUserReview}
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
