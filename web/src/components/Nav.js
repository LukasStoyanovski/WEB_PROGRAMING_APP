import React, { useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../css/nav.css"
import { Login } from './Login';
import { ReactComponent as Logo } from '../photos/new_logo_color.svg'


export const Nav = () => {

    const location = useLocation()
    const token = localStorage.getItem('jwt')

    
    const removeToken = () => {
        localStorage.clear()
    }

    useEffect(()=>{
        if(location.pathname === '/breakfast') {
            document.getElementById('breakfast').style.color='#96BB36';
        }if(location.pathname === '/brunch') {
            document.getElementById('brunch').style.color='#96BB36';
        }if(location.pathname === '/dinner') {
            document.getElementById('dinner').style.color='#96BB36';
        }if(location.pathname === '/lunch') {
            document.getElementById('lunch').style.color='#96BB36';
        }
    },[])
    
    return (
        <div className='nav'>
        <ul className='header-links'>
            <li><Link to="/"><Logo />
</Link></li>

            <div className='type-of-foods'>
            <li><Link id='breakfast' className='foods-links' to="/breakfast" >Breakfast</Link></li>
            <li><Link id='brunch' className='foods-links' to="/brunch">Brunch</Link></li>
            <li><Link id='lunch' className='foods-links' to="/lunch">Lunch</Link></li>
            <li><Link id='dinner' className='foods-links' to="/dinner">Dinner</Link></li>
            </div>

            
            {token ? 
            <ul className='logged-in-links'>
                <div className='type-of-foods'>
                <li><Link className='my-recipes' to='/my-recipes'>My recipes</Link></li>
                <li><Link className='my-profile' to='/my-profile'>My profile</Link></li>
                <li onClick={removeToken}><Link className='log-out-btn' to='/login'>Log out</Link></li>
                </div>
            </ul>
            : 
            <div className='buttons'>
            <Link className='nav-btns' to="/login"><button className='login'><span>Login</span></button></Link>
            <span className='or'>or</span>
            <Link className='nav-btns' to="/register"><button className='register'><span>Create account</span></button></Link>
            </div>
            }
            
            </ul>
            <div>
            {location.pathname === '/login' ? 
            <Login/> : ""}
            </div>
            </div>
    )
}
