import React from 'react';

const Deadlocks = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Deadlocks</h1>
        <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
          A deadlock is a situation where a set of processes are blocked because each process is holding a resource and waiting for another resource acquired by some other process.
        </p>
      </div>

      <div className="space-y-6 sm:space-y-8">
        {/* Deadlock Conditions */}
        <section className="bg-gray-800/50 p-4 sm:p-6 rounded-lg border-l-4 border-red-400">
          <h2 className="text-xl sm:text-2xl font-semibold text-red-400 mb-3 sm:mb-4">Necessary Conditions for Deadlock</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-gray-700/50 p-3 sm:p-4 rounded shadow">
              <h3 className="font-semibold text-red-300 mb-2 text-sm sm:text-base">1. Mutual Exclusion</h3>
              <p className="text-gray-300 text-xs sm:text-sm">At least one resource must be held in a non-sharable mode</p>
            </div>
            <div className="bg-gray-700/50 p-3 sm:p-4 rounded shadow">
              <h3 className="font-semibold text-red-300 mb-2 text-sm sm:text-base">2. Hold and Wait</h3>
              <p className="text-gray-300 text-xs sm:text-sm">A process must be holding at least one resource and waiting for additional resources</p>
            </div>
            <div className="bg-gray-700/50 p-3 sm:p-4 rounded shadow">
              <h3 className="font-semibold text-red-300 mb-2 text-sm sm:text-base">3. No Preemption</h3>
              <p className="text-gray-300 text-xs sm:text-sm">Resources cannot be forcibly removed from processes</p>
            </div>
            <div className="bg-gray-700/50 p-3 sm:p-4 rounded shadow">
              <h3 className="font-semibold text-red-300 mb-2 text-sm sm:text-base">4. Circular Wait</h3>
              <p className="text-gray-300 text-xs sm:text-sm">A circular chain of processes exists where each waits for a resource held by the next</p>
            </div>
          </div>
        </section>

        {/* Resource Allocation Graph */}
        <section className="bg-gray-800/50 p-4 sm:p-6 rounded-lg border-l-4 border-cyan-400">
          <h2 className="text-xl sm:text-2xl font-semibold text-cyan-400 mb-3 sm:mb-4">Resource Allocation Graph</h2>
          <div className="space-y-3 sm:space-y-4">
            <p className="text-gray-300 text-sm sm:text-base">A directed graph used to describe deadlocks:</p>
            <div className="bg-gray-700/50 p-3 sm:p-4 rounded">
              <h4 className="font-semibold mb-2 text-sm sm:text-base text-cyan-300">Graph Components:</h4>
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-xs sm:text-sm">
                <li><strong>Process nodes:</strong> Represented by circles</li>
                <li><strong>Resource nodes:</strong> Represented by rectangles</li>
                <li><strong>Request edge:</strong> Process → Resource (waiting)</li>
                <li><strong>Assignment edge:</strong> Resource → Process (allocated)</li>
              </ul>
            </div>
            <div className="bg-gray-900 text-green-400 p-2 sm:p-3 rounded font-mono text-xs sm:text-sm overflow-x-auto">
              <pre className="whitespace-pre">
{`Example:
P1 → R1 (P1 requests R1)
R2 → P1 (R2 is allocated to P1)

Deadlock exists if cycle in graph with single instance resources`}
              </pre>
            </div>
          </div>
        </section>

        {/* Deadlock Prevention */}
        <section className="bg-gray-800/50 p-4 sm:p-6 rounded-lg border-l-4 border-green-400">
          <h2 className="text-xl sm:text-2xl font-semibold text-green-400 mb-3 sm:mb-4">Deadlock Prevention</h2>
          <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">Prevent deadlock by ensuring at least one necessary condition cannot hold:</p>
          
          <div className="space-y-3 sm:space-y-4">
            <div className="bg-gray-700/50 p-3 sm:p-4 rounded border-l-2 border-green-400">
              <h4 className="font-semibold text-green-300 mb-2 text-sm sm:text-base">1. Mutual Exclusion Prevention</h4>
              <p className="text-gray-300 text-xs sm:text-sm">Make resources sharable when possible (not always feasible)</p>
            </div>
            
            <div className="bg-gray-700/50 p-3 sm:p-4 rounded border-l-2 border-green-400">
              <h4 className="font-semibold text-green-300 mb-2 text-sm sm:text-base">2. Hold and Wait Prevention</h4>
              <p className="text-gray-300 text-xs sm:text-sm mb-2">Two approaches:</p>
              <ul className="list-disc list-inside text-gray-300 text-xs space-y-1">
                <li>Process must request all resources at once</li>
                <li>Process must release all resources before requesting new ones</li>
              </ul>
            </div>
            
            <div className="bg-gray-700/50 p-3 sm:p-4 rounded border-l-2 border-green-400">
              <h4 className="font-semibold text-green-300 mb-2 text-sm sm:text-base">3. No Preemption Prevention</h4>
              <p className="text-gray-300 text-xs sm:text-sm">Allow preemption of resources when process requests unavailable resource</p>
            </div>
            
            <div className="bg-gray-700/50 p-3 sm:p-4 rounded border-l-2 border-green-400">
              <h4 className="font-semibold text-green-300 mb-2 text-sm sm:text-base">4. Circular Wait Prevention</h4>
              <p className="text-gray-300 text-xs sm:text-sm">Impose total ordering on resource types - processes request in increasing order</p>
            </div>
          </div>
        </section>

        {/* Deadlock Avoidance */}
        <section className="bg-gray-800/50 p-4 sm:p-6 rounded-lg border-l-4 border-yellow-400">
          <h2 className="text-xl sm:text-2xl font-semibold text-yellow-400 mb-3 sm:mb-4">Deadlock Avoidance</h2>
          
          <div className="space-y-3 sm:space-y-4">
            <div className="bg-gray-700/50 p-3 sm:p-4 rounded">
              <h4 className="font-semibold text-yellow-300 mb-2 text-sm sm:text-base">Banker's Algorithm</h4>
              <p className="text-gray-300 text-xs sm:text-sm mb-3">
                Ensures system never enters unsafe state by checking if resource allocation leads to safe sequence
              </p>
              
              <div className="bg-gray-900 text-green-400 p-2 sm:p-3 rounded font-mono text-xs sm:text-sm overflow-x-auto">
                <pre className="whitespace-pre">
{`Algorithm Steps:
1. Check if request ≤ available resources
2. Temporarily allocate resources
3. Run safety algorithm to find safe sequence
4. If safe sequence exists, grant request
5. Otherwise, deny request and wait`}
                </pre>
              </div>
            </div>
            
            <div className="bg-gray-700/50 p-3 sm:p-4 rounded">
              <h4 className="font-semibold text-yellow-300 mb-2 text-sm sm:text-base">Safe State</h4>
              <p className="text-gray-300 text-xs sm:text-sm">
                System is in safe state if there exists a safe sequence of processes where each can complete with available + released resources
              </p>
            </div>
          </div>
        </section>

        {/* Deadlock Detection */}
        <section className="bg-gray-800/50 p-4 sm:p-6 rounded-lg border-l-4 border-purple-400">
          <h2 className="text-xl sm:text-2xl font-semibold text-purple-400 mb-3 sm:mb-4">Deadlock Detection</h2>
          
          <div className="space-y-3 sm:space-y-4">
            <div className="bg-gray-700/50 p-3 sm:p-4 rounded">
              <h4 className="font-semibold text-purple-300 mb-2 text-sm sm:text-base">Detection Algorithm</h4>
              <p className="text-gray-300 text-xs sm:text-sm mb-3">
                Periodically check for deadlock using resource allocation graph or wait-for graph
              </p>
              
              <div className="bg-gray-900 text-green-400 p-2 sm:p-3 rounded font-mono text-xs sm:text-sm overflow-x-auto">
                <pre className="whitespace-pre">
{`Wait-for Graph Algorithm:
1. Maintain wait-for graph (simplified RAG)
2. Periodically check for cycles
3. If cycle found, deadlock exists
4. Invoke recovery algorithm`}
                </pre>
              </div>
            </div>
            
            <div className="bg-gray-700/50 p-3 sm:p-4 rounded">
              <h4 className="font-semibold text-purple-300 mb-2 text-sm sm:text-base">Detection Frequency</h4>
              <ul className="list-disc list-inside text-gray-300 text-xs sm:text-sm space-y-1">
                <li>Every time resource request cannot be granted</li>
                <li>Periodically (e.g., every hour)</li>
                <li>When CPU utilization drops below threshold</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Deadlock Recovery */}
        <section className="bg-gray-800/50 p-4 sm:p-6 rounded-lg border-l-4 border-orange-400">
          <h2 className="text-xl sm:text-2xl font-semibold text-orange-400 mb-3 sm:mb-4">Deadlock Recovery</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-gray-700/50 p-3 sm:p-4 rounded">
              <h4 className="font-semibold text-orange-300 mb-2 text-sm sm:text-base">Process Termination</h4>
              <ul className="list-disc list-inside text-gray-300 text-xs sm:text-sm space-y-1">
                <li>Abort all deadlocked processes</li>
                <li>Abort one process at a time until cycle eliminated</li>
                <li>Choose victim based on priority, computation time, resources held</li>
              </ul>
            </div>
            
            <div className="bg-gray-700/50 p-3 sm:p-4 rounded">
              <h4 className="font-semibold text-orange-300 mb-2 text-sm sm:text-base">Resource Preemption</h4>
              <ul className="list-disc list-inside text-gray-300 text-xs sm:text-sm space-y-1">
                <li>Select victim process</li>
                <li>Rollback to safe state</li>
                <li>Restart process from checkpoint</li>
                <li>Ensure starvation doesn't occur</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Example Scenario */}
        <section className="bg-gray-800/50 p-4 sm:p-6 rounded-lg border-l-4 border-indigo-400">
          <h2 className="text-xl sm:text-2xl font-semibold text-indigo-400 mb-3 sm:mb-4">Example Deadlock Scenario</h2>
          
          <div className="bg-gray-700/50 p-3 sm:p-4 rounded">
            <h4 className="font-semibold mb-3 text-indigo-300 text-sm sm:text-base">Classic Dining Philosophers Problem</h4>
            <div className="bg-gray-900 text-green-400 p-2 sm:p-3 rounded font-mono text-xs sm:text-sm overflow-x-auto">
              <pre className="whitespace-pre">
{`5 philosophers sit around table with 5 chopsticks
Each philosopher needs 2 chopsticks to eat
Deadlock occurs when all pick up left chopstick simultaneously

Solutions:
1. Allow only 4 philosophers to sit at once
2. Pick up chopsticks only if both available
3. Asymmetric solution (odd picks left first, even picks right first)`}
              </pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Deadlocks;
