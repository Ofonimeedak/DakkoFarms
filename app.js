const express = require("express");
const app = express();
const userRouter = require("./Routes/userRoutes");
const productRouter = require("./Routes/productsRoutes");
const accessRouter=require('./Routes/accessRoutes')



//app level middleware to parse all request and response in Jsaon fomat
app.use(express.json({ limit: "100mb" }));

app.use("/api/user", userRouter); //user router
app.use("/api/products", productRouter); //product router
app.use("/api", accessRouter); //access routers


const port = 3000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
