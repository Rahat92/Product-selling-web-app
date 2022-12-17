import './createProduct.css'
const CreateProduct = ({postProduct, changeProductPhoto}) => {
  const labelStyle = {
    fontWeight:'700',
    // display:'inline-block',
    // margin: '.2rem 0'
  }
  return (
    <div style={{marginTop: '2rem'}}>
      <form onSubmit={postProduct} style = {{display:'flex', flexDirection:'column'}}>
        <div>
          <label style={labelStyle} htmlFor="name">ProductName</label>
          <input id = 'name' type = 'text' name = 'productName' />
        </div>
        <div>
          <label style={labelStyle} htmlFor="category">Product Category</label>
          <input id = 'category' type = 'text' name = 'productCategory' /> 
        </div>
        <div>
          <label style={labelStyle} htmlFor="price">Price</label><br />
          <input id = 'price' type = 'number' name = 'price' />
        </div>
        <div>
          <input type = 'file' onChange={changeProductPhoto} name = 'photo' />
        </div>
        <div>
          <input type= 'submit' value= 'create'/>
        </div>
      </form>
    </div>
  )
}
export default CreateProduct;