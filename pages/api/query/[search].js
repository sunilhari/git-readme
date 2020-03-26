const axios = require("axios");

export default async (req, res) => {
 const {
  query: { search }
 } = req;
 try {
  const url = `https://api.github.com/search/repositories?q=${search}&sort=stars&order=desc&per_page=5`;
  const options = {
   url,
   headers: {
    authorization: `token ${process.env.githubToken}`
   }
  };
  const { data } = await axios(options);
  res.statusCode = 200;
  res.end(JSON.stringify(data));
 } catch (error) {
  console.log(error, process.env.githubToken);
  res.statusCode = 500;
  res.end(JSON.stringify({ error }));
 }
};
