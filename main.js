// ==UserScript==
// @name         保种统计
// @namespace    https://github.com/tanapok/Seeding-Statistics
// @version      1.0.4
// @description  Try this little tool and figure out the seed data!
// @author       tanapok
// @match        https://wintersakura.net/userdetails.php?id=*
// @match        https://carpt.net/userdetails.php?id=*
// @icon         https://download.wintersakura.net/uploads/2022/10/23/63551a96a6ddd.png
// @grant        none
// @license      GNU GPLv3
// ==/UserScript==

var siteData = [
	{
		siteName: 'WinterSakura',
		siteUrl: 'wintersakura.net',
		spiderModel: 'NexusPHP', // 此参数暂未使用
		siteGroups: ['-SakuraWEB', '-SakuraSUB', '-WS', '-WScode', '-Sakura Academic'],
		seedListSelector: '#ka1', // 做种列表区域选择器
		seedItemsSelector: 'table > tbody:first-child > tr:not(:first-child)', // 做种列表条目选择器
		seedTitleSelector: 'td:nth-child(2) > a:nth-child(1)',
		seedSizeSelector: 'td:nth-child(4)',
		seedersNumberSelector: 'td:nth-child(5)',
		seedUploadSizeSelector: 'td:nth-child(7)',
		seedDownloadSizeSelector: 'td:nth-child(8)',
		seedTimeSelector: 'td:nth-child(10)',
		hasPagination: true,
		nextPageButtonSelector: 'p.nexus-pagination:nth-child(3) > a:nth-child(2) > b:nth-child(1)',
		theLastPageFlagSelector: 'font.gray:nth-child(2) > b:nth-child(1)', // true for the end of pages
        theLastPageFlagText: '下一页',
		seedSize: 0,
        seedItemsNumber: 0,
		seedersNumber: 0,
		seedUploadSize: 0,
		seedDownloadSize: 0,
		seedTime: 0,
	},
	{
		siteName: 'CarPT',
		siteUrl: 'carpt.net',
		spiderModel: 'NexusPHP', // 此参数暂未使用
		siteGroups: ['-CarPT'],
		seedListSelector: '#ka1', // 做种列表区域选择器
		seedItemsSelector: 'table > tbody:first-child > tr:not(:first-child)', // 做种列表条目选择器
		seedTitleSelector: 'td:nth-child(2) > a:nth-child(1)',
		seedSizeSelector: 'td:nth-child(4)',
		seedersNumberSelector: 'td:nth-child(5)',
		seedUploadSizeSelector: 'td:nth-child(7)',
		seedDownloadSizeSelector: 'td:nth-child(8)',
		seedTimeSelector: 'td:nth-child(10)',
		hasPagination: true,
		nextPageButtonSelector: 'p.nexus-pagination:nth-child(3) > a:nth-child(2) > b:nth-child(1)',
		theLastPageFlagSelector: 'font.gray:nth-child(2) > b:nth-child(1)', // true for the end of pages
        theLastPageFlagText: '下一页',
		seedSize: 0,
        seedItemsNumber: 0,
		seedersNumber: 0,
		seedUploadSize: 0,
		seedDownloadSize: 0,
		seedTime: 0,
	},
	{
		siteName: 'Others', // 未找到对应站点时的默认值
		siteUrl: '',
		spiderModel: 'NexusPHP',
		siteGroups: ['-Others'],
		seedListSelector: '#ka1', // 做种列表区域选择器
		seedItemsSelector: 'table > tbody:first-child > tr:not(:first-child)', // 做种列表条目选择器
		seedTitleSelector: 'td:nth-child(2) > a:nth-child(1)',
		seedSizeSelector: 'td:nth-child(4)',
		seedersNumberSelector: 'td:nth-child(5)',
		seedUploadSizeSelector: 'td:nth-child(7)',
		seedDownloadSizeSelector: 'td:nth-child(8)',
		seedTimeSelector: 'td:nth-child(10)',
		hasPagination: false,
		nextPageButtonSelector: '',
		theLastPageFlagSelector: '', // true for the end of pages
        theLastPageFlagText: '下一页',
		seedSize: 0,
        seedItemsNumber: 0,
		seedersNumber: 0,
		seedUploadSize: 0,
		seedDownloadSize: 0,
		seedTime: 0,
	},
];

