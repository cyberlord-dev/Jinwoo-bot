class PostgreSQLAdapter {
  constructor(db) {
    this.db = db;
  }

  async read() {
    return await this.db.query('SELECT * FROM users');
  }

  async write(data) {
    await this.db.query('INSERT INTO users VALUES ($1, $2)', [data.username, data.session_id]);
  }
}

module.exports = PostgreSQLAdapter;
