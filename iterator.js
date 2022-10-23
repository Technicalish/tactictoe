(async () => {
var { Level } = require("level");
var jumbleDb = new Level("./jumbleDb");
var data = await jumbleDb.iterator().all();
console.log(data);
})();
