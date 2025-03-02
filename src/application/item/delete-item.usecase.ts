import { ItemRepository } from "../../infrastructure/item.repository";
import { SaleRepository } from "../../infrastructure/sale.repository";


export class ItemDeleteUseCase {
    /**
     * ItemRepository を注入して、削除処理のユースケースを構築します。
     * @param itemRepository 商品の永続化を担うリポジトリー
     */
    constructor(
        private readonly itemRepository: ItemRepository,
        private readonly saleRepository: SaleRepository
    ) { }

    /**
     * 指定された日付と商品IDに基づいて商品を削除します。
     *
     * もし削除前に特定の日付チェックや条件が必要な場合は、このメソッド内で追加してください。
     *
     * @param date 削除を実行する日付。必要に応じて削除条件のチェックに利用できます。
     * @param itemId 削除対象の商品のID
     * @returns 削除が成功した場合は true を返します。該当商品が存在しない場合などは false を返します。
     */
    execute(date: Date, itemId: number) {
        // 例: 日付による削除制限等のビジネスロジックが必要であればここに追加する

        const item = this.itemRepository.getItemById(itemId);
        if (item === undefined) {
            console.log("delete-item: no such item");
            return;
        }

        const sales = this.saleRepository.getInCompleteSalesByItemId(itemId, date);
        if (!sales.isEmpty()) {
            console.log("delete-item: sales in progress");
            return
        }
        this.itemRepository.deleteItem(itemId);
        console.log("delete-item: ok")
    }
}