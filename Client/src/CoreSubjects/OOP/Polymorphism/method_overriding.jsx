import React from 'react';

const MethodOverriding = () => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 sm:p-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-6">Method Overriding</h2>
      
      <div className="space-y-6">
        {/* Overview */}
        <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 border-l-4 border-l-cyan-400">
          <h3 className="text-xl font-semibold text-cyan-400 mb-3">What is Method Overriding?</h3>
          <p className="text-gray-300 leading-relaxed">
            Method overriding is a feature that allows a subclass to provide a specific implementation 
            of a method that is already provided by its parent class. The overridden method in the 
            child class should have the same name, return type, and parameters as the method in the parent class.
          </p>
        </div>

        {/* Key Concepts */}
        <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 border-l-4 border-l-purple-400">
          <h3 className="text-xl font-semibold text-purple-400 mb-3">Key Concepts</h3>
          <ul className="text-gray-300 space-y-2">
            <li><strong className="text-white">Runtime Polymorphism:</strong> Method to be called is determined at runtime</li>
            <li><strong className="text-white">Dynamic Method Dispatch:</strong> JVM decides which method to call based on object type</li>
            <li><strong className="text-white">IS-A Relationship:</strong> Inheritance relationship must exist between classes</li>
            <li><strong className="text-white">Virtual Functions:</strong> In C++, methods must be declared virtual for overriding</li>
          </ul>
        </div>

        {/* Rules for Method Overriding */}
        <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 border-l-4 border-l-yellow-400">
          <h3 className="text-xl font-semibold text-yellow-400 mb-3">Rules for Method Overriding</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h4 className="text-green-400 font-semibold mb-2">Must Follow:</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Same method signature (name, parameters)</li>
                <li>• Same or covariant return type</li>
                <li>• Cannot reduce visibility (public → private)</li>
                <li>• Cannot throw broader checked exceptions</li>
              </ul>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h4 className="text-red-400 font-semibold mb-2">Cannot Override:</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Static methods (method hiding instead)</li>
                <li>• Final methods</li>
                <li>• Private methods</li>
                <li>• Constructor methods</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Java Example */}
        <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 border-l-4 border-l-green-400">
          <h3 className="text-xl font-semibold text-green-400 mb-3">Java Example</h3>
          <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
            <pre className="text-green-400 text-sm whitespace-pre">{`// Parent class
class Animal {
    public void makeSound() {
        System.out.println("Animal makes a sound");
    }
    
    public void move() {
        System.out.println("Animal moves");
    }
}

// Child class overriding methods
class Dog extends Animal {
    @Override  // Annotation for clarity and compile-time checking
    public void makeSound() {
        System.out.println("Dog barks: Woof! Woof!");
    }
    
    @Override
    public void move() {
        System.out.println("Dog runs on four legs");
    }
    
    // Additional method specific to Dog
    public void wagTail() {
        System.out.println("Dog wags tail");
    }
}

class Cat extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Cat meows: Meow! Meow!");
    }
    
    @Override
    public void move() {
        System.out.println("Cat walks gracefully");
    }
}

// Demonstrating runtime polymorphism
public class PolymorphismDemo {
    public static void main(String[] args) {
        Animal animal1 = new Dog();    // Upcasting
        Animal animal2 = new Cat();    // Upcasting
        
        animal1.makeSound();  // Output: Dog barks: Woof! Woof!
        animal1.move();       // Output: Dog runs on four legs
        
        animal2.makeSound();  // Output: Cat meows: Meow! Meow!
        animal2.move();       // Output: Cat walks gracefully
        
        // animal1.wagTail();  // Compile error - method not in Animal
    }
}`}</pre>
          </div>
        </div>

        {/* C++ Example */}
        <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 border-l-4 border-l-blue-400">
          <h3 className="text-xl font-semibold text-blue-400 mb-3">C++ Example (Virtual Functions)</h3>
          <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
            <pre className="text-green-400 text-sm whitespace-pre">{`#include <iostream>
using namespace std;

// Base class
class Shape {
public:
    virtual void draw() {  // Virtual function
        cout << "Drawing a generic shape" << endl;
    }
    
    virtual double area() = 0;  // Pure virtual function
    
    virtual ~Shape() {}  // Virtual destructor
};

// Derived class
class Circle : public Shape {
private:
    double radius;
    
public:
    Circle(double r) : radius(r) {}
    
    void draw() override {  // C++11 override keyword
        cout << "Drawing a circle with radius " << radius << endl;
    }
    
    double area() override {
        return 3.14159 * radius * radius;
    }
};

class Rectangle : public Shape {
private:
    double width, height;
    
public:
    Rectangle(double w, double h) : width(w), height(h) {}
    
    void draw() override {
        cout << "Drawing a rectangle " << width << "x" << height << endl;
    }
    
    double area() override {
        return width * height;
    }
};

// Function demonstrating polymorphism
void drawShape(Shape* shape) {
    shape->draw();
    cout << "Area: " << shape->area() << endl;
}

int main() {
    Shape* shapes[] = {
        new Circle(5.0),
        new Rectangle(4.0, 6.0)
    };
    
    for (int i = 0; i < 2; i++) {
        drawShape(shapes[i]);
        cout << "---" << endl;
    }
    
    // Clean up
    for (int i = 0; i < 2; i++) {
        delete shapes[i];
    }
    
    return 0;
}`}</pre>
          </div>
        </div>

        {/* Types of Method Overriding */}
        <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 border-l-4 border-l-indigo-400">
          <h3 className="text-xl font-semibold text-indigo-400 mb-3">Types of Method Overriding</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h4 className="text-cyan-400 font-semibold mb-2">Complete Override</h4>
              <p className="text-gray-300 text-sm mb-2">
                Child class completely replaces parent method implementation.
              </p>
              <div className="bg-gray-900 p-2 rounded text-xs">
                <pre className="text-green-400">{`@Override
public void display() {
    System.out.println("Child display");
}`}</pre>
              </div>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h4 className="text-purple-400 font-semibold mb-2">Partial Override</h4>
              <p className="text-gray-300 text-sm mb-2">
                Child class extends parent method using super keyword.
              </p>
              <div className="bg-gray-900 p-2 rounded text-xs">
                <pre className="text-green-400">{`@Override
public void display() {
    super.display(); // Call parent
    System.out.println("Additional child logic");
}`}</pre>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 border-l-4 border-l-orange-400">
          <h3 className="text-xl font-semibold text-orange-400 mb-3">Method Overriding vs Method Overloading</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left p-2 text-cyan-400">Aspect</th>
                  <th className="text-left p-2 text-green-400">Method Overriding</th>
                  <th className="text-left p-2 text-purple-400">Method Overloading</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-700">
                  <td className="p-2 font-semibold">Definition</td>
                  <td className="p-2">Redefining parent class method</td>
                  <td className="p-2">Multiple methods with same name</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="p-2 font-semibold">Inheritance</td>
                  <td className="p-2">Required (IS-A relationship)</td>
                  <td className="p-2">Not required (same class)</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="p-2 font-semibold">Parameters</td>
                  <td className="p-2">Must be same</td>
                  <td className="p-2">Must be different</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="p-2 font-semibold">Polymorphism</td>
                  <td className="p-2">Runtime polymorphism</td>
                  <td className="p-2">Compile-time polymorphism</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Binding</td>
                  <td className="p-2">Dynamic binding</td>
                  <td className="p-2">Static binding</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Best Practices */}
        <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 border-l-4 border-l-pink-400">
          <h3 className="text-xl font-semibold text-pink-400 mb-3">Best Practices</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <h4 className="text-green-400 font-semibold mb-2">Do:</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Use @Override annotation in Java</li>
                <li>• Use override keyword in C++</li>
                <li>• Call super.method() when extending functionality</li>
                <li>• Maintain the Liskov Substitution Principle</li>
                <li>• Use virtual destructors in C++</li>
              </ul>
            </div>
            <div>
              <h4 className="text-red-400 font-semibold mb-2">Don't:</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Change method signature</li>
                <li>• Reduce access modifier visibility</li>
                <li>• Throw broader checked exceptions</li>
                <li>• Override static or final methods</li>
                <li>• Forget virtual keyword in C++</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Real-world Applications */}
        <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 border-l-4 border-l-teal-400">
          <h3 className="text-xl font-semibold text-teal-400 mb-3">Real-world Applications</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h4 className="text-yellow-400 font-semibold mb-2">GUI Frameworks</h4>
              <p className="text-gray-300 text-sm">
                Override paint(), onClick(), onDraw() methods to customize component behavior.
              </p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h4 className="text-blue-400 font-semibold mb-2">Database Drivers</h4>
              <p className="text-gray-300 text-sm">
                Different database implementations override connection and query methods.
              </p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h4 className="text-green-400 font-semibold mb-2">Template Method Pattern</h4>
              <p className="text-gray-300 text-sm">
                Define algorithm skeleton, let subclasses override specific steps.
              </p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h4 className="text-purple-400 font-semibold mb-2">Plugin Systems</h4>
              <p className="text-gray-300 text-sm">
                Plugins override base functionality to provide custom features.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MethodOverriding;
