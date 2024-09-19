import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import logo from '../assets/myLogo.png'
import cartLogo from '../assets/shoppingCart.png'
import menu from '../assets/menu.png'
import axios from 'axios'
import logoutIcon from '../assets/logoutIcon.png'

function Nav({cartNo}) {
  const getUser = localStorage.getItem("userID")
  const navigate = useNavigate()
  const [totals, setTotals] =useState(0)
  
  useEffect(()=>{

    getAll_products()

  }, [cartNo,getUser])

  const getAll_products = ()=>{
    axios.get(`https://667b1a30bd627f0dcc91b421.mockapi.io/Users/allUsers/${getUser}`).then(response =>{
      
      if(response.data.cartItems && response.data.cartItems.length >0){
        setTotals(response.data.cartItems.length)

      }
    })
  }

  const logoutUser = ()=>{
    localStorage.removeItem("userID")
    navigate("/")
  }
  return (
    <nav className='w-full max-sm:h-auto  h-[6vh] max-sm:px-3 px-4 lg:px-12 lg:h-16 shadow-md flex justify-between items-center'>
        <section className='md:hidden'>
          <div className="drawer drawer-end">
              <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content max-sm:py-2">
                {/* Page content here */}
                <label htmlFor="my-drawer-4" className="bg-white  w-[2vw] drawer-button h-auto  btn border-none ">
                    <img src={menu} className='max-w-[8vw] min-w-[8vw] '></img>
                </label>
              </div>
              <div className="drawer-side mt-16 z-20 ">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu pt-12 flex bg-white flex-col w-full gap-y-2 text-[1.2em] items-center  text-base-content min-h-full  p-4">
                  {/* Sidebar content here */}
                  {!getUser? (
                        <>
                        <Link to='/'>
                              <li className='cursor-pointer hover:text-primary '>الرئيسية</li>
                          </Link>
                          <Link to='/signin'>
                              <li className='cursor-pointer hover:text-primary '>تسجيل الدخول</li>
                          </Link>
                          
                          <Link to='/signup'>               
                              <li className='cursor-pointer hover:text-primary'>تسجيل جديد</li>
                          </Link>
                        </>  
                      ):(<>
                      
                      <li className='cursor-pointer hover:shadow-md'>
                          <Link to='/'>
          
                                <li className='cursor-pointer hover:text-primary'>الرئيسية</li>
                  
                          </Link>
                          
                      </li>

                      <li className=' cursor-pointer hover:shadow-md'>
                          <Link to='/cart'>
                                
                                <li className='cursor-pointer hover:text-primary'>السلة</li>
                            
                              
                          </Link>
                          
                      </li>

                      
                      <li className='cursor-pointer hover:text-primary max-sm:px-2' onClick={logoutUser}>تسجيل الخروج</li>

                    
                      </>)}
                </ul>
              </div>
            </div>
          
         

        </section>
        <ul className='flex lg:text-[1.1em] lg:gap-6 justify-center items-center max-sm:hidden max-md:hidden'>
         

          {!getUser? (
            <>
              <Link to='/signin'>
                  <li className='cursor-pointer lg:pl-0 pr-2 hover:text-primary'>تسجيل الدخول</li>
              </Link>
              <Link to='/signup'>               
                  <li className='cursor-pointer lg:px-0 px-3 hover:text-primary'>تسجيل جديد</li>
              </Link>
            </>  
          ):(<>
           <li className='cursor-pointer  pl-3 lg:pl-0 hover:text-primary max-sm:px-2' onClick={logoutUser}> <img src={logoutIcon} className='w-4 h-4 lg:w-6 lg:h-6'></img></li>
          
          <li className='relative cursor-pointer hover:shadow-md  '>
            <p className='rounded-full  absolute top-[-30%] left-[-20%] px-1 h-auto w-auto bg-red-500 text-[0.5em] text-center text-white'>{totals}</p>
            <Link to='/cart'>
                <img src={cartLogo} className='lg:h-auto max-md:w-[3vh] lg:w-[3vw] max-sm:max-h-[2.5vh]  h-[3vh] max-sm:w-[12vw]'></img>

                
            </Link>
          </li>
         

          
          </>)}
            
        </ul>
        <Link to='/'>
           <img src={logo} className=' lg:w-[4vw] max-sm:w-[8vw] max-sm:h-[5vh] w-12 h-14'></img>

        </Link>

      
    </nav>
  )
}

export default Nav
