// seller.repository.ts
export interface Seller {
    id: number;
    name: string;
}

export class SellerRepository {
    private sellers: Seller[] = [];
    private currentId: number = 1;

    /**
     * Seller を追加し、追加された Seller を返す。
     * @param name Sellerの名前
     * @returns 追加された Seller オブジェクト
     */
    addSeller(name: string): Seller {
        const seller: Seller = {
            id: this.currentId++,
            name,
        };
        this.sellers.push(seller);
        return seller;
    }

    /**
     * 全ての Seller を返す（デバッグ用など）。
     * @returns Sellerの配列
     */
    getAllSellers(): Seller[] {
        return this.sellers;
    }
}
