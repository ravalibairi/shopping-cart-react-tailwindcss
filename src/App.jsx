import {Fragment} from "react";
import {Route, Routes} from "react-router-dom";

import ProductListPage from "./pages/productList/index.jsx";

import ProductDetailsPage from "./pages/productDetails/index.jsx";
import CartListPage from "./pages/cartList/index.jsx";


function App() {


  return (
      <Fragment>
        <Routes>
              <Route path="/products" element={<ProductListPage/>}/>
              <Route path="/product-details/:id" element={<ProductDetailsPage/>}/>
            <Route path="/cart" element={<CartListPage/>}/>
        </Routes>
      </Fragment>
  );
}

export default App
