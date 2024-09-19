import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import axios from 'axios'
import deleteIcon from '../assets/delete.png'
import Footer from '../components/Footer'
import loaderIcon from '../assets/loader.svg'



function Cart() {
    const [cartItems, setCartItems] = useState([])
    const [changeSize, setChangeSize] = useState({})
    let getUser = localStorage.getItem("userID")
    const [total, setTotal] = useState(0)
    const [loader,setLoader] =useState(false)
    const [deleteBox, setDeleteBox] =useState("")


    useEffect(()=>{

        itemsList()
        totalPrice()

    },[])

    useEffect(()=>{

      changeQTY()

    },[changeSize,cartItems])

    const itemsList = ()=>{
      
        axios.get(`https://667b1a30bd627f0dcc91b421.mockapi.io/Users/allUsers/${getUser}`).then(response =>{
            setCartItems(response.data.cartItems)
            setLoader(true)

        })
    }


    const deleteItem = (idItem)=>{
        axios.get(`https://667b1a30bd627f0dcc91b421.mockapi.io/Users/allUsers/${getUser}`).then(response =>{
            let filterItems = response.data.cartItems.filter((item)=> item.id !== idItem)

            axios.put(`https://667b1a30bd627f0dcc91b421.mockapi.io/Users/allUsers/${getUser}`,{
                cartItems:[...filterItems]

            }).then(()=>{
                console.log(JSON.stringify(filterItems))
                setCartItems(filterItems)

            })
            

        })


    }

    const totalPrice = () =>{
        axios.get(`https://667b1a30bd627f0dcc91b421.mockapi.io/Users/allUsers/${getUser}`).then(response=>{
           
            let totalRes =  response.data.cartItems.reduce(
                (accumulator, currentValue) => {return accumulator + (currentValue.qty * currentValue.price)},0);

            setTotal(totalRes)
        })

       
    }

    const changeQTY = ()=>{

        axios.get(`https://667b1a30bd627f0dcc91b421.mockapi.io/Users/allUsers/${getUser}`).then(response=>{
           
            let totalRes =  response.data.cartItems.reduce(
                (accumulator, currentValue) => {
                    let itemqty =  parseInt(changeSize[currentValue.id]) || currentValue.qty

                    return accumulator + (itemqty * currentValue.price)},0);
           
            setTotal(totalRes)
        })
   
    }


    const deleteByID = (itemID)=>{

        setDeleteBox(itemID)
        document.getElementById('my_modal_1').showModal()
        
    
      }
    




  return (
    <>
    {loader ? (
        <main className='flex flex-col   justify-between h-screen'>
        <header>
        <Nav cartNo = {total}/>
        </header>
        
            <main className=' w-full lg:items-start items-center mt-6 flex flex-col-reverse gap-y-4  h-auto lg:gap-x-6 lg:grid lg:px-12 lg:grid-cols-3  lg:mt-6'>
                
                <section className=' max-sm:py-6 flex h-auto py-4  w-[90%] bg-[#f2f2f2] rounded-md px-2 shadow-md border-darkgray flex-col lg:py-6'>
                       <h1 className='font-bold text-[1.3em]'>تفاصيل الشراء</h1>
                        <label className="text-[1.1em] lg:mt-4 mt-4">عنوان المنزل:</label>
                        <input className='px-2 py-2  border-darkgray border-[1.2px] rounded-md mt-2' type="text" placeholder='ادخل عنوان المنزل'></input>
                        
                        <label className="text-[1.1em] lg:mt-4 mt-4" > رقم البطاقة:</label>
                        <input className='px-2 py-2  border-darkgray border-[1.2px] rounded-md mt-2' type="text" placeholder='XXXX XXXX XXXX XXXX' maxLength={16}></input>
                      
                        <section className='flex flex-col'>
                            <label className="text-[1.1em] lg:mt-4 mt-4">رمز البطاقة (CVV):</label>
                            <input className='px-2 max-sm:py-1 py-2 w-min-[14%] max-w-[14%] border-darkgray border-[1.2px] rounded-md mt-2' type="text" placeholder='XXX' maxLength={3}></input>
                            

                        </section>
                        <section className='max-sm:pb-5 pb-5 flex lg:pb-0 flex-col '>
                        <label className="text-[1.1em] lg:mt-4 mt-4">تاريخ انتهاء البطاقة:</label>
                        <section className='flex gap-x-2 mt-1 max-sm:pt-2 lg:mt-4 items-center'>
                        <input className='max-w-[12vw] min-w-[9vw] max-sm:py-1 px-2 py-2 border-darkgray border-[1.2px] rounded-md ' type='text' placeholder='00' maxLength={2}  pattern="\d{2}" 
                        ></input>
                        <input className='max-w-[15vw] min-w-[13vw] max-sm:py-1 px-2 py-2 border-darkgray border-[1.2px] rounded-md' type='text' placeholder='0000' maxLength={4} ></input>

                        </section>
                        </section>
         
                        <button className=' bg-[#FF7D29] hover:bg-[#f96d10] w-full lg:mt-6 lg:mb-1 py-2 px-4 rounded-md text-white'>اتمام عملية الشراء  </button>

                        
                </section>

            <section className='flex  lg:justify-start pb-4 items-center  max-sm:items-center flex-col lg:h-screen gap-y-2 lg:col-span-2'>
                <section className='flex  lg:w-full max-sm:w-full w-[90%]  justify-center rounded-md bg-[#fafafa] max-h-screen overflow-y-auto section-scroll '>
                {cartItems && cartItems.length >0 && (
                    <table className='table-fixed h-auto max-sm:w-[90%] w-full  border-[1.5px] shadow-lg border-gray rounded-md'>
                        <thead className='rounded-md '>
                            <tr className=' min-w-full bg-[#fce8db]'>
                                
                                <th className='border border-white  text-wrap px-4 py-2 text-center max-sm:px-0'>الصورة</th>
                                <th className='border border-white text-wrap px-4 py-2  text-center max-sm:px-0'>المنتج</th>
                                <th className='border border-white text-wrap  px-4 py-2  text-center max-sm:px-0'>المقاس</th>
                                <th className='border border-white text-wrap px-4 py-2  text-center max-sm:px-0'>السعر</th>
                                <th className='border border-white text-wrap px-4 py-2  text-center max-sm:px-0'>الكمية</th>
                                <th className='border border-white text-wrap px-4 py-2  text-center max-sm:px-0'>حذف</th>
                            
                            </tr>
                        </thead>
                        
                   <tbody>
                    {cartItems.map((item, index)=>(
                        <tr className='' key={item.id}>
                        <td className='border  flex justify-center items-center border-[#dedede]'><img className='lg:w-16 lg:h-24' src={item.image}></img></td>
                        <td className='border  text-center border-[#dedede]'>{item.name}</td>
                        {item.size ?<td className='border  text-center border-[#dedede]'>{item.size}</td>: <td className='border  text-center border-[#dedede]'>-</td>}
                        <td className='border  text-center border-[#dedede]'>{item.qty * item.price}</td>
                        <td className='border  text-center border-[#dedede]'>
                            <select key={item.id} className='border border-[#dedede] rounded-md lg:px-2' value={changeSize[item.id] || item.qty} onChange={(e)=>{setChangeSize((prev)=>({...prev, [item.id]:e.target.value}))
                           }
                        }>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </td>
                        <td className='border text-center border-[#dedede] '>
                                <button className="btn m-auto bg-white border-none" onClick={()=> deleteByID(item.id)}><img src={deleteIcon}  className='lg:w-6 w-4 cursor-pointer'></img></button> 
                                 <dialog id="my_modal_1" className="modal">
                                <div className="modal-box">
                                    
                                    <p className="py-4">هل انت متأكد من حذف المنتج ؟</p>
                                    <div className="modal-action">
                                    <form method="dialog" >
                                        <button className="btn mx-2 bg-[#FF7D29] " onClick={()=> deleteItem(deleteBox)}>نعم</button>
                                        <button className="btn">لا</button>

                                   </form>
                                    </div>
                                </div>
                                </dialog>
                        </td>
                        </tr>

                    ))}
                    </tbody>
                        

                    
                        
                    </table>
                )}
                </section>
                <section className=' w-[90%]  py-4 lg:w-full max-sm:w-[90%] max-sm:mt-2'>
                    <h1 className='lg:text-[1.1em]  font-bold text-red-500'>السعر الكلي: <span className='lg:text-[1.3] font-bold px-2 text-black'>$ {total} </span></h1>
                </section>
                </section>
               
               

            </main>
            <Footer/>
    </main>):(
        <article className='flex h-screen max-sm:items-center justify-center items-center'>

        <img src={loaderIcon} className='lg:w-[4vw] max-md:w-4 max-sm:w-6'></img>
      </ article>
    )}
    </>
    
  )
}

export default Cart
