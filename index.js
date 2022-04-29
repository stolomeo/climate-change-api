import express from "express";
import axios from "axios";
import cheerio from "cheerio";

const PORT = 8080;

const app = express();

const articles = [];
app.get("/", (req, res) => {
  res.json("Welcome to my Climage Change API");
});

app.get("/news", (req, res) => {
  axios
    .get("https://www.theguardian.com/environment/climate-crisis")
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      $('a:contains("climate")', html).each(function () {
        const title = $(this).text();
        const url = $(this).attr("href");
        articles.push({
          title,
          url,
        });
      });
      res.json(articles);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
