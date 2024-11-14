import { NextResponse, NextRequest } from 'next/server'
import {
  downloadAreas,
  updateDatabaseAreas,
} from '@/actions/automatizate/areas'

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const areas = await downloadAreas()
    if (!areas) throw new Error('Error Download areas')

    return NextResponse.json({ message: 'Download Areas Success' })
  } catch (e: Error | any) {
    console.error(`Error Download Areas: ${e.message}`)
    throw new Error(e.message)
  }
}

export async function PUT(request: NextRequest, response: NextResponse) {
  try {
    const task = await updateDatabaseAreas()
    if (!task) throw new Error('Error Update Areas')

    return NextResponse.json({ message: 'Update Areas Success' })
  } catch (e: Error | any) {
    console.error(`Error Update Areas: ${e.message}`)
    throw new Error(e.message)
  }
}
