import "dotenv/config";
import cors from 'cors';
import express from "express";
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import router from "./router/root";
import swaggerDocs from "./docs/index";
import { zodMiddleware } from "./middlewares/zod";
import { PORT, NODE_ENV, APP_ORIGIN } from "./constants/env";


const app = express()
app.use(cors({
    origin: APP_ORIGIN,
    credentials: true,
}))
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const dbURL = 'mongodb://localhost:27017/blogDB';

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(dbURL);
}

app.use("/", router)
app.use(zodMiddleware)

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT} in ${NODE_ENV} mode`)
    swaggerDocs(app, parseInt(PORT))
})