import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
    app.get("/api/courses/:courseId/assignments", async (req, res) => {
    const { courseId } = req.params;
    res.json(await dao.findAssignmentsForCourse(courseId));
  });

  app.get("/api/assignments/:assignmentId", async (req, res) => {
    const { assignmentId } = req.params;
    res.json(await dao.findAssignmentById(assignmentId));
  });
  app.post("/api/courses/:courseId/assignments", async (req, res) => {
    try{
    const { courseId } = req.params;
    const assignment = { ...req.body, course: courseId };
    const newAssignment = dao.createAssignment(assignment);
    res.json(newAssignment);
    } catch (e) {
    console.error("Create assignment error ▶", e);  
    res.status(500).send(e.toString());
  }
  });
  app.put("/api/assignments/:assignmentId", async (req, res) => {
    const { assignmentId } = req.params;
    res.json(await dao.updateAssignment(assignmentId, req.body));
  });
  app.delete("/api/assignments/:assignmentId", async (req, res) => {
    const { assignmentId } = req.params;
    res.json(await dao.deleteAssignment(assignmentId));
  });
}