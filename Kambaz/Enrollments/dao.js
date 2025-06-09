import Database from "../Database/index.js"; 
import { v4 as uuidv4 } from "uuid"; 

export function enrollUserInCourse(userId, courseId) { 
    const { enrollments } = Database; 
    enrollments.push({ _id: uuidv4(), user: userId, course: courseId }); 
}
export function findEnrollmentsByUser(userId) {
  return Database.enrollments.filter((e) => e.user === userId);
}
export function isEnrolled(userId, courseId) {
  return Database.enrollments.some(
    (e) => e.user === userId && e.course === courseId
  );
}
export function createEnrollment(userId, courseId) {
  if (isEnrolled(userId, courseId)) {
    return null; 
  }
  const newEnroll = { _id: uuidv4(), user: userId, course: courseId };
  Database.enrollments = [...Database.enrollments, newEnroll];
  return newEnroll;
}
export function deleteEnrollment(userId, courseId) {
  Database.enrollments = Database.enrollments.filter(
    (e) => !(e.user === userId && e.course === courseId)
  );
}