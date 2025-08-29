import React from 'react';

const Paging = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg">
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Paging</h1>
      
      <div className="space-y-4 sm:space-y-6">
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-cyan-400 mb-3 sm:mb-4">Overview</h2>
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
            Paging is a memory management scheme that eliminates the need for contiguous allocation of physical memory.
            It divides physical memory into fixed-size blocks called frames and logical memory into blocks of the same size called pages.
          </p>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-purple-400 mb-3 sm:mb-4">Key Concepts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-gray-700/50 border border-gray-600 p-3 sm:p-4 rounded-lg">
              <h3 className="font-semibold text-blue-300 mb-2 text-sm sm:text-base">Pages</h3>
              <p className="text-gray-300 text-xs sm:text-sm">Fixed-size blocks of logical memory (typically 4KB)</p>
            </div>
            <div className="bg-gray-700/50 border border-gray-600 p-3 sm:p-4 rounded-lg">
              <h3 className="font-semibold text-green-300 mb-2 text-sm sm:text-base">Frames</h3>
              <p className="text-gray-300 text-xs sm:text-sm">Fixed-size blocks of physical memory (same size as pages)</p>
            </div>
            <div className="bg-gray-700/50 border border-gray-600 p-3 sm:p-4 rounded-lg">
              <h3 className="font-semibold text-purple-300 mb-2 text-sm sm:text-base">Page Table</h3>
              <p className="text-gray-300 text-xs sm:text-sm">Maps logical pages to physical frames</p>
            </div>
            <div className="bg-gray-700/50 border border-gray-600 p-3 sm:p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-300 mb-2 text-sm sm:text-base">MMU</h3>
              <p className="text-gray-300 text-xs sm:text-sm">Memory Management Unit translates addresses</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-orange-400 mb-3 sm:mb-4">Address Translation</h2>
          <div className="bg-gray-700/50 border border-gray-600 p-3 sm:p-4 rounded-lg">
            <p className="text-gray-300 mb-2 text-sm sm:text-base">Logical Address = Page Number + Page Offset</p>
            <p className="text-gray-300 text-sm sm:text-base">Physical Address = Frame Number + Page Offset</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-indigo-400 mb-3 sm:mb-4">Advantages & Disadvantages</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-gray-700/50 border border-gray-600 p-3 sm:p-4 rounded-lg">
              <h3 className="font-semibold text-green-300 mb-2 text-sm sm:text-base">Advantages</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-300 text-xs sm:text-sm">
                <li>No external fragmentation</li>
                <li>Easy memory allocation</li>
                <li>Supports virtual memory</li>
                <li>Protection between processes</li>
              </ul>
            </div>
            <div className="bg-gray-700/50 border border-gray-600 p-3 sm:p-4 rounded-lg">
              <h3 className="font-semibold text-red-300 mb-2 text-sm sm:text-base">Disadvantages</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-300 text-xs sm:text-sm">
                <li>Internal fragmentation</li>
                <li>Page table overhead</li>
                <li>Memory access overhead</li>
                <li>Complex hardware support</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Paging;
