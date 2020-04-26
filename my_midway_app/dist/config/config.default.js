"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
exports.default = (appInfo) => {
    const config = {};
    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + "_{{keys}}";
    // add your config here
    config.middleware = ["log"];
    config.log = {
        level: "debug",
    };
    config.spRouter = {
        param: "config for sp router middleware",
    };
    config.customLogger = {
        onwLogger: {
            file: path_1.default.join(appInfo.root, "logs/own.log"),
        },
    };
    return config;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmRlZmF1bHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnL2NvbmZpZy5kZWZhdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0RBQXdCO0FBRXhCLGtCQUFlLENBQUMsT0FBWSxFQUFFLEVBQUU7SUFDOUIsTUFBTSxNQUFNLEdBQVEsRUFBRSxDQUFDO0lBRXZCLHVFQUF1RTtJQUN2RSxNQUFNLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDO0lBRXpDLHVCQUF1QjtJQUN2QixNQUFNLENBQUMsVUFBVSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFNUIsTUFBTSxDQUFDLEdBQUcsR0FBRztRQUNYLEtBQUssRUFBRSxPQUFPO0tBQ2YsQ0FBQztJQUVGLE1BQU0sQ0FBQyxRQUFRLEdBQUc7UUFDaEIsS0FBSyxFQUFFLGlDQUFpQztLQUN6QyxDQUFDO0lBRUYsTUFBTSxDQUFDLFlBQVksR0FBRztRQUNwQixTQUFTLEVBQUU7WUFDVCxJQUFJLEVBQUUsY0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQztTQUM5QztLQUNGLENBQUM7SUFFRixPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDLENBQUMifQ==