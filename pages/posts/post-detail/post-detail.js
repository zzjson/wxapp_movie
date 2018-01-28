var postDatas = require("../../../data/posts-data.js");
var appInstance = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    playingMusic: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id;
    // this.data.postData = postDatas.postList[postId];
    this.setData({
      postData: postDatas.postList[postId],
      currentPostId: postId,
    });

    //获取收藏缓存
    var postedCollected = wx.getStorageSync('posted_collected');
    if (postedCollected) {
      this.setData({
        posted_collected: postedCollected[postId]
      })
    } else {
      var postedCollected = {};
      postedCollected[postId] = false;
      wx.setStorageSync('posted_collected', postedCollected);
    }


    console.log(appInstance.globalData);
    if (appInstance.globalData.g_currentMusicPostId == postId &&
      appInstance.globalData.g_isplayingMusic) {
      this.setData({
        playingMusic: true
      })
    }
    this.setMusicMonitor();
  },
  setMusicMonitor: function () {
    var that = this;
    //后台监听音乐
    wx.onBackgroundAudioPause(() => {
      that.setData({
        playingMusic: false
      })
      appInstance.globalData.g_isplayingMusic = false;
      appInstance.g_currentMusicPostId = currentPostId;
    });
    wx.onBackgroundAudioPlay(() => {
      that.setData({
        playingMusic: true
      })
      appInstance.globalData.g_isplayingMusic = true;
      appInstance.g_currentMusicPostId = currentPostId;
    });

  },
  /**
   * 点击收藏
   * @param event
   */
  onCollectTap: function (event) {
    var collectStorage = wx.getStorageSync('posted_collected');
    //当前postid
    var currentPostId = this.data.currentPostId;
    //对应的值
    var postedCollected = collectStorage[currentPostId];
    postedCollected = !postedCollected;
    collectStorage[currentPostId] = postedCollected;
    // this.showToast(collectStorage, postedCollected);
    this.shoModel(collectStorage, postedCollected);
  },

  /**
   * 点击分享
   */
  onShareTap: function () {
    // wx.showLoading({
    //   title: '加载中',
    // })
    var itemList = [
      "分享到QQ", "分享到好友"
    ];
    wx.showActionSheet({
        itemList: itemList,
        success: function (res) {
          console.log(itemList[res.tapIndex]);
        },
        fail: function (res) {
          console.log(res.errMsg);
        }
      }
    )
  },

  /**
   * 音乐控制
   */
  onMusicTap: function () {
    var playingMusic = this.data.playingMusic;
    var postData = this.data.postData;
    var music = postData.music;
    if (!playingMusic) {
      wx.playBackgroundAudio({
        dataUrl: music.url,
        title: music.title,
        coverImgUrl: music.coverImg
      })
    } else {
      wx.stopBackgroundAudio();
    }
    this.setData({
      playingMusic: !playingMusic
    });
  },

  /**
   * 整体json
   * 对应id的value
   * 当前id
   * @param collectStorage
   * @param postedCollected
   * @param currentPostId
   */
  showToast: function (collectStorage, postedCollected) {
    //更新数据到data
    this.setData({
      posted_collected: postedCollected,
    });
    wx.setStorageSync('posted_collected', collectStorage);
    wx.showToast({
      title: postedCollected ? "已收藏" : "取消成功",
      duration: 1000,
      icon: success,

    });
  }

  ,

  shoModel: function (collectStorage, postedCollected) {
    var that = this;
    wx.showModal({
      title: '收藏',
      content: postedCollected ? "收藏该文章" : "取消收藏该文章",
      cancelText: '取消',
      confirmText: '确认',
      success: function (res) {
        /**
         * 点击收藏
         */
        if (res.confirm) {
          //更新数据到data
          that.setData({
            posted_collected: postedCollected,
          });
          wx.setStorageSync('posted_collected', collectStorage);
        }
      }
    });
  }
  ,
})
;
