var util = require("../..//utils/utils.js");
var app = getApp();

Page({
  data: {
    movies: {},
    moviesIsEmpty: true,
    start: 0,
    requestUrl: ""
  },
  onLoad: function (options) {
    var categoryTitle = options.categoryTitle;
    this.data.categoryTitle = categoryTitle;
    var douBan = app.globalData.g_douBan;
    var BaseUrl = douBan.g_douBanBase;
    switch (categoryTitle) {
      case  "即将上映":
        BaseUrl += douBan.g_douBanComingSoon;
        break;
      case "Top250":
        BaseUrl += douBan.g_douBanTop;
        break;
      case "正在热映":
        BaseUrl += douBan.g_douBanHot;
        break;
    }
    this.data.requestUrl = BaseUrl;
    util.http(BaseUrl, this.processData);
  }
  ,
  onShow: function () {
    wx.setNavigationBarTitle({title: this.data.categoryTitle});
  },

  /**
   * 加载数据
   * @param data
   * @param key json数据对应key
   * @param movieStock 电影分类
   */
  processData: function (data) {
    var subjects = data.subjects;
    var movies = [];
    for (var subject of subjects) {
      var title = subject.title;
      if (title.length > 6) {
        title = title.substring(0, 6) + "...";
      }
      var temp = {
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id,
        starsArray: util.convertToStarsArray(subject.rating.stars),
        rating: subject.rating.stars,
      };
      movies.push(temp);
    }
    var origialMovies = this.data.movies;
    if (!this.data.moviesIsEmpty) {
      origialMovies = origialMovies.concat(movies);
    } else {
      origialMovies = movies;
      this.data.moviesIsEmpty = false;
    }
    this.data.start += 20;
    this.setData({
      movies: origialMovies
    });
    wx.stopPullDownRefresh();
    wx.hideNavigationBarLoading();
  }
  ,
  /**
   * 滚动到底刷新
   */
  onReachBottom: function () {
    wx.showNavigationBarLoading();
    util.http(this.data.requestUrl + "?start=" + this.data.start + "&count=20", this.processData);
  },
  onPullDownRefresh: function (event) {
    wx.showNavigationBarLoading();
    this.data.moviesIsEmpty = true;
    this.data.start = 0;
    util.http(this.data.requestUrl + "?start=" + this.data.start + "&count=20", this.processData);
  },
  onMovieTap: function (event) {
    var movieId = event.currentTarget.dataset.movieId;
    wx.navigateTo({
      url: '../movie-detail/movie-detail?movieId=' + movieId
    })
  },
})
;