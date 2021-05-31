function init() {
    console.log("终于可以为所欲为了");
    randonBg();

    //打字
    // typing();
    typing2();
}
//因为界面加载原因，我们延迟500ms再调用init
setTimeout("init()", 1000)


function randonBg() {
    var body = document.getElementsByTagName('body')[0];
    var i = Math.floor(Math.random() * 10);// 可均衡获取 0 到 9 的随机整数。
    // background-image: url(/img/bg/b2.jpg);
    // body.setAttribute('style', 'background-image: url(/img/bg/' + i + '.jpg)');
}





var str = '贤不肖，譬如鼠，所自处';
var i = 0;
function typing() {
    var divTyping = document.getElementById('main-title');
    if (i <= str.length) {
        divTyping.innerHTML = str.slice(0, i++) + '_';
        setTimeout('typing()', 200);//递归调用
    }
    else {
        divTyping.innerHTML = str;//结束打字,移除 _ 光标
    }
}
// typing();
// description


var str2 = '贤不肖，譬如鼠，所自处';
var j = 0;
function typing2() {
    var divTyping = document.getElementsByClassName('description')[0];
    if (j <= str2.length) {
        divTyping.innerHTML = str2.slice(0, j++) + '_';
        setTimeout('typing2()', 200);//递归调用
    }
    else {
        divTyping.innerHTML = str2;//结束打字,移除 _ 光标
    }
}