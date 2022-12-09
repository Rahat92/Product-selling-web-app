const FilterProduct = ({search, searchFor, trackSortValue}) => {
  return (
    <div>
      <div>
        <input style={{marginTop:'1.5rem'}} placeholder='Search product by name' onChange = {searchFor} type = 'text' value={search} name = 'keyword'/>
      </div>
      <div>
        <select onChange={trackSortValue}>
          <option>price</option>
          <option>ratingsAverage</option>
        </select> 
      </div>
    </div>
  )
}
export default FilterProduct