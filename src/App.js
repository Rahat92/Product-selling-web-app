import Main from './Main';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Product from './EditProduct';
import Params from './Params';
const App = () => {
  
  return(
    <div>
      <Router>
        <Routes>
          <Route path = "/" element = {<Main/>}/>
          <Route path = {`product/:id`} element = {<Product/>}/>
          <Route path = {`/params`} element = {<Params/>}/>
          {/* <Route path = {`product/:id`} element = {<Navigate to = '/'/>}/> */}
        </Routes>
      </Router>
    </div>
  )
}

export default App;
