import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Upload.css";

function Upload() {
    const navigate = useNavigate();

    const [mode, setMode] = useState("images");
    const [images, setImages] = useState([]);
    const [url, setUrl] = useState("");

    const [myStyle, setMyStyle] = useState(false);
    const [inspo, setInspo] = useState(false);

    const addImages = (files) => {
        const newImages = Array.from(files).map((file) =>
            URL.createObjectURL(file)
        );
        setImages((prev) => [...prev, ...newImages]);
    };

    const removeImage = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const canAnalyze =
        (mode === "images" && images.length > 0) ||
        (mode === "pinterest" && url.trim().length > 0);

    const analyze = () => {
        navigate("/results", {
            state: { mode, images, url, myStyle, inspo }
        });
    };

    return (
        <div>

            {/* HEADER */}
            <header className="upload-header">
                <button onClick={() => navigate("/dashboard")}>← Back</button>

                <h2>Wrapped</h2>

                {/* ✅ FIXED: SAME AS DASHBOARD */}
                <div className="icons">
                    <button onClick={() => document.body.classList.toggle("dark")}>
                        🌓
                    </button>
                </div>
            </header>

            <div className="upload-container">

                <h1>Upload your style</h1>
                <p>Upload images or paste Pinterest link</p>

                {/* TOGGLE */}
                <div className="toggle">
                    <button
                        className={mode === "images" ? "active" : ""}
                        onClick={() => setMode("images")}
                    >
                        Images
                    </button>

                    <button
                        className={mode === "pinterest" ? "active" : ""}
                        onClick={() => setMode("pinterest")}
                    >
                        Pinterest
                    </button>
                </div>

                {/* IMAGE MODE */}
                {mode === "images" && (
                    <div
                        className="dropzone"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                            e.preventDefault();
                            addImages(e.dataTransfer.files);
                        }}
                    >
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => addImages(e.target.files)}
                        />

                    </div>
                )}

                {/* PREVIEW */}
                {mode === "images" && (
                    <div className="grid">
                        {images.map((img, i) => (
                            <div className="img-box" key={i}>
                                <img src={img} alt="" />
                                <button onClick={() => removeImage(i)}>×</button>
                            </div>
                        ))}
                    </div>
                )}

                {/* PINTEREST */}
                {mode === "pinterest" && (
                    <input
                        className="url"
                        placeholder="Paste Pinterest URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                )}

                {/* CHECKBOXES */}
                <div className="check">
                    <input
                        type="checkbox"
                        checked={myStyle}
                        onChange={() => setMyStyle(!myStyle)}
                    />
                    <label>This is my style</label>
                </div>

                <div className="check">
                    <input
                        type="checkbox"
                        checked={inspo}
                        onChange={() => setInspo(!inspo)}
                    />
                    <label>This is inspiration</label>
                </div>

                {/* BUTTON */}
                <button
                    className="analyze"
                    disabled={!canAnalyze}
                    onClick={analyze}
                >
                    Analyze style
                </button>

            </div>
        </div>
    );
}

export default Upload;