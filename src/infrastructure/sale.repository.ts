import { SaleListDomain } from "../domain/sale/sale-list.domain";
import { SaleDomain } from "../domain/sale/sale.domain";
import { isSameDay } from "../functions/common";

export interface Sale {
    id: number;
    sellerId: number;
    itemId: number;
    price: number;
    cost: number;
    createDate: Date;
    isComplete: boolean;
    disabled: boolean;
    completeDate: Date | null;
}

export class SaleRepository {
    private sales: Sale[] = [];
    private currentId: number = 1;

    /**
     * 売上を登録し、登録された売上情報を返す。
    * @param sellerId 売り手のID。売上を担当する担当者や店舗を識別するためのIDです。
    * @param itemId 商品のID。売上対象となる商品の識別子です。
    * @param price 売上の価格。実際に販売された商品の価格を示します。
    * @param cost コスト。商品の原価や販売に関連する費用を示します。
    * @param createDate 売上の作成日時。売上が記録された日時を指定します。
    * @returns 登録された Sale オブジェクト。自動採番されたIDおよび提供されたパラメーターが設定されたオブジェクトを返します。
    */
    addSale(sellerId: number, itemId: number, price: number, cost: number, createDate: Date): Sale {
        const newSale: Sale = {
            id: this.currentId++,
            sellerId,
            itemId,
            price,
            cost,
            createDate,
            isComplete: false,
            disabled: false,
            completeDate: null,
        };
        this.sales.push(newSale);
        return newSale;
    }

    getCompleteSalesByItemId(itemId: number): SaleListDomain {
        return new SaleListDomain(
            this.sales
                .filter(sale => sale.itemId === itemId && sale.isComplete)
                .map(sale => new SaleDomain(sale))
        );
    }

    getSalesBySellerId(sellerId: number): SaleListDomain {
        return new SaleListDomain(
            this.sales
                .filter(sale => sale.sellerId === sellerId)
                .map(sale => new SaleDomain(sale))
        );
    }

    getSaleById(saleId: number): SaleDomain {
        return new SaleDomain(this.sales.find(sale => sale.id === saleId) || null);
    }

    update(updatedSale: Sale): void {
        this.sales = this.sales.map(sale => {
            if (sale.id === updatedSale.id) {
                return updatedSale;
            }
            return sale;
        });
    }

    updateFromSaleList(updatedSaleList: SaleListDomain): void {
        const updatedNativeSales = updatedSaleList.toNative();
        updatedNativeSales.forEach(updatedSale => {
            this.update(updatedSale);
        });
    }

    getInCompleteSalesByItemId(itemId: number,date:Date): SaleListDomain {
        return new SaleListDomain(
            this.sales
                .filter(sale => sale.itemId === itemId&&!sale.isComplete&&!sale.disabled&&isSameDay(sale.createDate,date))
                .map(sale => new SaleDomain(sale))
        );
    }

    getCompleteSales(): SaleListDomain {
        return new SaleListDomain(
            this.sales
                .filter(sale => sale.isComplete)
                .map(sale => new SaleDomain(sale))
        );
    }


    /**
     * 登録されている全売上を取得する。
     * @returns Sale の配列
     */
    getAllSales(): Sale[] {
        return this.sales;
    }
}
