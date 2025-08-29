import React from 'react';

const Constructors = () => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 sm:p-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-6">Constructors</h2>
      <p className="text-gray-300 leading-relaxed mb-6">
        Constructors are special methods that are automatically called when an object is created. They initialize the object's state and set up any necessary resources.
      </p>

      <div className="space-y-6">
        {/* Default Constructor */}
        <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 border-l-4 border-l-cyan-400">
          <h3 className="text-xl font-semibold text-cyan-400 mb-3">Default Constructor</h3>
          <p className="text-gray-300 mb-4">A constructor with no parameters that provides default initialization</p>
          
          <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
            <h4 className="font-semibold text-green-400 mb-3">Java Example</h4>
            <pre className="text-green-400 text-sm whitespace-pre">{`public class Student {
    private String name;
    private int age;
    
    // Default constructor
    public Student() {
        this.name = "Unknown";
        this.age = 0;
    }
    
    public void displayInfo() {
        System.out.println("Name: " + name + ", Age: " + age);
    }
}

// Usage
Student student = new Student();
student.displayInfo(); // Output: Name: Unknown, Age: 0`}</pre>
          </div>
        </div>

        {/* Parameterized Constructor */}
        <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 border-l-4 border-l-purple-400">
          <h3 className="text-xl font-semibold text-purple-400 mb-3">Parameterized Constructor</h3>
          <p className="text-gray-300 mb-4">A constructor that accepts parameters to initialize object with specific values</p>
          
          <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
            <h4 className="font-semibold text-green-400 mb-3">Java Example</h4>
            <pre className="text-green-400 text-sm whitespace-pre">{`public class Student {
    private String name;
    private int age;
    
    // Parameterized constructor
    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public void displayInfo() {
        System.out.println("Name: " + name + ", Age: " + age);
    }
}

// Usage
Student student = new Student("Alice", 20);
student.displayInfo(); // Output: Name: Alice, Age: 20`}</pre>
          </div>
        </div>

        {/* Copy Constructor */}
        <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 border-l-4 border-l-green-400">
          <h3 className="text-xl font-semibold text-green-400 mb-3">Copy Constructor</h3>
          <p className="text-gray-300 mb-4">Creates a new object by copying another object of the same class</p>
          
          <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
            <h4 className="font-semibold text-green-400 mb-3">C++ Example</h4>
            <pre className="text-green-400 text-sm whitespace-pre">{`class Student {
private:
    string name;
    int age;
    
public:
    // Parameterized constructor
    Student(string n, int a) : name(n), age(a) {}
    
    // Copy constructor
    Student(const Student& other) {
        name = other.name;
        age = other.age;
        cout << "Copy constructor called" << endl;
    }
    
    void display() {
        cout << "Name: " << name << ", Age: " << age << endl;
    }
};

// Usage
Student student1("Bob", 22);
Student student2(student1); // Copy constructor called
student2.display(); // Output: Name: Bob, Age: 22`}</pre>
          </div>
        </div>

        {/* Constructor Overloading */}
        <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 border-l-4 border-l-yellow-400">
          <h3 className="text-xl font-semibold text-yellow-400 mb-3">Constructor Overloading</h3>
          <p className="text-gray-300 mb-4">Multiple constructors with different parameter lists in the same class</p>
          
          <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
            <h4 className="font-semibold text-green-400 mb-3">Java Example</h4>
            <pre className="text-green-400 text-sm whitespace-pre">{`public class Rectangle {
    private double length, width;
    
    // Default constructor
    public Rectangle() {
        this.length = 1.0;
        this.width = 1.0;
    }
    
    // Constructor with one parameter (square)
    public Rectangle(double side) {
        this.length = side;
        this.width = side;
    }
    
    // Constructor with two parameters
    public Rectangle(double length, double width) {
        this.length = length;
        this.width = width;
    }
    
    public double getArea() {
        return length * width;
    }
}

// Usage
Rectangle rect1 = new Rectangle();           // 1x1 rectangle
Rectangle rect2 = new Rectangle(5.0);        // 5x5 square
Rectangle rect3 = new Rectangle(4.0, 6.0);   // 4x6 rectangle`}</pre>
          </div>
        </div>

        {/* Constructor Chaining */}
        <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 border-l-4 border-l-blue-400">
          <h3 className="text-xl font-semibold text-blue-400 mb-3">Constructor Chaining</h3>
          <p className="text-gray-300 mb-4">Calling one constructor from another using this() or super()</p>
          
          <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
            <h4 className="font-semibold text-green-400 mb-3">Java Example</h4>
            <pre className="text-green-400 text-sm whitespace-pre">{`public class Employee {
    private String name;
    private int id;
    private double salary;
    
    // Constructor with all parameters
    public Employee(String name, int id, double salary) {
        this.name = name;
        this.id = id;
        this.salary = salary;
    }
    
    // Constructor chaining - calls the above constructor
    public Employee(String name, int id) {
        this(name, id, 0.0); // Default salary
    }
    
    // Constructor chaining - calls the above constructor
    public Employee(String name) {
        this(name, 0); // Default id and salary
    }
}

// Usage
Employee emp1 = new Employee("John", 101, 50000.0);
Employee emp2 = new Employee("Jane", 102);
Employee emp3 = new Employee("Bob");`}</pre>
          </div>
        </div>

        {/* Best Practices */}
        <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 border-l-4 border-l-pink-400">
          <h3 className="text-xl font-semibold text-pink-400 mb-3">Best Practices</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h4 className="text-green-400 font-semibold mb-2">Do:</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Initialize all instance variables</li>
                <li>• Validate input parameters</li>
                <li>• Use constructor chaining to avoid code duplication</li>
                <li>• Keep constructors simple and focused</li>
                <li>• Provide meaningful default values</li>
              </ul>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h4 className="text-red-400 font-semibold mb-2">Don't:</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Perform complex operations in constructors</li>
                <li>• Call overridable methods from constructors</li>
                <li>• Ignore exception handling</li>
                <li>• Create circular dependencies</li>
                <li>• Leave variables uninitialized</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Language Comparison */}
        <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 border-l-4 border-l-orange-400">
          <h3 className="text-xl font-semibold text-orange-400 mb-3">Language Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left p-2 text-cyan-400">Feature</th>
                  <th className="text-left p-2 text-green-400">Java</th>
                  <th className="text-left p-2 text-purple-400">C++</th>
                  <th className="text-left p-2 text-yellow-400">Python</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-700">
                  <td className="p-2 font-semibold">Constructor Name</td>
                  <td className="p-2">Same as class name</td>
                  <td className="p-2">Same as class name</td>
                  <td className="p-2">__init__</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="p-2 font-semibold">Default Constructor</td>
                  <td className="p-2">Auto-generated if none defined</td>
                  <td className="p-2">Auto-generated if none defined</td>
                  <td className="p-2">Not auto-generated</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="p-2 font-semibold">Copy Constructor</td>
                  <td className="p-2">Not built-in (manual implementation)</td>
                  <td className="p-2">Auto-generated shallow copy</td>
                  <td className="p-2">Not applicable</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Constructor Chaining</td>
                  <td className="p-2">this() and super()</td>
                  <td className="p-2">Initialization lists</td>
                  <td className="p-2">super().__init__()</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Constructors;
