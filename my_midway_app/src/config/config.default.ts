import path from "path";

export default (appInfo: any) => {
  const config: any = {};

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
      file: path.join(appInfo.root, "logs/own.log"),
    },
  };

  return config;
};
