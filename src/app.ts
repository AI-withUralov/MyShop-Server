import cors from "cors"
import express from "express";
import path from "path";
import router from "./router";
import routerAdmin from "./router-admin";
import morgan from "morgan" // middleware
import cookieParser from "cookie-parser";
import  { MORGAN_FORMAT } from "./libs/config"

import session from "express-session"; /// a series of related browser requests that come from same client during certain time period
import ConnectMongoDB from "connect-mongodb-session" // session datani in a MongoDB databasega saqlaydi
import { T } from "./libs/types/common";

const MongoDBStore = ConnectMongoDB(session);
const store = new MongoDBStore({
    uri: String(process.env.MONGO_URL),
    collection: "session"
})

// 1-ENTRANCE: 
const app = express();
app.use(express.static(path.join(__dirname, "public"))); // Serve static files
app.use("/uploads", express.static("./uploads"));  // uploads folder tashqi olamga ochiq buldi
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(express.json()); // Parse JSON data
app.use(cors({credentials: true, origin: true}))
app.use(cookieParser()); 
app.use(morgan(MORGAN_FORMAT)) // requestni log qilib beradi

// 2-SESSIONS: 
app.use(
    session({
        secret: String(process.env.SESSION_SECRET),
        cookie: {
            maxAge: 1000 * 3600 *  3, /// 3 hours
        },
        store: store,
        resave: true,    // qayta request buganda cookie vaqti boshqatdan boshlanadi
        saveUninitialized: true, // 
    })
);

app.use(function (req, res, next) {
    const sessionInstance = req.session as T;
    res.locals.member = sessionInstance.member;    /// ertaga  
    next();
})


// 3-VIEWS: 
app.set("views", path.join(__dirname, "views")); // Set views folder
app.set("view engine", "ejs"); // Use EJS as template engine

// 4-ROUTERS:
app.use('/admin', routerAdmin); // SSR
app.use('/', router);  // SPA

// Export the app for use in other files
export default app;
