import React from "react";
import ReactDOM from 'react-dom/client';
import { App } from './components/App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Breakfast } from "./components/Breakfast";
import { Dinner } from "./components/Dinner";
import { Brunch } from "./components/Brunch";
import { Lunch } from "./components/Lunch";
import { Register } from "./components/Register";
import { Nav } from "./components/Nav";
import { Myrecipes } from "./components/Myrecipes";
import { CreatePost } from "./components/CreatePost";
import { MyProfile } from "./components/MyProfile";
import { UpdateRecipe } from "./components/UpdateRecipe";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <div>
  <Router>
    <Routes>
      <Route path="/" element={<App/>}/>
        <Route path="/login" element={<Nav/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/breakfast" element={<Breakfast/>}/>
        <Route path="/brunch" element={<Brunch/>}/>
        <Route path="/lunch" element={<Lunch/>}/>
        <Route path="/dinner" element={<Dinner/>}/>
        <Route path="/my-recipes" element={<Myrecipes/>}/>
        <Route path="/create-post" element={<CreatePost/>}/>
        <Route path="/my-profile" element={<MyProfile/>}/>
        <Route path="/my-recipes/:id" element={<UpdateRecipe/>}/>
        
    </Routes>
  </Router>
  </div>
)