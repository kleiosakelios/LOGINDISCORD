import connectDB from "../lib/connectDB";
import Products from "../../models/productModel";
connectDB();

export default async (req, res) => {
  const {
    query: { id },
    method,
    body,
  } = req;
  switch (method) {
    case "GET":
      try {
        const product = await Products.findById(id);
        if (!product) {
          return res.status(404).json({ message: "producto no encontrado." });
        }
        return res.status(200).json(product);
      } catch (error) {
        return res.status(500).json({ message: "error.message" });
      }
    case "PUT":
      try {
        const product = await Products.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        if (!product) {
          return res.status(404).json({ message: "No existe el producto" });
        } else {
          return res.status(200).json(product);
        }
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    case "DELETE":
      try {
        const deletedProduct = await Products.findByIdAndDelete(id);
        if (!deletedProduct) {
          return res.status(404).json({ message: "producto no encontrado" });
        } else {
          return res.status(204).json(deletedProduct);
        }
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    default:
      return res.status(400).json({ message: "producto no soportado" });
  }
};
