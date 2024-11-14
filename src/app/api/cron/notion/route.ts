import { NextResponse, NextRequest } from 'next/server'
import {
  downloadActions,
  updateDatabaseActions,
} from '@/actions/automatizate/actions'
import {
  downloadAreas,
  updateDatabaseAreas,
} from '@/actions/automatizate/areas'
import { downloadPriorities } from '@/actions/automatizate/priorities'
import {
  downloadProjects,
  updateDabaseProject,
} from '@/actions/automatizate/projects'

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const action = await downloadActions()
    if (!action) throw new Error('Error Download Actions')

    const areas = await downloadAreas()
    if (!areas) throw new Error('Error Download Areas')

    const priorities = await downloadPriorities()
    if (!priorities) throw new Error('Error Download Priorities')

    const projects = await downloadProjects()
    if (!projects) throw new Error('Error Download Projects')

    return NextResponse.json({ message: 'Download Success' })
  } catch (e: Error | any) {
    console.error(`Error Download: ${e.message}`)
    throw new Error(e.message)
  }
}

export async function PUT(request: NextRequest, response: NextResponse) {
  try {
    const action = await updateDatabaseActions()
    if (!action) throw new Error('Error Update Actions')

    const areas = await updateDatabaseAreas()
    if (!areas) throw new Error('Error Update Areas')

    const projects = await updateDabaseProject()
    if (!projects) throw new Error('Error Update Projects')

    return NextResponse.json({ message: 'Update Success' })
  } catch (e: Error | any) {
    console.error(`Error Update: ${e.message}`)
    throw new Error(e.message)
  }
}
