import { NextResponse, NextRequest } from 'next/server'
import {
  downloadActions,
  updateDatabaseActions,
} from '@/actions/automatizate/actions'

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const actions = await downloadActions()
    if (!actions) throw new Error('Error Download Actions')

    return NextResponse.json({ message: 'Download Actions Success' })
  } catch (e: Error | any) {
    console.error(`Error Download Actions: ${e.message}`)
    throw new Error(e.message)
  }
}

export async function PUT(request: NextRequest, response: NextResponse) {
  try {
    const actions = await updateDatabaseActions()
    if (!actions) throw new Error('Error Update Actions')

    return NextResponse.json({ message: 'Update Actions Success' })
  } catch (e: Error | any) {
    console.error(`Error Update Actions: ${e.message}`)
    throw new Error(e.message)
  }
}
