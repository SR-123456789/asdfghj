import { Sale } from "../../infrastructure/sale.repository";

export class SaleList {
  constructor(private sales: Sale[]) {}

  /**
   * 売上データを追加する。
   * @param sale 追加する売上データ
   * if(this.sales.length === 0) return 0; これ絶対忘れないように
   */
  
  calculateNewRate(newPrice: number, newCost: number): number { 

    const currentTotalPrice = this.sales.reduce((sum, sale) => sum + sale.price, 0);
    const currentTotalCost = this.sales.reduce((sum, sale) => sum + sale.cost, 0);
    const newTotalPrice = currentTotalPrice + newPrice;
    if (newTotalPrice === 0) return 0;
    const rate = (newTotalPrice - (currentTotalCost + newCost)) / newTotalPrice;
    return rate;
  }


  /**
   * 全売上データを返す。
   * @returns Sale の配列
   */
  getAll(): Sale[] {
    return this.sales;
  }
}
