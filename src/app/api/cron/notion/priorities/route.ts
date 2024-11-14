import { downloadPriorities } from '@/actions/automatizate/priorities'
import { NextResponse, NextRequest } from 'next/server'

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const priorities = await downloadPriorities()
    if (!priorities) throw new Error('Error Download Priorities')

    return NextResponse.json({ message: 'Download Success' })
  } catch (e: Error | any) {
    console.error(`Error Projects: ${e.message}`)
    throw new Error(e.message)
  }
}
