import React from 'react';

const NetworkTopologies = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4 border-l-4 border-blue-500 pl-4">Network Topologies</h1>
        <p className="text-lg text-gray-300 leading-relaxed">
          Network topology refers to the physical or logical arrangement of network devices and connections.
          It defines how devices are interconnected and how data flows through the network.
        </p>
      </div>
      
      <div className="space-y-8">
        {/* Common Topologies */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-blue-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
            Common Topologies
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-600/30">
              <h4 className="font-semibold text-blue-300 mb-2">Bus Topology</h4>
              <p className="text-gray-300 text-sm">All devices connected to a single cable. Simple but single point of failure.</p>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-600/30">
              <h4 className="font-semibold text-green-300 mb-2">Star Topology</h4>
              <p className="text-gray-300 text-sm">All devices connected to central hub. Easy to manage and troubleshoot.</p>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-600/30">
              <h4 className="font-semibold text-yellow-300 mb-2">Ring Topology</h4>
              <p className="text-gray-300 text-sm">Devices connected in circular fashion. Data travels in one direction.</p>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-600/30">
              <h4 className="font-semibold text-purple-300 mb-2">Mesh Topology</h4>
              <p className="text-gray-300 text-sm">Every device connected to every other device. Highly redundant.</p>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-600/30">
              <h4 className="font-semibold text-red-300 mb-2">Tree Topology</h4>
              <p className="text-gray-300 text-sm">Hierarchical structure combining bus and star topologies.</p>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-600/30">
              <h4 className="font-semibold text-indigo-300 mb-2">Hybrid Topology</h4>
              <p className="text-gray-300 text-sm">Combination of two or more different topologies.</p>
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-green-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-green-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            Topology Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm bg-gray-900/50 rounded shadow border border-gray-600/30">
              <thead className="bg-gray-800/80">
                <tr>
                  <th className="p-3 text-left text-gray-200">Topology</th>
                  <th className="p-3 text-left text-gray-200">Cost</th>
                  <th className="p-3 text-left text-gray-200">Reliability</th>
                  <th className="p-3 text-left text-gray-200">Scalability</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-t border-gray-600/50">
                  <td className="p-3 font-semibold text-blue-400">Bus</td>
                  <td className="p-3">Low</td>
                  <td className="p-3">Low</td>
                  <td className="p-3">Limited</td>
                </tr>
                <tr className="border-t border-gray-600/50">
                  <td className="p-3 font-semibold text-green-400">Star</td>
                  <td className="p-3">Medium</td>
                  <td className="p-3">High</td>
                  <td className="p-3">Good</td>
                </tr>
                <tr className="border-t border-gray-600/50">
                  <td className="p-3 font-semibold text-purple-400">Mesh</td>
                  <td className="p-3">High</td>
                  <td className="p-3">Very High</td>
                  <td className="p-3">Excellent</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NetworkTopologies;
