// infrastructure/seller.repository.ts
export interface Seller {
    id: number;
    name: string;
    disabled?: boolean;
  }
  
  export class SellerRepository {
    private sellers: Seller[] = [];
    private currentId: number = 1;
  
    addSeller(name: string): Seller {
      const seller: Seller = {
        id: this.currentId++,
        name,
        disabled: false,
      };
      this.sellers.push(seller);
      return seller;
    }
  
    getAllSellers(): Seller[] {
      return this.sellers;
    }
  }
  