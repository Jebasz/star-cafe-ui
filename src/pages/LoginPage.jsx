import React, { useState } from "react";
import { FaUser, FaLock, FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import logo from "../assets/Logo.png";

import "../styles/auth/login-page.css";

function LoginPage() {

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        try {

            const data = await login(username, password);

            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);
            localStorage.setItem("username", data.username);

            if (data.role === "ADMIN") {
                navigate("/admin");
            } else {
                navigate("/");
            }

        } catch (error) {

            console.error("Login failed:", error);
            alert("Invalid Username or Password");

        }

    };

    return (

        <div className="login-page">

            <div className="login-card">

                <div className="text-center mb-4">

                    <img
                        src={logo}
                        alt="Star Tea Park"
                        className="login-logo"
                    />

                    <h4 className="fw-bold mb-0">
                        Welcome Back
                    </h4>

                    <small className="login-subtitle">
                        Sign in to continue
                    </small>

                </div>

                {/* Username */}

                <div className="mb-3">

                    <label className="form-label login-label">
                        Username
                    </label>

                    <div className="input-wrapper">

                        <FaUser />

                        <input
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e)=>setUsername(e.target.value)}
                            className="login-input"
                        />

                    </div>

                </div>

                {/* Password */}

                <div className="mb-4">

                    <label className="form-label login-label">
                        Password
                    </label>

                    <div className="input-wrapper">

                        <FaLock />

                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            className="login-input"
                        />

                    </div>

                </div>

                {/* Login */}

                <button
                    onClick={handleLogin}
                    className="login-btn"
                >
                    <FaSignInAlt className="me-2" />
                    Login
                </button>

            </div>

        </div>

    );

}

export default LoginPage;