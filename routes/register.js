const { pool } = require("../functions/db");

let salt = "9x_$c8";

async function insertUser(usrname, passwd){
    const res = await pool.query(
        "INSERT INTO users (name, pass) VALUES ($1, '"+salt+"'||md5($2))",
        [usrname, salt + passwd]
      );
    console.log(`Added a user`);
};

async function checkUser(usrname, passwd) {
    var user = null;
    const resdb = await pool.query("SELECT * FROM users WHERE name=$1 and pass='"+salt+"'||md5($2)", [usrname, salt + passwd]);
    if (resdb.rows.length == 0) {
        console.log("not found")
    } else if (resdb.rows.length == 1) {
        console.log("alright we found ", resdb.rows[0]);
        user = resdb.rows[0]
    }
    return user;
};

module.exports = function(app){
    app.post('/signup', (req, res) => {
        var username=req.body.name;
        var password=req.body.password;
        insertUser(username, password);
        res.send('УРА ТЫ ЗАРЕГАЛСЯ');
    });
    app.get('/signup', (req, res) => {
        res.send('fijdsfjio')
    });
    app.post('/login', (req, res) => {
        var username=req.body.name;
        var password=req.body.password;
        var checkU = checkUser(username, password).then(user=>{
            if (checkU !== null) {
                req.session.user = user;
                console.log(req.session.user);
            }
            res.redirect("/");
        });
    });
}