import React from 'react';

const MethodOverriding = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-4">
            Method Overriding
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Runtime polymorphism through redefining parent class methods in child classes
          </p>
        </div>

        <div className="grid gap-8">
          {/* Method Overriding Overview */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-blue-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-blue-400 rounded-full mr-3"></span>
              Method Overriding Overview
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-200">Definition</h3>
                <p className="text-gray-300">
                  Method overriding allows a child class to provide a specific implementation of a method that is already defined in its parent class.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Runtime polymorphism:</strong> Method called depends on object type</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Same signature:</strong> Method name, parameters, and return type match</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Dynamic binding:</strong> Method resolution at runtime</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-200">Key Characteristics</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Enables specialized behavior in child classes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Maintains interface consistency</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Supports polymorphic behavior</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Requires inheritance relationship</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Java Method Overriding */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-green-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-green-400 rounded-full mr-3"></span>
              Java Method Overriding
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-300 mb-4">Basic Example</h3>
                <pre className="text-green-400 text-sm overflow-x-auto">
{`// Parent class
class Animal {
    protected String name;
    
    public Animal(String name) {
        this.name = name;
    }
    
    // Method to be overridden
    public void makeSound() {
        System.out.println(name + " makes a generic animal sound");
    }
    
    public void eat() {
        System.out.println(name + " is eating");
    }
    
    // Final method cannot be overridden
    public final void breathe() {
        System.out.println(name + " is breathing");
    }
}

// Child class
class Dog extends Animal {
    private String breed;
    
    public Dog(String name, String breed) {
        super(name);
        this.breed = breed;
    }
    
    // Method overriding with @Override annotation
    @Override
    public void makeSound() {
        System.out.println(name + " barks: Woof! Woof!");
    }
    
    // Overriding with additional functionality
    @Override
    public void eat() {
        System.out.println(name + " is eating dog food");
        super.eat(); // Call parent method
    }
    
    // New method specific to Dog
    public void wagTail() {
        System.out.println(name + " is wagging tail");
    }
}

class Cat extends Animal {
    public Cat(String name) {
        super(name);
    }
    
    @Override
    public void makeSound() {
        System.out.println(name + " meows: Meow! Meow!");
    }
}`}
                </pre>
              </div>
            </div>
          </section>

          {/* C++ Method Overriding */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-purple-400 rounded-full mr-3"></span>
              C++ Virtual Functions
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-purple-300 mb-4">Virtual Function Example</h3>
                <pre className="text-green-400 text-sm overflow-x-auto">
{`// Parent class
class Shape {
protected:
    string color;
    
public:
    Shape(string c) : color(c) {}
    
    // Virtual function for polymorphism
    virtual void draw() {
        cout << "Drawing a generic shape in " << color << endl;
    }
    
    // Pure virtual function (abstract)
    virtual double getArea() = 0;
    
    // Non-virtual function
    void setColor(string c) {
        color = c;
    }
    
    // Virtual destructor
    virtual ~Shape() {
        cout << "Shape destructor called" << endl;
    }
};

// Child class
class Circle : public Shape {
private:
    double radius;
    
public:
    Circle(string c, double r) : Shape(c), radius(r) {}
    
    // Override virtual function
    void draw() override {
        cout << "Drawing a circle with radius " << radius 
             << " in " << color << endl;
    }
    
    // Implement pure virtual function
    double getArea() override {
        return 3.14159 * radius * radius;
    }
    
    ~Circle() {
        cout << "Circle destructor called" << endl;
    }
};

class Rectangle : public Shape {
private:
    double width, height;
    
public:
    Rectangle(string c, double w, double h) 
        : Shape(c), width(w), height(h) {}
    
    void draw() override {
        cout << "Drawing a rectangle " << width << "x" << height 
             << " in " << color << endl;
    }
    
    double getArea() override {
        return width * height;
    }
    
    ~Rectangle() {
        cout << "Rectangle destructor called" << endl;
    }
};`}
                </pre>
              </div>
            </div>
          </section>

          {/* Rules and Constraints */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-yellow-400 rounded-full mr-3"></span>
              Rules and Constraints
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-yellow-300">Java Rules</h3>
                <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Method signature must be identical</li>
                    <li>• Return type must be same or covariant</li>
                    <li>• Access modifier cannot be more restrictive</li>
                    <li>• Cannot override static, final, or private methods</li>
                    <li>• Cannot override constructors</li>
                    <li>• @Override annotation is recommended</li>
                    <li>• Can throw same or narrower exceptions</li>
                  </ul>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-yellow-300">C++ Rules</h3>
                <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Parent method must be declared virtual</li>
                    <li>• Function signature must match exactly</li>
                    <li>• Use override keyword (C++11+)</li>
                    <li>• Virtual destructor for proper cleanup</li>
                    <li>• Pure virtual functions create abstract classes</li>
                    <li>• Virtual function table (vtable) used</li>
                    <li>• Runtime polymorphism through pointers/references</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Dynamic Binding Example */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-red-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-red-400 rounded-full mr-3"></span>
              Dynamic Binding in Action
            </h2>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-red-300">Java Polymorphism</h3>
                  <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                    <pre className="text-green-400 text-sm overflow-x-auto">
{`public class PolymorphismDemo {
    public static void main(String[] args) {
        // Array of Animal references
        Animal[] animals = {
            new Dog("Buddy", "Golden Retriever"),
            new Cat("Whiskers"),
            new Dog("Max", "German Shepherd")
        };
        
        // Polymorphic method calls
        for (Animal animal : animals) {
            animal.makeSound(); // Calls overridden method
            animal.eat();       // May call overridden version
            
            // Runtime type checking
            if (animal instanceof Dog) {
                Dog dog = (Dog) animal;
                dog.wagTail(); // Dog-specific method
            }
        }
        
        // Method binding at runtime
        Animal myPet = new Dog("Rex", "Labrador");
        myPet.makeSound(); // Calls Dog's makeSound()
        
        myPet = new Cat("Fluffy");
        myPet.makeSound(); // Calls Cat's makeSound()
    }
}`}
                    </pre>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-red-300">C++ Polymorphism</h3>
                  <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                    <pre className="text-green-400 text-sm overflow-x-auto">
{`int main() {
    // Array of Shape pointers
    vector<unique_ptr<Shape>> shapes;
    shapes.push_back(make_unique<Circle>("Red", 5.0));
    shapes.push_back(make_unique<Rectangle>("Blue", 4.0, 6.0));
    shapes.push_back(make_unique<Circle>("Green", 3.0));
    
    // Polymorphic method calls
    for (auto& shape : shapes) {
        shape->draw();    // Calls overridden method
        cout << "Area: " << shape->getArea() << endl;
    }
    
    // Function accepting base class pointer
    auto printShapeInfo = [](Shape* s) {
        s->draw();
        cout << "Area: " << s->getArea() << endl;
    };
    
    Circle circle("Yellow", 2.5);
    Rectangle rect("Purple", 3.0, 4.0);
    
    printShapeInfo(&circle); // Calls Circle methods
    printShapeInfo(&rect);   // Calls Rectangle methods
    
    return 0;
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Method Overriding vs Overloading */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-indigo-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-indigo-400 rounded-full mr-3"></span>
              Overriding vs Overloading
            </h2>
            <div className="space-y-6">
              <div className="overflow-x-auto">
                <table className="w-full bg-gray-900/70 border border-gray-600/50 rounded-lg">
                  <thead className="bg-gray-800/80">
                    <tr>
                      <th className="p-4 text-left text-gray-200">Aspect</th>
                      <th className="p-4 text-left text-gray-200">Method Overriding</th>
                      <th className="p-4 text-left text-gray-200">Method Overloading</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-t border-gray-600/50">
                      <td className="p-4 font-semibold text-indigo-400">Definition</td>
                      <td className="p-4">Redefining parent method in child class</td>
                      <td className="p-4">Multiple methods with same name, different parameters</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-4 font-semibold text-indigo-400">Inheritance</td>
                      <td className="p-4">Required (parent-child relationship)</td>
                      <td className="p-4">Not required (same class)</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-4 font-semibold text-indigo-400">Method Signature</td>
                      <td className="p-4">Must be identical</td>
                      <td className="p-4">Must be different (parameters)</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-4 font-semibold text-indigo-400">Binding</td>
                      <td className="p-4">Runtime (dynamic binding)</td>
                      <td className="p-4">Compile-time (static binding)</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-4 font-semibold text-indigo-400">Polymorphism</td>
                      <td className="p-4">Runtime polymorphism</td>
                      <td className="p-4">Compile-time polymorphism</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-4 font-semibold text-indigo-400">Return Type</td>
                      <td className="p-4">Same or covariant</td>
                      <td className="p-4">Can be different</td>
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
                <h3 className="text-lg font-semibold text-orange-300">Do's</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Use @Override annotation in Java</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Use override keyword in C++</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Maintain the Liskov Substitution Principle</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Call super method when extending behavior</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Use virtual destructors in C++</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-orange-300">Don'ts</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Don't make access modifiers more restrictive</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Don't override static or final methods</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Don't change method signature accidentally</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Don't break the contract of parent method</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Don't forget virtual keyword in C++ base class</span>
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

export default MethodOverriding;
