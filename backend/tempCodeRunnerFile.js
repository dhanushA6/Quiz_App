require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

console.log("MongoDB URI:", process.env.MONGO_URI );
// Connect to MongoDB
// mongoose
//   .connect("mongodb+srv://dhanushanandhan06:8aPZX0ACQmLkwi7U@cluster0.jnup3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.log(err));

// Define Schema and Model
const quizSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: String,
});
const Quiz = mongoose.model("Quiz", quizSchema);

// API Endpoints
app.get("/api/quiz", async (req, res) => {
  const quizzes = await Quiz.find();
  res.json(quizzes);
});

app.post("/api/quiz", async (req, res) => {
  const newQuiz = new Quiz(req.body);
  await newQuiz.save();
  res.json({ message: "Quiz added successfully!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
