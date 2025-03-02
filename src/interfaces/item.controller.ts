import { ItemDeleteUseCase } from "../application/item/delete-item.usecase";
import { ItemAddUseCase } from "../application/item/item-add.usecase";
import { ItemMarginUseCase } from "../application/item/item-margin.usecase";


export class ItemController {
  constructor(
    private readonly itemAddUseCase: ItemAddUseCase,
    private readonly itemDeleteUseCase: ItemDeleteUseCase,
    private readonly ItemMarginUseCase: ItemMarginUseCase
  ) { }

  /**
   * 商品登録処理を実施するコントローラメソッド
   * @param name 登録する商品の名前
   * @returns 登録された Item オブジェクト
   */
  registerItem(date: Date, name: string, cost: number, retail: number, rate: number): void {
    this.itemAddUseCase.execute(date, name, cost, retail, rate);
    // console.log("Item registered:", item);
    return;
  }

  deleteItem(date: Date, itemId: number): void {
    this.itemDeleteUseCase.execute(date, itemId);
    return;
  }

  getSortedMarginItems(data:Date): void {
    this.ItemMarginUseCase.execute();
    // console.log("Item registered:", item);
    return;
  }

}