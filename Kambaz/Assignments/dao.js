import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function findAssignmentsForCourse(courseId) {
  const { assignments } = Database;
  return assignments.filter((a) => a.course === courseId);
}
export function findAssignmentById(assignmentId) {
  const { assignments } = Database;
  return assignments.find((a) => a._id === assignmentId);
}
export function createAssignment(assignment) {
  const newAssignment = { ...assignment, _id: uuidv4() };
  Database.assignments = [...Database.assignments, newAssignment];
  return newAssignment;
}
export function updateAssignment(assignmentId, updates) {
  const assignment = findAssignmentById(assignmentId);
  Object.assign(assignment, updates);
  return assignment;
}
export function deleteAssignment(assignmentId) {
  const { assignments } = Database;
  Database.assignments = assignments.filter((a) => a._id !== assignmentId);
}