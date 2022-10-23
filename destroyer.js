(async () => {
var { Level } = require("level");
var jumbleDb = new Level("./jumbleDb");
jumbleDb.clear();
})();
