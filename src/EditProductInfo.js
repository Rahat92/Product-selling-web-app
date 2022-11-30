import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editProduct } from "./actions";

const EditProductInfo = ({ onSubmit, productName, productPrice, productCategory, selector, parameter, productPhoto}) => {
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
    // // let formData = new FormData();
    // // formData.append('name', e.target.product.value)
    // // formData.append('price', e.target.price.value)
    // // formData.append('photo', photo )
    let formData = new FormData();
    formData.append('name', newProductName );
    formData.append('price',newPrice);
    formData.append('photo', photo)
    formData.append('category', newCategory)
    dispatch(editProduct(formData, parameter.id, navigate))
  }
  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={(e)=>onFormSubmit(e)}>
        product Name: <br />
        <input type = "text" name = 'product' defaultValue = {!productName?selector.doc._id === parameter.id?selector.doc.name:'':productName} /><br />
        product Category: <br />
        <input type = "text" name = 'category' defaultValue = {!productCategory?selector.doc._id === parameter.id?selector.doc.category:'':productCategory} /><br />
        Product Price: <br />
        <input type= 'number' name = 'price' defaultValue = {!productPrice?selector.doc._id === parameter.id?selector.doc.price:'':productPrice}/>
        <input type= 'file' onChange = {changeUpdateFileInput} name = 'photo'/>
        <input type= 'submit' value={'update'} />
      </form>
    </div>
  )
}
export default EditProductInfo;