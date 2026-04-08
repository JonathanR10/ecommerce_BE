"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const PORT = process.env.PORT ?? 3000;
    const HOST = process.env.HOST;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(PORT);
    console.log(`Servidor escuchando en ${HOST}:${PORT}/ ... `);
}
bootstrap();
//# sourceMappingURL=main.js.map