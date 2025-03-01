import { SellerAddUseCase } from "../application/seller-add.usecase";
import { Seller } from "../infrastructure/seller.repository";

export class SellerController {
  constructor(private readonly sellerAddUseCase: SellerAddUseCase) {}

  addSeller(name: string): Seller {
    const seller = this.sellerAddUseCase.execute(name);
    // console.log("Seller added:", seller);
    return seller;
  }
}
