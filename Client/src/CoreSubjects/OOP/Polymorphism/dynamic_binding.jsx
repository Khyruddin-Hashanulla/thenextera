import React from 'react';

const DynamicBinding = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-4">
            Dynamic Binding
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Runtime method resolution enabling true polymorphic behavior in object-oriented programming
          </p>
        </div>

        <div className="grid gap-8">
          {/* Dynamic Binding Overview */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-blue-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-blue-400 rounded-full mr-3"></span>
              Dynamic Binding Overview
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-200">Definition</h3>
                <p className="text-gray-300">
                  Dynamic binding (late binding) is the process where method calls are resolved at runtime based on the actual object type, not the reference type.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Runtime resolution:</strong> Method determined during execution</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Virtual dispatch:</strong> Uses virtual function tables</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Polymorphism:</strong> Enables true object-oriented behavior</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-200">Key Characteristics</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Method calls resolved at runtime</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Depends on actual object type</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Enables flexible and extensible code</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Slight performance overhead</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Java Dynamic Binding */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-green-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-green-400 rounded-full mr-3"></span>
              Java Dynamic Binding
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-300 mb-4">Shape Hierarchy Example</h3>
                <pre className="text-green-400 text-sm overflow-x-auto">
{`// Base class
abstract class Shape {
    protected String color;
    
    public Shape(String color) {
        this.color = color;
    }
    
    // Abstract method - must be overridden
    public abstract double getArea();
    
    // Virtual method - can be overridden
    public void display() {
        System.out.println("Shape with color: " + color);
    }
    
    // Final method - cannot be overridden
    public final void printInfo() {
        System.out.println("Area: " + getArea());
    }
}

// Derived classes
class Circle extends Shape {
    private double radius;
    
    public Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }
    
    @Override
    public double getArea() {
        return Math.PI * radius * radius;
    }
    
    @Override
    public void display() {
        System.out.println("Circle with radius " + radius + " and color " + color);
    }
}

class Rectangle extends Shape {
    private double width, height;
    
    public Rectangle(String color, double width, double height) {
        super(color);
        this.width = width;
        this.height = height;
    }
    
    @Override
    public double getArea() {
        return width * height;
    }
    
    @Override
    public void display() {
        System.out.println("Rectangle " + width + "x" + height + " with color " + color);
    }
}`}
                </pre>
              </div>
            </div>
          </section>

          {/* C++ Virtual Functions */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-purple-400 rounded-full mr-3"></span>
              C++ Virtual Functions
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-purple-300 mb-4">Vehicle Hierarchy</h3>
                <pre className="text-green-400 text-sm overflow-x-auto">
{`class Vehicle {
protected:
    string brand;
    int year;
    
public:
    Vehicle(string b, int y) : brand(b), year(y) {}
    
    // Virtual function - enables dynamic binding
    virtual void start() {
        cout << "Vehicle starting..." << endl;
    }
    
    // Pure virtual function - must be implemented
    virtual void accelerate() = 0;
    
    // Non-virtual function - static binding
    void displayInfo() {
        cout << brand << " (" << year << ")" << endl;
    }
    
    // Virtual destructor - important for proper cleanup
    virtual ~Vehicle() {
        cout << "Vehicle destructor" << endl;
    }
};

class Car : public Vehicle {
private:
    int doors;
    
public:
    Car(string b, int y, int d) : Vehicle(b, y), doors(d) {}
    
    void start() override {
        cout << "Car engine starting with key..." << endl;
    }
    
    void accelerate() override {
        cout << "Car accelerating smoothly..." << endl;
    }
    
    ~Car() {
        cout << "Car destructor" << endl;
    }
};

class Motorcycle : public Vehicle {
private:
    bool hasSidecar;
    
public:
    Motorcycle(string b, int y, bool s) : Vehicle(b, y), hasSidecar(s) {}
    
    void start() override {
        cout << "Motorcycle kick-starting..." << endl;
    }
    
    void accelerate() override {
        cout << "Motorcycle accelerating rapidly..." << endl;
    }
    
    ~Motorcycle() {
        cout << "Motorcycle destructor" << endl;
    }
};`}
                </pre>
              </div>
            </div>
          </section>

          {/* Runtime Behavior */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-yellow-400 rounded-full mr-3"></span>
              Runtime Behavior Examples
            </h2>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-yellow-300">Java Polymorphism</h3>
                  <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                    <pre className="text-green-400 text-sm overflow-x-auto">
{`public class PolymorphismDemo {
    public static void main(String[] args) {
        // Array of Shape references
        Shape[] shapes = {
            new Circle("Red", 5.0),
            new Rectangle("Blue", 4.0, 6.0),
            new Circle("Green", 3.0)
        };
        
        // Dynamic binding in action
        for (Shape shape : shapes) {
            shape.display();    // Calls overridden method
            shape.printInfo();  // Calls final method
            System.out.println("---");
        }
        
        // Runtime type determination
        Shape unknownShape = getRandomShape();
        unknownShape.display(); // Method determined at runtime
        
        // instanceof for type checking
        if (unknownShape instanceof Circle) {
            System.out.println("It's a circle!");
        }
    }
    
    static Shape getRandomShape() {
        return Math.random() > 0.5 ? 
            new Circle("Random", 2.0) : 
            new Rectangle("Random", 3.0, 4.0);
    }
}`}
                    </pre>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-yellow-300">C++ Polymorphism</h3>
                  <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                    <pre className="text-green-400 text-sm overflow-x-auto">
{`int main() {
    // Array of Vehicle pointers
    vector<unique_ptr<Vehicle>> vehicles;
    vehicles.push_back(make_unique<Car>("Toyota", 2020, 4));
    vehicles.push_back(make_unique<Motorcycle>("Harley", 2019, false));
    vehicles.push_back(make_unique<Car>("BMW", 2021, 2));
    
    // Dynamic binding demonstration
    for (auto& vehicle : vehicles) {
        vehicle->displayInfo();  // Static binding
        vehicle->start();        // Dynamic binding
        vehicle->accelerate();   // Dynamic binding
        cout << "---" << endl;
    }
    
    // Function accepting base class pointer
    auto testVehicle = [](Vehicle* v) {
        v->start();      // Dynamic binding
        v->accelerate(); // Dynamic binding
    };
    
    Car myCar("Honda", 2022, 4);
    Motorcycle myBike("Yamaha", 2021, true);
    
    testVehicle(&myCar);  // Calls Car methods
    testVehicle(&myBike); // Calls Motorcycle methods
    
    return 0;
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Virtual Function Table */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-red-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-red-400 rounded-full mr-3"></span>
              Virtual Function Table (VTable)
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-red-300 mb-4">How VTable Works</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-md font-semibold text-gray-200">VTable Structure</h4>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>• Each class with virtual functions has a VTable</li>
                      <li>• VTable contains function pointers</li>
                      <li>• Each object has a VTable pointer (vptr)</li>
                      <li>• Compiler generates VTable automatically</li>
                      <li>• Inheritance creates new VTables</li>
                      <li>• Overridden functions update VTable entries</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-md font-semibold text-gray-200">Runtime Process</h4>
                    <ol className="space-y-2 text-gray-300 text-sm">
                      <li className="flex items-start">
                        <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">1</span>
                        <span>Object created with vptr to its class VTable</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">2</span>
                        <span>Virtual method called on object</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">3</span>
                        <span>Compiler follows vptr to VTable</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">4</span>
                        <span>Looks up function pointer in VTable</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">5</span>
                        <span>Calls the actual function implementation</span>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Static vs Dynamic Binding */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-indigo-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-indigo-400 rounded-full mr-3"></span>
              Static vs Dynamic Binding
            </h2>
            <div className="space-y-6">
              <div className="overflow-x-auto">
                <table className="w-full bg-gray-900/70 border border-gray-600/50 rounded-lg">
                  <thead className="bg-gray-800/80">
                    <tr>
                      <th className="p-4 text-left text-gray-200">Aspect</th>
                      <th className="p-4 text-left text-gray-200">Static Binding</th>
                      <th className="p-4 text-left text-gray-200">Dynamic Binding</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-t border-gray-600/50">
                      <td className="p-4 font-semibold text-indigo-400">Resolution Time</td>
                      <td className="p-4">Compile time</td>
                      <td className="p-4">Runtime</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-4 font-semibold text-indigo-400">Method Selection</td>
                      <td className="p-4">Based on reference type</td>
                      <td className="p-4">Based on object type</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-4 font-semibold text-indigo-400">Performance</td>
                      <td className="p-4">Faster (direct call)</td>
                      <td className="p-4">Slightly slower (VTable lookup)</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-4 font-semibold text-indigo-400">Flexibility</td>
                      <td className="p-4">Less flexible</td>
                      <td className="p-4">More flexible</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-4 font-semibold text-indigo-400">Memory Overhead</td>
                      <td className="p-4">None</td>
                      <td className="p-4">VTable pointer per object</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-4 font-semibold text-indigo-400">Polymorphism</td>
                      <td className="p-4">Compile-time polymorphism</td>
                      <td className="p-4">Runtime polymorphism</td>
                    </tr>
                  </tbody>
                </table>
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
                <h3 className="text-lg font-semibold text-orange-300">Design Guidelines</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Use virtual destructors in base classes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Make interfaces pure virtual when appropriate</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Use override keyword in C++11+</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Consider performance implications</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Design for extensibility</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-orange-300">Common Pitfalls</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Calling virtual functions in constructors</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Missing virtual destructors</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Excessive virtual function overhead</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Slicing objects when copying</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Confusion between static and dynamic binding</span>
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

export default DynamicBinding;
