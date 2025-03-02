import { Sale } from "../../infrastructure/sale.repository";
import { SaleDomain } from "./sale.domain";

export class SaleListDomain {
  constructor(private sales: SaleDomain[]) { }

  toNative(): Sale[] {
    return this.sales.map(saleDomain => saleDomain.toNative())
      .filter((sale): sale is Sale => sale !== null);
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
    return new SaleListDomain(
      this.sales
        .map(sale => {
          const nativeSale = sale.toNative();
          if (nativeSale === null) return null;
          const disabledSale: Sale = { ...nativeSale, disabled: true };
          return new SaleDomain(disabledSale);
        })
        // 型ガードを使用して null を確実に除外する
        .filter((sale): sale is SaleDomain => sale !== null)
    );
  }


  isEmpty(): boolean {
    return (
      !this.sales ||
      this.sales.length === 0 ||
      this.sales.every(item => item === null)
    );
  }


}
