'use server'

import { notion } from '@/lib/notion'
import {
  CreatePageParameters,
  QueryDatabaseParameters,
  QueryDatabaseResponse,
  UpdateDatabaseParameters,
  UpdateDatabaseResponse,
  UpdatePageParameters,
  BlockObjectRequest,
  PageObjectResponse,
  PartialPageObjectResponse,
  CommentObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'

export const notionGetDatabase = async (
  databaseId: string,
  sorts?: QueryDatabaseParameters['sorts'],
  filter?: QueryDatabaseParameters['filter']
): Promise<QueryDatabaseResponse | null> => {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts,
      filter,
    })
    return response
  } catch (error) {
    console.error(`Error querying database with ID ${databaseId}:`, error)
    return null
  }
}

export const notionUpdateDatabase = async (
  databaseId: string,
  properties: UpdateDatabaseParameters['properties'],
  title?: UpdateDatabaseParameters['title']
): Promise<UpdateDatabaseResponse | null> => {
  try {
    const response = await notion.databases.update({
      database_id: databaseId,
      properties,
      title,
    })
    return response
  } catch (error) {
    console.error(`Error updating database with ID ${databaseId}:`, error)
    return null
  }
}

export const notionCount = async (
  databaseId: string,
  filter?: QueryDatabaseParameters['filter']
): Promise<number> => {
  try {
    const response: QueryDatabaseResponse = await notion.databases.query({
      database_id: databaseId,
      filter,
    })
    return response.results.length
  } catch (error) {
    console.error(`Error querying database with ID ${databaseId}:`, error)
    return 0
  }
}

export const notionGetPage = async (pageid: string) => {
  try {
    const response = await notion.pages.retrieve({
      page_id: pageid,
    })

    return response
  } catch (e) {
    console.log(`Error GetPage: ${e}`)
    return null
  }
}

export const notionUpdatePage = async (
  pageid: string,
  properties: UpdatePageParameters['properties']
) => {
  try {
    const response = await notion.pages.update({
      page_id: pageid,
      properties,
    })

    return response
  } catch (e) {
    console.error(`Error UpdatePage: ${e}`)
    return null
  }
}

export const notionCreatePage = async (
  parent: string,
  properties: CreatePageParameters['properties'],
  children?: BlockObjectRequest[]
): Promise<PartialPageObjectResponse | PageObjectResponse | null> => {
  try {
    const response = await notion.pages.create({
      parent: { database_id: parent },
      properties: properties,
      children: children,
    })

    return response
  } catch (e) {
    console.error(`Error CreatePage: ${e}`)
    return null
  }
}

export const notionPostCommentPage = async (pageid: string, text: string) => {
  try {
    const response = await notion.comments.create({
      parent: {
        page_id: pageid,
      },
      rich_text: [
        {
          text: {
            content: text,
          },
        },
      ],
    })

    return response
  } catch (e) {
    console.error(`Error Comment: ${e}`)
    return null
  }
}

export const notionGetCommentsPage = async (pageid: string) => {
  try {
    const response = await notion.comments.list({
      block_id: pageid,
    })

    return response.results
  } catch (e) {
    console.error(`Error Find Comment: ${e}`)
    return null
  }
}
