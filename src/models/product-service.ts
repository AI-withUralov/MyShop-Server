import { T } from "../libs/types/common";
import { shapeIntoMongooseObjectId } from "../libs/config";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { Product, ProductInput, ProductInquiry, ProductUpdateInput } from "../libs/types/product";
import ProductModel from "../schema/product-model";
import { ProductStatus } from "../libs/enums/product-enum";
import {ObjectId} from "mongoose"
import ViewService from "./view-servive";
import { ViewInput } from "../libs/types/view";
import { ViewGroup } from "../libs/enums/view-enum";
class ProductService {
    static createNewProduct(data: ProductInput) {
        throw new Error("Method not implemented.");
    }
    private readonly productModel;
    public viewService;

    constructor() {
        this.productModel = ProductModel;
        this.viewService = new ViewService();
    }

    /** SPA **/

    public async getProducts(inquiry: ProductInquiry): Promise<Product[]> {
      const match: T = { productStatus: ProductStatus.PROCESS };
  
      // Agar inquiry obyektida productCollection bo'lsa, uni filterga qo'shamiz
      if (inquiry.productCollection) { match.productCollection = inquiry.productCollection; }
  
      // qidirsh mantig'i buyerdagi "i" case sensitive emas degani
      if (inquiry.search) { match.productName = { $regex: new RegExp(inquiry.search, "i") }; } // 
  
      // Mahsulotlarni tartiblash (sort) buyurtmasi
      const sort: T =
        inquiry.order === "productPrice"
          ? { [inquiry.order]: 1 } // Agar tartib "productPrice" bo'lsa, ortib boruvchi tartibda
          : { [inquiry.order]: -1 }; // Aks holda, kamayib boruvchi tartibda
  
      // Ma'lumotlarni yig'ish uchun aggregation query ishlatamiz
      const result = await this.productModel
        .aggregate([
          { $match: match }, // Filterni qo'llash
          { $sort: sort }, // Sortni qo'llash
          { $skip: (inquiry.page - 1) * inquiry.limit }, // Skip - sahifalash uchun
          { $limit: inquiry.limit * 1 }, // Limit - sahifalash uchun
        ])
        .exec();
  
      // Agar natija topilmasa, xato chiqaramiz
      if (!result) { throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND); }
  
      // Natijalarni qaytaramiz
      return result;
  }
  

    public async getProduct(memberId: ObjectId | null, id: string): Promise<Product> {
      const productId = shapeIntoMongooseObjectId(id);
  
      let result = await this.productModel
          .findOne({
              _id: productId,
              productStatus: ProductStatus.PROCESS,
          })
          .exec();
  
      if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
      
      if (memberId) {
        // Check Existence
        const input: ViewInput = {
          memberId: memberId,
          viewRefId: productId,
          viewGroup: ViewGroup.PRODUCT,
        };
        const existView = await this.viewService.checkViewExistence(input);
      
        console.log("exist:", !!existView);
        if (!existView) {
          // Insert View
          await this.viewService.insertMemberView(input);
      
          // Increase Counts
          result = await this.productModel
            .findByIdAndUpdate(
              productId,
              { $inc: { productViews: +1 } },
              { new: true }
            )
            .exec();
        }
      }
      
  
      return result;
  }
    /** SSR **/

    public async getAllProducts(): Promise<Product[]> {
        const result = await this.productModel.find().exec();
        if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
      
        return result;
      }
      

    public async createNewProduct(input: ProductInput): Promise<Product> {
        try {
            console.log("newInput", input)
            return await this.productModel.create(input);
            
        } catch (err) {
            console.error("Error, model:createNewProduct:", err);
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
        }
    }
    public async updateChosenProduct(
        id: string,
        input: ProductUpdateInput
      ): Promise<Product> {
        id = shapeIntoMongooseObjectId(id);
        const result = await this.productModel
          .findOneAndUpdate({ _id: id }, input, { new: true })
          .exec();
        if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);
        console.log("result", result)
        return result;
      }
      
}

export default ProductService;