var siteName = '';
var siteIndex = -1;
var userID = '';
var seedList = undefined;
var seedListHash = []; // 已经爬取过的做种列表的哈希值数组
var notice = undefined;
var result = undefined;
var hasPagination = false;
var nextPageButton = undefined;
var theLastPageFlag = undefined;
var uiReady = false;
var theLastPageFlagText = '';

var ssContainer = undefined;
var ssBar = undefined;

// 初始化
function init() {
	let siteUrl = window.location.href;
    // 获取站点名称及对应的索引
    for (let i = 0; i < siteData.length; i++) {
        if (siteUrl.indexOf(siteData[i].siteUrl) !== -1) {
        siteName = siteData[i].siteName;
        siteIndex = i;
        hasPagination = siteData[siteIndex].hasPagination;
        theLastPageFlagText = siteData[siteIndex].theLastPageFlagText;
        break;
        }
    }
        console.log('siteName:', siteName);
    // 从网址中匹配 userID
    let reg = /id=(\d+)/;
    let result = reg.exec(siteUrl);
    if (result) {
        userID = result[1];
    }
    console.log('userID:', userID);
}

/* MD5 哈希函数 */
/*
 * JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
!function(n){"use strict";function d(n,t){var r=(65535&n)+(65535&t);return(n>>16)+(t>>16)+(r>>16)<<16|65535&r}function f(n,t,r,e,o,u){return d((u=d(d(t,n),d(e,u)))<<o|u>>>32-o,r)}function l(n,t,r,e,o,u,c){return f(t&r|~t&e,n,t,o,u,c)}function g(n,t,r,e,o,u,c){return f(t&e|r&~e,n,t,o,u,c)}function v(n,t,r,e,o,u,c){return f(t^r^e,n,t,o,u,c)}function m(n,t,r,e,o,u,c){return f(r^(t|~e),n,t,o,u,c)}function c(n,t){var r,e,o,u;n[t>>5]|=128<<t%32,n[14+(t+64>>>9<<4)]=t;for(var c=1732584193,f=-271733879,i=-1732584194,a=271733878,h=0;h<n.length;h+=16)c=l(r=c,e=f,o=i,u=a,n[h],7,-680876936),a=l(a,c,f,i,n[h+1],12,-389564586),i=l(i,a,c,f,n[h+2],17,606105819),f=l(f,i,a,c,n[h+3],22,-1044525330),c=l(c,f,i,a,n[h+4],7,-176418897),a=l(a,c,f,i,n[h+5],12,1200080426),i=l(i,a,c,f,n[h+6],17,-1473231341),f=l(f,i,a,c,n[h+7],22,-45705983),c=l(c,f,i,a,n[h+8],7,1770035416),a=l(a,c,f,i,n[h+9],12,-1958414417),i=l(i,a,c,f,n[h+10],17,-42063),f=l(f,i,a,c,n[h+11],22,-1990404162),c=l(c,f,i,a,n[h+12],7,1804603682),a=l(a,c,f,i,n[h+13],12,-40341101),i=l(i,a,c,f,n[h+14],17,-1502002290),c=g(c,f=l(f,i,a,c,n[h+15],22,1236535329),i,a,n[h+1],5,-165796510),a=g(a,c,f,i,n[h+6],9,-1069501632),i=g(i,a,c,f,n[h+11],14,643717713),f=g(f,i,a,c,n[h],20,-373897302),c=g(c,f,i,a,n[h+5],5,-701558691),a=g(a,c,f,i,n[h+10],9,38016083),i=g(i,a,c,f,n[h+15],14,-660478335),f=g(f,i,a,c,n[h+4],20,-405537848),c=g(c,f,i,a,n[h+9],5,568446438),a=g(a,c,f,i,n[h+14],9,-1019803690),i=g(i,a,c,f,n[h+3],14,-187363961),f=g(f,i,a,c,n[h+8],20,1163531501),c=g(c,f,i,a,n[h+13],5,-1444681467),a=g(a,c,f,i,n[h+2],9,-51403784),i=g(i,a,c,f,n[h+7],14,1735328473),c=v(c,f=g(f,i,a,c,n[h+12],20,-1926607734),i,a,n[h+5],4,-378558),a=v(a,c,f,i,n[h+8],11,-2022574463),i=v(i,a,c,f,n[h+11],16,1839030562),f=v(f,i,a,c,n[h+14],23,-35309556),c=v(c,f,i,a,n[h+1],4,-1530992060),a=v(a,c,f,i,n[h+4],11,1272893353),i=v(i,a,c,f,n[h+7],16,-155497632),f=v(f,i,a,c,n[h+10],23,-1094730640),c=v(c,f,i,a,n[h+13],4,681279174),a=v(a,c,f,i,n[h],11,-358537222),i=v(i,a,c,f,n[h+3],16,-722521979),f=v(f,i,a,c,n[h+6],23,76029189),c=v(c,f,i,a,n[h+9],4,-640364487),a=v(a,c,f,i,n[h+12],11,-421815835),i=v(i,a,c,f,n[h+15],16,530742520),c=m(c,f=v(f,i,a,c,n[h+2],23,-995338651),i,a,n[h],6,-198630844),a=m(a,c,f,i,n[h+7],10,1126891415),i=m(i,a,c,f,n[h+14],15,-1416354905),f=m(f,i,a,c,n[h+5],21,-57434055),c=m(c,f,i,a,n[h+12],6,1700485571),a=m(a,c,f,i,n[h+3],10,-1894986606),i=m(i,a,c,f,n[h+10],15,-1051523),f=m(f,i,a,c,n[h+1],21,-2054922799),c=m(c,f,i,a,n[h+8],6,1873313359),a=m(a,c,f,i,n[h+15],10,-30611744),i=m(i,a,c,f,n[h+6],15,-1560198380),f=m(f,i,a,c,n[h+13],21,1309151649),c=m(c,f,i,a,n[h+4],6,-145523070),a=m(a,c,f,i,n[h+11],10,-1120210379),i=m(i,a,c,f,n[h+2],15,718787259),f=m(f,i,a,c,n[h+9],21,-343485551),c=d(c,r),f=d(f,e),i=d(i,o),a=d(a,u);return[c,f,i,a]}function i(n){for(var t="",r=32*n.length,e=0;e<r;e+=8)t+=String.fromCharCode(n[e>>5]>>>e%32&255);return t}function a(n){var t=[];for(t[(n.length>>2)-1]=void 0,e=0;e<t.length;e+=1)t[e]=0;for(var r=8*n.length,e=0;e<r;e+=8)t[e>>5]|=(255&n.charCodeAt(e/8))<<e%32;return t}function e(n){for(var t,r="0123456789abcdef",e="",o=0;o<n.length;o+=1)t=n.charCodeAt(o),e+=r.charAt(t>>>4&15)+r.charAt(15&t);return e}function r(n){return unescape(encodeURIComponent(n))}function o(n){return i(c(a(n=r(n)),8*n.length))}function u(n,t){return function(n,t){var r,e=a(n),o=[],u=[];for(o[15]=u[15]=void 0,16<e.length&&(e=c(e,8*n.length)),r=0;r<16;r+=1)o[r]=909522486^e[r],u[r]=1549556828^e[r];return t=c(o.concat(a(t)),512+8*t.length),i(c(u.concat(t),640))}(r(n),r(t))}function t(n,t,r){return t?r?u(t,n):e(u(t,n)):r?o(n):e(o(n))}"function"==typeof define&&define.amd?define(function(){return t}):"object"==typeof module&&module.exports?module.exports=t:n.md5=t}(this);

// 判断页面是否包含做种列表且未爬取过
function checkPage() {
    seedList = document.querySelector(siteData[siteIndex].seedListSelector);
    if (seedList.innerHTML != '') {
        // 判断是否已经爬取过
        let seedListHashValue = md5(seedList.innerHTML);
        if (seedListHash.indexOf(seedListHashValue) === -1) {
            seedListHash.push(seedListHashValue);
            return true;
        }
    }
    return false;
}

// 通过 seedList 判断是否有下一页，若有，点击下一页按钮，返回 true，否则返回 false
function hasNextPage() {
    if (siteData[siteIndex].hasPagination) {
        theLastPageFlag = seedList.querySelectorAll(siteData[siteIndex].theLastPageFlagSelector);
        // 遍历 theLastPageFlag，若有一个包含 theLastPageFlagText，则说明是最后一页
        for (let i = 0; i < theLastPageFlag.length; i++) {
            if (theLastPageFlag[i].innerText.indexOf(siteData[siteIndex].theLastPageFlagText) !== -1) {
                return false;
            }
        }
        nextPageButton = seedList.querySelector(siteData[siteIndex].nextPageButtonSelector);
        nextPageButton.click();
        return true;
    }
    return false;
}

// 体积数组转为字节数
function sizeToBytes(size) {
    let sizeUnit = size[size.length - 1];
    let sizeNumber = size[0];
    let sizeUnits = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'BB', 'NB', 'DB', 'CB'];
    let sizeIndex = sizeUnits.indexOf(sizeUnit);
    if (sizeIndex !== -1) {
        return sizeNumber * Math.pow(1024, sizeIndex);
    }
    return 0;
}

// 字节数转换为可读的字符串
function bytesToSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    let k = 1024;
    let sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB', 'BiB', 'NiB', 'DiB', 'CiB'];
    let i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
}

// D:HH:MM:SS 或 HH:MM:SS 或 MM:SS 或 SS 转为秒数
function timeToSeconds(time) {
    let timeArray = time.split(':');
    let timeUnits = ['D', 'H', 'M', 'S'];
    let timeUnitSeconds = [86400, 3600, 60, 1];
    let seconds = 0;
    for (let i = 0; i < timeArray.length; i++) {
        seconds += timeArray[i] * timeUnitSeconds[i];
    }
    return seconds;
}

// 秒数转换为 D天HH时MM分SS秒 或 HH时MM分SS秒 或 MM分SS秒 或 SS秒
function secondsToTime(seconds) {
    let time = '';
    let timeArray = [];
    let timeUnits = ['天', '时', '分', '秒'];
    let timeUnitSeconds = [86400, 3600, 60, 1];
    for (let i = 0; i < timeUnitSeconds.length; i++) {
        let timeUnitNumber = Math.floor(seconds / timeUnitSeconds[i]);
        if (timeUnitNumber > 0) {
            timeArray.push(timeUnitNumber + timeUnits[i]);
            seconds -= timeUnitNumber * timeUnitSeconds[i];
        }
    }
    time = timeArray.join('');
    return time;
}

// 爬取数据
function spider() {
    // 爬取数据
	let items = seedList.querySelectorAll(siteData[siteIndex].seedItemsSelector);
	items.forEach((item) => {
		let title = item.querySelector(siteData[siteIndex].seedTitleSelector).title;
		let size = item.querySelector(siteData[siteIndex].seedSizeSelector).innerText.replace(',', '').split('\n');
		let seeders = Number(item.querySelector(siteData[siteIndex].seedersNumberSelector).innerText.replace(',', ''));
		let uploadSize = item.querySelector(siteData[siteIndex].seedUploadSizeSelector).innerText.replace(',', '').split('\n');;
		let downloadSize = item.querySelector(siteData[siteIndex].seedDownloadSizeSelector).innerText.replace(',', '').split('\n');;
		let time = item.querySelector(siteData[siteIndex].seedTimeSelector).innerText.replace('天', ':').replace('小时', ':').replace('分', ':').replace('秒', '').replace(',', ''); // D:HH:MM:SS
		// 将日志更新到 result 中
        appendResult('正在解析：' + title + '<br>');
        // 遍历 siteData 中的所有站点，查找 siteGroup 中的元素包含于 title 中的首个元素
        let finded = false;
        for (let i = 0; i < siteData.length; i++) {
            for (let j = 0; j < siteData[i].siteGroups.length; j++) {
                // 不区分大小写
                if (title.toLowerCase().indexOf(siteData[i].siteGroups[j].toLowerCase()) !== -1) {
                    siteData[i].seedSize += sizeToBytes(size);
                    siteData[i].seedersNumber += seeders;
                    siteData[i].seedUploadSize += sizeToBytes(uploadSize);
                    siteData[i].seedDownloadSize += sizeToBytes(downloadSize);
                    siteData[i].seedTime += timeToSeconds(time);
                    siteData[i].seedItemsNumber++;
                    finded = true;
                    break;
                }
            }
            if (finded) {
                break;
            }
        }
        // 如果没找到，更新 Others 站点的数据
        if (!finded) {
            // 在 siteData 中找到 Others 站点的索引
            let othersIndex = siteData.findIndex((site) => {
                return site.siteName === 'Others';
            });
            siteData[othersIndex].seedSize += sizeToBytes(size);
            siteData[othersIndex].seedersNumber += seeders;
            siteData[othersIndex].seedUploadSize += sizeToBytes(uploadSize);
            siteData[othersIndex].seedDownloadSize += sizeToBytes(downloadSize);
            siteData[othersIndex].seedTime += timeToSeconds(time);
            siteData[othersIndex].seedItemsNumber++;
        }
        showResult('解析完成：' + title + '<br>');
	});
}

// 输出数据到表格
function outputData() {
    // 将站点名称和用户的 UID 输出到 result 中
    showResult('站点名称：' + siteData[siteIndex].siteName + '<br>');
    appendResult('用户 ID/UID：' + userID + '<br>');
    // 将 siteData 中所有站点的 做种数量 和 做种体积 输出到 result 中
    let totalSeedItemsNumber = 0;
    let totalSeedSize = 0;
    for (let i = 0; i < siteData.length; i++) {
        totalSeedItemsNumber += siteData[i].seedItemsNumber;
        totalSeedSize += siteData[i].seedSize;
    }
    appendResult('做种总量：' + totalSeedItemsNumber + '<br>');
    appendResult('做种总大小：' + bytesToSize(totalSeedSize) + '<br>');

    // 输出数据到表格（优先输出当前站点，然后依次输出其他站点）
    // 在同一行输出站点名称、做种数量、做种体积、平均做种人数、做种上传总量、做种下载总量、平均做种时间
    let table = document.createElement('table');
    table.innerHTML = '<tr><th>站点名称</th><th>做种数量</th><th>做种体积</th><th>平均做种人数</th><th>做种上传总量</th><th>做种下载总量</th><th>平均做种时间</th></tr>';
    // 输出当前站点（仅当 seedItemsNumber 不为 0 时）
    if (siteData[siteIndex].seedItemsNumber !== 0) {
        let tr = document.createElement('tr');
        tr.innerHTML = '<td>' + siteData[siteIndex].siteName + '</td><td>' + siteData[siteIndex].seedItemsNumber + '</td><td>' + bytesToSize(siteData[siteIndex].seedSize) + '</td><td>' + (siteData[siteIndex].seedersNumber / siteData[siteIndex].seedItemsNumber).toFixed(2) + '</td><td>' + bytesToSize(siteData[siteIndex].seedUploadSize) + '</td><td>' + bytesToSize(siteData[siteIndex].seedDownloadSize) + '</td><td>' + secondsToTime(siteData[siteIndex].seedTime / siteData[siteIndex].seedItemsNumber) + '</td>';
        table.appendChild(tr);
    }
    // 输出其他站点（仅当 seedItemsNumber 不为 0 时）
    for (let i = 0; i < siteData.length; i++) {
        if (i !== siteIndex && siteData[i].seedItemsNumber !== 0) {
            let tr = document.createElement('tr');
            tr.innerHTML = '<td>' + siteData[i].siteName + '</td><td>' + siteData[i].seedItemsNumber + '</td><td>' + bytesToSize(siteData[i].seedSize) + '</td><td>' + (siteData[i].seedersNumber / siteData[i].seedItemsNumber).toFixed(2) + '</td><td>' + bytesToSize(siteData[i].seedUploadSize) + '</td><td>' + bytesToSize(siteData[i].seedDownloadSize) + '</td><td>' + secondsToTime(siteData[i].seedTime / siteData[i].seedItemsNumber) + '</td>';
            table.appendChild(tr);
        }
    }
    // 将表格输出到 result 中
    appendResult(table.outerHTML);
    notice.style.backgroundColor = 'rgba(31,177,65,1)';
    notice.style.color = 'white';
}

/* UI 相关 */

