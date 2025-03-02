"use strict";
function main(lines) {
    let n, m, x, y, tableSizes, groupSizes;

    //数値を代入
    lines.forEach((v, i) => {
        if (i === 0) {
            [n, m, x, y] = v.split(" ").map(Number);
        } else if (i === 1) {
            tableSizes = v.split(" ").map(Number);
        } else if (i === 2) {
            groupSizes = v.split(" ").map(Number);
        }
    });

    if(!n || !m || !x || !y || !tableSizes || !groupSizes) return;

    // テーブルのパターン数
    const maxMask = Math.pow(2, n);

    //テーブルの使用状況と使用座席数・使用テーブル数のパターンを記録する配列定義
    const sumOfChairSubset = new Array(maxMask).fill(0);
    const countOfTableSubset = new Array(maxMask).fill(0);


    //各テーブル使用パターンと使用座席数・使用テーブル数のパターンを記録 
    for (let s = 0; s < maxMask; s++) {
        let chair = 0;
        let table = 0;
        for (let j = 0; j < n; j++) {
            if ((s >> j) & 1) {
                chair += tableSizes[j];
                table++;
            }
        }
        countOfTableSubset[s] = table;
        sumOfChairSubset[s] = chair;
    }

    //各グループ*テーブル全パターンの好感度記録用の2次元配列
    const costForGroup = Array.from({ length: m }, () => new Array(maxMask).fill(Infinity));

    //グループごとに好感度計算
    for (let i = 0; i < m; i++) {
        for (let s = 0; s < maxMask; s++) {
            if (sumOfChairSubset[s] >= groupSizes[i]) {
                costForGroup[i][s] = (countOfTableSubset[s] - 1) * y;
            }
        }
    }


    //動的計画法の配列定義
    const dp = Array.from({ length: m + 1 }, () => new Array(maxMask).fill(Infinity));
    dp[0][0] = 0;

    //動的計画法で擬似的に全パターンを検証
    for (let i = 0; i < m; i++) {
        for (let mask = 0; mask < maxMask; mask++) {
            const baseCost = dp[i][mask];
            if (baseCost === Infinity) continue;

            dp[i + 1][mask] = Math.min(dp[i + 1][mask], baseCost + groupSizes[i] * x);


            const freeMask = ((1 << n) - 1) ^ mask;
            let s = freeMask;
            while (true) {
                const costSeat = costForGroup[i][s];
                if (costSeat !== Infinity) {
                    const newMask = mask | s;
                    dp[i + 1][newMask] = Math.min(dp[i + 1][newMask], baseCost + costSeat);
                }
                if (s === 0) break;
                s = (s - 1) & freeMask;
            }
        }
    }
    let ans = Infinity;
    for (let mask = 0; mask < maxMask; mask++) {
        ans = Math.min(ans, dp[m][mask]);
    }
    console.log(ans);
}

function runWithStdin() {
    let input = "";
    process.stdin.resume();
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (v) => {
        input += v;
    });
    process.stdin.on("end", () => {
        main(input.trim().split("\n"));
    });
}

runWithStdin();