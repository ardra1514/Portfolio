import ParticlesBackground from '../components/ParticlesBackground'
import { hover, motion } from 'framer-motion'
import React, { useEffect, useMemo } from "react";
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import avator from "../assets/avator.png"
import resume from "../assets/Ardra_A_P.pdf"




export default function Home() {


  const socials = [
    
    { icon: FaLinkedin, label: "Linkedin", href: "https://www.linkedin.com/in/ardra-ap/" },
    { icon: FaGithub, label: "Github", href: "http://github.com/ardra1514" }
  ]

  const glowVarients = {
    initial: { scale: 1, y: 0, filter: 'drop-shadow(0 0 0 rgba(0,0,0,0))' },
    hover: {
      scale: 1.2, y: -3,
      filter: "drop-shadow(0 0 8px rgba(13,88,204,0.9)) drop-shadow(0 0 18px rgba(16,185,129,0.8))"

    },
    tap: { scale: 0.95, y: 0, transition: { duration: 0.08 } }
  }



  const roles = useMemo(() => [
    'Web developer',
    "Software Developer"
  ], [])

  const [index, setIndex] = React.useState(0)
  const [subIndex, setSubIndex] = React.useState(0)
  const [deleting, setDeleting] = React.useState(false)

  useEffect(() => {
    const current = roles[index]

    const timeout = setTimeout(() => {

      if (!deleting && subIndex < current.length) {
        setSubIndex(v => v + 1)
      }
      else if (!deleting && subIndex === current.length) {
        setTimeout(() => setDeleting(true), 1200)
      }
      else if (deleting && subIndex > 0) {
        setSubIndex(v => v - 1)
      }
      else if (deleting && subIndex === 0) {
        setDeleting(false)
        setIndex(p => (p + 1) % roles.length)
      }

    }, deleting ? 40 : 60)

    return () => clearTimeout(timeout)

  }, [subIndex, index, deleting, roles])


  return (
    <section id="home" className="w-full h-screen relative bg-black overflow-hidden">

      <ParticlesBackground />

      {/* shooting stars */}
      <div className="absolute top-[15%] left-[40%] w-1/2 h-full pointer-events-none">

        <span className="shooting-star star1"></span>
        <span className="shooting-star star2"></span>
        <span className="shooting-star star3"></span>

      </div>


      <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2">

        <div className="flex flex-col justify-start pt-45 h-full text-center lg:text-left relative">

          <div className="w-full lg:pr-24 mx-auto max-w-[48rem]">

            <motion.div
              className="mb-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-wide min-h-[1.6em]"
              initial={{ opacity: 0, y: 2 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span>
                {roles[index].substring(0, subIndex)}
              </span>
              <span className='inline-block w-[2px] ml-1 bg-white animate-pulse align-middle'></span>
            </motion.div>


            <motion.h1
              className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 
text-transparent bg-clip-text 
bg-gradient-to-r from-[#54ACBF] via-[#26658C] to-[#023859] to-[#011C40]'

              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Hello I am <br />
              <span className='text-white font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl lg:whitespace-nowrap'>
                Ardra AP
              </span>
            </motion.h1>


            <motion.p
              className='mt-6 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0'
              initial={{ opacity: 0, y: 2 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              I turn complex ideas into seamless , high impact web experienc - building modern ,scalable ,and lighting-fast application that make a difference
            </motion.p>


            <motion.div
              className='mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >

              <a href="#project"
                className='px-6 py-3 rounded-full font-medium text-white
bg-gradient-to-r from-[#54ACBF] via-[#26658C] to-[#023859] to-[#011C40]
drop-shadow-lg hover:scale-105 transition-opacity'>
                View My Work
              </a>

              <a href={resume}
                download
                className='px-6 py-3 rounded-full text-lg font-medium text-black bg-white
hover:bg-gray-200 shadow-lg hover:scale-105 transition'>
                My Resume
              </a>

            </motion.div>


            <div className='mt-10 flex gap-5 text-2xl md:text-3xl justify-center lg:justify-start'>
              {socials.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target='_blank'
                  aria-label={label}
                  rel='noopener noreferrer'
                  variants={glowVarients}
                  initial='initial'
                  whileHover='hover'
                  whileTap='tap'
                >
                  <Icon />
                </motion.a>
              ))}
            </div>

          </div>
        </div>

      </div>


      <style jsx>{`

.shooting-star{
position:absolute;
width:140px;
height:2px;
background:linear-gradient(to left, white, transparent);
opacity:0;
transform:rotate(30deg);
}

.star1{
top:20%;
left:20%;
animation:shoot1 5s linear infinite;
animation-delay:0s;
}

.star2{
top:40%;
left:35%;
animation:shoot2 6s linear infinite;
animation-delay:2s;
}

.star3{
top:10%;
left:50%;
animation:shoot3 7s linear infinite;
animation-delay:4s;
}

@keyframes shoot1{
0%{transform:translate(0,0) rotate(30deg);opacity:0;}
10%{opacity:1;}
100%{transform:translate(250px,180px) rotate(30deg);opacity:0;}
}

@keyframes shoot2{
0%{transform:translate(0,0) rotate(30deg);opacity:0;}
10%{opacity:1;}
100%{transform:translate(280px,200px) rotate(30deg);opacity:0;}
}

@keyframes shoot3{
0%{transform:translate(0,0) rotate(30deg);opacity:0;}
10%{opacity:1;}
100%{transform:translate(220px,160px) rotate(30deg);opacity:0;}
}

`}</style>

    </section>
  )
}