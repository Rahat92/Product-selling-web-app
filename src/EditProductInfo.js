const EditProductInfo = ({ onSubmit, productName, productRating, selector, parameter}) => {
  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={onSubmit}>
        product Name: <br />
        <input type = "text" name = 'product' defaultValue = {!productName?selector.doc._id === parameter.id?selector.doc.name:'':productName} /><br />
        Product Rating: <br />
        <input type= 'number' name = 'rating' defaultValue = {!productRating?selector.doc._id === parameter.id?selector.doc.ratingsAverage:'':productRating}/>
        <input type= 'submit' value={'update'} />
      </form>
    </div>
  )
}
export default EditProductInfo;