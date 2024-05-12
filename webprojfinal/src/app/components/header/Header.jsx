"use client"
import React, { useState, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import Image from "next/image";
import "./header.css";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";
import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";


const Header = () => {
    const { user, setUser } = useUser();
    const router = useRouter();


    const [showSignInModal, setShowSignInModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [signInUsername, setSignInUsername] = useState("");
    const [signInPassword, setSignInPassword] = useState("");
    const [signUpUsername, setSignUpUsername] = useState("");
    const [signUpPassword, setSignUpPassword] = useState("");
    const [signUpEmail, setSignUpEmail] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [isNavigated, setIsNavigated] = useState(false);
    const flashContainer = document.getElementById("flash-container");//like error msgs

    function showFlashMessage(message, status) {
        flashContainer.textContent = message;
        flashContainer.style.display = "block";
        if (status === true) flashContainer.style.backgroundColor = "green";
        else flashContainer.style.backgroundColor = "#f44336";

        setTimeout(function () {
            flashContainer.style.display = "none";
        }, 3000); // Hide after 3 seconds
    }

    const saveUser = (user) => {
        localStorage.setItem("user", JSON.stringify(user));
    };


    // useEffect(() => {
    //     if (user && user.userType === "Seller" && !isNavigated) {
    //         router.push("/seller-home-page");
    //         setIsNavigated(true);
    //     }
    // }, [isNavigated, router]);

    const toggleSignInModal = () => {
        setShowSignInModal(!showSignInModal);
    };

    const toggleSignUpModal = () => {
        setShowSignUpModal(!showSignUpModal);
        setShowSignInModal(false);
    };

    const handleSignInUsernameChange = (e) => {
        setSignInUsername(e.target.value);
    };

    const handleSignInPasswordChange = (e) => {
        setSignInPassword(e.target.value);
    };

    const handleSignUpUsernameChange = (e) => {
        setSignUpUsername(e.target.value);
    };

    const handleSignUpPasswordChange = (e) => {
        setSignUpPassword(e.target.value);
    };

    const handleSignUpEmailChange = (e) => {
        setSignUpEmail(e.target.value);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("api/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: signInUsername, password: signInPassword }),
            });

            const data = await response.json(); // Parse the response data

            if (response.ok) {
                setUser(data.user);
                localStorage.setItem("user", JSON.stringify(data.user));
                setIsLoggedIn(true); // Update isLoggedIn state
                setShowSignInModal(false); // Close the sign-in modal
                showFlashMessage("SignIn Successful", true);

            } else {
                console.error("Incorrect username or password");
                showFlashMessage("SignIn Unsuccessful", false);
            }
        } catch (error) {
            showFlashMessage("SignIn Error", false);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: signUpUsername, password: signUpPassword, email: signUpEmail })
            });
            if (response.ok) {
                // const user = await response.json();
                setShowSignUpModal(false);
                showFlashMessage("SignUp Successful", true);
            }

        } catch (error) {
            console.error("An error occurred:", error);
            showFlashMessage("SignUp Unsuccessful", false);
        }
    };

    if (user && user.userType === "Admin") {
        router.push("/admin")
    }


    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        router.push("/");
    };

    return (
        <div>
            <header>
                <div className="container">
                    <div className="logo">
                        <Image src="/logo.png" alt="Logo" width={200} height={200} />
                        <div className="title">
                            <h1 className="uppercase">
                                <span className="arena">Arena</span>{" "}
                                <span className="number">51</span>
                            </h1>
                        </div>
                    </div>
                    <nav className="nav-bar">
                        <ul>
                            {user && user.userType === "Seller" ? (
                                <><li>
                                    <a href={`/seller-home-page/${user.userId}`}>Seller Home Page</a>
                                </li>
                                    <li>
                                        <a href="/seller">Add New Game</a>
                                    </li></>

                            ) : (
                                <li>
                                    <a href="/">Home</a>
                                </li>
                            )}
                            <li>
                                <a href="/contact-us"> Contact Us</a>
                            </li>
                        </ul>

                    </nav>
                    <div className="search">
                        <IoSearch size={20} />
                        <input type="text" id="search-box" placeholder="Search for Games" />
                        <button type="button" id="search-button">
                            Search
                        </button>
                    </div>
                    <div className="account">

                        {user ? (
                            <div className="not-authenticated">
                                <FaUserAlt />
                                <a style={{ margin: "0px 10px" }} >{user.username}</a>
                                <a onClick={handleLogout} style={{ cursor: "pointer" }} >Logout</a>
                            </div>
                        ) : (
                            <div className="not-authenticated">
                                <FaUserAlt />
                                <a href="#" onClick={() => setShowSignInModal(true)}>
                                    Login / Sign Up
                                </a>
                            </div>
                        )}

                    </div>
                    <div id="flash-container"></div>
                </div>
            </header>
            {/* Modal */}
            <div
                style={{
                    width: "100%",
                    margin: "0 auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {showSignInModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="modal-header">
                                    <h3 className="modal-title mb-0">Sign In</h3>
                                    <button onClick={toggleSignInModal} style={{ background: "none", border: "none" }}>
                                        <RxCross2 size={20} color="#68C301" />
                                    </button>
                                </div>
                                <div className="gap-1"></div>
                                <form onSubmit={handleLogin} className="login-form text-white">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            id="signInUsername"
                                            name="signInUsername"
                                            className="form-control"
                                            placeholder="Username"
                                            value={signInUsername}
                                            onChange={handleSignInUsernameChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            id="signInPassword"
                                            name="signInPassword"
                                            className="required form-control"
                                            placeholder="Password"
                                            value={signInPassword}
                                            onChange={handleSignInPasswordChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="login-btn" style={{ borderRadius: "20px", appearance: "none", cursor: "pointer", border: "none" }}>
                                            Sign In
                                        </button>
                                    </div>
                                    <div className="form-group text-center">
                                        <small>
                                            <a href="#">Forgot your password?</a> |{" "}
                                            <a href="#" onClick={toggleSignUpModal}>
                                                Not a member? Sign up
                                            </a>
                                        </small>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div
            >
                {showSignUpModal && (
                    <div className="modal" style={{
                        width: "300px",
                        margin: "0 auto"
                    }} >
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="modal-header">
                                    <h3 className="modal-title mb-0">Sign Up</h3>
                                    <button onClick={toggleSignUpModal} style={{ background: "none", border: "none" }}>
                                        <RxCross2 size={20} color="#68C301" />
                                    </button>
                                </div>
                                <div className="gap-1"></div>
                                <form onSubmit={handleSignUp} className="login-form text-white">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            id="signUpUsername"
                                            name="signUpUsername"
                                            className="form-control"
                                            placeholder="Username"
                                            value={signUpUsername}
                                            onChange={handleSignUpUsernameChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            id="signUpPassword"
                                            name="signUpPassword"
                                            className="required form-control"
                                            placeholder="Password"
                                            value={signUpPassword}
                                            onChange={handleSignUpPasswordChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            id="signUpEmail"
                                            name="signUpEmail"
                                            className="required form-control"
                                            placeholder="Email"
                                            value={signUpEmail}
                                            onChange={handleSignUpEmailChange} // Handle email input change
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="login-btn" style={{ borderRadius: "20px", appearance: "none", cursor: "pointer", border: "none" }}>
                                            Sign Up
                                        </button>
                                    </div>
                                    {/* <div className="form-group text-center">
                                            <small>
                                                Already a member?{" "}
                                                <a href="#" onClick={toggleSignInModal}>
                                                    Sign in
                                                </a>
                                            </small>
                                        </div> */}
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
