import React from 'react';

const ProcessSchedulingSubtopic = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">Process Scheduling</h1>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          Learn CPU scheduling algorithms and how operating systems manage process execution efficiently.
        </p>
      </div>

      <div className="space-y-6 sm:space-y-8">
        {/* Scheduling Overview */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-3 sm:mb-4">CPU Scheduling Overview</h2>
          <div className="bg-blue-50 p-4 sm:p-6 rounded-lg">
            <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">
              <strong>CPU Scheduling</strong> determines which process gets CPU time and for how long, 
              maximizing CPU utilization and system throughput.
            </p>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="bg-white p-3 sm:p-4 rounded border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-700 mb-2 text-sm sm:text-base">Scheduling Objectives:</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1 text-xs sm:text-sm">
                  <li><strong>Maximize CPU utilization:</strong> Keep CPU busy as much as possible</li>
                  <li><strong>Maximize throughput:</strong> Complete more processes per unit time</li>
                  <li><strong>Minimize turnaround time:</strong> Reduce total time from submission to completion</li>
                  <li><strong>Minimize waiting time:</strong> Reduce time processes spend in ready queue</li>
                  <li><strong>Minimize response time:</strong> Reduce time to first response in interactive systems</li>
                </ul>
              </div>

              <div className="bg-white p-3 sm:p-4 rounded border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-700 mb-2 text-sm sm:text-base">Process States in Scheduling:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  <div className="bg-gray-50 p-2 sm:p-3 rounded text-center">
                    <h5 className="font-semibold text-gray-800 mb-1 text-sm">Ready</h5>
                    <p className="text-gray-600 text-xs sm:text-sm">Waiting for CPU</p>
                  </div>
                  <div className="bg-gray-50 p-2 sm:p-3 rounded text-center">
                    <h5 className="font-semibold text-gray-800 mb-1 text-sm">Running</h5>
                    <p className="text-gray-600 text-xs sm:text-sm">Executing on CPU</p>
                  </div>
                  <div className="bg-gray-50 p-2 sm:p-3 rounded text-center">
                    <h5 className="font-semibold text-gray-800 mb-1 text-sm">Waiting</h5>
                    <p className="text-gray-600 text-xs sm:text-sm">Blocked for I/O</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FCFS Scheduling */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-3 sm:mb-4">First-Come, First-Served (FCFS)</h2>
          <div className="bg-green-50 p-4 sm:p-6 rounded-lg">
            <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">
              <strong>FCFS</strong> is the simplest scheduling algorithm where processes are executed 
              in the order they arrive in the ready queue.
            </p>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="bg-white p-3 sm:p-4 rounded border-l-4 border-green-500">
                <h4 className="font-semibold text-green-700 mb-2 text-sm sm:text-base">Example:</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs sm:text-sm border-collapse border border-gray-300">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border border-gray-300 p-1 sm:p-2">Process</th>
                        <th className="border border-gray-300 p-1 sm:p-2">Arrival Time</th>
                        <th className="border border-gray-300 p-1 sm:p-2">Burst Time</th>
                        <th className="border border-gray-300 p-1 sm:p-2">Start Time</th>
                        <th className="border border-gray-300 p-1 sm:p-2">Finish Time</th>
                        <th className="border border-gray-300 p-1 sm:p-2">Waiting Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="border border-gray-300 p-1 sm:p-2">P1</td><td className="border border-gray-300 p-1 sm:p-2">0</td><td className="border border-gray-300 p-1 sm:p-2">24</td><td className="border border-gray-300 p-1 sm:p-2">0</td><td className="border border-gray-300 p-1 sm:p-2">24</td><td className="border border-gray-300 p-1 sm:p-2">0</td></tr>
                      <tr><td className="border border-gray-300 p-1 sm:p-2">P2</td><td className="border border-gray-300 p-1 sm:p-2">1</td><td className="border border-gray-300 p-1 sm:p-2">3</td><td className="border border-gray-300 p-1 sm:p-2">24</td><td className="border border-gray-300 p-1 sm:p-2">27</td><td className="border border-gray-300 p-1 sm:p-2">23</td></tr>
                      <tr><td className="border border-gray-300 p-1 sm:p-2">P3</td><td className="border border-gray-300 p-1 sm:p-2">2</td><td className="border border-gray-300 p-1 sm:p-2">3</td><td className="border border-gray-300 p-1 sm:p-2">27</td><td className="border border-gray-300 p-1 sm:p-2">30</td><td className="border border-gray-300 p-1 sm:p-2">25</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mt-2">Average Waiting Time = (0 + 23 + 25) / 3 = 16 ms</p>
              </div>

              <div className="bg-white p-3 sm:p-4 rounded border-l-4 border-green-500">
                <h4 className="font-semibold text-green-700 mb-2 text-sm sm:text-base">Characteristics:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <h5 className="font-semibold text-green-600 mb-2 text-sm">✅ Advantages:</h5>
                    <ul className="list-disc list-inside text-gray-700 text-xs sm:text-sm space-y-1">
                      <li>Simple to implement</li>
                      <li>Fair (first come, first served)</li>
                      <li>No starvation</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-red-600 mb-2 text-sm">❌ Disadvantages:</h5>
                    <ul className="list-disc list-inside text-gray-700 text-xs sm:text-sm space-y-1">
                      <li>Convoy effect (short processes wait for long ones)</li>
                      <li>Poor average waiting time</li>
                      <li>Not suitable for interactive systems</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SJF Scheduling */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Shortest Job First (SJF)</h2>
          <div className="bg-purple-50 p-6 rounded-lg">
            <p className="text-gray-700 mb-4">
              <strong>SJF</strong> schedules the process with the smallest burst time first, 
              providing optimal average waiting time.
            </p>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded border-l-4 border-purple-500">
                <h4 className="font-semibold text-purple-700 mb-2">Non-Preemptive SJF Example:</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse border border-gray-300">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border border-gray-300 p-2">Process</th>
                        <th className="border border-gray-300 p-2">Arrival Time</th>
                        <th className="border border-gray-300 p-2">Burst Time</th>
                        <th className="border border-gray-300 p-2">Start Time</th>
                        <th className="border border-gray-300 p-2">Finish Time</th>
                        <th className="border border-gray-300 p-2">Waiting Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="border border-gray-300 p-2">P1</td><td className="border border-gray-300 p-2">0</td><td className="border border-gray-300 p-2">6</td><td className="border border-gray-300 p-2">3</td><td className="border border-gray-300 p-2">9</td><td className="border border-gray-300 p-2">3</td></tr>
                      <tr><td className="border border-gray-300 p-2">P2</td><td className="border border-gray-300 p-2">1</td><td className="border border-gray-300 p-2">8</td><td className="border border-gray-300 p-2">16</td><td className="border border-gray-300 p-2">24</td><td className="border border-gray-300 p-2">15</td></tr>
                      <tr><td className="border border-gray-300 p-2">P3</td><td className="border border-gray-300 p-2">2</td><td className="border border-gray-300 p-2">7</td><td className="border border-gray-300 p-2">9</td><td className="border border-gray-300 p-2">16</td><td className="border border-gray-300 p-2">7</td></tr>
                      <tr><td className="border border-gray-300 p-2">P4</td><td className="border border-gray-300 p-2">3</td><td className="border border-gray-300 p-2">3</td><td className="border border-gray-300 p-2">0</td><td className="border border-gray-300 p-2">3</td><td className="border border-gray-300 p-2">0</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-600 mt-2">Average Waiting Time = (3 + 15 + 7 + 0) / 4 = 6.25 ms</p>
              </div>

              <div className="bg-white p-4 rounded border-l-4 border-purple-500">
                <h4 className="font-semibold text-purple-700 mb-2">Preemptive SJF (SRTF):</h4>
                <p className="text-gray-700 text-sm mb-2">
                  <strong>Shortest Remaining Time First (SRTF)</strong> preempts currently running process 
                  if a new process arrives with shorter remaining time.
                </p>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-gray-700 text-sm">
                    SRTF provides even better average waiting time than non-preemptive SJF but 
                    requires knowledge of remaining execution time and has higher context switching overhead.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Round Robin */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Round Robin (RR)</h2>
          <div className="bg-yellow-50 p-6 rounded-lg">
            <p className="text-gray-700 mb-4">
              <strong>Round Robin</strong> assigns a fixed time quantum to each process in circular order, 
              ideal for time-sharing systems.
            </p>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded border-l-4 border-yellow-500">
                <h4 className="font-semibold text-yellow-700 mb-2">Example (Time Quantum = 4):</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse border border-gray-300">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border border-gray-300 p-2">Process</th>
                        <th className="border border-gray-300 p-2">Burst Time</th>
                        <th className="border border-gray-300 p-2">Remaining Time</th>
                        <th className="border border-gray-300 p-2">Waiting Time</th>
                        <th className="border border-gray-300 p-2">Turnaround Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="border border-gray-300 p-2">P1</td><td className="border border-gray-300 p-2">24</td><td className="border border-gray-300 p-2">0</td><td className="border border-gray-300 p-2">6</td><td className="border border-gray-300 p-2">30</td></tr>
                      <tr><td className="border border-gray-300 p-2">P2</td><td className="border border-gray-300 p-2">3</td><td className="border border-gray-300 p-2">0</td><td className="border border-gray-300 p-2">4</td><td className="border border-gray-300 p-2">7</td></tr>
                      <tr><td className="border border-gray-300 p-2">P3</td><td className="border border-gray-300 p-2">3</td><td className="border border-gray-300 p-2">0</td><td className="border border-gray-300 p-2">7</td><td className="border border-gray-300 p-2">10</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-600 mt-2">Execution Order: P1(4) → P2(3) → P3(3) → P1(4) → P1(4) → P1(4) → P1(4) → P1(4)</p>
              </div>

              <div className="bg-white p-4 rounded border-l-4 border-yellow-500">
                <h4 className="font-semibold text-yellow-700 mb-2">Time Quantum Selection:</h4>
                <div className="space-y-2">
                  <div className="bg-gray-50 p-3 rounded">
                    <h5 className="font-semibold text-gray-800 mb-1">Large Time Quantum:</h5>
                    <p className="text-gray-700 text-sm">Behaves like FCFS, reduces context switching overhead</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <h5 className="font-semibold text-gray-800 mb-1">Small Time Quantum:</h5>
                    <p className="text-gray-700 text-sm">Better response time but higher context switching overhead</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <h5 className="font-semibold text-gray-800 mb-1">Optimal:</h5>
                    <p className="text-gray-700 text-sm">Usually 10-100ms, should be larger than context switch time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Priority Scheduling */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Priority Scheduling</h2>
          <div className="bg-red-50 p-6 rounded-lg">
            <p className="text-gray-700 mb-4">
              <strong>Priority Scheduling</strong> assigns priorities to processes and schedules 
              the highest priority process first.
            </p>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded border-l-4 border-red-500">
                <h4 className="font-semibold text-red-700 mb-2">Priority Assignment:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded">
                    <h5 className="font-semibold text-gray-800 mb-2">Static Priority</h5>
                    <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                      <li>Assigned at process creation</li>
                      <li>Remains constant throughout execution</li>
                      <li>Simple to implement</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <h5 className="font-semibold text-gray-800 mb-2">Dynamic Priority</h5>
                    <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                      <li>Changes during execution</li>
                      <li>Based on aging, behavior, etc.</li>
                      <li>Prevents starvation</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded border-l-4 border-red-500">
                <h4 className="font-semibold text-red-700 mb-2">Starvation Problem:</h4>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-gray-700 text-sm mb-2">
                    <strong>Problem:</strong> Low priority processes may never execute if high priority processes keep arriving.
                  </p>
                  <p className="text-gray-700 text-sm">
                    <strong>Solution - Aging:</strong> Gradually increase priority of waiting processes over time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Multilevel Queue */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Multilevel Queue Scheduling</h2>
          <div className="bg-indigo-50 p-6 rounded-lg">
            <p className="text-gray-700 mb-4">
              <strong>Multilevel Queue</strong> partitions processes into separate queues based on 
              process characteristics, each with its own scheduling algorithm.
            </p>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded border-l-4 border-indigo-500">
                <h4 className="font-semibold text-indigo-700 mb-2">Queue Structure:</h4>
                <div className="space-y-2">
                  <div className="bg-gray-50 p-2 rounded text-center">
                    <span className="font-semibold text-gray-800">System Processes (Highest Priority)</span>
                  </div>
                  <div className="bg-gray-50 p-2 rounded text-center">
                    <span className="font-semibold text-gray-800">Interactive Processes</span>
                  </div>
                  <div className="bg-gray-50 p-2 rounded text-center">
                    <span className="font-semibold text-gray-800">Interactive Editing Processes</span>
                  </div>
                  <div className="bg-gray-50 p-2 rounded text-center">
                    <span className="font-semibold text-gray-800">Batch Processes</span>
                  </div>
                  <div className="bg-gray-50 p-2 rounded text-center">
                    <span className="font-semibold text-gray-800">Student Processes (Lowest Priority)</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded border-l-4 border-indigo-500">
                <h4 className="font-semibold text-indigo-700 mb-2">Multilevel Feedback Queue:</h4>
                <p className="text-gray-700 text-sm mb-2">
                  Allows processes to move between queues based on behavior and aging.
                </p>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                  <li>New processes start in highest priority queue</li>
                  <li>If process uses full time quantum, move to lower priority queue</li>
                  <li>If process finishes early, stays in same or moves to higher priority queue</li>
                  <li>Aging can promote processes to higher priority queues</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Performance Comparison */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Algorithm Comparison</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 p-2">Algorithm</th>
                    <th className="border border-gray-300 p-2">Preemptive</th>
                    <th className="border border-gray-300 p-2">Starvation</th>
                    <th className="border border-gray-300 p-2">Overhead</th>
                    <th className="border border-gray-300 p-2">Best Use Case</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2 font-semibold">FCFS</td>
                    <td className="border border-gray-300 p-2">No</td>
                    <td className="border border-gray-300 p-2">No</td>
                    <td className="border border-gray-300 p-2">Low</td>
                    <td className="border border-gray-300 p-2">Batch systems</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 font-semibold">SJF</td>
                    <td className="border border-gray-300 p-2">Optional</td>
                    <td className="border border-gray-300 p-2">Yes</td>
                    <td className="border border-gray-300 p-2">Medium</td>
                    <td className="border border-gray-300 p-2">Known burst times</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 font-semibold">Round Robin</td>
                    <td className="border border-gray-300 p-2">Yes</td>
                    <td className="border border-gray-300 p-2">No</td>
                    <td className="border border-gray-300 p-2">Medium</td>
                    <td className="border border-gray-300 p-2">Time-sharing systems</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 font-semibold">Priority</td>
                    <td className="border border-gray-300 p-2">Optional</td>
                    <td className="border border-gray-300 p-2">Yes</td>
                    <td className="border border-gray-300 p-2">Medium</td>
                    <td className="border border-gray-300 p-2">Real-time systems</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 font-semibold">Multilevel</td>
                    <td className="border border-gray-300 p-2">Yes</td>
                    <td className="border border-gray-300 p-2">Possible</td>
                    <td className="border border-gray-300 p-2">High</td>
                    <td className="border border-gray-300 p-2">Complex systems</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProcessSchedulingSubtopic;
