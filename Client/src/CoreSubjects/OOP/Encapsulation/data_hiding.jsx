import React from 'react';

const DataHiding = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-4">
            Data Hiding
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Protecting internal data and implementation details from external access and modification
          </p>
        </div>

        <div className="grid gap-8">
          {/* Data Hiding Overview */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-blue-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-blue-400 rounded-full mr-3"></span>
              Data Hiding Overview
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-200">Definition</h3>
                <p className="text-gray-300">
                  Data hiding is the practice of restricting access to internal data members and implementation details of a class, exposing only necessary interfaces to the outside world.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Information hiding:</strong> Conceals internal implementation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Access control:</strong> Restricts direct data manipulation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Interface design:</strong> Provides controlled access methods</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-200">Key Benefits</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Data integrity and validation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Reduced coupling between classes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Easier maintenance and debugging</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Enhanced security and robustness</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Java Data Hiding */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-green-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-green-400 rounded-full mr-3"></span>
              Java Data Hiding
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-300 mb-4">BankAccount Example</h3>
                <pre className="text-green-400 text-sm overflow-x-auto">
{`public class BankAccount {
    // Private data members - hidden from external access
    private String accountNumber;
    private String accountHolder;
    private double balance;
    private String pin;
    private boolean isActive;
    
    // Constructor
    public BankAccount(String accountNumber, String accountHolder, String pin) {
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.pin = pin;
        this.balance = 0.0;
        this.isActive = true;
    }
    
    // Public interface methods for controlled access
    public boolean deposit(double amount) {
        if (!isActive) {
            System.out.println("Account is inactive");
            return false;
        }
        
        if (amount <= 0) {
            System.out.println("Invalid deposit amount");
            return false;
        }
        
        balance += amount;
        System.out.println("Deposited: $" + amount);
        return true;
    }
    
    public boolean withdraw(double amount, String enteredPin) {
        // Validate PIN
        if (!validatePin(enteredPin)) {
            System.out.println("Invalid PIN");
            return false;
        }
        
        if (!isActive) {
            System.out.println("Account is inactive");
            return false;
        }
        
        if (amount <= 0) {
            System.out.println("Invalid withdrawal amount");
            return false;
        }
        
        if (amount > balance) {
            System.out.println("Insufficient funds");
            return false;
        }
        
        balance -= amount;
        System.out.println("Withdrawn: $" + amount);
        return true;
    }
    
    // Private helper method - internal implementation detail
    private boolean validatePin(String enteredPin) {
        return this.pin.equals(enteredPin);
    }
    
    // Public getter methods with controlled access
    public double getBalance(String enteredPin) {
        if (validatePin(enteredPin)) {
            return balance;
        }
        System.out.println("Access denied - Invalid PIN");
        return -1;
    }
    
    public String getAccountNumber() {
        // Only return partial account number for security
        return "****" + accountNumber.substring(accountNumber.length() - 4);
    }
    
    public String getAccountHolder() {
        return accountHolder;
    }
    
    // No direct setter for balance - only through deposit/withdraw
    // No getter for PIN - security measure
}`}
                </pre>
              </div>
            </div>
          </section>

          {/* C++ Data Hiding */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-purple-400 rounded-full mr-3"></span>
              C++ Data Hiding
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-purple-300 mb-4">Student Class Example</h3>
                <pre className="text-green-400 text-sm overflow-x-auto">
{`#include <iostream>
#include <string>
#include <vector>
using namespace std;

class Student {
private:
    // Private data members - hidden implementation
    string studentId;
    string name;
    int age;
    vector<double> grades;
    double gpa;
    bool isEnrolled;
    
    // Private helper methods
    void calculateGPA() {
        if (grades.empty()) {
            gpa = 0.0;
            return;
        }
        
        double sum = 0.0;
        for (double grade : grades) {
            sum += grade;
        }
        gpa = sum / grades.size();
    }
    
    bool isValidGrade(double grade) {
        return grade >= 0.0 && grade <= 100.0;
    }
    
public:
    // Constructor
    Student(string id, string studentName, int studentAge) 
        : studentId(id), name(studentName), age(studentAge), 
          gpa(0.0), isEnrolled(true) {
        cout << "Student created: " << name << endl;
    }
    
    // Public interface for controlled access
    bool addGrade(double grade) {
        if (!isEnrolled) {
            cout << "Student is not enrolled" << endl;
            return false;
        }
        
        if (!isValidGrade(grade)) {
            cout << "Invalid grade: " << grade << endl;
            return false;
        }
        
        grades.push_back(grade);
        calculateGPA();  // Automatically update GPA
        cout << "Grade added: " << grade << endl;
        return true;
    }
    
    void displayGrades() const {
        if (!isEnrolled) {
            cout << "Access denied - Student not enrolled" << endl;
            return;
        }
        
        cout << "Grades for " << name << ": ";
        for (size_t i = 0; i < grades.size(); ++i) {
            cout << grades[i];
            if (i < grades.size() - 1) cout << ", ";
        }
        cout << endl;
    }
    
    // Controlled access to private data
    string getName() const { return name; }
    
    double getGPA() const { 
        if (!isEnrolled) {
            cout << "Access denied - Student not enrolled" << endl;
            return -1.0;
        }
        return gpa; 
    }
    
    string getStudentId() const {
        // Return masked ID for security
        return "***" + studentId.substr(studentId.length() - 3);
    }
    
    bool isStudentEnrolled() const { return isEnrolled; }
    
    // Controlled modification methods
    void setName(const string& newName) {
        if (!newName.empty()) {
            name = newName;
            cout << "Name updated to: " << name << endl;
        }
    }
    
    void enrollStudent() {
        isEnrolled = true;
        cout << name << " has been enrolled" << endl;
    }
    
    void withdrawStudent() {
        isEnrolled = false;
        cout << name << " has been withdrawn" << endl;
    }
};`}
                </pre>
              </div>
            </div>
          </section>

          {/* Access Control Mechanisms */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-yellow-400 rounded-full mr-3"></span>
              Access Control Mechanisms
            </h2>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-yellow-300">Java Access Modifiers</h3>
                  <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                    <ul className="space-y-3 text-gray-300 text-sm">
                      <li className="flex items-start">
                        <span className="w-16 text-red-400 font-mono">private</span>
                        <span>Accessible only within the same class</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-16 text-yellow-400 font-mono">default</span>
                        <span>Accessible within the same package</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-16 text-blue-400 font-mono">protected</span>
                        <span>Accessible within package and subclasses</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-16 text-green-400 font-mono">public</span>
                        <span>Accessible from anywhere</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-yellow-300">C++ Access Specifiers</h3>
                  <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                    <ul className="space-y-3 text-gray-300 text-sm">
                      <li className="flex items-start">
                        <span className="w-16 text-red-400 font-mono">private</span>
                        <span>Accessible only within the class</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-16 text-blue-400 font-mono">protected</span>
                        <span>Accessible within class and derived classes</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-16 text-green-400 font-mono">public</span>
                        <span>Accessible from anywhere</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-16 text-purple-400 font-mono">friend</span>
                        <span>Special access to private/protected members</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Data Validation Example */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-red-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-red-400 rounded-full mr-3"></span>
              Data Validation and Integrity
            </h2>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-red-300">Java Validation Example</h3>
                  <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                    <pre className="text-green-400 text-sm overflow-x-auto">
{`public class Person {
    private String name;
    private int age;
    private String email;
    
    public void setName(String name) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException(
                "Name cannot be null or empty");
        }
        this.name = name.trim();
    }
    
    public void setAge(int age) {
        if (age < 0 || age > 150) {
            throw new IllegalArgumentException(
                "Age must be between 0 and 150");
        }
        this.age = age;
    }
    
    public void setEmail(String email) {
        if (email == null || !isValidEmail(email)) {
            throw new IllegalArgumentException(
                "Invalid email format");
        }
        this.email = email.toLowerCase();
    }
    
    private boolean isValidEmail(String email) {
        return email.contains("@") && 
               email.contains(".") && 
               email.length() > 5;
    }
    
    // Safe getters
    public String getName() { return name; }
    public int getAge() { return age; }
    public String getEmail() { return email; }
}`}
                    </pre>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-red-300">C++ Validation Example</h3>
                  <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                    <pre className="text-green-400 text-sm overflow-x-auto">
{`class Rectangle {
private:
    double width;
    double height;
    
    bool isValidDimension(double value) {
        return value > 0.0 && value <= 1000.0;
    }
    
public:
    Rectangle(double w, double h) {
        setWidth(w);
        setHeight(h);
    }
    
    void setWidth(double w) {
        if (!isValidDimension(w)) {
            throw invalid_argument(
                "Width must be positive and <= 1000");
        }
        width = w;
    }
    
    void setHeight(double h) {
        if (!isValidDimension(h)) {
            throw invalid_argument(
                "Height must be positive and <= 1000");
        }
        height = h;
    }
    
    double getWidth() const { return width; }
    double getHeight() const { return height; }
    
    double getArea() const {
        return width * height;
    }
    
    double getPerimeter() const {
        return 2 * (width + height);
    }
};`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits and Best Practices */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-indigo-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-indigo-400 rounded-full mr-3"></span>
              Benefits and Best Practices
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-indigo-300">Key Benefits</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Data Integrity:</strong> Prevents invalid data states</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Modularity:</strong> Clear separation of concerns</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Maintainability:</strong> Easier to modify internal implementation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Security:</strong> Controlled access to sensitive data</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Debugging:</strong> Easier to track data modifications</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-indigo-300">Best Practices</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Make data members private by default</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Provide controlled access through methods</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Validate input in setter methods</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Use const methods for read-only operations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Design minimal and focused interfaces</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DataHiding;
