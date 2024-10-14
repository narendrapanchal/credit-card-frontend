import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useNavigation, useParams } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios';
const baseUrl=import.meta.env.VITE_Backend_Url

function EditApplication() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const { login } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate=useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseUrl}/admin/applications/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': login.token
                    }
                });
                const result = await response.json();
                console.log(JSON.stringify(result, null, 2));
                setData(result);
            } catch (err) {
                setError('Failed to fetch application details.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, login.token]);

    const handleApprove = async () => {
        try {
            await axios.put(`${baseUrl}/admin/applications/${id}`, { status: 'approved' }, {
                headers: {
                    'Authorization': login.token
                }
            });
            alert('Application approved!');
            navigate("/applications")
        } catch (error) {
            alert('Failed to approve the application.');
        }
    };

    const handleReject = async () => {
        try {
            await axios.put(`${baseUrl}/admin/applications/${id}`, { status: 'rejected' }, {
                headers: {
                    'Authorization': login.token
                }
            });
            alert('Application rejected!');
            navigate("/applications")

        } catch (error) {
            alert('Failed to reject the application.');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className='mt-4 mb-4'>
            <div className="edit-application-container p-6 bg-slate-900 text-white rounded-lg shadow-lg container">
            <h2 className="text-2xl mb-6">Application Details</h2>
            <div className="flex flex-wrap justify-between">
                {/* Personal Info Section */}
                <div className="w-full md:w-1/2 mb-4">
                    <h3 className="text-2xl mb-2 font-bold">Personal Information</h3>
                    <div className="mb-2"><strong>Name:</strong> {data.personalInfo.name}</div>
                    <div className="mb-2"><strong>Income:</strong> ₹{data.personalInfo.income}</div>
                    <div className="mb-2"><strong>Email:</strong> {data.personalInfo.email}</div>
                    <div className="mb-2"><strong>Phone:</strong> {data.personalInfo.phone}</div>
                    <div className="mb-2"><strong>Aadhar:</strong> {data.personalInfo.aadhar}</div>
                    <div className="mb-2"><strong>Pancard:</strong> {data.personalInfo.pancard}</div>
                    <div className="mb-2"><strong>Address:</strong> {data.personalInfo.address}</div>
                    <div className="mb-2"><strong>Pincode:</strong> {data.personalInfo.pincode}</div>
                </div>

                {/* Card Info Section */}
                <div className="w-full md:w-1/2 mb-4">
                    <h3 className="text-2xl mb-2 font-bold">Card Details</h3>
                    <div className="mb-2"><strong>Card Name:</strong> {data.cardId.name}</div>
                    
                    <div className="mb-2"><strong>Credit Limit:</strong> ₹{data.cardId.limit}</div>
                    <div className="mb-2"><strong>Category:</strong> {data.cardId.category}</div>
                    <div className="mb-2"><strong>Bank:</strong> {data.cardId.bank}</div>
                    {data?.cardId?.pros?.length>0&& <div className="mb-2"><strong>Pros:</strong>
                        <ul>
                            {data.cardId.pros.map((pro, index) => (
                                <li key={index}>- {pro}</li>
                            ))}
                        </ul>
                    </div>}
                    {data?.cardId?.cons?.length>0&&<div className="mb-2"><strong>Cons:</strong>
                        <ul>
                            {data.cardId.cons.map((con, index) => (
                                <li key={index}>- {con}</li>
                            ))}
                        </ul>
                    </div>}
                </div>
            </div>

            {data.status==="pending"&&<div className="flex space-x-4">
                <button 
                    onClick={handleApprove} 
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                >
                    Approve
                </button>
                <button 
                    onClick={handleReject} 
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                >
                    Reject
                </button>
            </div>}
        </div>
        </div>
    );
}

export default EditApplication;
