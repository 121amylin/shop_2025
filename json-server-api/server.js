const jsonServer = require("json-server");
const auth = require("json-server-auth");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const lodash = require("lodash");

const app = jsonServer.create();

// 讀取多個 JSON
const userDB = JSON.parse(
  fs.readFileSync(path.join(__dirname, "db/user.json"))
);
const orderDB = JSON.parse(
  fs.readFileSync(path.join(__dirname, "db/order.json"))
);
const productsDB = JSON.parse(
  fs.readFileSync(path.join(__dirname, "db/products.json"))
);
const newsDB = JSON.parse(
  fs.readFileSync(path.join(__dirname, "db/news.json"))
);
const contactMessagesDB = JSON.parse(
  fs.readFileSync(path.join(__dirname, "db/contactMessages.json"))
);

// 合併成一個 db
const db = lodash.merge(
  {},
  userDB,
  orderDB,
  productsDB,
  newsDB,
  contactMessagesDB
);
// const router = jsonServer.router(db);
const router = jsonServer.router(db, { foreignKeySuffix: '' })

// 設定權限規則
const rules = auth.rewriter({
  users: 600, // 需要 JWT
  orders: 644, // 公開
  products: 446, // 公開
  news: 446, // 公開
  contactMessages: 446, //訪客可 POST（送出表單）、管理員（或任何人）可 GET（查詢訊息）、禁止前台修改或刪除

  // X → Create (POST)
  // Y → Read (GET)
  // Z → Update / Delete (PUT / PATCH / DELETE)

  // 6	僅限擁有 JWT（登入的使用者）
  // 4	公開可存取（任何人都可以）
  // 2	僅限資源擁有者（自己的資料）
  // 0	不允許任何人
});

app.db = router.db;

app.use(cors());
app.use(jsonServer.bodyParser);
app.use(rules);
app.use(auth);


// 設定路由重寫器
const rewriter = jsonServer.rewriter({
  // 前台 (web)
  '/web/products*': '/products$1',
  '/web/news*': '/news$1',

  // 後台 (admin)
  '/admin/users*': '/users$1',
  '/admin/orders*': '/orders$1',
  '/admin/products*': '/products$1',
  '/admin/news*': '/news$1',
  '/admin/contactMessages*': '/contactMessages$1'
})

// 掛上路由重寫器與主路由
app.use(rewriter)
app.use(router)



app.listen(3003, () => {
  console.log("JSON Server + JWT running on http://localhost:3003");
});
