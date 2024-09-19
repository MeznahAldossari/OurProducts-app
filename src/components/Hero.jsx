import React from 'react'
import Lottie from 'lottie-react'
import lottieHero from '../assets/heroImage.json'

function Hero() {
  return (
    <main className='lg:py-6 flex flex-col  gap-y-8  max-sm:px-4 max-sm:py-10 py-10 px-6 max-sm:flex max-sm:gap-y-8 max-sm:flex-col max-sm:items-center lg:place-items-center lg:grid lg:px-12 lg:gap-12 lg:grid-cols-2 '>
     <section  className='flex flex-col  justify-center gap-y-7  lg:px-12'>
      <h1 className='font-bold text-primary lg:w-[30vw]  lg:text-[1.8em] max-sm:w-[85vw] max-sm:text-[1.4em] text-[1.5em]'>أفضل العروض وأجود المنتجات في مكان واحد !</h1>
      <p className='lg:text-[1.1em] max-sm:text-[1.1em] text-[1.2em]'>اكتشف أحدث وأفضل المنتجات لدينا، واحصل على تجربة تسوق فريدة ومميزة.</p>
     </section>
     
     <section className='flex justify-center '>
     <Lottie animationData={lottieHero} className='lg:w-[40vw] max-sm:w-[70vw] w-[70vw]'></Lottie>
     </section>
    </main>
  )
}

export default Hero
