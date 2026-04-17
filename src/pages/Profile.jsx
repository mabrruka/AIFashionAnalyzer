import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
    const navigate = useNavigate();
    const [dark, setDark] = useState(false);
    const [tab, setTab] = useState("items");

    const toggleTheme = () => {
        setDark((p) => !p);
    };

    return (
        <div className={dark ? "profile-page dark" : "profile-page"}>

            {/* HEADER */}
            <header>
                <button onClick={() => navigate("/dashboard")}>
                    ⬅ Dashboard
                </button>

                <h1>Wrapped</h1>

                <button onClick={toggleTheme}>🌓</button>
            </header>

            <main>

                {/* PROFILE */}
                <section className="profile">
                    <img src="https://i.pinimg.com/736x/1d/ec/e2/1dece2c8357bdd7cee3b15036344faf5.jpg" />
                    <h2>Your Style Portfolio</h2>
                </section>

                {/* STYLE DNA */}
                <section>
                    <h3>Your Style DNA</h3>

                    <div className="dna">

                        <div className="trait">
                            <span>Minimalism</span><span>92%</span>
                            <div className="bar">
                                <div style={{ width: "92%" }}></div>
                            </div>
                        </div>

                        <div className="trait">
                            <span>Classic</span><span>85%</span>
                            <div className="bar">
                                <div style={{ width: "85%" }}></div>
                            </div>
                        </div>

                        <div className="trait">
                            <span>Modern</span><span>78%</span>
                            <div className="bar">
                                <div style={{ width: "78%" }}></div>
                            </div>
                        </div>

                        <div className="trait">
                            <span>Sustainable</span><span>70%</span>
                            <div className="bar">
                                <div style={{ width: "70%" }}></div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* TABS */}
                <section className="tabs">
                    <button
                        className={tab === "items" ? "active" : ""}
                        onClick={() => setTab("items")}
                    >
                        Saved items
                    </button>

                    <button
                        className={tab === "inspo" ? "active" : ""}
                        onClick={() => setTab("inspo")}
                    >
                        Saved inspiration
                    </button>
                </section>

                {/* ITEMS */}
                {tab === "items" && (
                    <section className="grid">

                        <div className="card">
                            <img src="https://i.pinimg.com/1200x/ff/9f/63/ff9f63f1ffd75f5a22392a29034749c2.jpg" />
                            <p>Wool coat - Toteme</p>
                        </div>

                        <div className="card">
                            <img src="https://i.pinimg.com/1200x/8f/59/1f/8f591fa7d032a5af5eff587aa89601bd.jpg" />
                            <p>Leather bag - The Row</p>
                        </div>

                        <div className="card">
                            <img src="https://i.pinimg.com/1200x/bd/6c/f9/bd6cf9e39bb3ea86086bb1f89c789ee6.jpg" />
                            <p>White shirt - COS</p>
                        </div>

                        <div className="card">
                            <img src="https://i.pinimg.com/736x/69/02/d2/6902d2a607a4a9ceaead113af561f13b.jpg" />
                            <p>Trench coat - Arket</p>
                        </div>

                    </section>
                )}

                {/* INSPIRATION */}
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