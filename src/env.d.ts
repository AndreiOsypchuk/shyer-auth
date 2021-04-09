declare namespace NodeJS {
  export interface ProcessEnv {
    DEBUG: string;
    PORT: string;
    DB_HOST: string;
    EMAIL: string;
    PASSWORD: string;
    SALT: string;
    JWT_ACC: string;
    JWT_REF: string;
  }
}
