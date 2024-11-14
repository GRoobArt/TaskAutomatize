'use server'

import { CommentData } from '@/actions/database/comment/type'
import { CommentObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export const convertNotionByComment = async (
  data: CommentObjectResponse[]
): Promise<CommentData[]> => {
  const res = data.map((comment) => {
    const richText = comment.rich_text.find((text) => text.type === 'text')
    let user
    let text

    if (richText?.text.content.includes(':')) {
      const parts = richText?.text.content.split(':')
      user = parts[0]
      parts.shift()
      text = parts.join(':').trimStart()
    }

    return {
      text: text || (richText?.text.content as string),
      link: richText?.text.link?.url,
      notion: comment.id,
      task:
        comment.parent.type === 'page_id' ? comment.parent?.page_id : undefined,
      createdAt: new Date(comment.created_time),
      discussion: comment.discussion_id,
      user,
    }
  })

  return res
}
