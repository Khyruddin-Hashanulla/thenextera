import React from 'react';

const PriorityScheduling = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg">
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Priority Scheduling</h1>
      
      <div className="space-y-4 sm:space-y-6">
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-cyan-400 mb-3 sm:mb-4">Overview</h2>
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
            Priority scheduling assigns priorities to processes and executes them based on their priority levels.
            Higher priority processes are executed first. Can be preemptive or non-preemptive.
          </p>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-purple-400 mb-3 sm:mb-4">Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-gray-700/50 border border-gray-600 p-3 sm:p-4 rounded-lg">
              <h3 className="font-semibold text-cyan-300 mb-2 text-sm sm:text-base">Non-Preemptive</h3>
              <p className="text-gray-300 text-xs sm:text-sm">
                Once a process starts execution, it runs to completion regardless of new arrivals.
              </p>
            </div>
            <div className="bg-gray-700/50 border border-gray-600 p-3 sm:p-4 rounded-lg">
              <h3 className="font-semibold text-green-300 mb-2 text-sm sm:text-base">Preemptive</h3>
              <p className="text-gray-300 text-xs sm:text-sm">
                Higher priority process can interrupt currently running lower priority process.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-orange-400 mb-3 sm:mb-4">Priority Assignment</h2>
          <div className="bg-gray-700/50 border border-gray-600 p-3 sm:p-4 rounded-lg">
            <ul className="list-disc list-inside space-y-2 text-gray-300 text-xs sm:text-sm">
              <li><strong>Static Priority:</strong> Priority assigned at process creation</li>
              <li><strong>Dynamic Priority:</strong> Priority changes during execution</li>
              <li><strong>Internal Priority:</strong> Based on system parameters (memory, time)</li>
              <li><strong>External Priority:</strong> Based on external factors (user, importance)</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-red-400 mb-3 sm:mb-4">Starvation Problem</h2>
          <div className="bg-gray-700/50 border border-gray-600 p-3 sm:p-4 rounded-lg">
            <h3 className="font-semibold text-red-300 mb-2 text-sm sm:text-base">Problem</h3>
            <p className="text-gray-300 mb-2 sm:mb-3 text-xs sm:text-sm">Low priority processes may never execute if high priority processes keep arriving.</p>
            
            <h3 className="font-semibold text-red-300 mb-2 text-sm sm:text-base">Solution: Aging</h3>
            <p className="text-gray-300 text-xs sm:text-sm">Gradually increase priority of waiting processes over time.</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-indigo-400 mb-3 sm:mb-4">Advantages & Disadvantages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-gray-700/50 border border-gray-600 p-3 sm:p-4 rounded-lg">
              <h3 className="font-semibold text-green-300 mb-2 text-sm sm:text-base">Advantages</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-300 text-xs sm:text-sm">
                <li>Important processes get priority</li>
                <li>Flexible scheduling</li>
                <li>Good for real-time systems</li>
              </ul>
            </div>
            <div className="bg-gray-700/50 border border-gray-600 p-3 sm:p-4 rounded-lg">
              <h3 className="font-semibold text-red-300 mb-2 text-sm sm:text-base">Disadvantages</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-300 text-xs sm:text-sm">
                <li>Starvation of low priority processes</li>
                <li>Complex priority assignment</li>
                <li>Overhead of priority management</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PriorityScheduling;
