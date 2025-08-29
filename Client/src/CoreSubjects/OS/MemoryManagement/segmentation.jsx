import React from 'react';

const Segmentation = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg">
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Segmentation</h1>
      
      <div className="space-y-4 sm:space-y-6">
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-cyan-400 mb-3 sm:mb-4">Overview</h2>
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
            Segmentation is a memory management technique that divides the logical address space into segments
            of variable sizes based on the logical divisions of a program (code, data, stack, heap).
          </p>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-purple-400 mb-3 sm:mb-4">Segment Types</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-gray-700/50 border border-gray-600 p-2 sm:p-3 rounded-lg">
              <h4 className="font-semibold text-cyan-300 mb-1 text-sm sm:text-base">Code Segment</h4>
              <p className="text-gray-300 text-xs sm:text-sm">Contains executable instructions</p>
            </div>
            <div className="bg-gray-700/50 border border-gray-600 p-2 sm:p-3 rounded-lg">
              <h4 className="font-semibold text-green-300 mb-1 text-sm sm:text-base">Data Segment</h4>
              <p className="text-gray-300 text-xs sm:text-sm">Contains global and static variables</p>
            </div>
            <div className="bg-gray-700/50 border border-gray-600 p-2 sm:p-3 rounded-lg">
              <h4 className="font-semibold text-purple-300 mb-1 text-sm sm:text-base">Stack Segment</h4>
              <p className="text-gray-300 text-xs sm:text-sm">Contains function calls and local variables</p>
            </div>
            <div className="bg-gray-700/50 border border-gray-600 p-2 sm:p-3 rounded-lg">
              <h4 className="font-semibold text-orange-300 mb-1 text-sm sm:text-base">Heap Segment</h4>
              <p className="text-gray-300 text-xs sm:text-sm">Contains dynamically allocated memory</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-indigo-400 mb-3 sm:mb-4">Advantages & Disadvantages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-gray-700/50 border border-gray-600 p-3 sm:p-4 rounded-lg">
              <h3 className="font-semibold text-green-300 mb-2 text-sm sm:text-base">Advantages</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-300 text-xs sm:text-sm">
                <li>Logical organization</li>
                <li>Protection and sharing</li>
                <li>Dynamic segment growth</li>
                <li>No internal fragmentation</li>
              </ul>
            </div>
            <div className="bg-gray-700/50 border border-gray-600 p-3 sm:p-4 rounded-lg">
              <h3 className="font-semibold text-red-300 mb-2 text-sm sm:text-base">Disadvantages</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-300 text-xs sm:text-sm">
                <li>External fragmentation</li>
                <li>Complex memory allocation</li>
                <li>Segment table overhead</li>
                <li>Difficult to implement</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Segmentation;
