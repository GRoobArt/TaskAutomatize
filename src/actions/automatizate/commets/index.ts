'use server'

import { notionGetCommentsPage } from '@/actions/notion/notion'
import { convertNotionByComment } from '@/actions/notion/comment'

export const viewCommentPage = async (pageid: string) => {
  try {
    const commentPage = await notionGetCommentsPage(pageid)

    if (!commentPage) throw new Error('Error notionGetCommentsPage')

    const convertComment = await convertNotionByComment(commentPage)

    return convertComment
  } catch (e: Error | any) {
    console.error(`Error viewCommentPage: ${e.message}`)
    throw new Error(e.message)
  }
}
