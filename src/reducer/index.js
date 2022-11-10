import { createASingleProduct, createMyReviewFail, createMyReviewRequest, createMyReviewSuccess, createProduct, createProductNameAndPrice, createReviewError, createUserReviewFail, createUserReviewRequest, createUserReviewSuccess, decreaseNum, deleteAProduct, deleteReviewFail, deleteReviewRequest, deleteReviewSuccess, editSingleProduct, fetchAllProduct, getAllActiveUserFail, getAllActiveUserRequest, getAllActiveUserSuccess, getAProduct, getMeFail, getMeRequest, getMeSuccess, getProductNameAndPrice, getProductReviewFail, getProductReviewRequest, getProductReviewSuccess, handleInputChange, increaseNum, loginFail, loginRequest, loginSuccess, logOutFail, logOutRequest, logOutSuccess, tracsortvalue, updateReviewFail, updateReviewRequest, updateReviewSuccess } from "../const";
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


const reviewReducer = (state = {reviews:[]}, action) => {
  switch(action.type){
    // case getProductReviewRequest:
    //   return{
    //     loading:true,
    //   }
    case getProductReviewSuccess:
      return {
        ...state,
        loading: false,
        reviews:[...action.payload]
      }
    case getProductReviewFail:
      return {
        ...state,
        loading: false,
        reviews: null
      }
    case createUserReviewRequest:
      return {
        ...state,
        loading: true
      }
    case createUserReviewSuccess:
      return {
        ...state,
        loading: false,
        reviews: [...state.reviews, action.payload]
      }
    case createUserReviewFail:
      return{
        ...state,
        loading:false,
        error:action.payload
      }
    // case deleteReviewRequest:
    //   return {
    //     ...state,
    //     loading:true,
    //   }
    // case deleteReviewSuccess:
    //   return {
    //     ...state,
    //     loading:false,
    //     review: action.payload
    //   }
    // case deleteReviewFail:
    //   return {
    //     ...state,
    //     loading: false,
    //   }
    default:
      return state
  }
}

const user = (state = {user:{}}, action) => {
  switch(action.type){
    case getAllActiveUserRequest:
      return {
        loading: true
      }
    case getAllActiveUserSuccess:
      return {
        loading:false,
        user: action.payload
      }
    case getAllActiveUserFail:
      return {
        loading: false,
        user: null
      }
    default:
      return state;
  }
}

const updateReviewReducer = ( state = {review:{}}, action) => {
  switch(action.type){
    case updateReviewRequest:
      return {
        loading: true,
      }
    case updateReviewSuccess:
      return {
        loading: false,
        review: action.payload
      }
    case updateReviewFail:
      return {
        ...state,
        loading:false,
        review:null
      }
    default:
      return state
  }
}

/// for experiment////

const productNameAndpriceReducer = (state = [], action) => {
  switch(action.type){
    case getProductNameAndPrice:
      return [...state, ...action.payload]
    case createProductNameAndPrice:
      return [ ...state, action.payload ]
    default:
      return state;
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
  reviews: reviewReducer,
  users: user,
  updateReview: updateReviewReducer,
  products: productNameAndpriceReducer,
})