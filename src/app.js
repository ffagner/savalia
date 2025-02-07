import express from "express";
import bodyParser from "body-parser";
import form from "./routes/formRoutes.js";

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", form);

export default app;