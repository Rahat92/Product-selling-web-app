const CreateProduct = ({postProduct, changeProductPhoto}) => {
  return (
    <div>
      <form onSubmit={postProduct}>
        ProductName &nbsp;:&nbsp;
        <input type = 'text' name = 'productName' /><br /><br />
        ProductCategory &nbsp;:&nbsp;
        <input type = 'text' name = 'productCategory' /> <br /> <br />
        Price &nbsp;:&nbsp;
        <input type = 'number' name = 'price' /><br />
        <input type = 'file' onChange={changeProductPhoto} name = 'photo' />
        <input type= 'submit' value= 'create'/>
      </form>
    </div>
  )
}
export default CreateProduct;