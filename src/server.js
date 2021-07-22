import express from "express";
import morgan from "morgan";

const PORT = 4000;
//아래의 express어플리케이션을 지정하고 코드를 작성해야 한다.
const app = express();

//Middlewares
const logger=(req,res,next) =>{
  console.log(`${req.method} ${req.url}`);
  next();
}

const privateMiddleware = (req,res,next) =>{
  const url = req.url;
  if(url ==="/protected"){
    return res.send("<h1>Not Allowed<h1>");
  }
  console.log("Allowed, you may continue.");
  next();
}

//router
const handlehome = (req, res) => {
  return res.send("<h1>bueatiful homepage</h1>");
};

const handleabout = (req, res) => {
  return res.send("<h1>bueatiful aboutpage</h1>");
};

const handlecontact = (req, res) => {
  return res.send("<h1>bueatiful contactpage</h1>");
};

const handlelogin = (req, res) => {
  return res.send("<h1>bueatiful loginpage</h1>");
};

const handleprotected = (req, res) => {
  return res.send("<h1>Welcome to the private lounge.</h1>");
};

//순서가 중요하다 use 다음에 get을 사용해야한다.
//use 명령어는 global middleware를 사용할 수 있게 한다.
//내가 만들어둔 모든 route에서 사용되도록 한다.
app.use(logger);
app.use(privateMiddleware);
app.use(morgan("dev"))
//button.addEventListener("click",handleClick)과 매우 유사하다.
app.get("/",handlehome);
app.get("/about", handleabout);
app.get("/contact", handlecontact);
app.get("/login", handlelogin);
app.get("/protected",handleprotected);

const handleListening = () =>
  console.log(`Server listening in port http://localhost:${PORT}!!`);
app.listen(PORT, handleListening);


//0723 nodeJS의 morgan함수 설치