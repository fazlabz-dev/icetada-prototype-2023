async function getUser(userId){
    const resdb = await pool.query("SELECT * FROM users WHERE name=$1", [userId]);
    var vidas = null;
    if (resdb.rows.length == 0) {
        //console.log("not found")
    } else if (resdb.rows.length == 1) {
        //console.log("alright we found ", resdb.rows[0]);
        vidas = resdb.rows[0]
    }
    return vidas;
}

module.exports = function(app){
    app.get('/profile', (req, res) => {

        if (req.query.user == undefined || req.query.user == "") {
            res.redirect("/");
        } else {
            const vidC = getVideo(req.query.v).then(vidas=>{
                res.render("user", {userName: req.query.user, videosPosted: "sdf"})
            });
        }
        
    })
    app.get('/user', (req, res) => {
        res.redirect("/");
    })
}