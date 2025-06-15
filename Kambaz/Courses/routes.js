import * as dao from "./dao.js"; 
import * as modulesDao from "../Modules/dao.js";
//import Database from "../Database/index.js";
export default function CourseRoutes(app) { 
    app.post("/api/courses/:courseId/modules", (req, res) => { 
        const { courseId } = req.params; 
        const module = { 
            ...req.body, 
            course: courseId, 
        }; 
        const newModule = modulesDao.createModule(module); 
        res.send(newModule); 
    });
    app.get("/api/courses", async (req, res) => { 
        const courses = await dao.findAllCourses(); 
        res.send(courses); 
    }); 
    app.post("/api/courses", (req, res) => {
       try { 
    const course = req.body;
    const newCourse = dao.createCourse(course);
    res.send(newCourse);
    } catch (error) {
            console.error("Error creating course:", error);
            res.status(500).send({ error: error.message });
        }
    });

    app.delete("/api/courses/:courseId", (req, res) => { 
        const { courseId } = req.params; 
        const status = dao.deleteCourse(courseId); 
        res.send(status); 
    });
    app.put("/api/courses/:courseId", (req, res) => { 
        try {
        const { courseId } = req.params; 
        const courseUpdates = req.body; 
        console.log("PUT /api/courses/:courseId called");
            console.log("Course ID:", courseId);
            console.log("Course Updates:", courseUpdates);
        const updatedCourse = dao.updateCourse(courseId, courseUpdates); 
        console.log("Course updated successfully, returning:", updatedCourse);
            
        res.send(updatedCourse);
    } catch (error) {
            console.error("Error in PUT /api/courses/:courseId:", error);
            res.status(500).json({ 
                error: error.message,
                stack: error.stack 
            });
        } });
    app.get("/api/courses/:courseId/modules", (req, res) => { 
        const { courseId } = req.params; 
        const modules = modulesDao.findModulesForCourse(courseId); 
        res.json(modules); 
    });



}