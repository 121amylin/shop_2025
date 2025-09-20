const jsonServer = require('json-server')
const auth = require('json-server-auth')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const lodash = require('lodash')

const app = jsonServer.create()

// 讀取多個 JSON
const userDB = JSON.parse(fs.readFileSync(path.join(__dirname, 'db/user.json')))
const orderDB = JSON.parse(fs.readFileSync(path.join(__dirname, 'db/order.json')))
const productsDB = JSON.parse(fs.readFileSync(path.join(__dirname, 'db/products.json')))
const newsDB = JSON.parse(fs.readFileSync(path.join(__dirname, 'db/news.json')))

// 合併成一個 db
const db = lodash.merge({}, userDB, orderDB, productsDB, newsDB)
const router = jsonServer.router(db)

// 設定權限規則
const rules = auth.rewriter({
  users: 600,       // 需要 JWT
  orders: 644,      // 公開
  products: 644,    // 公開
  news: 644         // 公開
})

app.db = router.db

app.use(cors())
app.use(jsonServer.bodyParser)
app.use(rules)
app.use(auth)
app.use(router)

app.listen(3003, () => {
  console.log('JSON Server + JWT running on http://localhost:3003')
})
