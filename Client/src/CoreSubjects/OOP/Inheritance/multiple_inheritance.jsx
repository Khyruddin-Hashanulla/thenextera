import React from 'react';

const MultipleInheritance = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-4">
            Multiple Inheritance
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Advanced inheritance mechanism where a class inherits from multiple parent classes
          </p>
        </div>

        <div className="grid gap-8">
          {/* Multiple Inheritance Overview */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-blue-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-blue-400 rounded-full mr-3"></span>
              Multiple Inheritance Overview
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-200">Definition</h3>
                <p className="text-gray-300">
                  Multiple inheritance allows a class to inherit properties and methods from more than one parent class, combining features from multiple sources.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Multiple parents:</strong> Inherit from 2+ parent classes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Feature combination:</strong> Merge capabilities from different classes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Complex relationships:</strong> More sophisticated hierarchies</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-200">Language Support</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-900/70 border border-green-500/30 rounded-lg p-3">
                    <h4 className="font-semibold text-green-400 mb-2">Supported</h4>
                    <ul className="space-y-1 text-gray-300 text-sm">
                      <li>• C++</li>
                      <li>• Python</li>
                      <li>• Perl</li>
                      <li>• Eiffel</li>
                    </ul>
                  </div>
                  <div className="bg-gray-900/70 border border-red-500/30 rounded-lg p-3">
                    <h4 className="font-semibold text-red-400 mb-2">Not Supported</h4>
                    <ul className="space-y-1 text-gray-300 text-sm">
                      <li>• Java</li>
                      <li>• C#</li>
                      <li>• Kotlin</li>
                      <li>• Swift</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* C++ Multiple Inheritance */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-green-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-green-400 rounded-full mr-3"></span>
              C++ Multiple Inheritance
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-300 mb-4">Basic Syntax</h3>
                <pre className="text-green-400 text-sm overflow-x-auto">
{`// Parent classes
class Flyable {
public:
    void fly() {
        cout << "Flying in the sky" << endl;
    }
    
    virtual void move() {
        cout << "Moving through air" << endl;
    }
};

class Swimmable {
public:
    void swim() {
        cout << "Swimming in water" << endl;
    }
    
    virtual void move() {
        cout << "Moving through water" << endl;
    }
};

// Child class inheriting from multiple parents
class Duck : public Flyable, public Swimmable {
private:
    string name;
    
public:
    Duck(string n) : name(n) {}
    
    void quack() {
        cout << name << " is quacking" << endl;
    }
    
    // Resolve ambiguity by overriding
    void move() override {
        cout << name << " can move on land, water, and air" << endl;
    }
    
    // Explicitly call parent methods
    void flyMove() {
        Flyable::move();
    }
    
    void swimMove() {
        Swimmable::move();
    }
};`}
                </pre>
              </div>
            </div>
          </section>

          {/* Python Multiple Inheritance */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-purple-400 rounded-full mr-3"></span>
              Python Multiple Inheritance
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-purple-300 mb-4">Method Resolution Order (MRO)</h3>
                <pre className="text-green-400 text-sm overflow-x-auto">
{`# Parent classes
class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        print(f"{self.name} makes a sound")
    
    def move(self):
        print(f"{self.name} is moving")

class Mammal:
    def __init__(self, warm_blooded=True):
        self.warm_blooded = warm_blooded
    
    def breathe(self):
        print("Breathing air")
    
    def move(self):
        print("Moving on land")

class Aquatic:
    def __init__(self, can_swim=True):
        self.can_swim = can_swim
    
    def swim(self):
        print("Swimming in water")
    
    def move(self):
        print("Moving in water")

# Multiple inheritance with MRO
class Dolphin(Animal, Mammal, Aquatic):
    def __init__(self, name):
        Animal.__init__(self, name)
        Mammal.__init__(self)
        Aquatic.__init__(self)
    
    def echolocate(self):
        print(f"{self.name} is using echolocation")

# Usage
dolphin = Dolphin("Flipper")
print(Dolphin.__mro__)  # Shows method resolution order
dolphin.move()  # Calls Animal.move() due to MRO`}
                </pre>
              </div>
            </div>
          </section>

          {/* Diamond Problem */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-yellow-400 rounded-full mr-3"></span>
              The Diamond Problem
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-yellow-300 mb-4">Problem Illustration</h3>
                <div className="bg-gray-800/50 p-4 rounded-lg font-mono text-sm">
                  <pre className="text-gray-300">
{`                    ┌─────────────┐
                    │   Animal    │
                    │             │
                    │ + move()    │
                    └─────────────┘
                           │
                    ┌──────┴──────┐
                    │             │
                    ▼             ▼
            ┌─────────────┐ ┌─────────────┐
            │   Mammal    │ │   Aquatic   │
            │             │ │             │
            │ + move()    │ │ + move()    │
            └─────────────┘ └─────────────┘
                    │             │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │   Dolphin   │
                    │             │
                    │ Which move()? │
                    └─────────────┘`}
                  </pre>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-300 mb-3">C++ Solution: Virtual Inheritance</h4>
                  <pre className="text-green-400 text-xs overflow-x-auto">
{`class Animal {
public:
    virtual void move() {
        cout << "Animal moving" << endl;
    }
};

class Mammal : virtual public Animal {
public:
    void move() override {
        cout << "Mammal moving on land" << endl;
    }
};

class Aquatic : virtual public Animal {
public:
    void move() override {
        cout << "Aquatic moving in water" << endl;
    }
};

class Dolphin : public Mammal, public Aquatic {
public:
    void move() override {
        cout << "Dolphin swimming" << endl;
    }
};`}
                  </pre>
                </div>
                <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-300 mb-3">Python Solution: MRO</h4>
                  <pre className="text-green-400 text-xs overflow-x-auto">
{`class Animal:
    def move(self):
        print("Animal moving")

class Mammal(Animal):
    def move(self):
        print("Mammal moving on land")

class Aquatic(Animal):
    def move(self):
        print("Aquatic moving in water")

class Dolphin(Mammal, Aquatic):
    def move(self):
        print("Dolphin swimming")
        # Can call specific parent methods
        super(Mammal, self).move()  # Calls Aquatic.move()
        super(Aquatic, self).move()  # Calls Animal.move()

# MRO: Dolphin -> Mammal -> Aquatic -> Animal -> object`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Alternatives to Multiple Inheritance */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-red-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-red-400 rounded-full mr-3"></span>
              Alternatives to Multiple Inheritance
            </h2>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-red-300">Java Interfaces</h3>
                  <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                    <pre className="text-green-400 text-sm overflow-x-auto">
{`// Interfaces define contracts
interface Flyable {
    void fly();
    default void move() {
        System.out.println("Moving through air");
    }
}

interface Swimmable {
    void swim();
    default void move() {
        System.out.println("Moving through water");
    }
}

// Class implements multiple interfaces
class Duck implements Flyable, Swimmable {
    private String name;
    
    public Duck(String name) {
        this.name = name;
    }
    
    @Override
    public void fly() {
        System.out.println(name + " is flying");
    }
    
    @Override
    public void swim() {
        System.out.println(name + " is swimming");
    }
    
    // Must resolve conflicting default methods
    @Override
    public void move() {
        System.out.println(name + " can move anywhere");
    }
}`}
                    </pre>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-red-300">Composition Pattern</h3>
                  <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                    <pre className="text-green-400 text-sm overflow-x-auto">
{`// Use composition instead of inheritance
class FlightCapability {
    public void fly() {
        System.out.println("Flying in the sky");
    }
}

class SwimCapability {
    public void swim() {
        System.out.println("Swimming in water");
    }
}

class Duck {
    private String name;
    private FlightCapability flightCapability;
    private SwimCapability swimCapability;
    
    public Duck(String name) {
        this.name = name;
        this.flightCapability = new FlightCapability();
        this.swimCapability = new SwimCapability();
    }
    
    public void fly() {
        flightCapability.fly();
    }
    
    public void swim() {
        swimCapability.swim();
    }
    
    public void quack() {
        System.out.println(name + " is quacking");
    }
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Advantages and Disadvantages */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-indigo-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-indigo-400 rounded-full mr-3"></span>
              Advantages and Disadvantages
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-green-300">Advantages</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Code Reuse:</strong> Inherit from multiple sources</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Flexibility:</strong> Combine different behaviors</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Modeling:</strong> Better real-world representation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Functionality:</strong> Rich feature sets</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-red-300">Disadvantages</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Complexity:</strong> Harder to understand and maintain</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Diamond Problem:</strong> Ambiguity in method resolution</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Tight Coupling:</strong> Dependencies on multiple parents</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Debugging:</strong> Difficult to trace method calls</span>
                  </li>
                </ul>
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
                <h3 className="text-lg font-semibold text-orange-300">When to Use</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Object needs capabilities from multiple unrelated classes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Clear IS-A relationships with multiple parents</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Benefits outweigh complexity costs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Language provides good resolution mechanisms</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-orange-300">Guidelines</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Keep inheritance hierarchies shallow</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Use virtual inheritance to avoid diamond problem</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Explicitly resolve method conflicts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Consider composition as alternative</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Document inheritance relationships clearly</span>
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

export default MultipleInheritance;
