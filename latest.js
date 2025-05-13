const fs = require("fs");
const https = require("https");

const channelId = "UC8UasQ9gkMK0wqTGkEVRblg"; // 你的頻道 ID
const apiKey = process.env.YOUTUBE_API_KEY;

const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=1&type=video`;

https.get(url, (res) => {
  let data = "";
  res.on("data", chunk => data += chunk);
  res.on("end", () => {
    const videoId = JSON.parse(data).items[0].id.videoId;
    const html = `
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>最新影片</title>
</head>
<body style="margin:0;padding:0;display:flex;justify-content:center;align-items:center;height:100vh;">
  <iframe width="830" height="467" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
</body>
</html>`;
    fs.writeFileSync("index.html", html);
  });
});
