import express from 'express';
import cors from "cors";
import userRoute from "./routes/users.js";

const app = express();

const port = 5000;

app.use(express.json());
app.use(cors());

app.use("/", userRoute);

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
