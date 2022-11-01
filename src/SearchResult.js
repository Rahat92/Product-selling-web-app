import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from './actions';
const SearchResult = () => {
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(fetchProducts())
  })
  return(
    <div>
      Search Result
    </div>
  )
}
export default SearchResult;