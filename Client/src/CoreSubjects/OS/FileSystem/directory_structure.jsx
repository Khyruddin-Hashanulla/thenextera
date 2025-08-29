import React from 'react';

const DirectoryStructure = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg">
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Directory Structure</h1>
      
      <div className="space-y-4 sm:space-y-6">
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-cyan-400 mb-3 sm:mb-4">Overview</h2>
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
            Directory structure organizes files in a file system. It provides a way to group related files
            and creates a hierarchical namespace for file identification and access.
          </p>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-purple-400 mb-3 sm:mb-4">Directory Types</h2>
          <div className="space-y-3 sm:space-y-4">
            <div className="bg-gray-700/50 border border-gray-600 p-3 sm:p-4 rounded-lg">
              <h3 className="font-semibold text-cyan-300 mb-2 text-sm sm:text-base">Single-Level Directory</h3>
              <p className="text-gray-300 text-xs sm:text-sm">All files in one directory. Simple but limited.</p>
            </div>

            <div className="bg-gray-700/50 border border-gray-600 p-3 sm:p-4 rounded-lg">
              <h3 className="font-semibold text-green-300 mb-2 text-sm sm:text-base">Two-Level Directory</h3>
              <p className="text-gray-300 text-xs sm:text-sm">Separate directory for each user. Better organization.</p>
            </div>

            <div className="bg-gray-700/50 border border-gray-600 p-3 sm:p-4 rounded-lg">
              <h3 className="font-semibold text-purple-300 mb-2 text-sm sm:text-base">Tree-Structured Directory</h3>
              <p className="text-gray-300 text-xs sm:text-sm">Hierarchical structure with subdirectories. Most common.</p>
            </div>

            <div className="bg-gray-700/50 border border-gray-600 p-3 sm:p-4 rounded-lg">
              <h3 className="font-semibold text-orange-300 mb-2 text-sm sm:text-base">Acyclic Graph Directory</h3>
              <p className="text-gray-300 text-xs sm:text-sm">Allows shared files and directories via links.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-orange-400 mb-3 sm:mb-4">Directory Operations</h2>
          <div className="bg-gray-700/50 border border-gray-600 p-3 sm:p-4 rounded-lg">
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-xs sm:text-sm">
              <li><strong>Create:</strong> Make new directory</li>
              <li><strong>Delete:</strong> Remove directory (must be empty)</li>
              <li><strong>List:</strong> Display directory contents</li>
              <li><strong>Search:</strong> Find files in directory</li>
              <li><strong>Rename:</strong> Change directory name</li>
              <li><strong>Traverse:</strong> Navigate directory tree</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-indigo-400 mb-3 sm:mb-4">Path Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-gray-700/50 border border-gray-600 p-3 sm:p-4 rounded-lg">
              <h3 className="font-semibold text-cyan-300 mb-2 text-sm sm:text-base">Absolute Path</h3>
              <p className="text-gray-300 text-xs sm:text-sm mb-2">Complete path from root directory</p>
              <code className="text-xs bg-gray-800 border border-gray-600 text-green-400 p-1 rounded">/home/user/documents/file.txt</code>
            </div>
            <div className="bg-gray-700/50 border border-gray-600 p-3 sm:p-4 rounded-lg">
              <h3 className="font-semibold text-green-300 mb-2 text-sm sm:text-base">Relative Path</h3>
              <p className="text-gray-300 text-xs sm:text-sm mb-2">Path relative to current directory</p>
              <code className="text-xs bg-gray-800 border border-gray-600 text-green-400 p-1 rounded">../documents/file.txt</code>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DirectoryStructure;
