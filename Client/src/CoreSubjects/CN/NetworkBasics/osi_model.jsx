import React from 'react';

const OSIModel = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">OSI Model</h1>
      
      <div className="space-y-4 sm:space-y-6">
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-cyan-400 mb-3 sm:mb-4">Overview</h2>
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
            The OSI (Open Systems Interconnection) model is a conceptual framework that standardizes 
            the functions of a telecommunication or computing system into seven abstraction layers.
          </p>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-purple-400 mb-3 sm:mb-4">Seven Layers</h2>
          <div className="space-y-3 sm:space-y-4">
            <div className="bg-gray-700/50 border border-gray-600 p-3 sm:p-4 rounded-lg border-l-4 border-red-400">
              <h4 className="font-semibold text-red-400 text-sm sm:text-base">Layer 7 - Application</h4>
              <p className="text-gray-300 text-xs sm:text-sm mt-1">User interface, network services (HTTP, FTP, SMTP)</p>
            </div>
            <div className="bg-gray-700/50 border border-gray-600 p-3 sm:p-4 rounded-lg border-l-4 border-orange-400">
              <h4 className="font-semibold text-orange-400 text-sm sm:text-base">Layer 6 - Presentation</h4>
              <p className="text-gray-300 text-xs sm:text-sm mt-1">Data encryption, compression, translation</p>
            </div>
            <div className="bg-gray-700/50 border border-gray-600 p-3 sm:p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-semibold text-yellow-400 text-sm sm:text-base">Layer 5 - Session</h4>
              <p className="text-gray-300 text-xs sm:text-sm mt-1">Session management, dialog control</p>
            </div>
            <div className="bg-gray-700/50 border border-gray-600 p-3 sm:p-4 rounded-lg border-l-4 border-green-400">
              <h4 className="font-semibold text-green-400 text-sm sm:text-base">Layer 4 - Transport</h4>
              <p className="text-gray-300 text-xs sm:text-sm mt-1">End-to-end delivery, error recovery (TCP, UDP)</p>
            </div>
            <div className="bg-gray-700/50 border border-gray-600 p-3 sm:p-4 rounded-lg border-l-4 border-blue-400">
              <h4 className="font-semibold text-blue-400 text-sm sm:text-base">Layer 3 - Network</h4>
              <p className="text-gray-300 text-xs sm:text-sm mt-1">Routing, logical addressing (IP)</p>
            </div>
            <div className="bg-gray-700/50 border border-gray-600 p-3 sm:p-4 rounded-lg border-l-4 border-indigo-400">
              <h4 className="font-semibold text-indigo-400 text-sm sm:text-base">Layer 2 - Data Link</h4>
              <p className="text-gray-300 text-xs sm:text-sm mt-1">Frame formatting, error detection (Ethernet)</p>
            </div>
            <div className="bg-gray-700/50 border border-gray-600 p-3 sm:p-4 rounded-lg border-l-4 border-purple-400">
              <h4 className="font-semibold text-purple-400 text-sm sm:text-base">Layer 1 - Physical</h4>
              <p className="text-gray-300 text-xs sm:text-sm mt-1">Electrical signals, cables, hardware</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-green-400 mb-3 sm:mb-4">Memory Aid</h2>
          <div className="bg-gray-700/50 border border-gray-600 p-3 sm:p-4 rounded-lg">
            <p className="text-white font-mono text-base sm:text-lg text-center">
              <strong>Please Do Not Throw Sausage Pizza Away</strong>
            </p>
            <p className="text-gray-300 text-xs sm:text-sm text-center mt-2">
              Physical → Data Link → Network → Transport → Session → Presentation → Application
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OSIModel;
