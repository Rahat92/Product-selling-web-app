import { createASingleProduct, createProduct, decreaseNum, deleteAProduct, editSingleProduct, fetchAllProduct, getAProduct, handleInputChange, increaseNum } from "../const";
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
export default combineReducers({
  currentNum: numberReducer,
  allProduct: allProduct,
  singleProduct:getProductReducer,
  deleteproduct:deleteProductReducer,
  editedProduct:editProductReducer,
  changeInput: handleInputReducer,
  createAProduct: createSingleProduct,
  createBrandNewProduct:createBrandNewProduct
})