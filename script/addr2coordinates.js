const addr2Geo = function (SearchWord = ["台北市信義區市府路45號"]) {
  let textArea = document.getElementById("addresses");
  let resultArea = document.getElementById("result");
  resultArea.textContent='資料載入中請稍後...'
  SearchWord = textArea.value.split("\n");
  console.log(SearchWord);
  let params = {
    addr: SearchWord,
  };
  axios
    .post("http://106.1.189.146:80/addr2geo", {
      params: params,
    })
    .then((response) => {
      console.log(response.data);
      resultArea.textContent = response.data.reduce((acc, val) => {
        return acc + `${val["lat"]},${val["lon"]},${val["addr"]}\n`;
      }, "緯度,經度,推測地址\n");
      return resultArea.textContent;
    })
    .then((response) => {
      console.log(response);
      creatDownloadLink(response);
    });
};
