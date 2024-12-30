export interface Invoice {
    amount: number;
    buyer_id: string;
    company_id: string;
    createdAt: string;
    description: string;
    id: string;
    updatedAt: string;
    user_id: string;
  }
  export interface SellDto {
    productId: string;
    quantity: number;
    price: number;
  }
  
  export interface CreateInvoiceDto {
    buyer_id: string | null;
    description: string | null;
    amount: number;
    products: SellDto[];
  }
  