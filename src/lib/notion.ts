import { Client } from '@notionhq/client'

declare global {
  var notion: Client | undefined
}

const notion = global.notion || new Client({ auth: process.env.NOTION_KEY })

if (process.env.NODE_ENV === 'development') global.notion = notion

export { notion }
