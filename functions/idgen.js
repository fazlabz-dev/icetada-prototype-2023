module.exports = {

			generaterandID: function (length) {
				var retVal = "";
				var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_";
				for (var i = 0, n = chars.length; i < length; ++i) {
					retVal += chars.charAt(Math.floor(Math.random() * n));
				}
				return retVal;
			}

}
