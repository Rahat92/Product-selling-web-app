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
  loginFail, 
  getMeSuccess, 
  getMeRequest, 
  getMeFail, 
  LOG_OUT_REQUEST, 
  LOG_OUT_SUCCESS, 
  LOG_OUT_FAIL, 
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
  GET_SINGLE_USER_REQUEST,
  GET_SINGLE_USER_SUCCESS,
  GET_SINGLE_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  DELETE_ONE_USER_REQUEST,
  DELETE_ONE_USER_SUCCESS,
  DELETE_ONE_USER_FAIL,
  UPDATE_USER_ROLE_FAIL,
  UPDATE_USER_ROLE_REQUEST,
  UPDATE_USER_ROLE_SUCCESS,
  UPDATE_MY_PROFILE_REQUEST,
  UPDATE_MY_PROFILE_SUCCESS,
  UPDATE_MY_PROFILE_FAIL, 
  EDIT_PRODUCT_REQUEST,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_FAIL,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAIL,
} from "../const"
import requestCreator from '../axios.js';
import { CREATE_PRODUCT_FAIL, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, DELETE_ONE_PRODUCT_FAIL, DELETE_ONE_PRODUCT_REQUEST, DELETE_ONE_PRODUCT_SUCCESS, GET_A_PRODUCT_FAIL, GET_A_PRODUCT_REQUEST, GET_A_PRODUCT_SUCCESS, GET_PRODUCTS_FAIL, GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS } from "../const/productConsts";
import { UPDATE_USER_PASSWORD_FAIL, UPDATE_USER_PASSWORD_REQUEST, UPDATE_USER_PASSWORD_SUCCESS } from "../userConstant";
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
// export const fetchProducts = (currentPage, sortvalue, searchValue) => {  
//   return async(dispatch) => {
//     const response = await requestCreator.get('/products',{
//       params:{
//         page:currentPage,
//         sort:sortvalue,
//         keyword:searchValue
//       }
//     })
//     dispatch({
//       type:fetchAllProduct,
//       payload: response
//     })
//   }
// }
export const fetchProducts = (currentPage, sortvalue, searchValue) => {  
  return async(dispatch) => {
    try{
      dispatch({
        type: GET_PRODUCTS_REQUEST
      })
      const {data} = await requestCreator.get('/products',{
        params:{
          page:currentPage?currentPage:undefined,
          sort:sortvalue?sortvalue:undefined,
          keyword:searchValue?searchValue:undefined
        }
      })
      dispatch({
        type:GET_PRODUCTS_SUCCESS,
        payload: data
      })
    }catch(error){
      dispatch({
        type: GET_PRODUCTS_FAIL,
        payload: error.response.data
      })
    }
  }
}
export const getProductReviews = (productId, pageNo) => {
  return async(dispatch, getState) => {
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
  return async(dispatch, getState) => {
    try{
      dispatch({
        type: GET_A_PRODUCT_REQUEST
      })
      const { data } = await requestCreator.get(`/products/${id}`)
      dispatch({
        type:GET_A_PRODUCT_SUCCESS,
        payload:data.doc
      })
      // dispatch(getProductReviews(id))
      if(setReviewPageNo){
        setReviewPageNo(1)
      }

    }catch(error){
      dispatch({
        type: GET_A_PRODUCT_FAIL,
        payload:error.response.data
      })
    }
  }
}

export const deleteOneProduct = (id, setDeleteClick, productId,setCreateUserReview,setClickProduct ) => {
  return async(dispatch) => {
    try{
      dispatch({
        type: DELETE_ONE_PRODUCT_REQUEST
      })
      await requestCreator.delete(`/products/${id}`)
      dispatch({
        type: DELETE_ONE_PRODUCT_SUCCESS,
        payload: id
      })
      setClickProduct(false)
      console.log(setClickProduct)
      setDeleteClick(false)
    }catch(error){
      dispatch({
        type: DELETE_ONE_PRODUCT_FAIL,
        payload: error.response.data
      })
    }

  }
}
export const editProduct = (formData, id, navigate) => {
  return async (dispatch) => {
    try{
      dispatch({
        type: EDIT_PRODUCT_REQUEST
      })
      const { data } = await requestCreator.patch(`/products/${id}`,formData)
      dispatch({
        type: EDIT_PRODUCT_SUCCESS,
        payload: data
      })
      navigate('/')
    }catch(error){
      dispatch({
        type: EDIT_PRODUCT_FAIL,
        payload: error.response.data
      })
    }
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
export const createAProduct = (product, price, navigate, e) => {
  return async (dispatch) => {
    try{
      dispatch({
        type: CREATE_PRODUCT_REQUEST
      })
      const { data } = await requestCreator.post(`/products`,product)
      dispatch({
        type:CREATE_PRODUCT_SUCCESS,
        payload: data.doc
      }) 
      e.target.productName.value = ''
      e.target.productCategory.value = ''
      e.target.price.value = ''
      e.target.photo.value = ''
    }catch(error){
      dispatch({
        type:CREATE_PRODUCT_FAIL,
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

export const loginUser = (email, password, navigate, setMsg) => {
  return async(dispatch) => {
    try{
      dispatch({
        type: LOG_IN_REQUEST
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
        type: LOG_IN_SUCCESS,
        payload:data.user
      })
      navigate('/')
    }catch(error){
      dispatch({
        type:LOG_IN_FAIL,
        payload:error.response.data
      })
      setMsg(true)
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
        type: LOG_OUT_REQUEST
      })
      const response = await requestCreator.get('/users/logout')
      dispatch({
        type:LOG_OUT_SUCCESS,
        payload:response
      })
      navigate('/login')
    }catch(error){
      dispatch({
        type:LOG_OUT_FAIL,
        payload:error.response
      })
    }
  }
}
export const updateUserPassword = (currentPassword, newPassword, confirmPassword) => {
  return async (dispatch) => {
    try{
      dispatch({
        type: UPDATE_USER_PASSWORD_REQUEST
      })
      const {data} = await requestCreator.patch('/users/updatepassword',{
        currentPassword, password:newPassword, passwordConfirm:confirmPassword 
      })
      dispatch({
        type:UPDATE_USER_PASSWORD_SUCCESS,
        payload:data.user
      })

    }catch(error){
      dispatch({
        type:UPDATE_USER_PASSWORD_FAIL,
        payload:error.response.data
      })
    }
  }
}

export const createReview = (review, rating,getProduct, productId, setCreateUserReview) => {
  return async(dispatch, getState) => {
    const totalReview = getState().singleProduct.product.review.length
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
        payload: {review:data.doc,totalReview}
      })
      // dispatch(getProductReviews(productId,1))
      // getProduct(productId)
      setCreateUserReview(true)
      dispatch(getSingleProduct(productId))
    }catch(error){
      dispatch({
        type: createUserReviewFail,
        payload: error.response
      })
    }
  }
}
export const deleteOneReview = (id, setDeleteClick,productId, setCreateUserReview) => {
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
      setCreateUserReview(false)
      setDeleteClick(false)
      dispatch(getSingleProduct(productId))
      // setReviewPageNo(1)
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
      setEditReviewClick(null)
      dispatch(getSingleProduct(productId))
      
      // setReviewPageNo(currentNum)
      
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
        type: GET_SINGLE_USER_REQUEST,
      })
      const { data } = await requestCreator.get(`/users/${userId}`);
      dispatch({
        type: GET_SINGLE_USER_SUCCESS,
        payload: data.doc
      })
    }catch(error){
      dispatch({
        type: GET_SINGLE_USER_FAIL,
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
export const registerUser = (name, email, password, passwordConfirm, navigate, setMsg) => {
  return async (dispatch) => {
    try{
      dispatch({
        type: REGISTER_USER_REQUEST
      })
      const { data } = await requestCreator.post('/users/signup', {
        name, email, password, passwordConfirm
      })
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: data.user
      })
        navigate('/')
    }catch(error){
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: error.response.data
      })
      setMsg(true)
    }
  }
}
export const deleteOneUser = (userId, setDeleteClick) => {
  return async (dispatch) => {
    try{
      dispatch({
        type: DELETE_ONE_USER_REQUEST
      })
      await requestCreator.delete(`users/${userId}`)
      dispatch({
        type: DELETE_ONE_USER_SUCCESS,
        payload: userId
      })
      // dispatch(getAllUser())
      setDeleteClick(false)
      // dispatch(getMe())
    }catch(error){
      dispatch({
        type: DELETE_ONE_USER_FAIL,
        payload: error.response.data
      })
    }
  }
}

