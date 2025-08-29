import React from 'react';

const SJF = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg">
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">SJF (Shortest Job First) Scheduling</h1>
      
      <div className="space-y-4 sm:space-y-6">
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-cyan-400 mb-3 sm:mb-4">Overview</h2>
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
            SJF scheduling algorithm selects the process with the smallest burst time for execution next.
            It can be either preemptive (SRTF - Shortest Remaining Time First) or non-preemptive.
          </p>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-purple-400 mb-3 sm:mb-4">Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-gray-700/50 border border-gray-600 p-3 sm:p-4 rounded-lg">
              <h3 className="font-semibold text-cyan-300 mb-2 text-sm sm:text-base">Non-Preemptive SJF</h3>
              <p className="text-gray-300 text-xs sm:text-sm">
                Once a process starts execution, it cannot be interrupted until completion.
              </p>
            </div>
            <div className="bg-gray-700/50 border border-gray-600 p-3 sm:p-4 rounded-lg">
              <h3 className="font-semibold text-green-300 mb-2 text-sm sm:text-base">Preemptive SJF (SRTF)</h3>
              <p className="text-gray-300 text-xs sm:text-sm">
                If a new process arrives with shorter burst time, current process is preempted.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-indigo-400 mb-3 sm:mb-4">Advantages & Disadvantages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-gray-700/50 border border-gray-600 p-3 sm:p-4 rounded-lg">
              <h3 className="font-semibold text-green-300 mb-2 text-sm sm:text-base">Advantages</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-300 text-xs sm:text-sm">
                <li>Minimum average waiting time</li>
                <li>Optimal for average turnaround time</li>
                <li>Better than FCFS</li>
              </ul>
            </div>
            <div className="bg-gray-700/50 border border-gray-600 p-3 sm:p-4 rounded-lg">
              <h3 className="font-semibold text-red-300 mb-2 text-sm sm:text-base">Disadvantages</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-300 text-xs sm:text-sm">
                <li>Starvation of long processes</li>
                <li>Difficult to predict burst time</li>
                <li>Not practical in real systems</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SJF;
