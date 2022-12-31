import connectDB from "../lib/connectDB";
import Pagos from "../../models/compraModel";
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
        const product = await Pagos.findById(id);
        if (!product) {
          return res.status(404).json({ message: "pago no encontrado." });
        }
        return res.status(200).json(product);
      } catch (error) {
        return res.status(500).json({ message: "error.message" });
      }
    case "PUT":
      try {
        const product = await Pagos.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        if (!product) {
          return res.status(404).json({ message: "No existe el pago" });
        } else {
          return res.status(200).json(product);
        }
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    
    default:
      return res.status(400).json({ message: "pago no soportado" });
  }
};

//