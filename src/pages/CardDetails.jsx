import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
const baseUrl = import.meta.env.VITE_Backend_Url;
import { UserContext } from "../context/userContext";

const CardDetail = () => {
  const { id } = useParams();
  const [cardData, setCardData] = useState({});
  useEffect(() => {
    fetch(`${baseUrl}/public/cards/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(JSON.stringify(data, null, 2));
        setCardData(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);
  const {login}=useContext(UserContext)

  return (
    <div className="p-4 max-w-lg mx-auto">
      <img
        src={cardData?.src}
        alt={cardData?.name}
        className="w-full h-48 object-cover rounded"
      />
      <h1 className="text-2xl font-bold mt-4">{cardData?.name}</h1>
      <p className="text-gray-700">Limit: ${cardData?.limit}</p>
      <p className="text-gray-700">Category: {cardData?.category}</p>
      <p className="text-gray-700">Bank: {cardData?.bank}</p>

      {cardData?.pros?.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mt-4">Pros:</h2>
          <ul className="list-disc list-inside">
            {cardData?.pros &&
              cardData?.pros.map((pro, index) => (
                <li key={index} className="text-gray-700">
                  {pro}
                </li>
              ))}
          </ul>
        </>
      )}

      {cardData?.cons?.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mt-4">Cons:</h2>
          <ul className="list-disc list-inside">
            {cardData?.cons &&
              cardData?.cons.map((con, index) => (
                <li key={index} className="text-gray-700">
                  {con}
                </li>
              ))}
          </ul>
        </>
      )}

      <div className="mt-2 flex flex-col gap-2">
      {login?.token && (
  <Link
    to={`/edit-card/${id}`}
    className="min-w-36 text-center bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded transition-all duration-300 hover:from-green-700 hover:to-green-600 transition"
  >
    Edit
  </Link>
)}
        <Link
          to={`/apply/${cardData._id}`}
          className="bg-gradient-to-r from-[rgb(30,41,59)] to-[rgb(75,85,99)]  transition-all duration-300 hover:from-[rgb(75,85,99)] hover:to-[rgb(30,41,59)] text-white px-4 py-2 rounded text-center"
        >
          Apply Now
        </Link>
      </div>
    </div>
  );
};

export default CardDetail;
