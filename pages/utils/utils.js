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

function convertToCastString(casts) {
  var castsjoin = "";
  for (var idx in casts) {
    castsjoin += casts[idx].name + "/";
  }
  return castsjoin.substring(0, castsjoin.length - 2);
}

function convertToCastInfos(casts) {
  var castsArray = [];
  for (var cast of casts) {
    var castArr = {
      img: cast.avatars ? cast.avatars.large : "",
      name: cast.name
    }
    castsArray.push(castArr);
  }
  return castsArray;
}

module.exports = {
  convertToStarsArray: convertToStarsArray,
  convertToCastString: convertToCastString,
  convertToCastInfos: convertToCastInfos,
  http: http
}