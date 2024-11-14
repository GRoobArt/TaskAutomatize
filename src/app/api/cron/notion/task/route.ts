import { NextResponse, NextRequest } from 'next/server'
import { downloadTask, updateDatabaseTask } from '@/actions/automatizate/tasks'

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const task = await downloadTask()
    if (!task) throw new Error('Error Download Task')

    return NextResponse.json({ message: 'Download Task Success' })
  } catch (e: Error | any) {
    console.error(`Error Download Task: ${e.message}`)
    throw new Error(e.message)
  }
}

export async function PUT(request: NextRequest, response: NextResponse) {
  try {
    const task = await updateDatabaseTask()
    if (!task) throw new Error('Error Update Task')

    return NextResponse.json({ message: 'Update Task Success', data: task })
  } catch (e: Error | any) {
    console.error(`Error Update Task: ${e.message}`)
    throw new Error(e.message)
  }
}
