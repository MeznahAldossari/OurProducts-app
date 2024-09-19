import React, { useState } from 'react'
import logo from '../assets/onlineStore.png'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';



function SignIn() {
  const [user, setUser] = useState({
    email: '',
    password:''
  })

  const [errorText, setErrorText] = useState('')
  const navigate = useNavigate();

  const userLogin = ()=>{
    if(user.email !== '' && user.email !== undefined && user.password !== '' && user.password !== undefined){
      axios.get('https://667b1a30bd627f0dcc91b421.mockapi.io/Users/allUsers').then((response)=>{
        let checkUser = response.data.find(checkUser => (checkUser.email === user.email || checkUser.username === user.email) && checkUser.password === user.password)
        
        if(checkUser){
          localStorage.setItem("userID", checkUser.id);
          navigate('/')

        }else{
          setErrorText('اسم المستخدم او كلمة المرور غير صحيحة')
        }
      })
    
    }else{
      console.log("hello Gentales")
      setErrorText('الرجاء ملئ جميع الحقول')
    }
  }
  return (
    <section className='flex max-sm:gap-y-6 flex-col max-sm:px-4 px-4 justify-center h-screen items-center lg:px-12 '>
        <header className='w-full '>
          <Link to="/">
              <p  className=' curser-pointer text-[0.9em] py-1 rounded-md text-blue-600'> الرجوع</p>

          </Link>

        </header>
    <main className='h-full flex justify-center items-center '>
          <article className='max-sm:w-[90vw] pb-10  flex h-auto  max-sm:gap-y-1  py-10 w-[60vw]  gap-y-4 flex-col items-center lg:w-[40vw] shadow-md rounded-md border-gray border-[1.4px]'>
              <header className='py-8'>
                  <img src={logo} className='lg:w-[8vw] w-[8vw] max-sm:w-[14vw]'></img>
              </header>
              <section className='flex gap-y-1 flex-col w-[75%] lg:pb-4 '>
                <input type='text' value={user.email} onChange={(e)=>{setUser({...user, email:e.target.value}) 
                    setErrorText('')}} placeholder='اسم المستخدم او البريد الألكتروني' className='max-sm:mt-2 mt-2 border-[1.4px] px-2 border-[#cfcece] rounded-md w-full'/>
                
                <input type='password' value={user.password} onChange={(e)=>{setUser({...user, password:e.target.value})
                  setErrorText('')}} placeholder='كلمة المرور' className='max-sm:mt-1 mt-1 border-[1.4px] px-2 border-[#cfcece] rounded-md w-full'/>
                
                <p className='text-red-600 text-[0.7em]'>{errorText}</p>
                <p className='text-[0.9em] lg:mt-2 max-sm:mt-2 mt-2'>ليس لديك حساب؟<Link to='/signup'><span className='text-blue-600 text-[0.9em] px-1 hover:text-purple'>تسجيل </span></Link></p>
                <button onClick={userLogin} className='bg-primary  hover:bg-secandary  w-fit max-sm:w-fit  lg:mt-2 max-sm:mt-2 mt-2  py-1 px-4 rounded-md text-white'> تسجيل الدخول</button>
              </section>

          </article>
        </main>

</section>   
   
  )
}

export default SignIn
