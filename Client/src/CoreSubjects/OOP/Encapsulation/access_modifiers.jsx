import React from 'react';

const AccessModifiers = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-4">
            Access Modifiers
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Keywords that control the visibility and accessibility of classes, methods, and variables
          </p>
        </div>

        <div className="grid gap-8">
          {/* Access Modifiers Overview */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-blue-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-blue-400 rounded-full mr-3"></span>
              Access Modifiers Overview
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-200">Purpose</h3>
                <p className="text-gray-300">
                  Access modifiers define the scope and visibility of classes, methods, and variables, controlling which parts of a program can access specific members.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Encapsulation:</strong> Enforce data hiding principles</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Security:</strong> Prevent unauthorized access</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Modularity:</strong> Define clear interfaces</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-200">Key Benefits</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Controlled access to class members</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Improved code maintainability</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Enhanced security and data integrity</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Better code organization</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Java Access Modifiers */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-green-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-green-400 rounded-full mr-3"></span>
              Java Access Modifiers
            </h2>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-green-300 mb-4">Access Levels</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <span className="w-16 text-red-400 font-mono text-sm">private</span>
                      <span className="text-gray-300 text-sm">Same class only</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="w-16 text-yellow-400 font-mono text-sm">default</span>
                      <span className="text-gray-300 text-sm">Same package</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="w-16 text-blue-400 font-mono text-sm">protected</span>
                      <span className="text-gray-300 text-sm">Package + subclasses</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="w-16 text-green-400 font-mono text-sm">public</span>
                      <span className="text-gray-300 text-sm">Everywhere</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-green-300 mb-4">Accessibility Matrix</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="text-gray-400">
                          <th className="text-left p-1">Modifier</th>
                          <th className="text-center p-1">Class</th>
                          <th className="text-center p-1">Package</th>
                          <th className="text-center p-1">Subclass</th>
                          <th className="text-center p-1">World</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-300">
                        <tr>
                          <td className="p-1 text-red-400">private</td>
                          <td className="text-center p-1">✓</td>
                          <td className="text-center p-1">✗</td>
                          <td className="text-center p-1">✗</td>
                          <td className="text-center p-1">✗</td>
                        </tr>
                        <tr>
                          <td className="p-1 text-yellow-400">default</td>
                          <td className="text-center p-1">✓</td>
                          <td className="text-center p-1">✓</td>
                          <td className="text-center p-1">✗</td>
                          <td className="text-center p-1">✗</td>
                        </tr>
                        <tr>
                          <td className="p-1 text-blue-400">protected</td>
                          <td className="text-center p-1">✓</td>
                          <td className="text-center p-1">✓</td>
                          <td className="text-center p-1">✓</td>
                          <td className="text-center p-1">✗</td>
                        </tr>
                        <tr>
                          <td className="p-1 text-green-400">public</td>
                          <td className="text-center p-1">✓</td>
                          <td className="text-center p-1">✓</td>
                          <td className="text-center p-1">✓</td>
                          <td className="text-center p-1">✓</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-300 mb-4">Java Example</h3>
                <pre className="text-green-400 text-sm overflow-x-auto">
{`// File: Employee.java
package com.company.hr;

public class Employee {
    // Private - accessible only within Employee class
    private String socialSecurityNumber;
    private double salary;
    
    // Default (package-private) - accessible within com.company.hr package
    String department;
    int employeeId;
    
    // Protected - accessible within package and subclasses
    protected String name;
    protected Date hireDate;
    
    // Public - accessible from anywhere
    public String email;
    public String phoneNumber;
    
    // Private constructor - can only be called from within class
    private Employee() {
        // Used for internal object creation
    }
    
    // Public constructor - accessible from anywhere
    public Employee(String name, String email, String department) {
        this.name = name;
        this.email = email;
        this.department = department;
        this.employeeId = generateEmployeeId();
    }
    
    // Private method - internal helper
    private int generateEmployeeId() {
        return (int) (Math.random() * 100000);
    }
    
    // Default method - package access
    void updateDepartment(String newDepartment) {
        this.department = newDepartment;
    }
    
    // Protected method - accessible to subclasses
    protected void updateSalary(double newSalary) {
        if (newSalary > 0) {
            this.salary = newSalary;
        }
    }
    
    // Public methods - accessible from anywhere
    public String getName() {
        return name;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    // Public method accessing private data
    public String getEmployeeInfo() {
        return "Employee: " + name + " (ID: " + employeeId + ")";
    }
}`}
                </pre>
              </div>
            </div>
          </section>

          {/* C++ Access Specifiers */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-purple-400 rounded-full mr-3"></span>
              C++ Access Specifiers
            </h2>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-purple-300 mb-4">Access Levels</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <span className="w-16 text-red-400 font-mono text-sm">private</span>
                      <span className="text-gray-300 text-sm">Same class only</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="w-16 text-blue-400 font-mono text-sm">protected</span>
                      <span className="text-gray-300 text-sm">Class + derived classes</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="w-16 text-green-400 font-mono text-sm">public</span>
                      <span className="text-gray-300 text-sm">Everywhere</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="w-16 text-purple-400 font-mono text-sm">friend</span>
                      <span className="text-gray-300 text-sm">Special access</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-purple-300 mb-4">Inheritance Access</h3>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div><span className="text-green-400">public</span> inheritance: maintains access levels</div>
                    <div><span className="text-blue-400">protected</span> inheritance: public → protected</div>
                    <div><span className="text-red-400">private</span> inheritance: all → private</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-purple-300 mb-4">C++ Example</h3>
                <pre className="text-green-400 text-sm overflow-x-auto">
{`#include <iostream>
#include <string>
using namespace std;

class BankAccount {
private:
    // Private members - accessible only within BankAccount class
    string accountNumber;
    double balance;
    string pin;
    
    // Private helper method
    bool validatePin(const string& enteredPin) {
        return pin == enteredPin;
    }
    
protected:
    // Protected members - accessible within class and derived classes
    string accountType;
    double interestRate;
    
    // Protected method for derived classes
    void updateInterestRate(double rate) {
        if (rate >= 0.0 && rate <= 0.15) {
            interestRate = rate;
        }
    }
    
public:
    // Public members - accessible from anywhere
    string bankName;
    string branchCode;
    
    // Public constructor
    BankAccount(string accNum, string accType, string userPin) 
        : accountNumber(accNum), accountType(accType), pin(userPin),
          balance(0.0), interestRate(0.02), bankName("MyBank") {}
    
    // Public methods
    bool deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            cout << "Deposited: $" << amount << endl;
            return true;
        }
        return false;
    }
    
    bool withdraw(double amount, const string& enteredPin) {
        if (!validatePin(enteredPin)) {
            cout << "Invalid PIN" << endl;
            return false;
        }
        
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            cout << "Withdrawn: $" << amount << endl;
            return true;
        }
        return false;
    }
    
    double getBalance(const string& enteredPin) {
        if (validatePin(enteredPin)) {
            return balance;
        }
        cout << "Access denied" << endl;
        return -1;
    }
    
    // Friend function declaration - special access to private members
    friend void displayAccountDetails(const BankAccount& account);
};

// Derived class demonstrating inheritance access
class SavingsAccount : public BankAccount {
private:
    int withdrawalLimit;
    
public:
    SavingsAccount(string accNum, string userPin, int limit) 
        : BankAccount(accNum, "Savings", userPin), withdrawalLimit(limit) {
        // Can access protected members from base class
        updateInterestRate(0.03);  // Protected method
        accountType = "Premium Savings";  // Protected member
        
        // Cannot access private members directly
        // balance = 1000;  // ERROR: private member
    }
    
    void setSpecialRate(double rate) {
        // Accessing protected method from base class
        updateInterestRate(rate);
    }
    
    void displayAccountType() {
        // Accessing protected member
        cout << "Account Type: " << accountType << endl;
        // Accessing public member
        cout << "Bank: " << bankName << endl;
    }
};

// Friend function - has access to private members
void displayAccountDetails(const BankAccount& account) {
    cout << "Account Number: " << account.accountNumber << endl;
    cout << "Balance: $" << account.balance << endl;
    cout << "Account Type: " << account.accountType << endl;
}`}
                </pre>
              </div>
            </div>
          </section>

          {/* Access Modifier Comparison */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-yellow-400 rounded-full mr-3"></span>
              Java vs C++ Comparison
            </h2>
            <div className="space-y-6">
              <div className="overflow-x-auto">
                <table className="w-full bg-gray-900/70 border border-gray-600/50 rounded-lg">
                  <thead className="bg-gray-800/80">
                    <tr>
                      <th className="p-4 text-left text-gray-200">Aspect</th>
                      <th className="p-4 text-left text-gray-200">Java</th>
                      <th className="p-4 text-left text-gray-200">C++</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-t border-gray-600/50">
                      <td className="p-4 font-semibold text-yellow-400">Access Levels</td>
                      <td className="p-4">private, default, protected, public</td>
                      <td className="p-4">private, protected, public</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-4 font-semibold text-yellow-400">Default Access</td>
                      <td className="p-4">Package-private (default)</td>
                      <td className="p-4">Private (for class members)</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-4 font-semibold text-yellow-400">Friend Concept</td>
                      <td className="p-4">Not available</td>
                      <td className="p-4">friend functions/classes</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-4 font-semibold text-yellow-400">Inheritance Access</td>
                      <td className="p-4">Always public inheritance</td>
                      <td className="p-4">public, protected, private inheritance</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-4 font-semibold text-yellow-400">Package System</td>
                      <td className="p-4">Built-in package system</td>
                      <td className="p-4">Namespace system</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Usage Guidelines */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-red-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-red-400 rounded-full mr-3"></span>
              Usage Guidelines
            </h2>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-red-300">When to Use Each Modifier</h3>
                  <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-red-400 font-mono">private:</span>
                        <span className="text-gray-300 ml-2">Internal implementation, sensitive data</span>
                      </div>
                      <div>
                        <span className="text-yellow-400 font-mono">default:</span>
                        <span className="text-gray-300 ml-2">Package-level utilities (Java)</span>
                      </div>
                      <div>
                        <span className="text-blue-400 font-mono">protected:</span>
                        <span className="text-gray-300 ml-2">Inheritance hierarchies</span>
                      </div>
                      <div>
                        <span className="text-green-400 font-mono">public:</span>
                        <span className="text-gray-300 ml-2">External interfaces, APIs</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-red-300">Design Principles</h3>
                  <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>• Start with most restrictive access</li>
                      <li>• Expose only necessary interfaces</li>
                      <li>• Use protected for inheritance</li>
                      <li>• Keep implementation details private</li>
                      <li>• Document access decisions</li>
                      <li>• Consider future extensibility</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-indigo-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-indigo-400 rounded-full mr-3"></span>
              Best Practices
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-indigo-300">Do's</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Use private by default for data members</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Provide public methods for controlled access</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Use protected for inheritance relationships</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Document the rationale for access levels</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Consider package structure in Java</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-indigo-300">Don'ts</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Don't make everything public for convenience</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Don't expose internal implementation details</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Don't use protected as a substitute for public</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Don't change access levels arbitrarily</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Don't ignore the principle of least privilege</span>
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

export default AccessModifiers;
