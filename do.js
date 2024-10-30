const fs = require('fs');

const url1 = "https://www.luogu.com.cn/problem/list?&type="
const url2 = "&page="

async function getpage(T, i) {
    return await fetch(url1 + T + url2 + i, {
        headers: [
            ["x-luogu-type", "content-only"],
        ],
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    }).catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
}

async function work(T) {
    const all = await getpage(T, 1);
    
    let result = [];
    const n = all.currentData.problems.count;
    const m = Math.ceil(n / 50);
    console.log(`题库 ${T} 共记 ${n} 条 ${m} 页`);
    for (let i = 1; (i - 1) * 50 < n; ++ i) {
        console.log(`正在获取题库 ${T} 第 ${i} / ${m} 页`);
        const res = await getpage(T, i);
        result.push(...res.currentData.problems.result);
    }
    
    fs.writeFile(`./source/${T}.json`, JSON.stringify(result), (err) => {});
}

function main() {
    const TiKu = [ "P", "B", "CF", "AT", "SP", "UVA" ];
    TiKu.forEach(T => {
        work(T);
    });
}

main();