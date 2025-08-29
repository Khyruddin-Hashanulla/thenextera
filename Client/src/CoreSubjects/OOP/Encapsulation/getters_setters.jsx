import React from 'react';

const GettersSetters = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-4">
            Getters & Setters
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Methods that provide controlled access to private data members with validation and encapsulation
          </p>
        </div>

        <div className="grid gap-8">
          {/* Getters & Setters Overview */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-blue-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-blue-400 rounded-full mr-3"></span>
              Getters & Setters Overview
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-200">Definition</h3>
                <p className="text-gray-300">
                  Getters and setters are methods that provide controlled access to private class members, allowing reading (get) and modification (set) of data with validation and encapsulation.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Getters:</strong> Retrieve private data safely</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Setters:</strong> Modify private data with validation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Encapsulation:</strong> Maintain data integrity</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-200">Key Benefits</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Data validation and error checking</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Controlled access to private members</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Debugging and logging capabilities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Future-proof code modifications</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Java Getters & Setters */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-green-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-green-400 rounded-full mr-3"></span>
              Java Getters & Setters
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-300 mb-4">Person Class Example</h3>
                <pre className="text-green-400 text-sm overflow-x-auto">
{`public class Person {
    // Private data members
    private String name;
    private int age;
    private String email;
    private double height;
    private boolean isActive;
    
    // Default constructor
    public Person() {
        this.name = "";
        this.age = 0;
        this.email = "";
        this.height = 0.0;
        this.isActive = true;
    }
    
    // Parameterized constructor
    public Person(String name, int age, String email) {
        setName(name);    // Use setter for validation
        setAge(age);      // Use setter for validation
        setEmail(email);  // Use setter for validation
        this.height = 0.0;
        this.isActive = true;
    }
    
    // Getter methods
    public String getName() {
        return name;
    }
    
    public int getAge() {
        return age;
    }
    
    public String getEmail() {
        return email;
    }
    
    public double getHeight() {
        return height;
    }
    
    public boolean isActive() {  // Boolean getter convention
        return isActive;
    }
    
    // Setter methods with validation
    public void setName(String name) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Name cannot be null or empty");
        }
        if (name.trim().length() < 2) {
            throw new IllegalArgumentException("Name must be at least 2 characters");
        }
        this.name = name.trim();
        System.out.println("Name set to: " + this.name);
    }
    
    public void setAge(int age) {
        if (age < 0) {
            throw new IllegalArgumentException("Age cannot be negative");
        }
        if (age > 150) {
            throw new IllegalArgumentException("Age cannot exceed 150");
        }
        this.age = age;
        System.out.println("Age set to: " + this.age);
    }
    
    public void setEmail(String email) {
        if (email == null || email.trim().isEmpty()) {
            throw new IllegalArgumentException("Email cannot be null or empty");
        }
        if (!isValidEmail(email)) {
            throw new IllegalArgumentException("Invalid email format");
        }
        this.email = email.toLowerCase().trim();
        System.out.println("Email set to: " + this.email);
    }
    
    public void setHeight(double height) {
        if (height < 0.0) {
            throw new IllegalArgumentException("Height cannot be negative");
        }
        if (height > 3.0) {  // 3 meters maximum
            throw new IllegalArgumentException("Height seems unrealistic");
        }
        this.height = height;
        System.out.println("Height set to: " + this.height + " meters");
    }
    
    public void setActive(boolean active) {
        this.isActive = active;
        System.out.println("Active status set to: " + this.isActive);
    }
    
    // Private helper method for validation
    private boolean isValidEmail(String email) {
        return email.contains("@") && 
               email.contains(".") && 
               email.indexOf("@") < email.lastIndexOf(".") &&
               email.length() >= 5;
    }
    
    // Computed property getter
    public String getFullInfo() {
        return String.format("Name: %s, Age: %d, Email: %s, Height: %.2fm, Active: %s",
                           name, age, email, height, isActive);
    }
    
    // Method that uses getters internally
    public boolean canVote() {
        return getAge() >= 18 && isActive();
    }
}`}
                </pre>
              </div>
            </div>
          </section>

          {/* C++ Getters & Setters */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-purple-400 rounded-full mr-3"></span>
              C++ Getters & Setters
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-purple-300 mb-4">Product Class Example</h3>
                <pre className="text-green-400 text-sm overflow-x-auto">
{`#include <iostream>
#include <string>
#include <stdexcept>
using namespace std;

class Product {
private:
    string name;
    double price;
    int quantity;
    string category;
    bool isAvailable;
    
    // Private helper methods
    bool isValidPrice(double price) const {
        return price >= 0.0 && price <= 10000.0;
    }
    
    bool isValidQuantity(int qty) const {
        return qty >= 0 && qty <= 1000;
    }
    
public:
    // Constructor
    Product(const string& productName, double productPrice, int qty) {
        setName(productName);
        setPrice(productPrice);
        setQuantity(qty);
        category = "General";
        isAvailable = true;
    }
    
    // Const getter methods (read-only)
    const string& getName() const {
        return name;
    }
    
    double getPrice() const {
        return price;
    }
    
    int getQuantity() const {
        return quantity;
    }
    
    const string& getCategory() const {
        return category;
    }
    
    bool getAvailability() const {
        return isAvailable;
    }
    
    // Setter methods with validation
    void setName(const string& productName) {
        if (productName.empty()) {
            throw invalid_argument("Product name cannot be empty");
        }
        if (productName.length() > 100) {
            throw invalid_argument("Product name too long (max 100 characters)");
        }
        name = productName;
        cout << "Product name set to: " << name << endl;
    }
    
    void setPrice(double productPrice) {
        if (!isValidPrice(productPrice)) {
            throw invalid_argument("Invalid price range (0.0 - 10000.0)");
        }
        price = productPrice;
        cout << "Price set to: $" << price << endl;
        
        // Update availability based on price
        updateAvailability();
    }
    
    void setQuantity(int qty) {
        if (!isValidQuantity(qty)) {
            throw invalid_argument("Invalid quantity range (0 - 1000)");
        }
        quantity = qty;
        cout << "Quantity set to: " << quantity << endl;
        
        // Update availability based on quantity
        updateAvailability();
    }
    
    void setCategory(const string& cat) {
        if (cat.empty()) {
            throw invalid_argument("Category cannot be empty");
        }
        category = cat;
        cout << "Category set to: " << category << endl;
    }
    
    void setAvailability(bool available) {
        isAvailable = available;
        cout << "Availability set to: " << (isAvailable ? "Available" : "Not Available") << endl;
    }
    
    // Computed properties
    double getTotalValue() const {
        return price * quantity;
    }
    
    string getProductInfo() const {
        return name + " (" + category + ") - $" + to_string(price) + 
               " x " + to_string(quantity) + " = $" + to_string(getTotalValue());
    }
    
    bool isInStock() const {
        return quantity > 0 && isAvailable;
    }
    
    // Method with side effects
    bool purchase(int requestedQty) {
        if (!isInStock()) {
            cout << "Product not available for purchase" << endl;
            return false;
        }
        
        if (requestedQty <= 0) {
            cout << "Invalid purchase quantity" << endl;
            return false;
        }
        
        if (requestedQty > quantity) {
            cout << "Insufficient stock. Available: " << quantity << endl;
            return false;
        }
        
        quantity -= requestedQty;
        cout << "Purchased " << requestedQty << " units. Remaining: " << quantity << endl;
        
        updateAvailability();
        return true;
    }
    
private:
    void updateAvailability() {
        isAvailable = (quantity > 0 && price > 0.0);
    }
};`}
                </pre>
              </div>
            </div>
          </section>

          {/* Advanced Getter/Setter Patterns */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-yellow-400 rounded-full mr-3"></span>
              Advanced Patterns
            </h2>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-yellow-300">Java Advanced Patterns</h3>
                  <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                    <pre className="text-green-400 text-sm overflow-x-auto">
{`public class Temperature {
    private double celsius;
    
    // Primary getter/setter for Celsius
    public double getCelsius() {
        return celsius;
    }
    
    public void setCelsius(double celsius) {
        this.celsius = celsius;
    }
    
    // Computed properties for other units
    public double getFahrenheit() {
        return (celsius * 9.0 / 5.0) + 32.0;
    }
    
    public void setFahrenheit(double fahrenheit) {
        this.celsius = (fahrenheit - 32.0) * 5.0 / 9.0;
    }
    
    public double getKelvin() {
        return celsius + 273.15;
    }
    
    public void setKelvin(double kelvin) {
        this.celsius = kelvin - 273.15;
    }
}

// Builder pattern with setters
public class PersonBuilder {
    private Person person = new Person();
    
    public PersonBuilder setName(String name) {
        person.setName(name);
        return this;  // Method chaining
    }
    
    public PersonBuilder setAge(int age) {
        person.setAge(age);
        return this;
    }
    
    public PersonBuilder setEmail(String email) {
        person.setEmail(email);
        return this;
    }
    
    public Person build() {
        return person;
    }
}`}
                    </pre>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-yellow-300">C++ Advanced Patterns</h3>
                  <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                    <pre className="text-green-400 text-sm overflow-x-auto">
{`class SmartArray {
private:
    vector<int> data;
    mutable bool sorted;  // Mutable for lazy evaluation
    
public:
    // Getter with lazy evaluation
    const vector<int>& getSortedData() const {
        if (!sorted) {
            sort(data.begin(), data.end());
            sorted = true;  // Mutable allows modification
        }
        return data;
    }
    
    // Reference getter for modification
    int& at(size_t index) {
        if (index >= data.size()) {
            throw out_of_range("Index out of bounds");
        }
        sorted = false;  // Mark as unsorted
        return data[index];
    }
    
    // Const version for read-only access
    const int& at(size_t index) const {
        if (index >= data.size()) {
            throw out_of_range("Index out of bounds");
        }
        return data[index];
    }
    
    // Fluent interface with method chaining
    SmartArray& add(int value) {
        data.push_back(value);
        sorted = false;
        return *this;
    }
    
    SmartArray& remove(int value) {
        data.erase(remove(data.begin(), data.end(), value), 
                  data.end());
        return *this;
    }
};`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Property Patterns */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-red-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-red-400 rounded-full mr-3"></span>
              Property Patterns & Conventions
            </h2>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-red-300">Naming Conventions</h3>
                  <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-green-400 font-mono">Java:</span>
                        <div className="ml-4 text-gray-300">
                          <div>• getPropertyName() / setPropertyName()</div>
                          <div>• isPropertyName() for boolean</div>
                          <div>• hasPropertyName() for existence checks</div>
                        </div>
                      </div>
                      <div>
                        <span className="text-purple-400 font-mono">C++:</span>
                        <div className="ml-4 text-gray-300">
                          <div>• getPropertyName() / setPropertyName()</div>
                          <div>• propertyName() / setPropertyName()</div>
                          <div>• Use const for read-only getters</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-red-300">Common Patterns</h3>
                  <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>• <strong>Lazy Loading:</strong> Compute values on first access</li>
                      <li>• <strong>Caching:</strong> Store computed values for reuse</li>
                      <li>• <strong>Validation:</strong> Check input in setters</li>
                      <li>• <strong>Notification:</strong> Trigger events on changes</li>
                      <li>• <strong>Transformation:</strong> Convert between formats</li>
                      <li>• <strong>Chaining:</strong> Return this for fluent interface</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Validation Strategies */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-indigo-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-indigo-400 rounded-full mr-3"></span>
              Validation Strategies
            </h2>
            <div className="space-y-6">
              <div className="overflow-x-auto">
                <table className="w-full bg-gray-900/70 border border-gray-600/50 rounded-lg">
                  <thead className="bg-gray-800/80">
                    <tr>
                      <th className="p-4 text-left text-gray-200">Validation Type</th>
                      <th className="p-4 text-left text-gray-200">Purpose</th>
                      <th className="p-4 text-left text-gray-200">Example</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-t border-gray-600/50">
                      <td className="p-4 font-semibold text-indigo-400">Range Check</td>
                      <td className="p-4">Ensure values within acceptable bounds</td>
                      <td className="p-4 font-mono text-sm">age &gt;= 0 && age &lt;= 150</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-4 font-semibold text-indigo-400">Null Check</td>
                      <td className="p-4">Prevent null/empty values</td>
                      <td className="p-4 font-mono text-sm">name != null && !name.isEmpty()</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-4 font-semibold text-indigo-400">Format Check</td>
                      <td className="p-4">Validate data format/pattern</td>
                      <td className="p-4 font-mono text-sm">email.contains("@")</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-4 font-semibold text-indigo-400">Business Logic</td>
                      <td className="p-4">Enforce domain-specific rules</td>
                      <td className="p-4 font-mono text-sm">salary &gt;= minimumWage</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-4 font-semibold text-indigo-400">Cross-Field</td>
                      <td className="p-4">Validate relationships between fields</td>
                      <td className="p-4 font-mono text-sm">endDate &gt; startDate</td>
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
                    <span>Always validate input in setters</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Use const getters in C++ for read-only access</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Provide meaningful error messages</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Consider lazy evaluation for expensive computations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Use method chaining for fluent interfaces</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-orange-300">Common Pitfalls</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Don't expose mutable references from getters</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Don't perform heavy operations in getters</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Don't ignore validation in constructors</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Don't create setters for immutable properties</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Don't use getters/setters for simple data structures</span>
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

export default GettersSetters;
