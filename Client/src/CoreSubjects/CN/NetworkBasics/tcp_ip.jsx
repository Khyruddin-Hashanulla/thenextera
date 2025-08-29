import React from 'react';

const TcpIp = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4 border-l-4 border-blue-500 pl-4">TCP/IP Model</h1>
        <p className="text-lg text-gray-300 leading-relaxed">
          The TCP/IP model is a practical networking framework that forms the foundation of the modern Internet, 
          consisting of four layers that handle different aspects of network communication.
        </p>
      </div>

      <div className="space-y-8">
        {/* Overview */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-blue-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
            TCP/IP Layers
          </h2>
          <div className="space-y-4">
            <div className="bg-gray-900/50 border border-gray-600/30 p-4 rounded-lg border-l-4 border-red-400">
              <h4 className="font-semibold text-red-400 mb-2">Layer 4 - Application</h4>
              <p className="text-gray-300 text-sm">User applications and network services (HTTP, FTP, SMTP, DNS)</p>
            </div>
            <div className="bg-gray-900/50 border border-gray-600/30 p-4 rounded-lg border-l-4 border-green-400">
              <h4 className="font-semibold text-green-400 mb-2">Layer 3 - Transport</h4>
              <p className="text-gray-300 text-sm">End-to-end communication and reliability (TCP, UDP)</p>
            </div>
            <div className="bg-gray-900/50 border border-gray-600/30 p-4 rounded-lg border-l-4 border-blue-400">
              <h4 className="font-semibold text-blue-400 mb-2">Layer 2 - Internet</h4>
              <p className="text-gray-300 text-sm">Routing and logical addressing (IP, ICMP, ARP)</p>
            </div>
            <div className="bg-gray-900/50 border border-gray-600/30 p-4 rounded-lg border-l-4 border-purple-400">
              <h4 className="font-semibold text-purple-400 mb-2">Layer 1 - Network Access</h4>
              <p className="text-gray-300 text-sm">Physical transmission and data link (Ethernet, WiFi)</p>
            </div>
          </div>
        </section>

        {/* Comparison with OSI */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-green-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-green-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            TCP/IP vs OSI Model
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm bg-gray-900/50 rounded shadow border border-gray-600/30">
              <thead className="bg-gray-800/80">
                <tr>
                  <th className="p-3 text-left text-gray-200">TCP/IP Layer</th>
                  <th className="p-3 text-left text-gray-200">OSI Equivalent</th>
                  <th className="p-3 text-left text-gray-200">Function</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-t border-gray-600/50">
                  <td className="p-3 font-semibold text-red-400">Application</td>
                  <td className="p-3">Application, Presentation, Session</td>
                  <td className="p-3">User interface and services</td>
                </tr>
                <tr className="border-t border-gray-600/50">
                  <td className="p-3 font-semibold text-green-400">Transport</td>
                  <td className="p-3">Transport</td>
                  <td className="p-3">End-to-end delivery</td>
                </tr>
                <tr className="border-t border-gray-600/50">
                  <td className="p-3 font-semibold text-blue-400">Internet</td>
                  <td className="p-3">Network</td>
                  <td className="p-3">Routing and addressing</td>
                </tr>
                <tr className="border-t border-gray-600/50">
                  <td className="p-3 font-semibold text-purple-400">Network Access</td>
                  <td className="p-3">Data Link, Physical</td>
                  <td className="p-3">Physical transmission</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Key Protocols */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-purple-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
            Key Protocols
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-purple-300 mb-3">Transport Layer</h4>
              <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                <li><strong>TCP:</strong> Reliable, connection-oriented</li>
                <li><strong>UDP:</strong> Fast, connectionless</li>
                <li><strong>SCTP:</strong> Stream control</li>
              </ul>
            </div>
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-purple-300 mb-3">Internet Layer</h4>
              <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                <li><strong>IP:</strong> Internet Protocol</li>
                <li><strong>ICMP:</strong> Error reporting</li>
                <li><strong>ARP:</strong> Address resolution</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TcpIp;