// 向页面注入 UI
function injectUI() {
    let ssHTML = document.createElement('div');
    ssHTML.id = 'ss-container';
    ssHTML.innerHTML = `
    <div id="ss-high-friction-bar">
        <div class="ss-graph"></div>
        <div class="ss-graph"></div>
        <div class="ss-graph"></div>
        <div class="ss-graph"></div>
    </div>
    <div id="ss-notice">
        <span id="ss-notice-text"></span>
    </div>
    <div id="ss-result"></div>
    `;
    let ssCSS = document.createElement('style');
    ssCSS.innerHTML = `
    #ss-high-friction-bar {
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        margin-bottom: 6px;
        cursor: move;
    }
    .ss-graph {
        height: 1px;
        width: 60px;
        background-color: rgba(0, 0, 0, 0.1);
        margin-bottom: 2px;
    }
    #ss-container {
        font-family: "Helvetica Neue", Helvetica, Arial;
        font-size: 0.8rem;
        line-height: 1.45;
        color: rgba(0, 0, 0, 0.76);
        box-sizing: border-box;
        min-width: 20vw;
        max-width: 60vw;
        width: auto;
        height: auto;
        min-height: 15vh;
        max-height: 80vh;
        background-color: rgba(255, 255, 255, 0.96);
        position: fixed;
        left: 0;
        top: 0;
        border-radius: 6px;
        margin: 12px;
        padding: 12px;
        box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
        transition: box-shadow 0.1s ease-in-out;
        overflow: auto;
        z-index: 9999;
    }
    #ss-container:hover {
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.25);
        background-color: white;
    }
    #ss-notice {
        background-color: rgba(0, 0, 0, 0.05);
        width: fit-content;
        padding: 0.2rem;
        border-radius: 3px;
    }
    #ss-result {
        margin-top: 0.4rem;
    }
    #ss-result table {
        border-collapse: collapse;
        margin-top: 0.4rem;
    }
    #ss-result table, #ss-result th, #ss-result td {
        border: 0;
        /* background-color: rgba(4,150,255,1); */
    }
    #ss-result th {
        background-color: rgba(4, 142, 255, 0.96);
        color: rgba(255, 255, 255, 0.96);
    }
    #ss-result th, #ss-result td {
        text-align: left;
        padding: 0.2rem 1rem;
    }
    #ss-result tr:nth-child(odd) {
        background-color: rgba(0, 0, 0, 0.05);
    }
    #ss-result tr:nth-child(even) {
        background-color: rgba(0, 0, 0, 0.1);
    }
    #ss-result td {
        font-size: inherit;
    }
    `;
    document.body.appendChild(ssCSS);
    document.body.appendChild(ssHTML);
	notice = document.querySelector('#ss-notice');
	result = document.querySelector('#ss-result');
}
// 显示提示信息
function showNotice(text) {
	notice.style.display = 'block';
	notice.querySelector('#ss-notice-text').innerText = text;
}
// 隐藏提示信息
function hideNotice() {
	notice.style.display = 'none';
}
// 显示结果
function showResult(text) {
	result.style.display = 'block';
	result.innerHTML = text;
}
// 追加结果
function appendResult(text) {
    result.style.display = 'block';
    result.innerHTML += text;
}
// 隐藏结果
function hideResult() {
	result.style.display = 'none';
}
// UI 事件绑定
function bindUIActions() {
    ssContainer = document.querySelector("#ss-container");
    ssBar = document.querySelector("#ss-high-friction-bar");
    // 鼠标在 ssBar 上按下时，使 ssContainer 跟随鼠标移动
    ssBar.onmousedown = function (e) {
        let x = e.clientX - ssContainer.offsetLeft;
        let y = e.clientY - ssContainer.offsetTop;
        // 增大 ssContainer 的阴影效果
        ssContainer.style.boxShadow = "0 0 10px 5px rgba(0, 0, 0, 0.1)";
        document.onmousemove = function (e) {
            ssContainer.style.left = e.clientX - x - 12 + "px";
            ssContainer.style.top = e.clientY - y - 12 + "px";
            // 防止鼠标移出浏览器窗口
            if (e.clientX - x - 12 < 0) {
                ssContainer.style.left = 0;
            }
            if (e.clientY - y - 12 < 0) {
                ssContainer.style.top = 0;
            }
            if (e.clientX - x - 12 > document.documentElement.clientWidth - ssContainer.offsetWidth) {
                ssContainer.style.left = document.documentElement.clientWidth - ssContainer.offsetWidth + "px";
            }
            if (e.clientY - y - 12 > document.documentElement.clientHeight - ssContainer.offsetHeight) {
                ssContainer.style.top = document.documentElement.clientHeight - ssContainer.offsetHeight + "px";
            }
        }
    }
    // 鼠标松开时，停止移动
    document.onmouseup = function () {
        // 恢复 ssContainer 的阴影效果
        ssContainer.style.boxShadow = "0 0 5px 2px rgba(0, 0, 0, 0.1)";
        document.onmousemove = null;
    }
}


/* 主函数 */

(function() {
	'use strict';

    // 初始化
    init();
    // 持续判断页面是否包含做种列表
    let timer = setInterval(() => {
        console.log('Running...');
        if (checkPage()) {
            if (!uiReady) {
                injectUI();
                bindUIActions();
                uiReady = true;
            }
            showNotice('正在统计当前页数据，请稍候...');
            // 爬取数据
            spider();
            if(hasNextPage()) {
                showNotice('当前页面统计完成，稍后自动统计下一页');
            } else {
                showNotice('统计完成，若对结果不满意，可刷新页面后重新尝试');
                outputData();
                clearInterval(timer);
            }
        } else {
            if (uiReady) {
                showNotice('当前页面数据已统计过，有可能是没有数据，或需手动切换至下一页');
            }
        }
    }, 1000);
})();
