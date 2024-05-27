import React, { useState,useEffect } from "react";
import { Nav } from "./Nav";
import "../css/blogposts.css"
import {ReactComponent as PlateIcon} from "../photos/Archive (1)/icon_plate.svg"
import {ReactComponent as TimeIcon} from "../photos/Archive (1)/icon_plate.svg"
import {ReactComponent as ArrowsIcon} from "../photos/Archive (1)/icon_arrows_white.svg"
import {ReactComponent as StarIcon} from "../photos/Archive (1)/icon_star.svg"
import { Footer } from "./Footer";

export const Dinner = () => {
    
    const [posts, setPosts] = useState([]);
    const [show, setShow] = useState(false)
    const [selectedPost, setSelectedPost] = useState("")

    const getPosts = async () => {
        try {
            let res = await fetch('/api/v1/blog/all', {
                method: 'GET'
            });
            let data = await res.json();
            console.log(data)
            setPosts(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(()=>{
        getPosts()
    },[])

    const breakfast = posts.filter(post => post.type === "Dinner")

    return (
        <div>
            <Nav/>
        <main>
        <div >
            <h1>Dinner</h1>
            {posts.length > 0 ? 
            <div className="grid-container">
                
                {breakfast.map(post=>{
                    
                    return(
                        <div onClick={()=>{setShow(true); setSelectedPost(post)}} className="recipe-card" key={post.id}>
                            
                            <img className="food-img" src={`/api/v1/storage/${post.photo}`} alt=""></img>
                            <p className="type">{post.type}</p>
                            <div className="aboute-food">
                            <h2>{post.title}</h2>
                            <p className="card-short-description">{post.shortDescription.slice(0, 305)}</p>
                            <div className="info">
                            <div className="time-people-like">
                            <TimeIcon/><p>{post.time}min</p>
                            <PlateIcon/><p>{post.people}</p>
                            <StarIcon/><p>34</p>
                            </div>
                            <div className="arrows"><ArrowsIcon/></div>
                            </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            
            : <p>Loading posts...</p>
        }
        {show ? 
                <div className="hidden-container">
                    <div className="hidden-card">
                        <p>
                            <h2 className="popup-title">{selectedPost.title}</h2>
                            <img className="popup-img" src={`/api/v1/storage/${selectedPost.photo}`} alt=""></img>
                            <h3>Best Served</h3>
                            <p className="best-served">{selectedPost.bestServed}</p>
                        </p>
                        <p>

                    <button onClick={()=>setShow(false)} className="close-container"><svg xmlns="http://www.w3.org/2000/svg" width="36.949" height="36.949" viewBox="0 0 36.949 36.949">
  <path id="Path_18" data-name="Path 18" d="M16-18.789H27.244v2.844H16V-3.707H12.924V-15.945H1.9v-2.844h11.02V-30.621H16Z" transform="translate(-3.968 20.306) rotate(45)" fill="#a5a5a5"/>
</svg>
</button>    
                            <h3>Recipe Details</h3>
                            <p className="recipe-details">{selectedPost.content}</p>
                        </p>
                    </div>
                </div>
                 :null}
        </div>
        </main>
        <Footer/>
        </div>
    )
};