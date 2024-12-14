import { useState, useEffect } from 'react';
import * as faceapi from 'face-api.js';

const useFaceComparison = () => {
  const [comparisonResult, setComparisonResult] = useState('');
  const [loading, setLoading] = useState(false);

  const compareFaces = async (img1Path, img2Path) => {
    setLoading(true);
    setComparisonResult(''); // Reset the result

    // Load the necessary models from face-api.js
    await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
    await faceapi.nets.faceExpressionNet.loadFromUri('/models');

    // Create image elements
    const img1 = new Image();
    const img2 = new Image();
    img1.src = img1Path;
    img2.src = img2Path;

    await Promise.all([img1.decode(), img2.decode()]); // Ensure both images are loaded

    // Detect faces from the ID card image
    const img1Detection = await faceapi.detectSingleFace(img1, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks().withFaceDescriptor();

    // Detect faces from the selfie image
    const img2Detection = await faceapi.detectSingleFace(img2, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks().withFaceDescriptor();

    // Compare face descriptors if both faces are detected
    if (img1Detection && img2Detection) {
      const distance = faceapi.euclideanDistance(
        img1Detection.descriptor,
        img2Detection.descriptor
      );

      const threshold = 0.6; // Set the threshold for face matching
      if (distance < threshold) {
        setComparisonResult('same person'); // Set result
      } else {
        setComparisonResult('not same person'); // Set result
      }
    } else {
      setComparisonResult('no face detected'); // Handle no face detected case
    }

    setLoading(false);
  };

  return { comparisonResult, compareFaces, loading };
};

export default useFaceComparison;
