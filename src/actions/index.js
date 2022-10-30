import { createASingleProduct, createProduct, decreaseNum, getAProduct, deleteAProduct, handleInputChange, fetchAllProduct, increaseNum, editSingleProduct } from "../const"
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
export const fetchProducts = (currentPage) => {  
  return async(dispatch) => {
    const response = await requestCreator.get('/products',{
      params:{
        page:currentPage
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
    }).catch(err=>  response = err)
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
    navigate('/', { replace: true})
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