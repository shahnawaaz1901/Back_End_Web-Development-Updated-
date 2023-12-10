import mongoose from "mongoose";

const CounterSchema = new mongoose.Schema({
  value: { type: Number, default: 0 },
});
 export default CounterSchema;