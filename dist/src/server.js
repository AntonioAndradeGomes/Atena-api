"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const celebrate_1 = require("celebrate");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const routes_1 = require("./routes");
const AppError_1 = require("./errors/AppError");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./swagger.json"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3333;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(routes_1.router);
app.use((0, celebrate_1.errors)());
app.use("/documentation", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
app.use((err, request, response, next) => {
    if (err instanceof AppError_1.AppError) {
        return response.status(err.statusCode).json({ status: 'error', message: err.message });
    }
    console.log(err);
    return response.status(500).json({ status: 'error', message: 'Internal server error' });
});
app.listen(PORT, () => {
    console.log('Server in running in port 3333');
});
