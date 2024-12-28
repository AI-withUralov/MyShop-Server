import mongoose from 'mongoose';
import {Schema} from 'mongoose'
import { ShoesSize } from '../libs/enums/product-enum';
import { ClothesSize } from '../libs/enums/product-enum';
import { ProductCollection } from '../libs/enums/product-enum';
import { ProductStatus } from '../libs/enums/product-enum';

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
    clothesSize: {
        type: String,
        enum: ClothesSize,
        default: ClothesSize.M,
    },

    shoesSize: {
        type: String,
        enum: ShoesSize,
        default: ShoesSize.ALL,
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
    { productName: 1, clothesSize: 1, shoesSize: 1 },// Bir xill nom, size va volumedagi productlar 2 marta xosil qilishga ruxsat bermaydi
    { unique: true }
    );

    export default mongoose.model("Product", productSchema);
