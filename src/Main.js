import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSearchParams, useSearchParams, useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { trackSortedValue,decrease, increase, fetchProducts, getSingleProduct, deleteOneProduct, editProduct, createNewProduct, createAProduct, getMe, createReview, deleteOneReview, updateReview } from './actions';
import Modal from './Modal';
const Main = ({anyFunc}) => {
  const { isAuthenticated, user, loading } = useSelector(state=>state.user)
  const [ createUserReview, setCreateUserReview ] = useState(false)
  const navigate = useNavigate()
  // const param = useParams();
  const [search, setSearch] = useState('');
  const [ editReviewClick, setEditReviewClick ] = useState(false)
  const [ editReview, setEditReview ] = useState({
    review:'',
    rating:''
  })
  // const currentUrl = window.location.pathname;
  const [deleteClick, setDeleteClick] = useState(false);
  const [ id, setId ] = useState()
  // const [searchParam, setSearchParams] = useSearchParams();
  // console.log(searchParam.get('page'))
  // let currentPage = new URLSearchParams(location).get('page')
  // let currentPage = searchParam.get('page')
  // const sortvalue = new URLSearchParams(location).get('sort')
  const selector = useSelector(state=> state)
  const { reviews, userName } = useSelector(state=>state.reviews)
  const dispatch = useDispatch();
  const price = selector.sortValue === 'price'?'-price':selector.sortValue
  useEffect(()=>{
    setEditReviewClick(false)
    // if(!search){
    //   dispatch(getMe())
    // }

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

  },[user,selector.deleteproduct.data,reviews, selector.createBrandNewProduct.data,price, selector.currentNum,search])
  
  
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
    // dispatch(deleteOneReview(id))
  }
  const editProduct = (id) => {
    dispatch(editProduct(id))
  }
  const sendReview = (e,productId) => {
    e.preventDefault()
    const review = e.target.review.value;
    const rating = e.target.rating.value;
    dispatch(createReview(review,rating,getProduct,productId, setCreateUserReview))
  }
  const createProduct = () => {
    dispatch(createNewProduct())
  }
  const postProduct = (e) => {
    e.preventDefault();
    selector.createAProduct = false
    dispatch(createAProduct(e.target.productName.value,e.target.price.value, navigate))
  }
  const trackSortValue =(e)=> {
    dispatch(trackSortedValue(e.target.value))
  }
  
  const searchFor = (e) => {
    setSearch(e.target.value)
  }
  const editMyReview = (id, review, rating) => {
    setEditReviewClick(true)
    setEditReview({
      review,
      rating
    })
  }
  const reviewEditCancel = () => {
    setEditReviewClick(false)  
  }
  const updateMyReview = (e, id,productId) => {
    e.preventDefault()
    dispatch(updateReview(id, e.target.review.value, e.target.rating.value, getProduct, productId, setEditReviewClick))
  }
  const sendProductDataToEditForm = (productName, productRating, id) => {
    anyFunc(productName, productRating)
    navigate(`product/${id}`)
  }
  const allProduct = () => {
    if(!selector.allProduct.data){
      return <p>Loading data, Please wait...</p>
    }
    return(
        <div>
          <div>
            <h1>Total Documents: {selector.allProduct.data.docNum}</h1>
            <ul style={{listStyle: 'none'}}>
              {selector.allProduct.data.docs.length>0?selector.allProduct.data.docs.map(el=>{
                return (
                  <div>
                    <li key = {el.id}>{el.name}({el.price}) <button key = {el.id} onClick={()=>getProduct(el.id)}>Detail</button>{user&&user.role === 'admin'&&(<><button onClick={()=>deleteProduct(el.id)}>delete</button><button onClick={()=>sendProductDataToEditForm(el.name, el.ratingsAverage, el.id)}>edit product</button></>)}</li>
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
              <span style={{color:'red', fontSize:'30px', fontWeight:'bolder'}}>রেটিংসঃ </span><span style={{color:'green', fontWeight:'bolder', fontSize:'30px'}}>{selector.singleProduct.doc.ratingsAverage.toFixed()}</span>
            </div>
            <div style={{border: '1px solid black', overflow:'hidden', marginLeft:'1rem', padding:'2rem', marginBottom:'3rem', boxShadow: '0px 0px 10px 3px rgba(0,0,0,.3)'}}>
                <h1>Comments:</h1>
                {reviews.length>0&&reviews.map(el=>{
                  // if(editReviewClick&&user&&el.user._id === user._id){
                  //   return 'hello world'
                  // }
                  // return(
                  //   <div style = {{border:`${user&&el.user._id === user._id?'4px':'1px'} solid ${user&&el.user._id === user._id?'red':''}`, padding:'.5rem'}}>
                  //     <h4 style = {{color:user&&el.user._id === user._id?'green':''}}>{el.user.name}</h4>
                  //     <h1 style = {{color:user&&el.user._id === user._id?'green':''}}>{el.review}</h1>
                  //     {user&&el.user._id === user._id&&(
                  //       <div>
                  //         <button onClick= {()=>deleteReview(el._id)}>delete</button><button onClick={()=>editMyReview(el._id, el.review, el.rating)}>edit</button>
                  //         {deleteClick? <Modal productId={selector.singleProduct.doc.id} id = {id} setDeleteClick = {setDeleteClick} deleteClick = {deleteClick} deleteOne = {deleteOneReview} />:''}
                  //       </div>
                  //     )}
                  //   </div>
                  // )
                  return editReviewClick&&user&&el.user._id === user._id?
                    <div style = {{border:`${user&&el.user._id === user._id?'4px':'1px'} solid ${user&&el.user._id === user._id?'red':''}`, padding:'.5rem'}}>
                        <form onSubmit={(e)=>updateMyReview(e,el._id,selector.singleProduct.doc._id)}>
                            comment
                            <input type = 'text' name = 'review' defaultValue={editReview.review} /> <br />
                            review
                            <input type = 'number' name='rating' defaultValue={editReview.rating}/> <br />
                            <button type = 'button' onClick={reviewEditCancel}>cancel</button>
                            <input type = 'submit' value={'update'} />
                            {/* <button type = 'button' onClick={()=>dispatch(updateReview(el._id, editReview.review, editReview.rating,getProduct))}>update</button> */}
                          </form> 
                    </div>
                  :
                    <div style = {{border:`${user&&el.user._id === user._id?'4px':'1px'} solid ${user&&el.user._id === user._id?'red':''}`, padding:'.5rem'}}>
                      <h4 style = {{color:user&&el.user._id === user._id?'green':''}}>{el.user.name}</h4>
                      <h1 style = {{color:user&&el.user._id === user._id?'green':''}}>{el.review}</h1>
                      {user&&el.user._id === user._id&&(
                        <div>
                          <button onClick= {()=>deleteReview(el._id)}>delete</button><button onClick={()=>editMyReview(el._id, el.review, el.rating)}>edit</button>
                          {deleteClick? <Modal productId={selector.singleProduct.doc.id} id = {id} setDeleteClick = {setDeleteClick} deleteClick = {deleteClick} deleteOne = {deleteOneReview} />:''}
                        </div>
                      )}
                    </div>
                })
                }
                {user&&user.role === 'user'&&!createUserReview&&
                  (!reviews.find(el=>el.user._id === user._id)&&
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
