import express from 'express';
import cors from "cors";
import userRoutes from "./routes/users.js";

const app = express();

const port = 5000;

app.use(express.json());
app.use(cors());

app.use("/", userRoutes);

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
