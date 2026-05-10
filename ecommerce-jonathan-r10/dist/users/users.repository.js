"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const users_entity_1 = require("./users.entity");
const typeorm_2 = require("@nestjs/typeorm");
const usersData_1 = require("../utils/usersData");
const bcrypt = __importStar(require("bcrypt"));
let UsersRepository = class UsersRepository {
    ormUsersRepository;
    constructor(ormUsersRepository) {
        this.ormUsersRepository = ormUsersRepository;
    }
    async getAllUsers(page, limit) {
        const skip = (page - 1) * limit;
        const allUsers = await this.ormUsersRepository.find({
            skip,
            take: limit,
        });
        return allUsers;
    }
    async getUserById(id) {
        const foundUser = await this.ormUsersRepository.findOne({
            where: { id },
            relations: {
                orders: {
                    orderDetails: {
                        products: true,
                    },
                },
            },
        });
        if (!foundUser)
            throw new common_1.NotFoundException(`No se encontró al usuario con el id = ${id}`);
        return foundUser;
    }
    async getUserByEmail(email) {
        return await this.ormUsersRepository.findOneBy({ email });
    }
    async addUser(newUser) {
        return await this.ormUsersRepository.save(newUser);
    }
    async updateUser(id, userNewData) {
        const foundUser = await this.ormUsersRepository.findOneBy({ id });
        if (!foundUser)
            throw new common_1.NotFoundException(`No se encontró al usuario con el id = ${id}`);
        const mergedUser = this.ormUsersRepository.merge(foundUser, userNewData);
        const savedUser = await this.ormUsersRepository.save(mergedUser);
        return savedUser;
    }
    async deleteuser(id) {
        const foundUser = await this.ormUsersRepository.findOneBy({ id });
        if (!foundUser)
            throw new common_1.NotFoundException(`No se encontró al usuario con el id = ${id}`);
        foundUser.isActive = false;
        await this.ormUsersRepository.save(foundUser);
        return `Usuario con ${foundUser.id} ha sido dado de baja`;
    }
    async addAllUsers() {
        await Promise.all(usersData_1.allUsers.map(async (elem) => {
            const newUser = new users_entity_1.Users();
            newUser.name = elem.name;
            newUser.email = elem.email;
            newUser.address = elem.address;
            newUser.phone = elem.phone;
            newUser.country = elem.country;
            newUser.city = elem.city;
            const hashedPassword = await bcrypt.hash(elem.password, 10);
            newUser.password = hashedPassword;
            await this.ormUsersRepository
                .createQueryBuilder()
                .insert()
                .into(users_entity_1.Users)
                .values(newUser)
                .orIgnore()
                .execute();
        }));
        return 'Usuarios agregados';
    }
};
exports.UsersRepository = UsersRepository;
exports.UsersRepository = UsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(users_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UsersRepository);
//# sourceMappingURL=users.repository.js.map