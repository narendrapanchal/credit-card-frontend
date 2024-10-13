import React, { useState } from 'react';
import axios from 'axios';

const AddCardForm = () => {
  const [name, setName] = useState('');
  const [src, setSrc] = useState('');
  const [limit, setLimit] = useState('');
  const [category, setCategory] = useState('Travel Cards'); // Default category
  const [bank, setBank] = useState('Bank of America'); // Default bank
  const [pros, setPros] = useState(['']);
  const [cons, setCons] = useState(['']);
  const [message, setMessage] = useState('');
  const [token, setToken] = useState(''); // State to store the token

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setMessage('Authentication token is required');
      return;
    }

    try {
      const response = await axios.post(
        'https://credit-card-backend-hy1u.onrender.com/admin/add-card',
        {
          name,
          src,
          limit,
          category,
          bank,
          pros,
          cons,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        }
      );
      setMessage('Card added successfully!');
    } catch (error) {
      setMessage('Failed to add card. Please try again.');
    }
  };

  const handleAddPro = () => {
    setPros([...pros, '']);
  };

  const handleProChange = (index, value) => {
    const updatedPros = pros.map((pro, i) => (i === index ? value : pro));
    setPros(updatedPros);
  };

  const handleAddCon = () => {
    setCons([...cons, '']);
  };

  const handleConChange = (index, value) => {
    const updatedCons = cons.map((con, i) => (i === index ? value : con));
    setCons(updatedCons);
  };

  return (
    <div className="add-card-form-container">
      <h2 className="text-xl text-center mb-4">Add a New Credit Card</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto bg-slate-800 text-white p-8 rounded shadow-md">
        <div className="mb-4">
          <label className="block mb-2">Authentication Token</label>
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your authentication token"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Card Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Card Image URL</label>
          <input
            type="text"
            value={src}
            onChange={(e) => setSrc(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Credit Limit</label>
          <input
            type="number"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
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
            value={bank}
            onChange={(e) => setBank(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="Bank of America">Bank of America</option>
            <option value="Chase">Chase</option>
            <option value="Wells Fargo">Wells Fargo</option>
            <option value="Citibank">Citibank</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Pros</label>
          {pros.map((pro, index) => (
            <input
              key={index}
              type="text"
              value={pro}
              onChange={(e) => handleProChange(index, e.target.value)}
              className="w-full mb-2 p-2 border border-gray-300 rounded"
            />
          ))}
          <button type="button" onClick={handleAddPro} className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded">
            Add Pro
          </button>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Cons</label>
          {cons.map((con, index) => (
            <input
              key={index}
              type="text"
              value={con}
              onChange={(e) => handleConChange(index, e.target.value)}
              className="w-full mb-2 p-2 border border-gray-300 rounded"
            />
          ))}
          <button type="button" onClick={handleAddCon} className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded">
            Add Con
          </button>
        </div>
        <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded">
          Submit
        </button>
        {message && <p className="mt-4 text-center text-lg">{message}</p>}
      </form>
    </div>
  );
};

export default AddCardForm;
