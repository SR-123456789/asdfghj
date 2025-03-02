import { Item } from "../../infrastructure/item.repository";

  /**
   * ItemDomain クラスは、Item に対するドメインロジック（例：利益率計算）を提供します。
   */
  export class ItemDomain {
    constructor(private item: Item) {}
  
    /** 商品ID を返します。 */
    get id(): number {
      return this.item.id;
    }
  
    /** 商品名 を返します。 */
    get name(): string {
      return this.item.name;
    }
  
    /** 登録日時 を返します。 */
    get date(): Date {
      return this.item.date;
    }
  
    /** 原価 を返します。 */
    get cost(): number {
      return this.item.cost;
    }
  
    /** 販売価格 を返します。 */
    get retail(): number {
      return this.item.retail;
    }
  
    /**
     * 利益率 (Profit Margin) を計算して返します。
     * 計算式: (retail - cost) / retail
     * retail が 0 の場合は 0 を返します。
     *
     * @returns 利益率 (例: 0.2 → 20%)
     */
    getProfitMargin(): number {
      if (this.item.retail === 0) return 0;
      return (this.item.retail - this.item.cost) / this.item.retail;
    }
  
    /**
     * 内部の Item オブジェクトをそのまま返します。
     *
     * @returns ネイティブな Item オブジェクト
     */
    toNative(): Item {
      return this.item;
    }
  }
  