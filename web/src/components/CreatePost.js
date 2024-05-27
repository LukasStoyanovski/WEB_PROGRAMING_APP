import React, { useEffect, useState } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Link } from "react-router-dom";
import {ReactComponent as ArrowBack} from '../photos/Archive (1)/icon_back_white.svg'
import "../css/createPost.css"
import { useNavigate } from "react-router-dom";

export const CreatePost = () => {

    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    // const [photo, setPhoto] = useState('')
    const [type, setType] = useState('Breakfast')
    const [time, setTime] = useState('')
    const [people, setPeople] = useState('')
    const [shortDescription, setShortDescription] = useState('')
    const [bestServed, setBestServed] = useState('')
    const [selectedFile, setSelectedFile] = useState()
    const [isFileSelected, setIsFileSelected] = useState(false)
    const [img, setImg] = useState()

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0])
        setIsFileSelected(true)
        const [file] = event.target.files
        setImg(URL.createObjectURL(file))
        
        }
    

    const submit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
                    
                    formData.append('document', selectedFile)
                    
                    let res = await fetch('/api/v1/storage?key=document', 
                    {
                        method: 'POST',
                        body: formData,
                        headers: {
                            authorization: `bearer ${localStorage.getItem("jwt")}`
                            
                        }
                    }
                    )
                    let data = await res.json()
                    let photo = data.file_name
                    
            let recipe = {title, photo, content, type, time, people, shortDescription, bestServed}
        let result = await fetch('/api/v1/blog/', {
            method: "POST",
            body: JSON.stringify(recipe),
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                authorization: `bearer ${localStorage.getItem("jwt")}`
            }
            
        })
            let resp = result.json()
            console.log(resp)
            navigate("/my-recipes")
    }

    return(
        <div>
                <Nav/>
            <main>
                <div className="add-post">
                <h1>Create Recipe</h1>
                <button className="add-post-btn"><Link to='/my-recipes'><ArrowBack/></Link></button>
                </div>
                <form className="create-post-form" onSubmit={submit}>
                    <div className="link-img">

                <label className="img-label">
                        <span>Recipe Image</span>
                        <img className="selected-img" src={img} alt=""/>
                        <label className="choose-file-button">
                            <span className="select-img-span">Select Image</span>
                        <input className="choose-img" type='file' name='file' onChange={changeHandler}/>
                        </label>
                    </label>

                    {/* <label className="hidden">
                        <input type="text" name="photo" value={photo}/>
                    </label> */}
                        
                    </div>
        
                    <div className="middle-container">

                    <label>
                        <span>Recipe Title</span>
                        <input type="title" name='title' placeholder="Title" onChange={(e)=>{setTitle(e.target.value)}}/>
                    </label>
                    <br />
                    
                    

                    <div className="category-time-people">

                    <label>
                        <span>Category</span>
                        <select type="type" name='type' onChange={(e)=>{setType(e.target.value)}}>
                            <option value="Breakfast">Breakfast</option>
                            <option value="Dinner">Dinner</option>
                            <option value="Brunch">Brunch</option>
                            <option value="Lunch">Lunch</option>
                            </select>
                    </label>
                    <label className="time">
                        <span>Preparation time</span>
                        <input className="people-time" placeholder="In Minutes" type="number" name='time' onChange={(e)=>{setTime(e.target.value)}}/>
                    </label>
                    <label className="people">
                        <span>No. people</span>
                        <input className="people-time" type="number" name='people' placeholder="Number of people" onChange={(e)=>{setPeople(e.target.value)}}/>
                    </label>
                    <br />
                    </div>
                    <label>
                        <span>Best served with</span>
                        <input type="bestServed" name='bestServed' placeholder="Best served with" onChange={(e)=>{setBestServed(e.target.value)}}/>
                    </label>
                    <br />

                    <label>
                        <span>Short desription</span>
                        <textarea className="short-description" type="shortDescription" name='shortDescription' placeholder="A short description about the recipe" onChange={(e)=>{setShortDescription(e.target.value)}}/>
                    </label>
                    

                    <button className="sign-in-button" type="submit"><span className="button-span">SAVE</span></button>
                    </div>
                    <div>

                    <label>
                        <span>Recipe</span>
                        <textarea type="content" name='content' placeholder="Recipe" onChange={(e)=>{setContent(e.target.value)}}/>
                    </label>
                    </div>
                </form>
            </main>
            <Footer/>
        </div>
    )
}