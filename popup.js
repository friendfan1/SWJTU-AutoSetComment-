let gradeButton = document.getElementsByTagName('button')[0];
gradeButton.onclick = function () {
    console.log('popup发送grade消息');
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        // 获取当前活动标签页的 ID
        let activeTab = tabs[0];
        let activeTabId = activeTab.id;
    
        // 向内容脚本发送消息
        chrome.tabs.sendMessage(activeTabId, { greeting: "grade" }, function(response) {
            if (response) {
                console.log("来自内容脚本的回复：", response.farewell);
            } else {
                console.log("没有收到回复或回复是未定义的");
            }
        });
    });
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.greeting === "goons"){
        console.log('popup发送grade消息');
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            // 获取当前活动标签页的 ID
            let activeTab = tabs[0];
            let activeTabId = activeTab.id;
        
            // 向内容脚本发送消息
            chrome.tabs.sendMessage(activeTabId, { greeting: "next" }, function(response) {
                if (response) {
                    console.log("来自内容脚本的回复：", response.farewell);
                } else {
                    console.log("没有收到回复或回复是未定义的");
                }
            });
        });
    }
});


