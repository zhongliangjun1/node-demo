
var fs = require('fs');
var Step = require('step');

var deleteFolderRecursive = function(path) {
	if (fs.existsSync(path)) {
		fs.readdirSync(path).forEach(function(file, index) {
			var curPath = path + "/" + file;
			if (fs.statSync(curPath).isDirectory()) { // recurse
				deleteFolderRecursive(curPath);
			} else { // delete file

				if(curPath.indexOf('img-inner')!=-1){
					console.log('save '+curPath);
					save2cache(curPath);
					fs.unlinkSync(curPath);
				}else{
					fs.unlinkSync(curPath);
				}		
			}
		});
		fs.rmdirSync(path);
	}
};

var save2cache = function(filepath){

	if(!filepath) throw new Error('without filepath');
	var filename = filepath.substring(filepath.lastIndexOf('/')+1);
	var writePath = '/Users/mac/Documents/node-test/cache/'+filename;

	if(fs.existsSync(filepath)){
		var file = fs.readFileSync(filepath);
		fs.writeFileSync(writePath, file);
	}

	

	// Step(
	// 	function readFileByPath(){
	// 		fs.readFile(filepath, function (err, data) {
	// 			  if (err) throw err;
	// 			  return data;
	// 	    });
	// 	},
	// 	function writeFile2Cache(err, data){
	// 		if(err) throw err;
	// 		fs.writeFile(writePath, data, function(err){
	// 			if(err) throw err;
	// 		});
	// 	}
	// 	);

	

}

deleteFolderRecursive('/Users/mac/Documents/node-test/test');

