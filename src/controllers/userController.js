import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req,res) => res.render("join",{pageTitle:"Join"});
export const postJoin = async(req,res) => {
    const {name,username,email,password1,password2,location} = req.body;
    const pageTitle ="Join";
    if(password1 !== password2){
        return res.status(400).render("join",{
            pageTitle:pageTitle,
            errorMessage:"Password가 동일하지 않습니다. "
        });
    }
    //const exists = await User.exists({$or:[{username},{email}]});
    //$or는 하나라도 참일경우 해당된다.
    const usernameExitsts = await User.exists({username});
    if(usernameExitsts){
        return res.status(400).render("join",{
            pageTitle:pageTitle,
            errorMessage:"This username is already taken."
        });
    }
    const emailExists = await User.exists({email});
    if(emailExists){
        return res.status(400).render("join",{
            pageTitle:pageTitle,
            errorMessage:"This email is already taken."
        });
    }
    try{
        await User.create({
            name,
            username,
            email,
            password,
            location
        });
        return res.redirect("/login");
    } catch(error){
        console.log(error);
        return res.status(400).render("join",{pageTitle, errorMessage:error._message});

    }

};

export const getlogin = (req,res) => res.render("login",{pageTitle : "Login"});

export const postlogin = async (req,res) =>{
    const pageTitle = "Login";
    const {username , password} = req.body;
    const user = await User.findOne({username});
    //check if account exists
    if(!user){
        return res.status(400).render("login",{
            pageTitle,
            errorMessage:"An account with this Username does not exists."
        });
    }

    const ok = await bcrypt.compare(password,user.password);
    if(!ok){
        return res.status(400).render("login",{
            pageTitle,
            errorMessage:"Wrong password"
        });
    } else {
        console.log("Collect");
    }
    req.session.loggedIn =true;
    req.session.user=user;
    return res.redirect("/");
};

export const edit = (req,res) => res.send("Edit User");
export const remove = (req,res) => res.send("Remove User");
export const logout = (req,res) => res.send("logout");
export const see = (req,res) => res.send("See User");
