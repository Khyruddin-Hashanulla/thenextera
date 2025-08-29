import React from 'react';

const Factory = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-4">
            Factory Pattern
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Creates objects without specifying their exact classes, promoting loose coupling and flexibility
          </p>
        </div>

        <div className="grid gap-8">
          {/* Factory Pattern Overview */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-blue-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-blue-400 rounded-full mr-3"></span>
              Factory Pattern Overview
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-200">Intent</h3>
                <p className="text-gray-300">
                  The Factory pattern provides an interface for creating objects without specifying their exact classes. It encapsulates object creation logic and promotes loose coupling between client code and concrete classes.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Encapsulates creation:</strong> Hides object instantiation logic</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Promotes flexibility:</strong> Easy to add new types</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Loose coupling:</strong> Client doesn't know concrete classes</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-200">Factory Types</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Simple Factory:</strong> Static method creates objects</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Factory Method:</strong> Subclasses decide which class to instantiate</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Abstract Factory:</strong> Creates families of related objects</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Java Factory Implementation */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-green-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-green-400 rounded-full mr-3"></span>
              Java Factory Implementations
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-300 mb-4">Simple Factory & Factory Method Pattern</h3>
                <pre className="text-green-400 text-sm overflow-x-auto">
{`// Product interface
interface Vehicle {
    void start();
    void stop();
    void displayInfo();
    String getType();
}

// Concrete products
class Car implements Vehicle {
    private String model;
    private int doors;
    
    public Car(String model, int doors) {
        this.model = model;
        this.doors = doors;
    }
    
    @Override
    public void start() {
        System.out.println("Car engine started with key ignition");
    }
    
    @Override
    public void stop() {
        System.out.println("Car engine stopped");
    }
    
    @Override
    public void displayInfo() {
        System.out.println("Car: " + model + " with " + doors + " doors");
    }
    
    @Override
    public String getType() {
        return "Car";
    }
}

class Motorcycle implements Vehicle {
    private String brand;
    private int engineCC;
    
    public Motorcycle(String brand, int engineCC) {
        this.brand = brand;
        this.engineCC = engineCC;
    }
    
    @Override
    public void start() {
        System.out.println("Motorcycle started with kick/electric start");
    }
    
    @Override
    public void stop() {
        System.out.println("Motorcycle engine stopped");
    }
    
    @Override
    public void displayInfo() {
        System.out.println("Motorcycle: " + brand + " " + engineCC + "CC");
    }
    
    @Override
    public String getType() {
        return "Motorcycle";
    }
}

class Truck implements Vehicle {
    private String brand;
    private double loadCapacity;
    
    public Truck(String brand, double loadCapacity) {
        this.brand = brand;
        this.loadCapacity = loadCapacity;
    }
    
    @Override
    public void start() {
        System.out.println("Truck diesel engine started");
    }
    
    @Override
    public void stop() {
        System.out.println("Truck engine stopped");
    }
    
    @Override
    public void displayInfo() {
        System.out.println("Truck: " + brand + " (Load capacity: " + loadCapacity + " tons)");
    }
    
    @Override
    public String getType() {
        return "Truck";
    }
}

// Simple Factory
class VehicleFactory {
    public static Vehicle createVehicle(String type, String... params) {
        switch (type.toLowerCase()) {
            case "car":
                return new Car(params[0], Integer.parseInt(params[1]));
            case "motorcycle":
                return new Motorcycle(params[0], Integer.parseInt(params[1]));
            case "truck":
                return new Truck(params[0], Double.parseDouble(params[1]));
            default:
                throw new IllegalArgumentException("Unknown vehicle type: " + type);
        }
    }
    
    // Factory method with configuration
    public static Vehicle createVehicleWithConfig(VehicleConfig config) {
        switch (config.getType().toLowerCase()) {
            case "car":
                return new Car(config.getModel(), config.getDoors());
            case "motorcycle":
                return new Motorcycle(config.getBrand(), config.getEngineCC());
            case "truck":
                return new Truck(config.getBrand(), config.getLoadCapacity());
            default:
                throw new IllegalArgumentException("Unknown vehicle type: " + config.getType());
        }
    }
}

// Configuration class for complex object creation
class VehicleConfig {
    private String type;
    private String model;
    private String brand;
    private int doors;
    private int engineCC;
    private double loadCapacity;
    
    // Builder pattern for configuration
    public static class Builder {
        private VehicleConfig config = new VehicleConfig();
        
        public Builder type(String type) {
            config.type = type;
            return this;
        }
        
        public Builder model(String model) {
            config.model = model;
            return this;
        }
        
        public Builder brand(String brand) {
            config.brand = brand;
            return this;
        }
        
        public Builder doors(int doors) {
            config.doors = doors;
            return this;
        }
        
        public Builder engineCC(int engineCC) {
            config.engineCC = engineCC;
            return this;
        }
        
        public Builder loadCapacity(double loadCapacity) {
            config.loadCapacity = loadCapacity;
            return this;
        }
        
        public VehicleConfig build() {
            return config;
        }
    }
    
    // Getters
    public String getType() { return type; }
    public String getModel() { return model; }
    public String getBrand() { return brand; }
    public int getDoors() { return doors; }
    public int getEngineCC() { return engineCC; }
    public double getLoadCapacity() { return loadCapacity; }
}

// Factory Method Pattern - Abstract Creator
abstract class VehicleManufacturer {
    // Factory method - to be implemented by subclasses
    public abstract Vehicle createVehicle(String model);
    
    // Template method using factory method
    public Vehicle orderVehicle(String model) {
        Vehicle vehicle = createVehicle(model);
        
        // Common operations
        System.out.println("Manufacturing " + vehicle.getType() + "...");
        performQualityCheck(vehicle);
        registerVehicle(vehicle);
        
        return vehicle;
    }
    
    private void performQualityCheck(Vehicle vehicle) {
        System.out.println("Performing quality check on " + vehicle.getType());
    }
    
    private void registerVehicle(Vehicle vehicle) {
        System.out.println("Registering " + vehicle.getType() + " in database");
    }
}

// Concrete Creators
class CarManufacturer extends VehicleManufacturer {
    @Override
    public Vehicle createVehicle(String model) {
        switch (model.toLowerCase()) {
            case "sedan":
                return new Car("Sedan", 4);
            case "suv":
                return new Car("SUV", 4);
            case "hatchback":
                return new Car("Hatchback", 4);
            default:
                return new Car("Standard Car", 4);
        }
    }
}

class MotorcycleManufacturer extends VehicleManufacturer {
    @Override
    public Vehicle createVehicle(String model) {
        switch (model.toLowerCase()) {
            case "sport":
                return new Motorcycle("Sport Bike", 1000);
            case "cruiser":
                return new Motorcycle("Cruiser", 1200);
            case "touring":
                return new Motorcycle("Touring", 1500);
            default:
                return new Motorcycle("Standard Bike", 500);
        }
    }
}

// Usage example
public class FactoryDemo {
    public static void main(String[] args) {
        // Simple Factory usage
        System.out.println("=== Simple Factory ===");
        Vehicle car = VehicleFactory.createVehicle("car", "Toyota Camry", "4");
        Vehicle motorcycle = VehicleFactory.createVehicle("motorcycle", "Honda CBR", "600");
        Vehicle truck = VehicleFactory.createVehicle("truck", "Volvo", "15.5");
        
        car.displayInfo();
        motorcycle.displayInfo();
        truck.displayInfo();
        
        // Factory with configuration
        System.out.println("\n=== Factory with Configuration ===");
        VehicleConfig carConfig = new VehicleConfig.Builder()
            .type("car")
            .model("BMW X5")
            .doors(4)
            .build();
            
        Vehicle configuredCar = VehicleFactory.createVehicleWithConfig(carConfig);
        configuredCar.displayInfo();
        
        // Factory Method Pattern
        System.out.println("\n=== Factory Method Pattern ===");
        VehicleManufacturer carFactory = new CarManufacturer();
        VehicleManufacturer bikeFactory = new MotorcycleManufacturer();
        
        Vehicle sedan = carFactory.orderVehicle("sedan");
        Vehicle sportBike = bikeFactory.orderVehicle("sport");
        
        sedan.start();
        sportBike.start();
    }
}`}
                </pre>
              </div>
            </div>
          </section>

          {/* C++ Factory Implementation */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-purple-400 rounded-full mr-3"></span>
              C++ Factory Implementations
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-purple-300 mb-4">Abstract Factory Pattern</h3>
                <pre className="text-green-400 text-sm overflow-x-auto">
{`#include <iostream>
#include <memory>
#include <string>
#include <map>
#include <functional>
using namespace std;

// Abstract Product A - Button
class Button {
public:
    virtual ~Button() = default;
    virtual void render() = 0;
    virtual void onClick() = 0;
    virtual string getStyle() const = 0;
};

// Abstract Product B - Checkbox
class Checkbox {
public:
    virtual ~Checkbox() = default;
    virtual void render() = 0;
    virtual void toggle() = 0;
    virtual string getStyle() const = 0;
};

// Concrete Products for Windows Theme
class WindowsButton : public Button {
public:
    void render() override {
        cout << "Rendering Windows-style button with border and gradient" << endl;
    }
    
    void onClick() override {
        cout << "Windows button clicked with system sound" << endl;
    }
    
    string getStyle() const override {
        return "Windows";
    }
};

class WindowsCheckbox : public Checkbox {
private:
    bool checked = false;
    
public:
    void render() override {
        cout << "Rendering Windows-style checkbox with square design" << endl;
    }
    
    void toggle() override {
        checked = !checked;
        cout << "Windows checkbox " << (checked ? "checked" : "unchecked") << endl;
    }
    
    string getStyle() const override {
        return "Windows";
    }
};

// Concrete Products for Mac Theme
class MacButton : public Button {
public:
    void render() override {
        cout << "Rendering Mac-style button with rounded corners" << endl;
    }
    
    void onClick() override {
        cout << "Mac button clicked with subtle animation" << endl;
    }
    
    string getStyle() const override {
        return "Mac";
    }
};

class MacCheckbox : public Checkbox {
private:
    bool checked = false;
    
public:
    void render() override {
        cout << "Rendering Mac-style checkbox with smooth curves" << endl;
    }
    
    void toggle() override {
        checked = !checked;
        cout << "Mac checkbox " << (checked ? "checked" : "unchecked") 
             << " with smooth transition" << endl;
    }
    
    string getStyle() const override {
        return "Mac";
    }
};

// Concrete Products for Linux Theme
class LinuxButton : public Button {
public:
    void render() override {
        cout << "Rendering Linux-style button with flat design" << endl;
    }
    
    void onClick() override {
        cout << "Linux button clicked" << endl;
    }
    
    string getStyle() const override {
        return "Linux";
    }
};

class LinuxCheckbox : public Checkbox {
private:
    bool checked = false;
    
public:
    void render() override {
        cout << "Rendering Linux-style checkbox with minimalist design" << endl;
    }
    
    void toggle() override {
        checked = !checked;
        cout << "Linux checkbox " << (checked ? "checked" : "unchecked") << endl;
    }
    
    string getStyle() const override {
        return "Linux";
    }
};

// Abstract Factory
class GUIFactory {
public:
    virtual ~GUIFactory() = default;
    virtual unique_ptr<Button> createButton() = 0;
    virtual unique_ptr<Checkbox> createCheckbox() = 0;
    virtual string getTheme() const = 0;
};

// Concrete Factories
class WindowsFactory : public GUIFactory {
public:
    unique_ptr<Button> createButton() override {
        return make_unique<WindowsButton>();
    }
    
    unique_ptr<Checkbox> createCheckbox() override {
        return make_unique<WindowsCheckbox>();
    }
    
    string getTheme() const override {
        return "Windows";
    }
};

class MacFactory : public GUIFactory {
public:
    unique_ptr<Button> createButton() override {
        return make_unique<MacButton>();
    }
    
    unique_ptr<Checkbox> createCheckbox() override {
        return make_unique<MacCheckbox>();
    }
    
    string getTheme() const override {
        return "Mac";
    }
};

class LinuxFactory : public GUIFactory {
public:
    unique_ptr<Button> createButton() override {
        return make_unique<LinuxButton>();
    }
    
    unique_ptr<Checkbox> createCheckbox() override {
        return make_unique<LinuxCheckbox>();
    }
    
    string getTheme() const override {
        return "Linux";
    }
};

// Factory Registry for dynamic factory selection
class FactoryRegistry {
private:
    map<string, function<unique_ptr<GUIFactory>()>> factories;
    
public:
    void registerFactory(const string& name, function<unique_ptr<GUIFactory>()> factory) {
        factories[name] = factory;
    }
    
    unique_ptr<GUIFactory> createFactory(const string& name) {
        auto it = factories.find(name);
        if (it != factories.end()) {
            return it->second();
        }
        throw invalid_argument("Unknown factory type: " + name);
    }
    
    vector<string> getAvailableFactories() const {
        vector<string> names;
        for (const auto& pair : factories) {
            names.push_back(pair.first);
        }
        return names;
    }
};

// Client Application
class Application {
private:
    unique_ptr<GUIFactory> factory;
    unique_ptr<Button> button;
    unique_ptr<Checkbox> checkbox;
    
public:
    Application(unique_ptr<GUIFactory> guiFactory) : factory(move(guiFactory)) {
        button = factory->createButton();
        checkbox = factory->createCheckbox();
    }
    
    void render() {
        cout << "Rendering application with " << factory->getTheme() << " theme:" << endl;
        button->render();
        checkbox->render();
    }
    
    void handleUserInput() {
        cout << "\nSimulating user interactions:" << endl;
        button->onClick();
        checkbox->toggle();
        checkbox->toggle();
    }
};

// Factory Method with Template
template<typename T>
class GenericFactory {
public:
    template<typename... Args>
    static unique_ptr<T> create(Args&&... args) {
        return make_unique<T>(forward<Args>(args)...);
    }
};

// Usage example
int main() {
    // Setup factory registry
    FactoryRegistry registry;
    registry.registerFactory("windows", []() { return make_unique<WindowsFactory>(); });
    registry.registerFactory("mac", []() { return make_unique<MacFactory>(); });
    registry.registerFactory("linux", []() { return make_unique<LinuxFactory>(); });
    
    // Demonstrate different themes
    vector<string> themes = {"windows", "mac", "linux"};
    
    for (const string& theme : themes) {
        cout << "\n" << string(50, '=') << endl;
        cout << "Creating application with " << theme << " theme" << endl;
        cout << string(50, '=') << endl;
        
        try {
            auto factory = registry.createFactory(theme);
            Application app(move(factory));
            
            app.render();
            app.handleUserInput();
            
        } catch (const exception& e) {
            cout << "Error: " << e.what() << endl;
        }
    }
    
    // Demonstrate generic factory
    cout << "\n" << string(50, '=') << endl;
    cout << "Generic Factory Example" << endl;
    cout << string(50, '=') << endl;
    
    auto windowsButton = GenericFactory<WindowsButton>::create();
    auto macCheckbox = GenericFactory<MacCheckbox>::create();
    
    windowsButton->render();
    macCheckbox->render();
    
    return 0;
}`}
                </pre>
              </div>
            </div>
          </section>

          {/* Factory Pattern Comparison */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-yellow-400 rounded-full mr-3"></span>
              Factory Pattern Comparison
            </h2>
            <div className="space-y-6">
              <div className="overflow-x-auto">
                <table className="w-full bg-gray-900/70 border border-gray-600/50 rounded-lg">
                  <thead className="bg-gray-800/80">
                    <tr>
                      <th className="p-4 text-left text-gray-200">Pattern</th>
                      <th className="p-4 text-left text-gray-200">Purpose</th>
                      <th className="p-4 text-left text-gray-200">Complexity</th>
                      <th className="p-4 text-left text-gray-200">Use Case</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-t border-gray-600/50">
                      <td className="p-4 font-semibold text-yellow-400">Simple Factory</td>
                      <td className="p-4">Create objects based on parameters</td>
                      <td className="p-4">🟢 Low</td>
                      <td className="p-4">Simple object creation with few types</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-4 font-semibold text-yellow-400">Factory Method</td>
                      <td className="p-4">Let subclasses decide which class to instantiate</td>
                      <td className="p-4">🟡 Medium</td>
                      <td className="p-4">When creation logic varies by subclass</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-4 font-semibold text-yellow-400">Abstract Factory</td>
                      <td className="p-4">Create families of related objects</td>
                      <td className="p-4">🔴 High</td>
                      <td className="p-4">Multiple related products with variants</td>
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
              Best Practices & Considerations
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-orange-300">Best Practices</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Use simple factory for straightforward cases</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Prefer factory method when subclassing is needed</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Use abstract factory for product families</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Consider registry pattern for dynamic factories</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Combine with builder pattern for complex objects</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-orange-300">Common Pitfalls</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Don't overuse factory patterns for simple cases</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Don't create factories for every class</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Don't ignore error handling in factory methods</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Don't make factory interfaces too complex</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Don't forget to handle unknown product types</span>
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

export default Factory;
