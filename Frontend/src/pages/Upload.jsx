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

    const API = import.meta.env.VITE_API_URL || "http://localhost:3003";

    const addImages = async (files) => {
        const toBase64 = (file) =>
            new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
            });

        const converted = await Promise.all(
            Array.from(files).map((file) => toBase64(file))
        );

        setImages((prev) => [...prev, ...converted]);
    };

    const removeImage = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const canAnalyze =
        (mode === "images" && images.length > 0) ||
        (mode === "pinterest" && url.trim().length > 0);

    //  SAVE IMAGES TO PROFILE
    const saveImages = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));

            if (!user) {
                alert("Please login first");
                return;
            }

            const res = await fetch(`${API}/save-images`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: user.id,
                    images
                })
            });

            const data = await res.json();

            if (data.success) {
                alert("Saved to profile ");
            } else {
                alert("Save failed");
            }

        } catch (err) {
            console.error(err);
            alert("Error saving images");
        }
    };

    const analyze = async () => {
        try {
            const response = await fetch(`${API}/analyze`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    images,
                    url,
                    myStyle,
                    inspo
                })
            });

            const data = await response.json();

            if (!response.ok) {
                alert("Analysis failed");
                return;
            }

            navigate("/results", { state: data });

        } catch (error) {
            console.error(error);
            alert("Server error");
        }
    };

    return (
        <div>

            <header className="upload-header">
                <button onClick={() => navigate("/dashboard")}>← Back</button>
                <h2>Wrapped</h2>
                <button onClick={() => document.body.classList.toggle("dark")}>
                    🌓
                </button>
            </header>

            <div className="upload-container">

                <h1>Upload your style</h1>
                <p>Upload images or paste Pinterest link</p>

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
                        <p>Upload images</p>
                    </div>
                )}

                {mode === "images" && images.length > 0 && (
                    <div className="grid">
                        {images.map((img, i) => (
                            <div key={i} className="img-box">
                                <img src={img} alt="" />
                                <button onClick={() => removeImage(i)}>×</button>
                            </div>
                        ))}
                    </div>
                )}

                {mode === "pinterest" && (
                    <input
                        className="url"
                        placeholder="Paste Pinterest URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                )}

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

                {/*  SAVE BUTTON */}
                <button
                    className="save-btn"
                    disabled={images.length === 0}
                    onClick={saveImages}
                >
                    Save images to profile
                </button>

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