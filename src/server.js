
import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";


//아래의 express어플리케이션을 지정하고 코드를 작성해야 한다.
const app = express();
const logger = morgan("dev");

app.set("view engine","pug");
app.set("views",process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({extended:true}));
app.use("/",globalRouter);
app.use("/videos",videoRouter);
app.use("/users",userRouter);

export default app;