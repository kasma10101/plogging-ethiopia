import React from 'react'
import { useEffect,useState } from 'react';
import axios from "axios"
import { toast } from "react-toastify";

function ShowEvent() {
  const [Event,setEvent] = useState([]);
  useEffect(() => {
    // Function to fetch Event from the API
    const fetchEvent = async () => {
      try {
        const response = await axios.get('http://localhost:4532/members/event/admin');
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching Event:", error);
      }
    };

    fetchEvent();

  }, [Event])

   const handleDelete = async(id) =>{
    const response = await axios.delete(`http://localhost:4532/members/event/admin/${id}`);
    console.log(response.status === 200,'in the delete')
    if(response.status === 200){
      toast.success("Event successfully deleted!")
    }else if(response.status === 500 || response.status === 400){
      toast.error("error occurred while deleting")

    }

   }
   const formatter = (data) =>{

const dateParts = data.split('/');
const date = new Date(dateParts[2], dateParts[0] - 1, dateParts[1]);

// Now, format it however you like
const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
return formattedDate
   }
  return (
    <div className="relative overflow-x-auto w-full h-full mb-5">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
               Event Name
              </th>
              <th scope="col" className="px-6 py-3">
               Description
              </th>
              <th scope="col" className="px-6 py-3">
                  Place
              </th>
              <th scope="col" className="px-6 py-3">
                  Date
              </th>
              <th scope="col" className="px-6 py-3">
                  Image
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            { Event.map((member, index) => (
            
              <tr key={index} className="bg-white  dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {member.name}
                </td>
                <td className="px-6 py-4">
                  {member.description}
                </td>
                <td className="px-6 py-4">
                  {member.place}
                </td>
                <td className="px-6 py-4">
                  {formatter(member.date)}
                </td>
                <td className="px-6 py-4">
                <img className='max-h-20 min-h-20 '
                src={`http://localhost:4532/${member.imageUrl}`}
                alt={"member"}
              />    
               {/* {console.log(member,'image')}             */}
               </td>
                <td>
                  <button
                    onClick={() => handleDelete(member._id)}
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

export default ShowEvent