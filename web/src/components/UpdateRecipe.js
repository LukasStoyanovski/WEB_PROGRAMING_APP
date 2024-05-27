import { useParams } from "react-router-dom";
import { Nav } from "./Nav";
import React, { useState, useEffect } from "react";
import '../css/my-recipes.css'
import { Footer } from "./Footer";
import { useNavigate } from "react-router-dom";
import {ReactComponent as ArrowBack} from '../photos/Archive (1)/icon_back_white.svg'

export const UpdateRecipe = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [photo, setPhoto] = useState('')
    const [content, setContent] = useState('')
    const [type, setType] = useState('Breakfast')
    const [time, setTime] = useState('')
    const [people, setPeople] = useState('')
    const [shortDescription, setShortDescription] = useState('')
    const [bestServed, setBestServed] = useState('')
    const [selectedFile, setSelectedFile] = useState()
    const [isFileSelected, setIsFileSelected] = useState(false)
    const [img, setImg] = useState()

    const changeHandler = async (event) => {
        setSelectedFile(event.target.files[0])
        setIsFileSelected(true)
        const [file] = event.target.files
        setImg(URL.createObjectURL(file))
    }

    const getPost = async () => {
        try {
            let res = await fetch(`/api/v1/blog/${id}`, {
                method: 'GET',
                headers: {
                    "content-type": "application/json",
                    authorization: `bearer ${localStorage.getItem("jwt")}`
                }
            });
            let data = await res.json();
            setTitle(data.title)
            setPhoto(data.photo)
            setContent(data.content)
            setType(data.type)
            setTime(data.time)
            setPeople(data.people)
            setShortDescription(data.shortDescription)
            setBestServed(data.bestServed)
        } catch (err) {
            console.log(err);
        }   

    };

    useEffect(()=>{
        getPost()
    },[])

    const updatePostAndPhoto = async (id) => {
        const formData = new FormData();

        formData.append('document', selectedFile)
        

        let result = await fetch('/api/v1/storage?key=document', 
        {
            method: 'POST',
            body: formData,
            headers: {
                authorization: `bearer ${localStorage.getItem("jwt")}`

            }
        }
        )
        let info = await result.json()
        let photo = info.file_name

        let recipe = {title, content, photo, type, time, people, shortDescription, bestServed }
        console.log(recipe)
        let res = await fetch(`/api/v1/blog/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem("jwt")}`},
            body: JSON.stringify(recipe)
            })
            
            let data = await res.json()
        }

    const updateOnlyPost = async (id) => {

        let recipe = {title, content, photo, type, time, people, shortDescription, bestServed }
        console.log(recipe)
        let res = await fetch(`/api/v1/blog/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem("jwt")}`},
            body: JSON.stringify(recipe)
            })
            
            let data = await res.json()
        }

    return(
        <div>
                <Nav/>
            <main>
                <div className="add-post">
                <h1>Update Recipe</h1>
                <button className="add-post-btn" onClick={()=>{navigate('/my-recipes')}}><a><ArrowBack/></a></button>
                </div>
                <form className="create-post-form">
                    <div className="link-img">

                <label className="img-label">
                        <span>Recipe Image</span>
                        {isFileSelected ? 
                        <img className="selected-img" src={img} alt=""/> :
                        <img className="selected-img" src={`/api/v1/storage/${photo}`} alt=""/>}
                        <label className="choose-file-button">
                            <span className="select-img-span">Select Image</span>
                        <input className="choose-img" type='file' name='file' onChange={changeHandler}/>
                        </label>
                    </label>
                        
                    </div>
        
                    <div className="middle-container">

                    <label>
                        <span>Recipe Title</span>
                        <input type="title" name='title' placeholder="Title" value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
                    </label>
                    <br />
                    
                    

                    <div className="category-time-people">

                    <label>
                        <span>Category</span>
                        <select type="type" name='type' value={type} onChange={(e)=>{setType(e.target.value);}}>
                            <option value="Breakfast">Breakfast</option>
                            <option value="Dinner">Dinner</option>
                            <option value="Brunch">Brunch</option>
                            <option value="Lunch">Lunch</option>
                            </select>
                    </label>
                    <label className="time">
                        <span>Preparation time</span>
                        <input className="people-time" placeholder="In Minutes" type="number" name='time' value={time} onChange={(e)=>{setTime(e.target.value)}}/>
                    </label>
                    <label className="people">
                        <span>No. people</span>
                        <input className="people-time" type="number" name='people' placeholder="Number of people" value={people} onChange={(e)=>{setPeople(e.target.value)}}/>
                    </label>
                    <br />
                    </div>
                    <label>
                        <span>Best served with</span>
                        <input type="bestServed" name='bestServed' placeholder="Best served with" value={bestServed} onChange={(e)=>{setBestServed(e.target.value)}}/>
                    </label>
                    <br />

                    <label>
                        <span>Short desription</span>
                        <textarea className="short-description" type="shortDescription" name='shortDescription' value={shortDescription} onChange={(e)=>{setShortDescription(e.target.value)}}/>
                    </label>
                    
                    {isFileSelected ? 
                    <button className="sign-in-button" onClick={()=>{updatePostAndPhoto(id)}}><span className="button-span">SAVE</span></button> :
                    <button className="sign-in-button" onClick={()=>{updateOnlyPost(id);}}><span className="button-span">SAVE</span></button> 

                    }   
                    </div>
                    <div>

                    <label>
                        <span>Recipe</span>
                        <textarea type="content" name='content' placeholder="Recipe" value={content} onChange={(e)=>{setContent(e.target.value)}}/>
                    </label>
                    </div>
                </form>
            </main>
            <Footer/>
        </div>
    );
}   