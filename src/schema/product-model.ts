import mongoose, {Schema} from "mongoose"
import { ProductCollection, ProductStatus, ClothesSize, ShoesSize } from "../libs/enums/product-enum";


const productSchema = new Schema({
    productStatus: {
        type: String,
        enum: ProductStatus,
        default: ProductStatus.PAUSE,
    },
    productCollection: {
        type: String,
        enum: ProductCollection,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    productPrice: {
        type: Number,
        required: true,
    },
    productLeftCount: {
        type: Number,
        required: true,
    },
    ClothesSize: {
        type: String,
        enum: ClothesSize,
        default: ClothesSize.M,
    },

    ShoesSize: {
        type: String,
        enum: ShoesSize,
        default: ShoesSize.MEDIUM,
    },
    productDesc: {
        type: String,
        required: true,
    },
    productImages: {
        type: [String],
        default: [],
    },
    productViews: {
        type: Number,
        default: 0,
    },
    }, { timestamps: true }); // updatedAt, createdAt

    productSchema.index(
    { productName: 1, ClothesSize: 1, ShoesSize: 1 },// Bir xill nom, size va volumedagi productlar 2 marta xosil qilishga ruxsat bermaydi
    { unique: true }
    );

    export default mongoose.model("Product", productSchema);
