/* 

  Importing the app module here for decoupling.
  We can also wait for a successful DB connection here later on

*/

const app = require("./server/app");

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});