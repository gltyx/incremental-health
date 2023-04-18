/*

 @name    : 锅巴汉化 - Web汉化插件
 @author  : 麦子、JAR、小蓝、好阳光的小锅巴
 @version : V0.6.1 - 2019-07-09
 @website : http://www.g8hh.com

*/

//1.汉化杂项
var cnItems = {
    _OTHER_: [],

    //未分类：
    'in... and out': '进进出出',
    'upgrades': '升级',
    'self-care': '自我护理',
    'side hustles': '侧推',
    'side-hustles': '侧推',
    'incremental health': '健康增量',
    'reduce stress by': '减轻压力',
    'shopping therapy': '购物疗法',
    'take a deep breath': '深呼吸',
    'too stressed to work right now': '现在工作压力太大了',
    'moneys: £': '金钱: £',
    'dog walking': '遛狗',
    'Available hours': '可用时间',
    'get all you need for a nice cup of tea': '准备好一杯好茶所需要的一切',
    'hours worked': '工作时间',
    'moneys gained: £': '得到金钱: £',
    'purchase - £': '购买 - £',
    'stress increase': '压力增加',
    'tea set': '茶具',
    'work less': '工作减少',
    'work more': '工作更多',
    '* BURNOUT - unable to work *': '* 倦怠 - 无法工作 *',
    '* BURNOUT * unable to work until stress levels reduced * BURNOUT *': '* 倦怠 * 无法工作，直到压力水平降低 * 倦怠 *',
    'drink some tea': '喝点茶',
    'lovely': '优雅',
    'bathtub': '浴缸',
    'babysitting': '保姆',
    'double income from dog walking': '遛狗收入翻倍',
    'have a bath': '洗个澡',
    'have a freestanding bathtub installed': '安装一个独立式浴缸',
    'more leashes': '更多的皮带',
    'splash': '飞溅',
    'double income from babysitting': '保姆收入翻倍',
    'twins only policy': '仅限双胞胎政策',
    'get a massage': '按摩',
    'home baking': '家庭烘焙',
    'lay down and relax': '躺下放松',
    'take-away delivery': '外卖',
    'pet': '宠物',
    'spa membership': '水疗会员',
    'sign up for your local pamper palace': '报名参加当地的豪华酒店吧',
    'dual ovens': '双烤箱',
    'electric bike': '电动车',
    'double income from take-away delivery': '外卖收入翻倍',
    'double income from home baking': '家庭烘焙的收入翻倍',
    'adopt a lovable creature': '领养可爱的动物',
    'hug your pet': '拥抱你的宠物',
    'so soft': '好软',
    'go on spa retreat': '继续温泉疗养',
    'leave it all behind': '抛到脑后',
    'crypto trading': '加密交易',
    'double income from crypto trading': '加密交易收入翻倍',
    'trading bots': '交易机器人',
    'congratulations, you have successfully calmed yourself down': '恭喜，您已成功让自己平静下来',
    'hire strong hands to kneed out the tension': '雇佣强壮的助手来消除紧张',
    'keep going': '保持下去',
    'massage therapist': '按摩师',
    'start over': '重新开始',
    'stress free!': '压力消失！',
    'thank you for playing': '感谢你的参与',
    'buy all the shiny things you ever wanted': '买到所有你曾经想要的闪亮的东西',
    'stress': '压力',
    'material goods': '物质商品',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',

    //原样
    '': '',
    '': '',

}


//需处理的前缀
var cnPrefix = {
    "(-": "(-",
    "(+": "(+",
    "(": "(",
    "-": "-",
    "+": "+",
    " ": " ",
    ": ": "： ",
}

//需处理的后缀
var cnPostfix = {
    ":": "：",
    "：": "：",
    ": ": "： ",
    "： ": "： ",
    " ": "",
    "/s)": "/s)",
    "/s": "/s",
    ")": ")",
    "%": "%",
}

//需排除的，正则匹配
var cnExcludeWhole = [
    /^x?\d+(\.\d+)?[A-Za-z%]{0,2}(\s.C)?\s*$/, //12.34K,23.4 °C
    /^x?\d+(\.\d+)?(e[+\-]?\d+)?\s*$/, //12.34e+4
    /^\s*$/, //纯空格
    /^\d+(\.\d+)?[A-Za-z]{0,2}.?\(?([+\-]?(\d+(\.\d+)?[A-Za-z]{0,2})?)?$/, //12.34M (+34.34K
    /^(\d+(\.\d+)?[A-Za-z]{0,2}\/s)?.?\(?([+\-]?\d+(\.\d+)?[A-Za-z]{0,2})?\/s\stot$/, //2.74M/s (112.4K/s tot
    /^\d+(\.\d+)?(e[+\-]?\d+)?.?\(?([+\-]?(\d+(\.\d+)?(e[+\-]?\d+)?)?)?$/, //2.177e+6 (+4.01+4
    /^(\d+(\.\d+)?(e[+\-]?\d+)?\/s)?.?\(?([+\-]?(\d+(\.\d+)?(e[+\-]?\d+)?)?)?\/s\stot$/, //2.177e+6/s (+4.01+4/s tot
];
var cnExcludePostfix = [
    /:?\s*x?\d+(\.\d+)?(e[+\-]?\d+)?\s*$/, //12.34e+4
    /:?\s*x?\d+(\.\d+)?[A-Za-z]{0,2}$/, //: 12.34K, x1.5
]

//正则替换，带数字的固定格式句子
//纯数字：(\d+)
//逗号：([\d\.,]+)
//小数点：([\d\.]+)
//原样输出的字段：(.+)
var cnRegReplace = new Map([
    [/^stress: (.+)$/, '压力: $1'],
    [/^moneys: (.+)$/, '金钱: $1'],
    [/^purchase - (.+)$/, '购买 - $1'],
    [/^Cost: (\d+) RP$/, '成本：$1 皇家点数'],
    [/^Usages: (\d+)\/$/, '用途：$1\/'],
    [/^workers: (\d+)\/$/, '工人：$1\/'],

]);