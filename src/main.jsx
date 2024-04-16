import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import AllPosts from './pages/AllPosts.jsx'
import Edit from './pages/Edit.jsx'
import Authlayout from './components/Authlayout.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Home from './pages/Home.jsx'
import Post from './pages/Post.jsx'
import EditPost from './pages/EditPost.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/login',
        element:(
          <Authlayout authentication={false} >
            <Login/>
          </Authlayout>
        )

      },
      {
        path:'/signup',
        element:(
          <Authlayout authentication={false}>
            <Signup/>
          </Authlayout>
        )
      },
      {
        path: "/all-posts",
        element: (
            <Authlayout  authentication>
                {" "}
                <AllPosts />
            </Authlayout>
        ),
    },
    {
        path: "/add-post",
        element: (
            <Authlayout authentication >
                {" "}
                <Edit />
            </Authlayout>
        ),
    },
    {
        path: "/edit-post/:slug",
        element: (
            <Authlayout authentication >
                {" "}
                <EditPost />
            </Authlayout>
        ),
    },
    {
        path: "/post/:slug",
        element: <Post />,
    },

    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
