import React from 'react'
import { useEffect,useState } from 'react';
import axios from "axios"
import { toast } from "react-toastify";

function ShowSub() {
  const [Subscribers,setSubscribers] = useState([]);
  useEffect(() => {
    // Function to fetch Subscribers from the API
    const fetchSubscribers = async () => {
      try {
        const response = await axios.get('http://localhost:4532/members/sub');
        setSubscribers(response.data);
      } catch (error) {
        console.error("Error fetching Subscribers:", error);
      }
    };

    fetchSubscribers();

  }, [Subscribers])

   const handleDelete = async(id) =>{
    const response = await axios.delete(`http://localhost:4532/members/sub/${id}`);
    if(response.status === 200){
      toast.success("Admin successfully deleted!")
    }else{
      toast.error("error occurred while deleting")

    }


   }
  return (
    <div className="relative  overflow-x-auto w-full h-full mb-5 flex justify-center">
    <table className="w-1/2 items-center justify-center text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Email
          </th>
          <th scope="col" className="px-6 py-3">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {Subscribers.map((sub, index) => (
          <tr key={index} className="bg-white dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-4">
              {sub.email}
            </td>
            <td>
              <button
                onClick={() => handleDelete(sub._id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
</div>

  )
}

export default ShowSub