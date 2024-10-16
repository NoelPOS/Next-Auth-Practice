import { connect } from '@/utils/db/dbconnect'
import User from '@/utils/models/User'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { NextResponse, NextRequest } from 'next/server'

connect()

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    const user = await User.findOne({
      email,
    })

    if (!user) {
      return NextResponse.json({
        message: 'User doesn not exist',
        success: false,
      })
    }

    const isCorrect = await bcryptjs.compare(password, user.password)

    if (!isCorrect) {
      return NextResponse.json({
        message: 'Invalid credentials',
        success: false,
      })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: '1d',
    })

    return NextResponse.json({
      message: 'User logged in successfully',
      success: true,
      user: user,
      token: token,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
