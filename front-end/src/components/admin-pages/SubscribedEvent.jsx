import React from 'react'
import {toast }from 'react-toastify'
import axios from 'axios'
import { useEffect,useState } from 'react';

function SubscribedEvent() {
    const [Event,setEvent] = useState([]);
    useEffect(() => {
      // Function to fetch Event from the API
      const fetchEvent = async () => {
        try {
          const response = await axios.get('http://localhost:4532/members/event');
          setEvent(response.data);
        } catch (error) {
          console.error("Error fetching Event:", error);
        }
      };
  
      fetchEvent();
  
    }, [Event])
  
     const handleDelete = async(id) =>{
      const response = await axios.delete(`http://localhost:4532/members/event/${id}`);
      console.log(id,'in the delete')
      if(response.status === 200){
        toast.success("Event successfully deleted!")
      }else{
        toast.error("error occurred while deleting")
  
      }
  
  
     }
  return (
    <div className="relative -mt-20 overflow-x-auto w-full h-full mb-5">
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
              Who held Event
          </th>
          <th scope="col" className="px-6 py-3">
            Date of Event
          </th>
          <th scope="col" className="px-6 py-3">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        { Event.map((event, index) => (
        
          <tr key={index} className="bg-white  dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {event.name}
            </td>
            <td className="px-6 py-4">
              {event.email}
            </td>
            <td className="px-6 py-4">
              {event.who}
            </td>
            <td className="px-6 py-4">
              {event.date} 
            </td>
            <td>
              <button
                onClick={() => handleDelete(event._id)}
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

export default SubscribedEvent