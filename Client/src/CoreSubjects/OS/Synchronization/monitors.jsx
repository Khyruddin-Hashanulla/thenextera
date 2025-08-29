import React from 'react';

const Monitors = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Monitors</h1>
        <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
          A monitor is a high-level synchronization construct that provides mutual exclusion and condition synchronization in a structured way.
        </p>
      </div>

      <div className="space-y-6 sm:space-y-8">
        {/* Monitor Concept */}
        <section className="bg-gray-800/50 p-4 sm:p-6 rounded-lg border-l-4 border-cyan-400">
          <h2 className="text-xl sm:text-2xl font-semibold text-cyan-400 mb-3 sm:mb-4">Monitor Concept</h2>
          <div className="space-y-3 sm:space-y-4">
            <p className="text-gray-300 text-sm sm:text-base">
              A monitor is a programming language construct that encapsulates:
            </p>
            <div className="bg-gray-700/50 p-3 sm:p-4 rounded">
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-xs sm:text-sm">
                <li><strong>Shared data:</strong> Variables accessible by multiple processes</li>
                <li><strong>Procedures:</strong> Operations that can be performed on shared data</li>
                <li><strong>Initialization code:</strong> Code executed when monitor is created</li>
                <li><strong>Mutual exclusion:</strong> Only one process can be active in monitor at a time</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Monitor Structure */}
        <section className="bg-gray-800/50 p-4 sm:p-6 rounded-lg border-l-4 border-purple-400">
          <h2 className="text-xl sm:text-2xl font-semibold text-purple-400 mb-3 sm:mb-4">Monitor Structure</h2>
          <div className="bg-gray-900 text-green-400 p-3 sm:p-4 rounded font-mono text-xs sm:text-sm overflow-x-auto">
            <pre className="whitespace-pre">
{`monitor MonitorName {
    // Shared data declarations
    int count = 0;
    condition full, empty;
    
    // Monitor procedures
    procedure insert(item) {
        if (buffer is full)
            wait(full);
        // insert item into buffer
        signal(empty);
    }
    
    procedure remove() {
        if (buffer is empty)
            wait(empty);
        // remove item from buffer
        signal(full);
    }
    
    // Initialization code
    {
        // Initialize shared data
    }
}`}
            </pre>
          </div>
        </section>

        {/* Condition Variables */}
        <section className="bg-gray-800/50 p-4 sm:p-6 rounded-lg border-l-4 border-orange-400">
          <h2 className="text-xl sm:text-2xl font-semibold text-orange-400 mb-3 sm:mb-4">Condition Variables</h2>
          <div className="space-y-3 sm:space-y-4">
            <p className="text-gray-300 text-sm sm:text-base">
              Condition variables allow processes to wait for certain conditions to become true:
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-gray-700/50 p-3 sm:p-4 rounded border-l-2 border-orange-400">
                <h4 className="font-semibold text-orange-300 mb-2 text-sm sm:text-base">wait(condition)</h4>
                <p className="text-gray-300 text-xs sm:text-sm">
                  Process waits until condition becomes true. Process is blocked and releases monitor lock.
                </p>
              </div>
              
              <div className="bg-gray-700/50 p-3 sm:p-4 rounded border-l-2 border-orange-400">
                <h4 className="font-semibold text-orange-300 mb-2 text-sm sm:text-base">signal(condition)</h4>
                <p className="text-gray-300 text-xs sm:text-sm">
                  Wakes up one process waiting on the condition. If no process is waiting, signal is lost.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Signal Semantics */}
        <section className="bg-gray-800/50 p-4 sm:p-6 rounded-lg border-l-4 border-indigo-400">
          <h2 className="text-xl sm:text-2xl font-semibold text-indigo-400 mb-3 sm:mb-4">Signal Semantics</h2>
          <div className="space-y-3 sm:space-y-4">
            <p className="text-gray-300 text-sm sm:text-base">
              Two main approaches for handling signal operations:
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-gray-700/50 p-3 sm:p-4 rounded">
                <h4 className="font-semibold text-indigo-300 mb-2 text-sm sm:text-base">Signal and Wait (Hoare)</h4>
                <ul className="list-disc list-inside text-gray-300 text-xs sm:text-sm space-y-1">
                  <li>Signaling process immediately blocks</li>
                  <li>Signaled process runs immediately</li>
                  <li>When signaled process exits/waits, signaling process resumes</li>
                  <li>More precise but complex implementation</li>
                </ul>
              </div>
              
              <div className="bg-gray-700/50 p-3 sm:p-4 rounded">
                <h4 className="font-semibold text-indigo-300 mb-2 text-sm sm:text-base">Signal and Continue (Mesa)</h4>
                <ul className="list-disc list-inside text-gray-300 text-xs sm:text-sm space-y-1">
                  <li>Signaling process continues execution</li>
                  <li>Signaled process waits until signaler exits monitor</li>
                  <li>Condition may change before signaled process runs</li>
                  <li>Requires while loops instead of if statements</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Producer-Consumer Example */}
        <section className="bg-gray-800/50 p-4 sm:p-6 rounded-lg border-l-4 border-green-400">
          <h2 className="text-xl sm:text-2xl font-semibold text-green-400 mb-3 sm:mb-4">Producer-Consumer with Monitor</h2>
          <div className="bg-gray-900 text-green-400 p-3 sm:p-4 rounded font-mono text-xs sm:text-sm overflow-x-auto">
            <pre className="whitespace-pre">
{`monitor ProducerConsumer {
    int buffer[N];
    int count = 0, in = 0, out = 0;
    condition notFull, notEmpty;
    
    procedure produce(item) {
        while (count == N)
            wait(notFull);
        
        buffer[in] = item;
        in = (in + 1) % N;
        count++;
        
        signal(notEmpty);
    }
    
    procedure consume() {
        while (count == 0)
            wait(notEmpty);
        
        item = buffer[out];
        out = (out + 1) % N;
        count--;
        
        signal(notFull);
        return item;
    }
}`}
            </pre>
          </div>
        </section>

        {/* Advantages and Disadvantages */}
        <section className="bg-gray-800/50 p-4 sm:p-6 rounded-lg border-l-4 border-yellow-400">
          <h2 className="text-xl sm:text-2xl font-semibold text-yellow-400 mb-3 sm:mb-4">Advantages & Disadvantages</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-gray-700/50 p-3 sm:p-4 rounded">
              <h3 className="font-semibold text-green-400 mb-2 text-sm sm:text-base">Advantages</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-300 text-xs sm:text-sm">
                <li>Higher level of abstraction than semaphores</li>
                <li>Automatic mutual exclusion</li>
                <li>Structured approach to synchronization</li>
                <li>Easier to verify correctness</li>
                <li>Reduces programming errors</li>
              </ul>
            </div>
            <div className="bg-gray-700/50 p-3 sm:p-4 rounded">
              <h3 className="font-semibold text-red-400 mb-2 text-sm sm:text-base">Disadvantages</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-300 text-xs sm:text-sm">
                <li>Language support required</li>
                <li>May have performance overhead</li>
                <li>Limited flexibility compared to semaphores</li>
                <li>Signal semantics can be confusing</li>
                <li>Not suitable for distributed systems</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Implementation Notes */}
        <section className="bg-gray-800/50 p-4 sm:p-6 rounded-lg border-l-4 border-pink-400">
          <h2 className="text-xl sm:text-2xl font-semibold text-pink-400 mb-3 sm:mb-4">Implementation Notes</h2>
          <div className="space-y-3 sm:space-y-4">
            <div className="bg-gray-700/50 p-3 sm:p-4 rounded">
              <h4 className="font-semibold text-pink-300 mb-2 text-sm sm:text-base">Monitor Implementation</h4>
              <ul className="list-disc list-inside text-gray-300 text-xs sm:text-sm space-y-1">
                <li>Compiler generates entry/exit code for mutual exclusion</li>
                <li>Condition variables implemented as queues</li>
                <li>wait() releases monitor lock and blocks process</li>
                <li>signal() moves process from condition queue to ready queue</li>
              </ul>
            </div>
            
            <div className="bg-gray-700/50 p-3 sm:p-4 rounded">
              <h4 className="font-semibold text-pink-300 mb-2 text-sm sm:text-base">Programming Guidelines</h4>
              <ul className="list-disc list-inside text-gray-300 text-xs sm:text-sm space-y-1">
                <li>Use while loops with wait() (not if statements)</li>
                <li>Signal only when condition actually changes</li>
                <li>Keep monitor procedures short and simple</li>
                <li>Avoid nested monitor calls to prevent deadlock</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Monitors;
