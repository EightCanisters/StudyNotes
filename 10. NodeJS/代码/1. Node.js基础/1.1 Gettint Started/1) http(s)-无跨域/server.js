const https = require("https");

https.get(
  "https://m.maoyan.com/ajax/moreClassicList?sortId=1&showType=3&limit=10&offset=30&optimus_uuid=A5518FF0AFEC11EAAB158D7AB0D05BBBD74C9789D9F649898982E6542C7DD479&optimus_risk_level=71&optimus_code=10",
  (res) => {
    let str = "";
    res.on("data", (chunk) => {
      str += chunk;
    });
    res.on("end", () => {
      console.log(str);
    });
  }
);
