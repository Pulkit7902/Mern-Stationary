import {createBrowserRouter} from 'react-router-dom'
import App from '../App'
import AdminPannel from '../pages/AdminPannel'
import Signin from '../pages/Signin'
import Signup from '../pages/Signup'
import Alluser from '../pages/Alluser'
import Product from '../pages/Product'
const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:"/",
                element:<Signin/>
            },
            {
                path:"/sign-up",
                element:<Signup/>
            },
            {
                path:"/admin",
                element:<AdminPannel/>
            },
            {
                path:"/all-user",
                
                element:<Alluser/>
            },
            {
                path:"/product",
                element:<Product/>
            }
        ]

    }
])
export default router