import { Client } from '@notionhq/client'

const notion = new Client({ auth: import.meta.env.NOTION_KEY })

export const getContent = async (block_id) =>
  await notion.blocks.children.list({ block_id })

export const getPage = async (page_id) =>
  await notion.pages.retrieve({ page_id })

export const getPages = async () =>
  (await notion.search({
    filter: {
      value: 'page',
      property: 'object'
    }
  })).results.filter(page => page.parent.type === 'workspace')
