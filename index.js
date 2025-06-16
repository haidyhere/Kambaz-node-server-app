import express from 'express';
import mongoose from "mongoose";
import cors from "cors";
import session from 'express-session';
import "dotenv/config";

import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import PathParameters from "./Lab5/PathParameters.js";
import QueryParameters from './Lab5/QueryParameters.js';
import WorkingWithObjects from './Lab5/WorkingWithObjects.js';
import ModuleObject from './Lab5/ModuleObject.js';
import WorkingWithArrays from './Lab5/WorkingWithArrays.js';
import SessionController from './Lab5/SessionController.js';
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from "./Kambaz/Assignments/routes.js";
import EnrollmentRoutes from "./Kambaz/Enrollments/routes.js";

const CONNECTION_STRING = 
  process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz";
mongoose.connect(CONNECTION_STRING);
const app = express() 
app.use(cors(
    {credentials: true, 
    origin: [
        //process.env.NETLIFY_URL || 
    "http://localhost:5173", "https://a6--deploys-for-kanbas-react-web-app.netlify.app",
"https://a6--deploys-for-kanbas-react-web-app.netlify.app/" ]
}));

app.use(express.json());
const sessionOptions = { 
    secret: process.env.SESSION_SECRET || "kambaz", 
    resave: false, 
    saveUninitialized: false, 
}; 
if (process.env.NODE_ENV !== "development") { 
    sessionOptions.proxy = true; 
    sessionOptions.cookie = { 
        sameSite: "none", 
        secure: true, 
        domain: process.env.NODE_SERVER_DOMAIN, 
    }; 
} 
app.use(session(sessionOptions));



Hello(app);
Lab5(app);
PathParameters(app);
QueryParameters(app);
WorkingWithObjects(app);
ModuleObject(app);
WorkingWithArrays(app);
SessionController(app);
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);

app.listen(process.env.PORT || 4000)