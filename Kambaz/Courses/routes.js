import * as dao from "./dao.js"; 
import * as modulesDao from "../Modules/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";
//import Database from "../Database/index.js";
export default function CourseRoutes(app) { 
    app.post("/api/courses/:courseId/modules",async (req, res) => { 
        const { courseId } = req.params; 
        const module = { 
            ...req.body, 
            course: courseId, 
        }; 
        const newModule = await modulesDao.createModule(module); 
        res.send(newModule); 
    });
    app.get("/api/courses", async (req, res) => { 
        const courses = await dao.findAllCourses(); 
        res.send(courses); 
    }); 
    app.post("/api/courses", async (req, res) => {    
        const course = await dao.createCourse(req.body);
        const currentUser = req.session["currentUser"];
        if (currentUser && currentUser._id) { await enrollmentsDao.enrollUserInCourse(currentUser._id, course._id); }
        res.json(course);    
    });

    app.delete("/api/courses/:courseId", async (req, res) => { 
        const { courseId } = req.params; 
        const status = await dao.deleteCourse(courseId); 
        res.send(status); 
    });
    app.put("/api/courses/:courseId", async(req, res) => { 
        const { courseId } = req.params; 
        const courseUpdates = req.body; 
        const status = await dao.updateCourse(courseId, courseUpdates);       
        res.send(status);
    });
    app.get("/api/courses/:courseId/modules", async (req, res) => { 
        const { courseId } = req.params; 
        const modules = await modulesDao.findModulesForCourse(courseId); 
        res.json(modules); 
    });
    app.get("/api/users/:userId/courses", async (req, res) => {
        const { userId } = req.params;
        const courses = await dao.findCoursesForEnrolledUser(userId);
        res.json(courses);
    });



}