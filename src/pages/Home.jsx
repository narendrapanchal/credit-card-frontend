import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "../components/Card";

function Home() {
  const [data, setData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading,setLoading]=useState(true);
  const category = searchParams.get("category") || "";
  const bank = searchParams.get("bank") || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_Backend_Url}/public/cards`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.log(error);
      }
      finally{
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setSearchParams({ category: selectedCategory, bank });
  };

  const handleBankChange = (e) => {
    const selectedBank = e.target.value;
    setSearchParams({ category, bank: selectedBank });
  };
  if(loading){
    return <div>Loading...</div>
  }
  return (
    <div className="container">
      <div className="flex justify-end mt-4">
        <div className="mb-4">
          <label className="block mb-2">Select Category</label>
          <select
            value={category}
            onChange={handleCategoryChange}
            required
            className="bg-gradient-to-r from-[rgb(30,41,59)] to-[rgb(75,85,99)]  w-full p-2 border border-gray-300 rounded text-white"
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
            className="text-white bg-gradient-to-r from-[rgb(30,41,59)] to-[rgb(75,85,99)]  w-full p-2 border border-gray-300 rounded"
          >
            <option value="">All</option>
            <option value="Bank of America">Bank of America</option>
            <option value="Chase">Chase</option>
            <option value="Wells Fargo">Wells Fargo</option>
            <option value="Citibank">Citibank</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
      {data
          .filter((item) => item.bank === bank || bank === "")
          .filter((item) => item.category === category || category === "")
          .length==0&&<h1 className="text-2xl font-bold text-red-500">No credit card found.</h1>}
        {data
          .filter((item) => item.bank === bank || bank === "")
          .filter((item) => item.category === category || category === "")
          .map((item,index) => (
            <Card key={item._id} {...item} index={index+1} id={item._id} />
          ))}
      </div>
    </div>
  );
}

export default Home;
