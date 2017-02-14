const bcrypt = require('bcryptjs');

exports.seed = (knex, Promise) => {
  return knex('users').del()
  .then(() => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync('pionix!23', salt);
    return Promise.join(
      knex('users').insert({
        username: 'pionix',
        password: hash
      })
    );
  })
  .then(() => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync('pionix!23', salt);
    return Promise.join(
      knex('users').insert({
        username: 'admin',
        password: hash,
        admin: true
      })
    );
  });
};
