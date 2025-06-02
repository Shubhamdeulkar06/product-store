import Product from "../models/product.model.js"
import mongoose from "mongoose";

export const getProducts = async (req,res)=>{
    try {
        const products = await Product.find({})
        res.status(200).json({success:true,data:products})
    } catch (error) {
        console.log("Error in fetching products",error.message)
        res.status(500).json({success:false, message:"server Error"})
    }
}

export const createProduct = async (req,res)=>{
    const product = req.body; // get the product from the request body

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success:false,message: "Please fill in all fields."});
    }

    const newProduct = new Product(product);
    try {
        await newProduct.save();
        res.json({success:true,data: newProduct});
    } catch (error) {
        console.log("Error in create product: ", error.message);
        res.status(500).json({success:false,message: "Failed to create product."});
    }
}

export const updateProduct = async (req,res)=>{
    const {id} = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({ success:false,message: "Invalid product id."});
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(200).json({success:true,data: updatedProduct});
    } catch (error) {
        console.log(" Error in updating product: ", error.message);
        res.status(500).json({success:false, message: "Server Error."});
    }

}

export const deleteProduct = async (req,res)=>{
    const {id} = req.params; // get the id from the url

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({ success:false,message: "Invalid product id."});
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product deleted successfully."});
    } catch (error) {
        console.log("Error in deleting product: ", error.message);
        res.status(500).json({success:false, message: "Server Error."});
        
    }
}