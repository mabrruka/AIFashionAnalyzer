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

    const [savedImages, setSavedImages] = useState([]);

    //  NEW STATES (SELECT MODE)
    const [selectMode, setSelectMode] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);

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
            });

        fetch(`${API}/user-saved/${storedUser.id}`)
            .then((res) => res.json())
            .then((data) => {
                setSavedImages(data);
            });

    }, [navigate, API]);

    const toggleTheme = () => setDark((p) => !p);

    const logout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    //  TOGGLE IMAGE SELECTION
    const toggleSelect = (id) => {
        setSelectedImages((prev) =>
            prev.includes(id)
                ? prev.filter((i) => i !== id)
                : [...prev, id]
        );
    };

    //  DELETE SELECTED
    const deleteSelected = async () => {
        if (selectedImages.length === 0) return;

        try {
            await fetch(`${API}/delete-saved-images`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: user.id,
                    imageIds: selectedImages,
                }),
            });

            // refresh UI
            setSavedImages((prev) =>
                prev.filter((img) => !selectedImages.includes(img.id))
            );

            setSelectedImages([]);
            setSelectMode(false);

        } catch (err) {
            console.error("Delete error:", err);
        }
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

                {/* PROFILE SECTION (UNCHANGED) */}
                <section className="profile">
                    <img
                        src={
                            profilePic ||
                            "https://i.pinimg.com/736x/1d/ec/e2/1dece2c8357bdd7cee3b15036344faf5.jpg"
                        }
                        alt="profile"
                    />

                    <h2>{user ? user.username : "Loading..."}</h2>
                    <p style={{ fontStyle: "italic", color: "gray" }}>{bio}</p>
                    <p>{user ? user.email : ""}</p>
                </section>

                {/* TABS */}
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

                {/* RESULTS TAB */}
                {tab === "items" && (
                    <section className="grid">
                        {results.map((item) => (
                            <div className="card" key={item.id}>
                                <p><b>{item.aesthetic}</b></p>
                                <p>{item.description}</p>
                                <p>{item.score}% match</p>
                            </div>
                        ))}
                    </section>
                )}

                {/* INSPIRATION TAB */}
                {tab === "inspo" && (
                    <section>

                        <div style={{ marginBottom: "10px" }}>
                            <button onClick={() => setSelectMode(!selectMode)}>
                                {selectMode ? "Cancel" : "Select"}
                            </button>

                            {selectMode && (
                                <button
                                    onClick={deleteSelected}
                                    style={{ marginLeft: "10px", color: "red" }}
                                >
                                    Delete Selected ({selectedImages.length})
                                </button>
                            )}
                        </div>

                        <div className="boards">
                            {savedImages.length === 0 ? (
                                <p>No saved inspiration yet.</p>
                            ) : (
                                savedImages.map((item) => (
                                    <div
                                        className="board"
                                        key={item.id}
                                        onClick={() =>
                                            selectMode && toggleSelect(item.id)
                                        }
                                        style={{
                                            position: "relative",
                                            cursor: selectMode ? "pointer" : "default",
                                            border: selectedImages.includes(item.id)
                                                ? "2px solid red"
                                                : "none"
                                        }}
                                    >
                                        {selectMode && (
                                            <input
                                                type="checkbox"
                                                checked={selectedImages.includes(item.id)}
                                                onChange={() => toggleSelect(item.id)}
                                                style={{
                                                    position: "absolute",
                                                    top: "10px",
                                                    left: "10px",
                                                    zIndex: 2
                                                }}
                                            />
                                        )}

                                        <img src={item.image_url} alt="" />
                                        <h4>Inspiration</h4>
                                    </div>
                                ))
                            )}
                        </div>
                    </section>
                )}

            </main>
        </div>
    );
}

export default Profile;