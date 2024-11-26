import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ApplicationForm = () => {
  const { id } = useParams();
  const [loading,setLoading]=useState(false);
  const [formData, setFormData] = useState({
    name: "",
    income: "",
    email: "",
    phone: "",
    aadhar: "",
    pancard: "",
    address: "",
    pincode: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = async(e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if(name=="pincode"&& value.toString().length==6){
      let pincode = ""+value;

// Define the URL with the pincode included
let url = `http://www.postalpincode.in/api/pincode/${pincode}`;

// Fetch the data from the API
const data=await fetch(url)
const res=await data.json();
console.log(res);
  
    }
  };

  const validate = () => {
    const { name, income, email, phone, pancard, address, pincode, aadhar } =
      formData;

    // Name validation: minimum 3 characters
    if (name.trim().length < 3) {
      setMessage("Name must be at least 3 characters long.");
      return false;
    }

    // Income validation: minimum 10000
    if (Number(income) < 10000) {
      setMessage("Income must be at least 10,000.");
      return false;
    }

    // Email validation: valid email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setMessage("Please enter a valid email address.");
      return false;
    }

    // Phone validation: Indian number (10 digits)
    const phonePattern = /^[6-9]\d{9}$/;
    if (!phonePattern.test(phone)) {
      setMessage("Phone number must be a valid 10-digit Indian number.");
      return false;
    }

    const aadharPattern = /^\d{12}$/;
    if (!aadharPattern.test(aadhar)) {
      console.log("Asdas");
      setMessage("Aadhar must be a 12-digit number.");
      return false;
    }

    // Pancard validation: length 10 including number and character
    if (pancard.trim().length !== 10) {
      setMessage("Pancard must be exactly 10 characters long.");
      return false;
    }

    // Address validation: minimum 10 characters
    if (address.trim().length < 10) {
      setMessage("Address must be at least 10 characters long.");
      return false;
    }

    // Pincode validation: 6-digit number
    const pincodePattern = /^\d{6}$/;
    if (!pincodePattern.test(pincode)) {
      setMessage("Pincode must be a 6-digit number.");
      return false;
    }

    return true; // All validations passed
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!validate()) {
      return; // Message set in validation
    }
    try {
      setMessage("");
      setLoading(true)
      const response = await axios.post(`${import.meta.env.VITE_Backend_Url}/user/apply`, {
        cardId: id,
        personalInfo: formData,
      });
      setFormData({
        name: "",
        income: "",
        email: "",
        phone: "",
        aadhar: "",
        pancard: "",
        address: "",
        pincode: "",
      });
    } catch (error) {
      setMessage(error.response.data.message);
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <div className="application-form-container mb-4">
      <h2 className="text-xl text-center mb-4">Application Form</h2>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg mx-auto bg-gradient-to-r from-[rgb(30,41,59)] to-[rgb(75,85,99)] text-white p-8 rounded shadow-md"
      >
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            name="name"
            data-test="applicant-name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-gradient-to-r from-[rgb(30,41,59)] to-[rgb(75,85,99)] p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Income</label>
          <input
            type="number"
            name="income"
            data-test="applicant-income"
            value={formData.income}
            onChange={handleChange}
            required
            className=" bg-gradient-to-r from-[rgb(30,41,59)] to-[rgb(75,85,99)] w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            data-test="applicant-email"
            value={formData.email}
            onChange={handleChange}
            required
            className="bg-gradient-to-r from-[rgb(30,41,59)] to-[rgb(75,85,99)] w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Phone</label>
          <input
            type="text"
            name="phone"
            data-test="applicant-phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="bg-gradient-to-r from-[rgb(30,41,59)] to-[rgb(75,85,99)] w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Aadhar</label>
          <input
            type="text"
            name="aadhar"
            data-test="applicant-aadhar"
            value={formData.aadhar}
            onChange={handleChange}
            required
            className="bg-gradient-to-r from-[rgb(30,41,59)] to-[rgb(75,85,99)] w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Pancard</label>
          <input
            type="text"
            name="pancard"
            data-test="applicant-pancard"
            value={formData.pancard}
            onChange={handleChange}
            required
            className="bg-gradient-to-r from-[rgb(30,41,59)] to-[rgb(75,85,99)] w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Address</label>
          <input
            type="text"
            name="address"
            data-test="applicant-address"
            value={formData.address}
            onChange={handleChange}
            required
            className="bg-gradient-to-r from-[rgb(30,41,59)] to-[rgb(75,85,99)] w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Pincode</label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            data-test="applicant-pincode"
            onChange={handleChange}
            required
            className="bg-gradient-to-r from-[rgb(30,41,59)] to-[rgb(75,85,99)] w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          data-test="applicant-submit"
          className="w-full bg-slate-600 hover:bg-slate-900 text-white py-2 rounded"
        >
          Submit
        </button>
        {message && (
          <p
          data-test="application-message"
           className="mt-4 text-center text-lg text-red-600">{message}</p>
        )}
       
      </form>
    </div>
  );
};

export default ApplicationForm;
