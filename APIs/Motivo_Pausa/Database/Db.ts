import mysql, { type Connection } from 'mysql2/promise';

export class Db {
    private connection!: Connection;

    constructor() {
        this.createConnection();
    }

    private async createConnection(){
        this.connection =  await mysql.createConnection({
        host: 'localhost',
        user: 'sgm2',
        database: 'sgm',
        password: 'Thi@go05',
        port:3306,
            })
    }

    public async query (sql: string, params: Array<any>){
        try {
            const [results, fields] = await this.connection.query(sql, params);
            return results;
        }catch(err){
            console.log(err);
        }    
    }

    public async execute (sql: string, params: Array<any>){
        try {
            await this.connection.execute(sql,params);
        }catch(err){
            console.log(err);
        }    
    }    
}

