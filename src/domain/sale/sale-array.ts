import { Sale } from "../../infrastructure/sale.repository";
import { SaleDomain } from "./sale.domain";

export class SaleListDomain {
  constructor(private sales: SaleDomain[]) { }

  /**
   * 売上データを追加する。
   * @param sale 追加する売上データ
   * if(this.sales.length === 0) return 0; これ絶対忘れないように
   */

  toNative(): Sale[] {
    return this.sales.map(saleDomain => saleDomain.toNative()).filter(sale => sale !== null);
  }

  calculateNewRate(newPrice: number, newCost: number): number {

    const currentTotalPrice = this.sales.reduce((sum, sale) => sum + (sale.price ?? 0), 0);
    const currentTotalCost = this.sales.reduce((sum, sale) => sum + (sale.cost ?? 0), 0);
    const newTotalPrice = currentTotalPrice + newPrice;
    if (newTotalPrice === 0) return 0;
    const rate = (newTotalPrice - (currentTotalCost + newCost)) / newTotalPrice;
    return rate;
  }

  getIncompleteSales(): SaleListDomain {
    return new SaleListDomain(this.sales.filter(sale => !sale.isComplete));
  }

  getChangeDisabled(): SaleListDomain {
    return new SaleListDomain(this.sales
      .map(sale => {
        const nativeSale = sale.toNative();
        if (nativeSale === null) return null;
        const disabledSale = { ...nativeSale, disabled: true };
        return new SaleDomain(disabledSale);
      })
      .filter((sale) => sale !== null));
  }



}
