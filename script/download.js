const creatDownloadLink = function (data) {
  let downloadBtn = document.getElementById("downloadLink");
  //創造下載檔案
  const blob = new Blob([data], { type: "text/csv" });

  //下載連結和屬性
  console.log(downloadBtn);
  downloadBtn.href = URL.createObjectURL(blob);
  downloadBtn.download = `addr2Geo.csv`;
  downloadBtn.text = `Download CSV`;
  downloadBtn.style.display = "block";
};
