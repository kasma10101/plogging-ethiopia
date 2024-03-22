import React, { useState } from 'react'
import {toast} from "react-toastify";
import axios  from 'axios'

function ForgotPassword() {
  const[emailData,setEmailData] = useState({
    email:''
  })

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmailData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }
  const handleSubmit = async(e)=>{
    e.preventDefault()
    if (emailData === ""){
      toast.error("Please fill the email field")
      return
    } else {
      console.log('inseide  ')
      const res = await axios.post("http://localhost:4532/blogs/reset",emailData);
      console.log(res.status)
      setEmailData({email:""})
      if(res.status ===200){
        console.log(res.data.id,'id nw')
        localStorage.setItem('id',res.data.id)
        toast.success("Verification link sent through your email ")   
         }
      console.log(res,'resss')
      if(res.status === 400 || res.status === 404){
        console.log('404',res.status)
        toast.error("Error occurred",res.response.statusText)
        console.log(res.response.statusText)
      }
     
    }

  }
  return (
    <div>
        <main id="content" role="main" className="w-full mx-auto p-6">
      <div
        className="mt-7 bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-indigo-300"
      >
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Forgot password?
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Remember your password?
              <a
                className="text-blue-600 decoration-2 hover:underline font-medium"
                href="/login"
              >
                Login here
              </a>
            </p>
          </div>
         
          <div className="mt-5">
            <form action="/forgot-password" method="post" onSubmit={handleSubmit}>
              <div className="grid gap-y-4">
                <div>
                  <label
                    for="email"
                    className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                    >Email address</label
                  >
                  <div className="relative">
                    <input
                    onChange={handleChange}
                      value={emailData.email}
                      type="email"
                      id="email"
                      name="email"
                      className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                      required
                      aria-describedby="email-error"
                    />
                  </div>
                  <p className="hidden text-xs text-red-600 mt-2" id="email-error">
                    Please include a valid email address so we can get back to
                    you
                  </p>
                </div>
                <button
                  type="submit"
                  className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-green-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                >
                  Reset password
                </button>
                
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
    </div>
  )
}

export default ForgotPassword