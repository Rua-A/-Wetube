import express from "express";

const PORT = 4000;
//아래의 express어플리케이션을 지정하고 코드를 작성해야 한다.
const app = express();

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

//button.addEventListener("click",handleClick)과 매우 유사하다.
app.get("/", handlehome);
app.get("/about", handleabout);
app.get("/contact", handlecontact);
app.get("/login", handlelogin);

const handleListening = () =>
  console.log(`Server listening in port http://localhost:${PORT}  !!`);
app.listen(PORT, handleListening);
