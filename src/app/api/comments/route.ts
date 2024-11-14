import { NextResponse, NextRequest } from 'next/server'

import { downloadTask, updateDatabaseTask } from '@/actions/automatizate/tasks'
import { notionGetCommentsPage, notionGetPage } from '@/actions/notion/notion'
import { convertNotionByComment } from '@/actions/notion/comment'
import { viewCommentPage } from '@/actions/automatizate/commets'
import { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const comments = await viewCommentPage(
      'a78c9f09-91d9-42ed-82ae-1032a4a94658'
    )

    if (!comments) throw new Error('No Comments')

    return NextResponse.json({
      message: `Comment Page`,
      data: comments,
    })
  } catch (e: Error | any) {
    console.error(`Error Download Task: ${e.message}`)
    return NextResponse.json({ message: e.message })
  }
}
