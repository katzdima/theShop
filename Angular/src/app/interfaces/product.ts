import {Category} from "./category";
export interface Product {
        _id: string,
        name: string,
        category: Category,
        price: number,
        image: string
}
export interface ProductGetAllRes{
        data: Product[],
        msg: String
    }
