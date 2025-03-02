// sale.domain.ts

import { isSameDay } from "../../functions/common";
import { Sale } from "../../infrastructure/sale.repository";

export class SaleDomain {
    constructor(private sale: Sale | null) { }

    // 例として、sale が存在しない場合は 0 を返す getter
    get id(): number {
        return this.sale ? this.sale.id : 0;
    }

    // その他の getter やビジネスロジック
    get sellerId(): number | null {
        return this.sale?.sellerId || null;
    }

    get itemId(): number | null {
        return this.sale ? this.sale.itemId : null;
    }

    get price(): number | null {
        return this.sale ? this.sale.price : null;
    }

    get cost(): number | null {
        return this.sale ? this.sale.cost : null;
    }

    get disabled(): boolean | null {
        return this.sale ? this.sale.disabled : null;
    }

    get isComplete(): boolean | null {
        return this.sale ? this.sale.isComplete : null;
    }


    toNative(): Sale|null  {
        if (this.sale===null) return null;
        return {
            id: this.sale.id,
            sellerId: this.sale.sellerId,
            itemId: this.sale.itemId,
            price: this.sale.price,
            cost: this.sale.cost,
            createDate: this.sale.createDate,
            isComplete: this.sale.isComplete,
            disabled: this.sale.disabled,
            completeDate: this.sale.completeDate,
        };
    }



    // sale が存在するかどうかの判定
    isExists(): boolean {
        return this.sale !== null;
    }

    // 例: 完了状態にするメソッド（saleが存在する場合のみ処理）
    completeSale(executeDate: Date): Sale {
        if (!this.sale) {
            throw new Error("isExitsで存在チェックしてください");
        }
        if (this.sale.isComplete) {
            throw new Error("購入完了済み");
        }
        // オブジェクトのスプレッド構文でコピーし、更新した値を上書きする
        const updatedSale: Sale = {
            ...this.sale,
            isComplete: true,
            completeDate: executeDate,
        };
        return updatedSale;
    }

    isLapseSale(executeDate: Date): boolean {


        if (!this.sale) {
            throw new Error("isExitsで存在チェックしてください");
        };

        if (this.sale.isComplete || this.sale.disabled || !isSameDay(this.sale.createDate, executeDate)) {
            return true;
        }

        return false;
    }

    // 内部の Sale オブジェクトを取得（存在しなければ null を返す）
    toSale(): Sale | null {
        return this.sale;
    }
}
