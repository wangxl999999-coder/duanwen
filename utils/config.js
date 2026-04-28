const APP_NAME = '短文'
const APP_VERSION = '1.0.0'

const API_BASE_URL = 'https://api.duanwen.example.com'

const CATEGORIES = [
  { id: 1, name: '情感故事', icon: '❤️' },
  { id: 2, name: '生活随笔', icon: '📝' },
  { id: 3, name: '旅行游记', icon: '✈️' },
  { id: 4, name: '美食分享', icon: '🍜' },
  { id: 5, name: '技术文章', icon: '💻' },
  { id: 6, name: '职场感悟', icon: '💼' },
  { id: 7, name: '娱乐八卦', icon: '🎬' },
  { id: 8, name: '其他', icon: '📚' }
]

const MUSIC_LIST = [
  { id: 1, name: '轻音乐 - 清晨', url: '/assets/music/morning.mp3', duration: '3:20' },
  { id: 2, name: '轻音乐 - 午后', url: '/assets/music/afternoon.mp3', duration: '4:15' },
  { id: 3, name: '轻音乐 - 夜晚', url: '/assets/music/night.mp3', duration: '3:45' },
  { id: 4, name: '钢琴曲 - 雨滴', url: '/assets/music/rain.mp3', duration: '5:10' },
  { id: 5, name: '纯音乐 - 星空', url: '/assets/music/stars.mp3', duration: '4:30' },
  { id: 6, name: '古风音乐 - 相思', url: '/assets/music/xiangsi.mp3', duration: '3:55' }
]

const PROVINCES = [
  '北京市', '天津市', '河北省', '山西省', '内蒙古自治区',
  '辽宁省', '吉林省', '黑龙江省', '上海市', '江苏省',
  '浙江省', '安徽省', '福建省', '江西省', '山东省',
  '河南省', '湖北省', '湖南省', '广东省', '广西壮族自治区',
  '海南省', '重庆市', '四川省', '贵州省', '云南省',
  '西藏自治区', '陕西省', '甘肃省', '青海省', '宁夏回族自治区',
  '新疆维吾尔自治区', '台湾省', '香港特别行政区', '澳门特别行政区'
]

module.exports = {
  APP_NAME,
  APP_VERSION,
  API_BASE_URL,
  CATEGORIES,
  MUSIC_LIST,
  PROVINCES
}
