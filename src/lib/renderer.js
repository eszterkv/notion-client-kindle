import _ from 'lodash'

export const render = (blocks) =>
  _.chain(blocks).get('results').map(toHtml).value()

export const toHtml = (block) => {
  const tag = _.get(tags, block.type, 'div')
  const richText = _.get(block, `${block.type}.rich_text`)
  if (![
    'heading_1', 'heading_2', 'heading_3',
  ].includes(block.type)) console.log(block)

  if (richText)
    return `<${tag}>${richText.map(toHtml)}</${tag}>`

  switch (block.type) {
    case 'h2':
      return _.get(block, 'text.content')
    case 'mention':
      return `<a href=${block.href}>${block.plain_text}</a>`
    case 'text':
      return block.href
        ? `<a href="${block.href}">${block.text.content}</a>`
        : block.text.content
  }

  return `<${tag}>${_.get(block, 'text.content', JSON.stringify(block))}</${tag}>`
}

const tags = {
  heading_1: 'h1',
  heading_2: 'h2',
  heading_3: 'h3',
  mention: 'a',
  paragraph: 'p',
}
