import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Results.css";

function Results() {
    const navigate = useNavigate();
    const [dark, setDark] = useState(false);

    const toggleTheme = () => {
        document.body.classList.toggle("dark");
        setDark(!dark);
    };

    return (
        <div className="page">

            {/* HEADER (UNCHANGED LOOK) */}
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

                {/* HERO (UNCHANGED STYLE) */}
                <section className="hero">
                    <p>Your aesthetic is</p>

                    <h1 className="title">Minimalist</h1>

                    <div className="circle-wrap">
                        <svg className="circle" viewBox="0 0 120 120">
                            <circle className="bg" cx="60" cy="60" r="52" />
                            <circle className="progress" cx="60" cy="60" r="52" />
                        </svg>
                        <div className="circle-text">92</div>
                    </div>

                    <p className="desc">
                        Clean lines, neutral tones, and simple style.
                    </p>
                </section>

                {/* KEY ELEMENTS */}
                <section className="section">
                    <h2 className="section-title">Key Elements</h2>

                    <div className="pill-scroll">
                        <span className="pill">Tailored silhouettes</span>
                        <span className="pill">Neutral palette</span>
                        <span className="pill">Minimal accessories</span>
                        <span className="pill">Clean lines</span>
                        <span className="pill">Monochrome looks</span>
                        <span className="pill">Structured pieces</span>
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