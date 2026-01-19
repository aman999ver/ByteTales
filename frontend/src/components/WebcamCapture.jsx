import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { loadModels, getFaceDescriptor } from '../faceUtil';

const WebcamCapture = ({ onCapture }) => {
    const webcamRef = useRef(null);
    const [isOpen, setIsOpen] = useState(true); // Auto-open
    const [imgSrc, setImgSrc] = useState(null);
    const [loading, setLoading] = useState(true);
    const [faceDetected, setFaceDetected] = useState(false);
    const [msg, setMsg] = useState("Loading AI... 🤖");

    // Load models ONLY when camera is opened
    useEffect(() => {
        if (isOpen) {
            async function init() {
                try {
                    await loadModels();
                    setLoading(false);
                    setMsg("Looking for face... 🔍");
                } catch (e) {
                    console.error(e);
                    setMsg("Failed to load AI 😢");
                }
            }
            init();
        }
    }, [isOpen]);

    // Live detection loop
    useEffect(() => {
        let interval;
        if (isOpen && !loading && !imgSrc) {
            interval = setInterval(async () => {
                if (webcamRef.current && webcamRef.current.video && webcamRef.current.video.readyState === 4) {
                    try {
                        const descriptor = await getFaceDescriptor(webcamRef.current.video);
                        if (descriptor) {
                            setFaceDetected(true);
                            setMsg("Face Detected! Ready to Capture 📸");
                        } else {
                            setFaceDetected(false);
                            setMsg("Looking for face... 🔍");
                        }
                    } catch (err) {
                        // ignore intermittent errors
                    }
                }
            }, 500);
        }
        return () => clearInterval(interval);
    }, [isOpen, loading, imgSrc]);

    const capture = async () => {
        if (!faceDetected) return;

        // Freeze UI immediately
        const imageSrc = webcamRef.current.getScreenshot();

        // Get final descriptor from the video stream
        setMsg("Processing...");
        const descriptor = await getFaceDescriptor(webcamRef.current.video);

        if (descriptor) {
            setImgSrc(imageSrc);
            onCapture(descriptor, imageSrc);
            setMsg("Face Captured! ✅");
            // Don't close immediately, let user see success
        } else {
            // Failed to snag a descriptor at the exact moment of capture
            setMsg("Just missed it! Hold still & try again. ⚠️");
            // Do NOT set ImgSrc, so user stays in camera mode
            onCapture(null, null);
        }
    };

    const retake = () => {
        setImgSrc(null);
        setFaceDetected(false);
        onCapture(null, null);
        setMsg("Looking for face... 🔍");
    };

    // Removed manual open button block since isOpen defaults to true

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <p style={{
                fontWeight: 'bold',
                color: msg.includes("Captured") ? '#00e676' : (msg.includes("missed") ? '#ff1744' : '#5e35b1'),
                marginBottom: '10px',
                minHeight: '20px',
                textAlign: 'center'
            }}>
                {msg}
            </p>

            <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '320px',
                border: `5px solid ${imgSrc ? '#00e676' : (faceDetected ? '#2979ff' : '#ff1744')}`,
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                backgroundColor: '#000'
            }}>
                {imgSrc ? (
                    <img src={imgSrc} alt="captured" style={{ width: '100%', display: 'block' }} />
                ) : (
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={320}
                        height={240}
                        videoConstraints={{ facingMode: "user" }}
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                        mirrored={true}
                    />
                )}
            </div>

            <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                {imgSrc ? (
                    <>
                        <button type="button" onClick={retake} style={{ backgroundColor: '#ff1744', borderColor: '#b71c1c' }}>Retake ❌</button>
                        <button type="button" onClick={() => setIsOpen(false)} style={{ backgroundColor: '#9e9e9e' }}>Done 🔽</button>
                    </>
                ) : (
                    <>
                        <button
                            type="button"
                            onClick={capture}
                            disabled={!faceDetected}
                            style={{
                                opacity: faceDetected ? 1 : 0.5,
                                cursor: faceDetected ? 'pointer' : 'not-allowed',
                                transform: faceDetected ? 'scale(1.1)' : 'scale(1)',
                                backgroundColor: faceDetected ? '#2979ff' : '#ccc',
                                borderColor: faceDetected ? '#1565c0' : '#999'
                            }}
                        >
                            Capture 📸
                        </button>
                        <button type="button" onClick={() => setIsOpen(false)} style={{ backgroundColor: '#9e9e9e' }}>Cancel ❌</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default WebcamCapture;
