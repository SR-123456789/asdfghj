import { ItemRepository } from "../../infrastructure/item.repository";
import { SaleRepository } from "../../infrastructure/sale.repository";

export interface SaleRequest {
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
     * リクエストの処理を実施する。
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
