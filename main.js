window.onload = function(){
    let hash = {
        'a': '163.com',
        'b': 'baidu.com',
        'c': 'www.liaoxuefeng.com/wiki/1022910821149312/1023024413276544',
        'd': 'ele.me',
        'e': 'element.eleme.cn',
        'f': 'toutiao.com',
        'g': 'github.com',
        'h': 'hao123.com',
        'i': 'iqiyi.com',
        'j': 'jd.com',
        'k': 'kuaishou.com',
        'l': 'www.lagou.com/',
        'm': 'meituan.com',
        'n': 'nba.com',
        'o': 'v.ifeng.com',
        'p': 'sina.com',
        'q': 'qq.com',
        'r': 'renren.com',
        's': 'sohu.com',
        't': 'taobao.com',
        'u': 'bilibili.com',
        'v': '163.com',
        'w': 'tudou.com',
        'x': 'youku.com',
        'y': 'yahoo.com',
        'z': 'zhihu.com'
    };

    if(localStorage.getItem('hash')) {
        hash = JSON.parse(localStorage.getItem('hash'));
    }
    let layout = {
        '0': ["q","w","e","r","t","y","u","i","o","p"],
        '1': ["a","s","d","f","g","h","j","k","l"],
        '2': ["z","x","c","v","b","n","m"],
    };

    let layoutLength = Object.keys(layout).length;
    let root = document.getElementById('root');
    // 利用js创建element
    for (let i = 0; i < layoutLength; i++){
        let div = document.createElement('div');
        for(let j = 0; j<layout[i].length; j++){
            let kbd = document.createElement('kbd');
            let btn = document.createElement('button');
            btn.textContent = 'E';
            btn.id = layout[i][j];      //元素的id属性可以用来存储字符串
            kbd.textContent = layout[i][j];
            kbd.appendChild(btn);
            
    // 自定义网址
            btn.addEventListener('click',function(){
                let url = prompt('请您输入一个你喜欢的网址！')
                if(url.match(/\w+\.\w{2,6}/)){      //匹配网址格式
                    hash[this.id] = url
                    window.localStorage.setItem('hash',JSON.stringify(hash));
                }
                else {
                    //调用自身
                    confirm('网址格式错误，是否重新输入？') && arguments.callee();
                }
            })
    // 定义press事件
            document.addEventListener('keypress',function(evt){     //键盘输入事件最好绑定在document上
                let url = 'https://' + hash[evt.key];
                // window.location.href = url;
                window.open(url,'_blank');
            })
            div.appendChild(kbd);
        }
        root.appendChild(div);
    }

}