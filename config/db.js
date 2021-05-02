const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  });

  console.log(
    `Connection established: ${conn.connection.host}`.magenta.underline.bold
  );
};

module.exports = connectDB;
