const axios = require("axios");
export default async (req, res) => {
 const {
  query: { name }
 } = req;
 try {
  const url = `https://api.github.com/repos/${name.join(
   "/"
  )}/contents/README.md`;
  const { data } = await axios({
   url,
   headers: {
    authorization: `token ${process.env.githubToken}`
   }
  });
  res.statusCode = 200;
  res.end(JSON.stringify(data));
 } catch (error) {
  console.log(error);
  res.statusCode = 500;
  res.end(JSON.stringify({ error }));
 }
};
