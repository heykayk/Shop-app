import {
    IsString,
    IsNotEmpty,
    IsPhoneNumber,
    IsDate,
    IsBoolean,
    IsNumber,
} from 'class-validator';

export class ProductDTO {
    @IsString()
    @IsNotEmpty()
    "name": string;

    @IsNumber()
    "price": number;

    @IsString()
    "thumbnail": string

    @IsString()
    "description": string

    @IsNumber()
    "category_id": number;

    constructor(data: any) {
        this.name = data.name;
        this.price = data.price;
        this.thumbnail = data.thumbnail;
        this.description = data.description;
        this.category_id = data.category_id;
    }
}