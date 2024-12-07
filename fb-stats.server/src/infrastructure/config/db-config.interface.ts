export default interface IDbConfig {
    getDbHost() : string;
    getDbPort() : number;
    getDbName() : string;
    getDbUserName() : string;
    getDbPassword() : string;
}