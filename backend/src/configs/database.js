import mongoose from "mongoose";
const connectDatabase = async () => {
  await mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("Connect Database successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default connectDatabase;
