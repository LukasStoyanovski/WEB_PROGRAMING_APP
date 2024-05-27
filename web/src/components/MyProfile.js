import React, { useEffect, useState } from "react";
import { Nav } from "./Nav";
import "../css/myProfile.css"
import { Footer } from "./Footer";


export const MyProfile = () => {

    const mail = localStorage.getItem('email')
    const password = localStorage.getItem('password')

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [birthDate, setBirthDate] = useState("")
    const [avatar, setAvatar] = useState("")
    const [selectedFile, setSelectedFile] = useState()
    const [isFileSelected, setIsFileSelected] = useState(false)
    const [img, setImg] = useState()

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0])
        setIsFileSelected(true)
        const [file] = event.target.files
        setImg(URL.createObjectURL(file))
        }

    async function updateProfileAndPhoto(e) {
        e.preventDefault();
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
                    let resp = await result.json()
                    let avatar = resp.file_name
                    let acc = {firstName,lastName, email, birthDate, avatar}
        let res = await fetch(`/api/v1/auth/update/me`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem("jwt")}`},

            body:JSON.stringify(acc)
        })
        
        let data = await res.json()
        console.log(data)
    }
    async function updateOnlyProfile(e) {
        e.preventDefault();
                    let acc = {firstName,lastName, email, birthDate, avatar}
        let res = await fetch(`/api/v1/auth/update/me`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem("jwt")}`},

            body:JSON.stringify(acc)
        })
        
        let data = await res.json()
        console.log(data)
    }

    const getAccount = async () => {
        try {
            let res = await fetch(`/api/v1/auth/${mail}`, {
                method: 'GET',
                headers: {
                    "content-type": "application/json",
                    authorization: `bearer ${localStorage.getItem("jwt")}`
                }
            });
            let data = await res.json();
            setFirstName(data.firstName)
            setLastName(data.lastName)
            setEmail(data.email)
            setBirthDate(data.birthDate)
            setAvatar(data.avatar)
            
        } catch (err) {
            console.log(err);
        }   

    };

    useEffect(()=>{
        getAccount()
    },[])

    

    return(
        <div>
            <Nav/>
            <main>
            <h1>My Profile</h1>
            <form className="my-profile-form">
                <div className="avatar">
            <label className="img-label">
                        {isFileSelected ? 
                        <img className="selected-avatar" src={img} alt=""/>
                        :
                        <img className="selected-avatar" src={`/api/v1/storage/${avatar}`} alt=""/>}
                        <label className="choose-avatar-button">
                            <span className="select-avatar-span">CHANGE AVATAR</span>
                        <input className="choose-img" type='file' name='file' onChange={changeHandler}/>
                        </label>
                    </label>
                    <br/>
                </div>

                <div >
                    <label className="my-profile-label">
                        <span className="my-profile-span">First Name</span>
                        <input className="my-profile-input" type="text" name="first-name" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} />
                    </label>
                    <br />
                    <label className="my-profile-label">
                        <span className="my-profile-span">Last Name</span>
                        <input className="my-profile-input" type="text" name="last-name" value={lastName} onChange={(e)=>{setLastName(e.target.value)}} />
                    </label>
                    <br />
                    <label className="my-profile-label">
                        <span className="my-profile-span">Birthday</span>
                        <input className="my-profile-input" type="date" name="date" value={birthDate} onChange={(e)=>{setBirthDate(e.target.value)}} />
                    </label>
                    <br />
                    {isFileSelected ? 
                    <button className="sign-in-button" onClick={updateProfileAndPhoto}><span>UPDATE PROFILE</span></button>
                :
                    <button className="sign-in-button" onClick={updateOnlyProfile}><span>UPDATE PROFILE</span></button>
                }
                </div>
                </form>
            </main>
            <Footer/>
        </div>
    )
}