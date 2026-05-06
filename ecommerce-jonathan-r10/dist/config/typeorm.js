"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionSource = exports.typeOrmConfig = void 0;
const config_1 = require("@nestjs/config");
const dotenv_1 = require("dotenv");
const typeorm_1 = require("typeorm");
(0, dotenv_1.config)({ path: '.env.development' });
const config = {
    type: 'postgres',
    database: process.env.DB_NAME,
    host: 'postgresdb',
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
    autoLoadEntities: true,
    logging: false,
    synchronize: true,
    dropSchema: false,
};
exports.typeOrmConfig = (0, config_1.registerAs)('typeorm', () => config);
exports.connectionSource = new typeorm_1.DataSource(config);
//# sourceMappingURL=typeorm.js.map