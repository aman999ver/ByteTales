import * as faceapi from 'face-api.js';

// Load models from a CDN or local public folder
// Using JSDelivr for stability
const MODEL_URL = 'https://justadudewhohacks.github.io/face-api.js/models';

export const loadModels = async () => {
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
    await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
};

export const getFaceDescriptor = async (webcamDom) => {
    if (!webcamDom) return null;
    // Use TinyFaceDetector for speed on low-end devices
    const detection = await faceapi.detectSingleFace(webcamDom, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

    if (!detection) return null;
    return Array.from(detection.descriptor); // Convert Float32Array to standard array
};
