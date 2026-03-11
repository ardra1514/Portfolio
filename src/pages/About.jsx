import { motion } from 'framer-motion'
import me from '../assets/me.jpeg'
import { div } from 'framer-motion/client'

export default function About() {


  const stats = [
    { label: "Experience", value: "0-1 year" },
    { label: "Speciality", value: "full stack" },


  ]


  return (
    <section
      id="about"
      className="min-h-screen w-full flex items-center justify-center relative bg-black text-white overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-10 lg:px-12 py-20 flex flex-col gap-12">

        <motion.div
          className='flex flex-col md:flex-row items-center md:items-stretch gap-12'
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='relative w-[160px] h-[160px] md:w-[200px] md:h-[200p] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#1cd8d2]/20 to-[#302b63]/20 border border-black/25'
            whileHover={{ scale: 1.02 }}
          >
            <img
              src={me}
              alt="About"
              className="w-64 h-64 object-cover rounded-xl"
            />
          </motion.div>
          <div className='flex flex-col  justify-center text-center md:text-left'>
            <h2 className='text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent
  bg-gradient-to-r from-[#54ACBF] via-[#26658C] to-[#023859] to-[#011C40]'>
              Ardra AP
            </h2>

            <p className='mt-2 text-lg sm:text-white/90 font-semibold'>
              Full Stack Developer
            </p>
            <p className='mt-4 text-gray-300 leading-relaxed sm:text-lg max-w-2xl md:max-w-3xl'>
              I build modern web applications with a strong focus on clean design, smooth user experience, and high performance.
            </p>
            <div className='mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xl'>
              {stats.map((item, i) => (
                <motion.div key={i} className='rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center'
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true, amount: 0.4 }}>
                  <div className='text-sm text-gray-400'>{item.label}</div>
                  <div className='text-base  font-semibold'>{item.value}</div>

                </motion.div>
              ))}
            </div>
            <div className='mt-6 ml-2 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start'>
              <a href="#projects" className='inline-flex items-center justify-center rounded-lg bg-white text-black font-semibold px-5 py-3 hover:bg-gray-200 transition'>View Project</a>
              <a href="#contact" className='inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/10  text-white font-semibold px-5 py-3 hover:bg-white/20 transition '>Get In Touch</a>
            </div>
          </div>

        </motion.div>

        <motion.div>
          <h3 className='mt-2 text-lg sm:text-white/90 font-semibold'>
            About me
          </h3>
          <p className='mt-4 text-gray-300 leading-relaxed sm:text-lg max-w-2xl md:max-w-3xl'>
            I am a Full Stack Developer specializing in MERN stack, building modern, responsive, and high-performance web applications.
            I focus on clean code, intuitive UI, and seamless user experience to create applications that are both functional and visually appealing.
          </p>
        </motion.div>


      </div>
    </section>
  )
}