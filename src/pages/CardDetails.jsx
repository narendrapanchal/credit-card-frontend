import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const CardDetail = () => {
  const { id } = useParams();
  const [cardData, setCardData] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_Backend_Url}/public/cards/${id}`);
        if (!response.ok) throw new Error("Failed to fetch card data.");
        const data = await response.json();
        setCardData(data);
      } catch (err) {
        setMessage(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleDelete = async () => {
    try {
      await fetch(`${import.meta.env.VITE_Backend_Url}/admin/delete-card/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `${login.token}`,
        },
      });
      navigate("/");
    } catch (error) {
      setMessage(error.message);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-lg">
      <img
        src={cardData?.src}
        alt={cardData?.name}
        className="w-full h-48 object-cover rounded-lg shadow-md"
      />
      <h1 data-test="card-name" className="text-3xl font-bold mt-4 text-gray-800">{cardData?.name}</h1>
      <p data-test="card-limit" className="text-gray-700 mt-2">Limit: ${cardData?.limit}</p>
      <p data-test="card-category" className="text-gray-700">Category: {cardData?.category}</p>
      <p data-test="card-bank" className="text-gray-700">Bank: {cardData?.bank}</p>

      {cardData?.pros?.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mt-4">Pros:</h2>
          <ul className="list-disc list-inside">
            {cardData?.pros.map((pro, index) => (
              <li key={index} className="text-gray-700">{pro}</li>
            ))}
          </ul>
        </>
      )}

      {cardData?.cons?.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mt-4">Cons:</h2>
          <ul className="list-disc list-inside">
            {cardData?.cons.map((con, index) => (
              <li key={index} className="text-gray-700">{con}</li>
            ))}
          </ul>
        </>
      )}

      <div className="mt-4 flex flex-col gap-3">
        {login?.token && (
          <Link
            to={`/edit-card/${id}`}
            className="min-w-36 text-center bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:from-green-700 hover:to-green-600 shadow transition"
          >
            Edit
          </Link>
        )}
        {!login?.token && (
          <Link
            to={`/apply/${cardData._id}`}
            className="min-w-36 text-center bg-gradient-to-r from-blue-600 to-blue-500 transition-all duration-300 hover:from-blue-500 hover:to-blue-400 text-white px-4 py-2 rounded-lg shadow"
            data-test="apply-now"
          >
            Apply Now
          </Link>
        )}
        {login?.token && (
          <button
            onClick={handleDelete}
            className="w-full text-center bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:from-red-700 hover:to-red-600 shadow"
          >
            Delete
          </button>
        )}
        {message && (
          <p className="mt-4 text-center text-lg text-red-600">{message}</p>
        )}
      </div>
    </div>
  );
};

export default CardDetail;
