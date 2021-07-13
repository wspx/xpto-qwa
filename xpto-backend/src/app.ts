import express from "express";
import cors from "cors";
import morgan from "morgan";

import routes from './routes'

class App {

    public app: express.Application;

    constructor() {
        
        this.app = express();

        this.middlewares();
        this.routes();
    }



    private middlewares(): void {

        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(morgan("dev"));
    }


    private routes(): void {

        this.app.get("/", (req, res) => {
            res.json({
                name: "XPTO Back-End",
                version: "1.0.0",
                feitoPor: "William da Silva Pereira",
                github: "https://github/wspx",
            });
        });

        //Utiliza todas as rotas estabelecidas no routes.ts
        this.app.use(routes);
    }


    
}


export default new App().app