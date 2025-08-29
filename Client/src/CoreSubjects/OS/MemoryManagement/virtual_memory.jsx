import React from 'react';

const VirtualMemory = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg">
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Virtual Memory</h1>
      
      <div className="space-y-4 sm:space-y-6">
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-cyan-400 mb-3 sm:mb-4">Overview</h2>
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
            Virtual memory is a memory management technique that provides an idealized abstraction of storage resources.
            It allows programs to use more memory than physically available by using disk storage as an extension of RAM.
          </p>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-purple-400 mb-3 sm:mb-4">Key Concepts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-gray-700/50 border border-gray-600 p-2 sm:p-3 rounded-lg">
              <h4 className="font-semibold text-cyan-300 mb-1 text-sm sm:text-base">Page Fault</h4>
              <p className="text-gray-300 text-xs sm:text-sm">Occurs when accessing a page not in memory</p>
            </div>
            <div className="bg-gray-700/50 border border-gray-600 p-2 sm:p-3 rounded-lg">
              <h4 className="font-semibold text-green-300 mb-1 text-sm sm:text-base">Demand Paging</h4>
              <p className="text-gray-300 text-xs sm:text-sm">Pages loaded only when needed</p>
            </div>
            <div className="bg-gray-700/50 border border-gray-600 p-2 sm:p-3 rounded-lg">
              <h4 className="font-semibold text-purple-300 mb-1 text-sm sm:text-base">Page Replacement</h4>
              <p className="text-gray-300 text-xs sm:text-sm">Algorithm to replace pages when memory is full</p>
            </div>
            <div className="bg-gray-700/50 border border-gray-600 p-2 sm:p-3 rounded-lg">
              <h4 className="font-semibold text-orange-300 mb-1 text-sm sm:text-base">Thrashing</h4>
              <p className="text-gray-300 text-xs sm:text-sm">Excessive paging activity degrading performance</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-orange-400 mb-3 sm:mb-4">Page Replacement Algorithms</h2>
          <div className="bg-gray-700/50 border border-gray-600 p-3 sm:p-4 rounded-lg">
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-xs sm:text-sm">
              <li><strong>FIFO:</strong> First In First Out</li>
              <li><strong>LRU:</strong> Least Recently Used</li>
              <li><strong>Optimal:</strong> Replace page that will be used farthest in future</li>
              <li><strong>Clock:</strong> Circular buffer with reference bits</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-indigo-400 mb-3 sm:mb-4">Advantages & Disadvantages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-gray-700/50 border border-gray-600 p-3 sm:p-4 rounded-lg">
              <h3 className="font-semibold text-green-300 mb-2 text-sm sm:text-base">Advantages</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-300 text-xs sm:text-sm">
                <li>Larger logical address space</li>
                <li>Better memory utilization</li>
                <li>Process isolation</li>
                <li>Shared memory support</li>
              </ul>
            </div>
            <div className="bg-gray-700/50 border border-gray-600 p-3 sm:p-4 rounded-lg">
              <h3 className="font-semibold text-red-300 mb-2 text-sm sm:text-base">Disadvantages</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-300 text-xs sm:text-sm">
                <li>Performance overhead</li>
                <li>Complex implementation</li>
                <li>Potential thrashing</li>
                <li>Hardware requirements</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default VirtualMemory;
