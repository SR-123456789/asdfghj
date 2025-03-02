import { SaleListDomain } from "../../domain/sale/sale-list.domain";
import { calculateProfitMargin, roundToFourthDecimal } from "../../functions/common";
import { Sale } from "../../infrastructure/sale.repository";
import { SaleRepository } from "../../infrastructure/sale.repository";
import { Seller, SellerRepository } from "../../infrastructure/seller.repository";

/**
 * 売り手ごとの利益率情報を取得するユースケース
 */
export class SellerMarginUseCase {
    /**
     * コンストラクタ
     * @param saleRepository 売上データの永続化を担うリポジトリー
     */
    constructor(
        private readonly saleRepository: SaleRepository,
        private readonly sellerRepository: SellerRepository
    ) { }

    /**
     * 売り手ごとの利益率情報の配列を、利益率の高い順に返します。
     *
     * @returns { sellerId: number; margin: number }[] 売り手ごとの利益率情報の配列
     */
    execute(): void {
        // すべての売上データを取得
        const sellers = this.sellerRepository.getAllSellers();
        const sales: SaleListDomain = this.saleRepository.getCompleteSales();

        const result = this.calculateProfitMargins(sellers, sales.toNative());
        console.log(`get-margin-sellers:`)
        result.forEach((v) => {
            console.log(`${v.itemId} ${v.name} ${roundToFourthDecimal(v.profitMargin)}`)
        }
        )

    }

    private calculateProfitMargins = (
        sellers: Seller[],
        sales: Sale[]
    ): { itemId: number; profitMargin: number; name: string }[] => {
        // 各商品ごとの利益率を計算して、オブジェクトの配列に変換
        const results = sellers.map(seller => {
            // 対象商品に紐づく売上を抽出
            const itemSales = sales.filter(sale => sale.sellerId === seller.id);
            let profitMargin = 0;

            if (itemSales.length > 0) {
                // 売上の合計価格と合計コストを計算
                const totalPrice = itemSales.reduce((sum, sale) => sum + sale.price, 0);
                const totalCost = itemSales.reduce((sum, sale) => sum + sale.cost, 0);
                profitMargin = calculateProfitMargin(totalPrice, totalCost);
            }

            return { itemId: seller.id, profitMargin, name: seller.name };
        });

        // 利益率の降順にソート
        results.sort((a, b) => b.profitMargin - a.profitMargin);
        return results;
    };
}
