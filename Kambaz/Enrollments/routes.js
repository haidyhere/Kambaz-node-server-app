import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {
    app.get("/api/users/:userId/enrollments", (req, res) => {
    res.json(dao.findEnrollmentsByUser(req.params.userId));
  });

  app.post("/api/users/:userId/enrollments/:courseId", (req, res) => {
    const { userId, courseId } = req.params;
    const e = dao.createEnrollment(userId, courseId);
    if (e) res.json(e);
    else res.status(409).send("Already enrolled");
  });
  app.delete("/api/users/:userId/enrollments/:courseId", (req, res) => {
    const { userId, courseId } = req.params;
    dao.deleteEnrollment(userId, courseId);
    res.sendStatus(200);
  });
}