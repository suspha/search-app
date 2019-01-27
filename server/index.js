const mongo = require('mngo')
const Sirloin = require('sirloin')
const app = new Sirloin({ port: 4000 })
const articles = require('./data/articles.json')
const tags = require('./data/tags.json')

app.get('/search', async (req, res) => {
  const search = req.query.search.toLowerCase()
  const yeared = req.query.yeared.split(',')
  const tagged = req.query.tagged.split(',')
  let result = articles.filter(article => {
    const year = article.dateCreated.split('.').reverse()[0]
    return (
      (
        (
          article.title.toLowerCase().includes(search) ||
          article.text.toLowerCase().includes(search) ||
          article.type.toLowerCase().includes(search)
        )
        &&
        (!yeared[0] || yeared.includes(year))
      )
      &&
      !!article.tags.find(tag => !tagged[0] || tagged.includes(tag))
    )
  })

  // Shorter: if(tagged.length && tagged[0]) {
  // Alternative: if(tagged && tagged.length > 0 && tagged[0] !== '') {
  //   result = result.filter(article => !!article.tags.find(tag => tagged.includes(tag)))
  // }
  return result
})

app.get('/tags', async (req, res) => {
  return tags
})