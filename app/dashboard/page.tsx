'use client'

import { signOut, useSession } from 'next-auth/react'
import React from 'react'

const Dashboard = () => {
  const { data: session } = useSession()

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='w-full max-w-xl bg-white rounded-lg shadow-lg p-10 text-center'>
        <h1 className='text-3xl font-semibold text-blue-500 mb-6'>
          Welcome to the Dashboard
        </h1>
        {session && (
          <p className='text-xl font-medium text-gray-700 mb-10'>
            {session.user?.name}
          </p>
        )}

        <button
          onClick={() => signOut()}
          className='bg-blue-500 text-white rounded px-6 py-2 text-lg hover:bg-blue-600 transition-colors duration-300'
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Dashboard
