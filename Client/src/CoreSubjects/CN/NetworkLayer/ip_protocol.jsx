import React from 'react';

const IpProtocol = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4 border-l-4 border-blue-500 pl-4">IP Protocol</h1>
        <p className="text-lg text-gray-300 leading-relaxed">
          Internet Protocol (IP) is the fundamental protocol of the Internet that handles addressing and routing of packets between networks.
        </p>
      </div>

      <div className="space-y-8">
        {/* IP Overview */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-blue-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
            IP Protocol Overview
          </h2>
          <div className="space-y-4">
            <p className="text-gray-300">
              IP is a connectionless, best-effort delivery protocol that operates at the Network Layer (Layer 3) of the OSI model.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-blue-300 mb-2">Key Features</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li>Connectionless service</li>
                  <li>Best-effort delivery</li>
                  <li>Packet fragmentation</li>
                  <li>Logical addressing</li>
                </ul>
              </div>
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-blue-300 mb-2">Functions</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li>Addressing and identification</li>
                  <li>Routing between networks</li>
                  <li>Packet forwarding</li>
                  <li>Fragmentation and reassembly</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* IPv4 Header */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-green-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-green-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            IPv4 Header Structure
          </h2>
          <div className="space-y-4">
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                <pre className="whitespace-pre">
{`0                   1                   2                   3
0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|Version|  IHL  |Type of Service|          Total Length         |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|         Identification        |Flags|      Fragment Offset    |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|  Time to Live |    Protocol   |         Header Checksum       |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                       Source Address                          |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Destination Address                        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Options                    |    Padding    |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+`}
                </pre>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-green-300 mb-3">Header Fields (Part 1)</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li><strong>Version (4 bits):</strong> IP version (4 or 6)</li>
                  <li><strong>IHL (4 bits):</strong> Internet Header Length</li>
                  <li><strong>Type of Service (8 bits):</strong> QoS parameters</li>
                  <li><strong>Total Length (16 bits):</strong> Packet size</li>
                  <li><strong>Identification (16 bits):</strong> Fragment ID</li>
                </ul>
              </div>
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-green-300 mb-3">Header Fields (Part 2)</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li><strong>Flags (3 bits):</strong> Control flags</li>
                  <li><strong>Fragment Offset (13 bits):</strong> Fragment position</li>
                  <li><strong>TTL (8 bits):</strong> Time to Live</li>
                  <li><strong>Protocol (8 bits):</strong> Next layer protocol</li>
                  <li><strong>Checksum (16 bits):</strong> Header integrity</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* IPv4 vs IPv6 */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-purple-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
            IPv4 vs IPv6 Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm bg-gray-900/50 rounded shadow border border-gray-600/30">
              <thead className="bg-gray-800/80">
                <tr>
                  <th className="p-3 text-left text-gray-200">Feature</th>
                  <th className="p-3 text-left text-gray-200">IPv4</th>
                  <th className="p-3 text-left text-gray-200">IPv6</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-t border-gray-600/50">
                  <td className="p-3 font-semibold text-purple-400">Address Length</td>
                  <td className="p-3">32 bits</td>
                  <td className="p-3">128 bits</td>
                </tr>
                <tr className="border-t border-gray-600/50">
                  <td className="p-3 font-semibold text-purple-400">Address Space</td>
                  <td className="p-3">~4.3 billion</td>
                  <td className="p-3">~3.4 × 10³⁸</td>
                </tr>
                <tr className="border-t border-gray-600/50">
                  <td className="p-3 font-semibold text-purple-400">Header Size</td>
                  <td className="p-3">20-60 bytes</td>
                  <td className="p-3">40 bytes (fixed)</td>
                </tr>
                <tr className="border-t border-gray-600/50">
                  <td className="p-3 font-semibold text-purple-400">Fragmentation</td>
                  <td className="p-3">Router & sender</td>
                  <td className="p-3">Sender only</td>
                </tr>
                <tr className="border-t border-gray-600/50">
                  <td className="p-3 font-semibold text-purple-400">Security</td>
                  <td className="p-3">Optional (IPSec)</td>
                  <td className="p-3">Built-in (IPSec)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* IP Fragmentation */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-yellow-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-yellow-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
            IP Fragmentation
          </h2>
          <div className="space-y-4">
            <p className="text-gray-300">
              When a packet is larger than the Maximum Transmission Unit (MTU) of a network link, it must be fragmented.
            </p>
            
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-yellow-300 mb-3">Fragmentation Process</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                <pre className="whitespace-pre">
{`Original Packet (1500 bytes):
[Header|Data 1480 bytes]

After Fragmentation (MTU = 576):
Fragment 1: [Header|Data 556 bytes] MF=1, Offset=0
Fragment 2: [Header|Data 556 bytes] MF=1, Offset=556
Fragment 3: [Header|Data 368 bytes] MF=0, Offset=1112

MF = More Fragments flag
Offset = Position in original packet (in 8-byte units)`}
                </pre>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-yellow-300 mb-2">Fragmentation Rules</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li>All fragments except last have MF=1</li>
                  <li>Fragment size must be multiple of 8</li>
                  <li>Same identification field</li>
                  <li>Offset indicates position</li>
                </ul>
              </div>
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-yellow-300 mb-2">Reassembly Process</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li>Destination reassembles fragments</li>
                  <li>Uses identification and offset</li>
                  <li>Timer for incomplete packets</li>
                  <li>Discard if timeout occurs</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* IP Routing */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-red-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-red-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
            IP Routing Process
          </h2>
          <div className="space-y-4">
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-red-300 mb-3">Routing Algorithm</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                <pre className="whitespace-pre">
{`1. Extract destination IP from packet
2. Check if destination is on local network
   - If yes: deliver directly (ARP for MAC)
   - If no: forward to router
3. Consult routing table:
   - Longest prefix match
   - Default route if no match
4. Forward packet to next hop
5. Decrement TTL, recalculate checksum
6. Repeat until destination reached`}
                </pre>
              </div>
            </div>

            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-red-300 mb-2">Routing Table Example</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-xs bg-gray-900 rounded border border-gray-700">
                  <thead className="bg-gray-800">
                    <tr>
                      <th className="p-2 text-left text-gray-200">Destination</th>
                      <th className="p-2 text-left text-gray-200">Netmask</th>
                      <th className="p-2 text-left text-gray-200">Gateway</th>
                      <th className="p-2 text-left text-gray-200">Interface</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-t border-gray-700">
                      <td className="p-2">192.168.1.0</td>
                      <td className="p-2">255.255.255.0</td>
                      <td className="p-2">0.0.0.0</td>
                      <td className="p-2">eth0</td>
                    </tr>
                    <tr className="border-t border-gray-700">
                      <td className="p-2">10.0.0.0</td>
                      <td className="p-2">255.0.0.0</td>
                      <td className="p-2">192.168.1.1</td>
                      <td className="p-2">eth0</td>
                    </tr>
                    <tr className="border-t border-gray-700">
                      <td className="p-2">0.0.0.0</td>
                      <td className="p-2">0.0.0.0</td>
                      <td className="p-2">192.168.1.1</td>
                      <td className="p-2">eth0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default IpProtocol;
