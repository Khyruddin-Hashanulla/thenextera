import React from 'react';

const ClassesObjects = () => {
  const content = {
    definition: "A class is a blueprint or template for creating objects. An object is an instance of a class that contains data (attributes) and methods (functions).",
    concepts: {
      title: "Classes and Objects Fundamentals",
      details: [
        {
          name: "Class Definition",
          description: "A class defines the structure and behavior of objects",
          components: [
            "Attributes (Data Members) - Variables that store object state",
            "Methods (Member Functions) - Functions that define object behavior",
            "Constructor - Special method for object initialization",
            "Destructor - Special method for cleanup when object is destroyed"
          ]
        },
        {
          name: "Object Creation",
          description: "Process of creating instances from a class",
          steps: [
            "Memory allocation for the object",
            "Constructor execution for initialization",
            "Object reference/pointer assignment",
            "Object becomes available for use"
          ]
        }
      ]
    },
    examples: {
      title: "Code Examples",
      languages: [
        {
          name: "Java",
          code: `class Car {
    // Attributes
    private String brand;
    private int year;
    
    // Constructor
    public Car(String brand, int year) {
        this.brand = brand;
        this.year = year;
    }
    
    // Methods
    public void start() {
        System.out.println(brand + " is starting...");
    }
}

// Object creation
Car myCar = new Car("Toyota", 2023);
myCar.start();`
        },
        {
          name: "C++",
          code: `class Car {
private:
    string brand;
    int year;
    
public:
    // Constructor
    Car(string b, int y) : brand(b), year(y) {}
    
    // Method
    void start() {
        cout << brand << " is starting..." << endl;
    }
};

// Object creation
Car myCar("Toyota", 2023);
myCar.start();`
        }
      ]
    }
  };

  return (
    <div className="space-y-6">
      {/* Definition */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <p className="text-gray-300 leading-relaxed">{content.definition}</p>
      </div>

      {/* Concepts */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-blue-400 mb-6">{content.concepts.title}</h3>
        <div className="space-y-6">
          {content.concepts.details.map((concept, index) => (
            <div key={index} className="bg-blue-500/5 border border-blue-500/10 rounded-lg p-5">
              <h4 className="text-lg font-bold text-blue-300 mb-3">{concept.name}</h4>
              <p className="text-gray-300 mb-4">{concept.description}</p>
              
              {concept.components && (
                <ul className="space-y-2">
                  {concept.components.map((component, compIndex) => (
                    <li key={compIndex} className="flex items-start space-x-2">
                      <span className="text-blue-400 text-xs mt-1">▸</span>
                      <span className="text-gray-300 text-sm">{component}</span>
                    </li>
                  ))}
                </ul>
              )}

              {concept.steps && (
                <ol className="space-y-2">
                  {concept.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-start space-x-2">
                      <span className="text-blue-400 text-xs mt-1">{stepIndex + 1}.</span>
                      <span className="text-gray-300 text-sm">{step}</span>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Code Examples */}
      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-green-400 mb-6">{content.examples.title}</h3>
        <div className="space-y-6">
          {content.examples.languages.map((lang, index) => (
            <div key={index} className="bg-green-500/5 border border-green-500/10 rounded-lg p-5">
              <h4 className="text-lg font-bold text-green-300 mb-4">{lang.name}</h4>
              <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 overflow-x-auto">
                <pre className="text-green-300 text-sm font-mono whitespace-pre-wrap">
                  <code>{lang.code}</code>
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassesObjects;
