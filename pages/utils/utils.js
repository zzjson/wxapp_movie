function convertToStarsArray(stars) {
  var starsArray = [];
  var num = stars.toString().split(0, 1);
  for (var i = 0; i < 5; i++) {
    if (i < num - 1) {
      starsArray.push(true);
    } else {
      starsArray.push(false);
    }
  }
  return starsArray;
}

/**
 * 访问请求获取电影详情
 * @param url
 */
function http(url, callBack) {
  console.log(url);
  var that = this;
  wx.request({
    url: url,
    header: {
      'content-type': 'json'
    },
    success: res => {
      callBack(res.data);
    }, fail: res => {
      console.log("fail" + res.data);
    }
  })
}

module.exports = {
  convertToStarsArray: convertToStarsArray,
  http: http
}