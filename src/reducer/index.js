import { createASingleProduct, createMyReviewFail, createMyReviewRequest, createMyReviewSuccess, createProduct, createReviewError, decreaseNum, deleteAProduct, deleteReviewFail, deleteReviewRequest, deleteReviewSuccess, editSingleProduct, fetchAllProduct, getAProduct, getMeFail, getMeRequest, getMeSuccess, getProductReviewFail, getProductReviewRequest, getProductReviewSuccess, handleInputChange, increaseNum, loginFail, loginRequest, loginSuccess, logOutFail, logOutRequest, logOutSuccess, tracsortvalue } from "../const";
import { combineReducers } from 'redux'
const numberReducer = (initialState = 1, action) => {
  switch(action.type){
    case increaseNum:
      return initialState+action.payload;
    case decreaseNum:
      return initialState - action.payload
    default:
      return initialState
  }
}
const allProduct = (initialState = {}, action) => {
  if(action.type === fetchAllProduct){
    return initialState = action.payload
  }
  return initialState
}
const getProductReducer = (initialState = {},action) => {
  if(action.type === getAProduct){
    return initialState = action.payload
  }
  return initialState
}
const deleteProductReducer = (initialState = {}, action)=>{
  if(action.type === deleteAProduct){
    return initialState = action.payload
  }
  return initialState
}
const editProductReducer = (initialState = {}, action) => {
  if(action.type === editSingleProduct){
    return initialState = action.payload
  }
  return initialState;
}
const handleInputReducer = (initialState = '', action) => {
  if(action.type === handleInputChange){
    return initialState = action.payload
  }
  return initialState
}
const createSingleProduct = (initialState = false, action) => {
  if(action.type === createProduct){
    return initialState = true
  }
  return initialState
}
const createBrandNewProduct = (initialState = {}, action) => {
  if(action.type === createASingleProduct){
    return initialState = action.payload
  }
  return initialState;
}

const sortValueReducer = (initialState = 'price,-ratingsAverage', action) => {
  if(action.type === tracsortvalue){
    return initialState = action.payload
  }
  return initialState
}

const userReducer = (initialState = {user:{}}, action)=>{
  switch(action.type){
    case loginRequest:
      return {
        loading : true,
        isAuthenticated : false,
      }
    case loginSuccess:
      return {
        ...initialState,
        loading : false,
        isAuthenticated : true,
        user : action.payload
      }
    case loginFail:
      return {
        ...initialState,
        loading : false,
        isAuthenticated : false,
        user:null,
        error:action.payload
      }
    case getMeRequest:
      return{
        loading:true,
        isAuthenticated: false,
      }
    case getMeSuccess:
      return {
        ...initialState,
        loading: false,
        isAuthenticated: true,
        user: action.payload
      }
    case getMeFail:
      return {
        loading: false,
        isAuthenticated:false,
        user:null
      }
    default:
      return initialState
  }
}
const logOutReducer = (initialState = {}, action) => {
  switch(action.type){
    case logOutRequest:
      return {
        loading:true,
        isAuthenticated:true,
      }
    case logOutSuccess:
      return {
        loading:false,
        isAuthenticated:false,
        user:null
      }
    case logOutFail:
      return {
        loading: false,
        isAuthenticated: true
      }
    default:
      return initialState
  }
}


const reviewReducer = (state = {review:{}}, action) => {
  switch(action.type){
    case createMyReviewRequest:
      return {
        loading: true
      }
    case createMyReviewSuccess:
      return {
        ...state,
        loading: false,
        review: action.payload
      }
    case createMyReviewFail:
      return{
        ...state,
        loading:false,
        review:null,
        error:action.payload
      }
    case getProductReviewRequest:
      return{
        loading:true,
        review: null
      }
    case getProductReviewSuccess:
      return {
        ...state,
        loading: false,
        review: action.payload
      }
    case getProductReviewFail:
      return {
        loading: false,
        review: null
      }
    case deleteReviewRequest:
      return {
        ...state,
        loading:true,
      }
    case deleteReviewSuccess:
      return {
        ...state,
        loading:false,
        review: action.payload
      }
    case deleteReviewFail:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}

export default combineReducers({
  currentNum: numberReducer,
  allProduct: allProduct,
  singleProduct:getProductReducer,
  deleteproduct:deleteProductReducer,
  editedProduct:editProductReducer,
  changeInput: handleInputReducer,
  createAProduct: createSingleProduct,
  createBrandNewProduct:createBrandNewProduct,
  sortValue:sortValueReducer,
  user:userReducer,
  logOut:logOutReducer,
  reviews: reviewReducer
})