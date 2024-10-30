const fs = require('fs');

const TiKu = [ "P", "B", "CF", "AT", "SP", "UVA" ];
let result = [];
let count = 0;

function work(T) {
    
    const all = JSON.parse(fs.readFileSync(`./source/${T}.json`));
    
    const res = all.filter(e => {
        if (e.tags.includes(2) == false) return false;
        if (e.tags.includes(3) == false) return false;
        if ([0, 4, 5, 6].includes(e.difficulty) == false) return false;
        return true;
    });
    
    result.push(...res);
    ++ count;
    console.log("ok " + T + "题库共第" + res.length + "个");
    
}

function sol() {
    result.forEach(e => {
        console.log(e.pid + ',');
    });
}

function retest(fuc, time) {
    setTimeout(() => {
        if (count == TiKu.length) {
            fuc();
        } else {
            retest(fuc, time);
        }
    }, time);
}

function main() {
    TiKu.forEach(T => {
        work(T);
    });
    retest(sol, 1000);
}

main();