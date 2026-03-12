import React, { useState } from 'react'
import ParticlesBackground from '../components/ParticlesBackground'
import emailjs from "@emailjs/browser"
import { motion } from 'framer-motion'
import astra from "../assets/Astra.png"

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID
const PUBLIC_ID = import.meta.env.VITE_PUBLIC_ID

const Contact = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    budget: "",
    idea: ""
  })

  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === "budget" && value && !/^\d*$/.test(value)) return

    setFormData((prev) => ({ ...prev, [name]: value }))

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {

    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = "Fill this field"
    if (!formData.email.trim()) newErrors.email = "Fill this field"
    if (!formData.service.trim()) newErrors.service = "Fill this field"
    if (!formData.idea.trim()) newErrors.idea = "Fill this field"

    if (formData.service === "web" && !formData.budget.trim()) {
      newErrors.budget = "Fill this field"
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    if (!validateForm()) return

    setStatus("sending")

    try {

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          ...formData,
          from_name: formData.name,
          reply_to: formData.email
        },
        PUBLIC_ID
      )

      setStatus("success")

      setFormData({
        name: "",
        email: "",
        service: "",
        budget: "",
        idea: ""
      })

    } catch (err) {
      console.log(err)
      setStatus("error")
    }
  }

  return (
    <section id='contact' className='w-full min-h-screen relative bg-black text-white py-20 px-6 md:px-20 flex flex-col md:flex-row items-center gap-10'>

      <ParticlesBackground />

      <div className='relative z-10 w-full flex flex-col md:flex-row items-center gap-10'>

        {/* IMAGE */}

        <motion.div
          className='w-full md:w-1/2 flex justify-center'
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >

          <motion.img
            src={astra}
            alt=""
            className='w-72 md:w-[500px] rounded-2xl shadow-lg object-cover'
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

        </motion.div>

        {/* FORM */}

        <motion.div
          className='w-full md:w-1/2 bg-black/70 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-white/10'
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >

          <h2 className='text-3xl font-bold mb-6'>
            Let's Work Together
          </h2>

          <form className='flex flex-col gap-5' onSubmit={handleSubmit}>

            {/* NAME */}

            <div className='flex flex-col'>
              <label className='mb-1'>Your Name *</label>

              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                className={`p-3 rounded-md bg-white/10 border ${errors.name ? "border-red-500" : "border-gray-500"} text-white`}
              />

              {errors.name && <p className='text-red-500 text-sm'>{errors.name}</p>}
            </div>

            {/* EMAIL */}

            <div className='flex flex-col'>
              <label className='mb-1'>Your Email *</label>

              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                className={`p-3 rounded-md bg-white/10 border ${errors.email ? "border-red-500" : "border-gray-500"} text-white`}
              />

              {errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>}
            </div>

            {/* SERVICE */}

            <div className='flex flex-col'>
              <label className='mb-1'>Service Needed *</label>

              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className={`p-3 rounded-md bg-white/10 border ${errors.service ? "border-red-500" : "border-gray-500"} text-white`}
              >

                <option value="" disabled className='text-black'>
                  Select service
                </option>

                <option value="web" className='text-black'>
                  Web Development
                </option>

                <option value="others" className='text-black'>
                  Others
                </option>

              </select>

              {errors.service && <p className='text-red-500 text-sm'>{errors.service}</p>}
            </div>

            {/* BUDGET */}

            {formData.service === "web" && (

              <div className='flex flex-col'>
                <label className='mb-1'>Budget *</label>

                <input
                  type="text"
                  name="budget"
                  placeholder="Your budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className={`p-3 rounded-md bg-white/10 border ${errors.budget ? "border-red-500" : "border-gray-500"} text-white`}
                />

                {errors.budget && <p className='text-red-500 text-sm'>{errors.budget}</p>}
              </div>

            )}

            {/* IDEA */}

            <div className='flex flex-col'>
              <label className='mb-1'>
                Explain Your Idea *
              </label>

              <textarea
                name="idea"
                rows={5}
                placeholder="Enter your idea"
                value={formData.idea}
                onChange={handleChange}
                className={`p-3 rounded-md bg-white/10 border ${errors.idea ? "border-red-500" : "border-gray-500"} text-white`}
              ></textarea>

              {errors.idea && <p className='text-red-500 text-sm'>{errors.idea}</p>}
            </div>

            {/* BUTTON */}

            {status && (<p className={`text-sm ${status === 'success' ? "text-green-400" : status === "error" ? "text-red-400" : 'text-yellow-400'}`}>
              {status === "sending" ? "sending..." : status == "success" ? "message send successfully" : "something went wrong"}
            </p>)}

            <motion.button className='bg-blue-600 hover:bg-blue-700 diasabled:opacity-60 text-white py-3 rounded-md font-semibold transition'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={status === 'sending'}>
              Send Message
            </motion.button>

          </form>

        </motion.div>

      </div>

    </section>
  )
}

export default Contact