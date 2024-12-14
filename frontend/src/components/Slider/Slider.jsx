// import React, { useState, useEffect, useRef } from "react";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import { useSwipeable } from "react-swipeable";

// const Slider = ({ data }) => {
//     const [currentIndex, setCurrentIndex] = useState(0);
//   const carouselRef = useRef(null);

      
//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === data.length - 4 ? 0 : prevIndex + 1
//     );
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? data.length - 4 : prevIndex - 1
//     );
//   };

//   const handlers = useSwipeable({
//     onSwipedLeft: () => nextSlide(),
//     onSwipedRight: () => prevSlide(),
//     preventDefaultTouchmoveEvent: true,
//     trackMouse: true
//   });

//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.key === "ArrowLeft") {
//         prevSlide();
//       } else if (event.key === "ArrowRight") {
//         nextSlide();
//       }
//     };

//     document.addEventListener("keydown", handleKeyDown);
//     return () => {
//       document.removeEventListener("keydown", handleKeyDown);
//     };
//   }, []);

//   return (
//     <div className="w-full max-w-7xl mx-auto px-4 py-8">
//       <div className="relative overflow-hidden" {...handlers} ref={carouselRef}>
//         <div
//           className="flex transition-transform duration-300 ease-in-out"
//           style={{ transform: `translateX(-${currentIndex * 25}%)` }}
//         >
//           {data.map((item) => (
//             <div
//               key={item.id}
//               className="w-1/4 flex-shrink-0 px-2"
//               aria-label={`Blog item: ${item.name}`}
//             >
//               <div className="flex flex-col items-center justify-center">
//                 <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 focus-within:ring-2 focus-within:ring-blue-500">
//                   <img
//                     src={`http://localhost:3000${item.picture}`} // Concatenates the base URL with the item.picture
//                     alt={item.title}
//                     className="w-full h-48 object-cover"
//                   />
//                   <div className="p-4 text-center"> {/* Center text inside the card */}
//                     <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full mb-2">
//                       {item.name}
//                     </span>
//                     <p className="text-gray-600 text-sm">Age: {item.age || "Unknown"}</p>
//                     <p className="text-gray-600 text-sm">City: {item.city}</p> {/* Fixed duplicate State */}
//                     <p className="text-gray-600 text-sm">State: {item.state}</p>
//                     <p className="text-gray-600 text-sm">Contact Number: {item.phone}</p>
                    
//                   </div>
//                 </div>
//               </div>

//             </div>
//           ))}
//         </div>
//         <button
//           onClick={prevSlide}
//           className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 ml-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           aria-label="Previous slide"
//         >
//           <FaChevronLeft className="text-gray-800" />
//         </button>
//         <button
//           onClick={nextSlide}
//           className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           aria-label="Next slide"
//         >
//           <FaChevronRight className="text-gray-800" />
//         </button>
//       </div>
//     </div>
//   );
// };

import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSwipeable } from "react-swipeable";
import { useUser } from '../../context/UserContext';

const Slider = ({ data, onCloseTicket }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef(null);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === data.length - 4 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? data.length - 4 : prevIndex - 1
        );
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => nextSlide(),
        onSwipedRight: () => prevSlide(),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "ArrowLeft") {
                prevSlide();
            } else if (event.key === "ArrowRight") {
                nextSlide();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8">
            <div className="relative overflow-hidden" {...handlers} ref={carouselRef}>
                <div
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 25}%)` }}
                >
                    {data.map((item) => (
                        <div
                            key={item._id}
                            className="w-1/4 flex-shrink-0 px-2"
                            aria-label={`Blog item: ${item.name}`}
                        >
                            <div className="flex flex-col items-center justify-center">
                                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 focus-within:ring-2 focus-within:ring-blue-500">
                                    <img
                                        src={`http://localhost:3000${item.picture}`}
                                        alt={item.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4 text-center">
                                        <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full mb-2">
                                            {item.name}
                                        </span>
                                        <p className="text-gray-600 text-sm">Age: {item.age || "Unknown"}</p>
                                        <p className="text-gray-600 text-sm">City: {item.city}</p>
                                        <p className="text-gray-600 text-sm">State: {item.state}</p>
                                        <p className="text-gray-600 text-sm">Contact Number: {item.phone}</p>

                                        {item.ticketStatus === "open" ? (
                                            <button
                                                onClick={() => onCloseTicket(item._id)} // Call the function passed from YourList
                                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                            >
                                                Close Ticket
                                            </button>
                                        ) : (
                                            <button
                                                disabled
                                                className="mt-4 px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed"
                                            >
                                                Ticket Closed
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 ml-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Previous slide"
                >
                    <FaChevronLeft className="text-gray-800" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Next slide"
                >
                    <FaChevronRight className="text-gray-800" />
                </button>
            </div>
        </div>
    );
};

// Define prop types
Slider.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            city: PropTypes.string.isRequired,
            state: PropTypes.string.isRequired,
            phone: PropTypes.string.isRequired,
            picture: PropTypes.string.isRequired,
            ticketStatus: PropTypes.string.isRequired // Add ticketStatus to prop types
        })
    ).isRequired,
    onCloseTicket: PropTypes.func.isRequired // Add the prop type for onCloseTicket
};

export default Slider;
