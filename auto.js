function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
function TimeoutClick(button) {
    button.click();
}

async function Done(button) {
    button.click(); // 立即点击按钮
    setTimeout(async () => {
        console.log('等待5s');
        chrome.runtime.sendMessage({greeting: "goons"}, function(response) {
            console.log('收到来自后台的回复:');
        });
    }, 4800); // 设置5秒的延时
}

function myFunction() {
    console.log('执行中：正在评价');
    let formFrame = document.getElementById('WindowFrame8') ?? document.getElementById('WindowFrame3')
    let answerDiv = formFrame.contentWindow.document.getElementsByClassName('answerDiv')
    let answerTextarea = formFrame.contentWindow.document.getElementsByTagName('textarea');
    for (let i = 0; i < 16; ++i){
        setTimeout(TimeoutClick, i*1500, answerDiv[i].children[0].children[0]);
    }
    for (let i = 0; i < 2; ++i)
        answerTextarea[i].value = '暂无'

    let inputSubmit = formFrame.contentWindow.document.getElementsByTagName('table')[0].getElementsByTagName('tr')[1].getElementsByTagName('td')[0].children[0]
    setTimeout(Done, 17*1500, inputSubmit);
    
}

var elem;
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.greeting === "grade" || request.greeting === "next"){
        console.log('点击成功');
        let tr = WindowFrame3.contentWindow.document.getElementsByClassName('table_border'); // 确保这是正确的方式来访问元素

        if (tr.length > 0) {
            let 课程 = tr[0].children[0].children;
        
            for(let i = 1; i < 课程.length; ++i){
                elem = 课程[i].children[5].children[0];
                if(elem && elem.tagName === 'A' && elem.hasAttribute('href')){
                    elem.click();
                    console.log('elem依然存在');
                    //getData(elem.href);
                    setTimeout(myFunction, 1000);
                    sendResponse({farewell: "已点击链接"}); // 发送一个响应
                    break;
                }
            }
        }
    }
});
