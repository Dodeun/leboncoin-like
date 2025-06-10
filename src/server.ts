import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import testRouter from "./routes/test.route.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/api/test", testRouter);

// middleware d'erreur par lequel on passera quand on lèvera une erreur générique :
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur, sorry" });
});

app.listen(PORT, () => {
    console.log(`Serveur launched on http://localhost:${PORT}`);
});
