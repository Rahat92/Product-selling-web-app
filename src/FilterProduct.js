import styles from './FilterProduct.module.css'
const FilterProduct = ({search, searchFor, trackSortValue}) => {
  return (
      <form>
        <div className= {styles.filter}>
          <input className= {styles.btn} style = {{order:1, marginLeft:'auto'}} placeholder='Search product by name' onChange = {searchFor} type = 'text' value={search} name = 'keyword'/>
          <select className= {styles.btn} onChange={trackSortValue}>
            <option value = 'none' selected>None</option>
            <option>price</option>
            <option>ratingsAverage</option>
          </select> 
          <select className= {styles.btn}>
            <option value = 'none' selected>Select Category</option>
            <option value = 'flower'>Flower</option>
            <option value = 'fruit'>Fruit</option>
          </select>
          </div>
      </form>
  )
}
export default FilterProduct