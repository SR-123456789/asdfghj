// application/item-add.usecase.ts

import { Item, ItemRepository } from "../../infrastructure/item.repository";

export class ItemAddUseCase {
  constructor(private readonly itemRepository: ItemRepository) { }

  /**
   * 商品の登録を実施するユースケース
   * @param name 登録する商品の名前
   * @returns 登録された Item オブジェクト
   */
  execute(date: Date, name: string, cost: number, retail: number, rate: number): void {
    const alreadyItem = this.itemRepository.findItemByName(name);
    if (alreadyItem!==undefined) {
      console.log(`register-item: duplicated item`);
      return
    }
    const newRate = (retail - cost) / retail;
    if (newRate < rate) {
      console.log(`register-item: too cheap price`)
      return
    }
    const newItem = this.itemRepository.registerItem(date, name, cost, retail);
    console.log(`register-item: ${newItem.id}`);
  }
}
