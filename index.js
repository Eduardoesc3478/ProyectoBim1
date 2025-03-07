import { config } from "dotenv";
import { initServer } from "./configs/server.js";
import { categoriaPorDefecto} from "./src/category/category.controller.js";


categoriaPorDefecto();
config();
initServer();