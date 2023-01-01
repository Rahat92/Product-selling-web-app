import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./actions";
import styles from './Products.module.css';
import CreateProduct from "./CreateProduct"
import Modal from "./Modal";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';const Products = memo(({ setClickProduct,yourpage,deleteOneProduct, createProduct, postProduct, changeProductPhoto, doDecrease, doIncrease,clickProduct,id,product,setDeleteClick, deleteClick, getProduct, user, deleteProduct,sendProductDataToEditForm }) => {
  const {products,docNum, currentPage, totalPage } = useSelector(state=> state.allProduct)
  const selector  = useSelector(state => state)

  return(
    <div style={{flex: '0 0 20%', alignSelf:'stretch'}}>
        <h1 style = {{letterSpacing:'-.5px'}}>Products: {docNum}</h1>
        <ul style={{listStyle: 'none'}}>
          {products.length>0?products.map(el=>{
            return (
              <h4 style={{padding:'.3rem'}} className= {clickProduct&& el.id === product.id?'active_product':''}>
                <li style = {{display:'flex', alignItems:'center', gap:'5px'}} key = {el.id}>{el.name.toUpperCase()} <button key = {el.id} onClick={()=>getProduct(el.id)}><InfoOutlinedIcon className = 'icon'/></button>{user&&user.role === 'admin'&&(<><button onClick={()=>deleteProduct(el.id)}><DeleteIcon className = 'icon'/></button><button onClick={()=>sendProductDataToEditForm(el.name, el.price, el.photo, el.category, el.id)}><EditIcon className = 'icon' /></button></>)}</li>
                {deleteClick&&id===el._id?<Modal setClickProduct = {setClickProduct} item = {el} id = {el._id} setDeleteClick = {setDeleteClick} deleteClick = {deleteClick} deleteOne = {deleteOneProduct} />:''}
              </h4>
            )
          }):products.length === 0&&<div><h1 style={{color:'red'}}>No document found</h1></div>}
        </ul>
        {products&&totalPage&&totalPage>1&&(
          <div style={{marginTop: '1rem'}}>
            <button onClick={doDecrease} disabled = {currentPage === 1 ? true:false}>decrease</button>
            <button onClick={doIncrease} disabled = {yourpage >= totalPage?true:false}>increase</button>
          </div>
        )}
        {user&&user.role === 'admin'&&(selector&&!selector.createAProduct?
        (
          <button style={{marginTop:'1rem', outline:'none', border:'none', borderBottom:'2px solid black', background:'none', padding: '.1rem 0'}} type = 'button' onClick={createProduct}>Create Product</button>
        ):(
          
          <CreateProduct 
            postProduct={ postProduct } 
            changeProductPhoto = {changeProductPhoto} 
          />
        ) )}
        <br />
      </div>
  )
})
export default Products;