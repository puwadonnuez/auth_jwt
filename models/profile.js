const fs = require('fs');
const jwt = require('jsonwebtoken')

const Profile =  {
    checkValidCredentials : (email, password) => {
        const privateKey = fs.readFileSync('./config/private.key');
        const profile = Profile.getProfile(email, password);
        try {
            const token = jwt.sign(profile, privateKey);
            return token

        } catch {
            return "email or password is invalid"
        }
    },
    getProfile : (email, password) => {
        const file = 'profile.json';
        const path = "./file/" + file;
        if(!fs.existsSync(path)) {
            fs.writeFileSync(path, '[]',function (err) {
                if (err) throw err;
            })
        }
        var readProfile = fs.readFileSync(path);
        var parseProfileToJson = JSON.parse(readProfile);
        const profile = parseProfileToJson.find(profile => profile.email == email && profile.password == password)
       
        return profile
    }
}


module.exports = Profile
