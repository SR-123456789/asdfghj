import { SellerRepository } from "./infrastructure/seller.repository";
import { SellerAddUseCase } from "./application/seller/seller-add.usecase";
import { SellerController } from "./interfaces/seller.controller";
import { parseDate, StringToArray } from "./functions/common";
import { ItemRepository } from "./infrastructure/item.repository";
import { ItemAddUseCase } from "./application/item/item-add.usecase";
import { ItemController } from "./interfaces/item.controller";
import { SaleRequestUseCase } from "./application/sale/sale-request.usecase";
import { SaleController } from "./interfaces/sale.controller";
import { SaleRepository } from "./infrastructure/sale.repository";
import { SaleCompleteUseCase } from "./application/sale/sale-complete.usecase";
import { ItemDeleteUseCase } from "./application/item/delete-item.usecase";
import { ItemMarginUseCase } from "./application/item/item-margin.usecase";
import { SellerMarginUseCase } from "./application/seller/seller-margin.usecase";

function main(lines: string[]) {

    let rate: number | null = null;
    let sellerNumber: number | null = null;
    let queryNumber: number | null = null;

    //クエリ名
    const REGISTER_ITEM = "register-item:"
    const REQUEST_SELLER = "request-sale:"
    const COMPLETE_SALE = "complete-sale:"
    const DELETE_ITEM = "delete-item:"
    const GET_MARGIN_ITEM="get-margin-items:"
    const GET_MARGIN_SELLER="get-margin-sales:"


    //クエリ内入力順
    const QUERY_KIND = 0


    // 依存性の注入
    const sellerRepository = new SellerRepository();
    const itemRepository = new ItemRepository();
    const saleRepository = new SaleRepository();

    const sellerAddUseCase = new SellerAddUseCase(sellerRepository); 
    const itemAddUseCase = new ItemAddUseCase(itemRepository);
    const saleRequestUseCase = new SaleRequestUseCase(itemRepository,saleRepository);
    const saleCompleteUseCase = new SaleCompleteUseCase(saleRepository);
    const itemDeleteUseCase = new ItemDeleteUseCase(itemRepository,saleRepository);
    const itemMarginUseCase = new ItemMarginUseCase(itemRepository,saleRepository);
    const sellerMarginUseCase = new SellerMarginUseCase(saleRepository,sellerRepository);

    const sellerController = new SellerController(sellerAddUseCase,sellerMarginUseCase);
    const saleController = new SaleController(saleRequestUseCase,saleCompleteUseCase);
    const itemController = new ItemController(itemAddUseCase,itemDeleteUseCase,itemMarginUseCase);


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
        if (!queryNumber||!rate) return;


        const queryArray = StringToArray(v);
        // console.log(queryArray)
        if (queryArray[QUERY_KIND] === REGISTER_ITEM) {
            itemController.registerItem(parseDate(queryArray[1].toString()), queryArray[2].toString(), Number(queryArray[3]), Number(queryArray[4]),rate);
            return
        }

        if (queryArray[QUERY_KIND] === REQUEST_SELLER) {
            saleController.requestSale(parseDate(queryArray[1].toString()), Number(queryArray[2]), Number(queryArray[3]), Number(queryArray[4]),rate);
            return
        }

        if (queryArray[QUERY_KIND] === COMPLETE_SALE) {
            saleController.completeSale(parseDate(queryArray[1].toString()), Number(queryArray[2]), Number(queryArray[3]));
            return
        }

        if (queryArray[QUERY_KIND] === DELETE_ITEM) {
            itemController.deleteItem(parseDate(queryArray[1].toString()), Number(queryArray[2]));
            return
        }

        if (queryArray[QUERY_KIND] === GET_MARGIN_ITEM) {
            itemController.getSortedMarginItems(parseDate(queryArray[1].toString()));
            return
        }

        if (queryArray[QUERY_KIND] === GET_MARGIN_SELLER) {
            itemController.getSortedMarginItems(parseDate(queryArray[1].toString()));
            return
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
