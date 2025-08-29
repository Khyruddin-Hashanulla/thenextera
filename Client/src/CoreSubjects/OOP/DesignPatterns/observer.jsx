import React from 'react';

const Observer = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-4">
            Observer Pattern
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Defines a one-to-many dependency between objects so that when one object changes state, all dependents are notified
          </p>
        </div>

        <div className="grid gap-8">
          {/* Observer Overview */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-blue-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-blue-400 rounded-full mr-3"></span>
              Observer Pattern Overview
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-200">Intent</h3>
                <p className="text-gray-300">
                  The Observer pattern defines a one-to-many dependency between objects where a change in one object (subject) results in all its dependents (observers) being notified and updated automatically.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Loose coupling:</strong> Subject and observers are loosely coupled</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Dynamic relationships:</strong> Observers can be added/removed at runtime</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Broadcast communication:</strong> One-to-many notification</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-200">Use Cases</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Event handling systems</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Model-View architectures</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>News subscription systems</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Stock price monitoring</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Social media notifications</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Java Observer Implementation */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-green-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-green-400 rounded-full mr-3"></span>
              Java Observer Implementation
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-300 mb-4">News Agency System</h3>
                <pre className="text-green-400 text-sm overflow-x-auto">
{`// Observer interface
interface Observer {
    void update(String news);
    String getName();
}

// Subject interface
interface Subject {
    void attach(Observer observer);
    void detach(Observer observer);
    void notifyObservers();
}

// Concrete Subject - News Agency
class NewsAgency implements Subject {
    private List<Observer> observers;
    private String latestNews;
    private String agencyName;
    
    public NewsAgency(String agencyName) {
        this.agencyName = agencyName;
        this.observers = new ArrayList<>();
    }
    
    @Override
    public void attach(Observer observer) {
        observers.add(observer);
        System.out.println(observer.getName() + " subscribed to " + agencyName);
    }
    
    @Override
    public void detach(Observer observer) {
        observers.remove(observer);
        System.out.println(observer.getName() + " unsubscribed from " + agencyName);
    }
    
    @Override
    public void notifyObservers() {
        System.out.println("\n" + agencyName + " broadcasting news to " + observers.size() + " subscribers:");
        for (Observer observer : observers) {
            observer.update(latestNews);
        }
    }
    
    public void publishNews(String news) {
        this.latestNews = news;
        System.out.println("\n" + agencyName + " published: " + news);
        notifyObservers();
    }
    
    public String getLatestNews() {
        return latestNews;
    }
    
    public String getAgencyName() {
        return agencyName;
    }
    
    public int getSubscriberCount() {
        return observers.size();
    }
}

// Concrete Observers
class NewsChannel implements Observer {
    private String channelName;
    private List<String> newsHistory;
    
    public NewsChannel(String channelName) {
        this.channelName = channelName;
        this.newsHistory = new ArrayList<>();
    }
    
    @Override
    public void update(String news) {
        newsHistory.add(news);
        System.out.println("[" + channelName + "] Received: " + news);
        broadcastNews(news);
    }
    
    @Override
    public String getName() {
        return channelName;
    }
    
    private void broadcastNews(String news) {
        System.out.println("[" + channelName + "] Broadcasting to viewers: " + news);
    }
    
    public void showNewsHistory() {
        System.out.println("\n" + channelName + " News History:");
        for (int i = 0; i < newsHistory.size(); i++) {
            System.out.println((i + 1) + ". " + newsHistory.get(i));
        }
    }
}

class MobileApp implements Observer {
    private String appName;
    private String userId;
    private boolean notificationsEnabled;
    
    public MobileApp(String appName, String userId) {
        this.appName = appName;
        this.userId = userId;
        this.notificationsEnabled = true;
    }
    
    @Override
    public void update(String news) {
        if (notificationsEnabled) {
            System.out.println("[" + appName + "] Push notification to " + userId + ": " + news);
            sendPushNotification(news);
        }
    }
    
    @Override
    public String getName() {
        return appName + " (" + userId + ")";
    }
    
    private void sendPushNotification(String news) {
        System.out.println("[" + appName + "] 📱 PUSH: " + news.substring(0, Math.min(news.length(), 50)) + "...");
    }
    
    public void toggleNotifications() {
        notificationsEnabled = !notificationsEnabled;
        System.out.println("[" + appName + "] Notifications " + (notificationsEnabled ? "enabled" : "disabled"));
    }
}

class EmailSubscriber implements Observer {
    private String email;
    private String subscriberName;
    
    public EmailSubscriber(String subscriberName, String email) {
        this.subscriberName = subscriberName;
        this.email = email;
    }
    
    @Override
    public void update(String news) {
        sendEmail(news);
    }
    
    @Override
    public String getName() {
        return subscriberName + " (" + email + ")";
    }
    
    private void sendEmail(String news) {
        System.out.println("[EMAIL] To: " + email + " | Subject: Breaking News | Body: " + news);
    }
}

// Usage example
public class ObserverDemo {
    public static void main(String[] args) {
        // Create news agencies
        NewsAgency cnn = new NewsAgency("CNN");
        NewsAgency bbc = new NewsAgency("BBC");
        
        // Create observers
        NewsChannel channel1 = new NewsChannel("Local TV");
        NewsChannel channel2 = new NewsChannel("Cable News");
        MobileApp app1 = new MobileApp("NewsApp", "user123");
        MobileApp app2 = new MobileApp("NewsApp", "user456");
        EmailSubscriber email1 = new EmailSubscriber("John Doe", "john@email.com");
        EmailSubscriber email2 = new EmailSubscriber("Jane Smith", "jane@email.com");
        
        // Subscribe to CNN
        cnn.attach(channel1);
        cnn.attach(app1);
        cnn.attach(email1);
        
        // Subscribe to BBC
        bbc.attach(channel2);
        bbc.attach(app2);
        bbc.attach(email2);
        
        // Cross-subscribe some observers
        cnn.attach(channel2);  // Cable News subscribes to both
        bbc.attach(app1);      // user123 subscribes to both
        
        // Publish news
        cnn.publishNews("Breaking: Major economic announcement expected");
        bbc.publishNews("Weather Alert: Storm approaching coastal areas");
        
        // Demonstrate unsubscribing
        System.out.println("\n--- Unsubscribing ---");
        cnn.detach(email1);
        
        // Publish more news
        cnn.publishNews("Update: Economic announcement delayed");
        
        // Show news history
        channel1.showNewsHistory();
        
        // Toggle notifications
        app1.toggleNotifications();
        bbc.publishNews("Sports: Championship finals tonight");
    }
}`}
                </pre>
              </div>
            </div>
          </section>

          {/* C++ Observer Implementation */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-purple-400 rounded-full mr-3"></span>
              C++ Observer Implementation
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-purple-300 mb-4">Stock Market System</h3>
                <pre className="text-green-400 text-sm overflow-x-auto">
{`#include <iostream>
#include <vector>
#include <string>
#include <memory>
#include <algorithm>
#include <map>
using namespace std;

// Forward declaration
class Stock;

// Observer interface
class Observer {
public:
    virtual ~Observer() = default;
    virtual void update(const Stock& stock) = 0;
    virtual string getName() const = 0;
};

// Subject interface
class Subject {
public:
    virtual ~Subject() = default;
    virtual void attach(shared_ptr<Observer> observer) = 0;
    virtual void detach(shared_ptr<Observer> observer) = 0;
    virtual void notify() = 0;
};

// Concrete Subject - Stock
class Stock : public Subject {
private:
    string symbol;
    double price;
    double previousPrice;
    vector<weak_ptr<Observer>> observers;
    
public:
    Stock(const string& symbol, double initialPrice) 
        : symbol(symbol), price(initialPrice), previousPrice(initialPrice) {}
    
    void attach(shared_ptr<Observer> observer) override {
        observers.push_back(observer);
        cout << observer->getName() << " is now watching " << symbol << endl;
    }
    
    void detach(shared_ptr<Observer> observer) override {
        observers.erase(
            remove_if(observers.begin(), observers.end(),
                [&](const weak_ptr<Observer>& weak_obs) {
                    auto obs = weak_obs.lock();
                    return !obs || obs.get() == observer.get();
                }),
            observers.end()
        );
        cout << observer->getName() << " stopped watching " << symbol << endl;
    }
    
    void notify() override {
        cout << "\n" << symbol << " notifying " << getActiveObserverCount() << " observers:" << endl;
        
        // Clean up expired weak_ptrs and notify active observers
        auto it = observers.begin();
        while (it != observers.end()) {
            if (auto observer = it->lock()) {
                observer->update(*this);
                ++it;
            } else {
                it = observers.erase(it);  // Remove expired weak_ptr
            }
        }
    }
    
    void setPrice(double newPrice) {
        previousPrice = price;
        price = newPrice;
        
        cout << "\n" << symbol << " price changed: $" << previousPrice 
             << " -> $" << price << " (" << getPriceChangePercent() << "%)" << endl;
        
        notify();
    }
    
    // Getters
    string getSymbol() const { return symbol; }
    double getPrice() const { return price; }
    double getPreviousPrice() const { return previousPrice; }
    
    double getPriceChange() const {
        return price - previousPrice;
    }
    
    double getPriceChangePercent() const {
        if (previousPrice == 0) return 0;
        return ((price - previousPrice) / previousPrice) * 100;
    }
    
    int getActiveObserverCount() const {
        int count = 0;
        for (const auto& weak_obs : observers) {
            if (weak_obs.lock()) count++;
        }
        return count;
    }
};

// Concrete Observers
class Investor : public Observer {
private:
    string name;
    double portfolio;
    map<string, int> holdings;  // symbol -> shares
    
public:
    Investor(const string& name, double initialPortfolio) 
        : name(name), portfolio(initialPortfolio) {}
    
    void update(const Stock& stock) override {
        double change = stock.getPriceChange();
        string trend = (change > 0) ? "📈 UP" : (change < 0) ? "📉 DOWN" : "➡️ FLAT";
        
        cout << "[INVESTOR " << name << "] " << stock.getSymbol() 
             << " " << trend << " $" << stock.getPrice();
        
        if (holdings.count(stock.getSymbol()) > 0) {
            double positionValue = holdings[stock.getSymbol()] * stock.getPrice();
            double positionChange = holdings[stock.getSymbol()] * change;
            cout << " | Position: " << holdings[stock.getSymbol()] 
                 << " shares = $" << positionValue 
                 << " (Change: $" << positionChange << ")";
        }
        cout << endl;
        
        makeInvestmentDecision(stock);
    }
    
    string getName() const override {
        return "Investor " + name;
    }
    
    void buyShares(const string& symbol, int shares, double price) {
        double cost = shares * price;
        if (cost <= portfolio) {
            holdings[symbol] += shares;
            portfolio -= cost;
            cout << "[" << name << "] Bought " << shares << " shares of " 
                 << symbol << " at $" << price << endl;
        }
    }
    
    void sellShares(const string& symbol, int shares, double price) {
        if (holdings[symbol] >= shares) {
            holdings[symbol] -= shares;
            portfolio += shares * price;
            cout << "[" << name << "] Sold " << shares << " shares of " 
                 << symbol << " at $" << price << endl;
        }
    }
    
private:
    void makeInvestmentDecision(const Stock& stock) {
        double changePercent = stock.getPriceChangePercent();
        
        if (changePercent > 5.0) {  // Price up more than 5%
            // Consider selling
            if (holdings[stock.getSymbol()] > 0) {
                int sharesToSell = min(10, holdings[stock.getSymbol()]);
                sellShares(stock.getSymbol(), sharesToSell, stock.getPrice());
            }
        } else if (changePercent < -5.0) {  // Price down more than 5%
            // Consider buying
            int sharesToBuy = min(10, (int)(portfolio / stock.getPrice()));
            if (sharesToBuy > 0) {
                buyShares(stock.getSymbol(), sharesToBuy, stock.getPrice());
            }
        }
    }
};

class TradingBot : public Observer {
private:
    string botName;
    double threshold;
    
public:
    TradingBot(const string& name, double threshold) 
        : botName(name), threshold(threshold) {}
    
    void update(const Stock& stock) override {
        double changePercent = abs(stock.getPriceChangePercent());
        
        cout << "[BOT " << botName << "] Analyzing " << stock.getSymbol() 
             << " - Change: " << stock.getPriceChangePercent() << "%" << endl;
        
        if (changePercent > threshold) {
            executeAlgorithmicTrade(stock);
        }
    }
    
    string getName() const override {
        return "TradingBot " + botName;
    }
    
private:
    void executeAlgorithmicTrade(const Stock& stock) {
        cout << "[BOT " << botName << "] 🤖 ALERT: " << stock.getSymbol() 
             << " exceeded " << threshold << "% threshold - Executing algorithmic trade" << endl;
    }
};

class NewsService : public Observer {
private:
    string serviceName;
    
public:
    NewsService(const string& name) : serviceName(name) {}
    
    void update(const Stock& stock) override {
        double changePercent = abs(stock.getPriceChangePercent());
        
        if (changePercent > 3.0) {  // Significant change
            publishNews(stock);
        }
    }
    
    string getName() const override {
        return "NewsService " + serviceName;
    }
    
private:
    void publishNews(const Stock& stock) {
        string direction = (stock.getPriceChange() > 0) ? "surges" : "plunges";
        cout << "[NEWS " << serviceName << "] 📰 BREAKING: " 
             << stock.getSymbol() << " " << direction << " " 
             << abs(stock.getPriceChangePercent()) << "% to $" << stock.getPrice() << endl;
    }
};

// Usage example
int main() {
    // Create stocks
    auto apple = make_shared<Stock>("AAPL", 150.0);
    auto google = make_shared<Stock>("GOOGL", 2800.0);
    
    // Create observers
    auto investor1 = make_shared<Investor>("Alice", 10000.0);
    auto investor2 = make_shared<Investor>("Bob", 15000.0);
    auto bot1 = make_shared<TradingBot>("HighFreq", 2.0);
    auto bot2 = make_shared<TradingBot>("Momentum", 5.0);
    auto news = make_shared<NewsService>("MarketWatch");
    
    // Subscribe observers to stocks
    apple->attach(investor1);
    apple->attach(investor2);
    apple->attach(bot1);
    apple->attach(news);
    
    google->attach(investor2);  // Bob watches both stocks
    google->attach(bot2);
    google->attach(news);       // News service watches both
    
    // Initial purchases
    investor1->buyShares("AAPL", 50, 150.0);
    investor2->buyShares("AAPL", 30, 150.0);
    investor2->buyShares("GOOGL", 5, 2800.0);
    
    // Simulate price changes
    apple->setPrice(158.0);   // +5.33% increase
    google->setPrice(2750.0); // -1.79% decrease
    apple->setPrice(142.0);   // -10.13% decrease from 158
    
    // Demonstrate detaching
    cout << "\n--- Investor Alice stops watching AAPL ---" << endl;
    apple->detach(investor1);
    
    apple->setPrice(155.0);   // +9.15% increase from 142
    
    return 0;
}`}
                </pre>
              </div>
            </div>
          </section>

          {/* Observer Variations */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-yellow-400 rounded-full mr-3"></span>
              Observer Pattern Variations
            </h2>
            <div className="space-y-6">
              <div className="overflow-x-auto">
                <table className="w-full bg-gray-900/70 border border-gray-600/50 rounded-lg">
                  <thead className="bg-gray-800/80">
                    <tr>
                      <th className="p-4 text-left text-gray-200">Variation</th>
                      <th className="p-4 text-left text-gray-200">Description</th>
                      <th className="p-4 text-left text-gray-200">Use Case</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-t border-gray-600/50">
                      <td className="p-4 font-semibold text-yellow-400">Push Model</td>
                      <td className="p-4">Subject sends detailed data to observers</td>
                      <td className="p-4">When observers need specific information</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-4 font-semibold text-yellow-400">Pull Model</td>
                      <td className="p-4">Observers query subject for needed data</td>
                      <td className="p-4">When observers need different information</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-4 font-semibold text-yellow-400">Event-Driven</td>
                      <td className="p-4">Observers register for specific event types</td>
                      <td className="p-4">GUI frameworks, game engines</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-4 font-semibold text-yellow-400">Weak References</td>
                      <td className="p-4">Prevents memory leaks with automatic cleanup</td>
                      <td className="p-4">Long-lived subjects with temporary observers</td>
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
                    <span>Use weak references to prevent memory leaks</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Consider asynchronous notifications for performance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Implement proper error handling in observers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Use event types for different kinds of notifications</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Document the notification contract clearly</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-orange-300">Common Pitfalls</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Don't create circular dependencies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Don't ignore observer exceptions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Don't make observers too heavyweight</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Don't forget to unsubscribe observers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Don't assume notification order</span>
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

export default Observer;
