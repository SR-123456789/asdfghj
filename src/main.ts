import { SellerAddUseCase } from "./application/seller-add.usecase";
import { SellerRepository } from "./infrastructure/seller.repository";

function main(lines: string[]) {
    // このコードは標準入力と標準出力を用いたサンプルコードです。
    // このコードは好きなように編集・削除してもらって構いません。
    // lines.forEach((v, i) => console.log(`lines[${i}]: ${v}`));
    let rate: number | null = null
    let sellerNumber: number | null = null

    const sellerRepository = new SellerRepository();
    const sellerAddUseCase = new SellerAddUseCase(sellerRepository);

    lines.forEach((v, i) => {
        if (i === 0) {
            rate = Number(v);
            console.log("rate", rate)
            return; // 現在の反復処理を終了（continue の代わり）
        }
        if (i === 1) {
            sellerNumber = Number(v);
            console.log("人数", sellerNumber)
            return;
        }

        if (!sellerNumber) return;
        if (i < sellerNumber + 2) {
            sellerAddUseCase.execute(v);
            console.log("sellerNumber", v)
            return;
        }
    });
}

function readFromStdin(): Promise<string[]> {
    return new Promise(resolve => {
        let data: string = "";
        process.stdin.resume();
        process.stdin.setEncoding("utf8");

        process.stdin.on("data", d => {
            data += d;
        });
        process.stdin.on("end", () => {
            resolve(data.split("\n"));
        });
    })
}

readFromStdin().then(main)