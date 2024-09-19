import React, { useState } from 'react'
import logo from '../assets/myLogo.png'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Signup() {
  const [user, setUser] = useState({
    userName: '',
    email: '',
    password:''
  })

  const [errorText, setErrorText] = useState({
    userName_Error: '',
    email_Error: '',
    password_Error: '',
    all_fields:''
  })
  const navigate = useNavigate();


  const newUser = ()=>{
    let errors = {
      userName_Error: '',
      email_Error: '',
      password_Error: '',
      all_fields:''
    }

    if(user.userName !== '' && user.userName !== undefined && user.email !== '' && user.email !== undefined && user.password !== '' && user.password !== undefined){
      
      let usernameTest =/^(.*[a-zA-Z].*){5,}$/
      let emailTest =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      let passwordTest =/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/
      
      if(!usernameTest.test(user.userName)){
        errors.userName_Error = 'يجب ان يحتوي اسم المستخدم على خمس حروف على الأقل'

      }
      if(!emailTest.test(user.email)){
        errors.email_Error = 'الرجاء ادخال بريد الكتروني صحيح'
        
      }
      if(!passwordTest.test(user.password)){
        errors.password_Error = 'يجب ان تحتوي كلمة المرور على ثمان خانات على الاقل ويجب ان تحتوي على حرف صغير وحرف كبير ورقم واحد على الأقل'
        
      }
      if(usernameTest.test(user.userName) && emailTest.test(user.email) && passwordTest.test(user.password)){
        axios.get('https://667b1a30bd627f0dcc91b421.mockapi.io/Users/allUsers').then((response)=>{
          let findUserName = response.data.find((singleUser)=> singleUser.username === user.userName)
          let findEmail = response.data.find((singleUser)=> singleUser.email === user.email)

          if(!findUserName && !findEmail){
            axios.post('https://667b1a30bd627f0dcc91b421.mockapi.io/Users/allUsers',
            {
              username:user.userName,
              email:user.email,
              password:user.password

            }).then((res)=>{
              toast.success(
              <p>
                تم انشاء الحساب بنجاح. يمكنك تسجيل الدخول من <Link to='/signin' className='text-blue-500'>هنا</Link>
                
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

            
              
            })
          }

        })
      }
      
    
    }
    else{
      errors.all_fields = 'يجب ملئ جميع الحقول'
    }
    console.log(errors)
    setErrorText(errors)
  }

  return (
    <main className='flex max-sm:gap-y-6 flex-col lg:gap-y-3 h-screen lg:h-screen items-center max-sm:px-4 px-4 lg:px-12 '>
      <header className='w-full '>
        <Link to="/">
            <p  className=' curser-pointer text-[0.9em] py-1 rounded-md text-blue-600'> الرجوع</p>

        </Link>

      </header>
  <main className='h-full flex justify-center items-center '>
    <ToastContainer className="max-sm:w-[60vw]"/>
    <article className='max-sm:w-[90vw] pb-10 flex h-auto  max-sm:gap-y-1  lg:gap-y-2 lg:py-5 py-10 flex-col items-center w-[60vw] lg:w-[40vw] shadow-md rounded-md border-gray border-[1.4px]'>
        <header className='py-8'>
            <img src={logo} className='lg:w-[8vw] w-[8vw] max-sm:w-[14vw]'></img>
        </header>
        <section className='flex  flex-col w-[75%] lg:pb-1 '>
          <section className='flex flex-col mt-2 lg:mt-2 max-sm:mt-2'>
          <input type='text' value={user.userName} onChange={(e)=>{setUser({...user, userName:e.target.value})
          setErrorText({
            userName_Error: '',
            email_Error: '',
            password_Error: '',
            all_fields:''
          })}} placeholder='اسم السمتخدم' className=' border-[1.4px]  px-2 border-[#cfcece] rounded-md w-full'/>
           <p className='text-red-600 text-[0.6em]'>{errorText.userName_Error}</p>

          </section>

          <section className='flex mt-2  flex-col lg:mt-2 max-sm:mt-2 '>
              <input type='email' value={user.email} onChange={(e)=>{setUser({...user, email:e.target.value}) 
              setErrorText({
                userName_Error: '',
                email_Error: '',
                password_Error: '',
                all_fields:''
              })}} placeholder='البريد الألكتروني' className=' border-[1.4px] px-2 border-[#cfcece] rounded-md w-full'/>
              <p className='text-red-600 text-[0.6em]'>{errorText.email_Error}</p>

          </section>
          <section className='flex mt-2  flex-col lg:mt-2 max-sm:mt-2'>
            <input type='password' value={user.password} onChange={(e)=>{setUser({...user, password:e.target.value})
            setErrorText({
              userName_Error: '',
              email_Error: '',
              password_Error: '',
              all_fields:''
            })}} placeholder='كلمة المرور' className=' border-[1.4px] px-2 border-[#cfcece] rounded-md w-full'/>
            <p className='text-red-600 text-[0.6em]'>{errorText.password_Error}</p>
            <p className='text-red-600 text-[0.6em]'>{errorText.all_fields}</p>

          </section>
          <section className='lg:mt-4 mt-5  lg:gap-y-6 gap-y-4 max-sm:gap-y-4 flex flex-col max-sm:mt-5'>
            <p className='text-[0.9em]'>هل لديك حساب بالفعل؟ <Link to='/signin'><span className='text-blue-600 text-[0.9em] px-1 hover:text-purple'>تسجيل الدخول</span></Link></p>
               <button onClick={newUser} className='bg-primary  hover:bg-secandary w-[12vw] max-sm:w-[22vw] py-1 px-4 rounded-md text-white'> تسجيل</button>

          </section>
           

        </section>

    </article>
    </main>

</main>  
  )
}

export default Signup
