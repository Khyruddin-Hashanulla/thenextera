import React from 'react';

const DataAbstraction = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-4">
            Data Abstraction
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            The process of hiding implementation details while showing only essential features and functionality
          </p>
        </div>

        <div className="grid gap-8">
          {/* Data Abstraction Overview */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-blue-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-blue-400 rounded-full mr-3"></span>
              Data Abstraction Overview
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-200">Definition</h3>
                <p className="text-gray-300">
                  Data abstraction is the process of hiding the internal implementation details of data structures and exposing only the necessary operations and interfaces to interact with the data.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Hide complexity:</strong> Internal details are hidden</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Expose interface:</strong> Only essential operations visible</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Simplify usage:</strong> Easier to use and understand</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-200">Key Benefits</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Reduces complexity for users</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Improves code maintainability</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Enables implementation changes without affecting users</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Promotes code reusability and modularity</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Java Data Abstraction */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-green-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-green-400 rounded-full mr-3"></span>
              Java Data Abstraction
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-300 mb-4">Stack Implementation Example</h3>
                <pre className="text-green-400 text-sm overflow-x-auto">
{`// Abstract data type - Stack interface
interface Stack<T> {
    void push(T item);
    T pop();
    T peek();
    boolean isEmpty();
    int size();
}

// Concrete implementation using ArrayList (hidden from user)
class ArrayStack<T> implements Stack<T> {
    private ArrayList<T> elements;  // Implementation detail hidden
    private int maxSize;            // Internal constraint
    
    public ArrayStack(int maxSize) {
        this.elements = new ArrayList<>();
        this.maxSize = maxSize;
    }
    
    @Override
    public void push(T item) {
        if (elements.size() >= maxSize) {
            throw new RuntimeException("Stack overflow");
        }
        elements.add(item);
        System.out.println("Pushed: " + item);
    }
    
    @Override
    public T pop() {
        if (isEmpty()) {
            throw new RuntimeException("Stack underflow");
        }
        T item = elements.remove(elements.size() - 1);
        System.out.println("Popped: " + item);
        return item;
    }
    
    @Override
    public T peek() {
        if (isEmpty()) {
            throw new RuntimeException("Stack is empty");
        }
        return elements.get(elements.size() - 1);
    }
    
    @Override
    public boolean isEmpty() {
        return elements.isEmpty();
    }
    
    @Override
    public int size() {
        return elements.size();
    }
    
    // Internal helper method (not exposed)
    private void resize() {
        // Implementation detail for dynamic resizing
    }
}

// Alternative implementation using LinkedList (interchangeable)
class LinkedStack<T> implements Stack<T> {
    private Node<T> top;  // Different internal structure
    private int count;
    
    private static class Node<T> {
        T data;
        Node<T> next;
        
        Node(T data) {
            this.data = data;
        }
    }
    
    public LinkedStack() {
        this.top = null;
        this.count = 0;
    }
    
    @Override
    public void push(T item) {
        Node<T> newNode = new Node<>(item);
        newNode.next = top;
        top = newNode;
        count++;
        System.out.println("Pushed: " + item);
    }
    
    @Override
    public T pop() {
        if (isEmpty()) {
            throw new RuntimeException("Stack underflow");
        }
        T item = top.data;
        top = top.next;
        count--;
        System.out.println("Popped: " + item);
        return item;
    }
    
    @Override
    public T peek() {
        if (isEmpty()) {
            throw new RuntimeException("Stack is empty");
        }
        return top.data;
    }
    
    @Override
    public boolean isEmpty() {
        return top == null;
    }
    
    @Override
    public int size() {
        return count;
    }
}

// Usage - User doesn't need to know implementation details
public class StackDemo {
    public static void main(String[] args) {
        // Can switch implementations without changing client code
        Stack<String> stack1 = new ArrayStack<>(10);
        Stack<String> stack2 = new LinkedStack<>();
        
        processStack(stack1);
        processStack(stack2);
    }
    
    // Method works with any Stack implementation
    public static void processStack(Stack<String> stack) {
        stack.push("First");
        stack.push("Second");
        stack.push("Third");
        
        System.out.println("Top element: " + stack.peek());
        System.out.println("Stack size: " + stack.size());
        
        while (!stack.isEmpty()) {
            stack.pop();
        }
    }
}`}
                </pre>
              </div>
            </div>
          </section>

          {/* C++ Data Abstraction */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-purple-400 rounded-full mr-3"></span>
              C++ Data Abstraction
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-purple-300 mb-4">Complex Number ADT Example</h3>
                <pre className="text-green-400 text-sm overflow-x-auto">
{`#include <iostream>
#include <cmath>
using namespace std;

// Abstract Data Type - Complex Number
class Complex {
private:
    // Implementation details hidden from user
    double real;
    double imaginary;
    
    // Private helper methods
    double magnitude() const {
        return sqrt(real * real + imaginary * imaginary);
    }
    
    double phase() const {
        return atan2(imaginary, real);
    }
    
public:
    // Constructors - Public interface
    Complex() : real(0), imaginary(0) {}
    
    Complex(double r, double i = 0) : real(r), imaginary(i) {}
    
    // Copy constructor
    Complex(const Complex& other) : real(other.real), imaginary(other.imaginary) {}
    
    // Public interface methods
    double getReal() const { return real; }
    double getImaginary() const { return imaginary; }
    
    void setReal(double r) { real = r; }
    void setImaginary(double i) { imaginary = i; }
    
    // Mathematical operations (abstracted)
    Complex add(const Complex& other) const {
        return Complex(real + other.real, imaginary + other.imaginary);
    }
    
    Complex subtract(const Complex& other) const {
        return Complex(real - other.real, imaginary - other.imaginary);
    }
    
    Complex multiply(const Complex& other) const {
        double newReal = real * other.real - imaginary * other.imaginary;
        double newImag = real * other.imaginary + imaginary * other.real;
        return Complex(newReal, newImag);
    }
    
    Complex divide(const Complex& other) const {
        double denominator = other.real * other.real + other.imaginary * other.imaginary;
        if (denominator == 0) {
            throw runtime_error("Division by zero");
        }
        
        double newReal = (real * other.real + imaginary * other.imaginary) / denominator;
        double newImag = (imaginary * other.real - real * other.imaginary) / denominator;
        return Complex(newReal, newImag);
    }
    
    Complex conjugate() const {
        return Complex(real, -imaginary);
    }
    
    double abs() const {
        return magnitude();
    }
    
    // Operator overloading for natural syntax
    Complex operator+(const Complex& other) const {
        return add(other);
    }
    
    Complex operator-(const Complex& other) const {
        return subtract(other);
    }
    
    Complex operator*(const Complex& other) const {
        return multiply(other);
    }
    
    Complex operator/(const Complex& other) const {
        return divide(other);
    }
    
    Complex& operator=(const Complex& other) {
        if (this != &other) {
            real = other.real;
            imaginary = other.imaginary;
        }
        return *this;
    }
    
    bool operator==(const Complex& other) const {
        const double EPSILON = 1e-9;
        return abs(real - other.real) < EPSILON && 
               abs(imaginary - other.imaginary) < EPSILON;
    }
    
    // Output representation
    void display() const {
        if (imaginary >= 0) {
            cout << real << " + " << imaginary << "i";
        } else {
            cout << real << " - " << abs(imaginary) << "i";
        }
    }
    
    string toString() const {
        string result = to_string(real);
        if (imaginary >= 0) {
            result += " + " + to_string(imaginary) + "i";
        } else {
            result += " - " + to_string(abs(imaginary)) + "i";
        }
        return result;
    }
};

// Factory function for creating complex numbers
class ComplexFactory {
public:
    static Complex fromPolar(double magnitude, double phase) {
        double real = magnitude * cos(phase);
        double imag = magnitude * sin(phase);
        return Complex(real, imag);
    }
    
    static Complex fromString(const string& str) {
        // Parse string representation (simplified)
        // Implementation hidden from user
        return Complex(0, 0);  // Placeholder
    }
};

// Usage example
int main() {
    // User works with high-level operations
    Complex c1(3, 4);        // 3 + 4i
    Complex c2(1, -2);       // 1 - 2i
    
    cout << "c1 = ";
    c1.display();
    cout << endl;
    
    cout << "c2 = ";
    c2.display();
    cout << endl;
    
    // Mathematical operations abstracted
    Complex sum = c1 + c2;
    Complex product = c1 * c2;
    Complex quotient = c1 / c2;
    
    cout << "Sum: ";
    sum.display();
    cout << endl;
    
    cout << "Product: ";
    product.display();
    cout << endl;
    
    cout << "Quotient: ";
    quotient.display();
    cout << endl;
    
    cout << "Magnitude of c1: " << c1.abs() << endl;
    
    // Create from polar coordinates
    Complex polar = ComplexFactory::fromPolar(5.0, M_PI / 4);
    cout << "From polar (5, π/4): ";
    polar.display();
    cout << endl;
    
    return 0;
}`}
                </pre>
              </div>
            </div>
          </section>

          {/* Abstraction Levels */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-yellow-400 rounded-full mr-3"></span>
              Levels of Abstraction
            </h2>
            <div className="space-y-6">
              <div className="overflow-x-auto">
                <table className="w-full bg-gray-900/70 border border-gray-600/50 rounded-lg">
                  <thead className="bg-gray-800/80">
                    <tr>
                      <th className="p-4 text-left text-gray-200">Level</th>
                      <th className="p-4 text-left text-gray-200">Description</th>
                      <th className="p-4 text-left text-gray-200">Example</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-t border-gray-600/50">
                      <td className="p-4 font-semibold text-yellow-400">Physical Level</td>
                      <td className="p-4">How data is actually stored in memory</td>
                      <td className="p-4">Array indices, memory addresses, bits</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-4 font-semibold text-yellow-400">Logical Level</td>
                      <td className="p-4">Data structures and relationships</td>
                      <td className="p-4">Arrays, linked lists, trees, graphs</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-4 font-semibold text-yellow-400">View Level</td>
                      <td className="p-4">User interface and operations</td>
                      <td className="p-4">Stack operations (push, pop), API methods</td>
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
                    <span>Define clear and intuitive interfaces</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Hide implementation complexity</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Provide meaningful operation names</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Ensure consistent behavior across operations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Document the abstraction contract</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-orange-300">Common Pitfalls</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Don't expose internal implementation details</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Don't create overly complex interfaces</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Don't break abstraction with implementation leaks</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Don't ignore error handling in abstractions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Don't make abstractions too rigid or inflexible</span>
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

export default DataAbstraction;
