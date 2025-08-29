import React from 'react';

const RoundRobin = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg">
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Round Robin Scheduling</h1>
      
      <div className="space-y-4 sm:space-y-6">
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-cyan-400 mb-3 sm:mb-4">Overview</h2>
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
            Round Robin is a preemptive scheduling algorithm where each process gets a fixed time slice (quantum) 
            to execute. After the time quantum expires, the process is preempted and moved to the end of the ready queue.
          </p>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-purple-400 mb-3 sm:mb-4">Key Concepts</h2>
          <div className="bg-gray-700/50 border border-gray-600 p-3 sm:p-4 rounded-lg">
            <ul className="list-disc list-inside space-y-2 text-gray-300 text-xs sm:text-sm">
              <li><strong>Time Quantum:</strong> Fixed time slice allocated to each process</li>
              <li><strong>Preemption:</strong> Process is interrupted when quantum expires</li>
              <li><strong>Circular Queue:</strong> Ready queue is treated as circular</li>
              <li><strong>Context Switching:</strong> Overhead of switching between processes</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-orange-400 mb-3 sm:mb-4">Time Quantum Selection</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            <div className="bg-gray-700/50 border border-gray-600 p-2 sm:p-3 rounded-lg">
              <h4 className="font-semibold text-red-300 mb-1 text-xs sm:text-sm">Too Small</h4>
              <p className="text-gray-300 text-xs">High context switching overhead</p>
            </div>
            <div className="bg-gray-700/50 border border-gray-600 p-2 sm:p-3 rounded-lg">
              <h4 className="font-semibold text-green-300 mb-1 text-xs sm:text-sm">Optimal</h4>
              <p className="text-gray-300 text-xs">Balance between response and overhead</p>
            </div>
            <div className="bg-gray-700/50 border border-gray-600 p-2 sm:p-3 rounded-lg">
              <h4 className="font-semibold text-yellow-300 mb-1 text-xs sm:text-sm">Too Large</h4>
              <p className="text-gray-300 text-xs">Becomes FCFS scheduling</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-indigo-400 mb-3 sm:mb-4">Advantages & Disadvantages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-gray-700/50 border border-gray-600 p-3 sm:p-4 rounded-lg">
              <h3 className="font-semibold text-green-300 mb-2 text-sm sm:text-base">Advantages</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-300 text-xs sm:text-sm">
                <li>Fair allocation of CPU time</li>
                <li>Good response time</li>
                <li>No starvation</li>
                <li>Suitable for time-sharing systems</li>
              </ul>
            </div>
            <div className="bg-gray-700/50 border border-gray-600 p-3 sm:p-4 rounded-lg">
              <h3 className="font-semibold text-red-300 mb-2 text-sm sm:text-base">Disadvantages</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-300 text-xs sm:text-sm">
                <li>High context switching overhead</li>
                <li>Higher average turnaround time</li>
                <li>Performance depends on quantum size</li>
                <li>Not optimal for batch systems</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RoundRobin;
