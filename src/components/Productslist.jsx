import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";


function Productslist({categoryValue}) {
    const [products, setProducts] = useState([])


    useEffect(()=>{
        getProducts()

    }, [categoryValue])

    const getProducts = ()=>{
        axios.get('https://665736969f970b3b36c8658a.mockapi.io/form').then(response =>{
           let getData = response.data
           
           if(categoryValue && categoryValue === 'All'){

            setProducts(getData)
           }
           else if (categoryValue && categoryValue === 'clothes'){
                let getClothes = getData.filter((item)=> item.category.name === "clothes")
                setProducts(getClothes)
              
           }
           else if (categoryValue && categoryValue === 'shoes'){
                let getShoes = getData.filter((item)=> item.category.name === "shoes")
                setProducts(getShoes)
               

           }else if (categoryValue && categoryValue === 'furniture') {
                let getFurniture = getData.filter((item)=> item.category.name === "furniture")
                setProducts(getFurniture)
                

           }
           
        })
    }


  return (
    <section className='lg:grid py-6  max-sm:grid-cols-2 grid-cols-2 grid max-sm:grid gap-3  px-4 lg:mt-0 mt-7 lg:grid-cols-4 lg:px-12 lg:place-content-center  lg:gap-6 lg:gap-y-8'>
     {products &&(
        products.map((item,index)=>(
            <article className='flex flex-col max-sm:mt-6 border-gray rounded-md shadow-md' key={index}>
                <img src={item.images[0]} className='lg:h-[35vh] h-[25vh] w-full rounded-t-md'></img>
                <section className='w-full py-5 mt-4 lg:mt-0 px-4 lg:px-4 lg:py-1'>
                    <section className='flex justify-between items-center'>
                    <p>{item.price}$</p>
                    <p className='text-[1.2em] text-wrap text-left'>{item.title}</p>
                   
                  </section >
                    <Link to={`product/${item.id}`}>
                        <button className='bg-primary hover:bg-secandary w-fit mt-6 max-sm:text-[0.9em] lg:mt-6 lg:mb-3 py-1 px-4 rounded-md text-white'>تفاصيل المنتج</button>
                    </Link>

                </section>
                
           
            </article>
        ))
     )}
    </section>
  )
}

export default Productslist
