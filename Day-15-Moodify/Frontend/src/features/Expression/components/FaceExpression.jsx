import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";
import "../style/Style.button.scss"

export default function FaceExpression({onClick = () => { }}) {
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const streamRef = useRef(null);

    const [expression, setExpression] = useState("Detecting...");

    useEffect(() => {
        init({ landmarkerRef, videoRef, streamRef });

        return () => {
            if (landmarkerRef.current) {
                landmarkerRef.current.close();
            }
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    async function handleClick(){
        const expression = detect({ landmarkerRef, videoRef, setExpression })
        console.log(expression);
        
        onClick(expression)
    }

    return (
        <div style={{ textAlign: "left", marginTop: "10px", marginLeft: "10px", display: "inline-block" }}>
            
            <video
                ref={videoRef}
                style={{ width: "600px", borderRadius: "12px" }}
                playsInline
                muted  // ✅ Required for autoplay in most browsers
            />
            <div style={{ textAlign: "center" }}>
            <h2>{expression}</h2>
            <button className="detect-btn" onClick={handleClick}>
                <span>Detect Expression</span>
            </button>
        </div>
        </div>
    );
}