export interface Category{
    _id: String,
    name: String
}
export interface CategoryRes{
    data: Category[],
    msg: String
}