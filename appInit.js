const os = require('os');
const fs = require('fs');
const path = require('path');

module.exports = () => {
// * creates appropriate directories
    try {
        fs.mkdirSync(path.join(os.homedir(), "./documents", "./mongelit"))
    }catch{
    
    }
}
