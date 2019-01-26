const mongo = require('mngo')
const Sirloin = require('sirloin')
const app = new Sirloin({ port: 4000 })
const articles = require('./data/articles.json')
const tags = require('./data/tags.json')

app.get('/search', async (req, res) => {
  const search = req.query.search.toLowerCase()
  const tagged = req.query.tagged.split(',')
  console.log("searching for", search)
  console.log("tags", tagged)
  let result = articles.filter(article => {
    return (
      (
        article.title.toLowerCase().includes(search) ||
        article.text.toLowerCase().includes(search) ||
        article.type.toLowerCase().includes(search)
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