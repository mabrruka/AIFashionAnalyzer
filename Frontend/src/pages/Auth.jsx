import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const navigate = useNavigate();

    const API = import.meta.env.VITE_API_URL || "http://localhost:3003";

    useEffect(() => {
        document.body.classList.toggle("dark-mode", darkMode);
    }, [darkMode]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const form = e.target;

        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword?.value;
        const username = form.username?.value;
        const age = form.age?.value;

        /* =========================
           CLIENT VALIDATION (SIGNUP)
        ========================= */
        if (!isLogin) {
            if (!username || username.length < 5) {
                setError("Username must be at least 5 characters long");
                setLoading(false);
                return;
            }

            if (!age || age < 13) {
                setError("You must be at least 13 years old");
                setLoading(false);
                return;
            }

            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            if (!passwordRegex.test(password)) {
                setError("Password must be 8+ chars with letters + numbers");
                setLoading(false);
                return;
            }

            if (password !== confirmPassword) {
                setError("Passwords do not match");
                setLoading(false);
                return;
            }
        }

        try {
            /* =========================
               LOGIN
            ========================= */
            if (isLogin) {
                const res = await fetch(`${API}/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password })
                });

                const data = await res.json();

                if (!res.ok) {
                    setError(data.error || "Login failed");
                    setLoading(false);
                    return;
                }

                localStorage.setItem("user", JSON.stringify(data.user));
                navigate("/dashboard");
            }

            /* =========================
               SIGNUP
            ========================= */
            else {
                const res = await fetch(`${API}/signup`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username,
                        email,
                        password,
                        age: Number(age)
                    })
                });

                const data = await res.json();

                if (!res.ok) {
                    setError(data.error || "Signup failed");
                    setLoading(false);
                    return;
                }

                const loginRes = await fetch(`${API}/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password })
                });

                const loginData = await loginRes.json();

                if (!loginRes.ok) {
                    setError(loginData.error || "Auto-login failed");
                    setLoading(false);
                    return;
                }

                localStorage.setItem("user", JSON.stringify(loginData.user));
                navigate("/onboarding");
            }

        } catch (err) {
            console.error(err);
            setError("Server is not responding");
        }

        setLoading(false);
    };

    return (
        <div className="container">

            <div className="left">
                <img
                    src="https://i.pinimg.com/736x/ed/36/8e/ed368e2c4c83b08cff60dbf48a4dfc1d.jpg"
                    alt="Fashion"
                />
            </div>

            <div className="right">

                <div className="top-bar">
                    <button onClick={() => setDarkMode(!darkMode)}>
                        🌓
                    </button>
                </div>

                <h1 className="logo">Wrapped</h1>
                <p className="subtitle">
                    Discover your unique style identity
                </p>

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

                            <input
                                type="number"
                                name="age"
                                placeholder="Age"
                                min="13"
                                required
                            />
                        </>
                    )}

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                    />

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

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? "Loading..." : "Continue"}
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