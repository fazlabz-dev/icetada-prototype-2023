module.exports = function(){

    function genId(){
        var shortid = require('shortid');
        shortid.length(10);
        var idg = shortid.generate();
        return idg;
    }

}