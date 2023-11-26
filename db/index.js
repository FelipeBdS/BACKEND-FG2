const { Pool } = require('pg');

const dbConnect = new Pool({
  connectionString: "postgres://ydhjdljyxqisqi:c57764ea5c77e15167ffe57a5a83bff64baec30c0ce6223351434530aeeefcaa@ec2-44-193-237-184.compute-1.amazonaws.com:5432/dbb6la6v14msc6",
  ssl: {
    rejectUnauthorized: false
  }
});



// async function dbTest(params) {
//   try {
//     const res = await dbConnect.query('SELECT * from cliente')
//     console.log(res.rows) // Hello world!
//   } catch (err) {
//     console.error(err);
//   }
// }

// dbTest()

module.exports = {
  query: (text, params) => dbConnect.query(text, params),
  
};