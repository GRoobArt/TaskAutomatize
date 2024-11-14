import {
  downloadProjects,
  updateDabaseProject,
} from '@/actions/automatizate/projects'
import { NextResponse, NextRequest } from 'next/server'

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const projects = await downloadProjects()
    if (!projects) throw new Error('Error Download Projects')

    return NextResponse.json({ message: 'Download Success' })
  } catch (e: Error | any) {
    console.error(`Error Projects: ${e.message}`)
    throw new Error(e.message)
  }
}

export async function PUT(request: NextRequest, response: NextResponse) {
  try {
    const projects = await updateDabaseProject()
    if (!projects) throw new Error('Error Update Projects')

    return NextResponse.json({ message: 'Update Success' })
  } catch (e: Error | any) {
    console.error(`Error Projects: ${e.message}`)
    throw new Error(e.message)
  }
}
