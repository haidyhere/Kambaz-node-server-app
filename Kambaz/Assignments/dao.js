//import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export async function findAssignmentsForCourse(courseId) {
  return await model.find({course: courseId});
  //const { assignments } = Database;
  //return assignments.filter((a) => a.course === courseId);
}
export async function findAssignmentById(assignmentId) {
  return await model.findById(assignmentId);
  //const { assignments } = Database;
  //return assignments.find((a) => a._id === assignmentId);
}
export async function createAssignment(assignment) {
  const newAssignment = { ...assignment, _id: uuidv4() };
  const created = await model.create(newAssignment);
  return created;
  //Database.assignments = [...Database.assignments, newAssignment];
  //return newAssignment;
}
export async function updateAssignment(assignmentId, updates) {
  await model.updateOne({ _id: assignmentId }, { $set: updates });
  return await model.findById(assignmentId);
  //const assignment = findAssignmentById(assignmentId);
  //Object.assign(assignment, updates);
  //return assignment;
}
export async function deleteAssignment(assignmentId) {
  return await model.deleteOne({ _id: assignmentId });
  //const { assignments } = Database;
  //Database.assignments = assignments.filter((a) => a._id !== assignmentId);
}