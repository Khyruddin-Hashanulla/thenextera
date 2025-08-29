import React from "react";

const Semaphores = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
          Semaphores
        </h1>
        <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
          A semaphore is a synchronization primitive that controls access to
          shared resources by multiple processes in a concurrent system.
        </p>
      </div>

      <div className="space-y-6 sm:space-y-8">
        {/* Basic Concept */}
        <section className="bg-gray-700/50 border border-gray-600 p-4 sm:p-6 rounded-lg border-l-4 border-cyan-500">
          <h2 className="text-xl sm:text-2xl font-semibold text-cyan-400 mb-3 sm:mb-4">
            Semaphore Basics
          </h2>
          <div className="space-y-3 sm:space-y-4">
            <p className="text-gray-300 text-sm sm:text-base">
              A semaphore S is an integer variable accessed through two atomic
              operations:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-gray-800/50 border border-gray-600 p-3 sm:p-4 rounded">
                <h4 className="font-semibold text-cyan-300 mb-2 text-sm sm:text-base">
                  wait(S) or P(S)
                </h4>
                <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs overflow-x-auto">
                  <pre className="whitespace-pre">
                    {`while (S <= 0)
    ; // busy wait
S--;`}
                  </pre>
                </div>
                <p className="text-gray-300 text-xs sm:text-sm mt-2">
                  Decrements semaphore, blocks if S ≤ 0
                </p>
              </div>

              <div className="bg-gray-800/50 border border-gray-600 p-3 sm:p-4 rounded">
                <h4 className="font-semibold text-cyan-300 mb-2 text-sm sm:text-base">
                  signal(S) or V(S)
                </h4>
                <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs overflow-x-auto">
                  <pre className="whitespace-pre">{`S++;`}</pre>
                </div>
                <p className="text-gray-300 text-xs sm:text-sm mt-2">
                  Increments semaphore, may wake waiting process
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Types of Semaphores */}
        <section className="bg-gray-700/50 border border-gray-600 p-4 sm:p-6 rounded-lg border-l-4 border-purple-500">
          <h2 className="text-xl sm:text-2xl font-semibold text-purple-400 mb-3 sm:mb-4">
            Types of Semaphores
          </h2>

          <div className="space-y-4 sm:space-y-6">
            <div className="bg-gray-800/50 border border-gray-600 p-3 sm:p-4 rounded border-l-2 border-purple-400">
              <h3 className="font-semibold text-purple-300 mb-2 sm:mb-3 text-sm sm:text-base">
                1. Binary Semaphore (Mutex)
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm mb-2 sm:mb-3">
                Value can be 0 or 1, used for mutual exclusion
              </p>

              <div className="bg-gray-900 text-green-400 p-2 sm:p-3 rounded font-mono text-xs overflow-x-auto">
                <pre className="whitespace-pre">
                  {`semaphore mutex = 1;  // Initialize to 1

// Critical Section Access
wait(mutex);
    // Critical Section
signal(mutex);`}
                </pre>
              </div>

              <div className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-400">
                <strong>Use cases:</strong> Protecting critical sections,
                ensuring mutual exclusion
              </div>
            </div>

            <div className="bg-gray-800/50 border border-gray-600 p-3 sm:p-4 rounded border-l-2 border-purple-400">
              <h3 className="font-semibold text-purple-300 mb-2 sm:mb-3 text-sm sm:text-base">
                2. Counting Semaphore
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm mb-2 sm:mb-3">
                Value can range over unrestricted domain, used for resource
                counting
              </p>

              <div className="bg-gray-900 text-green-400 p-2 sm:p-3 rounded font-mono text-xs overflow-x-auto">
                <pre className="whitespace-pre">
                  {`semaphore resource = 5;  // 5 available resources

// Resource Allocation
wait(resource);  // Acquire resource
    // Use resource
signal(resource);  // Release resource`}
                </pre>
              </div>

              <div className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-400">
                <strong>Use cases:</strong> Resource pools, buffer management,
                connection limits
              </div>
            </div>
          </div>
        </section>

        {/* Implementation */}
        <section className="bg-gray-700/50 border border-gray-600 p-4 sm:p-6 rounded-lg border-l-4 border-orange-500">
          <h2 className="text-xl sm:text-2xl font-semibold text-orange-400 mb-3 sm:mb-4">
            Semaphore Implementation
          </h2>

          <div className="space-y-3 sm:space-y-4">
            <div className="bg-gray-800/50 border border-gray-600 p-3 sm:p-4 rounded">
              <h4 className="font-semibold text-orange-300 mb-2 sm:mb-3 text-sm sm:text-base">
                Semaphore Structure
              </h4>
              <div className="bg-gray-900 text-green-400 p-2 sm:p-3 rounded font-mono text-xs overflow-x-auto">
                <pre className="whitespace-pre">
                  {`typedef struct {
    int value;
    struct process *list;  // Waiting queue
} semaphore;`}
                </pre>
              </div>
            </div>

            <div className="bg-gray-800/50 border border-gray-600 p-3 sm:p-4 rounded">
              <h4 className="font-semibold text-orange-300 mb-2 sm:mb-3 text-sm sm:text-base">
                wait() Implementation
              </h4>
              <div className="bg-gray-900 text-green-400 p-2 sm:p-3 rounded font-mono text-xs overflow-x-auto">
                <pre className="whitespace-pre">
                  {`wait(semaphore *S) {
    S->value--;
    if (S->value < 0) {
        // Add this process to S->list
        block();  // Block the process
    }
}`}
                </pre>
              </div>
            </div>

            <div className="bg-gray-800/50 border border-gray-600 p-3 sm:p-4 rounded">
              <h4 className="font-semibold text-orange-300 mb-2 sm:mb-3 text-sm sm:text-base">
                signal() Implementation
              </h4>
              <div className="bg-gray-900 text-green-400 p-2 sm:p-3 rounded font-mono text-xs overflow-x-auto">
                <pre className="whitespace-pre">
                  {`signal(semaphore *S) {
    S->value++;
    if (S->value <= 0) {
        // Remove process P from S->list
        wakeup(P);  // Wake up the process
    }
}`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Classic Problems */}
        <section className="bg-gray-700/50 border border-gray-600 p-4 sm:p-6 rounded-lg border-l-4 border-indigo-500">
          <h2 className="text-xl sm:text-2xl font-semibold text-indigo-400 mb-3 sm:mb-4">
            Classic Synchronization Problems
          </h2>

          <div className="space-y-4 sm:space-y-6">
            <div className="bg-gray-800/50 border border-gray-600 p-3 sm:p-4 rounded">
              <h4 className="font-semibold text-indigo-300 mb-2 sm:mb-3 text-sm sm:text-base">
                1. Producer-Consumer Problem
              </h4>
              <div className="bg-gray-900 text-green-400 p-2 sm:p-3 rounded font-mono text-xs overflow-x-auto">
                <pre className="whitespace-pre">
                  {`semaphore mutex = 1;     // Mutual exclusion
semaphore empty = n;     // Empty slots
semaphore full = 0;      // Full slots

// Producer
while (true) {
    // Produce item
    wait(empty);
    wait(mutex);
        // Add item to buffer
    signal(mutex);
    signal(full);
}

// Consumer
while (true) {
    wait(full);
    wait(mutex);
        // Remove item from buffer
    signal(mutex);
    signal(empty);
    // Consume item
}`}
                </pre>
              </div>
            </div>

            <div className="bg-gray-800/50 border border-gray-600 p-3 sm:p-4 rounded">
              <h4 className="font-semibold text-indigo-300 mb-2 sm:mb-3 text-sm sm:text-base">
                2. Readers-Writers Problem
              </h4>
              <div className="bg-gray-900 text-green-400 p-2 sm:p-3 rounded font-mono text-xs overflow-x-auto">
                <pre className="whitespace-pre">
                  {`semaphore rw_mutex = 1;    // Writer exclusion
semaphore mutex = 1;       // Reader count protection
int read_count = 0;

// Reader
wait(mutex);
read_count++;
if (read_count == 1)
    wait(rw_mutex);  // First reader locks writers
signal(mutex);

    // Reading...

wait(mutex);
read_count--;
if (read_count == 0)
    signal(rw_mutex);  // Last reader unlocks writers
signal(mutex);

// Writer
wait(rw_mutex);
    // Writing...
signal(rw_mutex);`}
                </pre>
              </div>
            </div>

            <div className="bg-gray-800/50 border border-gray-600 p-3 sm:p-4 rounded">
              <h4 className="font-semibold text-indigo-300 mb-2 sm:mb-3 text-sm sm:text-base">
                3. Dining Philosophers Problem
              </h4>
              <div className="bg-gray-900 text-green-400 p-2 sm:p-3 rounded font-mono text-xs overflow-x-auto">
                <pre className="whitespace-pre">
                  {`semaphore chopstick[5] = {1, 1, 1, 1, 1};

// Philosopher i
while (true) {
    // Think
    wait(chopstick[i]);
    wait(chopstick[(i + 1) % 5]);
        // Eat
    signal(chopstick[(i + 1) % 5]);
    signal(chopstick[i]);
}

// Note: This can cause deadlock!
// Better solution: Asymmetric approach or resource ordering`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* POSIX Semaphores */}
        <section className="bg-gray-700/50 border border-gray-600 p-4 sm:p-6 rounded-lg border-l-4 border-green-500">
          <h2 className="text-xl sm:text-2xl font-semibold text-green-400 mb-3 sm:mb-4">
            POSIX Semaphores
          </h2>

          <div className="space-y-3 sm:space-y-4">
            <div className="bg-gray-800/50 border border-gray-600 p-3 sm:p-4 rounded">
              <h4 className="font-semibold text-green-300 mb-2 sm:mb-3 text-sm sm:text-base">
                Named Semaphores
              </h4>
              <div className="bg-gray-900 text-green-400 p-2 sm:p-3 rounded font-mono text-xs overflow-x-auto">
                <pre className="whitespace-pre">
                  {`#include <semaphore.h>

// Create/open named semaphore
sem_t *sem = sem_open("/mysem", O_CREAT, 0644, 1);

// Wait (P operation)
sem_wait(sem);

// Signal (V operation)  
sem_post(sem);

// Close and unlink
sem_close(sem);
sem_unlink("/mysem");`}
                </pre>
              </div>
            </div>

            <div className="bg-gray-800/50 border border-gray-600 p-3 sm:p-4 rounded">
              <h4 className="font-semibold text-green-300 mb-2 sm:mb-3 text-sm sm:text-base">
                Unnamed Semaphores
              </h4>
              <div className="bg-gray-900 text-green-400 p-2 sm:p-3 rounded font-mono text-xs overflow-x-auto">
                <pre className="whitespace-pre">
                  {`sem_t sem;

// Initialize semaphore
sem_init(&sem, 0, 1);  // 0 = thread shared, 1 = initial value

// Use semaphore
sem_wait(&sem);
    // Critical section
sem_post(&sem);

// Destroy semaphore
sem_destroy(&sem);`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Advantages and Disadvantages */}
        <section className="bg-gray-700/50 border border-gray-600 p-4 sm:p-6 rounded-lg border-l-4 border-red-500">
          <h2 className="text-xl sm:text-2xl font-semibold text-red-400 mb-3 sm:mb-4">
            Advantages & Disadvantages
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-gray-800/50 border border-gray-600 p-3 sm:p-4 rounded">
              <h4 className="font-semibold text-green-300 mb-2 sm:mb-3 text-sm sm:text-base">
                ✅ Advantages
              </h4>
              <ul className="list-disc list-inside text-gray-300 text-xs sm:text-sm space-y-1">
                <li>Simple and flexible synchronization primitive</li>
                <li>Can solve various synchronization problems</li>
                <li>Efficient implementation possible</li>
                <li>Supports both mutual exclusion and resource counting</li>
                <li>No busy waiting in proper implementation</li>
              </ul>
            </div>

            <div className="bg-gray-800/50 border border-gray-600 p-3 sm:p-4 rounded">
              <h4 className="font-semibold text-red-300 mb-2 sm:mb-3 text-sm sm:text-base">
                ❌ Disadvantages
              </h4>
              <ul className="list-disc list-inside text-gray-300 text-xs sm:text-sm space-y-1">
                <li>Prone to programming errors (deadlock, starvation)</li>
                <li>Difficult to debug and test</li>
                <li>No protection against priority inversion</li>
                <li>Can lead to indefinite blocking</li>
                <li>Order of wait/signal calls is critical</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Semaphores;
