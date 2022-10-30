import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSearchParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { decrease, increase, fetchProducts, getSingleProduct, deleteOneProduct, editProduct, createNewProduct, createAProduct } from './actions';
const Main = () => {
  const navigate = useNavigate()
  const location = useLocation().search;
  const currentPage = new URLSearchParams(location).get('page')
  console.log(currentPage)
  const selector = useSelector(state=> state)
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchProducts(currentPage))
    selector.currentNum = +currentPage;
  },[selector.deleteproduct.data, selector.createBrandNewProduct.data, selector.currentNum])
  const paramss = {
    page:selector.currentNum+1
  }
  const doIncrease = () => {
    dispatch(increase())
    navigate({
      pathname:'/',
      search:`?${createSearchParams(paramss)}`
    })
  }
  const para = {
    page:selector.currentNum-1
  }
  const doDecrease = () => {
    dispatch(decrease());
    navigate({
      pathname:'/',
      search:`?${createSearchParams(para)}`
    })
  }
  const getProduct = (id) => {
    dispatch(getSingleProduct(id))
  }
  const deleteProduct = (id) => {
    dispatch(deleteOneProduct(id))
  }
  const editProduct = (id) => {
    dispatch(editProduct(id))
  }
  const sendReview = () => {

  }
  const allProduct = () => {
    if(!selector.allProduct.data){
      return <p>Loading data, Please wait...</p>
    }
  const createProduct = () => {
    dispatch(createNewProduct())
  }
  const postProduct = (e) => {
    e.preventDefault();
    selector.createAProduct = false
    dispatch(createAProduct(e.target.productName.value,e.target.price.value))
  }
    return(
        <div>
          <div>
            <h1>Total Documents: {selector.allProduct.data.docNum}</h1>
            <ul>
              {selector.allProduct.data.docs.map(el=>{
                return (
                  <li key = {el.id}>{el.name} <button key = {el.id} onClick={()=>getProduct(el.id)}>Detail</button><button onClick={()=>deleteProduct(el.id)}>Delete</button><Link style={{color:'red', padding:'.5rem', textDecoration:'none'}} to={`/product/${el.id}`}>Edit</Link></li>
                )
              })}
            </ul>
            {/* <button type = 'button' onClick={createProduct}>create new Product</button> */}
            {!selector.createAProduct?
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
            ) }
            <br />
          </div>
          { !selector.singleProduct.doc?(
            <h2 style={{background:'green', position:'absolute', padding:'.5rem', color:'white', borderRadius:'5px'}}>Click On a single Product to see detail here</h2>)
            :
          <div style = {{display:'flex'}}>
            <div>
              <h2><span style = {{background:'grey', padding:'.3rem', borderRadius:'3px'}}>{selector.singleProduct.doc.name}</span>'s details</h2>
              <span style={{color:'red', fontSize:'30px', fontWeight:'bolder'}}>নামঃ</span><span style={{color:'green', fontWeight:'bolder', fontSize:'30px'}}>{selector.singleProduct.doc.name}</span><br/>
              <span style={{color:'red', fontSize:'30px', fontWeight:'bolder'}}>মুল্যঃ </span><span style={{color:'green', fontWeight:'bolder', fontSize:'30px'}}>{selector.singleProduct.doc.price}</span><br/>
              <span style={{color:'red', fontSize:'30px', fontWeight:'bolder'}}>মোট রেটিংঃ</span><span style={{color:'green', fontWeight:'bolder', fontSize:'30px'}}>{selector.singleProduct.doc.numberOfRatings}</span><br/>
              <span style={{color:'red', fontSize:'30px', fontWeight:'bolder'}}>রেটিংসঃ </span><span style={{color:'green', fontWeight:'bolder', fontSize:'30px'}}>{selector.singleProduct.doc.ratingsAverage}</span>
            </div>
            <div style={{border: '1px solid black', marginLeft:'1rem', padding:'.5rem', boxShadow: '0px 0px 10px 3px rgba(0,0,0,.3)'}}>
                <h1>Comments:</h1>
                {selector.singleProduct.doc.review.map(el => {
                  return(
                      <div style={{color:'black', borderRadius:'5px', padding:'.5rem',margin:'1rem', textAlign:'center', position:'relative', background:'rgba(0, 0, 0, .2)', maxWidth:'40rem'}}>
                        <h2>{el.user.name}</h2>
                        <h3>{el.review}</h3>
                      </div>
                  )
                })}
                <form onSubmit={sendReview}>
                  createComment : &nbsp;
                  <input type= 'text' name = 'review' /><br /><br />
                  ratings : &nbsp;
                  <input type= 'number' name = 'review' /><br />
                  <input type="submit" value="save" />
                </form>
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
      <button type='button' onClick={gotoParams}>params</button>
      <h1>Number {selector.currentNum}</h1>
      <button onClick={doDecrease}>decrease</button>
      <button onClick={doIncrease}>increase</button>
      {allProduct()}
      {/* { !selector.deleteproduct.data?'':afterDelete() } */}
    </div>
  );
}

export default Main;
