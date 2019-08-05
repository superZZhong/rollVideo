//index.js
//获取应用实例
const app = getApp()
let videoContext = null; //video实例
let stopTouch = false; //滑动权限
let deltaY = 0; //滑动距离
let videoList = [{
  id: '111',
  title: '标题1',
  like: 0,
  likeCount: 111,
  follow: 0,
  topic: '帅气',
  headPic: 'https://mp-zhuantui-1259100054.cos.ap-guangzhou.myqcloud.com/demo/my.jpg',
  site: '深圳南山小院',
  description: '描述1111111111',
  src: 'https://mp-zhuantui-1259100054.cos.ap-guangzhou.myqcloud.com/videoDemo/uMt7xJfz6DUA.mp4',
  pic: 'https://jxtt.diangoumall.com/149c30b0vodcq1258058953/0c8c9fed5285890784213263168/5285890784213263169.jpg'
}, {
  id: '222',
  title: '标题1',
  like: 0,
  likeCount: 111,
  follow: 0,
  topic: '帅气',
  headPic: 'https://mp-zhuantui-1259100054.cos.ap-guangzhou.myqcloud.com/demo/my.jpg',
  site: '深圳南山小院',
  description: '描述1111111111',
  src: 'https://mp-zhuantui-1259100054.cos.ap-guangzhou.myqcloud.com/videoDemo/uMt7xJfz6DUA.mp4',
  pic: 'https://jxtt.diangoumall.com/149c30b0vodcq1258058953/0c8c9fed5285890784213263168/5285890784213263169.jpg'
}, {
  id: '333',
  title: '标题1',
  like: 0,
  likeCount: 111,
  follow: 0,
  topic: '帅气',
  headPic: 'https://mp-zhuantui-1259100054.cos.ap-guangzhou.myqcloud.com/demo/my.jpg',
  site: '深圳南山小院',
  description: '描述1111111111',
  src: 'https://mp-zhuantui-1259100054.cos.ap-guangzhou.myqcloud.com/videoDemo/uMt7xJfz6DUA.mp4',
  pic: 'https://jxtt.diangoumall.com/149c30b0vodcq1258058953/0c8c9fed5285890784213263168/5285890784213263169.jpg'
}, {
  id: '444',
  title: '标题1',
  like: 0,
  likeCount: 111,
  follow: 0,
  topic: '帅气',
  headPic: 'https://mp-zhuantui-1259100054.cos.ap-guangzhou.myqcloud.com/demo/my.jpg',
  site: '深圳南山小院',
  description: '描述1111111111',
  src: 'https://mp-zhuantui-1259100054.cos.ap-guangzhou.myqcloud.com/videoDemo/uMt7xJfz6DUA.mp4',
  pic: 'https://jxtt.diangoumall.com/149c30b0vodcq1258058953/0c8c9fed5285890784213263168/5285890784213263169.jpg'
}, {
  id: '555',
  title: '标题1',
  like: 0,
  likeCount: 111,
  follow: 0,
  topic: '帅气',
  headPic: 'https://mp-zhuantui-1259100054.cos.ap-guangzhou.myqcloud.com/demo/my.jpg',
  site: '深圳南山小院',
  description: '描述1111111111',
  src: 'https://mp-zhuantui-1259100054.cos.ap-guangzhou.myqcloud.com/videoDemo/uMt7xJfz6DUA.mp4',
  pic: 'https://jxtt.diangoumall.com/149c30b0vodcq1258058953/0c8c9fed5285890784213263168/5285890784213263169.jpg'
}]
Page({
  data: {
    // 视频列表
    videoList,
    // 当前播放视频
    videoParam: {
      id: '333',
      title: '标题3',
      like: 0,
      likeCount: 333,
      follow: 0,
      topic: '帅气',
      headPic: 'https://mp-zhuantui-1259100054.cos.ap-guangzhou.myqcloud.com/demo/my.jpg',
      site: '深圳南山小院',
      description: '描述33333333333',
      src: 'https://mp-zhuantui-1259100054.cos.ap-guangzhou.myqcloud.com/videoDemo/uMt7xJfz6DUA.mp4'
    },
    //滑动参数
    touch: {
      startX: 0,
      startY: 0,
      time: 0
    },
    videoId: '333', // 视频Id
    videoInde: '', //视频索引
    translateParam: "translateY(-100%)", //视图位置
    progressTime: "0%", //进度条
  },
  onLoad: function(e) {
    this.setData({
      videoId: e.videoId || "444"
    })

    let videoIndex = this.data.videoList.findIndex(v => v.id == this.data.videoId)
    this.setData({
      videoIndex
    })

    this.tabHome(videoIndex)
    this.watchVideoId()
  },
  // 模拟vue watch 待学习 太懒 后面补充 
  watchVideoId() {
    let list = this.data.videoList
    let videoIndex = this.data.videoIndex
    this.setData({
      videoParam: list[videoIndex]
    })

    let l = list.length - 1
    // 当滑动到最后一个视频的时候 加载视频列表
    if (l == videoIndex) {
      console.log('滑动到最后一个是该加载数据啦')
      let list = this.data.videoList
      this.setData({
        videoList: [...list, ...videoList]
      })
    }

    this.setVideoParam(videoIndex)
  },
  // 修改视频数据
  setVideoParam(i) {
    this.setData({
      videoParam: this.data.videoList[i], //数据初始化
      progressTime: "0%", //进度条初始化
    })

    //异步播放 避免获取不到video实例
    videoContext = wx.createVideoContext('myVideo' + this.data.videoIndex)
    videoContext && videoContext.play()
  },
  // 切换视频
  tabHome(i) {
    let top = -(i) * 100
    this.setData({
      translateParam: `translateY(${top}%)`
    })
  },
  // 播放心跳
  timeupdate(e) {
    // console.log(e)
    // let total = e.detail.duration || 0
    // let newTime = e.detail.currentTime || 0
    // this.setData({
    //   progressTime: (newTime / total * 100) + "%" || this.data.progressTime
    // })
  },
  onTouchstart(e) {
    // console.log('开始')
    let touch = e.touches[0];
    this.data.touch.startX = touch.pageX;
    this.data.touch.startY = touch.pageY;
    this.data.touch.time = new Date().getTime();
  },
  onTouchmove(e) {
    // console.log('过程')
    let touch = e.touches[0];
    let deltaX = touch.pageX - this.data.touch.startX;
    deltaY = touch.pageY - this.data.touch.startY;
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // console.log('左右不管')

    }

    if (deltaY > 0) {
      // console.log('我是下滑')

    } else {
      // console.log('我是上滑')

    }
  },
  onTouchend(e) {
    // console.log('结束')
    // 阻止连续滑动
    if (stopTouch) return;

    let startTime = this.data.touch.time //start时间
    let endTime = new Date().getTime() //end时间
    let list = this.data.videoList //视频数组
    let videoIndex = this.data.videoIndex //视频索引
    let videoId = this.data.videoId //视频id
    console.log(videoIndex)
    //时间超过3秒滑动无效 这里暂时不操作
    if ((endTime - startTime) > 3000) {

    }

    // 不能连续滑动 必须等待滑动完成动画过渡
    if (deltaY > 30 || deltaY < -30) {
      this.stoptouchFunc()
    }

    // 滑动距离不够
    if (deltaY < 30 && deltaY > -30) {
      return
    }

    // 滑动超过30执行 下滑
    if (deltaY > 30) {
      console.log('下滑可以执行切换')
      // 到第一个视频的时候不能在继续滑动了
      if ((videoIndex == 0)) {
        console.log('到头了 不能在往上了')
        return
      }

      videoIndex -= 1
      this.tabHome(videoIndex)
    }

    // 滑动小于-30执行 上滑
    if (deltaY < -30) {
      console.log('上滑可以执行切换')
      // 到第一个视频的时候不能在继续滑动了 或者需要加载数据
      if ((videoIndex == list.length - 1)) {
        console.log('到底了 不能在往下了')
        return
      }

      videoIndex += 1
      this.tabHome(videoIndex)
    }

    console.log(videoIndex)
    // 停止视频
    this.deteleVideo()

    //初始化配置参数
    deltaY = 0
    this.setData({
      ['touch.time']: 0
    })

    setTimeout(() => {
      // 先执行动画 在切换视频 提升流畅性
      this.setIndex(videoIndex)
      this.watchVideoId()
    }, 400)
  },
  // 根据索引修改视频id
  setIndex(i) {
    this.setData({
      videoIndex: i
    })
  },
  //暂停或停止video
  deteleVideo() {
    videoContext = wx.createVideoContext('myVideo' + this.data.videoIndex)
    videoContext && videoContext.pause()
    videoContext && videoContext.stop()
  },
  stoptouchFunc() {
    // 锁定滑动权限
    stopTouch = true

    // 动画是0.4s 预估有一点dom渲染时间 0.2s 就延迟0.7s 时间在准滑动哈
    setTimeout(() => {
      stopTouch = false
    }, 700)
  },
  // 点赞
  videoLike() {
    // 深拷贝
    let videoParam = JSON.parse(JSON.stringify(this.data.videoParam))

    this.setData({
      ['videoParam.like']: videoParam.like == 1 ? 0 : 1,
      ['videoParam.likeCount']: videoParam.like == 1 ? videoParam.likeCount - 1 : videoParam.likeCount + 1
    })
  }
})