// Card.jsx
import React from "react";

const Card = ({ item }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 focus-within:ring-2 focus-within:ring-blue-500"
      aria-label={`Blog item: ${item.name}`}
    >
      <img
        src={item.image}
        alt={item.name}
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
      </div>
    </div>
  );
};

export default Card;
