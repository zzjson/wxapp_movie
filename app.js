App({
  globalData: {
    g_isplayingMusic: false,
    g_currentMusicPostId: null,
    g_douBan: {
       //g_douBanBase: "https://douban.uieee.com",
      // g_douBanBase: "https://api.douban.com",
      g_douBanBase: "http://t.yushu.im",
      g_douBanHot: "/v2/movie/in_theaters",
      g_douBanComingSoon: "/v2/movie/coming_soon",
      g_douBanTop: "/v2/movie/top250",
      g_douBanSearch: "/v2/movie/search?q=",
    }


  },
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {

  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {

  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {

  }
});
