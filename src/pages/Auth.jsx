import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState("");
    const [darkMode, setDarkMode] = useState(false);

    const navigate = useNavigate();

    // Apply dark mode to whole app
    useEffect(() => {
        document.body.classList.toggle("dark-mode", darkMode);
    }, [darkMode]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword?.value;
        const username = form.username?.value;

        setError("");

        // Username validation (signup only)
        if (!isLogin && username.length < 5) {
            setError("Username must be at least 5 characters");
            return;
        }

        // Password validation (≥8 chars, letters + numbers)
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            setError("Password must be at least 8 characters and include letters and numbers");
            return;
        }

        if (!isLogin && password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        navigate("/onboarding");
    };

    return (
        <div className="container">

            {/* LEFT IMAGE */}
            <div className="left">
                <img
                    src="https://i.pinimg.com/736x/ed/36/8e/ed368e2c4c83b08cff60dbf48a4dfc1d.jpg"
                    alt="Fashion"
                />
            </div>

            {/* RIGHT SIDE */}
            <div className="right">

                {/* TOP BAR */}
                <div className="top-bar">
                    <button onClick={() => document.body.classList.toggle("dark")}>
                        🌓
                    </button>
                </div>

                <h1 className="logo">Wrapped</h1>
                <p className="subtitle">Discover your unique style identity</p>

                {/* TABS */}
                <div className="tabs">
                    <button
                        type="button"
                        className={`tab ${isLogin ? "active" : ""}`}
                        onClick={() => setIsLogin(true)}
                    >
                        Log in
                    </button>

                    <button
                        type="button"
                        className={`tab ${!isLogin ? "active" : ""}`}
                        onClick={() => setIsLogin(false)}
                    >
                        Sign up
                    </button>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit}>

                    {!isLogin && (
                        <>
                            <div className="row">
                                <input type="text" placeholder="First name" required />
                                <input type="text" placeholder="Last name" required />
                            </div>

                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                required
                            />

                            <input type="number" placeholder="Age" min="13" required />
                        </>
                    )}

                    <input type="email" placeholder="Email" required />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                    />

                    {!isLogin && (
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            required
                        />
                    )}

                    {error && <p className="error">{error}</p>}

                    <button type="submit" className="submit-btn">
                        Continue
                    </button>
                </form>

                <p className="footer">
                    By continuing, you agree to our Terms & Privacy Policy
                </p>

            </div>
        </div>
    );
}

export default Auth;