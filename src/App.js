import { BrowserRouter, Routes, Route, Redirect } from 'react-router-dom';
import React from 'react';

import Header from './Header';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Register from './pages/Register';
import Posts from './pages/Posts';
import Post from './pages/Post'
import NewPost from './pages/NewPost';


import UnlockFeature from './pages/UnlockFeature';


function App(){
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} ></Route>
                <Route path='/signin' element={<Signin />} ></Route>
                <Route path='/register' element={<Register />} ></Route>
                <Route path='/my/posts' element="Welcome!" ></Route>
                <Route path='/code' element={<UnlockFeature />} ></Route>
                <Route path='/newpost' element={<NewPost />} ></Route>
                <Route path='/posts' element={<Posts />} ></Route>
                <Route path='/posts/:postId' /*element={<Post />}*/ ></Route>
            </Routes>
        </BrowserRouter>
    );
}
export default App;