import React from 'react';

const FileAllocation = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg">
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">File Allocation Methods</h1>
      
      <div className="space-y-4 sm:space-y-6">
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-cyan-400 mb-3 sm:mb-4">Overview</h2>
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
            File allocation methods determine how files are stored on disk and how disk space is allocated to files.
            Different methods have trade-offs between access speed, storage efficiency, and implementation complexity.
          </p>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-purple-400 mb-3 sm:mb-4">Allocation Methods</h2>
          <div className="space-y-3 sm:space-y-4">
            <div className="bg-gray-700/50 border border-gray-600 p-3 sm:p-4 rounded-lg">
              <h3 className="font-semibold text-cyan-300 mb-2 text-sm sm:text-base">1. Contiguous Allocation</h3>
              <p className="text-gray-300 text-xs sm:text-sm mb-2">Files stored in contiguous blocks on disk.</p>
              <div className="text-xs text-gray-300">
                <strong>Pros:</strong> Fast access, simple implementation<br/>
                <strong>Cons:</strong> External fragmentation, difficult to grow files
              </div>
            </div>

            <div className="bg-gray-700/50 border border-gray-600 p-3 sm:p-4 rounded-lg">
              <h3 className="font-semibold text-green-300 mb-2 text-sm sm:text-base">2. Linked Allocation</h3>
              <p className="text-gray-300 text-xs sm:text-sm mb-2">Files stored as linked list of blocks.</p>
              <div className="text-xs text-gray-300">
                <strong>Pros:</strong> No external fragmentation, dynamic file growth<br/>
                <strong>Cons:</strong> Slow random access, pointer overhead
              </div>
            </div>

            <div className="bg-gray-700/50 border border-gray-600 p-3 sm:p-4 rounded-lg">
              <h3 className="font-semibold text-purple-300 mb-2 text-sm sm:text-base">3. Indexed Allocation</h3>
              <p className="text-gray-300 text-xs sm:text-sm mb-2">Uses index blocks to point to file blocks.</p>
              <div className="text-xs text-gray-300">
                <strong>Pros:</strong> Fast random access, no external fragmentation<br/>
                <strong>Cons:</strong> Index block overhead, complex for small files
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-orange-400 mb-3 sm:mb-4">Comparison</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-700/50 border border-gray-600 text-xs sm:text-sm">
              <thead className="bg-gray-600">
                <tr>
                  <th className="px-2 sm:px-4 py-1 sm:py-2 border border-gray-500 text-white">Method</th>
                  <th className="px-2 sm:px-4 py-1 sm:py-2 border border-gray-500 text-white">Access Time</th>
                  <th className="px-2 sm:px-4 py-1 sm:py-2 border border-gray-500 text-white">Fragmentation</th>
                  <th className="px-2 sm:px-4 py-1 sm:py-2 border border-gray-500 text-white">File Growth</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-2 sm:px-4 py-1 sm:py-2 border border-gray-500 text-gray-300">Contiguous</td>
                  <td className="px-2 sm:px-4 py-1 sm:py-2 border border-gray-500 text-gray-300">Fast</td>
                  <td className="px-2 sm:px-4 py-1 sm:py-2 border border-gray-500 text-gray-300">External</td>
                  <td className="px-2 sm:px-4 py-1 sm:py-2 border border-gray-500 text-gray-300">Difficult</td>
                </tr>
                <tr>
                  <td className="px-2 sm:px-4 py-1 sm:py-2 border border-gray-500 text-gray-300">Linked</td>
                  <td className="px-2 sm:px-4 py-1 sm:py-2 border border-gray-500 text-gray-300">Slow</td>
                  <td className="px-2 sm:px-4 py-1 sm:py-2 border border-gray-500 text-gray-300">None</td>
                  <td className="px-2 sm:px-4 py-1 sm:py-2 border border-gray-500 text-gray-300">Easy</td>
                </tr>
                <tr>
                  <td className="px-2 sm:px-4 py-1 sm:py-2 border border-gray-500 text-gray-300">Indexed</td>
                  <td className="px-2 sm:px-4 py-1 sm:py-2 border border-gray-500 text-gray-300">Fast</td>
                  <td className="px-2 sm:px-4 py-1 sm:py-2 border border-gray-500 text-gray-300">None</td>
                  <td className="px-2 sm:px-4 py-1 sm:py-2 border border-gray-500 text-gray-300">Easy</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FileAllocation;
