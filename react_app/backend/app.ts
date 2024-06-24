// Filename - demoapp/app.js
import express from 'express';
import cors from 'cors';
const app = express();
import cookieParser from "cookie-parser";

// passport configuration
import passport from "passport";
// import { passportConfig } from "./middleware/authMiddleware";
// passportConfig(passport);

import db from "./models/index";
db.sequelize.sync();

// db.sequelize.sync({ force: true }).then(() => {

// console.log("Drop and re-sync db.");

// });

// middleware
app.use(passport.initialize());
app.use(cors({ origin: "http://192.168.10.75:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


import router from "./routes/router";
app.use("/", router);

app.listen(3030, () => {
	console.log(`Server started on port 3030`)
}
);
