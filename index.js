import express from "express";
import "dotenv/config";
import cors from "cors"
import dialogFlow from "./server/api/dialogFlow.js"


const app = express();
app.use(express.json());

app.use(
  cors({
    origin:"http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"]
  })
);

import bodyParser from "body-parser";
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.use("/api/dialogFlow", dialogFlow);

app.get("/", (request, response) => {
    return response.status(234).send("Welcome To ChatApp");
  });

app.listen(PORT, () => {
  console.log(`listening to  port ${PORT}`);
});
