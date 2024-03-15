const { pool } = require("../functions/db");

async function getVideo(vidId){
    const resdb = await pool.query("SELECT * FROM videos WHERE id=$1", [vidId]);
    var vidas = null;
    if (resdb.rows.length == 0) {
        console.log("not found")
    } else if (resdb.rows.length == 1) {
        console.log("alright we found ", resdb.rows[0]);
        vidas = resdb.rows[0]
    }
    return vidas;
}

module.exports = function(app){
    app.get('/watch', (req, res) => {
        //console.log(req.query.v);
        if (req.query.v == undefined || req.query.v == "") {
            res.redirect("/");
        }

        //res.send(req.query.v); 
        
        const vidC = getVideo(req.query.v).then(vidas=>{
            res.render("watch", {videoId: vidas.id, videoName: vidas.name, uploader: vidas.iduser, videoDesc: vidas.description})
        });
    })
}