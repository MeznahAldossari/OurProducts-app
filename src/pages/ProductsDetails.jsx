import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/Footer'
import { Link, useNavigate } from "react-router-dom";
import loaderIcon from '../assets/loader.svg'



function ProductsDetails() {
    const {id} = useParams()
    const [product, setProduct] = useState({})
    const [qty, setQty] = useState(1)
    const [sizes, setSizes] = useState("")
    const [userText, setuserText] = useState("")
    const [total, setTotal] = useState(0)
    const [loader,setLoader] =useState(false)
   
    

    useEffect(()=>{
        getProduct_details()

    },[qty])

    const getProduct_details = ()=>{
        
       axios.get(`https://665736969f970b3b36c8658a.mockapi.io/form/${id}`).then(response =>{
            setProduct(response.data)
            setLoader(true)
        })
        
    }

    const addItem = ()=>{
        let getUser = localStorage.getItem("userID")
       
        if(getUser){
            

            let cartItems = []
            
            axios.get(`https://667b1a30bd627f0dcc91b421.mockapi.io/Users/allUsers/${getUser}`).then(response =>{
                cartItems = response.data.cartItems || []
                

                if(cartItems.length > 0){
                    let checkDuplication = product.category.name === "clothes" || product.category.name === "shoes" ? cartItems.find((item)=> item.name === product.title && item.size === sizes ): cartItems.find((item)=> item.name === product.title)
                    
                    if(!checkDuplication){
                        if((product.category.name === "clothes" || product.category.name === "shoes") && sizes !==""){
                            cartItems.push({
                                "id": String(cartItems.length + 1),
                                "image":product.images,
                                "name":product.title,
                                "price": product.price * parseInt(qty),
                                "qty": parseInt(qty),
                                "size": sizes
    
                            })
                        }else if (product.category.name === "furniture"){
                            cartItems.push({
                                "id": String(cartItems.length + 1),
                                "image":product.images,
                                "name":product.title,
                                "price": product.price * parseInt(qty),
                                "qty": parseInt(qty),
    
                            })

                        }else{
                            setuserText("الرجاء اختيار المقاس")
                            return
                        }
                      
                        axios.put(`https://667b1a30bd627f0dcc91b421.mockapi.io/Users/allUsers/${getUser}`,{
                            cartItems: [...cartItems]
                        }).then(res =>{
                            setTotal(total+1)
                            toast.success('تم اضافة المنتج !', {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light"
                                });
                        })

                    }
                    else{
                        toast.error('المنتج مضاف سابقا!', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light"
                            });
                    }
         

                }else{
                    if((product.category.name === "clothes" || product.category.name === "shoes") && sizes !==""){
                        
                        cartItems.push({
                            "id": String(cartItems.length + 1),
                            "image":product.images,
                            "name":product.title,
                            "price": product.price * parseInt(qty),
                            "qty": parseInt(qty),
                            "size": sizes

                        })
                    }else if (product.category.name === "furniture"){
                        cartItems.push({
                            "id": String(cartItems.length + 1),
                            "image":product.images,
                            "name":product.title,
                            "price": product.price * parseInt(qty),
                            "qty": parseInt(qty),
                            

                        })

                    }

                    if(cartItems.length === 0){
                        setuserText("الرجاء اختيار المقاس")
                        return
                    }

                    axios.put(`https://667b1a30bd627f0dcc91b421.mockapi.io/Users/allUsers/${getUser}`,{
                        cartItems: [...cartItems]
                    }).then(res =>{
                        toast.success('تم اضافة المنتج !', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light"
                            });
                        setTotal(total+1)
                    })

                }
                
                
            })

        }
        
        else{
            toast.warn(
                <p>
                  يجب تسجيل الدخول من <Link to='/signin' className='text-blue-500'>هنا</Link> لأستكمال عملية الطلب
                  
                </p>
                , {
                  position: "top-right",
                  autoClose: 8000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light"
                  });
        }
    }

  return (
   <>
    
    
    {loader ? (
        <main className='flex flex-col   justify-between h-screen'>
        <header>
        <Nav cartNo = {total}/>
        </header>
            <article className='flex items-center lg:my-6   lg:h-auto  h-auto max-sm:px-0 max-sm:my-6 py-1 max-sm:items-center max-sm:flex-col-reverse gap-4 w-full justify-center px-4 lg:px-12 lg:py-2 '>
            <ToastContainer className="max-sm:w-[60vw]"/>
                <section className='flex px-6 h-fit py-12 lg:py-4 lg:px-6 max-sm:py-8 max-sm:w-[90%]  rounded-md justify-center w-[50vw]  lg:w-[50vw] bg-[#F5F7F8] flex-col gap-y-1'>
                    <h2 className='lg:text-[2em] max-sm:text-[1.4em] font-bold'>{product.title}</h2>
                    <p className='text-justify items-end'>{product.description}</p>
                    
                    <section className='flex flex-wrap gap-4 lg:mt-8 mt-4'>                   
                        
                        {product.category && product.category.name && product.category.name === "clothes"?(
                            <>
                                <p className='lg:text-[1.2em] font-bold'>المقاس:</p>
                                <select className='border-darkgray rounded-md border-[1.5px]  lg:mb-3 px-2' value={sizes} onChange={(e)=>{setSizes(e.target.value) 
                                    setuserText("")
                                }}>
                                    <option value="">اختار المقاس</option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                </select>
                            </>
                            
                            

                        ): product.category && product.category.name && product.category.name  === "shoes"? (
                            <>
                                <p className='lg:text-[1.2em] font-bold'>المقاس:</p>

                                <select className='border-darkgray rounded-md border-[1.5px]  lg:mb-3 px-2' value={sizes} onChange={(e)=>{setSizes(e.target.value) 
                                    setuserText("")
                                }}>
                                    <option value="">اختار المقاس</option>
                                    <option value="34">34</option>
                                    <option value="36">36</option>
                                    <option value="38">38</option>
                                    <option value="40">40</option>
                                </select>
                            </>
                            
                        ):(
                            <></>
                        )}
                        
                        <section className='flex lg:px-8 gap-4 '>
                            <p className='lg:text-[1.2em] font-bold'>السعر:</p>
                            <p className='lg:text-[1.3em] text-[#F5004F]'>{product.price * qty}$</p>

                        </section>
                        

                    </section>
                    <section className='mt-2'>
                        <p className='text-[0.9em] text-red-600'>{userText}</p>
                    </section>
                    <section className='flex items-center max-sm:mt-4 gap-4'>
                        <button onClick={()=> addItem(product.id)} className='bg-[#FF7D29] hover:bg-[#f96d10] lg:text-[1.1em] lg:w-[14vw] lg:mt-6 lg:mb-3 py-2 px-6 rounded-md text-white'>اضافة المنتج</button>
                        <select className='border-darkgray rounded-md border-[1.5px] lg:mt-6 lg:mb-3 py-1 px-2' value={qty} onChange={(e)=>setQty(e.target.value)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </section>
                </section>


                <section className='max-sm:flex max-sm:justify-center rounded-md'>
                    <img src={product.images} className='rounded-md h-auto lg:w-[35vw] max-sm:w-[90%] max-sm:h-[30vh]'></img>
                </section>


            </article>

        <Footer/>
            
        </main>
    ):
    <article className='flex h-screen max-sm:items-center justify-center items-center'>

        <img src={loaderIcon} className='lg:w-[4vw] max-md:w-4 max-sm:w-6'></img>
      </ article>}
    
   </> 
  )
}

export default ProductsDetails
