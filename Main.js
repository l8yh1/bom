const logger = require("./utils/log");
const chalk = require("chalk");
const cv = chalk.bold.hex("#1390f0");
const gradient = require("gradient-string")
const logo = `


▒█▀▀▀█ ░█▀▀█ ▒█▀▀▀█ 
░▄▄▄▀▀ ▒█▄▄█ ▒█░░▒█ 
▒█▄▄▄█ ▒█░▒█ ▒█▄▄▄█


Hi I'M BOT ZAO  DEVELOPED  BY SAIM`;

const c = ["cyan", "#7D053F"];
const redToGreen = gradient("red", "cyan");
console.log(redToGreen("━".repeat(50), { interpolation: "hsv" }));
const text = gradient(c).multiline(logo);
console.log(text);
console.log(redToGreen("━".repeat(50), { interpolation: "hsv" }));

console.log(cv(`\n` + `──ZAOFAN STARTER─●`));


logger.log([
  {
  message: "[ SAIM ]: ",
   color: ["red", "cyan"],
  },
  {
  message: `test`,
  color: "white",
  },
]);

const { spawn } = require('child_process');
const Fastify = require('fastify');
const fastifyStatic = require('@fastify/static'); 
class Zao {
  constructor() {
    this.app = Fastify();
    this.PORT = process.env.PORT || 3000;
    this.countRestart = 0;
    this.child = null;
    this.init();
  }

  init() {
    this.startApp();
    this.startBot();
  }

  startApp() {
    this.app.get("/", (req, reply) => {
      reply.send("HI I'M ZAO... (눈-눈) ")
    });

    const listenOptions = {
      port: this.PORT,
      host: '0.0.0.0',
    };

    this.app.listen(listenOptions, (err, address) => {
      if (err) {
        logger.log([
          {
          message: "[ SAIM ]: ",
           color: ["red", "red"],
          },
          {
          message: `Error starting server: ${err}`,
          color: "white",
          },
        ]);
        process.exit(1);
      }
      logger.log([
        {
        message: "[ SAIM ]",
         color: ["red", "cyan"],
        },
        {
        message: `App deployed on port ${this.PORT}`,
        color: "white",
        },
      ]);
    });
  }
  startBot() {
    const options = {
      cwd: __dirname,
      stdio: "inherit",
      shell: true,
    };
    this.child = spawn(
      "node",
      [ "--trace-deprecation", "--trace-warnings", "--async-stack-traces", "ZAO.js"],
      options
    );
    this.child.on("close", (codeExit) => {
      if (codeExit !== 0 && this.countRestart < 10) {
        this.countRestart += 1;
        logger.log([
          {
          message: "[ BOT ]: ",
           color: ["yellow", "cyan"],
          },
          {
          message: `Bot crashed, restart attempt ${this.countRestart}/10. Server still running on port ${this.PORT}`,
          color: "white",
          },
        ]);
        setTimeout(() => this.startBot(), 5000);
      } else if (codeExit !== 0) {
        logger.log([
          {
          message: "[ BOT ]: ",
           color: ["red", "cyan"],
          },
          {
          message: `Bot failed after 10 restarts. HTTP Server still available on port ${this.PORT}`,
          color: "white",
          },
        ]);
      }
    });
    this.child.on("error", (error) => {
      logger.log([
        {
        message: "[ BOT ERROR ]: ",
         color: ["red", "cyan"],
        },
        {
        message: `${JSON.stringify(error)}`,
        color: "white",
        },
      ]);
    });
  }
}

const ZAO  = new Zao();