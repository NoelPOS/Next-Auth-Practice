'use client'

import { Mail, Lock } from 'lucide-react'
import Image from 'next/image'
import google from '../public/google2.svg'
import logo from '../public/logo.png'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [error, setError] = useState('')
  const [user, setUser] = useState({
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
      if (!user.email || !user.password) {
        setError('Please fill all the fields')
        return
      }
      const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/
      if (!emailRegex.test(user.email)) {
        setError('Invalid email')
        return
      }

      const res = await signIn('credentials', {
        email: user.email,
        password: user.password,
        redirect: false,
      })

      if (res?.error) {
        setError('Invalid credentials')
        return
      }

      setError('')
      router.push('/dashboard')
    } catch (error) {
      setError('Something went wrong')
    } finally {
      setLoading(false)
      setUser({
        email: '',
        password: '',
      })
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
        <div className='flex justify-center mb-4'>
          <Image src={logo} alt='Logo' width={100} height={100} />
        </div>
        <h2 className='text-2xl font-bold text-center mb-4'>Login</h2>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-gray-700 mb-2'>Email</label>
            <div className='flex items-center border border-gray-300 rounded px-3'>
              <Mail className='w-5 h-5 text-gray-500' />
              <input
                type='email'
                placeholder='example@123.com'
                name='email'
                value={user.email}
                onChange={handleInputChange}
                className='w-full p-2 focus:outline-none'
              />
            </div>
          </div>
          <div>
            <label className='block text-gray-700 mb-2'>Password</label>
            <div className='flex items-center border border-gray-300 rounded px-3'>
              <Lock className='w-5 h-5 text-gray-500' />
              <input
                type='password'
                placeholder='**********'
                name='password'
                value={user.password}
                onChange={handleInputChange}
                className='w-full p-2 focus:outline-none'
              />
            </div>
          </div>

          {error && <p className='text-red-500 text-sm'>{error}</p>}

          <button
            type='submit'
            className='w-full bg-blue-500 text-white py-2 rounded mt-4 hover:bg-blue-600 transition-colors duration-300'
          >
            {loading ? 'Processing...' : 'Login'}
          </button>
        </form>

        <div className='flex items-center justify-center my-4'>
          <div className='h-px w-full bg-gray-300' />
          <span className='px-2 text-gray-500'>or</span>
          <div className='h-px w-full bg-gray-300' />
        </div>

        <button
          onClick={() => signIn('google')}
          className='w-full bg-gray-100 border border-gray-300 py-2 flex justify-center items-center rounded hover:bg-gray-200 transition-colors duration-300'
        >
          <Image src={google} alt='Google' width={24} height={24} />
          <span className='ml-2'>Sign In with Google</span>
        </button>

        <div className='text-center mt-4'>
          <span className='text-gray-600'>Don't have an account?</span>
          <a href='/signup' className='text-blue-500 hover:underline ml-1'>
            Create an account
          </a>
        </div>
      </div>
    </div>
  )
}

export default Login
