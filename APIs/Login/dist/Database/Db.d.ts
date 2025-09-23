import mysql from 'mysql2/promise';
export declare class Db {
    private connection;
    constructor();
    private createConnection;
    query(sql: string, params: Array<any>): Promise<mysql.QueryResult | undefined>;
    execute(sql: string, params: Array<any>): Promise<void>;
}
//# sourceMappingURL=Db.d.ts.map