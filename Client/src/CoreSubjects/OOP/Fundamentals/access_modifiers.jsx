import React from 'react';

const AccessModifiers = () => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 sm:p-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-6">Access Modifiers</h2>
      <p className="text-gray-300 leading-relaxed mb-6">
        Access modifiers are keywords that control the visibility and accessibility of class members (attributes and methods) from different parts of a program.
      </p>

      <div className="space-y-6">
        {/* Types of Access Modifiers */}
        <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 border-l-4 border-l-cyan-400">
          <h3 className="text-xl font-semibold text-cyan-400 mb-4">Types of Access Modifiers</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Public */}
            <div className="bg-gray-800/50 p-4 rounded-lg border border-green-500/30">
              <div className="flex items-center mb-2">
                <span className="text-green-400 font-bold text-lg mr-2">+</span>
                <h4 className="text-green-400 font-semibold">Public</h4>
              </div>
              <p className="text-gray-300 text-sm mb-2">Members are accessible from anywhere in the program</p>
              <p className="text-gray-400 text-xs"><strong>Accessibility:</strong> Class, Package, Subclass, World</p>
              <p className="text-gray-400 text-xs"><strong>Usage:</strong> For methods and attributes that need to be accessed externally</p>
            </div>

            {/* Private */}
            <div className="bg-gray-800/50 p-4 rounded-lg border border-red-500/30">
              <div className="flex items-center mb-2">
                <span className="text-red-400 font-bold text-lg mr-2">-</span>
                <h4 className="text-red-400 font-semibold">Private</h4>
              </div>
              <p className="text-gray-300 text-sm mb-2">Members are accessible only within the same class</p>
              <p className="text-gray-400 text-xs"><strong>Accessibility:</strong> Class only</p>
              <p className="text-gray-400 text-xs"><strong>Usage:</strong> For internal implementation details and data hiding</p>
            </div>

            {/* Protected */}
            <div className="bg-gray-800/50 p-4 rounded-lg border border-yellow-500/30">
              <div className="flex items-center mb-2">
                <span className="text-yellow-400 font-bold text-lg mr-2">#</span>
                <h4 className="text-yellow-400 font-semibold">Protected</h4>
              </div>
              <p className="text-gray-300 text-sm mb-2">Members are accessible within the same class and its subclasses</p>
              <p className="text-gray-400 text-xs"><strong>Accessibility:</strong> Class, Subclass</p>
              <p className="text-gray-400 text-xs"><strong>Usage:</strong> For inheritance relationships and controlled access</p>
            </div>

            {/* Package/Default */}
            <div className="bg-gray-800/50 p-4 rounded-lg border border-blue-500/30">
              <div className="flex items-center mb-2">
                <span className="text-blue-400 font-bold text-lg mr-2">~</span>
                <h4 className="text-blue-400 font-semibold">Package/Default</h4>
              </div>
              <p className="text-gray-300 text-sm mb-2">Members are accessible within the same package</p>
              <p className="text-gray-400 text-xs"><strong>Accessibility:</strong> Class, Package</p>
              <p className="text-gray-400 text-xs"><strong>Usage:</strong> For package-level organization and controlled access</p>
            </div>
          </div>
        </div>

        {/* Java Example */}
        <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 border-l-4 border-l-green-400">
          <h3 className="text-xl font-semibold text-green-400 mb-3">Java Example</h3>
          <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
            <pre className="text-green-400 text-sm whitespace-pre">{`public class BankAccount {
    // Public - accessible from anywhere
    public String accountType = "Savings";
    
    // Private - accessible only within this class
    private double balance = 0.0;
    private String accountNumber;
    
    // Protected - accessible in subclasses and same package
    protected String customerName;
    
    // Package/Default - accessible within same package
    String branchCode = "BR001";
    
    // Public constructor
    public BankAccount(String customerName, String accountNumber) {
        this.customerName = customerName;
        this.accountNumber = accountNumber;
    }
    
    // Public methods - external interface
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            logTransaction("Deposit", amount);
        }
    }
    
    public double getBalance() {
        return balance; // Accessing private field within same class
    }
    
    // Private method - internal implementation
    private void logTransaction(String type, double amount) {
        System.out.println(type + ": $" + amount + " | Balance: $" + balance);
    }
    
    // Protected method - for inheritance
    protected boolean validateTransaction(double amount) {
        return amount > 0 && amount <= balance;
    }
}

// Subclass demonstrating inheritance access
class PremiumAccount extends BankAccount {
    public PremiumAccount(String customerName, String accountNumber) {
        super(customerName, accountNumber);
    }
    
    public void withdraw(double amount) {
        // Can access protected members from parent
        if (validateTransaction(amount)) {
            System.out.println("Withdrawal approved for " + customerName);
        }
        // Cannot access private members like balance directly
        // balance -= amount; // This would cause compilation error
    }
}`}</pre>
          </div>
        </div>

        {/* C++ Example */}
        <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 border-l-4 border-l-blue-400">
          <h3 className="text-xl font-semibold text-blue-400 mb-3">C++ Example</h3>
          <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
            <pre className="text-green-400 text-sm whitespace-pre">{`class Vehicle {
public:
    // Public members - accessible from anywhere
    string brand;
    int year;
    
    Vehicle(string b, int y) : brand(b), year(y) {}
    
    void startEngine() {
        cout << "Engine started" << endl;
        initializeSystem(); // Can call private method within class
    }
    
    void displayInfo() {
        cout << "Brand: " << brand << ", Year: " << year << endl;
        cout << "Engine Type: " << engineType << endl; // Access protected
    }

protected:
    // Protected members - accessible in derived classes
    string engineType = "Gasoline";
    
    void performMaintenance() {
        cout << "Performing maintenance..." << endl;
    }

private:
    // Private members - accessible only within this class
    bool engineRunning = false;
    string chassisNumber = "CH123456";
    
    void initializeSystem() {
        engineRunning = true;
        cout << "System initialized" << endl;
    }
};

class Car : public Vehicle {
public:
    Car(string b, int y, int d) : Vehicle(b, y), doors(d) {}
    
    void serviceCar() {
        // Can access protected members from base class
        performMaintenance();
        cout << "Engine type: " << engineType << endl;
        
        // Cannot access private members from base class
        // cout << chassisNumber; // Compilation error
    }
    
private:
    int doors;
};`}</pre>
          </div>
        </div>

        {/* Access Level Comparison Table */}
        <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 border-l-4 border-l-purple-400">
          <h3 className="text-xl font-semibold text-purple-400 mb-3">Access Level Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left p-2 text-cyan-400">Access Modifier</th>
                  <th className="text-center p-2 text-green-400">Same Class</th>
                  <th className="text-center p-2 text-yellow-400">Same Package</th>
                  <th className="text-center p-2 text-blue-400">Subclass</th>
                  <th className="text-center p-2 text-purple-400">Different Package</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-700">
                  <td className="p-2 font-semibold text-green-400">Public</td>
                  <td className="text-center p-2">✅</td>
                  <td className="text-center p-2">✅</td>
                  <td className="text-center p-2">✅</td>
                  <td className="text-center p-2">✅</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="p-2 font-semibold text-yellow-400">Protected</td>
                  <td className="text-center p-2">✅</td>
                  <td className="text-center p-2">✅</td>
                  <td className="text-center p-2">✅</td>
                  <td className="text-center p-2">❌</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="p-2 font-semibold text-blue-400">Package/Default</td>
                  <td className="text-center p-2">✅</td>
                  <td className="text-center p-2">✅</td>
                  <td className="text-center p-2">❌</td>
                  <td className="text-center p-2">❌</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold text-red-400">Private</td>
                  <td className="text-center p-2">✅</td>
                  <td className="text-center p-2">❌</td>
                  <td className="text-center p-2">❌</td>
                  <td className="text-center p-2">❌</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Language-Specific Differences */}
        <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 border-l-4 border-l-orange-400">
          <h3 className="text-xl font-semibold text-orange-400 mb-3">Language-Specific Differences</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h4 className="text-green-400 font-semibold mb-2">Java</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Has all four access levels</li>
                <li>• Default is package-private</li>
                <li>• Classes can be public or package-private</li>
                <li>• Interface methods are public by default</li>
              </ul>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h4 className="text-blue-400 font-semibold mb-2">C++</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Has public, protected, private</li>
                <li>• Default is private for classes</li>
                <li>• Default is public for structs</li>
                <li>• Friend functions can access private members</li>
              </ul>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h4 className="text-yellow-400 font-semibold mb-2">Python</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• No strict access modifiers</li>
                <li>• Convention: _ for protected, __ for private</li>
                <li>• Name mangling for __ attributes</li>
                <li>• Everything is essentially public</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 border-l-4 border-l-pink-400">
          <h3 className="text-xl font-semibold text-pink-400 mb-3">Best Practices</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h4 className="text-green-400 font-semibold mb-2">Design Principles:</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Use the most restrictive access level possible</li>
                <li>• Make fields private and provide public methods</li>
                <li>• Use protected for inheritance relationships</li>
                <li>• Keep implementation details private</li>
                <li>• Design clear public interfaces</li>
              </ul>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h4 className="text-yellow-400 font-semibold mb-2">Common Guidelines:</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Start with private, make public only when needed</li>
                <li>• Use getters/setters for controlled access</li>
                <li>• Avoid public fields (use properties instead)</li>
                <li>• Document access decisions in comments</li>
                <li>• Review access levels during code reviews</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Real-world Example */}
        <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 border-l-4 border-l-teal-400">
          <h3 className="text-xl font-semibold text-teal-400 mb-3">Real-world Example: User Management System</h3>
          <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
            <pre className="text-green-400 text-sm whitespace-pre">{`public class User {
    // Private - sensitive data hidden from external access
    private String password;
    private String socialSecurityNumber;
    
    // Protected - accessible to subclasses like AdminUser, RegularUser
    protected String userId;
    protected Date lastLoginTime;
    
    // Package - accessible within user management package
    String sessionToken;
    
    // Public - external interface for user operations
    public String username;
    public String email;
    
    public User(String username, String email) {
        this.username = username;
        this.email = email;
        this.userId = generateUserId(); // Private method
    }
    
    // Public methods - safe external interface
    public boolean authenticate(String inputPassword) {
        return validatePassword(inputPassword); // Private validation
    }
    
    public void updateProfile(String newEmail) {
        if (isValidEmail(newEmail)) {
            this.email = newEmail;
            logActivity("Profile updated"); // Private logging
        }
    }
    
    // Private methods - internal implementation
    private String generateUserId() {
        return "USER_" + System.currentTimeMillis();
    }
    
    private boolean validatePassword(String inputPassword) {
        // Complex validation logic hidden from external classes
        return password != null && password.equals(inputPassword);
    }
    
    private boolean isValidEmail(String email) {
        return email != null && email.contains("@");
    }
    
    private void logActivity(String activity) {
        System.out.println("User " + userId + ": " + activity);
    }
}`}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessModifiers;
