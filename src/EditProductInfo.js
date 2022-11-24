const EditProductInfo = ({ onSubmit, productName, productPrice, selector, parameter}) => {
  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={onSubmit}>
        product Name: <br />
        <input type = "text" name = 'product' defaultValue = {!productName?selector.doc._id === parameter.id?selector.doc.name:'':productName} /><br />
        Product Price: <br />
        <input type= 'number' name = 'price' defaultValue = {!productPrice?selector.doc._id === parameter.id?selector.doc.price:'':productPrice}/>
        <input type= 'submit' value={'update'} />
      </form>
    </div>
  )
}
export default EditProductInfo;