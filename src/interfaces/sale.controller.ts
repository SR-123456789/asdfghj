import { SaleRequest, SaleRequestUseCase } from "../application/sale/sale.request.usecase";

export class SaleController {
    constructor(private readonly saleRequestUseCase: SaleRequestUseCase) { }

    /**
     * 売上リクエストを処理するコントローラメソッド
     * @param request 売上リクエスト情報
     * @returns 処理結果（SaleRequestUseCaseの戻り値）
     */
    requestSale(date: Date, sellerId: number, itemId: number, price: number, rate: number): void {
        const result = this.saleRequestUseCase.execute(date, sellerId, itemId, price, rate);
        // console.log("SaleController: 売上処理結果", result);
    }
}
