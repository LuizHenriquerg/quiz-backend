const mongoose = require('mongoose');

async function connection() {
  const db = await mongoose.connect('mongodb://localhost:27017/pg-quiz', () => console.log('Conectado ao banco!'))

  return db
}

module.exports = connection();