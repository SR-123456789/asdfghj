import { SaleListDomain } from "../domain/sale/sale-array";
import { SaleDomain } from "../domain/sale/sale.domain";

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
     * @param sellerId 売り手のID
     * @param itemId 商品のID
     * @param place 場所の情報（例: 店舗番号など）
     * @param cost コスト
     * @returns 登録された Sale オブジェクト
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


    /**
     * 登録されている全売上を取得する。
     * @returns Sale の配列
     */
    getAllSales(): Sale[] {
        return this.sales;
    }
}
