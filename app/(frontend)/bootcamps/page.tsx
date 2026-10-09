import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import React from 'react'

const page = () => {
  return (
    <div>
      <Navbar />
      <section className="relative flex min-h-[350px] items-center overflow-hidden bg-black text-white lg:min-h-[410px]">
        <div className="absolute inset-0 z-0 flex justify-end">
          <div className="relative h-full w-full lg:w-3/5">
            {/* eslint-disable-next-line @next/next/no-img-element -- decorative full-bleed backdrop */}
            <img
              src="/rf-lab.jpg"
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover object-center brightness-90 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/55 to-transparent lg:via-black/30"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>
          </div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-container-max px-6 py-12 lg:px-12">
          <div className="max-w-2xl">
            <h1 className="mb-5 font-sans text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-[54px]">
              BootCamps
            </h1>
            <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-medium">
              Upcoming and past bootcamps — intensive short courses on
              measurement tools, antenna principles and practical RF/microwave
              engineering.
              <br />
              For information about new sessions, please follow the group&apos;s
              social channels
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default page;