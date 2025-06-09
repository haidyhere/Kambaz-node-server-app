import Database from "../Database/index.js"; 
import { v4 as uuidv4 } from "uuid";
export function findAllCourses() { 
    return Database.courses; 
}
export function findCoursesForEnrolledUser(userId) { 
    const { courses, enrollments } = Database; 
    const enrolledCourses = courses.filter((course) => 
        enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id)); 
    return enrolledCourses; 
}

export function createCourse(course) { 
    const newCourse = { ...course, _id: uuidv4() }; 
    Database.courses = [...Database.courses, newCourse]; 
    return newCourse; 
}

export function deleteCourse(courseId) { 
    const { courses, enrollments } = Database; 
    Database.courses = courses.filter((course) => course._id !== courseId); 
    Database.enrollments = enrollments.filter( 
        (enrollment) => enrollment.course !== courseId 
    );
    return { status: "Course deleted" };
}
export function updateCourse(courseId, courseUpdates) { 
    try {
        console.log("DAO updateCourse called with:", { courseId, courseUpdates });
        if (!Database.courses || !Array.isArray(Database.courses)) {
            throw new Error("Database.courses is not properly initialized");
        }
        
        console.log("Current courses count:", Database.courses.length);
        const courseIndex = Database.courses.findIndex((course) => {
            console.log("Comparing:", course._id, "with", courseId);
            return String(course._id) === String(courseId);
        });
        
        console.log("Found course index:", courseIndex);
        if (courseIndex === -1) {
            throw new Error(`Course with ID ${courseId} not found`);
        }
        const originalCourse = Database.courses[courseIndex];
        console.log("Original course:", originalCourse);
        const updatedCourse = { 
            ...originalCourse, 
            ...courseUpdates,
            _id: courseId 
        };
        console.log("Updated course:", updatedCourse);
        Database.courses[courseIndex] = updatedCourse;
        console.log("Course updated successfully");
        return updatedCourse;
        } catch (error) {
        console.error("Error in updateCourse DAO:", error);
        throw error;

    
    
    };
    //const course = courses.find((course) => course._id === courseId); 
    //if (!course) {
    //    throw new Error(`Course with ID ${courseId} not found`);
    //}
    //Object.assign(course, courseUpdates); 
    //return course; 
}
