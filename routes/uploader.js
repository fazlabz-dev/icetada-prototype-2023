const { pool } = require("../functions/db");

async function insertVideo(name, description, userId, fileName){
  const resdb = await pool.query("INSERT INTO videos (name, description, iduser, path) VALUES ($1, $2, $3, $4) RETURNING id", [name, description, userId, fileName]);
  console.log(resdb.rows);
  return resdb.rows[0]
}

async function getVideoId(userId) {
  const resdb = await pool.query("SELECT * FROM users WHERE iduser=$1", [userId]);
}

module.exports = function(app){
    const multer = require("multer");
    var videoId;
    const FileStorage = multer.diskStorage({
        destination: function (req, file, cb) {
          // /media/rastochek/Amet/icetubedevvids
          cb(null, '/media/rastochek/Amet/DevStuff/AmyotTube/back/tmp')
        },
        filename: function (req, file, cb) {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + ".mp4";
          cb(null, file.fieldname + '-' + uniqueSuffix)
        }
    })
    const upload = multer({ storage: FileStorage })

    app.get('/my_videos_upload', (req, res) => {
      if (req.session.user) {
        res.render("upload", {user: req.session.user});
      } else {
        res.redirect("/log.html");
      }
    });

    app.post('/upload', upload.single('video'), function (req, res) {
        // req.file is the `avatar` file
        // req.body will hold the text fields, if there were any
        const { exec } = require('child_process');
        var outputfilename;

        exec('/media/rastochek/Amet/DevStuff/AmyotTube/back/ffmpeg-6.0-amd64-static/ffmpeg -i ' + '/media/rastochek/Amet/DevStuff/AmyotTube/back/tmp/' + req.file.filename + ' -vcodec libx264 -acodec aac -crf 28 ' + '/media/rastochek/Amet/icetubedevvids/' + req.file.filename, (error, stdout, stderr) => {
          if (error) {
            console.error(`error: ${error.message}`);
            return;
          }

          if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
          }

          //console.log(`stdout:\n${stdout}`);
          //console.log("stdout");
        });

        const vidC = insertVideo(req.body.name, req.body.description, req.session.user.id, req.file.filename).then(vidas=>{
          res.send("it should be uploaded i think" + "<br>id: " + vidas.id);
        });
    })
}