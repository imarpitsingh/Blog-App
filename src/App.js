import React, { useState, useEffect } from 'react';
import './App.css';
import AddBlog from './components/AddBlog';
import Navbar from './components/Navbar';
import ShowBlogs from './components/ShowBlogs';
import { Route, Routes } from "react-router-dom";
import BlogPost from './components/BlogPost';
import EditBlog from './components/EditBlog';

// let name = "Arpit Yadav"
function App() {

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    setBlogs(storedBlogs);
  }, []);

  useEffect(() => {
    localStorage.setItem('blogs', JSON.stringify(blogs));
  }, [blogs]);

  const addBlog = (newBlog) => {
    setBlogs([...blogs, { ...newBlog, sno: blogs.length + 1 }]);
  };
  return (
    <>
        <Navbar title="BlogApp" />
        <Routes>
          <Route path="/AddPost" element={<AddBlog onAddBlog={addBlog} />} />
          <Route path="/blog/:title" element={<BlogPost />} />
          <Route path="/EditPost/:title" element={<EditBlog />} />
          <Route path="/home" element={<ShowBlogs />} />
          <Route path="*" element={<ShowBlogs blogs={blogs} />} />
        </Routes>
    </>
  );
}
export default App;