import Errors, { HttpCode, Message } from "../libs/Errors";
import { Product, ProductInput } from "../libs/types/product";
import ProductModel from "../schema/product-model";

class ProductService {
    static createNewProduct(data: ProductInput) {
        throw new Error("Method not implemented.");
    }
    private readonly productModel;

    constructor() {
        this.productModel = ProductModel;
    }

    /** SPA **/

    /** SSR **/

    public async createNewProduct(input: ProductInput): Promise<Product> {
        try {
            return await this.productModel.create(input);
        } catch (err) {
            console.error("Error, model:createNewProduct:", err);
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
        }
    }
}

export default ProductService;
