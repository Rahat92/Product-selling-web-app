import { 
  createUserReviewRequest,
  createUserReviewSuccess,
  createUserReviewFail,
  tracsortvalue,
  createASingleProduct, 
  createProduct, 
  decreaseNum, 
  getAProduct, 
  deleteAProduct, 
  handleInputChange, 
  fetchAllProduct, 
  increaseNum, 
  editSingleProduct, 
  loginRequest, 
  loginSuccess, 
  loginFail, 
  getMeSuccess, 
  getMeRequest, 
  getMeFail, 
  logOutRequest, 
  logOutSuccess, 
  logOutFail, 
  createMyReviewRequest, 
  createReviewError, 
  createMyReviewSuccess, 
  createMyReviewFail, 
  getProductReviewRequest, 
  getProductReviewSuccess, 
  getProductReviewFail, 
  deleteReviewRequest, 
  deleteReviewSuccess, 
  deleteReviewFail,
  getAllActiveUserRequest, 
  getAllActiveUserSuccess, 
  getAllActiveUserFail,
  updateReviewRequest,
  updateReviewSuccess,
  updateReviewFail,
  createProductNameAndPrice,
  getProductNameAndPrice,
  getSingleUserRequest,
  getSingleUserSuccess,
  getSingleUserFail, 
} from "../const"
import requestCreator from '../axios.js';
export const increase = () => {
  return {
    type: increaseNum,
    payload: 1
  }
}
export const decrease = () => {
  return{
    type:decreaseNum,
    payload:1
  }
}
export const fetchProducts = (currentPage, sortvalue, searchValue) => {  
  return async(dispatch) => {
    const response = await requestCreator.get('/products',{
      params:{
        page:currentPage,
        sort:sortvalue,
        keyword:searchValue
      }
    })
    dispatch({
      type:fetchAllProduct,
      payload: response
    })
  }
}
export const getProductReviews = (productId, pageNo) => {
  console.log('from action',pageNo)
  return async(dispatch) => {
    try{
      dispatch({type: getProductReviewRequest})
      const { data } = await requestCreator.get(`/products/${productId}/reviews`,{
        params:{
          page:pageNo
        }
      })
      dispatch({
        type: getProductReviewSuccess,
        payload: data
      })
    }catch(error){
      dispatch({
        type:getProductReviewFail,
        payload: error.response
      })
    }
  }
}
export const getSingleProduct = (id, setReviewPageNo, currentPage) => {
  return async(dispatch) => {
    try{
      const { data } = await requestCreator.get(`/products/${id}`)
      dispatch({
        type:getAProduct,
        payload:data
      })
      dispatch(getProductReviews(id))
      if(setReviewPageNo){
        setReviewPageNo(1)
      }
    }catch(error){
      dispatch({
        type: 'getAProductFail',
        payload:error.response.data
      })
    }
  }
}

export const deleteOneProduct = (id, setDeleteClick) => {
  let response;
  return async (dispatch) => {
    await requestCreator.delete(`/products/${id}`).then(data=>{
      response = data;
    }).catch(err=>  response = err.response)
    dispatch({
      type:deleteAProduct,
      payload:response
    })
    setDeleteClick(false)
  }
}
export const editProduct =(id, name, rating, navigate) => {
  let response;
  return async (dispatch) => {
    await requestCreator.patch(`/products/${id}`,{
      name:name,
      rating:rating
    }).then(data=>response = data).catch(err => response = err)
    dispatch({
      type: editSingleProduct,
      payload:response
    })
    navigate('/')
  }
}

export const handleChange = (value) => {
  return {
    type: handleInputChange,
    payload: value
  }
}

export const createNewProduct = () => {
  return {
    type: createProduct,
  }
}
export const createAProduct = (product, price, navigate) => {
  return async (dispatch) => {
    try{
      const response = await requestCreator.post(`products`,{
        name: product,
        price: price    
      })
      dispatch({
        type:createASingleProduct,
        payload: response
      }) 
    }catch(error){
      dispatch({
        type:'createProductFail',
        payload: error.response.data
      })
    }
  }
  // let response;
  // return async(dispatch) => {
  //   await requestCreator.post(`products`,{
  //     name: product,
  //     price: price    
  //   }).then((data) => response = data).catch(err=>response = err)
  //   dispatch({
  //     type: createASingleProduct,
  //     payload: response
  //   })
  // }
}
export const trackSortedValue = (value) => {
  return{
    type:tracsortvalue,
    payload:value
  }
}

