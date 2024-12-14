import React, { useEffect, useState, useCallback } from 'react';
import * as faceapi from 'face-api.js';

import Navbar from "../Navbar/Navbar";
import { useUser } from '../../context/UserContext';
import MatchCards from './MatchCards';
import Loader from '../Loader/Loader';

function MatchedTickets() {
  const [loading, setLoading] = useState(true); // Loading state to handle component load
  const [isSamePerson, setIsSamePerson] = useState(null); // State to track if the faces match
  const [modelsLoaded, setModelsLoaded] = useState(false); // State to track if models are loaded


  const { user, compareFaces } = useUser(); // Get compareFaces from context
  const userId = user?.userId; // Optional chaining to handle undefined userId

  const [foundUserTickets, setFoundUserTickets] = useState([]);
  const [lostUserTickets, setLostUserTickets] = useState([]);
  const [allFoundTickets, setAllFoundTickets] = useState([]);
  const [allLostTickets, setAllLostTickets] = useState([]);

  const [matches, setMatches] = useState({ foundMatches: [], lostMatches: [] });



  const renderFace = async (image, x, y, width, height) => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");

    context?.drawImage(image, x, y, width, height, 0, 0, width, height);
    canvas.toBlob((blob) => {
      image.src = URL.createObjectURL(blob);
    }, "image/jpeg");
  };


  // Function to load face-api.js models
  const loadModels = async () => {
    try {
      // Load all necessary models from the '/models' directory
      await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
      await faceapi.nets.faceExpressionNet.loadFromUri('/models');

      setModelsLoaded(true); // Set the modelsLoaded state to true once all models are loaded
    } catch (error) {
      console.error('Error loading face detection models:', error);
    }
  };

  // Function to run face detection with image URLs passed as parameters
  const runFaceDetection = async (image1, image2) => {
    try {
      setLoading(true);
  
      // Load images programmatically
      const img1 = await faceapi.fetchImage(image1);
      const img2 = await faceapi.fetchImage(image2);
  
      // Detect a single face from the ID card image
      const img1Facedetection = await faceapi.detectSingleFace(img1, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();
  
      // Detect a single face from the selfie image
      const img2Facedetection = await faceapi.detectSingleFace(img2, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();
  
      if (img1Facedetection) {
        const { x, y, width, height } = img1Facedetection.detection.box;
        await renderFace(img1, x, y, width, height); // Use img1 directly
      }
  
      if (img2Facedetection) {
        const { x, y, width, height } = img2Facedetection.detection.box;
        await renderFace(img2, x, y, width, height); // Use img2 directly
      }
  
      // Compare face descriptors if both faces are detected
      if (img1Facedetection && img2Facedetection) {
        const distance = faceapi.euclideanDistance(img1Facedetection.descriptor, img2Facedetection.descriptor);
        // console.log('Distance:', distance); // Log the distance for debugging
  
        // Set the result based on a threshold of 0.6
        if (distance <= 0.6) {
          setIsSamePerson(true);
          return { isSamePerson: true, distance };
        } else {
          setIsSamePerson(false);
          return { isSamePerson: false, distance };
        }
      } else {
        console.log('Could not detect faces in one or both images.');
        setIsSamePerson(false);
        return { isSamePerson: false, distance: null };
      }
    } catch (error) {
      console.error('Error in face detection:', error);
      setIsSamePerson(false);
      return { isSamePerson: false, distance: null };
    } finally {
      setLoading(false);
    }
  };
  
  const compareTickets = useCallback(async () => {
    const foundMatches = []; // List to hold found tickets
    const lostMatches = [];  // List to hold lost tickets
  
    // Compare found user tickets with all lost tickets
    for (const foundTicket of foundUserTickets) {
      for (const lostTicket of allLostTickets) {
        const image1Path = `http://localhost:3000${foundTicket.picture}`; // Found ticket
        const image2Path = `http://localhost:3000${lostTicket.picture}`; // Lost ticket
  
        if (!image1Path || !image2Path) {
          console.log('One of the images is undefined. Skipping...');
          continue; // Skip this iteration
        }
  
        // Use runFaceDetection to compare the pictures
        const result = await runFaceDetection(image1Path, image2Path);
        if (result && result.isSamePerson) {
          foundMatches.push(foundTicket); // Add found ticket to found matches
          lostMatches.push(lostTicket);    // Add lost ticket to lost matches
        }
      }
    }
  
    // Compare lost user tickets with all found tickets
    for (const lostTicket of lostUserTickets) {
      for (const foundTicket of allFoundTickets) {
        const image1Path = `http://localhost:3000${lostTicket.picture}`; // Lost ticket
        const image2Path = `http://localhost:3000${foundTicket.picture}`; // Found ticket
  
        if (!image1Path || !image2Path) {
          console.log('One of the images is undefined. Skipping...');
          continue; // Skip this iteration
        }
  
        // Use runFaceDetection to compare the pictures
        const result = await runFaceDetection(image1Path, image2Path);
        if (result && result.isSamePerson) {
          lostMatches.push(lostTicket);   // Store matched lost ticket
          foundMatches.push(foundTicket);  // Store matched found ticket
        }
      }
    }
  
    // Combine matches into a single object or array if needed
    const matches = { foundMatches, lostMatches };
    setMatches(matches); // Store matches in state
    console.log("Matched Tickets:", matches); // Log the matches to console

  }, [foundUserTickets, allLostTickets, lostUserTickets, allFoundTickets]);
  
  
  

  // Fetch found person tickets for the user
  const fetchFoundUserTickets = async () => {
    if (!userId) return;

    try {
      const response = await fetch('http://localhost:3000/user/foundlist-usertickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) throw new Error('Failed to fetch found person tickets');
      const data = await response.json();
      setFoundUserTickets(data);
      // console.log('Found User Tickets:', data);
    } catch (error) {
      console.error('Error fetching found person tickets:', error);
    }
  };

  // Fetch lost person tickets for the user
  const fetchLostUserTickets = async () => {
    if (!userId) return;

    try {
      const response = await fetch('http://localhost:3000/user/lostlist-usertickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) throw new Error('Failed to fetch lost person tickets');
      const data = await response.json();
      setLostUserTickets(data);
      // console.log('Lost User Tickets:', data);
    } catch (error) {
      console.error('Error fetching lost person tickets:', error);
    }
  };

  // Fetch all found person records
  const fetchAllFoundTickets = async () => {
    try {
      const response = await fetch('http://localhost:3000/user/foundlist-alltickets');

      if (!response.ok) throw new Error('Failed to fetch all found tickets');
      const data = await response.json();
      setAllFoundTickets(data);
      // console.log('All Found Tickets:', data);
    } catch (error) {
      console.error('Error fetching all found tickets:', error);
    }
  };

  // Fetch all lost person records
  const fetchAllLostTickets = async () => {
    try {
      const response = await fetch('http://localhost:3000/user/lostlist-alltickets');

      if (!response.ok) throw new Error('Failed to fetch all lost tickets');
      const data = await response.json();
      setAllLostTickets(data);
      // console.log('All Lost Tickets:', data);
    } catch (error) {
      console.error('Error fetching all lost tickets:', error);
    }
  };

  // Load models on component mount
  useEffect(() => {
    loadModels(); // Load models when the component is mounted
  }, []);

  // Fetch user tickets when userId changes
  useEffect(() => {
    if (userId) {
      fetchFoundUserTickets();
      fetchLostUserTickets();
    }
    fetchAllFoundTickets();
    fetchAllLostTickets();
  }, [userId]);

  // Compare tickets after fetching all tickets
  useEffect(() => {
    if (
      foundUserTickets.length > 0 &&
      lostUserTickets.length > 0 &&
      allFoundTickets.length > 0 &&
      allLostTickets.length > 0 &&
      modelsLoaded // Ensure models are loaded before comparing
    ) {
      compareTickets();
    }
  }, [foundUserTickets, lostUserTickets, allFoundTickets, allLostTickets, compareTickets, modelsLoaded]);
  const BASE_URL = 'http://localhost:3000'; // Define the base URL

  return (
    <>
      <Navbar />
      <div className="h-screen w-screen mt-10 mb-10 mr-10 ml-10">
        {loading ? ( // Conditional rendering for loading state
          <Loader />
        ) : matches.foundMatches.length > 0 && matches.lostMatches.length > 0 ? (
          matches.foundMatches.map((foundMatch, index) => (
            <MatchCards
              key={foundMatch._id}
              foundMatch={foundMatch}
              lostMatch={matches.lostMatches[index]}
            />
          ))
        ) : (
          <p>No matches found</p>
        )}
      </div>
    </>
  );
}

export default MatchedTickets;