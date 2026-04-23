import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
    const [darkMode, setDarkMode] = useState(false);
    const navigate = useNavigate();

    return (
        <div className={darkMode ? "dark" : ""}>

            {/* HEADER */}
            <header>
                <div className="headerInner">

                    <h1 className="logo">Wrapped</h1>

                    <div className="icons">
                        <button onClick={() => setDarkMode(p => !p)}>🌓</button>
                        <button onClick={() => navigate("/profile")}>👤</button>
                        <button onClick={() => navigate("/")}>🚪</button>
                    </div>

                </div>
            </header>

            {/* MAIN */}
            <main className="page">

                {/* HERO */}
                <section className="hero">
                    <h2>Analyze your style</h2>
                </section>

                {/* PANELS */}
                <section className="split">

                    <div className="panel" onClick={() => navigate("/upload")}>
                        <h3>Upload images</h3>
                        <p>Drop your style inspiration or outfit photos</p>
                    </div>

                    <div className="panel" onClick={() => navigate("/upload?mode=pinterest")}>
                        <h3>Pinterest link</h3>
                        <p>Paste a Pinterest board or pin URL</p>
                    </div>

                </section>

                {/* STATIC IMAGE STRIP */}
                <section className="strip">
                    <img src="https://i.pinimg.com/736x/21/a4/5c/21a45c1cf787a6cac57ebf2b5ef66703.jpg" />
                    <img src="https://i.pinimg.com/736x/96/58/61/9658614b5ead46073cbe057aadccdaa3.jpg" />
                    <img src="https://i.pinimg.com/736x/d9/97/34/d9973436f308e448f5df77f70f6addfe.jpg" />
                    <img src="https://i.pinimg.com/736x/cf/67/44/cf6744f16597e78868e0cd28090ca4e1.jpg" />
                    <img src="https://i.pinimg.com/736x/d5/b1/83/d5b18324ccbc3591a6d99fac314d212c.jpg" />
                    <img src="https://i.pinimg.com/736x/85/f8/35/85f8350e6776a3c401c1a9985150f2dd.jpg" />
                    <img src="https://i.pinimg.com/736x/21/a4/5c/21a45c1cf787a6cac57ebf2b5ef66703.jpg" />
                    <img src="https://i.pinimg.com/736x/96/58/61/9658614b5ead46073cbe057aadccdaa3.jpg" />
                    <img src="https://i.pinimg.com/736x/d9/97/34/d9973436f308e448f5df77f70f6addfe.jpg" />
                </section>

            </main>
        </div>
    );
}

export default Dashboard;