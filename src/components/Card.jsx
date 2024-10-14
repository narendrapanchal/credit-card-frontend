import React from "react";
import { Link } from "react-router-dom";

const Card = ({ id, name, src, limit, category, bank }) => {
  return (
    <div className="bg-white shadow-md rounded p-4 max-w-sm">
      <img src={src} alt={name} className="w-full h-32 object-cover rounded" />
      <h2 className="text-xl font-bold mt-2">{name}</h2>
      <p className="text-gray-700">Limit: ${limit}</p>
      <p className="text-gray-700">Category: {category}</p>
      <p className="text-gray-700 mb-3">Bank: {bank}</p>
      <Link
        to={`/card/${id}`}
        className="bg-slate-800 text-white px-4 py-2 rounded"
      >
        Read More
      </Link>
    </div>
  );
};

export default Card;
