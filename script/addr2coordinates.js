// import axios from "axios";
const addr2Geo = function (SearchWord = "台北市信義區市府路45號") {
  const geoRegexp = /"lat":"(\d+\.\d+)"|"lng":"(\d+\.\d+)"/g;
  const addrRegexp =
    /baddr2":"([^"]+)","bname2":"([^"]+)","village":"([^"]+)","road":"([^"]+)"/g;
  // 为给定 ID 的 user 创建请求
  const url = "https://api.map.com.tw/net/GraphicsXY_TWMAP.aspx";
  let params = {
    search_class: "address",
    searchkey: "32FAFAA12E07573A06C6BAFFCC206D162C7C9D49",
    fun: "funA",
    SearchWord: `${SearchWord}`,
  };
  let header = {
    Referer: "https://www.map.com.tw/",
  };
  fetch(url, {
    headers: {
      Referer: "https://www.map.com.tw/",
      ...params,
    },
    method: "GET",
    redirect: "follow",
    referrer: "https://www.map.com.tw/",
    referrerPolicy: "unsafe-url",
  }).then(function (response) {
    console.log(response);
    const coordinates = [...response.data.matchAll(geoRegexp)];
    const roadName = [...response.data.matchAll(addrRegexp)];
    const addr = roadName[0].slice(1, 5).reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, "");
    console.log(
      `緯度:${coordinates[0][1]} 經度:${coordinates[1][2]} 推測地址:${addr}`
    );
  });
  // axios
  //   .get("https://api.map.com.tw/net/GraphicsXY_TWMAP.aspx", {
  //     headers: header,
  //     params: params,
  //   })
};
