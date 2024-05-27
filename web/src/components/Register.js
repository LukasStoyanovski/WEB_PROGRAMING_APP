import React, { useState } from "react";
import { Footer } from "./Footer";
import { Nav } from "./Nav";
import { useNavigate } from "react-router-dom";

export const Register = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [birthDate, setBirthDate] = useState('')

    const navigate = useNavigate()

    const submit = async (e) => {
        e.preventDefault();
        let account = {firstName, lastName, email, password, confirmPassword, birthDate}
        console.log(account);
        if(password !== confirmPassword) {
           alert('Please Confirm Password')
        }else{ 
            try{
            let result = await fetch('/api/v1/auth/register', {
                method: 'POST',
                body: JSON.stringify(account),
                headers: {
                    'content-type': 'application/json'
                }
            });
            if(!result.ok) {
                throw 'Error Signing in'
            }
            result = await result.json()
            localStorage.setItem("email", result.email)
            console.log(result)
            navigate('/login')
        }catch (err) {
            alert("All fields are mandatory")
        }}
    }

    return(
        <div>
           <Nav/>
            <main>
           <h1>Create Account</h1>
           <div className="login-div">
               <div className="welcome-login">
                    <h4 className="welcome">Create your<h4 className="welcome-baby">account</h4></h4>
                    <p>All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary,
                         making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, 
                         combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. 
                         The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic 
                         words etc.</p>
               </div>
            <form className="register-form" onSubmit={submit}>
            <label className="register-label">
                <span className="email-password">First Name:</span>
                <input type='text' name='first_name' placeholder="First Name" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}}/>
            </label>
            
            <label className="register-label">
                <span className="email-password">Last Name:</span>
                <input type='text' name='last_name' placeholder="Last Name" value={lastName} onChange={(e)=>{setLastName(e.target.value)}}/>
            </label>
            
            <label className="register-label">
                <span className="email-password">E-mail:</span>
                <input type='email' name='email' placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            </label>
            
            <label className="register-label">
                <span className="email-password">Birthday:</span>
                <input type='date' name='birth_date' value={birthDate} onChange={(e)=>{setBirthDate(e.target.value)}}/>
            </label>

            <label className="register-label">
                <span className="email-password">Password:</span>
                <input type='password' name='password' placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            </label>
            
            <label className="register-label">
                <span className="email-password">Repeat Password:</span>
                <input type='password' name='confirmPassword' placeholder="Repeat Password" value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
            </label>
            
            
            <button className="sign-in-button" type='submit'><span>Creat Account</span></button>

            </form>
            </div>
            </main>
            <Footer/>
        </div>
    )
}