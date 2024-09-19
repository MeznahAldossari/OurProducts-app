import React, { useEffect, useState } from 'react'
import Productslist from './Productslist'

function Categories() {
    const [category, setCategory] = useState("All")
    

    const selectedCategory = (singleCategory)=>{
      setCategory(singleCategory)
    }

  return (
    <>
    <section className='flex px-4 items-center mt-6 gap-3 lg:mt-16 lg:gap-4 lg:px-12'>
        <button className={`rounded-full w-fit px-4 lg:w-[7vw] lg:py-[0.4vh] hover:bg-[#e3e3e2] shadow-sm ${category === "All"? 'bg-[#e3e3e2]': 'bg-gray'}`} onClick={()=>{selectedCategory("All")}}>الكل</button>
        <button className={`rounded-full w-fit px-4 lg:w-[7vw] lg:py-[0.4vh] hover:bg-[#e3e3e2] shadow-sm ${category === "clothes"? 'bg-[#e3e3e2]': 'bg-gray'}`} onClick={()=>{selectedCategory("clothes")}}>ملابس</button>
        <button className={`rounded-full w-fit px-4 lg:w-[7vw] lg:py-[0.4vh] hover:bg-[#e3e3e2] shadow-sm ${category === "shoes"? 'bg-[#e3e3e2]': 'bg-gray'}`}onClick={()=>{selectedCategory("shoes")}}>احذية</button>
        <button className={`rounded-full w-fit px-4 lg:w-[7vw] lg:py-[0.4vh] hover:bg-[#e3e3e2] shadow-sm ${category === "furniture"? 'bg-[#e3e3e2]': 'bg-gray'}`} onClick={()=>{selectedCategory("furniture")}}>اثاث</button>

    </section>

    <section className='lg:mt-10 '>
        <Productslist categoryValue= {category}/>
    </section>
    </>
  )
}

export default Categories
