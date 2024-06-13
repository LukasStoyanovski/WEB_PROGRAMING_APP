import React, { useState, useEffect } from "react";
import { Nav } from "./Nav";
import '../css/my-recipes.css';
import { ReactComponent as IconTrashcan } from '../photos/Archive (1)/icon_trashcan.svg';
import { ReactComponent as WhitePlus } from '../photos/Archive (1)/icon_plus_white.svg';
import { Footer } from "./Footer";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Myrecipes = () => {
    const navigate = useNavigate();
    
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        getPosts();
    }, []);
    
    async function deletePost(id) {
        try {
            let res = await fetch('/api/v1/blog/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    authorization: `bearer ${localStorage.getItem("jwt")}`
                }
            });
    
            if (res.ok) {
                // Successfully deleted
                // Update the state to remove the deleted post
                setPosts(posts.filter(post => post._id !== id));
                console.log('Post deleted successfully');
            } else {
                console.error('Failed to delete post', res.status);
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    }

    const deleteImg = async (filename) => {
        try {
            let res = await fetch("/api/v1/storage/" + filename, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    authorization: `bearer ${localStorage.getItem("jwt")}`
                }
            });
    
            if (!res.ok) {
                console.error('Failed to delete image', res.status);
            } else {
                console.log('Image deleted successfully');
            }
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };
    
    const getPosts = async () => {
        try {
            let res = await fetch('/api/v1/blog', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    authorization: `bearer ${localStorage.getItem("jwt")}`
                }
            });
            let data = await res.json();
            setPosts(data);
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };
    
    return (
        <div>
            <Nav />
            <main>
                <div className="add-post">
                    <h1>My recipes</h1>
                    <button className="add-post-btn">
                        <Link to="/create-post">
                            <WhitePlus />
                        </Link>
                    </button>
                </div>
                {posts.length > 0 ? (
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
                            {posts.map(post => (
                                <tr 
                                    key={post._id}
                                    onClick={() => { navigate(`/my-recipes/${post._id}`); }}
                                >   
                                    <td><span>{post.title}</span></td>
                                    <td><span className="category">{post.type}</span></td>
                                    <td><span>{post.publishDate}</span></td>
                                    <td>
                                        <button
                                            className="delete-btn"
                                            onClick={(e) => {
                                                e.stopPropagation(); 
                                                deletePost(post._id);
                                                deleteImg(post.photo);
                                            }}
                                        >
                                            <IconTrashcan />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No posts yet</p>
                )}
            </main>
            <Footer />
        </div>
    );
};
