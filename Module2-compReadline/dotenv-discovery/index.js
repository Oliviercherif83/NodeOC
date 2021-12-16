require('dotenv').config();

if(process.env.APP_ENV == 'developpment'){
    const { DB_HOST, DB_USER, DB_PASS } = process.env;
    console.log(DB_HOST, DB_USER, DB_PASS);
}