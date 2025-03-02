import { SellerRepository, Seller } from "../../infrastructure/seller.repository";

export class SellerAddUseCase {
  constructor(private readonly sellerRepository: SellerRepository) {}

  execute(name: string): Seller {
    return this.sellerRepository.addSeller(name);
  }
}
