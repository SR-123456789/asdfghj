import { ItemDomain } from "./item.domain";
import { Item } from "../../infrastructure/item.repository"; // ※ パスはプロジェクト構成に合わせて変更してください

/**
 * ItemListDomain クラスは、ItemDomain の配列に対するドメインロジックを提供します。
 * 例として、利益率で降順にソートする機能を実装しています。
 */
export class ItemListDomain {
  constructor(private items: ItemDomain[]) {}

  /**
   * ItemDomain の配列を、利益率 (profit margin) の降順にソートした新しい ItemListDomain を返します。
   *
   * @returns 利益率の高い順にソートされた ItemListDomain
   */
  sortByProfitMarginDesc(): ItemListDomain {
    const sortedItems = [...this.items].sort((a, b) => b.getProfitMargin() - a.getProfitMargin());
    return new ItemListDomain(sortedItems);
  }

  /**
   * 内部の ItemDomain 配列から、ネイティブな Item オブジェクトの配列を返します。
   *
   * @returns Item の配列
   */
  toNative(): Item[] {
    return this.items.map(itemDomain => itemDomain.toNative());
  }
}
