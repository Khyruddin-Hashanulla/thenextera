import React from 'react';

const SingleInheritance = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-4">
            Single Inheritance
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            The fundamental inheritance mechanism where a class inherits from one parent class
          </p>
        </div>

        <div className="grid gap-8">
          {/* Single Inheritance Overview */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-blue-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-blue-400 rounded-full mr-3"></span>
              Single Inheritance Overview
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-200">Definition</h3>
                <p className="text-gray-300">
                  Single inheritance is a mechanism where a class (child/derived class) inherits properties and methods from exactly one parent class (base/super class).
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>One parent class:</strong> Child inherits from single parent</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Code reusability:</strong> Avoid code duplication</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>IS-A relationship:</strong> Child IS-A type of parent</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-200">Benefits</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Promotes code reuse and modularity</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Establishes clear hierarchical relationships</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Simplifies maintenance and updates</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Enables polymorphism and method overriding</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Syntax Examples */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-green-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-green-400 rounded-full mr-3"></span>
              Syntax Examples
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-green-300">Java Example</h3>
                <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                  <pre className="text-green-400 text-sm overflow-x-auto">
{`// Parent class
class Animal {
    protected String name;
    protected int age;
    
    public Animal(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public void eat() {
        System.out.println(name + " is eating");
    }
    
    public void sleep() {
        System.out.println(name + " is sleeping");
    }
}

// Child class inheriting from Animal
class Dog extends Animal {
    private String breed;
    
    public Dog(String name, int age, String breed) {
        super(name, age); // Call parent constructor
        this.breed = breed;
    }
    
    public void bark() {
        System.out.println(name + " is barking");
    }
    
    // Method overriding
    @Override
    public void eat() {
        System.out.println(name + " the dog is eating dog food");
    }
}`}
                  </pre>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-green-300">C++ Example</h3>
                <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                  <pre className="text-green-400 text-sm overflow-x-auto">
{`// Parent class
class Vehicle {
protected:
    string brand;
    int year;
    
public:
    Vehicle(string b, int y) : brand(b), year(y) {}
    
    void start() {
        cout << brand << " is starting" << endl;
    }
    
    void stop() {
        cout << brand << " is stopping" << endl;
    }
    
    virtual void displayInfo() {
        cout << "Brand: " << brand << ", Year: " << year << endl;
    }
};

// Child class inheriting from Vehicle
class Car : public Vehicle {
private:
    int doors;
    
public:
    Car(string b, int y, int d) : Vehicle(b, y), doors(d) {}
    
    void honk() {
        cout << brand << " is honking" << endl;
    }
    
    // Method overriding
    void displayInfo() override {
        Vehicle::displayInfo();
        cout << "Doors: " << doors << endl;
    }
};`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Inheritance Hierarchy */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-purple-400 rounded-full mr-3"></span>
              Inheritance Hierarchy
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-purple-300 mb-4">Class Hierarchy Diagram</h3>
                <div className="bg-gray-800/50 p-4 rounded-lg font-mono text-sm">
                  <pre className="text-gray-300">
{`                    ┌─────────────┐
                    │   Animal    │
                    │             │
                    │ + name      │
                    │ + age       │
                    │ + eat()     │
                    │ + sleep()   │
                    └─────────────┘
                           │
                           │ extends
                           ▼
                    ┌─────────────┐
                    │     Dog     │
                    │             │
                    │ + breed     │
                    │ + bark()    │
                    │ + eat()     │ (overridden)
                    └─────────────┘`}
                  </pre>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-300 mb-3">Parent Class (Animal)</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Contains common attributes and methods</li>
                    <li>• Defines the base behavior</li>
                    <li>• Can be instantiated independently</li>
                    <li>• Provides foundation for child classes</li>
                  </ul>
                </div>
                <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-300 mb-3">Child Class (Dog)</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Inherits all parent attributes and methods</li>
                    <li>• Can add its own specific attributes</li>
                    <li>• Can override parent methods</li>
                    <li>• Can add new methods</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Access Modifiers in Inheritance */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-yellow-400 rounded-full mr-3"></span>
              Access Modifiers in Inheritance
            </h2>
            <div className="space-y-6">
              <div className="overflow-x-auto">
                <table className="w-full bg-gray-900/70 border border-gray-600/50 rounded-lg">
                  <thead className="bg-gray-800/80">
                    <tr>
                      <th className="p-4 text-left text-gray-200">Access Modifier</th>
                      <th className="p-4 text-left text-gray-200">Same Class</th>
                      <th className="p-4 text-left text-gray-200">Child Class</th>
                      <th className="p-4 text-left text-gray-200">Outside Class</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-t border-gray-600/50">
                      <td className="p-4 font-semibold text-yellow-400">public</td>
                      <td className="p-4 text-green-400">✓ Yes</td>
                      <td className="p-4 text-green-400">✓ Yes</td>
                      <td className="p-4 text-green-400">✓ Yes</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-4 font-semibold text-yellow-400">protected</td>
                      <td className="p-4 text-green-400">✓ Yes</td>
                      <td className="p-4 text-green-400">✓ Yes</td>
                      <td className="p-4 text-red-400">✗ No</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-4 font-semibold text-yellow-400">private</td>
                      <td className="p-4 text-green-400">✓ Yes</td>
                      <td className="p-4 text-red-400">✗ No</td>
                      <td className="p-4 text-red-400">✗ No</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-300 mb-3">Key Points</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• <strong>Public members:</strong> Accessible everywhere, including child classes</li>
                  <li>• <strong>Protected members:</strong> Accessible in parent and child classes, but not outside</li>
                  <li>• <strong>Private members:</strong> Only accessible within the parent class, not inherited</li>
                  <li>• Child classes can access protected members as if they were their own</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Constructor and Destructor Inheritance */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-red-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-red-400 rounded-full mr-3"></span>
              Constructor and Destructor Inheritance
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-red-300">Constructor Chaining</h3>
                <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                  <pre className="text-green-400 text-sm overflow-x-auto">
{`// Java Example
class Animal {
    protected String name;
    
    public Animal() {
        System.out.println("Animal constructor");
    }
    
    public Animal(String name) {
        this.name = name;
        System.out.println("Animal constructor: " + name);
    }
}

class Dog extends Animal {
    private String breed;
    
    public Dog() {
        super(); // Calls Animal()
        System.out.println("Dog constructor");
    }
    
    public Dog(String name, String breed) {
        super(name); // Calls Animal(String)
        this.breed = breed;
        System.out.println("Dog constructor: " + breed);
    }
}`}
                  </pre>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-red-300">Execution Order</h3>
                <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                  <h4 className="font-semibold text-red-300 mb-2">Constructor Order:</h4>
                  <ol className="space-y-2 text-gray-300 text-sm list-decimal list-inside">
                    <li>Parent class constructor executes first</li>
                    <li>Child class constructor executes second</li>
                    <li>If super() not called explicitly, default constructor is called</li>
                  </ol>
                  <h4 className="font-semibold text-red-300 mb-2 mt-4">Destructor Order:</h4>
                  <ol className="space-y-2 text-gray-300 text-sm list-decimal list-inside">
                    <li>Child class destructor executes first</li>
                    <li>Parent class destructor executes second</li>
                    <li>Reverse order of construction</li>
                  </ol>
                </div>
              </div>
            </div>
          </section>

          {/* Real-world Examples */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-indigo-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-indigo-400 rounded-full mr-3"></span>
              Real-world Examples
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-indigo-300">Employee Management System</h3>
                <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                  <pre className="text-green-400 text-sm overflow-x-auto">
{`class Employee {
    protected String name;
    protected int id;
    protected double salary;
    
    public Employee(String name, int id, double salary) {
        this.name = name;
        this.id = id;
        this.salary = salary;
    }
    
    public void work() {
        System.out.println(name + " is working");
    }
    
    public double calculatePay() {
        return salary;
    }
}

class Manager extends Employee {
    private double bonus;
    
    public Manager(String name, int id, double salary, double bonus) {
        super(name, id, salary);
        this.bonus = bonus;
    }
    
    public void conductMeeting() {
        System.out.println(name + " is conducting a meeting");
    }
    
    @Override
    public double calculatePay() {
        return salary + bonus;
    }
}`}
                  </pre>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-indigo-300">Shape Hierarchy</h3>
                <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                  <pre className="text-green-400 text-sm overflow-x-auto">
{`class Shape {
    protected String color;
    protected double x, y;
    
    public Shape(String color, double x, double y) {
        this.color = color;
        this.x = x;
        this.y = y;
    }
    
    public void move(double dx, double dy) {
        x += dx;
        y += dy;
    }
    
    public virtual double getArea() {
        return 0;
    }
}

class Circle extends Shape {
    private double radius;
    
    public Circle(String color, double x, double y, double radius) {
        super(color, x, y);
        this.radius = radius;
    }
    
    @Override
    public double getArea() {
        return Math.PI * radius * radius;
    }
    
    public double getCircumference() {
        return 2 * Math.PI * radius;
    }
}`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-orange-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-orange-400 rounded-full mr-3"></span>
              Best Practices
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-orange-300">Do's</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Use inheritance for IS-A relationships</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Keep the inheritance hierarchy shallow</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Use protected for members accessed by children</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Override methods to provide specific behavior</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Call super() in constructors when needed</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-orange-300">Don'ts</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Don't use inheritance for HAS-A relationships</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Avoid deep inheritance hierarchies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Don't break the Liskov Substitution Principle</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Avoid making everything public</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Don't inherit just for code reuse</span>
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

export default SingleInheritance;
