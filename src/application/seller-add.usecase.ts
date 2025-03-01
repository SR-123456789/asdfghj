// seller-add.usecase.ts

import { Seller, SellerRepository } from "../infrastructure/seller.repository";


export class SellerAddUseCase {
  constructor(private readonly sellerRepository: SellerRepository) {}

  /**
   * 指定された名前で Seller を追加し、結果を返す。
   * @param name Sellerの名前
   * @returns 追加された Seller オブジェクト
   */
  execute(name: string): Seller {
    return this.sellerRepository.addSeller(name);
  }
}
