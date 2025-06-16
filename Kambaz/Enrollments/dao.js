//import Database from "../Database/index.js"; 
import model from "./model.js";

import { v4 as uuidv4 } from "uuid"; 

export async function enrollUserInCourse(user, course) { 
  console.log("DAO: Enrolling user", user, "in course", course);
  try {
    
    const alreadyEnrolled = await isEnrolled(user, course);
    if (alreadyEnrolled) {
      console.log("DAO: User already enrolled");
      const existingEnrollment = await model.findOne({ user, course });
      return existingEnrollment;
    }
  const newEnrollment = { user, course, _id: `${user}-${course}` };
  const result = await model.create(newEnrollment);
    console.log("DAO: Enrollment created:", result);
    return result;
    } catch (error) {
    console.error("DAO: Error in enrollUserInCourse:", error);
    throw error;
  }

  //return model.create(newEnrollment);
    //const { enrollments } = Database; 
    //enrollments.push({ _id: uuidv4(), user: userId, course: courseId }); 
}
export async function findAllEnrollments() {
  const enrollments = await model.find()
  return enrollments;
}
export async function findEnrollmentsByUser(userId) {
  const enrollments = await model.find({ user: userId }).populate("course");
  return enrollments;
}
export async function findEnrollmentsForCourse(courseId) {
  const enrollments = await model.find({ course: courseId }).populate("user");
  return enrollments;
}
export async function isEnrolled(userId, courseId) {
  const count = await model.countDocuments({ user: userId, course: courseId });
  return count > 0;
  //return Database.enrollments.some(
  //  (e) => e.user === userId && e.course === courseId
  //);
}
export async function createEnrollment(userId, courseId) {
  const enrolled = await isEnrolled(userId, courseId);
  if (enrolled) {
    return null; 
  }
  const enrollment = {
    _id: `${userId}-${courseId}`,
    user: userId,
    course: courseId,
    enrollmentDate: new Date()
  };
  
  return await model.create(enrollment);
  //const newEnroll = { _id: uuidv4(), user: userId, course: courseId };
  //Database.enrollments = [...Database.enrollments, newEnroll];
  //return newEnroll;

}
export async function deleteEnrollment(userId, courseId) {
  try {
    const result = await model.deleteOne({ user: userId, course: courseId });
    console.log("DAO: Deletion result:", result);
    return result;
  } catch (error) {
    console.error("DAO: Error in deleteEnrollment:", error);
    throw error;
  }
  //Database.enrollments = Database.enrollments.filter(
  //  (e) => !(e.user === userId && e.course === courseId)
  //);
}
export async function unenrollUserFromCourse(user, course) { 
  return model.deleteOne({ user, course }); 
}

export async function findCoursesForUser(userId) { 
  const enrollments = await model.find({ user: userId }).populate("course"); 
  return enrollments.map((enrollment) => enrollment.course); 
}
export async function findUsersForCourse(courseId) { 
  const enrollments = await model.find({ course: courseId }).populate("user"); 
  return enrollments.map((enrollment) => enrollment.user); 
}

