import React from 'react';

const Singleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-4">
            Singleton Pattern
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ensures a class has only one instance and provides global access to that instance
          </p>
        </div>

        <div className="grid gap-8">
          {/* Singleton Overview */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-blue-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-blue-400 rounded-full mr-3"></span>
              Singleton Pattern Overview
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-200">Intent</h3>
                <p className="text-gray-300">
                  The Singleton pattern ensures that a class has only one instance throughout the application lifecycle and provides a global point of access to that instance.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Single instance:</strong> Only one object exists</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Global access:</strong> Available from anywhere</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Lazy initialization:</strong> Created when first needed</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-200">Use Cases</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Database connection managers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Configuration settings</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Logging services</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Cache managers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Thread pools</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Java Singleton Implementation */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-green-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-green-400 rounded-full mr-3"></span>
              Java Singleton Implementations
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-300 mb-4">Thread-Safe Singleton with Double-Checked Locking</h3>
                <pre className="text-green-400 text-sm overflow-x-auto">
{`// Thread-safe Singleton with lazy initialization
public class DatabaseManager {
    // Volatile ensures visibility across threads
    private static volatile DatabaseManager instance;
    private String connectionString;
    private int maxConnections;
    
    // Private constructor prevents external instantiation
    private DatabaseManager() {
        // Initialize database configuration
        this.connectionString = "jdbc:mysql://localhost:3306/mydb";
        this.maxConnections = 10;
        System.out.println("DatabaseManager instance created");
    }
    
    // Thread-safe getInstance method with double-checked locking
    public static DatabaseManager getInstance() {
        if (instance == null) {  // First check (no locking)
            synchronized (DatabaseManager.class) {
                if (instance == null) {  // Second check (with locking)
                    instance = new DatabaseManager();
                }
            }
        }
        return instance;
    }
    
    // Business methods
    public void connect() {
        System.out.println("Connecting to database: " + connectionString);
    }
    
    public void disconnect() {
        System.out.println("Disconnecting from database");
    }
    
    public void executeQuery(String query) {
        System.out.println("Executing query: " + query);
    }
    
    public String getConnectionString() {
        return connectionString;
    }
    
    public void setConnectionString(String connectionString) {
        this.connectionString = connectionString;
    }
    
    public int getMaxConnections() {
        return maxConnections;
    }
    
    // Prevent cloning
    @Override
    protected Object clone() throws CloneNotSupportedException {
        throw new CloneNotSupportedException("Singleton cannot be cloned");
    }
    
    // Handle serialization
    protected Object readResolve() {
        return getInstance();
    }
}

// Enum-based Singleton (Joshua Bloch's recommendation)
public enum ConfigurationManager {
    INSTANCE;
    
    private Properties config;
    
    // Constructor called only once
    ConfigurationManager() {
        config = new Properties();
        loadConfiguration();
    }
    
    private void loadConfiguration() {
        // Load configuration from file or environment
        config.setProperty("app.name", "MyApplication");
        config.setProperty("app.version", "1.0.0");
        config.setProperty("debug.enabled", "true");
        System.out.println("Configuration loaded");
    }
    
    public String getProperty(String key) {
        return config.getProperty(key);
    }
    
    public void setProperty(String key, String value) {
        config.setProperty(key, value);
    }
    
    public void displayAllProperties() {
        System.out.println("Configuration Properties:");
        config.forEach((key, value) -> 
            System.out.println(key + " = " + value));
    }
}

// Bill Pugh Singleton (Initialization-on-demand holder idiom)
public class Logger {
    // Private constructor
    private Logger() {
        System.out.println("Logger instance created");
    }
    
    // Static inner class - loaded only when getInstance() is called
    private static class SingletonHelper {
        private static final Logger INSTANCE = new Logger();
    }
    
    public static Logger getInstance() {
        return SingletonHelper.INSTANCE;
    }
    
    public void log(String level, String message) {
        System.out.println("[" + level + "] " + 
                         java.time.LocalDateTime.now() + " - " + message);
    }
    
    public void info(String message) {
        log("INFO", message);
    }
    
    public void error(String message) {
        log("ERROR", message);
    }
    
    public void debug(String message) {
        log("DEBUG", message);
    }
}

// Usage example
public class SingletonDemo {
    public static void main(String[] args) {
        // Test DatabaseManager
        DatabaseManager db1 = DatabaseManager.getInstance();
        DatabaseManager db2 = DatabaseManager.getInstance();
        
        System.out.println("db1 == db2: " + (db1 == db2)); // true
        
        db1.connect();
        db1.executeQuery("SELECT * FROM users");
        db1.disconnect();
        
        // Test ConfigurationManager
        ConfigurationManager config = ConfigurationManager.INSTANCE;
        config.displayAllProperties();
        
        System.out.println("App Name: " + config.getProperty("app.name"));
        
        // Test Logger
        Logger logger = Logger.getInstance();
        logger.info("Application started");
        logger.error("An error occurred");
        logger.debug("Debug information");
        
        // Verify same instance
        Logger logger2 = Logger.getInstance();
        System.out.println("logger == logger2: " + (logger == logger2)); // true
    }
}`}
                </pre>
              </div>
            </div>
          </section>

          {/* C++ Singleton Implementation */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-purple-400 rounded-full mr-3"></span>
              C++ Singleton Implementations
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-purple-300 mb-4">Thread-Safe Singleton with Meyer's Implementation</h3>
                <pre className="text-green-400 text-sm overflow-x-auto">
{`#include <iostream>
#include <string>
#include <mutex>
#include <memory>
#include <thread>
using namespace std;

// Meyer's Singleton (C++11 thread-safe)
class ApplicationSettings {
private:
    string appName;
    string version;
    bool debugMode;
    
    // Private constructor
    ApplicationSettings() : appName("MyApp"), version("1.0"), debugMode(false) {
        cout << "ApplicationSettings instance created" << endl;
    }
    
    // Delete copy constructor and assignment operator
    ApplicationSettings(const ApplicationSettings&) = delete;
    ApplicationSettings& operator=(const ApplicationSettings&) = delete;
    
public:
    // Thread-safe getInstance (C++11 guarantees thread safety for static local variables)
    static ApplicationSettings& getInstance() {
        static ApplicationSettings instance;  // Guaranteed to be destroyed
        return instance;                      // Guaranteed to be initialized only once
    }
    
    // Getters and setters
    const string& getAppName() const { return appName; }
    void setAppName(const string& name) { appName = name; }
    
    const string& getVersion() const { return version; }
    void setVersion(const string& ver) { version = ver; }
    
    bool isDebugMode() const { return debugMode; }
    void setDebugMode(bool debug) { debugMode = debug; }
    
    void displaySettings() const {
        cout << "Application Settings:" << endl;
        cout << "Name: " << appName << endl;
        cout << "Version: " << version << endl;
        cout << "Debug Mode: " << (debugMode ? "ON" : "OFF") << endl;
    }
};

// Classic Singleton with mutex (for demonstration)
class NetworkManager {
private:
    static NetworkManager* instance;
    static mutex mtx;
    
    string serverUrl;
    int timeout;
    bool connected;
    
    // Private constructor
    NetworkManager() : serverUrl("https://api.example.com"), timeout(30), connected(false) {
        cout << "NetworkManager instance created" << endl;
    }
    
public:
    // Delete copy constructor and assignment operator
    NetworkManager(const NetworkManager&) = delete;
    NetworkManager& operator=(const NetworkManager&) = delete;
    
    static NetworkManager* getInstance() {
        // Double-checked locking pattern
        if (instance == nullptr) {
            lock_guard<mutex> lock(mtx);
            if (instance == nullptr) {
                instance = new NetworkManager();
            }
        }
        return instance;
    }
    
    void connect() {
        if (!connected) {
            cout << "Connecting to server: " << serverUrl << endl;
            connected = true;
        } else {
            cout << "Already connected" << endl;
        }
    }
    
    void disconnect() {
        if (connected) {
            cout << "Disconnecting from server" << endl;
            connected = false;
        }
    }
    
    void sendRequest(const string& endpoint) {
        if (connected) {
            cout << "Sending request to: " << serverUrl << endpoint << endl;
        } else {
            cout << "Not connected. Please connect first." << endl;
        }
    }
    
    bool isConnected() const { return connected; }
    
    // Destructor
    ~NetworkManager() {
        if (connected) {
            disconnect();
        }
        cout << "NetworkManager destroyed" << endl;
    }
    
    // Cleanup method
    static void cleanup() {
        lock_guard<mutex> lock(mtx);
        delete instance;
        instance = nullptr;
    }
};

// Static member definitions
NetworkManager* NetworkManager::instance = nullptr;
mutex NetworkManager::mtx;

// RAII Singleton with smart pointer
class CacheManager {
private:
    static unique_ptr<CacheManager> instance;
    static once_flag initialized;
    
    unordered_map<string, string> cache;
    size_t maxSize;
    
    CacheManager(size_t size = 100) : maxSize(size) {
        cout << "CacheManager instance created with max size: " << size << endl;
    }
    
public:
    static CacheManager& getInstance() {
        call_once(initialized, []() {
            instance = unique_ptr<CacheManager>(new CacheManager());
        });
        return *instance;
    }
    
    void put(const string& key, const string& value) {
        if (cache.size() >= maxSize) {
            // Simple eviction: remove first element
            cache.erase(cache.begin());
        }
        cache[key] = value;
        cout << "Cached: " << key << " -> " << value << endl;
    }
    
    string get(const string& key) {
        auto it = cache.find(key);
        if (it != cache.end()) {
            cout << "Cache hit for: " << key << endl;
            return it->second;
        }
        cout << "Cache miss for: " << key << endl;
        return "";
    }
    
    void clear() {
        cache.clear();
        cout << "Cache cleared" << endl;
    }
    
    size_t size() const { return cache.size(); }
    
    void displayStats() const {
        cout << "Cache Stats: " << cache.size() << "/" << maxSize << " entries" << endl;
    }
};

// Static member definitions
unique_ptr<CacheManager> CacheManager::instance = nullptr;
once_flag CacheManager::initialized;

// Usage example
int main() {
    // Test Meyer's Singleton
    ApplicationSettings& settings1 = ApplicationSettings::getInstance();
    ApplicationSettings& settings2 = ApplicationSettings::getInstance();
    
    cout << "settings1 == settings2: " << (&settings1 == &settings2) << endl; // true
    
    settings1.setAppName("MyApplication");
    settings1.setDebugMode(true);
    settings2.displaySettings();  // Shows updated values
    
    // Test classic Singleton
    NetworkManager* network1 = NetworkManager::getInstance();
    NetworkManager* network2 = NetworkManager::getInstance();
    
    cout << "network1 == network2: " << (network1 == network2) << endl; // true
    
    network1->connect();
    network1->sendRequest("/api/users");
    network2->disconnect();  // Same instance
    
    // Test RAII Singleton
    CacheManager& cache1 = CacheManager::getInstance();
    CacheManager& cache2 = CacheManager::getInstance();
    
    cout << "cache1 == cache2: " << (&cache1 == &cache2) << endl; // true
    
    cache1.put("user:123", "John Doe");
    cache1.put("user:456", "Jane Smith");
    
    string user = cache2.get("user:123");  // Same instance
    cache1.displayStats();
    
    // Cleanup
    NetworkManager::cleanup();
    
    return 0;
}`}
                </pre>
              </div>
            </div>
          </section>

          {/* Singleton Variations */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-yellow-400 rounded-full mr-3"></span>
              Singleton Variations
            </h2>
            <div className="space-y-6">
              <div className="overflow-x-auto">
                <table className="w-full bg-gray-900/70 border border-gray-600/50 rounded-lg">
                  <thead className="bg-gray-800/80">
                    <tr>
                      <th className="p-4 text-left text-gray-200">Implementation</th>
                      <th className="p-4 text-left text-gray-200">Thread Safety</th>
                      <th className="p-4 text-left text-gray-200">Lazy Loading</th>
                      <th className="p-4 text-left text-gray-200">Performance</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-t border-gray-600/50">
                      <td className="p-4 font-semibold text-yellow-400">Eager Initialization</td>
                      <td className="p-4">✅ Yes</td>
                      <td className="p-4">❌ No</td>
                      <td className="p-4">⚡ Fast</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-4 font-semibold text-yellow-400">Lazy Initialization</td>
                      <td className="p-4">❌ No</td>
                      <td className="p-4">✅ Yes</td>
                      <td className="p-4">⚡ Fast</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-4 font-semibold text-yellow-400">Synchronized Method</td>
                      <td className="p-4">✅ Yes</td>
                      <td className="p-4">✅ Yes</td>
                      <td className="p-4">🐌 Slow</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-4 font-semibold text-yellow-400">Double-Checked Locking</td>
                      <td className="p-4">✅ Yes</td>
                      <td className="p-4">✅ Yes</td>
                      <td className="p-4">⚡ Fast</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-4 font-semibold text-yellow-400">Bill Pugh (Inner Class)</td>
                      <td className="p-4">✅ Yes</td>
                      <td className="p-4">✅ Yes</td>
                      <td className="p-4">⚡ Fast</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-4 font-semibold text-yellow-400">Enum Singleton</td>
                      <td className="p-4">✅ Yes</td>
                      <td className="p-4">❌ No</td>
                      <td className="p-4">⚡ Fast</td>
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
                    <span>Use enum singleton in Java when possible</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Prefer Meyer's singleton in C++11+</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Make constructor private</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Delete copy constructor and assignment operator</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Handle serialization properly</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-orange-300">Potential Issues</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Difficult to unit test</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Hidden dependencies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Violates Single Responsibility Principle</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Global state can cause issues</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Thread safety complexity</span>
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

export default Singleton;
