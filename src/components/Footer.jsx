import React from 'react'
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FiFacebook } from "react-icons/fi";


function Footer() {
  return (
    <footer className='bg-[#2A629A]  h-auto justify-around flex lg:justify-between flex-col items-center text-white lg:h-auto lg:mt-14 mt-10'>
      <article className='flex flex-col py-4 gap-y-2 lg:gap-y-6 items-center lg:py-10 justify-center '>
          <h1 className='font-semibold lg:text-[1.6em] text-1.5em'>منتجاتنا</h1>
           <section className='flex gap-4 items-center'>
             <FaXTwitter color='white' size={20} className='cursor-pointer'/>
             <FaInstagram color='white' size={20} className='cursor-pointer'/>
             <FiFacebook color='white' size={20} className='cursor-pointer'/>
          
           </section>

          
           
      </article>
      <p className='text-[0.8em]'>جميع الحقوق محفوظة  <span className='px-1'>&copy;	لمزنه الدوسري</span></p>

      
    </footer>
  )
}

export default Footer
