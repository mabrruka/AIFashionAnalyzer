import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
    const navigate = useNavigate();

    const [dark, setDark] = useState(false);
    const [tab, setTab] = useState("items");

    const [user, setUser] = useState(null);
    const [results, setResults] = useState([]);

    const [editing, setEditing] = useState(false);
    const [profilePic, setProfilePic] = useState(null);
    const [bio, setBio] = useState("");

    const API = import.meta.env.VITE_API_URL || "http://localhost:3003";

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (!storedUser) {
            navigate("/login");
            return;
        }

        setUser(storedUser);
        setBio(storedUser.bio || "");
        setProfilePic(storedUser.profilePic || null);

        fetch(`${API}/profile/${storedUser.id}`)
            .then((res) => res.json())
            .then((data) => {
                const mergedUser = {
                    ...storedUser,
                    ...data.user,
                };

                setUser(mergedUser);
                setResults(data.results);

                setBio(mergedUser.bio || "");
                setProfilePic(mergedUser.profilePic || null);
            })
            .catch((err) => {
                console.error("Profile fetch error:", err);
            });
    }, [navigate, API]);

    const toggleTheme = () => setDark((p) => !p);

    const logout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => setProfilePic(reader.result);
        reader.readAsDataURL(file);
    };

    const removeProfileImage = () => {
        setProfilePic(null);
    };

    const saveProfile = async () => {
        const updatedUser = {
            ...user,
            bio,
            profilePic: profilePic || null,
        };

        try {
            const res = await fetch(`${API}/profile/${user.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    bio,
                    profilePic,
                }),
            });

            if (!res.ok) {
                console.error("Failed to update profile");
            }

        } catch (err) {
            console.error("Profile update failed:", err);
        }

        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setEditing(false);
    };

    return (
        <div className={dark ? "profile-page dark" : "profile-page"}>

            <header>
                <button onClick={() => navigate("/dashboard")}>
                    ⬅ Dashboard
                </button>

                <h1>Wrapped</h1>

                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <button onClick={() => setEditing(true)}>
                        Edit Profile
                    </button>

                    <button onClick={toggleTheme}>🌓</button>
                    <button onClick={logout}>🚪</button>
                </div>
            </header>

            <main>

                <section className="profile">

                    <img
                        src={
                            profilePic ||
                            "https://i.pinimg.com/736x/1d/ec/e2/1dece2c8357bdd7cee3b15036344faf5.jpg"
                        }
                        alt="profile"
                    />

                    <h2>{user ? user.username : "Loading..."}</h2>

                    <p style={{ fontStyle: "italic", color: "gray" }}>
                        {bio}
                    </p>

                    <p>{user ? user.email : ""}</p>

                    {editing && (
                        <div className="edit-profile">

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                onClick={(e) => (e.target.value = null)}
                            />

                            <button
                                type="button"
                                onClick={removeProfileImage}
                                style={{ marginTop: "5px" }}
                            >
                                Remove Profile Image
                            </button>

                            <textarea
                                placeholder="Write your bio..."
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                            />

                            <button onClick={saveProfile}>Save</button>
                        </div>
                    )}
                </section>

                <section>
                    <h3>Your Style Analysis</h3>

                    {results.length === 0 ? (
                        <p>No analyses yet.</p>
                    ) : (
                        results.slice(0, 4).map((r, i) => (
                            <div key={i} className="trait">
                                <span>{r.aesthetic}</span>
                                <span>{r.score}%</span>
                                <div className="bar">
                                    <div style={{ width: `${r.score}%` }}></div>
                                </div>
                            </div>
                        ))
                    )}
                </section>

                <section className="tabs">
                    <button
                        className={tab === "items" ? "active" : ""}
                        onClick={() => setTab("items")}
                    >
                        Saved results
                    </button>

                    <button
                        className={tab === "inspo" ? "active" : ""}
                        onClick={() => setTab("inspo")}
                    >
                        Inspiration
                    </button>
                </section>

                {tab === "items" && (
                    <section className="grid">
                        {results.length === 0 ? (
                            <p>No saved results yet.</p>
                        ) : (
                            results.map((item) => (
                                <div className="card" key={item.id}>
                                    <p><b>{item.aesthetic}</b></p>
                                    <p>{item.description}</p>
                                    <p>{item.score}% match</p>
                                </div>
                            ))
                        )}
                    </section>
                )}

                {tab === "inspo" && (
                    <section className="boards">
                        <div className="board">
                            <img src="https://i.pinimg.com/736x/54/2c/c0/542cc0d1e6cd940c3f233f99763297de.jpg" />
                            <h4>Everyday</h4>
                            <p>4 items</p>
                        </div>

                        <div className="board">
                            <img src="https://i.pinimg.com/736x/60/57/c2/6057c2caa4b0190a9e67ff745304bfd3.jpg" />
                            <h4>Bags</h4>
                            <p>2 items</p>
                        </div>
                    </section>
                )}

            </main>
        </div>
    );
}

export default Profile;