import { ItemRepository } from "../../infrastructure/item.repository";
import { SaleRepository } from "../../infrastructure/sale.repository";

export interface SaleRequest {
    // 売上のリクエスト情報（必要に応じて項目を追加してください）
    saleDate: Date;
    itemId: number;
    quantity: number;
    total: number;
}

export class SaleRequestUseCase {
    constructor(
        private readonly itemRepository: ItemRepository,
        private readonly saleRepository: SaleRepository,
    ) { }

    /**
     * 売上リクエストの処理を実施する。
     * ※実際はここでレポジトリーにアクセスするなどの処理を行いますが、現時点ではリクエストをそのまま返します。
     * @param request 売上リクエスト情報
     * @returns 処理結果（今回は入力値そのまま）
     */

    execute(date: Date, sellerId: number, itemId: number, price: number, rate: number): void {


        const allSellersSellList= this.saleRepository.getSalesBySellerId(sellerId);
        const disableChangeSellList = allSellersSellList.getIncompleteSales().getChangeDisabled();
        this.saleRepository.updateFromSaleList(disableChangeSellList);

        const item = this.itemRepository.getItemById(itemId);
        if (item === undefined) {
            console.log("request-sale: no such item");
            return;
        }

        // console.log(item)
        
        if (!this.canSellItem(price, item.cost, item.retail, itemId, sellerId, rate)) return

        const newSale = this.saleRepository.addSale(sellerId, itemId, price, item.cost, date);
        console.log(`request-sale: ${newSale.id}`)
    }

    private canSellItem(price: number, cost: number, retail: number, itemId: number, sellerId: number, rate: number): boolean {

        const saleListBySailer = this.saleRepository.getSalesBySellerId(sellerId);


        if (price > retail) {
            console.log("request-sale: too expensive price");
            return false;
        }

        if (price === retail) {
            return true;
        }

        const itemSaleListByItem = this.saleRepository.getCompleteSalesByItemId(itemId);
        // console.log(price > cost, itemSaleListByItem.calculateNewRate(price, cost) > rate, saleListBySailer.calculateNewRate(price, cost) > rate)
        if (price > cost && itemSaleListByItem.calculateNewRate(price, cost) > rate && saleListBySailer.calculateNewRate(price, cost) > rate) {
            return true;
        }

        console.log("request-sale: too cheap price");
        return false;
    }
}
