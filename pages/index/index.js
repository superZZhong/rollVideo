//index.js
//获取应用实例
import {
  list1,
  list2
} from './mock.js'

const app = getApp()
let videoContext = null; //video实例
let time=null

Page({
  data: {
    // 视频Id
    videoId: 1,
    // 当前swiper所在的位置
    current: 0,
    // 视频列表
    videoList: [],
    // 当前播放视频
    videoParam: {},
    // 播放开关 1是暂停 2是播放
    playMark: 2,

    // 第一个item
    oneItemParam: {},
    // 第二个item
    twoItemParam: {},
    // 第一个item
    threeItemParam: {},
  },
  onLoad: function(e) {
    // 拿到当前视频的实例
    this.videoContext0 = wx.createVideoContext('myVideo0')
    // 拿到当前视频的实例
    this.videoContext1 = wx.createVideoContext('myVideo1')
    // 拿到当前视频的实例
    this.videoContext2 = wx.createVideoContext('myVideo2')

    /* 初始化页面视频id 及 视频下标 */
    this.setData({
      videoId: e.videoId || 1,
      videoList: list1
    })

    let videoIndex = this.data.videoList.findIndex(v => v.id == this.data.videoId)
    let current = videoIndex % 3

    /* 拿到对应视频的数据 */
    this.getVideoParam(videoIndex)

    if (current === 0) {
      this.setData({
        oneItemParam: list1[videoIndex],
      })
    }

    if (current === 1) {
      this.setData({
        twoItemParam: list1[videoIndex],
      })
    }

    if (current === 2) {
      this.setData({
        threeItemParam: list1[videoIndex],
      })
    }

    // 匹配对应数据
    this.tabItem(current, videoIndex)

    /* 开始播放视频 */
    this.play(videoIndex)
  },
  changeCurrent(e){
    // 当前视频的数据列表
    let videoList = this.data.videoList

    // 当前视图视频id
    let id = e.detail.currentItemId

    /* 根据当前视图视频id拿到对应的视频列表下标 */
    let videoIndex = videoList.findIndex(v => v.id == id)

    /* 滑动到倒数第二个视频 加载视频列表 */
    if (videoIndex == (videoList.length - 2)) {
      let newList = [...this.data.videoList, ...list2]
      this.setData({
        videoList: newList
      })
    }
  },
  /**
   *  current 变化时 修改视频容器对应的数据
   */
  changeItem(e) {
    // 当前item的位置
    let current = this.data.current

    // swiper滑到的位置
    let swiperIndex = e.detail.current

    // 如果没有切换就不执行其他操作
    if (current == swiperIndex)return;

    // 当前视频的数据列表
    let videoList = this.data.videoList

    // 当前视图视频id
    let id = e.detail.currentItemId

    /* 根据当前视图视频id拿到对应的视频列表下标 */
    let videoIndex = videoList.findIndex(v => v.id == id)

    /* 拿到对应视频的数据 */
    this.getVideoParam(videoIndex)

    // 匹配对应数据
    this.tabItem(swiperIndex, videoIndex)

    /* 销毁视频实例 */
    this.stop()
    
    /* 开始播放视频 */
    this.play(swiperIndex)
  },
  // 根据swiperIndex videoIndex匹配对应数据
  tabItem(swiperIndex, videoIndex) {
    // 当前视频的数据列表
    let videoList = JSON.parse(JSON.stringify(this.data.videoList))

    let next = 0
    let first = 0

    /* 上一个 */
    if (videoIndex == 0) {
      first = videoList.length - 1
    } else {
      first = videoIndex - 1
    }

    /* 下一个 */
    if (videoIndex == videoList.length - 1) {
      next = 0
    } else {
      next = videoIndex + 1
    }

    switch (swiperIndex) {
      case 0:
        this.setData({
          twoItemParam: videoList[next],
          threeItemParam: videoList[first]
        })
        break;
      case 1:
        this.setData({
          oneItemParam: videoList[first],
          threeItemParam: videoList[next]
        })
        break;
      case 2:
        this.setData({
          oneItemParam: videoList[next],
          twoItemParam: videoList[first],
        })
        break;
      default:
    }

    this.setData({
      current: swiperIndex
    })
  },
  // 拿到当前视图的视频数据
  getVideoParam(videoIndex) {
    // 当前视频的数据列表
    let videoList = JSON.parse(JSON.stringify(this.data.videoList))
    this.setData({
      videoParam: videoList[videoIndex]
    })
  },
  // 播放
  play(swiperIndex) {
    let index = parseInt(swiperIndex)
    switch (index) {
      case 0:
        this.videoContext0 && this.videoContext0.play()
        break;
      case 1:
        this.videoContext1 && this.videoContext1.play()
        break;
      case 2:
        this.videoContext2 && this.videoContext2.play()
        break;
      default:
    }
  },
  // 销毁视频 注意 必须在切换之前销毁
  stop() {
    this.videoContext0 && this.videoContext0.pause()
    this.videoContext1 && this.videoContext1.pause()
    this.videoContext2 && this.videoContext2.pause()
  },
  // 开始播放 
  eventPlay(e) {
    this.setData({
      playMark: 2
    })
  },
  // 点击视频
  tabVideo(e) {
    let swiperIndex = this.data.current
    let playMark = this.data.playMark
    if (playMark == 2) {
      this.stop()
      this.setData({
        playMark: 1
      })
    } else {
      this.play(swiperIndex)
      this.setData({
        playMark: 2
      })
    }
  },
  // 点赞
  videoLike() {
    // 深拷贝
    let videoParam = JSON.parse(JSON.stringify(this.data.videoParam))

    this.setData({
      ['videoParam.like']: videoParam.like == 1 ? 0 : 1,
      ['videoParam.likeCount']: videoParam.like == 1 ? videoParam.likeCount - 1 : videoParam.likeCount + 1
    })
  },
})