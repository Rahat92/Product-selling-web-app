import CreateProduct from "./CreateProduct"
import Modal from "./Modal";

const Products = ({ yourpage,deleteOneProduct, createProduct, postProduct, changeProductPhoto, doDecrease, doIncrease, selector,clickProduct,id,product,setDeleteClick, deleteClick, getProduct, user, deleteProduct,sendProductDataToEditForm }) => {
  return (
    <div>
      <h1>Products: {selector.allProduct.data.docNum}</h1>
      <ul style={{listStyle: 'none'}}>
        {selector.allProduct.data.docs.length>0?selector.allProduct.data.docs.map(el=>{
          return (
            <div className= {clickProduct&& el.id === product.id?'active_product':''}>
              <li key = {el.id}>{el.name}({el.price}) <button key = {el.id} onClick={()=>getProduct(el.id)}>Detail</button>{user&&user.role === 'admin'&&(<><button onClick={()=>deleteProduct(el.id)}>delete</button><button onClick={()=>sendProductDataToEditForm(el.name, el.price, el.photo, el.category, el.id)}>edit product</button></>)}</li>
              {deleteClick? <Modal id = {id} setDeleteClick = {setDeleteClick} deleteClick = {deleteClick} deleteOne = {deleteOneProduct} />:''}
            </div>
          )
        }):<div><h1 style={{color:'red'}}>No more document found</h1></div>}
      </ul>
      <button onClick={doDecrease} disabled = {yourpage*1 === 1||selector.currentNum ===1 ? true:false}>decrease</button>
      <button onClick={doIncrease} disabled = {selector.allProduct.data&& yourpage >= selector.allProduct.data.totalPage?true:false}>increase</button><br/>
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