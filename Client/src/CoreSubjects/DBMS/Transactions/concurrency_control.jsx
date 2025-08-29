import React from 'react';

const ConcurrencyControlSubtopic = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Concurrency Control</h1>
        <p className="text-lg text-gray-300 leading-relaxed">
          Learn how databases manage concurrent transactions to maintain data consistency and prevent conflicts.
        </p>
      </div>

      <div className="space-y-8">
        {/* Concurrency Problems */}
        <section>
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Concurrency Problems</h2>
          <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              When multiple transactions execute concurrently, several problems can occur if not properly controlled:
            </p>
            
            <div className="space-y-4">
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-red-500">
                <h4 className="font-semibold text-red-400 mb-2">1. Dirty Read Problem</h4>
                <p className="text-gray-300 mb-3">
                  A transaction reads data that has been modified by another uncommitted transaction.
                </p>
                <div className="bg-gray-700/50 p-3 rounded">
                  <strong className="text-white">Example:</strong>
                  <div className="text-sm mt-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <strong className="text-cyan-400">Transaction T1:</strong>
                        <ol className="list-decimal list-inside mt-1 text-gray-300">
                          <li>Read balance = $1000</li>
                          <li>Update balance = $1500</li>
                          <li>ROLLBACK</li>
                        </ol>
                      </div>
                      <div>
                        <strong className="text-cyan-400">Transaction T2:</strong>
                        <ol className="list-decimal list-inside mt-1 text-gray-300">
                          <li>Read balance = $1500 (dirty read!)</li>
                          <li>Process based on wrong value</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-red-500">
                <h4 className="font-semibold text-red-400 mb-2">2. Lost Update Problem</h4>
                <p className="text-gray-300 mb-3">
                  Two transactions read the same data and both modify it, causing one update to be lost.
                </p>
                <div className="bg-gray-700/50 p-3 rounded">
                  <strong className="text-white">Example:</strong>
                  <div className="text-sm mt-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <strong className="text-cyan-400">Transaction T1:</strong>
                        <ol className="list-decimal list-inside mt-1 text-gray-300">
                          <li>Read X = 100</li>
                          <li>X = X + 50</li>
                          <li>Write X = 150</li>
                        </ol>
                      </div>
                      <div>
                        <strong className="text-cyan-400">Transaction T2:</strong>
                        <ol className="list-decimal list-inside mt-1 text-gray-300">
                          <li>Read X = 100</li>
                          <li>X = X + 30</li>
                          <li>Write X = 130 (T1's update lost!)</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-red-500">
                <h4 className="font-semibold text-red-400 mb-2">3. Non-Repeatable Read</h4>
                <p className="text-gray-300 mb-3">
                  A transaction reads the same data twice and gets different values due to another transaction's modification.
                </p>
                <div className="bg-gray-700/50 p-3 rounded">
                  <strong className="text-white">Example:</strong>
                  <div className="text-sm mt-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <strong className="text-cyan-400">Transaction T1:</strong>
                        <ol className="list-decimal list-inside mt-1 text-gray-300">
                          <li>Read balance = $1000</li>
                          <li>... (other operations)</li>
                          <li>Read balance = $500 (different!)</li>
                        </ol>
                      </div>
                      <div>
                        <strong className="text-cyan-400">Transaction T2:</strong>
                        <ol className="list-decimal list-inside mt-1 text-gray-300">
                          <li>Update balance = $500</li>
                          <li>COMMIT</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-red-500">
                <h4 className="font-semibold text-red-400 mb-2">4. Phantom Read</h4>
                <p className="text-gray-300 mb-3">
                  A transaction re-executes a query and finds additional rows that satisfy the condition.
                </p>
                <div className="bg-gray-700/50 p-3 rounded">
                  <strong className="text-white">Example:</strong>
                  <div className="text-sm mt-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <strong className="text-cyan-400">Transaction T1:</strong>
                        <ol className="list-decimal list-inside mt-1 text-gray-300">
                          <li>SELECT COUNT(*) WHERE age &gt; 25 → 10</li>
                          <li>... (other operations)</li>
                          <li>SELECT COUNT(*) WHERE age &gt; 25 → 11</li>
                        </ol>
                      </div>
                      <div>
                        <strong className="text-cyan-400">Transaction T2:</strong>
                        <ol className="list-decimal list-inside mt-1 text-gray-300">
                          <li>INSERT new record with age = 30</li>
                          <li>COMMIT</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Locking Mechanisms */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">Locking Mechanisms</h2>
          <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              <strong className="text-white">Locks</strong> are the primary mechanism for controlling concurrent access to data items.
            </p>
            
            <div className="space-y-4">
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-400 mb-2">Types of Locks:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-700/50 p-3 rounded">
                    <h5 className="font-semibold text-gray-300 mb-2">Shared Lock (S-Lock)</h5>
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                      <li>Also called Read Lock</li>
                      <li>Multiple transactions can hold S-locks on same item</li>
                      <li>Prevents write operations</li>
                      <li>Compatible with other S-locks</li>
                    </ul>
                  </div>
                  <div className="bg-gray-700/50 p-3 rounded">
                    <h5 className="font-semibold text-gray-300 mb-2">Exclusive Lock (X-Lock)</h5>
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                      <li>Also called Write Lock</li>
                      <li>Only one transaction can hold X-lock</li>
                      <li>Prevents both read and write operations</li>
                      <li>Not compatible with any other locks</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-400 mb-2">Lock Compatibility Matrix:</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse border border-gray-600">
                    <thead className="bg-gray-700/50">
                      <tr>
                        <th className="border border-gray-600 p-2">Requested\Held</th>
                        <th className="border border-gray-600 p-2">None</th>
                        <th className="border border-gray-600 p-2">S-Lock</th>
                        <th className="border border-gray-600 p-2">X-Lock</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-600 p-2 font-semibold">S-Lock</td>
                        <td className="border border-gray-600 p-2 text-green-400">✓ Yes</td>
                        <td className="border border-gray-600 p-2 text-green-400">✓ Yes</td>
                        <td className="border border-gray-600 p-2 text-red-400">✗ No</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-600 p-2 font-semibold">X-Lock</td>
                        <td className="border border-gray-600 p-2 text-green-400">✓ Yes</td>
                        <td className="border border-gray-600 p-2 text-red-400">✗ No</td>
                        <td className="border border-gray-600 p-2 text-red-400">✗ No</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-400 mb-2">Two-Phase Locking (2PL) Protocol:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-700/50 p-3 rounded">
                    <h5 className="font-semibold text-gray-300 mb-2">Growing Phase</h5>
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                      <li>Transaction can acquire locks</li>
                      <li>Cannot release any locks</li>
                      <li>Lock point: when last lock is acquired</li>
                    </ul>
                  </div>
                  <div className="bg-gray-700/50 p-3 rounded">
                    <h5 className="font-semibold text-gray-300 mb-2">Shrinking Phase</h5>
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                      <li>Transaction can release locks</li>
                      <li>Cannot acquire new locks</li>
                      <li>Usually releases all locks at commit/abort</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Deadlock */}
        <section>
          <h2 className="text-2xl font-semibold text-yellow-400 mb-4">Deadlock Management</h2>
          <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              <strong className="text-white">Deadlock</strong> occurs when two or more transactions are waiting for each other to release locks, creating a circular wait condition.
            </p>
            
            <div className="space-y-4">
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-yellow-500">
                <h4 className="font-semibold text-yellow-400 mb-2">Deadlock Example:</h4>
                <div className="bg-gray-700/50 p-3 rounded">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong className="text-cyan-400">Transaction T1:</strong>
                      <ol className="list-decimal list-inside mt-1 text-gray-300">
                        <li>Lock(A) - acquired</li>
                        <li>Lock(B) - waiting for T2 to release</li>
                      </ol>
                    </div>
                    <div>
                      <strong className="text-cyan-400">Transaction T2:</strong>
                      <ol className="list-decimal list-inside mt-1 text-gray-300">
                        <li>Lock(B) - acquired</li>
                        <li>Lock(A) - waiting for T1 to release</li>
                      </ol>
                    </div>
                  </div>
                  <p className="text-red-400 font-semibold mt-2">Result: Circular wait → Deadlock!</p>
                </div>
              </div>

              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-yellow-500">
                <h4 className="font-semibold text-yellow-400 mb-2">Deadlock Prevention Strategies:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-700/50 p-3 rounded">
                    <h5 className="font-semibold text-gray-300 mb-2">Wait-Die Scheme</h5>
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                      <li>Older transaction waits for younger</li>
                      <li>Younger transaction dies (aborts)</li>
                      <li>Non-preemptive approach</li>
                    </ul>
                  </div>
                  <div className="bg-gray-700/50 p-3 rounded">
                    <h5 className="font-semibold text-gray-300 mb-2">Wound-Wait Scheme</h5>
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                      <li>Older transaction wounds (aborts) younger</li>
                      <li>Younger transaction waits for older</li>
                      <li>Preemptive approach</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-yellow-500">
                <h4 className="font-semibold text-yellow-400 mb-2">Deadlock Detection & Recovery:</h4>
                <div className="space-y-3">
                  <div className="bg-gray-700/50 p-3 rounded">
                    <h5 className="font-semibold text-gray-300 mb-2">Wait-For Graph</h5>
                    <p className="text-gray-300 text-sm">
                      Create a directed graph where nodes are transactions and edges represent wait relationships. 
                      A cycle in the graph indicates deadlock.
                    </p>
                  </div>
                  <div className="bg-gray-700/50 p-3 rounded">
                    <h5 className="font-semibold text-gray-300 mb-2">Victim Selection</h5>
                    <p className="text-gray-300 text-sm">
                      Choose which transaction to abort based on factors like: transaction cost, 
                      number of locks held, progress made, or transaction priority.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Isolation Levels */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">Transaction Isolation Levels</h2>
          <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              <strong className="text-white">Isolation levels</strong> define the degree to which transactions are isolated from each other's effects.
            </p>
            
            <div className="space-y-4">
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-purple-500">
                <h4 className="font-semibold text-purple-400 mb-2">Isolation Levels (Strictest to Most Permissive):</h4>
                <div className="space-y-3">
                  <div className="bg-gray-700/50 p-3 rounded">
                    <h5 className="font-semibold text-gray-300 mb-1">1. SERIALIZABLE</h5>
                    <p className="text-gray-300 text-sm">
                      Highest isolation level. Prevents all concurrency problems. 
                      Transactions appear to execute serially.
                    </p>
                  </div>
                  <div className="bg-gray-700/50 p-3 rounded">
                    <h5 className="font-semibold text-gray-300 mb-1">2. REPEATABLE READ</h5>
                    <p className="text-gray-300 text-sm">
                      Prevents dirty reads and non-repeatable reads. 
                      Phantom reads may still occur.
                    </p>
                  </div>
                  <div className="bg-gray-700/50 p-3 rounded">
                    <h5 className="font-semibold text-gray-300 mb-1">3. READ COMMITTED</h5>
                    <p className="text-gray-300 text-sm">
                      Prevents dirty reads only. Non-repeatable reads and phantom reads may occur.
                    </p>
                  </div>
                  <div className="bg-gray-700/50 p-3 rounded">
                    <h5 className="font-semibold text-gray-300 mb-1">4. READ UNCOMMITTED</h5>
                    <p className="text-gray-300 text-sm">
                      Lowest isolation level. All concurrency problems may occur. 
                      Allows dirty reads.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-purple-500">
                <h4 className="font-semibold text-purple-400 mb-2">Isolation Level Comparison:</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse border border-gray-600">
                    <thead className="bg-gray-700/50">
                      <tr>
                        <th className="border border-gray-600 p-2">Isolation Level</th>
                        <th className="border border-gray-600 p-2">Dirty Read</th>
                        <th className="border border-gray-600 p-2">Non-Repeatable Read</th>
                        <th className="border border-gray-600 p-2">Phantom Read</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-600 p-2 font-semibold">READ UNCOMMITTED</td>
                        <td className="border border-gray-600 p-2 text-red-400">Possible</td>
                        <td className="border border-gray-600 p-2 text-red-400">Possible</td>
                        <td className="border border-gray-600 p-2 text-red-400">Possible</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-600 p-2 font-semibold">READ COMMITTED</td>
                        <td className="border border-gray-600 p-2 text-green-400">Prevented</td>
                        <td className="border border-gray-600 p-2 text-red-400">Possible</td>
                        <td className="border border-gray-600 p-2 text-red-400">Possible</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-600 p-2 font-semibold">REPEATABLE READ</td>
                        <td className="border border-gray-600 p-2 text-green-400">Prevented</td>
                        <td className="border border-gray-600 p-2 text-green-400">Prevented</td>
                        <td className="border border-gray-600 p-2 text-red-400">Possible</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-600 p-2 font-semibold">SERIALIZABLE</td>
                        <td className="border border-gray-600 p-2 text-green-400">Prevented</td>
                        <td className="border border-gray-600 p-2 text-green-400">Prevented</td>
                        <td className="border border-gray-600 p-2 text-green-400">Prevented</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timestamp Ordering */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">Timestamp Ordering</h2>
          <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              <strong className="text-white">Timestamp Ordering</strong> is a lock-free concurrency control method that uses transaction timestamps to determine execution order.
            </p>
            
            <div className="space-y-4">
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-green-500">
                <h4 className="font-semibold text-green-400 mb-2">Basic Timestamp Protocol:</h4>
                <div className="space-y-3">
                  <div className="bg-gray-700/50 p-3 rounded">
                    <h5 className="font-semibold text-gray-300 mb-2">Read Rule:</h5>
                    <p className="text-gray-300 text-sm">
                      If TS(Ti) &lt; W-timestamp(X), then reject read operation and rollback Ti.
                      Otherwise, allow read and set R-timestamp(X) = max(R-timestamp(X), TS(Ti)).
                    </p>
                  </div>
                  <div className="bg-gray-700/50 p-3 rounded">
                    <h5 className="font-semibold text-gray-300 mb-2">Write Rule:</h5>
                    <p className="text-gray-300 text-sm">
                      If TS(Ti) &lt; R-timestamp(X) or TS(Ti) &lt; W-timestamp(X), then reject write and rollback Ti.
                      Otherwise, allow write and set W-timestamp(X) = TS(Ti).
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-green-500">
                <h4 className="font-semibold text-green-400 mb-2">Advantages & Disadvantages:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-700/50 p-3 rounded">
                    <h5 className="font-semibold text-green-400 mb-2">✅ Advantages:</h5>
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                      <li>No deadlocks possible</li>
                      <li>No waiting for locks</li>
                      <li>Ensures serializability</li>
                    </ul>
                  </div>
                  <div className="bg-gray-700/50 p-3 rounded">
                    <h5 className="font-semibold text-red-400 mb-2">❌ Disadvantages:</h5>
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                      <li>High rollback rate</li>
                      <li>Starvation possible</li>
                      <li>Overhead of timestamps</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ConcurrencyControlSubtopic;
