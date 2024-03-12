import React from 'react'
import { useEffect,useState } from 'react';
import axios from "axios"

function ShowAdmin() {
  const [Admins,setAdmins] = useState([]);
  useEffect(() => {
    // Function to fetch Admins from the API
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('http://localhost:4532/members/admin');
        console.log(response.data,'response');
        setAdmins(response.data);
        // Assuming the response Admins is the array of admins
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };

    fetchAdmins();

  }, [])
  console.log(Admins,'admins')

  return (
    <div className="relative overflow-x-auto w-full h-full">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            { Admins.map((member, index) => (
            
              <tr key={index} className="bg-white  dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {member.name}
                  {console.log(member,'in the member')}
                </td>
                <td className="px-6 py-4">
                  {member.email}
                </td>
                <td className="px-6 py-4">
                  {member.role}
                </td>
                <td className="px-6 py-4">
                  {member.password}
                </td>
                <td>
                  <button
                    // onClick={() => handleDelete(member._id)}
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

export default ShowAdmin