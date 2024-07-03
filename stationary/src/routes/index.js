import {createBrowserRouter} from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'
import ForgetPassword from '../pages/ForgetPassword'
import Signup from '../pages/Signup'

import CategoryPage from '../pages/CategoryPage'
import ProductDetail from '../pages/ProductDetail'
import Cart from '../pages/Cart'
import SearchProduct from '../pages/SearchProduct'
import Success from '../pages/Success'
import Cancel from '../pages/Cancel'
import OrderPage from '../pages/OrderPage'
const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:"",
                element:<Home/>
            },
            {
                path:"login",
                element:<Login/>
            },
            {
                path:"forget-password",
                element:<ForgetPassword/>
                

            },
            {
                path:"sign-up",
                element:<Signup/>
            },
            {
                path:"category-page/:category",
                element:<CategoryPage/>
            },
            {
                path:"product/:id",
                element:<ProductDetail/>
            },
            {
                path:"cart",
                element:<Cart/>
            },{
                path:"search",
                element:<SearchProduct/>
            },
            {
                path:'success',
                element:<Success/>
            },
            {
                path:'cancel',
                element:<Cancel/>
            },
            {
                path:'order',
                element:<OrderPage/>
            }
          
        ]
    }

    
])

export default router