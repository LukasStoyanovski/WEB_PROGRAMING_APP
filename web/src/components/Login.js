import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css"
import { Footer } from "./Footer";


export const Login = () => {

    const formDataInit = {
        email: String,
        password: String
    }

    const [formData, setFormData] = useState(formDataInit);

    let navigate = useNavigate();


    const submit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            let res = await fetch('/api/v1/auth/login', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'content-type': 'application/json'
                }
            });
            if (!res.ok) {
                throw 'Error Logging in';
            }
            let data = await res.json();
            localStorage.setItem('jwt', data.token);
            localStorage.setItem('email', formData.email)
            localStorage.setItem('email', formData.password)
            navigate('/my-profile')
        } catch (err) {
            alert("Wrong Password");
        }
    };

    const inputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div>
        <main className="login-page">
            <h1>Login</h1>

            <div className="login-div">

                <div className="welcome-login">
                    <h4 className="welcome">Welcome to <h4 className="welcome-baby">Baby's</h4></h4>
                        <p>All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary,
                         making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, 
                         combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. 
                         The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic 
                         words etc.</p>
                </div>

                <form className="login-form" onSubmit={submit}>
                    <label className="login-label">
                        <span className="email-password">Email</span>
                        <input className="email-password-input" type="email" name="email" value={formData.email} onChange={inputChange} />
                    </label>
                    <br/>
                    <label className="login-label">
                        <span className="email-password">Password</span>
                        <input className="email-password-input" type="password" name="password" value={formData.password} onChange={inputChange} />
                    </label>
                    <br/>
                    <button className="sign-in-button" type="submit"><span>LOG IN</span></button>
                </form>

            </div>
        </main>
        <Footer/>
        </div>
    )
}