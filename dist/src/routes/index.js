"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const discipline_routes_1 = require("../modules/disciplines/routes/discipline.routes");
const class_routes_1 = require("../modules/classes/routes/class.routes");
const event_routes_1 = require("../modules/events/routes/event.routes");
const accessCode_routes_1 = require("../modules/accessCode/routes/accessCode.routes");
const request_routes_1 = require("../modules/request/routes/request.routes");
const users_routes_1 = require("../modules/users/crud/routes/users.routes");
const professor_routes_1 = require("../modules/users/crud/routes/professor.routes");
const students_routes_1 = require("../modules/users/crud/routes/students.routes");
const ca_routes_1 = require("../modules/users/crud/routes/ca.routes");
const authentication_routes_1 = require("../modules/users/auth/routes/authentication.routes");
const password_routes_1 = require("../modules/users/password/routes/password.routes");
const studentJoinAClass_routes_1 = require("../modules/users/studentJoinAClass/routes/studentJoinAClass.routes");
const sudentJoinCA_routes_1 = require("../modules/users/studentJoinCA/routes/sudentJoinCA.routes");
const router = (0, express_1.Router)();
exports.router = router;
router.use("/user", users_routes_1.userRouter);
router.use("/professor", professor_routes_1.professorRoutes);
router.use("/student", students_routes_1.studentRoutes);
router.use("/academiccenter", ca_routes_1.caRoutes);
router.use("/studentClass", studentJoinAClass_routes_1.studentJoinAClass);
router.use("/studentJoinCA", sudentJoinCA_routes_1.studentJoinCa);
router.use("/auth", authentication_routes_1.authenticationRoutes);
router.use("/password", password_routes_1.passRoutes);
router.use("/event", event_routes_1.eventRouter);
router.use("/discipline", discipline_routes_1.disciplineRouter);
router.use("/class", class_routes_1.classRouter);
router.use("/code", accessCode_routes_1.accessCodeRouter);
router.use("/request", request_routes_1.requestRouter);
