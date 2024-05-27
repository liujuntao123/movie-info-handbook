import axios from "axios";
const url = "https://movie.douban.com/j/subject_suggest";

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
  const response = await axios.get(url, {
    params: {
      q: query.keyword,
    },
  });

  return response.data;
});
