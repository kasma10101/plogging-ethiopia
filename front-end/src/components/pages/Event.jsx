import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';

function Event() {
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

  return (
      <div  className='flex flex-col items-center justify-self-center'>
      <h1 className='font-bold text-3xl'>Events</h1>
    <div className='grid grid-cols-1 sm:grid-cols-3 items-center justify-center'>
      {Event.map((event,index)=>(
        <div data-aos="fade-up"
        data-aos-delay={`${index * 200}`} // Delay increases for each item
        className='m-5 rounded-sm  text-white bg-green-500'>
          <img className='max-w-[350px] mb-3 min-w-20'
          src={`http://localhost:4532/${event.imageUrl}`}
           alt="event" />
           <div className='p-5'>
        <h2 className='text-2xl my-3 capitalize font-semibold '>{event.name}</h2>
        <div className='flex '>
        <p className='mr-2 '><span className='font-semibold '>Place</span>:{event.place}</p>
        <div className='flex flex-grow'></div>
        <p><span className='font-semibold'>Date: </span> {event.date}</p>
        </div>
       
        <p><span className='font-semibold'>Description:</span> {event.description}</p>
        </div>
        </div>    
      ))}
    </div>
    </div>
  )
}

export default Event