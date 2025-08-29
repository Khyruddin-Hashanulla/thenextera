import React from 'react';

const Interfaces = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-4">
            Interfaces
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Contracts that define what methods a class must implement without providing implementation details
          </p>
        </div>

        <div className="grid gap-8">
          {/* Interfaces Overview */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-blue-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-blue-400 rounded-full mr-3"></span>
              Interfaces Overview
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-200">Definition</h3>
                <p className="text-gray-300">
                  An interface is a contract that specifies what methods a class must implement. It defines the "what" but not the "how", providing complete abstraction.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Pure abstraction:</strong> No implementation details</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Contract enforcement:</strong> Classes must implement all methods</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Multiple inheritance:</strong> Classes can implement multiple interfaces</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-200">Key Benefits</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Achieves multiple inheritance of type</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Promotes loose coupling between classes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Enables polymorphism and dependency injection</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Facilitates testing with mock implementations</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Java Interfaces */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-green-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-green-400 rounded-full mr-3"></span>
              Java Interfaces
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-300 mb-4">Payment System Example</h3>
                <pre className="text-green-400 text-sm overflow-x-auto">
{`// Basic interface definition
interface PaymentProcessor {
    // All methods are implicitly public and abstract
    boolean processPayment(double amount, String currency);
    void refund(String transactionId, double amount);
    String getPaymentStatus(String transactionId);
    
    // Default method (Java 8+)
    default void logTransaction(String transactionId, double amount) {
        System.out.println("Transaction " + transactionId + " for $" + amount + " logged");
    }
    
    // Static method (Java 8+)
    static boolean isValidAmount(double amount) {
        return amount > 0 && amount <= 10000;
    }
    
    // Constants (implicitly public, static, final)
    double MAX_TRANSACTION_AMOUNT = 10000.0;
    int TIMEOUT_SECONDS = 30;
}

// Interface for notification capability
interface NotificationSender {
    void sendNotification(String recipient, String message);
    boolean isNotificationEnabled();
    
    default void sendTransactionAlert(String recipient, double amount) {
        if (isNotificationEnabled()) {
            sendNotification(recipient, "Transaction of $" + amount + " processed");
        }
    }
}

// Interface for audit logging
interface AuditLogger {
    void logAuditEvent(String event, String details);
    void generateAuditReport();
}

// Concrete implementation - Credit Card Processor
class CreditCardProcessor implements PaymentProcessor, NotificationSender, AuditLogger {
    private String merchantId;
    private boolean notificationsEnabled;
    
    public CreditCardProcessor(String merchantId) {
        this.merchantId = merchantId;
        this.notificationsEnabled = true;
    }
    
    @Override
    public boolean processPayment(double amount, String currency) {
        if (!PaymentProcessor.isValidAmount(amount)) {
            System.out.println("Invalid payment amount: $" + amount);
            return false;
        }
        
        // Simulate credit card processing
        System.out.println("Processing credit card payment: $" + amount + " " + currency);
        String transactionId = "CC_" + System.currentTimeMillis();
        
        // Log the transaction using default method
        logTransaction(transactionId, amount);
        
        // Send notification
        sendTransactionAlert("customer@email.com", amount);
        
        // Log audit event
        logAuditEvent("PAYMENT_PROCESSED", 
                     "Credit card payment of $" + amount + " processed successfully");
        
        return true;
    }
    
    @Override
    public void refund(String transactionId, double amount) {
        System.out.println("Processing refund for transaction " + transactionId + 
                         ": $" + amount);
        logAuditEvent("REFUND_PROCESSED", "Refund of $" + amount + " for " + transactionId);
    }
    
    @Override
    public String getPaymentStatus(String transactionId) {
        return "COMPLETED"; // Simplified for demo
    }
    
    @Override
    public void sendNotification(String recipient, String message) {
        System.out.println("Email notification to " + recipient + ": " + message);
    }
    
    @Override
    public boolean isNotificationEnabled() {
        return notificationsEnabled;
    }
    
    @Override
    public void logAuditEvent(String event, String details) {
        System.out.println("AUDIT [" + event + "]: " + details);
    }
    
    @Override
    public void generateAuditReport() {
        System.out.println("Generating credit card processor audit report...");
    }
}

// Another implementation - PayPal Processor
class PayPalProcessor implements PaymentProcessor, NotificationSender {
    private String apiKey;
    
    public PayPalProcessor(String apiKey) {
        this.apiKey = apiKey;
    }
    
    @Override
    public boolean processPayment(double amount, String currency) {
        System.out.println("Processing PayPal payment: $" + amount + " " + currency);
        return true;
    }
    
    @Override
    public void refund(String transactionId, double amount) {
        System.out.println("Processing PayPal refund: " + transactionId + " - $" + amount);
    }
    
    @Override
    public String getPaymentStatus(String transactionId) {
        return "PENDING";
    }
    
    @Override
    public void sendNotification(String recipient, String message) {
        System.out.println("PayPal notification to " + recipient + ": " + message);
    }
    
    @Override
    public boolean isNotificationEnabled() {
        return true; // PayPal always sends notifications
    }
}

// Usage with polymorphism
class PaymentService {
    private PaymentProcessor processor;
    
    public PaymentService(PaymentProcessor processor) {
        this.processor = processor;
    }
    
    public void processOrder(double amount, String currency) {
        if (processor.processPayment(amount, currency)) {
            System.out.println("Order processed successfully!");
        } else {
            System.out.println("Payment failed!");
        }
    }
    
    public void setProcessor(PaymentProcessor processor) {
        this.processor = processor;
    }
}

// Demo usage
public class InterfaceDemo {
    public static void main(String[] args) {
        PaymentProcessor creditCard = new CreditCardProcessor("MERCHANT_123");
        PaymentProcessor paypal = new PayPalProcessor("API_KEY_456");
        
        PaymentService service = new PaymentService(creditCard);
        service.processOrder(150.00, "USD");
        
        // Switch to different processor
        service.setProcessor(paypal);
        service.processOrder(75.50, "EUR");
    }
}`}
                </pre>
              </div>
            </div>
          </section>

          {/* C++ Interfaces */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-purple-400 rounded-full mr-3"></span>
              C++ Interfaces (Pure Virtual Classes)
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-purple-300 mb-4">Media Player System Example</h3>
                <pre className="text-green-400 text-sm overflow-x-auto">
{`#include <iostream>
#include <string>
#include <vector>
#include <memory>
using namespace std;

// Interface for media playback (pure virtual class)
class IMediaPlayer {
public:
    virtual ~IMediaPlayer() = default;
    
    // Pure virtual methods (interface contract)
    virtual void play() = 0;
    virtual void pause() = 0;
    virtual void stop() = 0;
    virtual void seek(int position) = 0;
    virtual int getDuration() const = 0;
    virtual int getCurrentPosition() const = 0;
    virtual bool isPlaying() const = 0;
};

// Interface for volume control
class IVolumeControl {
public:
    virtual ~IVolumeControl() = default;
    
    virtual void setVolume(int volume) = 0;
    virtual int getVolume() const = 0;
    virtual void mute() = 0;
    virtual void unmute() = 0;
    virtual bool isMuted() const = 0;
};

// Interface for playlist management
class IPlaylistManager {
public:
    virtual ~IPlaylistManager() = default;
    
    virtual void addTrack(const string& track) = 0;
    virtual void removeTrack(int index) = 0;
    virtual void nextTrack() = 0;
    virtual void previousTrack() = 0;
    virtual string getCurrentTrack() const = 0;
    virtual int getTrackCount() const = 0;
};

// Interface for equalizer functionality
class IEqualizer {
public:
    virtual ~IEqualizer() = default;
    
    virtual void setBass(int level) = 0;
    virtual void setTreble(int level) = 0;
    virtual void setPreset(const string& preset) = 0;
    virtual void resetToDefault() = 0;
};

// Concrete implementation - Audio Player
class AudioPlayer : public IMediaPlayer, public IVolumeControl, public IPlaylistManager {
private:
    vector<string> playlist;
    int currentTrack;
    int position;
    int duration;
    bool playing;
    int volume;
    bool muted;
    
public:
    AudioPlayer() : currentTrack(0), position(0), duration(0), 
                   playing(false), volume(50), muted(false) {}
    
    // IMediaPlayer implementation
    void play() override {
        if (!playlist.empty()) {
            playing = true;
            cout << "Playing: " << getCurrentTrack() << endl;
        } else {
            cout << "No tracks in playlist" << endl;
        }
    }
    
    void pause() override {
        playing = false;
        cout << "Playback paused" << endl;
    }
    
    void stop() override {
        playing = false;
        position = 0;
        cout << "Playback stopped" << endl;
    }
    
    void seek(int newPosition) override {
        position = max(0, min(newPosition, duration));
        cout << "Seeked to position: " << position << endl;
    }
    
    int getDuration() const override {
        return duration;
    }
    
    int getCurrentPosition() const override {
        return position;
    }
    
    bool isPlaying() const override {
        return playing;
    }
    
    // IVolumeControl implementation
    void setVolume(int newVolume) override {
        volume = max(0, min(newVolume, 100));
        cout << "Volume set to: " << volume << "%" << endl;
    }
    
    int getVolume() const override {
        return muted ? 0 : volume;
    }
    
    void mute() override {
        muted = true;
        cout << "Audio muted" << endl;
    }
    
    void unmute() override {
        muted = false;
        cout << "Audio unmuted" << endl;
    }
    
    bool isMuted() const override {
        return muted;
    }
    
    // IPlaylistManager implementation
    void addTrack(const string& track) override {
        playlist.push_back(track);
        cout << "Added track: " << track << endl;
        if (playlist.size() == 1) {
            duration = 180; // Default 3 minutes
        }
    }
    
    void removeTrack(int index) override {
        if (index >= 0 && index < playlist.size()) {
            cout << "Removed track: " << playlist[index] << endl;
            playlist.erase(playlist.begin() + index);
            if (currentTrack >= playlist.size() && !playlist.empty()) {
                currentTrack = playlist.size() - 1;
            }
        }
    }
    
    void nextTrack() override {
        if (!playlist.empty()) {
            currentTrack = (currentTrack + 1) % playlist.size();
            position = 0;
            cout << "Next track: " << getCurrentTrack() << endl;
        }
    }
    
    void previousTrack() override {
        if (!playlist.empty()) {
            currentTrack = (currentTrack - 1 + playlist.size()) % playlist.size();
            position = 0;
            cout << "Previous track: " << getCurrentTrack() << endl;
        }
    }
    
    string getCurrentTrack() const override {
        if (playlist.empty()) return "No track";
        return playlist[currentTrack];
    }
    
    int getTrackCount() const override {
        return playlist.size();
    }
};

// Advanced player with equalizer
class AdvancedAudioPlayer : public AudioPlayer, public IEqualizer {
private:
    int bassLevel;
    int trebleLevel;
    string currentPreset;
    
public:
    AdvancedAudioPlayer() : bassLevel(0), trebleLevel(0), currentPreset("Default") {}
    
    // IEqualizer implementation
    void setBass(int level) override {
        bassLevel = max(-10, min(level, 10));
        cout << "Bass level set to: " << bassLevel << endl;
    }
    
    void setTreble(int level) override {
        trebleLevel = max(-10, min(level, 10));
        cout << "Treble level set to: " << trebleLevel << endl;
    }
    
    void setPreset(const string& preset) override {
        currentPreset = preset;
        cout << "Equalizer preset set to: " << preset << endl;
        
        // Apply preset settings
        if (preset == "Rock") {
            setBass(5);
            setTreble(3);
        } else if (preset == "Classical") {
            setBass(-2);
            setTreble(2);
        } else if (preset == "Pop") {
            setBass(2);
            setTreble(1);
        }
    }
    
    void resetToDefault() override {
        bassLevel = 0;
        trebleLevel = 0;
        currentPreset = "Default";
        cout << "Equalizer reset to default" << endl;
    }
};

// Interface-based factory
class MediaPlayerFactory {
public:
    static unique_ptr<IMediaPlayer> createBasicPlayer() {
        return make_unique<AudioPlayer>();
    }
    
    static unique_ptr<IMediaPlayer> createAdvancedPlayer() {
        return make_unique<AdvancedAudioPlayer>();
    }
};

// Usage example
int main() {
    // Create players using interfaces
    auto basicPlayer = MediaPlayerFactory::createBasicPlayer();
    auto advancedPlayer = MediaPlayerFactory::createAdvancedPlayer();
    
    // Use basic player through interface
    auto volumeControl = dynamic_cast<IVolumeControl*>(basicPlayer.get());
    auto playlistManager = dynamic_cast<IPlaylistManager*>(basicPlayer.get());
    
    if (playlistManager) {
        playlistManager->addTrack("Song 1.mp3");
        playlistManager->addTrack("Song 2.mp3");
        playlistManager->addTrack("Song 3.mp3");
    }
    
    if (volumeControl) {
        volumeControl->setVolume(75);
    }
    
    basicPlayer->play();
    basicPlayer->seek(30);
    
    // Use advanced player with equalizer
    auto equalizer = dynamic_cast<IEqualizer*>(advancedPlayer.get());
    if (equalizer) {
        equalizer->setPreset("Rock");
    }
    
    return 0;
}`}
                </pre>
              </div>
            </div>
          </section>

          {/* Interface vs Abstract Class */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-yellow-400 rounded-full mr-3"></span>
              Interface vs Abstract Class
            </h2>
            <div className="space-y-6">
              <div className="overflow-x-auto">
                <table className="w-full bg-gray-900/70 border border-gray-600/50 rounded-lg">
                  <thead className="bg-gray-800/80">
                    <tr>
                      <th className="p-4 text-left text-gray-200">Aspect</th>
                      <th className="p-4 text-left text-gray-200">Interface</th>
                      <th className="p-4 text-left text-gray-200">Abstract Class</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-t border-gray-600/50">
                      <td className="p-4 font-semibold text-yellow-400">Implementation</td>
                      <td className="p-4">No implementation (pure abstraction)</td>
                      <td className="p-4">Can have partial implementation</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-4 font-semibold text-yellow-400">Multiple Inheritance</td>
                      <td className="p-4">Class can implement multiple interfaces</td>
                      <td className="p-4">Class can extend only one abstract class</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-4 font-semibold text-yellow-400">Variables</td>
                      <td className="p-4">Only constants (public static final)</td>
                      <td className="p-4">Can have instance variables</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-4 font-semibold text-yellow-400">Constructors</td>
                      <td className="p-4">Cannot have constructors</td>
                      <td className="p-4">Can have constructors</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-4 font-semibold text-yellow-400">Access Modifiers</td>
                      <td className="p-4">Methods are public by default</td>
                      <td className="p-4">Can have any access modifier</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-4 font-semibold text-yellow-400">Use Case</td>
                      <td className="p-4">Define contracts, achieve multiple inheritance</td>
                      <td className="p-4">Share code among related classes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Interface Design Patterns */}
          <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-red-400 mb-6 flex items-center">
              <span className="w-2 h-8 bg-red-400 rounded-full mr-3"></span>
              Interface Design Patterns
            </h2>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-red-300">Strategy Pattern</h3>
                  <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                    <pre className="text-green-400 text-sm overflow-x-auto">
{`// Java Strategy Pattern with Interfaces
interface SortingStrategy {
    void sort(int[] array);
}

class BubbleSort implements SortingStrategy {
    public void sort(int[] array) {
        // Bubble sort implementation
        System.out.println("Sorting using Bubble Sort");
    }
}

class QuickSort implements SortingStrategy {
    public void sort(int[] array) {
        // Quick sort implementation
        System.out.println("Sorting using Quick Sort");
    }
}

class SortContext {
    private SortingStrategy strategy;
    
    public void setStrategy(SortingStrategy strategy) {
        this.strategy = strategy;
    }
    
    public void performSort(int[] array) {
        strategy.sort(array);
    }
}`}
                    </pre>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-red-300">Observer Pattern</h3>
                  <div className="bg-gray-900/70 border border-gray-600/50 rounded-lg p-4">
                    <pre className="text-green-400 text-sm overflow-x-auto">
{`// C++ Observer Pattern with Interfaces
class IObserver {
public:
    virtual ~IObserver() = default;
    virtual void update(const string& message) = 0;
};

class ISubject {
public:
    virtual ~ISubject() = default;
    virtual void attach(IObserver* observer) = 0;
    virtual void detach(IObserver* observer) = 0;
    virtual void notify() = 0;
};

class EmailNotifier : public IObserver {
public:
    void update(const string& message) override {
        cout << "Email: " << message << endl;
    }
};

class NewsPublisher : public ISubject {
private:
    vector<IObserver*> observers;
    string news;
    
public:
    void attach(IObserver* observer) override {
        observers.push_back(observer);
    }
    
    void notify() override {
        for (auto observer : observers) {
            observer->update(news);
        }
    }
};`}
                    </pre>
                  </div>
                </div>
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
                    <span>Keep interfaces small and focused (ISP)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Use interfaces for "can-do" relationships</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Program to interfaces, not implementations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Use meaningful and descriptive names</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Document interface contracts clearly</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-orange-300">Common Pitfalls</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Don't create overly complex interfaces</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Don't add methods to existing interfaces carelessly</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Don't use interfaces for data-only structures</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Don't implement too many interfaces in one class</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Don't forget virtual destructors in C++</span>
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

export default Interfaces;
