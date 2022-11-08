import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSearchParams, useSearchParams, useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { trackSortedValue,decrease, increase, fetchProducts, getSingleProduct, deleteOneProduct, editProduct, createNewProduct, createAProduct, getMe, createReview, deleteOneReview } from './actions';
import Modal from './Modal';
const Main = () => {
  const navigate = useNavigate()
  const param = useParams();
  const [search, setSearch] = useState('');
  const [ editReviewClick, setEditReviewClick ] = useState(false)
  const currentUrl = window.location.pathname;
  const [deleteClick, setDeleteClick] = useState(false);
  const [ id, setId ] = useState()
  // const [searchParam, setSearchParams] = useSearchParams();
  // console.log(searchParam.get('page'))
  // let currentPage = new URLSearchParams(location).get('page')
  // let currentPage = searchParam.get('page')
  // const sortvalue = new URLSearchParams(location).get('sort')
  const selector = useSelector(state=> state)
  const { review, loading } = useSelector(state=>state.reviews)
  const { user } = useSelector(state=>state.user)
  const dispatch = useDispatch();
  const price = selector.sortValue === 'price'?'-price':selector.sortValue
  useEffect(()=>{
    if(!search){
      dispatch(getMe())
    }
    const request = () => {
      dispatch(fetchProducts(selector.currentNum,price, search))
    }

    // selector.currentNum = selector.currentNum
    // if(selector.allProduct.data){
    //   if(selector.allProduct.data.result<4 && search.length>0){
    //     selector.currentNum = 1
    //   }
    // }
    let timer;
    
    if(selector.allProduct.data){
      if(search){
        selector.currentNum= 1
      }else{
        selector.currentNum = selector.currentNum;
      }
    }
    if(search){
      timer = setTimeout(()=>{
        // if(selector.allProduct.data.result>4){
        //   console.log('hello world')
        //   selector.currentNum = selector.currentNum
        // }
        // if(selector.allProduct.data.result<=4){
        //   selector.currentNum = 1
        // }
        
        request()
      },500)
    }
    if(search.length === 0){
      request()
    }
    return ()=> clearTimeout(timer)

  },[selector.deleteproduct.data,review&&review.doc, selector.createBrandNewProduct.data,price, selector.currentNum,search])
  
  
  const doIncrease = () => {
    dispatch(increase())
  }
  const doDecrease = () => {
    dispatch(decrease());
  }
  const getProduct = (id) => {
    dispatch(getSingleProduct(id))
  }
  const deleteProduct = (id) => {
    // dispatch(deleteOneProduct(id))
    setDeleteClick(true)
    setId(id)
  } 
  const deleteReview = (id) => {
  // const deleteReview = (id) => {
    setDeleteClick(true)
    setId(id)
  }
  const editProduct = (id) => {
    dispatch(editProduct(id))
  }
  const sendReview = (e,productId) => {
    e.preventDefault()
    const review = e.target.review.value;
    const rating = e.target.rating.value;
    dispatch(createReview(review,rating,productId, getProduct))
  }
  const createProduct = () => {
    dispatch(createNewProduct())
  }
  const postProduct = (e) => {
    e.preventDefault();
    selector.createAProduct = false
    dispatch(createAProduct(e.target.productName.value,e.target.price.value))
  }
  const trackSortValue =(e)=> {
    dispatch(trackSortedValue(e.target.value))
  }
  
  const searchFor = (e) => {
    setSearch(e.target.value)
  }
  const editMyReview = (id) => {
    setEditReviewClick(true)
  }
  const reviewEditCancel = () => {
    setEditReviewClick(false)  
  }
  const allProduct = () => {
    if(!selector.allProduct.data){
      return <p>Loading data, Please wait...</p>
    }
    return(
        <div>
          <div>
            <h1>Total Documents: {selector.allProduct.data.docNum}</h1>
            <ul>
              {selector.allProduct.data.docs.length>0?selector.allProduct.data.docs.map(el=>{
                return (
                  <div>
                    <li key = {el.id}>{el.name}({el.price}) <button key = {el.id} onClick={()=>getProduct(el.id)}>Detail</button>{user&&user.role === 'admin'&&(<><button onClick={()=>deleteProduct(el.id)}>delete</button><Link style={{color:'red', padding:'.5rem', textDecoration:'none'}} to={`/product/${el.id}`}>Edit</Link></>)}</li>
                    {deleteClick? <Modal id = {id} setDeleteClick = {setDeleteClick} deleteClick = {deleteClick} deleteOne = {deleteOneProduct} />:''}
                  </div>
                )
              }):<div><h1 style={{color:'red'}}>No more document found</h1></div>}
            </ul>
            {/* <button type = 'button' onClick={createProduct}>create new Product</button> */}
            {/* {user&&user.role === 'admin'?'hello world':null} */}
            {user&&user.role === 'admin'&&(!selector.createAProduct?
            (
              <button type = 'button' onClick={createProduct}>create new Product</button>
            ):(
              <form onSubmit={postProduct}>
                ProductName &nbsp;:&nbsp;
                <input type = 'text' name = 'productName' /><br /><br />
                Price &nbsp;:&nbsp;
                <input type = 'number' name = 'price' /><br />
                <input type= 'submit' value= 'create'/>
              </form>
            ) )}
            <br />
          </div>
          { !selector.singleProduct.doc?(
            <h2 style={{background:'green', position:'absolute', padding:'.5rem', color:'white', borderRadius:'5px'}}>Click On a single Product to see detail here</h2>)
            :
          <div style = {{display:'flex'}}>
            <div>
              <h2><span style = {{background:'grey', padding:'.3rem', borderRadius:'3px'}}>{selector.singleProduct.doc.name}</span>'s details</h2>
              <span style={{color:'red', fontSize:'30px', fontWeight:'bolder'}}>নামঃ</span><span style={{color:'green', fontWeight:'bolder', fontSize:'30px'}}>{selector.singleProduct.doc.name}</span><br/>
              <span style={{color:'red', fontSize:'30px', fontWeight:'bolder'}}>কেটাগরিঃ</span><span style={{color:'green', fontWeight:'bolder', fontSize:'30px'}}>{selector.singleProduct.doc.category}</span><br/>
              <span style={{color:'red', fontSize:'30px', fontWeight:'bolder'}}>মুল্যঃ </span><span style={{color:'green', fontWeight:'bolder', fontSize:'30px'}}>{selector.singleProduct.doc.price}</span><br/>
              <span style={{color:'red', fontSize:'30px', fontWeight:'bolder'}}>মোট রেটিংঃ</span><span style={{color:'green', fontWeight:'bolder', fontSize:'30px'}}>{selector.singleProduct.doc.numberOfRatings}</span><br/>
              <span style={{color:'red', fontSize:'30px', fontWeight:'bolder'}}>রেটিংসঃ </span><span style={{color:'green', fontWeight:'bolder', fontSize:'30px'}}>{selector.singleProduct.doc.ratingsAverage}</span>
            </div>
            <div style={{border: '1px solid black', marginLeft:'1rem', padding:'.5rem', boxShadow: '0px 0px 10px 3px rgba(0,0,0,.3)'}}>
                <h1>Comments:</h1>
                
                {review&&review.docs&&review.docs.map(el => {
                  return(
                      <div style={{color:'black', borderRadius:'5px', padding:'.5rem',margin:'1rem', textAlign:'center', position:'relative', background:'rgba(0, 0, 0, .2)', maxWidth:'400px'}}>
                        {/* <h1 style = {{color:user&&el.user._id === user._id?'red':''}}>{el.user.name}</h1>
                        <h2 style={{color:'green'}}>{el.review}</h2> */}
                        {editReviewClick&&user&&el.user._id === user._id?(
                        <div>
                          <form>
                            comment
                            <input type = 'text' /> <br />
                            review
                            <input type = 'number' /> <br />
                            <button type = 'button' onClick={reviewEditCancel}>cancel</button>
                            <button type = 'button'>update</button>
                          </form>  
                        </div>
                        ):<><h1 style = {{color:user&&el.user._id === user._id?'red':''}}>{el.user.name}</h1>
                        <h2 style={{color:'green'}}>{el.review}</h2></>}
                        {user&&el.user._id === user._id&&!editReviewClick?<div><button onClick= {()=>deleteReview(el._id)}>delete</button><button onClick={()=>editMyReview(el._id)}>edit</button></div>:''}
                        {deleteClick? <Modal getProduct = {()=>getProduct(selector.singleProduct.doc._id)} id = {id} setDeleteClick = {setDeleteClick} deleteClick = {deleteClick} deleteOne = {deleteOneReview}/>:''}
                      </div>
                  )
                })}
                {user&&user.role === 'user'&&(
                  review&&review.docs&&review.docs.length>=0&&(!review.docs.find(el=>el.user._id === user._id))&&
                  <form onSubmit={(e)=>sendReview(e,selector.singleProduct.doc.id)}>
                    createComment : &nbsp;
                    <input type= 'text' name = 'review' /><br /><br />
                    ratings : &nbsp;
                    <input type= 'number' name = 'rating' /><br />
                    <input type="submit" value="save" />
                  </form>
                )}
            </div>
          </div> 
          }
      </div>
    )
  }
  const params = {
    name:'rahat',
    age:30,
    hobby:'gardening'
  }
  const gotoParams = () => {
    navigate({
      pathname:'/params',
      search:`?${createSearchParams(params)}`
    })
  }
  return (
    <div>
        <input onChange = {searchFor} type = 'text' value={search} name = 'keyword'/>
      <br />
      <button type='button' onClick={gotoParams}>params</button>
      <br />
      <h1>Number {selector.currentNum}</h1>
      <button onClick={doDecrease} disabled = {selector.currentNum === 1? true:false}>decrease</button>
      <button onClick={doIncrease} disabled = {selector.allProduct.data&&selector.allProduct.data.docs.length>0?false:true}>increase</button><br/>
        <select onChange={trackSortValue}>
          <option>price</option>
          <option>ratingsAverage</option>
        </select>
      {allProduct()}
      {/* { !selector.deleteproduct.data?'':afterDelete() } */}
    </div>
  );
}

export default Main;
