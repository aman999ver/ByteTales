import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { loadModels, getFaceDescriptor } from '../faceUtil';

const WebcamCapture = ({ onCapture, autoCapture = false }) => {
    const webcamRef = useRef(null);
    const [isOpen, setIsOpen] = useState(true);
    const [imgSrc, setImgSrc] = useState(null);
    const [loading, setLoading] = useState(true);
    const [msg, setMsg] = useState("Initializing AI... 🔄");
    const consecutiveDetections = useRef(0);

    // Initial load
    useEffect(() => {
        async function init() {
            try {
                await loadModels();
                setLoading(false);
                setMsg("Searching for Face... 👁️");
            } catch (e) {
                console.error(e);
                setMsg("AI Load Failed ⚠️");
            }
        }
        init();
    }, []);

    // Capture Logic
    const capture = async () => {
        if (!webcamRef.current) return;
        const imageSrc = webcamRef.current.getScreenshot();
        const descriptor = await getFaceDescriptor(webcamRef.current.video);

        if (descriptor) {
            setImgSrc(imageSrc);
            onCapture(descriptor, imageSrc); // Pass data up
        } else {
            consecutiveDetections.current = 0; // Reset if capture failed
        }
    };

    // Detection Loop
    useEffect(() => {
        let interval;
        if (!loading && !imgSrc) {
            interval = setInterval(async () => {
                if (webcamRef.current?.video?.readyState === 4) {
                    const descriptor = await getFaceDescriptor(webcamRef.current.video);

                    if (descriptor) {
                        consecutiveDetections.current += 1;
                        setMsg("Face Detected 🟢");

                        // Auto-Capture Threshold (e.g. 2 consecutive consistent frames)
                        if (autoCapture && consecutiveDetections.current > 2) {
                            clearInterval(interval);
                            setMsg("Authenticating... 🔐");
                            await capture();
                        }
                    } else {
                        consecutiveDetections.current = 0;
                        setMsg("Searching... 🔍");
                    }
                }
            }, 500);
        }
        return () => clearInterval(interval);
    }, [loading, imgSrc, autoCapture]);

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
            {/* Status Overlay */}
            {!imgSrc && (
                <div style={{
                    position: 'absolute', top: '10px', left: '0', right: '0',
                    textAlign: 'center', zIndex: 10, color: '#0984e3',
                    fontWeight: 'bold', textShadow: '0 2px 4px rgba(255,255,255,0.8)'
                }}>
                    {msg}
                </div>
            )}

            {imgSrc ? (
                <img src={imgSrc} alt="captured" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={400}
                    height={300}
                    videoConstraints={{ facingMode: "user" }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    mirrored={true}
                />
            )}

            {/* Manual Controls (Only if NOT autoCapture) */}
            {!autoCapture && !imgSrc && (
                <button
                    onClick={capture}
                    style={{
                        position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
                        padding: '10px 20px', background: '#0984e3', color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer'
                    }}
                >
                    Capture
                </button>
            )}
        </div>
    );
};

export default WebcamCapture;
