import inquirer from "inquirer";
class Student {
    static Counter = 10000;
    id;
    name;
    Courses;
    Balance;
    constructor(name) {
        this.id = Student.Counter++;
        this.name = name;
        this.Courses = []; // Initialize an empty array for courses
        this.Balance = 100;
    }
    // Method to enroll a student in a course
    enroll_courses(course) {
        this.Courses.push(course);
    }
    // Method to view a student balance
    view_balance() {
        console.log(`Balance for ${this.name}: $${this.Balance}`);
    }
    // Method to pay student fees
    pay_fees(amount) {
        this.Balance -= amount;
        console.log(`$${amount} fees paid successfully!`);
        console.log(`Remaining balance is $${this.Balance}`);
    }
    // Method to display student status
    show_status() {
        console.log(`Student ID: ${this.id}`);
        console.log(`Student Name: ${this.name}`);
        console.log(`Courses: ${this.Courses.join(", ")}`);
        console.log(`Balance: $${this.Balance}`);
    }
}
// Defining a studentManager class to manage students
class studentManager {
    students;
    constructor() {
        this.students = [];
    }
    // Method to add a new student
    add_student(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(`Student: ${name} added successfully. Student ID: ${student.id}`);
    }
    // Method to enroll a student in a course
    enroll_student(student_id, course) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_courses(course);
            console.log(`${student.name} enrolled in ${course} successfully!`);
        }
        else {
            console.log("Student not found, please enter a correct student ID");
        }
    }
    // Method to view a student balance
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log("Student not found, please enter a correct student ID");
        }
    }
    // Method to pay student fees
    pay_student_fees(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log("Student not found, please enter a correct student ID");
        }
    }
    // Method to display student status
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
        else {
            console.log("Student not found, please enter a correct student ID");
        }
    }
    // Method to find a student by student_id
    find_student(student_id) {
        return this.students.find(std => std.id === student_id);
    }
}
// Main function to run the program
async function main() {
    console.log("Welcome to my Student Management System");
    console.log("_".repeat(60));
    let Student_Manager = new studentManager();
    // while loop to keep program running
    while (true) {
        let choice = await inquirer.prompt([{
                name: "Choice",
                type: "list",
                message: "Select an option",
                choices: ["Add Student", "Enroll Student", "View Student Balance", "Pay Fees", "Show Status", "Exit"]
            }]);
        // Using switch case to handle user choice
        switch (choice.Choice) {
            case "Add Student":
                let name_input = await inquirer.prompt([{
                        name: "Name",
                        type: "input",
                        message: "Enter Student Name"
                    }]);
                Student_Manager.add_student(name_input.Name);
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([{
                        name: "Student_ID",
                        type: "number",
                        message: "Enter Student ID"
                    }, {
                        name: "Course",
                        type: "input",
                        message: "Enter a Course Name"
                    }]);
                Student_Manager.enroll_student(course_input.Student_ID, course_input.Course);
                break;
            case "View Student Balance":
                let balance_input = await inquirer.prompt([{
                        name: "Student_ID",
                        type: "number",
                        message: "Enter Student ID"
                    }]);
                Student_Manager.view_student_balance(balance_input.Student_ID);
                break;
            case "Pay Fees":
                let fees_input = await inquirer.prompt([{
                        name: "Student_ID",
                        type: "number",
                        message: "Enter Student ID"
                    }, {
                        name: "Amount",
                        type: "number",
                        message: "Enter the amount to pay"
                    }]);
                Student_Manager.pay_student_fees(fees_input.Student_ID, fees_input.Amount);
                break;
            case "Show Status":
                let status_input = await inquirer.prompt([{
                        name: "Student_ID",
                        type: "number",
                        message: "Enter Student ID"
                    }]);
                Student_Manager.show_student_status(status_input.Student_ID);
                break;
            case "Exit":
                console.log("Exiting...");
                process.exit();
        }
    }
}
// Calling the main function
main();
