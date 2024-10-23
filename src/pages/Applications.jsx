import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/userContext";
import { Link, useSearchParams } from "react-router-dom";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { login } = useContext(UserContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category") || "";
  const bank = searchParams.get("bank") || "";
  const status = searchParams.get("status") || "";

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_Backend_Url}/admin/applications`, {
          headers: {
            Authorization: `${login.token}`,
          },
        });
        setApplications(response.data);
      } catch (err) {
        setError(err.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [login.token]);

  const handleCategoryChange = (e) => {
    setSearchParams({ category: e.target.value, bank, status });
  };

  const handleBankChange = (e) => {
    setSearchParams({ category, bank: e.target.value, status });
  };

  const handleStatusChange = (e) => {
    setSearchParams({ category, bank, status: e.target.value });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="application-details-container container ">
      <h2 className="text-2xl mb-4">Applications</h2>
      <div className="flex justify-end mt-4">
        <div className="mb-4">
          <label className="block mb-2">Select Category</label>
          <select
            value={category}
            onChange={handleCategoryChange}
            required
            className="bg-gradient-to-r from-[rgb(30,41,59)] to-[rgb(75,85,99)] w-full p-2 border border-gray-300 rounded text-white"
          >
            <option value="">All</option>
            <option value="Travel Cards">Travel Cards</option>
            <option value="Corporate Cards">Corporate Cards</option>
            <option value="Reward Cards">Reward Cards</option>
            <option value="Premium Cards">Premium Cards</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Select Bank Name</label>
          <select
            value={bank}
            onChange={handleBankChange}
            required
            className="text-white bg-gradient-to-r from-[rgb(30,41,59)] to-[rgb(75,85,99)] w-full p-2 border border-gray-300 rounded"
          >
            <option value="">All</option>
            <option value="Bank of America">Bank of America</option>
            <option value="Chase">Chase</option>
            <option value="Wells Fargo">Wells Fargo</option>
            <option value="Citibank">Citibank</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Select Status</label>
          <select
            value={status}
            onChange={handleStatusChange}
            required
            className="text-white bg-gradient-to-r from-[rgb(30,41,59)] to-[rgb(75,85,99)] w-full p-2 border border-gray-300 rounded"
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>
      {applications
            .filter((app) => app.status === status || status === "")
            .filter(
              (app) => app?.cardId?.category === category || category === ""
            )
            .filter((app) => app?.cardId?.bank === bank || bank === "")
          .length==0?<h1 className="text-2xl font-bold text-red-500">No application found.</h1>:
         <table className="min-w-full bg-gradient-to-r from-[rgb(30,41,59)] to-[rgb(75,85,99)] text-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Income</th>
            <th className="py-2 px-4 border">Phone</th>
            <th className="py-2 px-4 border">Aadhar</th>
            <th className="py-2 px-4 border">Pancard</th>
            <th className="py-2 px-4 border">Action</th>
          </tr>
        </thead>
        <tbody>
        
          {applications
            .filter((app) => app.status === status || status === "")
            .filter(
              (app) => app?.cardId?.category === category || category === ""
            )
            .filter((app) => app?.cardId?.bank === bank || bank === "")
            .map((app,index) => (
              <tr
                key={app._id}
                className="border-b hover:bg-gray-700 text-center"
              >
                <td className="py-2 px-4 border">{app.status}</td>
                <td className="py-2 px-4 border">{app.personalInfo.income}</td>
                <td className="py-2 px-4 border">{app.personalInfo.phone}</td>
                <td className="py-2 px-4 border">{app.personalInfo.aadhar}</td>
                <td className="py-2 px-4 border">{app.personalInfo.pancard}</td>
                <td className="py-2 px-4 border">
                    <Link data-test={"edit-link "+(index+1)} className="underline" to={`/application/${app._id}`}>
                    {app.status !== "pending" ?"See Details": "Approve/Reject"}
                    </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>}
    </div>
  );
};

export default Applications;
