import { useSelector } from "react-redux";
import CreateProduct from "./CreateProduct"
import Modal from "./Modal";

const Products = ({ yourpage,deleteOneProduct, createProduct, postProduct, changeProductPhoto, doDecrease, doIncrease, selector,clickProduct,id,product,setDeleteClick, deleteClick, getProduct, user, deleteProduct,sendProductDataToEditForm }) => {
  const { products, productsLoading, docNum, totalPage } = useSelector(state=>state.allProduct)
  return (
    <div style={{flex: '0 0 20%'}}>
      <h1>Products: {docNum}</h1>
      <ul style={{listStyle: 'none'}}>
        {!productsLoading&&products.length>0?products.map(el=>{
          return (
            <div className= {clickProduct&& el.id === product.id?'active_product':''}>
              <li key = {el.id}>{el.name}({el.price}) <button key = {el.id} onClick={()=>getProduct(el.id)}>Detail</button>{user&&user.role === 'admin'&&(<><button onClick={()=>deleteProduct(el.id)}>delete</button><button onClick={()=>sendProductDataToEditForm(el.name, el.price, el.photo, el.category, el.id)}>edit product</button></>)}</li>
              {deleteClick? <Modal id = {id} setDeleteClick = {setDeleteClick} deleteClick = {deleteClick} deleteOne = {deleteOneProduct} />:''}
            </div>
          )
        }):<div><h1 style={{color:'red'}}>No more document found</h1></div>}
      </ul>
      <button onClick={doDecrease} disabled = {yourpage*1 === 1||selector.currentNum ===1 ? true:false}>decrease</button>
      <button onClick={doIncrease} disabled = {!productsLoading&& yourpage >= totalPage?true:false}>increase</button><br/>
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
}
export default Products;