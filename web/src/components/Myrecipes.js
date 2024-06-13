import React, { useState, useEffect } from "react";
import { Nav } from "./Nav";
import '../css/my-recipes.css'
import {ReactComponent as IconTrashcan} from '../photos/Archive (1)/icon_trashcan.svg'
import {ReactComponent as WhitePlus} from '../photos/Archive (1)/icon_plus_white.svg'
import { Footer } from "./Footer";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export const Myrecipes = () => {
    
    const navigate = useNavigate()
    
    const [posts, setPosts] = useState([])
    const [title, setTitle] = useState('')
    const [photo, setPhoto] = useState('')
    const [content, setContent] = useState('')
    const [type, setType] = useState('Breakfast')
    const [time, setTime] = useState('')
    const [people, setPeople] = useState('')
    const [shortDescription, setShortDescription] = useState('')
    const [bestServed, setBestServed] = useState('')
    
    
    useEffect(()=>{
        getPosts()
    },[])
    
    async function deletePost(id) {
        let res = await fetch('/api/v1/blog/'+id, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                authorization: `bearer ${localStorage.getItem("jwt")}`}
        })
        res = await res.json()
        getPosts();
        console.log(res)
    }

    const deleteImg = async (filename) => {
        let res = await fetch("/api/v1/storage/"+filename, {
            method: "DELETE",
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                authorization: `bearer ${localStorage.getItem("jwt")}`}
        })
    }
    
    const getPosts = async () => {
        try {
            let res = await fetch('/api/v1/blog', {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/json',
                    authorization: `bearer ${localStorage.getItem("jwt")}`}
            });
            let data = await res.json();
            setPosts(data);
            console.log(data)
        } catch (err) {
            console.log(err);
        }
    };
    

    return(
        <div>
            <Nav/>
        <main>
            <div className="add-post">
            <h1>My recipes</h1>
            <button className="add-post-btn"><Link to="/create-post"><WhitePlus/></Link></button>
            </div>
            {posts.length > 0 ?
                <table border='0'>
                <thead>
                <tr>
                <th><span>Recipe Name</span></th>
                <th><span>Category</span></th>
                <th><span>Created on</span></th>
                <th><span>Delete</span></th>
                </tr>
                </thead>
                <tbody>
                {posts.map(post=>{
                    return(
                        <tr 
                        onClick={()=>{navigate(`/my-recipes/${post._id}`)}}
                        >   
                        <td><span>{post.title}</span></td>
                        <td><span className="category">{post.type}</span></td>
                        <td><span>{post.publishDate}</span></td>
                        <td><button className="delete-btn" onClick={()=>{deletePost(post._id); deleteImg(post.photo);}}><IconTrashcan/></button></td>
                    </tr>
                        )
                    })
                }
                    
                </tbody>
            </table> 
            
            : <p>No posts yet</p>}
            
            
            
        </main>
        <Footer/>
        </div>
    )
    }