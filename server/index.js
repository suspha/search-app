const mongo = require('mngo')
const Sirloin = require('sirloin')
const app = new Sirloin({ port: 4000 })
const data = require('./data.json')
console.log(data)

app.get('/search', async (req, res) => {
  const search = req.query.search
  console.log("searching for", search)
  const result = data.filter(x => x.title === search)
  return result
})