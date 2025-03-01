import { SaleList } from "../domain/sale/sale-array";

export interface Sale {
    id: number;
    sellerId: number;
    itemId: number;
    price: number;
    cost: number;
    date: Date;
    isComplete: boolean;
}

export class SaleRepository {
    private sales: Sale[] = [];
    private currentId: number = 1;

    /**
     * 売上を登録し、登録された売上情報を返す。
     * @param sellerId 売り手のID
     * @param itemId 商品のID
     * @param place 場所の情報（例: 店舗番号など）
     * @param cost コスト
     * @returns 登録された Sale オブジェクト
     */
    addSale(sellerId: number, itemId: number, price: number, cost: number, date: Date): Sale {
        const newSale: Sale = {
            id: this.currentId++,
            sellerId,
            itemId,
            price,
            cost,
            date,
            isComplete: false,
        };
        this.sales.push(newSale);
        return newSale;
    }

    getSalesByItemId(itemId: number): SaleList {
        return new SaleList(this.sales.filter(sale => sale.itemId === itemId));
    }
    getSalesBySellerId(sellerId: number): SaleList {
        return new SaleList(this.sales.filter(sale => sale.sellerId === sellerId));
    }

    /**
     * 登録されている全売上を取得する。
     * @returns Sale の配列
     */
    getAllSales(): Sale[] {
        return this.sales;
    }
}
