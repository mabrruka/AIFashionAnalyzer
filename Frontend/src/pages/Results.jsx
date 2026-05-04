import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import "./Results.css";

function Results() {
    const navigate = useNavigate();
    const location = useLocation();

    const [dark, setDark] = useState(false);

    const toggleTheme = () => {
        document.body.classList.toggle("dark");
        setDark(!dark);
    };

    //  Get backend data safely
    const data = location.state ?? {
        aesthetic: "No result",
        score: 0,
        description: "No data received",
        elements: [],
        recommendations: []
    };

    // Fallbacks (prevents crashes)
    const aesthetic = data.aesthetic || "No result";
    const score = data.score || 0;
    const description = data.description || "Upload images to analyze your style.";

    // dynamic suggestions (fake for now)
    const elements = data.elements ?? [];
    const recommendations = data.recommendations ?? [];

    return (
        <div className="page">

            {/* HEADER */}
            <header>
                <div className="headerInner">

                    <h1 className="logo">Wrapped</h1>

                    <div className="icons">
                        <button onClick={toggleTheme}>
                            {dark ? "☀️" : "🌓"}
                        </button>

                        <button onClick={() => navigate("/dashboard")}>
                            ↩
                        </button>
                    </div>

                </div>
            </header>

            {/* CONTENT */}
            <div className="flow">

                {/* HERO */}
                <section className="hero">
                    <p>Your aesthetic is</p>

                    <h1 className="title">{aesthetic}</h1>

                    <div className="circle-wrap">
                        <svg className="circle" viewBox="0 0 120 120">
                            <circle className="bg" cx="60" cy="60" r="52" />
                            <circle
                                className="progress"
                                cx="60"
                                cy="60"
                                r="52"
                                style={{
                                    strokeDasharray: 327,
                                    strokeDashoffset: 327 - (327 * score) / 100
                                }}
                            />
                        </svg>

                        <div className="circle-text">{score}</div>
                    </div>

                    <p className="desc">{description}</p>
                </section>

                {/* KEY ELEMENTS */}
                <section className="section">
                    <h2 className="section-title">Key Elements</h2>

                    <div className="pill-scroll">
                        {elements.map((el, i) => (
                            <span key={i} className="pill">{el}</span>
                        ))}
                    </div>
                </section>

                {/* RECOMMENDATIONS */}
                <section className="section">
                    <h2 className="section-title">Recommendations</h2>

                    <div className="strip">
                        <img src="https://i.pinimg.com/736x/85/05/0c/85050c305dfc4a2564dbcdfdf101646f.jpg" />
                        <img src="https://i.pinimg.com/736x/df/22/d8/df22d860011fe38ec6840e54f07648a6.jpg" />
                        <img src="https://i.pinimg.com/1200x/65/22/6c/65226cf4499db4521b8dc4f76c64e683.jpg" />
                    </div>
                </section>

                {/* OUTFITS */}
                <section className="section">
                    <h2 className="section-title">Outfit Ideas</h2>

                    <div className="strip">
                        <img src="https://i.pinimg.com/1200x/d9/cd/e5/d9cde5d6a7ecfcc53558c079176028b9.jpg" />
                        <img src="https://i.pinimg.com/736x/f1/42/78/f14278d51b23da8d545d2c560df28f4c.jpg" />
                    </div>
                </section>

                {/* STORES */}
                <section className="section">
                    <h2 className="section-title">Recommended Stores</h2>

                    <div className="store-row">
                        <a className="store-pill" href="https://www.zara.com" target="_blank">Zara</a>
                        <a className="store-pill" href="https://www2.hm.com" target="_blank">H&M</a>
                        <a className="store-pill" href="https://www.cos.com" target="_blank">COS</a>
                        <a className="store-pill" href="https://shop.mango.com" target="_blank">Mango</a>
                        <a className="store-pill" href="https://www.adidas.com" target="_blank">Adidas</a>
                        <a className="store-pill" href="https://www.nike.com" target="_blank">Nike</a>
                    </div>
                </section>

                {/* CTA */}
                <section className="cta-wrap">
                    <button className="cta" onClick={() => navigate("/dashboard")}>
                        Analyze Another Style
                    </button>
                </section>

            </div>
        </div>
    );
}

export default Results;