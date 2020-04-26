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
let SPRouterMiddleware = class SPRouterMiddleware {
    resolve() {
        return async (ctx, next) => {
            ctx.spKey = "Key From SP Router Middleware: " + this.ownConfig.param;
            // ctx.service = await ctx.requestContext.getAsync("userService");
            console.log("===SP Router Middleware Start===");
            console.log(ctx.spKey);
            // console.log(ctx.service.testService());
            console.log("===SP Router Middleware End===");
            await next();
        };
    }
};
__decorate([
    midway_1.config("spRouter"),
    __metadata("design:type", Object)
], SPRouterMiddleware.prototype, "ownConfig", void 0);
__decorate([
    midway_1.inject("userService"),
    __metadata("design:type", Object)
], SPRouterMiddleware.prototype, "userService", void 0);
SPRouterMiddleware = __decorate([
    midway_1.provide("SPRouterMiddleware")
], SPRouterMiddleware);
exports.SPRouterMiddleware = SPRouterMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BSb3V0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL21pZGRsZXdhcmUvc3BSb3V0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBNEU7QUFJNUUsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBa0I7SUFPN0IsT0FBTztRQUNMLE9BQU8sS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtZQUN6QixHQUFHLENBQUMsS0FBSyxHQUFHLGlDQUFpQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO1lBQ3JFLGtFQUFrRTtZQUNsRSxPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7WUFDaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdkIsMENBQTBDO1lBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztZQUM5QyxNQUFNLElBQUksRUFBRSxDQUFDO1FBQ2YsQ0FBQyxDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUE7QUFoQkM7SUFEQyxlQUFNLENBQUMsVUFBVSxDQUFDOztxREFDVDtBQUdWO0lBREMsZUFBTSxDQUFDLGFBQWEsQ0FBQzs7dURBQ0k7QUFMZixrQkFBa0I7SUFEOUIsZ0JBQU8sQ0FBQyxvQkFBb0IsQ0FBQztHQUNqQixrQkFBa0IsQ0FrQjlCO0FBbEJZLGdEQUFrQiJ9