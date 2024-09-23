import { createExpressMiddleware } from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";
import { appRouter } from "./routes/index.route";
import { createContext } from "./trpc";

const port = 3000;

const app = express();

app.use(cors());
app.use(
	"/trpc/v1/",
	createExpressMiddleware({
		router: appRouter,
		createContext,
	})
);

app.listen(port, () => {
	console.log(`listening to server at ${port}`);
});
