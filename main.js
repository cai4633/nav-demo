// TODO: 怎样提高img加载速度？
window.onload = function(){
    // 1 初始化数据
    let data = init()    
    let hash = data['hash'];
    let layout = data.layout;
    let keyLock = false;
    
    //2 利用js创建element
    createKeyboard()
    
    //3 当input 获得焦点时禁用keyboard
    disableKeyboardOrNot()

    //4 监听用户按键
    listenTokeyboard();



    //初始化
    function init(){
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
            'n': 'www.nba.com',
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
            'y': 'www.yahoo.com',
            'z': 'zhihu.com'
        };
    
        if(localStorage.getItem('hash')) {
            hash = JSON.parse(localStorage.getItem('hash'));
        }
        let layout = {
            '0': ["~","1","2","3","4","5","6","7","8","9","0","-","+",{'key': "delete",'className':'long right'}],
            '1': [{'key': "tab",'className':'long left'},"q","w","e","r","t","y","u","i","o","p","{","}","|"],
            '2': [{'key': "cap lock",'className':'enter left'},"a","s","d","f","g","h","j","k","l",":","'",{'key': "enter",'className':'enter right'}],
            '3': [{'key': "shift",'className':'shift left'},"z","x","c","v","b","n","m","<",">","/",{'key': "shift",'className':'shift right'}],
        };   
        
        return {
            hash: hash,
            layout: layout
        }
    }

   //当input 获得焦点时禁用keyboard
    function disableKeyboardOrNot(){
        let input = document.getElementById('keyword') 
        input.onfocus = function(){
            keyLock = true
        }
        input.onblur = function(){
            keyLock = false
        }        
    }

    // 通过‘E’自定义网址
    function listenToBtn(ele){
        ele.addEventListener('click',function(evt){
            let btn = evt.target    
            let url = prompt('请您输入一个你喜欢的网址！')
            
            if(typeof(url) == 'object' && !url) return; //取消按钮
            
            if(url.match(/\w+\.\w{2,6}/)){      //匹配网址格式
                hash[btn.id] = url
                window.localStorage.setItem('hash',JSON.stringify(hash));
            }
            else if(confirm('网址格式错误，是否重新输入？')){
                arguments.callee(evt); //传入参数evt，消除循环调用函数this指向window导致的bug
            }
            
            getIconFromWebsite(btn.previousSibling,btn.id);
        })          
    }

    //get icon from website
    function getIconFromWebsite(ele,key){
        if(hash[key]){
            ele.src = "https://" + hash[key] + '/favicon.ico'    //get icon
        }
        ele.onerror = function (){
            ele.src = 'https://s1.ax1x.com/2020/03/18/8d8UU0.png'
        }
    }    

    // 定义press事件
    function listenTokeyboard(){
        document.addEventListener('keypress',function(evt){     //键盘输入事件最好绑定在document上
            if(!keyLock){
                let url = 'https://' + hash[evt.key];
                // window.location.href = url;
                window.open(url,'_blank');                    
            }
        })        
    }

    // 利用js创建element
    function createKeyboard(){
        let layoutLength = Object.keys(layout).length;
        let root = document.getElementById('root');

        for (let i = 0; i < layoutLength; i++){
            let div = document.createElement('div');
            for(let j = 0; j<layout[i].length; j++){
                let img = document.createElement('img')
                let kbd = document.createElement('kbd');
                let btn = document.createElement('button');
                btn.textContent = 'E';
                if(Object.prototype.toString.call(layout[i][j]) === '[object Object]')
                {          
                    let span = document.createElement('span')
                    span.textContent = layout[i][j]['key'];
                    btn.id = layout[i][j]['key'];      //元素的id属性可以用来存储字符串
                    kbd.className = layout[i][j]['className'];
                    kbd.appendChild(span)                
                }else{
                    btn.id = layout[i][j];      //元素的id属性可以用来存储字符串
                    kbd.textContent = layout[i][j];
                }
                
                getIconFromWebsite(img,btn.id)
                // 通过‘E’自定义网址
                listenToBtn(btn);


                kbd.appendChild(img);
                kbd.appendChild(btn);
                div.appendChild(kbd);
            }

            root.appendChild(div);


        }        
    }    
}

