import mysql from 'mysql2/promise';
export class Db {
    constructor() {
        this.createConnection();
    }
    async createConnection() {
        this.connection = await mysql.createConnection({
            host: 'localhost',
            user: 'sgm2',
            database: 'sgm',
            password: 'Thi@go05',
            port: 3306,
        });
    }
    async query(sql, params) {
        try {
            const [results, fields] = await this.connection.query(sql, params);
            return results;
        }
        catch (err) {
            console.log(err);
        }
    }
    async execute(sql, params) {
        try {
            await this.connection.execute(sql, params);
        }
        catch (err) {
            console.log(err);
        }
    }
}
//# sourceMappingURL=Db.js.map