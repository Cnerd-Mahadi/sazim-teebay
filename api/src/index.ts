import bodyParser from "body-parser";
import express from "express";
import { router } from "./routes/index.route";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use("", router);

app.listen(port, () => {
	console.log(`port listening at ${port}`);
});
