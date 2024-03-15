const { pool } = require("../functions/db");

async function getVideo(){
    const resdb = await pool.query("SELECT * FROM videos TABLESAMPLE SYSTEM (1)");
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
    app.get('/', (req, res) => {
        res.render("index", {tags: req.query.tags, user: req.session.user});
        //console.log(req.session.user);
    })
}