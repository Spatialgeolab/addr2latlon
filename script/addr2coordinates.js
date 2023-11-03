function convertNumbersToChinese(text) {
  const chineseNumbers = [
    "零",
    "一",
    "二",
    "三",
    "四",
    "五",
    "六",
    "七",
    "八",
    "九",
  ];
  let result = "";

  for (let char of text) {
    if (!isNaN(char)) {
      result += chineseNumbers[parseInt(char)];
    } else {
      result += char;
    }
  }
  return result;
}
const addr2Geo = function (SearchWord = ["台北市信義區市府路45號"]) {
  let regex = /((\S+段)|(\S+路)|(\S+巷)|(\S+弄)|(\S+街))(\d+-?\d?號)/;
  let textArea = document.getElementById("addresses");
  let resultArea = document.getElementById("result");
  resultArea.textContent = "資料載入中請稍後...";
  SearchWord = textArea.value.split("\n");
  SearchWord = SearchWord.filter((item) => item.length > 0);
  // console.log(SearchWord);
  let params = {
    addr: SearchWord,
  };
  let reuslt = [];
  //"https://106.1.189.146:80/addr2geo"
  const requests = SearchWord.map((addr) => {
    formatAddr = regex.exec(addr);
    lookupAddr = formatAddr[1] + " " + formatAddr[7];
    console.log(addr, formatAddr, lookupAddr);
    return axios
      .get(
        `http://192.168.1.249/nominatim/search/?q=${lookupAddr.replace(
          "-",
          "之"
        )}`
      )
      .then((response) => {
        let data = response.data[0];
        if (!data) {
          return `${addr}-轉換失敗\n`;
        } else {
          retunrAddr = ""
            .concat(...data["display_name"].split(",").reverse())
            .replace(/\s*/g, "");
          return `${data["lat"]},${data["lon"]},${retunrAddr}\n`;
        }
      });
  });
  Promise.all(requests)
    .then((results) => {
      resultArea.textContent = "緯度,經度,返回地址\n";
      resultArea.textContent += results.join("");
    })
    .catch((error) => {
      console.error("請求出錯", error);
    });
  creatDownloadLink(resultArea.textContent);
};
