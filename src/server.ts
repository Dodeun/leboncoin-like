import express, { Request, Response, NextFunction, Application } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import testRouter from "./routes/test.route.js";
import itemRouter from "./routes/item.route.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/items", itemRouter);
app.use("/api/user", userRouter);
app.use("api/user", authRouter);

// middleware d'erreur par lequel on passera quand on lèvera une erreur générique :
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: "Server error" });
});

app.listen(PORT, () => {
    console.log(`Serveur launched on port ${PORT}`);
});
