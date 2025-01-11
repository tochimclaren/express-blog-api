import express from "express";
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import router from "./router/root";
import swaggerDocs from "./docs/index";
import { zodMiddleware } from "./middlewares/zod";


const PORT = 3000;

const app = express()
app.use(cors({
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
    console.log(`App listening on port ${PORT}`)
    swaggerDocs(app, PORT)
})