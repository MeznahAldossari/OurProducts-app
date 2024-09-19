import React from 'react'
import Home from '../pages/Home';
import * as ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ProductsDetails from '../pages/ProductsDetails';
import SignIn from '../pages/SignIn';
import Signup from '../pages/Signup';
import Cart from '../pages/Cart';

function Router() {
    const router = createBrowserRouter([
        {
          path: "/",
          element: <Home/>
        },
        {
          path: "/product/:id",
          element: <ProductsDetails/>

        },
        {
          path: "/signup",
          element: <Signup/>

        },
        {
          path: "/signin",
          element: <SignIn/>

        }
        ,
        {
            path: "/cart",
            element: <Cart/>
  
        }
      ]);

  return (
    <RouterProvider router={router} />
  )
}

export default Router
