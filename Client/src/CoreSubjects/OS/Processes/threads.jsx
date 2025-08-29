import React from 'react';

const ThreadsSubtopic = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Threads</h1>
        <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
          Understanding multithreading concepts, thread models, and their advantages over processes.
        </p>
      </div>

      <div className="space-y-6 sm:space-y-8">
        {/* Thread Overview */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-cyan-400 mb-3 sm:mb-4">What is a Thread?</h2>
          <div className="bg-gray-700/50 border border-gray-600 p-4 sm:p-6 rounded-lg">
            <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
              A <strong>thread</strong> is a lightweight sub-process, the smallest unit of processing that can be performed in an OS.
            </p>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="bg-gray-800/50 border border-gray-600 p-3 sm:p-4 rounded border-l-4 border-cyan-500">
                <h4 className="font-semibold text-cyan-300 mb-2 text-sm sm:text-base">Process vs Thread:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-gray-700/50 border border-gray-600 p-2 sm:p-3 rounded">
                    <h5 className="font-semibold text-white mb-2 text-xs sm:text-sm">Process</h5>
                    <ul className="list-disc list-inside text-gray-300 text-xs space-y-1">
                      <li>Heavy-weight</li>
                      <li>Separate memory space</li>
                      <li>Expensive context switching</li>
                      <li>Inter-process communication needed</li>
                      <li>Creation time: high</li>
                    </ul>
                  </div>
                  <div className="bg-gray-700/50 border border-gray-600 p-2 sm:p-3 rounded">
                    <h5 className="font-semibold text-white mb-2 text-xs sm:text-sm">Thread</h5>
                    <ul className="list-disc list-inside text-gray-300 text-xs space-y-1">
                      <li>Light-weight</li>
                      <li>Shared memory space</li>
                      <li>Fast context switching</li>
                      <li>Direct communication via shared memory</li>
                      <li>Creation time: low</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 border border-gray-600 p-3 sm:p-4 rounded border-l-4 border-cyan-500">
                <h4 className="font-semibold text-cyan-300 mb-2 text-sm sm:text-base">Thread Components:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                  <div>
                    <h5 className="font-semibold text-white mb-2">Each Thread Has:</h5>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      <li>Thread ID</li>
                      <li>Program counter</li>
                      <li>Register set</li>
                      <li>Stack space</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white mb-2">Threads Share:</h5>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      <li>Code section</li>
                      <li>Data section</li>
                      <li>Heap memory</li>
                      <li>Open files and signals</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Thread Models */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-purple-400 mb-3 sm:mb-4">Threading Models</h2>
          <div className="bg-gray-700/50 border border-gray-600 p-4 sm:p-6 rounded-lg">
            
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-gray-800/50 border border-gray-600 p-3 sm:p-4 rounded border-l-4 border-purple-500">
                <h4 className="font-semibold text-purple-300 mb-2 text-sm sm:text-base">Many-to-One Model</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <p className="text-gray-300 text-xs sm:text-sm mb-2">
                      Many user-level threads mapped to one kernel thread.
                    </p>
                    <div className="bg-gray-900 border border-gray-600 p-2 rounded">
                      <pre className="text-xs font-mono whitespace-pre text-green-400">
{`User Threads: T1 T2 T3 T4
            ↓
Kernel Thread:   K1`}
                      </pre>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-red-900/30 border border-red-700 p-2 rounded">
                      <h6 className="font-semibold text-red-300 text-xs">Disadvantages:</h6>
                      <ul className="list-disc list-inside text-red-200 text-xs space-y-1">
                        <li>No true parallelism</li>
                        <li>Blocking system call blocks all</li>
                      </ul>
                    </div>
                    <div className="bg-green-900/30 border border-green-700 p-2 rounded">
                      <h6 className="font-semibold text-green-300 text-xs">Advantages:</h6>
                      <ul className="list-disc list-inside text-green-200 text-xs space-y-1">
                        <li>Fast thread management</li>
                        <li>Portable</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 border border-gray-600 p-3 sm:p-4 rounded border-l-4 border-purple-500">
                <h4 className="font-semibold text-purple-300 mb-2 text-sm sm:text-base">One-to-One Model</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <p className="text-gray-300 text-xs sm:text-sm mb-2">
                      Each user thread mapped to one kernel thread.
                    </p>
                    <div className="bg-gray-900 border border-gray-600 p-2 rounded">
                      <pre className="text-xs font-mono whitespace-pre text-green-400">
{`User Threads: T1 T2 T3 T4
            ↓  ↓  ↓  ↓
Kernel Threads: K1 K2 K3 K4`}
                      </pre>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-green-900/30 border border-green-700 p-2 rounded">
                      <h6 className="font-semibold text-green-300 text-xs">Advantages:</h6>
                      <ul className="list-disc list-inside text-green-200 text-xs space-y-1">
                        <li>True parallelism</li>
                        <li>Non-blocking system calls</li>
                      </ul>
                    </div>
                    <div className="bg-red-900/30 border border-red-700 p-2 rounded">
                      <h6 className="font-semibold text-red-300 text-xs">Disadvantages:</h6>
                      <ul className="list-disc list-inside text-red-200 text-xs space-y-1">
                        <li>Overhead of kernel threads</li>
                        <li>Limited by system resources</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 border border-gray-600 p-3 sm:p-4 rounded border-l-4 border-purple-500">
                <h4 className="font-semibold text-purple-300 mb-2 text-sm sm:text-base">Many-to-Many Model</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <p className="text-gray-300 text-xs sm:text-sm mb-2">
                      Many user threads multiplexed to smaller or equal number of kernel threads.
                    </p>
                    <div className="bg-gray-900 border border-gray-600 p-2 rounded">
                      <pre className="text-xs font-mono whitespace-pre text-green-400">
{`User Threads: T1 T2 T3 T4 T5
            ↓     ↓     ↓
Kernel Threads:  K1   K2   K3`}
                      </pre>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-green-900/30 border border-green-700 p-2 rounded">
                      <h6 className="font-semibold text-green-300 text-xs">Advantages:</h6>
                      <ul className="list-disc list-inside text-green-200 text-xs space-y-1">
                        <li>Best of both worlds</li>
                        <li>Flexible scheduling</li>
                        <li>Good performance</li>
                      </ul>
                    </div>
                    <div className="bg-red-900/30 border border-red-700 p-2 rounded">
                      <h6 className="font-semibold text-red-300 text-xs">Disadvantages:</h6>
                      <ul className="list-disc list-inside text-red-200 text-xs space-y-1">
                        <li>Complex implementation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Thread Libraries */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-orange-400 mb-3 sm:mb-4">Thread Libraries</h2>
          <div className="bg-gray-700/50 border border-gray-600 p-4 sm:p-6 rounded-lg">
            
            <div className="space-y-3 sm:space-y-4">
              <div className="bg-gray-800/50 border border-gray-600 p-3 sm:p-4 rounded border-l-4 border-orange-500">
                <h4 className="font-semibold text-orange-300 mb-2 text-sm sm:text-base">POSIX Pthreads</h4>
                <p className="text-gray-300 text-xs sm:text-sm mb-2 sm:mb-3">
                  Standard API for thread creation and synchronization (Unix, Linux, macOS).
                </p>
                <div className="bg-gray-900 text-green-400 p-2 sm:p-3 rounded font-mono text-xs overflow-x-auto">
                  <pre className="whitespace-pre">
{`#include <pthread.h>

void* thread_function(void* arg) {
  // Thread code here
  return NULL;
}

int main() {
  pthread_t thread_id;
  pthread_create(&thread_id, NULL, thread_function, NULL);
  pthread_join(thread_id, NULL);
  return 0;
}`}
                  </pre>
                </div>
              </div>

              <div className="bg-gray-800/50 border border-gray-600 p-3 sm:p-4 rounded border-l-4 border-orange-500">
                <h4 className="font-semibold text-orange-300 mb-2 text-sm sm:text-base">Java Threads</h4>
                <p className="text-gray-300 text-xs sm:text-sm mb-2 sm:mb-3">
                  Built-in threading support with Thread class and Runnable interface.
                </p>
                <div className="bg-gray-900 text-green-400 p-2 sm:p-3 rounded font-mono text-xs overflow-x-auto">
                  <pre className="whitespace-pre">
{`class MyThread extends Thread {
  public void run() {
    // Thread code here
  }
}

// Usage
MyThread t = new MyThread();
t.start();
t.join();`}
                  </pre>
                </div>
              </div>

              <div className="bg-gray-800/50 border border-gray-600 p-3 sm:p-4 rounded border-l-4 border-orange-500">
                <h4 className="font-semibold text-orange-300 mb-2 text-sm sm:text-base">Windows Threads</h4>
                <p className="text-gray-300 text-xs sm:text-sm mb-2 sm:mb-3">
                  Win32 API for thread management.
                </p>
                <div className="bg-gray-900 text-green-400 p-2 sm:p-3 rounded font-mono text-xs overflow-x-auto">
                  <pre className="whitespace-pre">
{`DWORD WINAPI ThreadFunction(LPVOID lpParam) {
  // Thread code here
  return 0;
}

HANDLE hThread = CreateThread(NULL, 0, ThreadFunction, 
                              NULL, 0, NULL);
WaitForSingleObject(hThread, INFINITE);`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Multithreading Benefits */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-indigo-400 mb-3 sm:mb-4">Benefits of Multithreading</h2>
          <div className="bg-gray-700/50 border border-gray-600 p-4 sm:p-6 rounded-lg">
            
            <div className="space-y-3 sm:space-y-4">
              <div className="bg-gray-800/50 border border-gray-600 p-3 sm:p-4 rounded border-l-4 border-indigo-500">
                <h4 className="font-semibold text-indigo-300 mb-2 text-sm sm:text-base">Key Advantages:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2 sm:space-y-3">
                    <div className="bg-gray-700/50 border border-gray-600 p-2 sm:p-3 rounded">
                      <h5 className="font-semibold text-white mb-1 text-xs sm:text-sm">Responsiveness</h5>
                      <p className="text-gray-300 text-xs">UI remains responsive while background tasks run</p>
                    </div>
                    <div className="bg-gray-700/50 border border-gray-600 p-2 sm:p-3 rounded">
                      <h5 className="font-semibold text-white mb-1 text-xs sm:text-sm">Resource Sharing</h5>
                      <p className="text-gray-300 text-xs">Threads share memory and resources efficiently</p>
                    </div>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="bg-gray-700/50 border border-gray-600 p-2 sm:p-3 rounded">
                      <h5 className="font-semibold text-white mb-1 text-xs sm:text-sm">Economy</h5>
                      <p className="text-gray-300 text-xs">Less overhead than creating separate processes</p>
                    </div>
                    <div className="bg-gray-700/50 border border-gray-600 p-2 sm:p-3 rounded">
                      <h5 className="font-semibold text-white mb-1 text-xs sm:text-sm">Scalability</h5>
                      <p className="text-gray-300 text-xs">Utilize multiple processors effectively</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 border border-gray-600 p-3 sm:p-4 rounded border-l-4 border-indigo-500">
                <h4 className="font-semibold text-indigo-300 mb-2 text-sm sm:text-base">Use Cases:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                  <div className="bg-gray-700/50 border border-gray-600 p-2 rounded">
                    <h6 className="font-semibold text-white text-xs sm:text-sm">Web Servers</h6>
                    <p className="text-gray-300 text-xs">Handle multiple client requests</p>
                  </div>
                  <div className="bg-gray-700/50 border border-gray-600 p-2 rounded">
                    <h6 className="font-semibold text-white text-xs sm:text-sm">GUI Applications</h6>
                    <p className="text-gray-300 text-xs">Separate UI and background processing</p>
                  </div>
                  <div className="bg-gray-700/50 border border-gray-600 p-2 rounded">
                    <h6 className="font-semibold text-white text-xs sm:text-sm">Scientific Computing</h6>
                    <p className="text-gray-300 text-xs">Parallel processing of data</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Thread Synchronization Issues */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-red-400 mb-3 sm:mb-4">Thread Synchronization Issues</h2>
          <div className="bg-gray-700/50 border border-gray-600 p-4 sm:p-6 rounded-lg">
            <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
              Shared memory access requires careful synchronization to prevent data races.
            </p>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="bg-gray-800/50 border border-gray-600 p-3 sm:p-4 rounded border-l-4 border-red-500">
                <h4 className="font-semibold text-red-300 mb-2 text-sm sm:text-base">Common Problems:</h4>
                <div className="space-y-2 sm:space-y-3">
                  <div className="bg-gray-700/50 border border-gray-600 p-2 sm:p-3 rounded">
                    <h5 className="font-semibold text-white mb-1 text-xs sm:text-sm">Race Conditions</h5>
                    <p className="text-gray-300 text-xs">Multiple threads access shared data simultaneously</p>
                    <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs mt-2 overflow-x-auto">
                      <pre className="whitespace-pre">
{`// Thread 1: counter++
// Thread 2: counter++
// Expected: counter = 2, Actual: may be 1`}
                      </pre>
                    </div>
                  </div>
                  <div className="bg-gray-700/50 border border-gray-600 p-2 sm:p-3 rounded">
                    <h5 className="font-semibold text-white mb-1 text-xs sm:text-sm">Deadlock</h5>
                    <p className="text-gray-300 text-xs">Threads wait for each other indefinitely</p>
                  </div>
                  <div className="bg-gray-700/50 border border-gray-600 p-2 sm:p-3 rounded">
                    <h5 className="font-semibold text-white mb-1 text-xs sm:text-sm">Starvation</h5>
                    <p className="text-gray-300 text-xs">Thread never gets access to shared resource</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 border border-gray-600 p-3 sm:p-4 rounded border-l-4 border-red-500">
                <h4 className="font-semibold text-red-300 mb-2 text-sm sm:text-base">Synchronization Mechanisms:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <div className="bg-gray-700/50 border border-gray-600 p-2 rounded">
                      <h6 className="font-semibold text-white text-xs sm:text-sm">Mutex (Mutual Exclusion)</h6>
                      <p className="text-gray-300 text-xs">Lock mechanism for critical sections</p>
                    </div>
                    <div className="bg-gray-700/50 border border-gray-600 p-2 rounded">
                      <h6 className="font-semibold text-white text-xs sm:text-sm">Semaphores</h6>
                      <p className="text-gray-300 text-xs">Counting mechanism for resource access</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-gray-700/50 border border-gray-600 p-2 rounded">
                      <h6 className="font-semibold text-white text-xs sm:text-sm">Condition Variables</h6>
                      <p className="text-gray-300 text-xs">Wait for specific conditions</p>
                    </div>
                    <div className="bg-gray-700/50 border border-gray-600 p-2 rounded">
                      <h6 className="font-semibold text-white text-xs sm:text-sm">Atomic Operations</h6>
                      <p className="text-gray-300 text-xs">Indivisible operations on shared data</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Thread Pool */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-green-400 mb-3 sm:mb-4">Thread Pools</h2>
          <div className="bg-gray-700/50 border border-gray-600 p-4 sm:p-6 rounded-lg">
            <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
              <strong>Thread pools</strong> maintain a collection of worker threads to execute tasks efficiently.
            </p>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="bg-gray-800/50 border border-gray-600 p-3 sm:p-4 rounded border-l-4 border-green-500">
                <h4 className="font-semibold text-green-300 mb-2 text-sm sm:text-base">How Thread Pools Work:</h4>
                <div className="bg-gray-700/50 border border-gray-600 p-2 sm:p-3 rounded">
                  <div className="text-xs sm:text-sm space-y-2">
                    <p><strong>1.</strong> Create fixed number of threads at startup</p>
                    <p><strong>2.</strong> Threads wait in pool for tasks</p>
                    <p><strong>3.</strong> When task arrives, assign to available thread</p>
                    <p><strong>4.</strong> Thread executes task and returns to pool</p>
                    <p><strong>5.</strong> Reuse threads for multiple tasks</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 border border-gray-600 p-3 sm:p-4 rounded border-l-4 border-green-500">
                <h4 className="font-semibold text-green-300 mb-2 text-sm sm:text-base">Advantages:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <ul className="list-disc list-inside text-gray-300 text-xs sm:text-sm space-y-1">
                      <li>Reduced thread creation overhead</li>
                      <li>Better resource management</li>
                      <li>Improved performance</li>
                    </ul>
                  </div>
                  <div>
                    <ul className="list-disc list-inside text-gray-300 text-xs sm:text-sm space-y-1">
                      <li>Controlled concurrency level</li>
                      <li>Task queuing capability</li>
                      <li>Scalable architecture</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 border border-gray-600 p-3 sm:p-4 rounded border-l-4 border-green-500">
                <h4 className="font-semibold text-green-300 mb-2 text-sm sm:text-base">Implementation Example (Java):</h4>
                <div className="bg-gray-900 text-green-400 p-2 sm:p-3 rounded font-mono text-xs overflow-x-auto">
                  <pre className="whitespace-pre">
{`ExecutorService executor = Executors.newFixedThreadPool(4);

for (int i = 0; i < 10; i++) {
  executor.submit(() -> {
    // Task code here
    System.out.println("Task executed by " + 
                      Thread.currentThread().getName());
  });
}

executor.shutdown();`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ThreadsSubtopic;
