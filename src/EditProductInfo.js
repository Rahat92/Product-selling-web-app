import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editProduct } from "./actions";

const EditProductInfo = ({ onSubmit, productName, productPrice, productCategory, product, parameter, productPhoto}) => {
  console.log(productPhoto)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [ photo, setPhoto ] = useState('')
  const changeUpdateFileInput = (e) => {
    setPhoto(e.target.files[0])
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    const newProductName = e.target.product.value;
    const newPrice = e.target.price.value;
    const newCategory = e.target.category.value;
    let formData = new FormData();
    formData.append('name', newProductName );
    formData.append('price',newPrice);
    if(photo){
      formData.append('photo', photo)
    }
    formData.append('category', newCategory)
    dispatch(editProduct(formData, parameter.id, navigate))
  }
  return (
    <div>
      <h2>Edit Product</h2>
      <img style={{width:'200px', height: '200px'}} src= {photo?URL.createObjectURL(photo):`/public/img/users/${productPhoto||product.photo}`} alt="product pic" />
      <form onSubmit={(e)=>onFormSubmit(e)}>
        product Name: <br />
        <input type = "text" name = 'product' defaultValue = {!productName?product._id === parameter.id?product.name:'':productName} /><br />
        product Category: <br />
        <input type = "text" name = 'category' defaultValue = {!productCategory?product._id === parameter.id?product.category:'':productCategory} /><br />
        Product Price: <br />
        <input type= 'number' name = 'price' defaultValue = {!productPrice?product._id === parameter.id?product.price:'':productPrice}/><br />
        Upload photo: <br />
        <input id = 'img' type= 'file' onChange = {changeUpdateFileInput} name = 'photo'  /><br />
        {/* <img src= {photo&&URL.createObjectURL(photo)} alt = 'user photo' /> */}
        <input type= 'submit' value={'update'} />
      </form>
    </div>
  )
}
export default EditProductInfo;