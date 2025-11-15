import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import AllBlogs from './views/AllBlogs'
import NewBlogs from './views/NewBlogs'
import EditBlogs from './views/EditBlogs'
import ReadBlog from './views/ReadBlog'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<AllBlogs />}/>
    <Route path='/new' element={<NewBlogs />}/>
    <Route path='/edit/:id' element={<EditBlogs />}/>
    <Route path='/blog/:slug' element={<ReadBlog />}/>
    <Route path='*' element={<div className='text-center'>404 Not Found</div>}/>
    <Route path='/login'></Route>
    <Route path='/signup'></Route>
  </Routes>
  </BrowserRouter>
)