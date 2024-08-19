import { CartItem } from "../../models/cartitem";

export class OrderDTO{
    user_id: number;
    fullname: string;
    email: string;
    phone_number: string;
    address: string;
    note: string;
    total_money: number;
    shipping_method: string;
    // shipping_address: string;
    couponCode: string;
    payment_method: string;
    cart_items: CartItem[];

    constructor(data: any){
        this.user_id = data.user_id;
        this.fullname = data.fullname;
        this.email = data.email;
        this.phone_number = data.phone_number;
        this.address = data.address;
        this.note = data.note;
        this.total_money = data.total_money;
        this.couponCode = data.couponCode;
        // this.shipping_address = data.shipping_address;
        this.shipping_method = data.shipping_method;
        this.payment_method = data.payment_method;
        this.cart_items = data.cart_items;
    }
}