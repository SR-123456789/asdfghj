// sellerController.ts

interface Seller {
    id: number;
    name: string;
  }
  
  export class SellerController {
    private sellers: Seller[] = [];
    private currentId: number = 1;
  
    /**
     * 新しいSellerを追加する。
     * @param name - Sellerの名前
     * @returns 追加されたSellerオブジェクト
     */
    addSeller(name: string) {

    }
  }
  