/**
 * 全局声明（不加 export）：
 * 任何文件可直接使用 Config；
 * 修改值需要在项目根目录下的 /public/config.js
 */
declare class Config {
  /** 正式URL */
  static ajaxUrl: string
  static payWebSocketUrl: string
  static webUrl: string

  /**刷卡或人脸登录的websocket的url*/
  static websocketUrl: string

  static terminalUrl: string
  /** 是否调试标志1 */
  static debug: boolean
  static isChangeDebug: boolean
  static version: string
  static otherLogin: boolean //其他单点登录方式
  static isLanguageSwitch: boolean //是否开启中英切换功能
  static isShowMobileCode: boolean //首页移动端二维码，是否显示

  /**人脸或刷卡登录*/
  static faceOrSwipeCard: boolean
  static isShowCompLogo: boolean

  /**模块导入控制*/
  static systemType: string[]
  /**单次上传附件最大大小(MB) */
  static sizeMax: number
  static bAllRight: boolean
  static xiaochengxuCode: string
  static videoNet: number //在何种网络类型下查看视频：1为http，2为https
  static playVideoType: number //视频播放类型：1 easycvr解码 2 海康解码 3. 安防平台视频

  static iSecureIp: string //综合安防管理平台IP地址
  static iSecurePort: number //综合安防管理平台端口
  static iSecureDownloadPath: string //监控抓图、录像文件储存文件夹：用户客户端本地文件夹（非服务端）
  static mobileUrl: string //移动端入口地址、分类分级扫码回调地址前缀
  static dwRequestUrl: string // 硬件定位相关参数请求的路径 测试服：http://csapp.cciot.cc/mapi 正式服：http://app.cciot.cc/mapi

  static OA_BASE_URL: string // 低代码系统跳转相关
  static OA_REDIRECT_PATH: string // 低代码系统跳转相关

  static bChangeMenuType: boolean // 是否可切换菜单类型
}
