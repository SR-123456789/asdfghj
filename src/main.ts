// main.ts
import { SellerRepository } from "./infrastructure/seller.repository";
import { SellerAddUseCase } from "./application/seller-add.usecase";
import { SellerController } from "./interfaces/seller.controller";
import { parseDate, StringToArray } from "./functions/common";
import { ItemRepository } from "./infrastructure/item.repository";
import { ItemAddUseCase } from "./application/item/item-add.usecase";
import { ItemController } from "./interfaces/item.controller";

function main(lines: string[]) {

    let rate: number | null = null;
    let sellerNumber: number | null = null;
    let queryNumber: number | null = null;

    //クエリ名
    const REGISTER_ITEM = "register-item:"
    const REQUEST_SELLER = "request-sale:"

    //クエリ内入力順
    const QUERY_KIND=0

    // 依存性の手動注入
    const sellerRepository = new SellerRepository();
    const sellerAddUseCase = new SellerAddUseCase(sellerRepository);
    const sellerController = new SellerController(sellerAddUseCase);

    const itemRepository = new ItemRepository();
    const itemAddUseCase = new ItemAddUseCase(itemRepository);
    const itemController = new ItemController(itemAddUseCase);

    lines.forEach((v, i) => {
        if (i === 0) {
            rate = Number(v);
            return;
        }
        if (i === 1) {
            sellerNumber = Number(v);
            return;
        }
        if (!sellerNumber) return;

        if (i < sellerNumber + 2) {
            sellerController.addSeller(v);
            return;
        }
        if (i === sellerNumber + 2) {
            queryNumber = Number(v);
            return;
        }
        if (!queryNumber) return;


        const queryArray = StringToArray(v);
        // console.log(queryArray)
        if (queryArray[QUERY_KIND] === REGISTER_ITEM) {
            itemController.registerItem(parseDate(queryArray[1].toString()), queryArray[2].toString(), Number(queryArray[3]), Number(queryArray[4]));
        }

        if (queryArray[QUERY_KIND] === REQUEST_SELLER) {
            
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
            resolve(data.split("\n").filter(line => line.trim() !== ""));
        });
    });
}

readFromStdin().then(main);
