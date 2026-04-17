import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Onboarding.css";

function Onboarding() {
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [goal, setGoal] = useState("");
    const [style, setStyle] = useState("");
    const [customGoal, setCustomGoal] = useState("");

    const next = () => {
        if (step === 1 && !goal) return;

        if (step === 1) setStep(2);
        else {
            if (!style) return;
            navigate("/dashboard");
        }
    };

    const back = () => setStep(1);

    const isDisabled =
        (step === 1 && !goal) ||
        (step === 2 && !style);

    return (
        <div className="container">

            {/* LEFT SIDE */}
            <div className="leftPanel">
                <h1>What's your goal?</h1>
                <p className="subtitle">Help us personalize your experience</p>

                <div className="buttons">
                    {step === 2 && (
                        <button className="backBtn" onClick={back}>
                            Back
                        </button>
                    )}

                    <button
                        className={`continueBtn ${isDisabled ? "disabled" : ""}`}
                        onClick={next}
                        disabled={isDisabled}
                    >
                        Continue
                    </button>
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="rightPanel">

                {step === 1 && (
                    <>
                        <div className="optionGrid">

                            <div
                                className={`tile ${goal === "improve" ? "active" : ""}`}
                                onClick={() => setGoal("improve")}
                            >
                                Improve style
                            </div>

                            <div
                                className={`tile ${goal === "outfits" ? "active" : ""}`}
                                onClick={() => setGoal("outfits")}
                            >
                                Find outfits
                            </div>

                            <div
                                className={`tile ${goal === "shop" ? "active" : ""}`}
                                onClick={() => setGoal("shop")}
                            >
                                Shop smarter
                            </div>

                            <div
                                className={`tile ${goal === "other" ? "active" : ""}`}
                                onClick={() => setGoal("other")}
                            >
                                Other
                            </div>

                        </div>

                        {goal === "other" && (
                            <textarea
                                className="otherBox"
                                placeholder="Describe your goals here..."
                                value={customGoal}
                                onChange={(e) => setCustomGoal(e.target.value)}
                            />
                        )}
                    </>
                )}

                {step === 2 && (
                    <div className="optionGrid">

                        <div className={`tile ${style === "feminine" ? "active" : ""}`}
                             onClick={() => setStyle("feminine")}>
                            Feminine
                        </div>

                        <div className={`tile ${style === "masculine" ? "active" : ""}`}
                             onClick={() => setStyle("masculine")}>
                            Masculine
                        </div>

                        <div className={`tile ${style === "unisex" ? "active" : ""}`}
                             onClick={() => setStyle("unisex")}>
                            Unisex
                        </div>

                        <div className={`tile ${style === "none" ? "active" : ""}`}
                             onClick={() => setStyle("none")}>
                            No preference
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
}

export default Onboarding;