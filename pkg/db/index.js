const mongoose = require("mongoose");
const config = require("../config")

const host = config.get("db").host;
const username = config.get("db").username;
const password = config.get("db").password;
const dbname = config.get("db").dbname;

let DSN = `mongodb+srv://${username}:${password}@${host}/${dbname}?retryWrites=true&w=majority`

mongoose.connect(
    DSN,
    {useNewUrlParser: true, useUnifiedTopology: true},
    err => {
        if(err) {
            return console.log(`Could not connect to DB`)
        }
        console.log('Succesfully connected to DB')
    }
)
