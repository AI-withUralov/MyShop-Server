import cors from "cors";
import express from "express";
import path from "path";
import router from "./router";
import routerAdmin from "./router-admin";
import morgan from "morgan"; // middleware
import cookieParser from "cookie-parser";
import { MORGAN_FORMAT } from "./libs/config";
import { Server as SocketIOServer } from "socket.io";
import http from "http";

import session from "express-session"; /// a series of related browser requests that come from same client during certain time period
import ConnectMongoDB from "connect-mongodb-session"; // session datani in a MongoDB databasega saqlaydi
import { T } from "./libs/types/common";

const MongoDBStore = ConnectMongoDB(session);
const store = new MongoDBStore({
  uri: String(process.env.MONGO_URL),
  collection: "session",
});

// 1-ENTRANCE:
const app = express();
app.use(express.static(path.join(__dirname, "public"))); // public folder ichidagi static filellarni (rasm, css, js codelar) browserga ochib beradi
app.use("/uploads", express.static("./uploads")); // uploads papkasidagi statik fayllarni (rasmlar, CSS, JavaScript va boshqa fayllar) brauzer orqali ochib beradi.
app.use(express.urlencoded({ extended: true })); // Tradational API -- HTML form data bn ishlaganda qullaniladi
app.use(express.json()); // Rest API -- building an API that communicates with clients via JSON.
app.use(cors({ credentials: true, origin: true })); // Boshqa domain request kirib kelishiga ruxsat beradi
app.use(cookieParser());
app.use(morgan(MORGAN_FORMAT)); // requestni log qilib beradi

// 2-SESSIONS:
app.use(
  session({
    secret: String(process.env.SESSION_SECRET),
    cookie: {
      maxAge: 1000 * 3600 * 3, /// 3 hours
    },
    store: store,
    resave: true, // qayta request buganda cookie vaqti boshqatdan boshlanadi
    saveUninitialized: true, // As soon as a user visits your website, a session is generated and stored.
  })
);

app.use(function (req, res, next) {
  const sessionInstance = req.session as T;
  res.locals.member = sessionInstance.member; // Retrieves member from req.session - Stores it in res.locals.member, making it available throughout the request.
  next();
});

// 3-VIEWS:
app.set("views", path.join(__dirname, "views")); // Set views folder
app.set("view engine", "ejs"); // Use EJS as template engine

// 4-ROUTERS:
app.use("/admin", routerAdmin); // SSR
app.use("/", router); // SPA

const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: true,
    credentials: true,
  },
});

let summaryClient = 0;
io.on("connection", (socket) => {
  summaryClient++;
  console.log(`Connection & total [${summaryClient}]`);

  socket.on("disconnect", () => {
    summaryClient--;
    console.log(`DisConnection & total [${summaryClient}]`);
  });
});
export default server;
