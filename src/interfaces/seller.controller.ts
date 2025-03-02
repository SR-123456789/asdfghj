import { SellerAddUseCase } from "../application/seller/seller-add.usecase";
import { SellerMarginUseCase } from "../application/seller/seller-margin.usecase";
import { Seller } from "../infrastructure/seller.repository";

export class SellerController {
  constructor(
    private readonly sellerAddUseCase: SellerAddUseCase,
    private readonly sellerMarginUseCase: SellerMarginUseCase
  ) {}

  addSeller(name: string): Seller {
    const seller = this.sellerAddUseCase.execute(name);
    // console.log("Seller added:", seller);
    return seller;
  }
  getSortedMarginSellers(): void {
    this.sellerMarginUseCase.execute();
    return;
  }
}