export const loginUser = (email, password, navigate) => {
  return async(dispatch) => {
    try{
      dispatch({
        type: loginRequest
      })
      // const config = {
      //   headers: {
      //       'Content-Type': 'application/json'
      //   }
      // }
      const {data} = await requestCreator.post('/users/login',{
        email,
        password
      })
      dispatch({
        type: loginSuccess,
        payload:data.user
      })
      navigate('/')
    }catch(error){
      dispatch({
        type:loginFail,
        payload:error.response.data
      })
    }
  }
}

export const getMe = () => {
  return async (dispatch) => {
    try{
      dispatch({
        type: getMeRequest
      })
      const { data } = await requestCreator.get(`/users/me`);
      dispatch({
        type: getMeSuccess,
        payload:data.doc
      })
    }catch(error){
      dispatch({
        type:getMeFail,
        payload:error.response.data
      })
    }
  }
}

export const getLogOut = (navigate) => {
  return async (dispatch) => {
    try{
      dispatch({
        type: logOutRequest
      })
      const response = await requestCreator.get('/users/logout')
      dispatch({
        type:logOutSuccess,
        payload:response
      })
      navigate('/login')
    }catch(error){
      dispatch({
        type:logOutFail,
        payload:error.response
      })
    }
  }
}

export const createReview = (review, rating,getProduct, productId, setCreateUserReview) => {
  return async(dispatch) => {
    try{
      dispatch({
        type: createUserReviewRequest
      })
      const { data } = await requestCreator.post(`/products/${productId}/reviews`,{
        review,
        rating,
      })
      dispatch({
        type: createUserReviewSuccess,
        payload: data.doc
      })
      // getProduct(productId)
      dispatch(getSingleProduct(productId))
      setCreateUserReview(true)
    }catch(error){
      dispatch({
        type: createUserReviewFail,
        payload: error.response
      })
    }
  }
}
export const deleteOneReview = (id, setDeleteClick, getProduct,productId, setReviewPageNo) => {
  return async(dispatch) => {
    try{
      dispatch({
        type:deleteReviewRequest
      })
      const { data } = await requestCreator.delete(`/reviews/${id}`)
      dispatch({
        type: deleteReviewSuccess,
        payload: id
      })
      setDeleteClick(false)
      // getProduct()
      dispatch(getSingleProduct(productId))
      // setReviewPageNo(2)
    }catch(error){
      dispatch({
        type: deleteReviewFail,
        payload: error.response.data
      })
    }
  }
}

export const getAllUser = () => {
  return async(dispatch) => {
    try{
      dispatch({
        type:getAllActiveUserRequest
      })
      const { data } = await requestCreator.get(`/users`)
      dispatch({
        type:getAllActiveUserSuccess,
        payload:data
      })
    }catch(error){
      dispatch({
        type: getAllActiveUserFail,
        payload: error.response.data
      })
    }
  }
}
export const updateReview = (id, review, rating, getProduct, productId, setEditReviewClick, setReviewPageNo,reviewPageNo) => {
  return async (dispatch) => {
    try{
      dispatch({
        type: updateReviewRequest
      })
      const { data } = await requestCreator.patch(`/reviews/${id}`,{
        review,
        rating
      })
      dispatch({
        type: updateReviewSuccess,
        payload: data.doc 
      })
      // setEditReviewClick(null)
      // setReviewPageNo(currentNum)
      dispatch(getSingleProduct(productId, setReviewPageNo, reviewPageNo+1))
    }catch(error){
      dispatch({
        type: updateReviewFail,
        payload: error.response.data
      })
    }
  }
}

export const getUser = (userId) => {
  return async (dispatch) => {
    try{
      dispatch({
        type: getSingleUserRequest,
      })
      const { data } = await requestCreator.get(`/users/${userId}`);
      dispatch({
        type: getSingleUserSuccess,
        payload: data.doc
      })
    }catch(error){
      dispatch({
        type: getSingleUserFail,
        payload: error.response.data
      })
    }
  }
}




///for experiment purpose

export const createProductsNameAndPrice = (name, price) => {
  return async (dispatch) => {
    const { data } = await requestCreator.post(`/products`,{
      name:name,
      price:price
    })
    dispatch({
      type: createProductNameAndPrice,
      payload: data.doc
    })
  }
}
export const getProductsNameAndPrice = () => {
  return async (dispatch) => {
    const { data } = await requestCreator.get(`/products`)
    dispatch({
      type: getProductNameAndPrice,
      payload: data.docs
    })
  }
}