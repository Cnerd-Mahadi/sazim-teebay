import bodyParser from "body-parser";
import "dotenv/config";
import express from "express";
import { envSchema } from "./lib/zod/env";
import { router } from "./routes/index.route";

const app = express();
const port = 3000;
export const parsedENV = envSchema.parse({
	DATABASE_URL: process.env.DATABASE_URL,
	JWT_SECRET: process.env.JWT_SECRET,
});

app.use(bodyParser.json());
app.use("/api/v1", router);

app.listen(port, () => {
	console.log(`port listening at ${port}`);
});
