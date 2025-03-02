import { read } from "fs";
import { ItemListDomain } from "../../domain/item/item-list.domain";
import { Item, ItemRepository } from "../../infrastructure/item.repository";
import { Sale, SaleRepository } from "../../infrastructure/sale.repository";
import { calculateProfitMargin, roundToFourthDecimal } from "../../functions/common";

export class ItemMarginUseCase {
  /**
   * コンストラクタ
   * @param itemListDomain 利益率の計算やソート対象となるアイテムのドメインリスト
   */
  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly saleRepository: SaleRepository
  ) {
  }

  /**
   * 利益率でソートされたアイテムのリストを返します。
   *
   * @returns 利益率降順にソートされた ItemListDomain インスタンス
   */
  execute(): void {
    const itemListDomain = this.itemRepository.getAllItems();
    const result = this.calculateProfitMargins(itemListDomain.toNative(), this.saleRepository.getCompleteSales().toNative());
    console.log(`get-margin-items: ${result.length}`)
    result.forEach((v) => {
      console.log(`${v.itemId} ${v.name} ${roundToFourthDecimal(v.profitMargin)}`)
    })
  }

  private calculateProfitMargins = (
    items: Item[],
    sales: Sale[]
  ): { itemId: number; profitMargin: number; name: string }[] => {
    // 各商品ごとの利益率を計算して、オブジェクトの配列に変換
    const results = items.map(item => {
      // 対象商品に紐づく売上を抽出
      const itemSales = sales.filter(sale => sale.itemId === item.id);
      let profitMargin = 0;

      if (itemSales.length > 0) {
        // 売上の合計価格と合計コストを計算
        const totalPrice = itemSales.reduce((sum, sale) => sum + sale.price, 0);
        const totalCost = itemSales.reduce((sum, sale) => sum + sale.cost, 0);
        profitMargin = calculateProfitMargin(totalPrice, totalCost);
      }

      return { itemId: item.id, profitMargin, name: item.name };
    });

    // 利益率の降順にソート
    results.sort((a, b) => b.profitMargin - a.profitMargin);
    return results;
  };

}

