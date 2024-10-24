import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";

const Card = ({ id, name, src, limit, index }) => {
  const { login } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await fetch(
        `${import.meta.env.VITE_Backend_Url}/admin/delete-card/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `${login.token}`,
          },
        }
      );
      alert("Card deleted successfully!");
      location.reload();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg hover:shadow-xl rounded-lg p-4 md:flex md:gap-4 items-center transition-shadow duration-300">
      <img
        src={src}
        alt={name}
        className="w-56 max-h-32 object-contain rounded-lg shadow-md"
      />
      <div className="flex flex-col justify-between h-full">
        <div>
          <h2 className="text-xl font-bold text-gray-800">{name}</h2>
          <p className="text-gray-600">Limit: ${limit}</p>
        </div>
        <div className="flex justify-between gap-2 mt-4">
          <Link
            to={`/card/${id}`}
            data-test={"Read More " + index}
            className="min-w-28 text-center bg-gradient-to-r from-blue-600 to-blue-500 transition-all duration-300 hover:from-blue-500 hover:to-blue-400 text-white px-4 py-2 rounded-lg"
          >
            Read More
          </Link>
          {login?.token && (
            <Link
              data-test={"Edit " + index}
              to={`/edit-card/${id}`}
              className="min-w-28 text-center bg-gradient-to-r from-green-500 to-green-400 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:from-green-400 hover:to-green-300"
            >
              Edit
            </Link>
          )}
        </div>
        <div>
          {login?.token && (
            <button
              disabled={loading}
              onClick={handleDelete}
              data-test={"Delete " + index}
              className="w-full mt-2 text-center bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:from-red-500 hover:to-red-400"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
  