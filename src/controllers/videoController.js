import Video from "../models/Video";

export const home = async (req,res) => {
    //디비에서 데이터르르 가져올때 데이터 처리에 따라 시간이 들 수 있다
    //또한 오류가 날 수도 있으므로 약간의 기다림이 필요하다. callback함수를 사용해야한다.
    // .find()는 콜백 함수이고 우리는 promise라는 콜백의 최신버젼을 사용할 것이다.
    /*Video.find({},(error,videos) =>{
        return res.render("home",{ pageTitle:"Home",videos:[]});
    });*/
    const videos = await Video.find({}).sort({createdAt:"asc"});
    return res.render("home", { pageTitle: "Home", videos });
};

export const watch = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if(!video){
        return res.render("404",{pageTitle:"Video not found."});
    }
    return res.render("watch", { pageTitle: video.title,video });
};

export const getEdit = async (req, res) => {
    const { id } = req.params;
    const video =await Video.findById(id);
    if(!video){
        return res.render("404",{pageTitle:"Video not found."});
    }
    return res.render("edit", { pageTitle: `Editing ${video.title}`,video });
};
  
export const postEdit = async (req, res) => {
    const { id } = req.params;
    const {title, description, hashtags} = req.body;
    //post는 결과를 받는 쪽이니 받은 결과에 대한 값이 있는지만 확인하면 된다.
    const video =await Video.exists({_id:id});
    if(!video){
        return res.render("404",{pageTitle:"Video not found."});
    }
    await Video.findByIdAndUpdate(id,{
        title,
        description,
        hashtags : Video.formatHashtags(hashtags),
    });
    return res.redirect(`/videos/${id}`);
};
  
export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
    // here we will add a video to the videos array.
    const { title, description, hashtags } = req.body;
    try{
        await Video.create({
            title,
            description,
            createdAt: Date.now(),
            hashtags : Video.formatHashtags(hashtags),
        });
        console.log(Video);
        return res.redirect("/");
    } catch {
        console.log(error);
        return res.render("upload",{pageTitle:"Upload Video", errorMessage:error._message});
    }
};

export const deleteVideo = async (req,res) => {
    const { id } = req.params;
    await Video.findByIdAndDelete(id);
    return res.redirect("/");
}

export const search = async (req,res) =>{
    const { keyword } = req.query;
    let videos =[];
    if(keyword) {
        videos = await Video.find({
            title:{
                $regex: new RegExp(keyword,"i")
            }
        });
    }
    return res.render("search",{pageTitle:`Search`,videos});    
}