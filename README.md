# 导航网页
## 主要功能
1. 按下按键会打开对应的网页
2. 每个按键可以通过点击<kbd>E</kbd>来自定义网址，并实时显示网站图标
3. 通过localStorage来存储自定义网址
5. 增加百度和谷歌搜索

## 用到的知识点
1. 利用box-shadow和:active伪类实现点击立体动画效果
2. 使用display:inline-block搭配vertical-align:top避免baseline变化bug
3. 利用/favicon.ico来获取网站icon
4. 使用inline-block代替inline，避免inline padding-topw无效导致的bug
5. user-select:none 消除点击元素文字变蓝的bug（浏览器默认行为）
6. `img[src=''],img:not([src]){ opacity 0 } ` 去掉<kbd></kbd>加载失败样式