import express from "express";
import morgan from "morgan";
import session from "express-session";
import globalRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import {localsMiddleware} from "./middlewares";


//아래의 express어플리케이션을 지정하고 코드를 작성해야 한다.
const app = express();
const logger = morgan("dev");

app.set("view engine","pug");
app.set("views",process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({extended:true}));
//우리가 만든 라우터 앞에 session을 사용한다.
app.use(session({
    secret:"Hello",
    resave:true,
    saveUninitialized: true
    })
);

app.use(localsMiddleware);
app.use("/",globalRouter);
app.use("/videos",videoRouter);
app.use("/users",userRouter);

export default app; 