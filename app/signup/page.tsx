'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import axios from 'axios'

const Signup = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [error, setError] = useState('')
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleInputChange = (event: any) => {
    const { name, value } = event.target
    return setUser((prevInfo) => ({ ...prevInfo, [name]: value }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (!user.name || !user.email || !user.password) {
        setError('Please fill all the fields')
        return
      }
      const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/
      if (!emailRegex.test(user.email)) {
        setError('Invalid email address')
        return
      }
      const res = await axios.post('/api/register', user)
      if (res.status === 200 || res.status === 201) {
        setError('')
        router.push('/')
      }
    } catch (error) {
      setError('Something went wrong')
    } finally {
      setLoading(false)
      setUser({
        name: '',
        email: '',
        password: '',
      })
    }
  }

  return (
    <div className='h-screen flex flex-col items-center justify-center bg-gray-100'>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-6 rounded-lg shadow-md w-full max-w-md'
      >
        <h1 className='text-2xl font-bold mb-4 text-center'>Sign Up</h1>
        <div className='mb-4'>
          <label className='block text-gray-700'>Fullname</label>
          <input
            type='text'
            placeholder='John Doe'
            name='name'
            value={user.name}
            onChange={handleInputChange}
            className='w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:ring-blue-300'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700'>Email</label>
          <input
            type='email'
            placeholder='example@123.com'
            name='email'
            value={user.email}
            onChange={handleInputChange}
            className='w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:ring-blue-300'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700'>Password</label>
          <input
            type='password'
            placeholder='**********'
            name='password'
            value={user.password}
            onChange={handleInputChange}
            className='w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:ring-blue-300'
          />
        </div>
        {error && <p className='text-red-500 mb-4'>{error}</p>}
        <button
          type='submit'
          className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200'
        >
          {loading ? 'Processing...' : 'Register'}
        </button>
      </form>

      <div className='mt-6'>
        <button
          onClick={() => signIn('google')}
          className='bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200'
        >
          Sign In with Google
        </button>
      </div>

      <div className='mt-4'>
        <span className='text-gray-600'>Have an account? </span>
        <a href='/' className='text-blue-500 hover:underline'>
          Login
        </a>
      </div>
    </div>
  )
}

export default Signup
