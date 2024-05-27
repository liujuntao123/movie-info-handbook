import axios from "axios";
import cheerio from "cheerio";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const url = `https://movie.douban.com/subject/${query.id}/`;

  const response = await axios.get(url);

  // 加载网页内容到cheerio
  const $ = cheerio.load(response.data);

  // 提取电影信息
  getMovieInfo($, result);

  // 提取电影评分
  getMovieScore($, result);

  return result;
});

const result = {
  title: "",
  info: {
    director: "",
    screenwriter: "",
    actors: [],
    genres: [],
    country: [],
    language: [],
    releaseDates: [],
    runtime: "",
    aliases: [],
    imdb: "",
    img: "",
  },
  score: {
    rating: "",
    votes: "",
    ratings: [],
    betterThan: [],
  },
};

function getMovieInfo($, result) {
  const title = $("#content > h1").text().trim();
  result.title = title;

  const img = $("#mainpic > a > img").attr("src");
  result.info.img = img;

  const content = $("#info").text().trim();
  const contentArr = content
    .split("\n")
    .filter((item) => item.trim() !== "" && item.trim() !== "'")
    .filter((item) => !item.includes("官方网站"));
  console.log("contentArr:", contentArr);

  // 提取导演
  const director = contentArr[0].trim().split(": ")[1];
  console.log("director:", director);
  result.info.director = director;

  // 提取编剧
  const screenwriter = contentArr[1].trim().split(": ")[1];
  console.log("screenwriter:", screenwriter);
  result.info.screenwriter = screenwriter;

  // 提取演员
  const actors = contentArr[2].trim().split(": ")[1].split(" / ");
  console.log("actors:", actors);
  result.info.actors = actors;

  // 提取类型
  const genres = contentArr[3].trim().split(": ")[1].split(" / ");
  console.log("genres:", genres);
  result.info.genres = genres;

  // 提取制片国家/地区
  const country = contentArr[4].trim().split(": ")[1].split(" / ");
  console.log("country:", country);
  result.info.country = country;

  // 提取语言
  const language = contentArr[5].trim().split(": ")[1].split(" / ");
  console.log("language:", language);
  result.info.language = language;

  // 提取上映日期
  const releaseDates = contentArr[6].trim().split(": ")[1].split(" / ");
  console.log("releaseDates:", releaseDates);
  result.info.releaseDates = releaseDates;

  // 提取片长
  const runtime = contentArr[7].trim().split(": ")[1];
  console.log("runtime:", runtime);
  result.info.runtime = runtime;

  // 提取又名
  const aliases = contentArr[8].trim().split(": ")[1].split(" / ");
  console.log("aliases:", aliases);
  result.info.aliases = aliases;

  // 提取IMDb链接
  const imdb = contentArr[9].trim().split(": ")[1];
  console.log("imdb:", imdb);
  result.info.imdb = imdb;
}

function getMovieScore($, result) {
  // 提取评分
  const rating = $(".rating_num").text();
  result.score.rating = rating;

  // 提取评价人数
  const votes = $(".rating_people span").text();
  result.score.votes = votes;

  // 提取每个星级的比例
  const ratings = [];
  $(".ratings-on-weight .item").each((index, element) => {
    const star = $(element).find('span[class^="stars"]').text().trim();
    const percentage = $(element).find(".rating_per").text().trim();
    ratings.push({ star, percentage });
  });
  result.score.ratings = ratings;

  // 提取比其他类型的好评信息
  const betterThan = [];
  $(".rating_betterthan a").each((index, element) => {
    const text = $(element).text().trim();
    // console.log("text:", text);
    const [percentage, type] = text.split(" ");
    betterThan.push({ percentage, type });
  });

  result.score.betterThan = betterThan;
}
