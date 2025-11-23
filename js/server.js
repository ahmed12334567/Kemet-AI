import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
app.use(cors());
app.use(express.json());

// حط الـ API Key هنا
const genAI = new GoogleGenerativeAI("AIzaSyANgX2BEYslaNUr36hk25B6RJJGp49GYOY");

app.post("/ask", async (req, res) => {
  const { message } = req.body;

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent(message);

    res.json({
      reply: result.response.text(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error generating response" });
  }
});

app.listen(4000, () => {
  console.log("Server running on 4000...");
});
