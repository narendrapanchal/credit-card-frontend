import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/userContext";
import { useParams } from "react-router-dom";
const baseUrl = import.meta.env.VITE_Backend_Url;
const EditCardForm = () => {
    const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    src: "",
    limit: "",
    category: "",
    bank: "",
    pros: [""],
    cons: [""],
  });
  const [message, setMessage] = useState("");
  const { login } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const { name, src, limit, pros, cons } = formData;
    if(name.length < 3) {
      setMessage("Name must be at least 3 characters long.");
      return;
    }

    if (!isValidUrl(src)) {
      setMessage("Please enter a valid image URL.");
      return;
    }

    const creditLimit = Number(limit);
    if (isNaN(creditLimit) || creditLimit < 10000) {
      setMessage("Credit limit must be a number and at least 10,000.");
      return;
    }

    if (pros.some((pro) => pro.length < 5)) {
      setMessage("All pros must be at least 5 characters long.");
      return;
    }

    if (cons.some((con) => con.length < 5)) {
      setMessage("All cons must be at least 5 characters long.");
      return;
    }

    try {
      await axios.put(`${baseUrl}/admin/edit-card/${id}`, formData, {
        headers: {
          Authorization: `${login.token}`,
        },
      });

      alert("Card Edited successfully!");
      fetchEditableData
    } catch (error) {
      setMessage("Failed to edit card. Please try again.");
    }
  };

  const handleAddPro = () => {
    setFormData((prevData) => ({
      ...prevData,
      pros: [...prevData.pros, ""],
    }));
  };
  useEffect(() => {
    fetchEditableData();
  }, []);
  function fetchEditableData(){
    fetch(`${baseUrl}/public/cards/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({...data,__v:undefined,_id:undefined,userId:undefined});
      })
      .catch((error) => console.error("Error:", error));
  }

  const handleProChange = (index, value) => {
    const updatedPros = formData.pros.map((pro, i) =>
      i === index ? value : pro
    );
    setFormData((prevData) => ({
      ...prevData,
      pros: updatedPros,
    }));
  };

  const handleRemovePro = (index) => {
    const updatedPros = formData.pros.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      pros: updatedPros,
    }));
  };

  const handleAddCon = () => {
    setFormData((prevData) => ({
      ...prevData,
      cons: [...prevData.cons, ""],
    }));
  };

  const handleConChange = (index, value) => {
    const updatedCons = formData.cons.map((con, i) =>
      i === index ? value : con
    );
    setFormData((prevData) => ({
      ...prevData,
      cons: updatedCons,
    }));
  };

  const handleRemoveCon = (index) => {
    const updatedCons = formData.cons.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      cons: updatedCons,
    }));
  };

  const isValidUrl = (url) => {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*)\\.[a-z]{2,5})|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/.*)?$",
      "i"
    );
    return !!pattern.test(url);
  };

  return (
    <div className="add-card-form-container mb-4">
      <h2 className="text-xl text-center mb-4">Add a New Credit Card</h2>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg mx-auto bg-slate-800 text-white p-8 rounded shadow-md"
      >
        <div className="mb-4">
          <label className="block mb-2">Card Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Card Image URL</label>
          <input
            type="text"
            name="src"
            value={formData.src}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Credit Limit</label>
          <input
            type="number"
            name="limit"
            value={formData.limit}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="bg-slate-800 w-full p-2 border border-gray-300 rounded"
          >
            <option value="Travel Cards">Travel Cards</option>
            <option value="Corporate Cards">Corporate Cards</option>
            <option value="Reward Cards">Reward Cards</option>
            <option value="Premium Cards">Premium Cards</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Bank Name</label>
          <select
            name="bank"
            value={formData.bank}
            onChange={handleChange}
            required
            className="bg-slate-800 w-full p-2 border border-gray-300 rounded"
          >
            <option value="Bank of America">Bank of America</option>
            <option value="Chase">Chase</option>
            <option value="Wells Fargo">Wells Fargo</option>
            <option value="Citibank">Citibank</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Pros</label>
          {formData.pros.map((pro, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={pro}
                onChange={(e) => handleProChange(index, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <button
                type="button"
                onClick={() => handleRemovePro(index)}
                className="bg-red-600 hover:bg-red-800 text-white text-3xl ml-2 py-0 px-2 rounded-full"
              >
                &times;
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddPro}
            className="bg-slate-600 hover:bg-slate-900 text-white py-1 px-2 rounded"
          >
            Add Pro
          </button>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Cons</label>
          {formData.cons.map((con, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={con}
                onChange={(e) => handleConChange(index, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <button
                type="button"
                onClick={() => handleRemoveCon(index)}
                className="bg-red-600 hover:bg-red-800 text-white text-3xl ml-2 py-0 px-2 rounded-full"
              >
                &times;
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddCon}
            className="bg-slate-600 hover:bg-slate-900 text-white py-1 px-2 rounded"
          >
            Add Con
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-slate-600 hover:bg-slate-900 text-white py-2 rounded"
        >
          Submit
        </button>
        {message && (
          <p className="mt-4 text-center text-lg text-red-600">{message}</p>
        )}
      </form>
    </div>
  );
};

export default EditCardForm;