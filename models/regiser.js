const fs = require('fs');

exports.addProfile = (profile) => {
    const file = 'profile.json';
    var path = "./file/" + file;
    if(!fs.existsSync(path)) {
        fs.writeFileSync(path, '[]',function (err) {
            if (err) throw err;
        })
    }
    var data = fs.readFileSync(path);
    var json = JSON.parse(data);
    let birthDayToValidate = profile.birthDay;
    const rgexp = /(^(((0[1-9]|1[0-9]|2[0-8])[-](0[1-9]|1[012]))|((29|30|31)[-](0[13578]|1[02]))|((29|30)[-](0[4,6,9]|11)))[-](19|[2-9][0-9])\d\d$)|(^29[-]02[-](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/;
    const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValidDateBirthDay = rgexp.test(birthDayToValidate);
    const isValidEmail = emailRegexp.test(profile.email);
    if(json.find(profiles => profiles.email == profile.email)) {
        return "email นี้ได้ถูกใช้แล้ว"
    }
    if(!profile.name) return "กรุณากรอกชื่อ"
    else if(!profile.surName) return "กรุณากรอกนามสกุล"
    else if(!profile.birthDay || !isValidDateBirthDay) return "กรุณากรอกวันเกิดให้ถูกต้อง DD-MM-YYYY"
    else if(!isValidEmail || !profile.email) return "กรุณากรอกอีเมลให้ถูกต้อง"
    else if(!profile.password) return "กรุณากรอกพาสเวิด"
    const profiles = {
        "userid": json.length != 0 ? json.length+1 : 1,
        "name":profile.name,
        "surName":profile.surName,
        "birthDay":profile.birthDay,
        "email":profile.email,
        "password":profile.password
    }
    json.push(profiles)
    fs.writeFile(path, JSON.stringify(json),function (err) {
        if (err) throw err;
    })
    return "บันทึกข้อมูลเรียบร้อย"
};