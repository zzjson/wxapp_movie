var util = require("../utils/utils.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Hot: {},
    Coming: {},
    Top: {},
    searchPanelShow: false,
    containerPanelShow: true,
    searchResult: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var douBanBase = app.globalData.g_douBan;
    //正在热映
    var hotUrl = douBanBase.g_douBanBase + douBanBase.g_douBanHot;
    //即将上映
    var comingUrl = douBanBase.g_douBanBase + douBanBase.g_douBanComingSoon;
    //Top250
    var Top = douBanBase.g_douBanBase + douBanBase.g_douBanTop;
    var LimitUrl = "?start=0&count=3";
    this.getMovieListData(hotUrl + LimitUrl, "Hot", "正在热映");
    this.getMovieListData(comingUrl + LimitUrl, "Coming", "即将上映");
    this.getMovieListData(Top + LimitUrl, "Top", "Top250");
  },
  /**
   * 访问请求获取电影详情
   * @param url
   */
  getMovieListData: function (url, key, movieStockTitle) {
    console.log(url);
    var that = this;
    wx.request({
      url: url,
      header: {
        'content-type': 'json'
      },
      success: res => {
        that.processData(res.data, key, movieStockTitle);
      }, fail: res => {
        console.log("fail" + res.data);
      }
    })
  },
  /**
   * 更多电影点击事件
   */
  onMoreMovie: function (event) {
    var categoryTitle = event.currentTarget.dataset.categorytitle;
    wx.navigateTo({
      url: 'more-movie/more-movie?categoryTitle=' + categoryTitle
    });
  },
  onMovieTap: function (event) {
    var movieId = event.currentTarget.dataset.movieId;
    wx.navigateTo({
      url: 'movie-detail/movie-detail?movieId='+movieId
    });
  },
  /**
   * 加载数据
   * @param data
   * @param key json数据对应key
   * @param movieStock 电影分类
   */
  processData: function (data, key, movieStockTitle) {
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
    var readyData = {};
    readyData[key] = {
      movies: movies,
      title: movieStockTitle
    };
    this.setData(readyData);
  },
  onSearchFocus: function (event) {
    this.setData({
      containerPanelShow: false,
      searchPanelShow: true
    })
  },
  onCancelImgTap: function () {
    this.setData({
      containerPanelShow: true,
      searchPanelShow: false
    })
  },
  onSearchConfirm: function (event) {
    var searchKey = event.detail.value;
    var searchUrl = app.globalData.g_douBan.g_douBanBase + app.globalData.g_douBan.g_douBanSearch + searchKey;
    this.getMovieListData(searchUrl, "searchResult", "");
  },
  onBindBlur: function (event) {

  }


});