import {
    FaceLandmarker,
    FilesetResolver
} from "@mediapipe/tasks-vision";

export const init = async ({ landmarkerRef, videoRef, streamRef }) => {
    const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );
    landmarkerRef.current = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
            modelAssetPath:
                "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task",
            delegate: "GPU"
        },
        outputFaceBlendshapes: true,
        runningMode: "VIDEO",
        numFaces: 1
    });

    try {
        streamRef.current = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = streamRef.current;
        videoRef.current.muted = true;
        await videoRef.current.play();
    } catch (err) {
        console.error("Camera access failed:", err);
    }
};

export const detect = ({ landmarkerRef, videoRef, setExpression }) => {
    if (!landmarkerRef.current || !videoRef.current) return;

    // Video must be ready and playing
    if (videoRef.current.readyState < 2) {
        setExpression("Video not ready yet...");
        return;
    }

    const results = landmarkerRef.current.detectForVideo(
        videoRef.current,
        performance.now()
    );

    if (results.faceBlendshapes?.length > 0) {
        const blendshapes = results.faceBlendshapes[0].categories;
        const getScore = (name) =>
            blendshapes.find((b) => b.categoryName === name)?.score || 0;

        const smileLeft  = getScore("mouthSmileLeft");
        const smileRight = getScore("mouthSmileRight");
        const jawOpen    = getScore("jawOpen");
        const browUp     = getScore("browInnerUp");
        const frownLeft  = getScore("mouthFrownLeft");
        const frownRight = getScore("mouthFrownRight");

        let currentExpression = "Neutral 😐";

        // Order matters: check most distinct expressions first
        if (smileLeft > 0.5 && smileRight > 0.5) {
            currentExpression = "Happy 😄";
        } else if (jawOpen > 0.3 && browUp > 0.3) {
            currentExpression = "Surprised 😲";
        } else if (frownLeft > 0.15 && frownRight > 0.15) { // Fixed: was 0.0001
            currentExpression = "Sad 😢";
        }

        setExpression(currentExpression);
    } else {
        setExpression("No face detected 🙁");
    }
};