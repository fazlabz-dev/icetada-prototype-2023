module.exports = function(){

			function generaterandID(chars, length) {
				var retVal = "";
				for (var i = 0, n = chars.length; i < length; ++i) {
					retVal += chars.charAt(Math.floor(Math.random() * n));
				}
				return retVal;
			}

}
