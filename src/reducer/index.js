import { 
  createASingleProduct, 
  createMyReviewFail, 
  createMyReviewRequest, 
  createMyReviewSuccess, 
  createProduct, 
  createProductNameAndPrice, 
  createReviewError, 
  createUserReviewFail, 
  createUserReviewRequest, 
  createUserReviewSuccess, 
  decreaseNum, 
  deleteAProduct, 
  DELETE_ONE_USER_FAIL, 
  DELETE_ONE_USER_REQUEST, 
  DELETE_ONE_USER_SUCCESS, 
  deleteReviewFail, 
  deleteReviewRequest, 
  deleteReviewSuccess, 
  editSingleProduct, 
  fetchAllProduct, 
  getAllActiveUserFail, 
  getAllActiveUserRequest, 
  getAllActiveUserSuccess, 
  getAProduct, 
  getMeFail, 
  getMeRequest, 
  getMeSuccess, 
  getProductNameAndPrice, 
  getProductReviewFail, 
  getProductReviewRequest, 
  getProductReviewSuccess, 
  GET_SINGLE_USER_FAIL, 
  GET_SINGLE_USER_REQUEST, 
  GET_SINGLE_USER_SUCCESS, 
  handleInputChange, 
  increaseNum, 
  LOG_IN_FAIL, 
  LOG_IN_REQUEST, 
  LOG_IN_SUCCESS, 
  LOG_OUT_FAIL, 
  LOG_OUT_REQUEST, 
  LOG_OUT_SUCCESS, 
  REGISTER_USER_FAIL, 
  REGISTER_USER_REQUEST, 
  REGISTER_USER_SUCCESS, 
  tracsortvalue, 
  updateReviewFail, 
  updateReviewRequest, 
  updateReviewSuccess,
  UPDATE_MY_PROFILE_FAIL, 
  UPDATE_MY_PROFILE_REQUEST, 
  UPDATE_MY_PROFILE_SUCCESS, 
  UPDATE_USER_ROLE_REQUEST, 
  UPDATE_USER_ROLE_SUCCESS 
} from "../const";
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
    case REGISTER_USER_REQUEST:
      return {
        ...initialState,
        loading: true,
        isAuthenticated: false
      }
    case REGISTER_USER_SUCCESS:
      return {
        ...initialState,
        loading: false,
        isAuthenticated: true,
        user: action.payload
      }
    case REGISTER_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        user:null,
        message: action.payload
      }
    case LOG_IN_REQUEST:
      return {
        loading : true,
        isAuthenticated : false,
      }
    case LOG_IN_SUCCESS:
      return {
        ...initialState,
        loading : false,
        isAuthenticated : true,
        user : action.payload
      }
    case LOG_IN_FAIL:
      return {
        ...initialState,
        loading : false,
        isAuthenticated : false,
        user:null,
        message:action.payload
      }
    case LOG_OUT_REQUEST:
      return {
        ...initialState,
        loading:true,
        isAuthenticated:true,
      }
    case LOG_OUT_SUCCESS:
      return {
        ...initialState,
        loading:false,
        isAuthenticated:false,
        user:null
      }
    case LOG_OUT_FAIL:
      return {
        ...initialState,
        loading: false,
        isAuthenticated: true
      }
    case getMeRequest:
      return{
        ...initialState,
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
        user:null,
        message: action.payload
      }
    case UPDATE_MY_PROFILE_REQUEST:
      return {
        ...initialState,
        loading: true,
      }
    case UPDATE_MY_PROFILE_SUCCESS:
      return {
        ...initialState,
        loading: false,
        isAuthenticated: true,
        user:action.payload
      }
    case UPDATE_MY_PROFILE_FAIL:
      return {
        ...initialState,
        loading: false,
        isAuthenticated: false,
        message: action.payload
      }
    default:
      return initialState
  }
}
// const logOutReducer = (initialState = {}, action) => {
//   switch(action.type){
//     case LOG_OUT_REQUEST:
//       return {
//         loading:true,
//         isAuthenticated:true,
//       }
//     case LOG_OUT_SUCCESS:
//       return {
//         loading:false,
//         isAuthenticated:false,
//         user:null
//       }
//     case LOG_OUT_FAIL:
//       return {
//         loading: false,
//         isAuthenticated: true
//       }
//     default:
//       return initialState
//   }
// }

const adminPowerReducer = (state = {users:{}}, action) => {
  switch(action.type){
    
    default:
      return {
        state
      }
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
        totalReview: action.payload.productLength,
        result: action.payload.result,
        resPerPage:action.payload.resPerPage,
        recentNum: action.payload.data.currentNum,
        currentPage: action.payload.data.currentPage,
        totalPage:action.payload.totalPage,
        reviews:[...action.payload.data.docs]
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
        userName: action.payload.data.user.name,
        totalReview: state.totalReview+1,
        reviews: [...state.reviews, action.payload.data]
      }
    case createUserReviewFail:
      return{
        ...state,
        loading:false,
        error:action.payload
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
        reviews: [...state.reviews ].filter(el=>el._id!==action.payload)
      }
    // case deleteReviewFail:
    //   return {
    //     ...state,
    //     loading: false,
    //   }
    case updateReviewRequest:
      return {
        ...state,
        loading: true,
      }
    case updateReviewSuccess:
      const copiedList = [...state.reviews]
      let index;
      copiedList.find((el,i)=>{
        if(el._id===action.payload._id){
          index = i;
        }
      })
      console.log(index)
      copiedList[index] = action.payload;
      console.log(copiedList)
      return{
        // ...state,
        loading: false,
        reviews: copiedList
      }
    default:
      return state
  }
}

const users = (state = {users:[]}, action) => {
  switch(action.type){
    case getAllActiveUserRequest:
      return {
        ...state,
        loading: true,
      }
    case getAllActiveUserSuccess:
      return {
        loading:false,
        documentNumber: action.payload.docNum,
        users: [ ...action.payload.docs]
      }
    case getAllActiveUserFail:
      return {
        ...state,
        loading: false,
        users: null,
        message: action.payload
      }
    case UPDATE_USER_ROLE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case UPDATE_USER_ROLE_SUCCESS:
      const copiedList = [...state.users]
      let index;
      copiedList.find((el,i)=>{
        if(el._id===action.payload._id){
          index = i;
        }
      })
      console.log(index)
      copiedList[index] = action.payload;
      console.log(copiedList)
      return{
        // ...state,
        loading: false,
        users: copiedList
      }
    case DELETE_ONE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case DELETE_ONE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        documentNumber:state.documentNumber-1,
        users: [...state.users ].filter(el=>el._id!==action.payload)
      }
    case DELETE_ONE_USER_FAIL:
      return {
        ...state,
        loading:false,
        message: action.payload
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


const normalUserReducer = (state = {user: {}}, action) => {
  switch(action.type){
    case GET_SINGLE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case GET_SINGLE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload
      }
    case GET_SINGLE_USER_FAIL:
      return {
        loading: false,
        message: action.payload
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
  reviews: reviewReducer,
  users: users,
  updateReview: updateReviewReducer,
  products: productNameAndpriceReducer,
  normalUser: normalUserReducer
})