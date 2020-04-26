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
const midway_1 = require("midway");
let UserController = class UserController {
    async getUser() {
        const id = this.ctx.params.id;
        const user = await this.userService.getUser({ id });
        const res = await this.userService.testService("linbudu");
        this.ctx.body = { success: true, message: "OK", data: user, res };
    }
};
__decorate([
    midway_1.inject(),
    __metadata("design:type", Object)
], UserController.prototype, "ctx", void 0);
__decorate([
    midway_1.inject("userService"),
    __metadata("design:type", Object)
], UserController.prototype, "userService", void 0);
__decorate([
    midway_1.logger("ownLogger"),
    __metadata("design:type", Object)
], UserController.prototype, "logger", void 0);
__decorate([
    midway_1.get("/:id", { middleware: ["SPRouterMiddleware"] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
UserController = __decorate([
    midway_1.provide()
    // 相当于prefix
    ,
    midway_1.controller("/user")
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29udHJvbGxlci91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsbUNBQTJFO0FBTTNFLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7SUFXekIsS0FBSyxDQUFDLE9BQU87UUFDWCxNQUFNLEVBQUUsR0FBVyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDdEMsTUFBTSxJQUFJLEdBQWdCLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pFLE1BQU0sR0FBRyxHQUFnQixNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDcEUsQ0FBQztDQUNGLENBQUE7QUFmQztJQURDLGVBQU0sRUFBRTs7MkNBQ0k7QUFHYjtJQURDLGVBQU0sQ0FBQyxhQUFhLENBQUM7O21EQUNJO0FBRzFCO0lBREMsZUFBTSxDQUFDLFdBQVcsQ0FBQzs7OENBQ1I7QUFHWjtJQURDLFlBQUcsQ0FBQyxNQUFNLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLENBQUM7Ozs7NkNBTW5EO0FBaEJVLGNBQWM7SUFIMUIsZ0JBQU8sRUFBRTtJQUNWLFlBQVk7O0lBQ1gsbUJBQVUsQ0FBQyxPQUFPLENBQUM7R0FDUCxjQUFjLENBaUIxQjtBQWpCWSx3Q0FBYyJ9