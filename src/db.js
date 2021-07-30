import mongoose from "mongoose";

//링크 뒤에 디비 이름을 적어주어야한다.
mongoose.connect("mongodb://127.0.0.1:27017/wetube",{useNewUrlParser: true,useUnifiedTopology: true});

const db = mongoose.connection;

const handleOpen=()=>console.log("Connected to DB!!");
const handleError=(error) => console.log("DB Error",error);

//on은 여러번 이벤트가 실행되는 것
db.on("error",handleError);

//once는 한번만 이벤트가 실행되는 것
 db.once("open",handleOpen);
//