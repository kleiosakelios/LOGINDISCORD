import connectDB from "../lib/connectDB";
import Users from "../../models/userModel";
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
        const user = await Users.findById(id);
        if (!user) {
          return res.status(404).json({ message: "usuario no encontrado" });
        }
        return res.status(200).json(user);
      } catch (error) {
        return res.status(500).json({ message: "error.message" });
      }
    case "PUT":
      try {
        const user = await Users.findByIdAndUpdate(id, req.body, { new: true });
        if (!user) {
          return res.status(404).json({ message: "No hay usuario pa" });
        } else {
          return res.status(200).json(user);
        }
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    case "DELETE":
      try {
        const deletedUser = await Users.findByIdAndDelete(id);
        if (!deletedUser) {
          return res.status(404).json({ message: "usuario no encontrado" });
        } else {
          return res.status(204).json(deletedUser);
        }
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    default:
      return res.status(400).json({ message: "usuario no soportado" });
  }
};