import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";

const Card = ({ id, name, src, limit, category, bank }) => {
  const { login } = useContext(UserContext);

  const handleDelete = async () => {
    try {
      console.log(login);
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
    }
  };
  return (
    <div className="bg-white shadow-md rounded p-4 max-w-sm">
      <img src={src} alt={name} className="w-full h-32 object-cover rounded" />
      <h2 className="text-xl font-bold mt-2">{name}</h2>
      <p className="text-gray-700">Limit: ${limit}</p>
      <p className="text-gray-700">Category: {category}</p>
      <p className="text-gray-700 mb-3">Bank: {bank}</p>
      <div className="flex justify-between">
        <Link
          to={`/card/${id}`}
          className="min-w-36 text-center bg-gradient-to-r from-[rgb(30,41,59)] to-[rgb(75,85,99)]  transition-all duration-300 hover:from-[rgb(75,85,99)] hover:to-[rgb(30,41,59)] text-white px-4 py-2 rounded"
        >
          Read More
        </Link>
        {login?.token && (
          <Link
            to={`/edit-card/${id}`}
            className="min-w-36 text-center bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded transition-all duration-300 hover:from-green-700 hover:to-green-600 transition"
          >
            Edit
          </Link>
        )}
      </div>
      <div>
        {login?.token && (
          <button
            onClick={handleDelete}
            className="w-full mt-2 text-center bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded transition-all duration-300 hover:from-red-700 hover:to-red-600 transition"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
