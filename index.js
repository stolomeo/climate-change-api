import express from "express";
import axios from "axios";
import cheerio from "cheerio";

const PORT = 8080;

const app = express();

app.get("/", (req, res) => {
  res.json("Welcome to my Climage Change API");
});

app.get("/news", (req, res) => {
  axios
    .get("https://www.theguardian.com/environment/climate-crisis")
    .then((response) => {
      const html = response.data;
      console.log(html);
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
