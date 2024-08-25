import { Product } from "../../models/product";

export interface OrderDetailResponse{
    id: number,
    product: Product,
    price: number,
    color: string,
    quantity: number,
    total_money: number
}