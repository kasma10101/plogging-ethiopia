import React from 'react'
import Navbar from '../commons/navbar'
import Footer from '../commons/footer'
import { useLocation } from 'react-router-dom'

function BlogDetail() {
    const location = useLocation();
    const {content,image,title} = location.state || ''
  return (
    <div>
        <Navbar />
        <div className='flex flex-col justify-center items-center'>
        <img className="w-full max-w-[500px] max-h-[200px]" src={`http://localhost:4532/${image}`} alt={"blog"} />
           <h1 className='my-10 font-bold text-3xl'>{title}</h1>
           <p className='text-xl text-black mb-4'>{content}</p>
        </div>
        <Footer />
    </div>
  )
}

export default BlogDetail