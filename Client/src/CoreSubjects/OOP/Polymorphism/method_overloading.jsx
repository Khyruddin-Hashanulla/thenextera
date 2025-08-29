import React from 'react';

const MethodOverloading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-4">
            Method Overloading
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Compile-time polymorphism through multiple methods with the same name but different parameters
          </p>
        </div>

        <div className="grid gap-8">
          {/* Method Overloading Overview */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-blue-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-blue-400 rounded-full mr-3"></span>
              Method Overloading Overview
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-200">Definition</h3>
                <p className="text-gray-300">
                  Method overloading allows a class to have multiple methods with the same name but different parameter lists (number, type, or order of parameters).
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Compile-time polymorphism:</strong> Method selection at compile time</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Static binding:</strong> Method resolution during compilation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Same class:</strong> All overloaded methods in same class</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-200">Key Characteristics</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Same method name, different parameters</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Return type can be same or different</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Improves code readability and reusability</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>No inheritance required</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Java Method Overloading */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-green-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-green-400 rounded-full mr-3"></span>
              Java Method Overloading
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-300 mb-4">Calculator Example</h3>
                <pre className="text-green-400 text-sm overflow-x-auto">
{`public class Calculator {
    
    // Method overloading by number of parameters
    public int add(int a, int b) {
        System.out.println("Adding two integers: " + a + " + " + b);
        return a + b;
    }
    
    public int add(int a, int b, int c) {
        System.out.println("Adding three integers: " + a + " + " + b + " + " + c);
        return a + b + c;
    }
    
    // Method overloading by type of parameters
    public double add(double a, double b) {
        System.out.println("Adding two doubles: " + a + " + " + b);
        return a + b;
    }
    
    public String add(String a, String b) {
        System.out.println("Concatenating strings: " + a + " + " + b);
        return a + b;
    }
    
    // Method overloading by order of parameters
    public void display(int num, String text) {
        System.out.println("Number: " + num + ", Text: " + text);
    }
    
    public void display(String text, int num) {
        System.out.println("Text: " + text + ", Number: " + num);
    }
    
    // Overloading with arrays
    public int add(int[] numbers) {
        int sum = 0;
        System.out.print("Adding array elements: ");
        for (int num : numbers) {
            sum += num;
            System.out.print(num + " ");
        }
        System.out.println("= " + sum);
        return sum;
    }
    
    // Varargs overloading
    public int add(int... numbers) {
        int sum = 0;
        System.out.print("Adding varargs: ");
        for (int num : numbers) {
            sum += num;
            System.out.print(num + " ");
        }
        System.out.println("= " + sum);
        return sum;
    }
}`}
                </pre>
              </div>
            </div>
          </section>

          {/* C++ Method Overloading */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-purple-400 rounded-full mr-3"></span>
              C++ Function Overloading
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-purple-300 mb-4">Math Operations Example</h3>
                <pre className="text-green-400 text-sm overflow-x-auto">
{`#include <iostream>
#include <vector>
using namespace std;

class MathOperations {
public:
    // Overloading by number of parameters
    int multiply(int a, int b) {
        cout << "Multiplying two integers: " << a << " * " << b << endl;
        return a * b;
    }
    
    int multiply(int a, int b, int c) {
        cout << "Multiplying three integers: " << a << " * " << b << " * " << c << endl;
        return a * b * c;
    }
    
    // Overloading by type of parameters
    double multiply(double a, double b) {
        cout << "Multiplying two doubles: " << a << " * " << b << endl;
        return a * b;
    }
    
    float multiply(float a, float b) {
        cout << "Multiplying two floats: " << a << " * " << b << endl;
        return a * b;
    }
    
    // Overloading with different parameter types
    string multiply(string str, int count) {
        cout << "Repeating string '" << str << "' " << count << " times" << endl;
        string result = "";
        for (int i = 0; i < count; i++) {
            result += str;
        }
        return result;
    }
    
    // Overloading with const parameters
    void print(int value) {
        cout << "Non-const int: " << value << endl;
    }
    
    void print(const int value) {
        cout << "Const int: " << value << endl;
    }
    
    // Overloading with reference parameters
    void process(int& value) {
        cout << "Processing reference: " << value << endl;
        value *= 2;
    }
    
    void process(const int& value) {
        cout << "Processing const reference: " << value << endl;
    }
    
    // Overloading with pointer parameters
    void calculate(int* ptr) {
        if (ptr != nullptr) {
            cout << "Processing pointer value: " << *ptr << endl;
        }
    }
    
    void calculate(int* ptr, int size) {
        cout << "Processing array of size " << size << ": ";
        for (int i = 0; i < size; i++) {
            cout << ptr[i] << " ";
        }
        cout << endl;
    }
};`}
                </pre>
              </div>
            </div>
          </section>

          {/* Constructor Overloading */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-yellow-400 rounded-full mr-3"></span>
              Constructor Overloading
            </h2>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-yellow-300">Java Constructor Overloading</h3>
                  <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                    <pre className="text-green-400 text-sm overflow-x-auto">
{`public class Student {
    private String name;
    private int age;
    private String course;
    private double gpa;
    
    // Default constructor
    public Student() {
        this.name = "Unknown";
        this.age = 0;
        this.course = "Undeclared";
        this.gpa = 0.0;
        System.out.println("Default constructor called");
    }
    
    // Constructor with name only
    public Student(String name) {
        this.name = name;
        this.age = 18;
        this.course = "Undeclared";
        this.gpa = 0.0;
        System.out.println("Name constructor called");
    }
    
    // Constructor with name and age
    public Student(String name, int age) {
        this.name = name;
        this.age = age;
        this.course = "Undeclared";
        this.gpa = 0.0;
        System.out.println("Name-Age constructor called");
    }
    
    // Constructor with all parameters
    public Student(String name, int age, String course, double gpa) {
        this.name = name;
        this.age = age;
        this.course = course;
        this.gpa = gpa;
        System.out.println("Full constructor called");
    }
    
    // Copy constructor
    public Student(Student other) {
        this.name = other.name;
        this.age = other.age;
        this.course = other.course;
        this.gpa = other.gpa;
        System.out.println("Copy constructor called");
    }
}`}
                    </pre>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-yellow-300">C++ Constructor Overloading</h3>
                  <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                    <pre className="text-green-400 text-sm overflow-x-auto">
{`class Rectangle {
private:
    double width;
    double height;
    string color;
    
public:
    // Default constructor
    Rectangle() : width(1.0), height(1.0), color("white") {
        cout << "Default constructor called" << endl;
    }
    
    // Constructor with dimensions
    Rectangle(double w, double h) : width(w), height(h), color("white") {
        cout << "Dimension constructor called" << endl;
    }
    
    // Constructor with dimensions and color
    Rectangle(double w, double h, string c) : width(w), height(h), color(c) {
        cout << "Full constructor called" << endl;
    }
    
    // Constructor with single dimension (square)
    explicit Rectangle(double side) : width(side), height(side), color("white") {
        cout << "Square constructor called" << endl;
    }
    
    // Copy constructor
    Rectangle(const Rectangle& other) 
        : width(other.width), height(other.height), color(other.color) {
        cout << "Copy constructor called" << endl;
    }
    
    // Move constructor (C++11)
    Rectangle(Rectangle&& other) noexcept
        : width(other.width), height(other.height), color(move(other.color)) {
        cout << "Move constructor called" << endl;
        other.width = 0;
        other.height = 0;
    }
    
    double getArea() const {
        return width * height;
    }
};`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Overloading Rules */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-red-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-red-400 rounded-full mr-3"></span>
              Overloading Rules and Resolution
            </h2>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-red-300">Valid Overloading</h3>
                  <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>✅ Different number of parameters</li>
                      <li>✅ Different types of parameters</li>
                      <li>✅ Different order of parameter types</li>
                      <li>✅ Different const-ness (C++)</li>
                      <li>✅ Reference vs value parameters (C++)</li>
                      <li>✅ Pointer vs non-pointer parameters</li>
                      <li>✅ Array vs single element parameters</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-red-300">Invalid Overloading</h3>
                  <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>❌ Only return type differs</li>
                      <li>❌ Only access modifiers differ</li>
                      <li>❌ Only parameter names differ</li>
                      <li>❌ Only exception specifications differ</li>
                      <li>❌ Static vs non-static (ambiguous)</li>
                      <li>❌ Typedef names for same type</li>
                      <li>❌ Array size differences (C++)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Method Resolution */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-indigo-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-indigo-400 rounded-full mr-3"></span>
              Method Resolution Process
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-indigo-300 mb-4">Resolution Steps</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-md font-semibold text-gray-200">Java Resolution Order</h4>
                    <ol className="space-y-2 text-gray-300 text-sm">
                      <li className="flex items-start">
                        <span className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">1</span>
                        <span>Exact match (no conversion needed)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">2</span>
                        <span>Widening primitive conversion</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">3</span>
                        <span>Autoboxing/unboxing</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">4</span>
                        <span>Widening reference conversion</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">5</span>
                        <span>Varargs matching</span>
                      </li>
                    </ol>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-md font-semibold text-gray-200">C++ Resolution Order</h4>
                    <ol className="space-y-2 text-gray-300 text-sm">
                      <li className="flex items-start">
                        <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">1</span>
                        <span>Exact match (including trivial conversions)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">2</span>
                        <span>Promotion (int to long, float to double)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">3</span>
                        <span>Standard conversion (int to double)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">4</span>
                        <span>User-defined conversion</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">5</span>
                        <span>Ellipsis (...) matching</span>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-orange-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-orange-400 rounded-full mr-3"></span>
              Best Practices and Common Pitfalls
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-orange-300">Best Practices</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Use meaningful parameter names</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Keep overloaded methods logically related</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Use explicit keyword in C++ for single-parameter constructors</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Document overloaded methods clearly</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Consider default parameters as alternative</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-orange-300">Common Pitfalls</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Ambiguous overloads causing compilation errors</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Unintended implicit conversions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Overloading vs overriding confusion</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Performance impact of excessive overloading</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Maintenance complexity with too many overloads</span>
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

export default MethodOverloading;
