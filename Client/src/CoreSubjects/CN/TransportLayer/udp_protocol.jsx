import React from 'react';

const UDPProtocol = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4 border-l-4 border-green-500 pl-4">UDP PROTOCOL</h1>
        <p className="text-lg text-gray-300 leading-relaxed">
          User Datagram Protocol (UDP) is a connectionless, unreliable transport protocol that provides fast, low-overhead communication between applications.
        </p>
      </div>

      <div className="space-y-8">
        {/* UDP OVERVIEW */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-blue-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
            UDP CHARACTERISTICS
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-blue-300 mb-2">KEY FEATURES</h4>
              <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                <li>Connectionless protocol</li>
                <li>Unreliable delivery</li>
                <li>No error recovery</li>
                <li>No flow control</li>
                <li>No congestion control</li>
                <li>Minimal overhead</li>
              </ul>
            </div>
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-blue-300 mb-2">ADVANTAGES</h4>
              <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                <li>Fast transmission</li>
                <li>Low latency</li>
                <li>Simple implementation</li>
                <li>Small header size</li>
                <li>No connection setup</li>
                <li>Broadcast/multicast support</li>
              </ul>
            </div>
          </div>
        </section>

        {/* UDP HEADER */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-green-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-green-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            UDP HEADER STRUCTURE
          </h2>
          <div className="space-y-4">
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                <pre className="whitespace-pre">
{`0                   1                   2                   3
0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|          Source Port          |       Destination Port       |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|            Length             |           Checksum            |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                             Data                              |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+`}
                </pre>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-green-300 mb-3">HEADER FIELDS</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li><strong>Source Port (16 bits):</strong> Sending application port</li>
                  <li><strong>Destination Port (16 bits):</strong> Receiving application port</li>
                  <li><strong>Length (16 bits):</strong> UDP header + data length</li>
                  <li><strong>Checksum (16 bits):</strong> Error detection (optional in IPv4)</li>
                </ul>
              </div>
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-green-300 mb-3">HEADER SIZE</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-300 text-sm">
                    <span>UDP Header:</span>
                    <span className="font-semibold text-green-400">8 bytes</span>
                  </div>
                  <div className="flex justify-between text-gray-300 text-sm">
                    <span>TCP Header:</span>
                    <span className="font-semibold text-red-400">20-60 bytes</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-2">
                    UDP has 75% less overhead than TCP minimum
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* UDP VS TCP COMPARISON */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-purple-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
            UDP VS TCP COMPARISON
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm bg-gray-900/50 rounded shadow border border-gray-600/30">
              <thead className="bg-gray-800/80">
                <tr>
                  <th className="p-3 text-left text-gray-200">Feature</th>
                  <th className="p-3 text-left text-gray-200">UDP</th>
                  <th className="p-3 text-left text-gray-200">TCP</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-t border-gray-600/50">
                  <td className="p-3 font-semibold text-purple-400">Connection</td>
                  <td className="p-3 text-green-400">Connectionless</td>
                  <td className="p-3 text-blue-400">Connection-oriented</td>
                </tr>
                <tr className="border-t border-gray-600/50">
                  <td className="p-3 font-semibold text-purple-400">Reliability</td>
                  <td className="p-3 text-red-400">Unreliable</td>
                  <td className="p-3 text-green-400">Reliable</td>
                </tr>
                <tr className="border-t border-gray-600/50">
                  <td className="p-3 font-semibold text-purple-400">Ordering</td>
                  <td className="p-3 text-red-400">No ordering</td>
                  <td className="p-3 text-green-400">Ordered delivery</td>
                </tr>
                <tr className="border-t border-gray-600/50">
                  <td className="p-3 font-semibold text-purple-400">Flow Control</td>
                  <td className="p-3 text-red-400">None</td>
                  <td className="p-3 text-green-400">Yes</td>
                </tr>
                <tr className="border-t border-gray-600/50">
                  <td className="p-3 font-semibold text-purple-400">Error Recovery</td>
                  <td className="p-3 text-red-400">None</td>
                  <td className="p-3 text-green-400">Retransmission</td>
                </tr>
                <tr className="border-t border-gray-600/50">
                  <td className="p-3 font-semibold text-purple-400">Header Size</td>
                  <td className="p-3 text-green-400">8 bytes</td>
                  <td className="p-3 text-yellow-400">20-60 bytes</td>
                </tr>
                <tr className="border-t border-gray-600/50">
                  <td className="p-3 font-semibold text-purple-400">Speed</td>
                  <td className="p-3 text-green-400">Fast</td>
                  <td className="p-3 text-yellow-400">Slower</td>
                </tr>
                <tr className="border-t border-gray-600/50">
                  <td className="p-3 font-semibold text-purple-400">Use Cases</td>
                  <td className="p-3">DNS, DHCP, Streaming</td>
                  <td className="p-3">HTTP, FTP, Email</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* UDP APPLICATIONS */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-yellow-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-yellow-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
            UDP APPLICATIONS
          </h2>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-yellow-300 mb-3">REAL-TIME APPLICATIONS</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li><strong>Video Streaming:</strong> Netflix, YouTube</li>
                  <li><strong>Audio Streaming:</strong> VoIP, music streaming</li>
                  <li><strong>Online Gaming:</strong> Real-time multiplayer games</li>
                  <li><strong>Live Broadcasting:</strong> Sports, news feeds</li>
                </ul>
              </div>
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-yellow-300 mb-3">NETWORK SERVICES</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li><strong>DNS:</strong> Domain name resolution</li>
                  <li><strong>DHCP:</strong> IP address assignment</li>
                  <li><strong>SNMP:</strong> Network management</li>
                  <li><strong>NTP:</strong> Time synchronization</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-yellow-300 mb-3">WHY UDP FOR THESE APPLICATIONS?</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl mb-2">⚡</div>
                  <h5 className="font-semibold text-yellow-400 mb-1">SPEED</h5>
                  <p className="text-gray-300 text-xs">No connection setup delay</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">🎯</div>
                  <h5 className="font-semibold text-yellow-400 mb-1">LOW LATENCY</h5>
                  <p className="text-gray-300 text-xs">Minimal processing overhead</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">📡</div>
                  <h5 className="font-semibold text-yellow-400 mb-1">BROADCAST</h5>
                  <p className="text-gray-300 text-xs">One-to-many communication</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* UDP CHECKSUM */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-red-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-red-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
            UDP CHECKSUM
          </h2>
          <div className="space-y-4">
            <p className="text-gray-300">
              UDP includes an optional checksum for error detection, though it provides no error correction.
            </p>
            
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-red-300 mb-3">CHECKSUM CALCULATION</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                <pre className="whitespace-pre">
{`Pseudo Header (IPv4):
+--------+--------+--------+--------+
|     Source IP Address         |
+--------+--------+--------+--------+
|   Destination IP Address      |
+--------+--------+--------+--------+
|  Zero  |Protocol|  UDP Length   |
+--------+--------+--------+--------+

Checksum = ~(Sum of all 16-bit words)

Steps:
1. Create pseudo header
2. Append UDP header and data
3. Pad to 16-bit boundary if needed
4. Sum all 16-bit words
5. Add carry bits
6. Take one's complement`}
                </pre>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-red-300 mb-2">IPV4 CHECKSUM</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li>Optional (can be zero)</li>
                  <li>If zero, no error checking</li>
                  <li>Covers pseudo header + UDP</li>
                  <li>Detects most errors</li>
                </ul>
              </div>
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-red-300 mb-2">IPV6 CHECKSUM</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li>Mandatory (cannot be zero)</li>
                  <li>Always calculated</li>
                  <li>Uses IPv6 pseudo header</li>
                  <li>Enhanced error detection</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* UDP PROGRAMMING */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-indigo-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-indigo-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
            UDP SOCKET PROGRAMMING
          </h2>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-indigo-300 mb-3">UDP SERVER (PYTHON)</h4>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                  <pre className="whitespace-pre">
{`import socket

# Create UDP socket
server_socket = socket.socket(
    socket.AF_INET, 
    socket.SOCK_DGRAM
)

# Bind to address and port
server_socket.bind(('localhost', 12345))

while True:
    # Receive data
    data, addr = server_socket.recvfrom(1024)
    print(f"Received from {addr}: {data}")
    
    # Send response
    response = "Hello from server"
    server_socket.sendto(
        response.encode(), addr
    )`}
                  </pre>
                </div>
              </div>
              
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-indigo-300 mb-3">UDP CLIENT (PYTHON)</h4>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                  <pre className="whitespace-pre">
{`import socket

# Create UDP socket
client_socket = socket.socket(
    socket.AF_INET, 
    socket.SOCK_DGRAM
)

# Server address
server_addr = ('localhost', 12345)

# Send data
message = "Hello from client"
client_socket.sendto(
    message.encode(), server_addr
)

# Receive response
data, addr = client_socket.recvfrom(1024)
print(f"Received: {data.decode()}")

client_socket.close()`}
                  </pre>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-indigo-300 mb-2">KEY DIFFERENCES FROM TCP SOCKETS</h4>
              <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                <li>Use <code className="text-indigo-400">SOCK_DGRAM</code> instead of <code className="text-indigo-400">SOCK_STREAM</code></li>
                <li>No <code className="text-indigo-400">listen()</code> or <code className="text-indigo-400">accept()</code> calls</li>
                <li>Use <code className="text-indigo-400">sendto()</code> and <code className="text-indigo-400">recvfrom()</code></li>
                <li>Each message includes destination address</li>
                <li>No connection state maintained</li>
              </ul>
            </div>
          </div>
        </section>

        {/* COMMON PORT NUMBERS */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-orange-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-orange-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
            COMMON UDP PORT NUMBERS
          </h2>
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm bg-gray-900/50 rounded shadow border border-gray-600/30">
                <thead className="bg-gray-800/80">
                  <tr>
                    <th className="p-3 text-left text-gray-200">Port</th>
                    <th className="p-3 text-left text-gray-200">Service</th>
                    <th className="p-3 text-left text-gray-200">Description</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-t border-gray-600/50">
                    <td className="p-3 font-semibold text-orange-400">53</td>
                    <td className="p-3">DNS</td>
                    <td className="p-3">Domain Name System queries</td>
                  </tr>
                  <tr className="border-t border-gray-600/50">
                    <td className="p-3 font-semibold text-orange-400">67/68</td>
                    <td className="p-3">DHCP</td>
                    <td className="p-3">Dynamic Host Configuration Protocol</td>
                  </tr>
                  <tr className="border-t border-gray-600/50">
                    <td className="p-3 font-semibold text-orange-400">69</td>
                    <td className="p-3">TFTP</td>
                    <td className="p-3">Trivial File Transfer Protocol</td>
                  </tr>
                  <tr className="border-t border-gray-600/50">
                    <td className="p-3 font-semibold text-orange-400">123</td>
                    <td className="p-3">NTP</td>
                    <td className="p-3">Network Time Protocol</td>
                  </tr>
                  <tr className="border-t border-gray-600/50">
                    <td className="p-3 font-semibold text-orange-400">161/162</td>
                    <td className="p-3">SNMP</td>
                    <td className="p-3">Simple Network Management Protocol</td>
                  </tr>
                  <tr className="border-t border-gray-600/50">
                    <td className="p-3 font-semibold text-orange-400">514</td>
                    <td className="p-3">Syslog</td>
                    <td className="p-3">System logging protocol</td>
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

export default UDPProtocol;
