import mongoose from "mongoose";
const reviewsSchema = mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    rating:{
        type:Number,
        required:true,
    },
    comment:{
        type:String,
        required:true,
    },
},{
    timestamps:true,
})
const productSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"User",
    },
    name:{
        type: String,
        required:true,
    },
    image: {
        type:String,
        required:true,
    },
    brand: {
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    reviews: [reviewsSchema],
    Rating: {
        type:Number,
        required:true,
        default:0.0,
    },
    numReviews: {
        type:Number,
        required:true,

    },
    price: {
        type:Number,
        required:true,
    },
    countInStock:{
        type:Number,
        required:true,
    }

},{
    timestamps:true,
});
const Product = mongoose.model("Product",productSchema);
export default Product;