export const updateUserRole = (userId, role, setUpdateRoleClick) => {
  return async (dispatch) => {
    try{
      dispatch({
        type: UPDATE_USER_ROLE_REQUEST
      })
      const { data } = await requestCreator.patch(`users/${userId}`,{
        role
      })
      console.log(data)
      dispatch({
        type: UPDATE_USER_ROLE_SUCCESS,
        payload: data.user
      })
      setUpdateRoleClick(false)
    }catch(error){
      dispatch({
        type: UPDATE_USER_ROLE_FAIL,
        payload: error.response.data
      })
    }
  }
}
export const updateCurrentUserData = (needUpdateData, type, updateMe, setMsg) => {
  console.log(needUpdateData)
  return async(dispatch) => {
    try{
      dispatch({
        type: UPDATE_MY_PROFILE_REQUEST
      })
      let responseData
      if(type === 'photo'){
        responseData = await requestCreator.patch(`users/updateme`,needUpdateData)
      }
       responseData = await requestCreator.patch(`users/updateme`,{
         name: type === 'name'? needUpdateData:undefined,
         email: type === 'email'? needUpdateData: undefined,
      })
      const { data } = responseData
      dispatch({
        type: UPDATE_MY_PROFILE_SUCCESS,
        payload: data.user
      })
      updateMe({
        click: false
      })
      
    }catch(error){
      dispatch({
        type: UPDATE_MY_PROFILE_FAIL,
        payload: error.response.data
      })
      setMsg(true)
    }
  }
}