"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const environment_1 = require("../../config/environment");
let AuthGuard = class AuthGuard {
    jwtService;
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers['authorization'];
        if (!authHeader)
            throw new common_1.UnauthorizedException('No se ha enviado token');
        const [type, token] = authHeader.split(' ');
        if (type !== 'Bearer' || !token)
            throw new common_1.UnauthorizedException('No se ha enviado token');
        try {
            const payload = this.jwtService.verify(token, {
                secret: environment_1.environment.JWT_SECRET,
            });
            req.user = payload;
        }
        catch (error) {
            if (error.name === 'TokenExpiredError')
                throw new common_1.UnauthorizedException('El token ha expirado');
            throw new common_1.UnauthorizedException('Error en el token');
        }
        return true;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map