import { tracsortvalue,createASingleProduct, createProduct, decreaseNum, getAProduct, deleteAProduct, handleInputChange, fetchAllProduct, increaseNum, editSingleProduct, loginRequest, loginSuccess, loginFail, getMeSuccess, getMeRequest, getMeFail, logOutRequest, logOutSuccess, logOutFail, createMyReviewRequest, createReviewError, createMyReviewSuccess, createMyReviewFail, getProductReviewRequest, getProductReviewSuccess, getProductReviewFail } from "../const"
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
export const getSingleProduct = (id) => {
  let response;
  return async(dispatch) => {
    await requestCreator.get(`/products/${id}`).then((data) => {
      response = data.data;
    }).catch(err=>{
      response = err.message
    })
    dispatch({
      type:getAProduct,
      payload:response
    })
  }
}

export const deleteOneProduct = (id) => {
  let response;
  return async (dispatch) => {
    await requestCreator.delete(`/products/${id}`).then(data=>{
      response = data;
    }).catch(err=>  response = err.response)
    dispatch({
      type:deleteAProduct,
      payload:response
    })
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
export const createAProduct = (product, price) => {
  let response;
  return async(dispatch) => {
    await requestCreator.post(`products`,{
      name: product,
      price: price    
    }).then((data) => response = data).catch(err=>response = err)
    dispatch({
      type: createASingleProduct,
      payload: response
    })
  }
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

export const createReview = (review,rating,productId) => {
  return async(dispatch) => {
    try{
      dispatch({
        type: createMyReviewRequest
      })
      const {data} = await requestCreator.post(`/products/${productId}/reviews`,{
        review: review,
        rating: rating
      })
      dispatch({
        type:createMyReviewSuccess,
        payload:data
      })
    }catch(error){
      dispatch({
        type:createMyReviewFail,
        payload: error.response
      })
    }
  }
}

export const getProductReviews = (productId) => {
  return async(dispatch) => {
    try{
      dispatch({type: getProductReviewRequest})
      const { data } = await requestCreator.get(`/products/${productId}/reviews`)
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