import { memo } from "react";
import { useSelector } from "react-redux";
import CreateProduct from "./CreateProduct"
import Modal from "./Modal";

const Products = memo(({ yourpage,deleteOneProduct, createProduct, postProduct, changeProductPhoto, doDecrease, doIncrease, selector,clickProduct,id,product,setDeleteClick, deleteClick, getProduct, user, deleteProduct,sendProductDataToEditForm }) => {
  const { products, productsLoading, docNum, totalPage } = useSelector(state=>state.allProduct)
  return(
    <div style={{flex: '0 0 20%'}}>
        <h1>Products: {docNum}</h1>
        <ul style={{listStyle: 'none'}}>
          {products.length>0?products.map(el=>{
            return (
              <div className= {clickProduct&& el.id === product.id?'active_product':''}>
                <li key = {el.id}>{el.name}({el.price}) <button key = {el.id} onClick={()=>getProduct(el.id)}>Detail</button>{user&&user.role === 'admin'&&(<><button onClick={()=>deleteProduct(el.id)}>delete</button><button onClick={()=>sendProductDataToEditForm(el.name, el.price, el.photo, el.category, el.id)}>edit product</button></>)}</li>
                {deleteClick? <Modal id = {el._id} setDeleteClick = {setDeleteClick} deleteClick = {deleteClick} deleteOne = {deleteOneProduct} />:''}
              </div>
            )
          }):products.length === 0&&<div><h1 style={{color:'red'}}>No document found</h1></div>}
        </ul>
        {products&&totalPage&&totalPage>1&&(
          <div>
            <button onClick={doDecrease} disabled = {yourpage*1 === 1||selector.currentNum ===1 ? true:false}>decrease</button>
            <button onClick={doIncrease} disabled = {yourpage >= totalPage?true:false}>increase</button>
          </div>
        )}
        {user&&user.role === 'admin'&&(!selector.createAProduct?
        (
          <button type = 'button' onClick={createProduct}>create new Product</button>
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