import React from 'react';

const FCFS = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg">
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">FCFS (First Come First Serve) Scheduling</h1>
      
      <div className="space-y-4 sm:space-y-6">
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-cyan-400 mb-3 sm:mb-4">Overview</h2>
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
            FCFS is the simplest CPU scheduling algorithm where processes are executed in the order they arrive in the ready queue.
            It's a non-preemptive algorithm that follows the "first come, first served" principle.
          </p>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-purple-400 mb-3 sm:mb-4">Algorithm</h2>
          <div className="bg-gray-700/50 border border-gray-600 p-3 sm:p-4 rounded-lg">
            <ol className="list-decimal list-inside space-y-2 text-gray-300 text-xs sm:text-sm">
              <li>Processes are arranged in ready queue in order of arrival</li>
              <li>CPU is allocated to the first process in the queue</li>
              <li>Process runs to completion</li>
              <li>Next process in queue gets CPU</li>
            </ol>
          </div>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-orange-400 mb-3 sm:mb-4">Example</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-700/50 border border-gray-600 text-xs sm:text-sm">
              <thead className="bg-gray-600">
                <tr>
                  <th className="border border-gray-500 px-2 sm:px-4 py-1 sm:py-2 text-white">Process</th>
                  <th className="border border-gray-500 px-2 sm:px-4 py-1 sm:py-2 text-white">Arrival Time</th>
                  <th className="border border-gray-500 px-2 sm:px-4 py-1 sm:py-2 text-white">Burst Time</th>
                  <th className="border border-gray-500 px-2 sm:px-4 py-1 sm:py-2 text-white">Completion Time</th>
                  <th className="border border-gray-500 px-2 sm:px-4 py-1 sm:py-2 text-white">Turnaround Time</th>
                  <th className="border border-gray-500 px-2 sm:px-4 py-1 sm:py-2 text-white">Waiting Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-500 px-2 sm:px-4 py-1 sm:py-2 text-center text-gray-300">P1</td>
                  <td className="border border-gray-500 px-2 sm:px-4 py-1 sm:py-2 text-center text-gray-300">0</td>
                  <td className="border border-gray-500 px-2 sm:px-4 py-1 sm:py-2 text-center text-gray-300">4</td>
                  <td className="border border-gray-500 px-2 sm:px-4 py-1 sm:py-2 text-center text-gray-300">4</td>
                  <td className="border border-gray-500 px-2 sm:px-4 py-1 sm:py-2 text-center text-gray-300">4</td>
                  <td className="border border-gray-500 px-2 sm:px-4 py-1 sm:py-2 text-center text-gray-300">0</td>
                </tr>
                <tr>
                  <td className="border border-gray-500 px-2 sm:px-4 py-1 sm:py-2 text-center text-gray-300">P2</td>
                  <td className="border border-gray-500 px-2 sm:px-4 py-1 sm:py-2 text-center text-gray-300">1</td>
                  <td className="border border-gray-500 px-2 sm:px-4 py-1 sm:py-2 text-center text-gray-300">3</td>
                  <td className="border border-gray-500 px-2 sm:px-4 py-1 sm:py-2 text-center text-gray-300">7</td>
                  <td className="border border-gray-500 px-2 sm:px-4 py-1 sm:py-2 text-center text-gray-300">6</td>
                  <td className="border border-gray-500 px-2 sm:px-4 py-1 sm:py-2 text-center text-gray-300">3</td>
                </tr>
                <tr>
                  <td className="border border-gray-500 px-2 sm:px-4 py-1 sm:py-2 text-center text-gray-300">P3</td>
                  <td className="border border-gray-500 px-2 sm:px-4 py-1 sm:py-2 text-center text-gray-300">2</td>
                  <td className="border border-gray-500 px-2 sm:px-4 py-1 sm:py-2 text-center text-gray-300">2</td>
                  <td className="border border-gray-500 px-2 sm:px-4 py-1 sm:py-2 text-center text-gray-300">9</td>
                  <td className="border border-gray-500 px-2 sm:px-4 py-1 sm:py-2 text-center text-gray-300">7</td>
                  <td className="border border-gray-500 px-2 sm:px-4 py-1 sm:py-2 text-center text-gray-300">5</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-indigo-400 mb-3 sm:mb-4">Advantages & Disadvantages</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-gray-700/50 border border-gray-600 p-3 sm:p-4 rounded-lg">
              <h3 className="font-semibold text-green-300 mb-2 text-sm sm:text-base">Advantages</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-300 text-xs sm:text-sm">
                <li>Simple to understand and implement</li>
                <li>No starvation</li>
                <li>Fair scheduling</li>
                <li>Low overhead</li>
              </ul>
            </div>
            <div className="bg-gray-700/50 border border-gray-600 p-3 sm:p-4 rounded-lg">
              <h3 className="font-semibold text-red-300 mb-2 text-sm sm:text-base">Disadvantages</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-300 text-xs sm:text-sm">
                <li>High average waiting time</li>
                <li>Convoy effect</li>
                <li>Not suitable for time-sharing systems</li>
                <li>Poor response time</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FCFS;
