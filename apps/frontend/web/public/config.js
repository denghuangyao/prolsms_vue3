const Config = {
  bAllRight: true,
  /** URL */
  ajaxUrl: 'http://test201.weileit.com:12019',
  /** 前端index.html路径 */
  webUrl: 'http://test201.weileit.com:12019/qt',
  mobileUrl: 'http://test201.weileit.com:22019/h5/', //移动端入口地址、分类分级扫码回调地址前缀
  /** 是否调试标志*/
  debug: false,
  /** 是否可在登录页通过点击版本号打开调试*/
  isChangeDebug: true,
  bChangeMenuType: true, //是否开放菜单切换功能
  /**只放开相应系统入口*/
  systemType: ['ALL'],
  /**版本号*/
  version: '5.1.1.2024.09121754',

  // --------start 以下配置项一般开发阶段会配置，实施阶段不配置-----------

  // 是否开启中英切换功能
  isLanguageSwitch: false,
  /**显示logo */
  isShowCompLogo: true,
  //首页移动端二维码，是否显示
  isShowMobileCode: true,
  /**人脸或刷卡登录*/
  faceOrSwipeCard: false,
  /**单次上传附件最大大小(MB) */
  sizeMax: 10,
  /**监听用户支付的websocket的url（没有使用到此功能情况下可为空）*/
  payWebSocketUrl: 'ws://test201.weileit.com:12019',
  /** 刷卡或人脸登录的websocket的url （没有使用到此功能情况下可为空）*/
  websocketUrl: 'ws://test201.weileit.com:12019',
  /** 小程序二维码，填写对应单位的编号，填写之后打印仪器码就会变成小程序二维码（没有使用到此功能情况下可为空）*/
  xiaochengxuCode: '61',
  /** 终端服务的请求地址（只有部署在终端时才会用到这个参数）（没有使用到此功能情况下可为空）*/
  terminalUrl: 'http://127.0.0.1:8888',

  /**视频播放类型*/
  videoNet: 1, //在何种网络类型下查看视频：1为http，2为https
  /** playVideoType 为 3 时需配置 ：iSecureIp、iSecurePort、iSecureDownloadPath */
  playVideoType: 2,
  /**综合安防管理平台IP地址 */
  iSecureIp: '192.168.0.253',
  /**综合安防管理平台端口 */
  iSecurePort: 443,
  /**监控抓图、录像文件储存文件夹：用户客户端本地文件夹（非服务端） */
  iSecureDownloadPath: 'D:\\wlitSnapDir',

  // --------end 以上配置项一般开发阶段会配置，实施阶段不配置-----------
}

window.Config = Config
