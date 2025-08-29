import React from 'react';

const AbstractClasses = () => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 sm:p-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-6">Abstract Classes</h2>
      
      <div className="space-y-6">
        {/* Overview */}
        <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 border-l-4 border-l-cyan-400">
          <h3 className="text-xl font-semibold text-cyan-400 mb-3">What are Abstract Classes?</h3>
          <p className="text-gray-300 leading-relaxed">
            An abstract class is a class that cannot be instantiated directly and typically contains one or more 
            abstract methods that must be implemented by concrete subclasses. Abstract classes serve as blueprints 
            for other classes and provide a way to enforce certain methods to be implemented while allowing some 
            methods to have default implementations.
          </p>
        </div>

        {/* Key Characteristics */}
        <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 border-l-4 border-l-purple-400">
          <h3 className="text-xl font-semibold text-purple-400 mb-3">Key Characteristics</h3>
          <ul className="text-gray-300 space-y-2">
            <li><strong className="text-white">Cannot be instantiated:</strong> You cannot create objects directly from abstract classes</li>
            <li><strong className="text-white">Can have abstract methods:</strong> Methods without implementation that must be overridden</li>
            <li><strong className="text-white">Can have concrete methods:</strong> Methods with implementation that can be inherited</li>
            <li><strong className="text-white">Can have constructors:</strong> Called when subclass objects are created</li>
            <li><strong className="text-white">Can have instance variables:</strong> Both static and non-static variables</li>
          </ul>
        </div>

        {/* Java Abstract Class Example */}
        <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 border-l-4 border-l-green-400">
          <h3 className="text-xl font-semibold text-green-400 mb-3">Java Abstract Class Example</h3>
          <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
            <pre className="text-green-400 text-sm whitespace-pre">{`// Abstract class
abstract class Vehicle {
    protected String brand;
    protected int year;
    
    // Constructor
    public Vehicle(String brand, int year) {
        this.brand = brand;
        this.year = year;
    }
    
    // Concrete method (has implementation)
    public void displayInfo() {
        System.out.println("Brand: " + brand + ", Year: " + year);
    }
    
    // Abstract methods (must be implemented by subclasses)
    public abstract void start();
    public abstract void stop();
    public abstract double calculateFuelEfficiency();
    
    // Another concrete method
    public final void honk() {  // final method cannot be overridden
        System.out.println("Beep! Beep!");
    }
}

// Concrete subclass
class Car extends Vehicle {
    private int doors;
    
    public Car(String brand, int year, int doors) {
        super(brand, year);  // Call parent constructor
        this.doors = doors;
    }
    
    // Must implement all abstract methods
    @Override
    public void start() {
        System.out.println("Car engine started with key ignition");
    }
    
    @Override
    public void stop() {
        System.out.println("Car engine stopped");
    }
    
    @Override
    public double calculateFuelEfficiency() {
        return 25.5; // Miles per gallon
    }
    
    // Additional method specific to Car
    public void openDoors() {
        System.out.println("Opening " + doors + " doors");
    }
}

class Motorcycle extends Vehicle {
    private boolean hasSidecar;
    
    public Motorcycle(String brand, int year, boolean hasSidecar) {
        super(brand, year);
        this.hasSidecar = hasSidecar;
    }
    
    @Override
    public void start() {
        System.out.println("Motorcycle started with kick/electric start");
    }
    
    @Override
    public void stop() {
        System.out.println("Motorcycle engine stopped");
    }
    
    @Override
    public double calculateFuelEfficiency() {
        return hasSidecar ? 35.0 : 45.0;
    }
}

// Usage example
public class AbstractClassDemo {
    public static void main(String[] args) {
        // Vehicle vehicle = new Vehicle("Generic", 2023); // ERROR: Cannot instantiate
        
        Car car = new Car("Toyota", 2023, 4);
        Motorcycle bike = new Motorcycle("Honda", 2022, false);
        
        car.displayInfo();
        car.start();
        car.openDoors();
        System.out.println("Fuel efficiency: " + car.calculateFuelEfficiency());
        
        bike.displayInfo();
        bike.start();
        System.out.println("Fuel efficiency: " + bike.calculateFuelEfficiency());
    }
}`}</pre>
          </div>
        </div>

        {/* C++ Abstract Class Example */}
        <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 border-l-4 border-l-blue-400">
          <h3 className="text-xl font-semibold text-blue-400 mb-3">C++ Abstract Class Example</h3>
          <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
            <pre className="text-green-400 text-sm whitespace-pre">{`#include <iostream>
#include <string>
using namespace std;

// Abstract class (contains pure virtual functions)
class Shape {
protected:
    string color;
    
public:
    // Constructor
    Shape(const string& c) : color(c) {}
    
    // Concrete method
    void setColor(const string& c) {
        color = c;
    }
    
    string getColor() const {
        return color;
    }
    
    // Pure virtual functions (= 0 makes them abstract)
    virtual double area() const = 0;
    virtual double perimeter() const = 0;
    virtual void draw() const = 0;
    
    // Virtual destructor (important for proper cleanup)
    virtual ~Shape() {}
};

// Concrete derived class
class Rectangle : public Shape {
private:
    double width, height;
    
public:
    Rectangle(const string& color, double w, double h) 
        : Shape(color), width(w), height(h) {}
    
    // Must implement all pure virtual functions
    double area() const override {
        return width * height;
    }
    
    double perimeter() const override {
        return 2 * (width + height);
    }
    
    void draw() const override {
        cout << "Drawing a " << color << " rectangle (" 
             << width << "x" << height << ")" << endl;
    }
};

class Circle : public Shape {
private:
    double radius;
    static constexpr double PI = 3.14159;
    
public:
    Circle(const string& color, double r) 
        : Shape(color), radius(r) {}
    
    double area() const override {
        return PI * radius * radius;
    }
    
    double perimeter() const override {
        return 2 * PI * radius;
    }
    
    void draw() const override {
        cout << "Drawing a " << color << " circle (radius: " 
             << radius << ")" << endl;
    }
};

// Function that works with any Shape
void printShapeInfo(const Shape& shape) {
    shape.draw();
    cout << "Area: " << shape.area() << endl;
    cout << "Perimeter: " << shape.perimeter() << endl;
    cout << "---" << endl;
}

int main() {
    // Shape shape("red"); // ERROR: Cannot instantiate abstract class
    
    Rectangle rect("blue", 5.0, 3.0);
    Circle circle("red", 4.0);
    
    printShapeInfo(rect);
    printShapeInfo(circle);
    
    return 0;
}`}</pre>
          </div>
        </div>

        {/* Abstract vs Interface Comparison */}
        <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 border-l-4 border-l-yellow-400">
          <h3 className="text-xl font-semibold text-yellow-400 mb-3">Abstract Classes vs Interfaces</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left p-2 text-cyan-400">Feature</th>
                  <th className="text-left p-2 text-green-400">Abstract Classes</th>
                  <th className="text-left p-2 text-purple-400">Interfaces</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-700">
                  <td className="p-2 font-semibold">Instantiation</td>
                  <td className="p-2">Cannot be instantiated</td>
                  <td className="p-2">Cannot be instantiated</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="p-2 font-semibold">Method Types</td>
                  <td className="p-2">Abstract + Concrete methods</td>
                  <td className="p-2">Only abstract methods (Java 8+ allows default)</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="p-2 font-semibold">Variables</td>
                  <td className="p-2">Any type of variables</td>
                  <td className="p-2">Only public static final</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="p-2 font-semibold">Inheritance</td>
                  <td className="p-2">Single inheritance (extends)</td>
                  <td className="p-2">Multiple inheritance (implements)</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="p-2 font-semibold">Constructor</td>
                  <td className="p-2">Can have constructors</td>
                  <td className="p-2">Cannot have constructors</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Access Modifiers</td>
                  <td className="p-2">Any access modifier</td>
                  <td className="p-2">Methods are public by default</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* When to Use Abstract Classes */}
        <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 border-l-4 border-l-indigo-400">
          <h3 className="text-xl font-semibold text-indigo-400 mb-3">When to Use Abstract Classes</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h4 className="text-green-400 font-semibold mb-2">Use Abstract Classes When:</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• You want to share code among closely related classes</li>
                <li>• You need to provide default implementations</li>
                <li>• You want to use non-public access modifiers</li>
                <li>• You need instance variables or constructors</li>
                <li>• You have a clear IS-A relationship</li>
              </ul>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h4 className="text-red-400 font-semibold mb-2">Use Interfaces When:</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• You expect unrelated classes to implement</li>
                <li>• You want multiple inheritance of type</li>
                <li>• You want to specify behavior without implementation</li>
                <li>• You need a contract that classes must follow</li>
                <li>• You have a CAN-DO relationship</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Template Method Pattern */}
        <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 border-l-4 border-l-orange-400">
          <h3 className="text-xl font-semibold text-orange-400 mb-3">Template Method Pattern Example</h3>
          <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
            <pre className="text-green-400 text-sm whitespace-pre">{`// Abstract class defining algorithm skeleton
abstract class DataProcessor {
    // Template method - defines the algorithm structure
    public final void processData() {
        loadData();
        validateData();
        processSpecificData();  // Abstract - varies by implementation
        saveData();
        cleanup();
    }
    
    // Concrete methods with default implementation
    protected void loadData() {
        System.out.println("Loading data from source...");
    }
    
    protected void validateData() {
        System.out.println("Validating data integrity...");
    }
    
    protected void saveData() {
        System.out.println("Saving processed data...");
    }
    
    protected void cleanup() {
        System.out.println("Cleaning up resources...");
    }
    
    // Abstract method - must be implemented by subclasses
    protected abstract void processSpecificData();
}

// Concrete implementations
class XMLDataProcessor extends DataProcessor {
    @Override
    protected void processSpecificData() {
        System.out.println("Processing XML data - parsing tags and attributes");
    }
}

class JSONDataProcessor extends DataProcessor {
    @Override
    protected void processSpecificData() {
        System.out.println("Processing JSON data - parsing key-value pairs");
    }
    
    // Override default behavior if needed
    @Override
    protected void validateData() {
        System.out.println("JSON-specific validation - checking syntax");
    }
}`}</pre>
          </div>
        </div>

        {/* Best Practices */}
        <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 border-l-4 border-l-pink-400">
          <h3 className="text-xl font-semibold text-pink-400 mb-3">Best Practices</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <h4 className="text-green-400 font-semibold mb-2">Design Guidelines:</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Use abstract classes for IS-A relationships</li>
                <li>• Provide meaningful default implementations</li>
                <li>• Use protected access for shared members</li>
                <li>• Include virtual destructors in C++</li>
                <li>• Document abstract method contracts clearly</li>
              </ul>
            </div>
            <div>
              <h4 className="text-yellow-400 font-semibold mb-2">Implementation Tips:</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Keep abstract classes focused and cohesive</li>
                <li>• Minimize the number of abstract methods</li>
                <li>• Use final methods for invariant behavior</li>
                <li>• Consider using template method pattern</li>
                <li>• Provide constructors for initialization</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Real-world Examples */}
        <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 border-l-4 border-l-teal-400">
          <h3 className="text-xl font-semibold text-teal-400 mb-3">Real-world Applications</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h4 className="text-yellow-400 font-semibold mb-2">Java Collections Framework</h4>
              <p className="text-gray-300 text-sm">
                AbstractList, AbstractSet, AbstractMap provide default implementations for common operations.
              </p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h4 className="text-blue-400 font-semibold mb-2">GUI Components</h4>
              <p className="text-gray-300 text-sm">
                Abstract Component class with concrete Button, TextField, Label subclasses.
              </p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h4 className="text-green-400 font-semibold mb-2">Database Connections</h4>
              <p className="text-gray-300 text-sm">
                Abstract Connection class with MySQL, PostgreSQL, Oracle implementations.
              </p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h4 className="text-purple-400 font-semibold mb-2">Game Development</h4>
              <p className="text-gray-300 text-sm">
                Abstract GameObject with Player, Enemy, PowerUp concrete classes.
              </p>
            </div>
          </div>
        </div>

        {/* Common Pitfalls */}
        <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 border-l-4 border-l-red-400">
          <h3 className="text-xl font-semibold text-red-400 mb-3">Common Pitfalls to Avoid</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h4 className="text-red-400 font-semibold mb-2">Design Issues:</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Creating abstract classes with only abstract methods</li>
                <li>• Using abstract classes for unrelated functionality</li>
                <li>• Making everything abstract without clear purpose</li>
                <li>• Forgetting to implement all abstract methods</li>
              </ul>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h4 className="text-orange-400 font-semibold mb-2">Implementation Issues:</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Attempting to instantiate abstract classes</li>
                <li>• Missing virtual destructors in C++</li>
                <li>• Overcomplicating the inheritance hierarchy</li>
                <li>• Not calling super constructors properly</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AbstractClasses;
