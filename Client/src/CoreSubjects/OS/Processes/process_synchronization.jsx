import React from 'react';

const ProcessSynchronizationSubtopic = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Process Synchronization</h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Learn synchronization mechanisms to coordinate concurrent processes and prevent race conditions.
        </p>
      </div>

      <div className="space-y-8">
        {/* Synchronization Overview */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Need for Synchronization</h2>
          <div className="bg-red-50 p-6 rounded-lg">
            <p className="text-gray-700 mb-4">
              When multiple processes access shared resources concurrently, synchronization prevents data inconsistency and race conditions.
            </p>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded border-l-4 border-red-500">
                <h4 className="font-semibold text-red-700 mb-2">Race Condition Example:</h4>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Process P1:</strong>
                      <ol className="list-decimal list-inside mt-1">
                        <li>Read counter = 5</li>
                        <li>counter = counter + 1</li>
                        <li>Write counter = 6</li>
                      </ol>
                    </div>
                    <div>
                      <strong>Process P2:</strong>
                      <ol className="list-decimal list-inside mt-1">
                        <li>Read counter = 5</li>
                        <li>counter = counter + 1</li>
                        <li>Write counter = 6</li>
                      </ol>
                    </div>
                  </div>
                  <p className="text-red-600 font-semibold mt-2">Expected: 7, Actual: 6 (Lost Update!)</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded border-l-4 border-red-500">
                <h4 className="font-semibold text-red-700 mb-2">Critical Section Problem:</h4>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-gray-700 text-sm mb-2">
                    <strong>Critical Section:</strong> Code segment where shared resources are accessed.
                  </p>
                  <div className="space-y-1 text-sm">
                    <p><strong>Entry Section:</strong> Request permission to enter critical section</p>
                    <p><strong>Critical Section:</strong> Access shared resources</p>
                    <p><strong>Exit Section:</strong> Release permission</p>
                    <p><strong>Remainder Section:</strong> Other code</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Semaphores */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Semaphores</h2>
          <div className="bg-blue-50 p-6 rounded-lg">
            <p className="text-gray-700 mb-4">
              <strong>Semaphores</strong> are synchronization primitives that control access to shared resources using counters.
            </p>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-700 mb-2">Semaphore Operations:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded">
                    <h5 className="font-semibold text-gray-800 mb-2">wait(S) / P(S)</h5>
                    <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs">
                      <pre className="whitespace-pre">
{`while (S <= 0);
S--;`}
                      </pre>
                    </div>
                    <p className="text-gray-700 text-sm mt-1">Decrements semaphore, blocks if S ≤ 0</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <h5 className="font-semibold text-gray-800 mb-2">signal(S) / V(S)</h5>
                    <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs">
                      S++;
                    </div>
                    <p className="text-gray-700 text-sm mt-1">Increments semaphore, wakes waiting process</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-700 mb-2">Types of Semaphores:</h4>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded">
                    <h5 className="font-semibold text-gray-800 mb-2">Binary Semaphore (Mutex)</h5>
                    <p className="text-gray-700 text-sm">Value: 0 or 1. Used for mutual exclusion.</p>
                    <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs mt-2">
                      wait(mutex);    // Enter critical section
                      {'\n'}
                      // Critical Section
                      {'\n'}
                      signal(mutex);  // Exit critical section
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <h5 className="font-semibold text-gray-800 mb-2">Counting Semaphore</h5>
                    <p className="text-gray-700 text-sm">Value: 0 to N. Controls access to N identical resources.</p>
                    <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs mt-2">
                      Semaphore resource_pool = 3;  // 3 printers available
                      {'\n'}
                      wait(resource_pool);  // Get a printer
                      {'\n'}
                      // Use printer
                      {'\n'}
                      signal(resource_pool); // Release printer
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Monitors */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Monitors</h2>
          <div className="bg-green-50 p-6 rounded-lg">
            <p className="text-gray-700 mb-4">
              <strong>Monitors</strong> are high-level synchronization constructs that encapsulate shared data and operations.
            </p>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded border-l-4 border-green-500">
                <h4 className="font-semibold text-green-700 mb-2">Monitor Structure:</h4>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm">
                  <pre>{`monitor MonitorName {
  // Shared variables
  condition x, y;

  procedure P1(...) {
    // Operations on shared data
  }

  procedure P2(...) {
    // Operations on shared data
  }

  initialization code
}`}</pre>
                </div>
              </div>

              <div className="bg-white p-4 rounded border-l-4 border-green-500">
                <h4 className="font-semibold text-green-700 mb-2">Condition Variables:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded">
                    <h5 className="font-semibold text-gray-800 mb-2">x.wait()</h5>
                    <p className="text-gray-700 text-sm">Suspend process until condition becomes true</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <h5 className="font-semibold text-gray-800 mb-2">x.signal()</h5>
                    <p className="text-gray-700 text-sm">Wake up one waiting process</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded border-l-4 border-green-500">
                <h4 className="font-semibold text-green-700 mb-2">Advantages:</h4>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                  <li>Automatic mutual exclusion</li>
                  <li>Structured programming approach</li>
                  <li>Compiler-enforced synchronization</li>
                  <li>Reduces programming errors</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Classical Problems */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Classical Synchronization Problems</h2>
          <div className="bg-purple-50 p-6 rounded-lg">
            
            <div className="space-y-6">
              <div className="bg-white p-4 rounded border-l-4 border-purple-500">
                <h4 className="font-semibold text-purple-700 mb-2">Producer-Consumer Problem</h4>
                <p className="text-gray-700 text-sm mb-3">
                  Producers generate data, consumers use data. Buffer has limited capacity.
                </p>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs">
                  Semaphore mutex = 1;     // Mutual exclusion
                  {'\n'}
                  Semaphore empty = n;     // Empty slots
                  {'\n'}
                  Semaphore full = 0;      // Full slots
                  {'\n'}
                  <br />
                  Producer:                Consumer:
                  {'\n'}
                  wait(empty);            wait(full);
                  {'\n'}
                  wait(mutex);            wait(mutex);
                  {'\n'}
                  // Add item             // Remove item
                  {'\n'}
                  signal(mutex);          signal(mutex);
                  {'\n'}
                  signal(full);           signal(empty);
                </div>
              </div>

              <div className="bg-white p-4 rounded border-l-4 border-purple-500">
                <h4 className="font-semibold text-purple-700 mb-2">Readers-Writers Problem</h4>
                <p className="text-gray-700 text-sm mb-3">
                  Multiple readers can access data simultaneously, but writers need exclusive access.
                </p>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs">
                  <pre>
                    {`
READER PROCESS          WRITER PROCESS
wait(mutex);            wait(wrt);
readcount++;            // Write data
if (readcount == 1)
  wait(wrt);
signal(mutex);
// Read data
wait(mutex);
readcount--;
if (readcount == 0)
  signal(wrt);
signal(mutex);
`}
                  </pre>
                </div>
              </div>

              <div className="bg-white p-4 rounded border-l-4 border-purple-500">
                <h4 className="font-semibold text-purple-700 mb-2">Dining Philosophers Problem</h4>
                <p className="text-gray-700 text-sm mb-3">
                  Five philosophers alternate between thinking and eating. Need two chopsticks to eat.
                </p>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-gray-700 text-sm mb-2"><strong>Problem:</strong> Deadlock if all pick up left chopstick simultaneously</p>
                  <p className="text-gray-700 text-sm"><strong>Solutions:</strong> Asymmetric solution, resource ordering, or limiting philosophers</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Deadlock */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Deadlock</h2>
          <div className="bg-yellow-50 p-6 rounded-lg">
            <p className="text-gray-700 mb-4">
              <strong>Deadlock</strong> occurs when processes wait indefinitely for resources held by each other.
            </p>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded border-l-4 border-yellow-500">
                <h4 className="font-semibold text-yellow-700 mb-2">Necessary Conditions (Coffman Conditions):</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="bg-gray-50 p-2 rounded">
                      <h5 className="font-semibold text-gray-800 text-sm">1. Mutual Exclusion</h5>
                      <p className="text-gray-700 text-xs">Resources cannot be shared</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <h5 className="font-semibold text-gray-800 text-sm">2. Hold and Wait</h5>
                      <p className="text-gray-700 text-xs">Process holds resources while waiting for others</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-gray-50 p-2 rounded">
                      <h5 className="font-semibold text-gray-800 text-sm">3. No Preemption</h5>
                      <p className="text-gray-700 text-xs">Resources cannot be forcibly taken</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <h5 className="font-semibold text-gray-800 text-sm">4. Circular Wait</h5>
                      <p className="text-gray-700 text-xs">Circular chain of waiting processes</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded border-l-4 border-yellow-500">
                <h4 className="font-semibold text-yellow-700 mb-2">Deadlock Handling Strategies:</h4>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded">
                    <h5 className="font-semibold text-gray-800 mb-1">Prevention</h5>
                    <p className="text-gray-700 text-sm">Eliminate one of the four necessary conditions</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <h5 className="font-semibold text-gray-800 mb-1">Avoidance</h5>
                    <p className="text-gray-700 text-sm">Use algorithms like Banker's algorithm to avoid unsafe states</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <h5 className="font-semibold text-gray-800 mb-1">Detection & Recovery</h5>
                    <p className="text-gray-700 text-sm">Allow deadlocks, detect them, and recover by process termination or resource preemption</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <h5 className="font-semibold text-gray-800 mb-1">Ignore</h5>
                    <p className="text-gray-700 text-sm">Assume deadlocks are rare (Ostrich algorithm)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Banker's Algorithm */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Banker's Algorithm</h2>
          <div className="bg-indigo-50 p-6 rounded-lg">
            <p className="text-gray-700 mb-4">
              <strong>Banker's Algorithm</strong> prevents deadlock by ensuring the system never enters an unsafe state.
            </p>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded border-l-4 border-indigo-500">
                <h4 className="font-semibold text-indigo-700 mb-2">Data Structures:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li><strong>Available:</strong> Available instances of each resource</li>
                      <li><strong>Max:</strong> Maximum demand of each process</li>
                      <li><strong>Allocation:</strong> Currently allocated resources</li>
                      <li><strong>Need:</strong> Remaining resource need (Max - Allocation)</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <h5 className="font-semibold text-gray-800 mb-2">Safety Algorithm:</h5>
                    <ol className="list-decimal list-inside text-gray-700 text-xs space-y-1">
                      <li>Find process with Need ≤ Available</li>
                      <li>Simulate completion, add to Available</li>
                      <li>Repeat until all processes complete</li>
                      <li>If successful, state is safe</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded border-l-4 border-indigo-500">
                <h4 className="font-semibold text-indigo-700 mb-2">Example:</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse border border-gray-300">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border border-gray-300 p-1">Process</th>
                        <th className="border border-gray-300 p-1">Allocation (A,B,C)</th>
                        <th className="border border-gray-300 p-1">Max (A,B,C)</th>
                        <th className="border border-gray-300 p-1">Need (A,B,C)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="border border-gray-300 p-1">P0</td><td className="border border-gray-300 p-1">(0,1,0)</td><td className="border border-gray-300 p-1">(7,5,3)</td><td className="border border-gray-300 p-1">(7,4,3)</td></tr>
                      <tr><td className="border border-gray-300 p-1">P1</td><td className="border border-gray-300 p-1">(2,0,0)</td><td className="border border-gray-300 p-1">(3,2,2)</td><td className="border border-gray-300 p-1">(1,2,2)</td></tr>
                      <tr><td className="border border-gray-300 p-1">P2</td><td className="border border-gray-300 p-1">(3,0,2)</td><td className="border border-gray-300 p-1">(9,0,2)</td><td className="border border-gray-300 p-1">(6,0,0)</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-600 mt-2">Available: (3,3,2). Safe sequence: P1 → P0 → P2</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProcessSynchronizationSubtopic;
