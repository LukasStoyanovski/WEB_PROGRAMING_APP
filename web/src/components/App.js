import React from "react";
import { Outlet } from 'react-router-dom';
import { Blogposts } from "./Blogposts";
import "../css/app.css"
import {Nav} from "./Nav"
import { Footer } from "./Footer";


export function App() {

  return (
    <div id="app">
      <Nav/>
      <Blogposts/>
      <Footer/>
      <Outlet />
    </div>
  )
}