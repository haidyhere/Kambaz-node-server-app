import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {
  const findAllEnrollments = async (req, res) => {
    const enrollments = await dao.findAllEnrollments();
    res.json(enrollments);
  }
  app.get("/api/enrollments", findAllEnrollments);

  

  app.post("/api/users/:userId/enrollments/:courseId", async (req, res) => {
    try {
      const { userId, courseId } = req.params;
      console.log("Route: Enrolling user", userId, "in course", courseId);
            
      const enrollment = await dao.enrollUserInCourse(userId, courseId);
      console.log("Route: Enrollment successful:", enrollment);
            
      res.json(enrollment);
    } catch (error) {
      console.error("Route: Error in enrollment:", error);
            
      res.status(500).json({ 
      message: "User already enrolled or enrollment successful",
      error: error.message 
  });        
    //const { userId, courseId } = req.params;
    //const enrollment = await dao.createEnrollment(userId, courseId);
    //if (e) res.json(e);
    //else res.status(409).send("Already enrolled");
    }
  });
  
  app.delete("/api/users/:userId/enrollments/:courseId", async (req, res) => {
    const { userId, courseId } = req.params;
    await dao.deleteEnrollment(userId, courseId);
    res.sendStatus(200);
  });
  const findEnrollmentsByUser = async (req, res) => {
    const { userId } = req.params;
    const enrollments = await dao.findEnrollmentsByUser(userId);
    res.json(enrollments);
  }
  const findEnrollmentsForCourse = async (req, res) => {
    const { courseId } = req.params;
    const enrollments = await dao.findEnrollmentsForCourse(courseId);
    res.json(enrollments);
  }
  app.get("/api/users/:userId/enrollments", findEnrollmentsByUser);
  app.get("/api/courses/:courseId/enrollments", findEnrollmentsForCourse);

  const findCoursesForUser = async (req, res) => {
    const { userId } = req.params;
    const enrollments = await dao.findEnrollmentsByUser(userId);
    const courses = enrollments.map((enrollment) => enrollment.course);
    res.json(courses);
  }
  const findUsersForCourse = async (req, res) => {
    const { courseId } = req.params;
    const enrollments = await dao.findEnrollmentsForCourse(courseId);
    const users = enrollments.map((enrollment) => enrollment.user);
    res.json(users);
  }
  app.get("/api/users/:userId/courses", findCoursesForUser);
  app.get("/api/courses/:courseId/users", findUsersForCourse);

}