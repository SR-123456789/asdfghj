// sale.complete.usecase.ts

import { SaleDomain } from "../../domain/sale/sale.domain";
import { isSameDay } from "../../functions/common";
import { Sale, SaleRepository } from "../../infrastructure/sale.repository";

export class SaleCompleteUseCase {
    constructor(private readonly saleRepository: SaleRepository) { }

    /**
     * 指定した売上IDの売上を完了状態に更新するユースケース
     * @param saleId 完了する売上のID
     * @returns 更新後の Sale オブジェクト、存在しなければ undefined
     */
    execute(saleId: number, executeDate: Date, operateSellerId: number): Sale | undefined {
        const sale: SaleDomain = this.saleRepository.getSaleById(saleId);

        if (!sale.isExists()) {
            console.log("complete-sale: no such sale")
            return
        }
        if (sale.sellerId !== operateSellerId) {
            console.log("complete-sale: unauthorized operation")
            return
        }

        if (sale.isLapseSale(executeDate)) {
            console.log("complete-sale: permission expired")
            return;
        }

        const updatedSale = sale.completeSale(executeDate);
        this.saleRepository.update(updatedSale);
        console.log(`complete-sale: ok`)
    }

}
