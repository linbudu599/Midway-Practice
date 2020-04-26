"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function log(options) {
    return async (ctx, next) => {
        console.log("===Log Middleware Start===");
        console.log(`level: ${options.level}`);
        await next();
        console.log("===Log Middleware End===");
    };
}
exports.default = log;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9taWRkbGV3YXJlL2xvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLFNBQVMsR0FBRyxDQUFDLE9BQU87SUFDbEIsT0FBTyxLQUFLLEVBQUUsR0FBWSxFQUFFLElBQUksRUFBRSxFQUFFO1FBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQztRQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDdkMsTUFBTSxJQUFJLEVBQUUsQ0FBQztRQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsQ0FBQztJQUMxQyxDQUFDLENBQUM7QUFDSixDQUFDO0FBRUQsa0JBQWUsR0FBRyxDQUFDIn0=