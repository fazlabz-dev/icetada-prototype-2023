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

    var fs = require('fs');
    app.get('/get/get_video', (req, res) => {
        //console.log('id: ' + req.query.id);
        const vidC = getVideo(req.query.id).then(vidas=>{
        if (vidC == null) {
            res.redirect("/");
        }
        var filepath = "/media/rastochek/Amet/icetubedevvids/" + vidas.path + "";
        console.log(filepath);
        fs.readFile(filepath, (err, data) => {
            if (err) {
                res.send("video not found"); // Pass errors to Express.
            } else {
                res.sendFile(filepath)
            }
        });
        })
    })

}