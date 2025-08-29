import React from 'react';

const MacProtocols = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4 border-l-4 border-blue-500 pl-4">MAC Protocols</h1>
        <p className="text-lg text-gray-300 leading-relaxed">
          Medium Access Control (MAC) protocols coordinate access to shared communication channels, ensuring efficient and fair resource allocation among multiple users.
        </p>
      </div>

      <div className="space-y-8">
        {/* MAC Protocol Categories */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-blue-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
            MAC Protocol Categories
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-900/50 p-4 rounded shadow border border-gray-600/30">
              <h3 className="font-semibold text-blue-300 mb-2">Random Access</h3>
              <p className="text-gray-300 text-sm mb-2">Nodes transmit whenever they have data</p>
              <ul className="list-disc list-inside text-gray-400 text-xs space-y-1">
                <li>ALOHA</li>
                <li>CSMA/CD</li>
                <li>CSMA/CA</li>
              </ul>
            </div>
            
            <div className="bg-gray-900/50 p-4 rounded shadow border border-gray-600/30">
              <h3 className="font-semibold text-blue-300 mb-2">Controlled Access</h3>
              <p className="text-gray-300 text-sm mb-2">Nodes take turns in orderly fashion</p>
              <ul className="list-disc list-inside text-gray-400 text-xs space-y-1">
                <li>Polling</li>
                <li>Token Ring</li>
                <li>Token Bus</li>
              </ul>
            </div>
            
            <div className="bg-gray-900/50 p-4 rounded shadow border border-gray-600/30">
              <h3 className="font-semibold text-blue-300 mb-2">Channelization</h3>
              <p className="text-gray-300 text-sm mb-2">Channel divided among nodes</p>
              <ul className="list-disc list-inside text-gray-400 text-xs space-y-1">
                <li>TDMA</li>
                <li>FDMA</li>
                <li>CDMA</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ALOHA Protocols */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-green-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-green-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            ALOHA Protocols
          </h2>
          
          <div className="space-y-4">
            <div className="bg-gray-900/50 p-4 rounded border-l-2 border-green-400">
              <h4 className="font-semibold text-green-300 mb-3">Pure ALOHA</h4>
              <p className="text-gray-300 text-sm mb-2">Transmit whenever data is ready, handle collisions by retransmission</p>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                <pre className="whitespace-pre">
{`Algorithm:
1. Transmit frame immediately when ready
2. Wait for acknowledgment
3. If collision detected (no ACK):
   - Wait random time
   - Retransmit

Throughput = G × e^(-2G)
Maximum throughput = 1/(2e) ≈ 0.184 (18.4%)`}
                </pre>
              </div>
            </div>
            
            <div className="bg-gray-900/50 p-4 rounded border-l-2 border-green-400">
              <h4 className="font-semibold text-green-300 mb-3">Slotted ALOHA</h4>
              <p className="text-gray-300 text-sm mb-2">Synchronize transmissions to discrete time slots</p>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                <pre className="whitespace-pre">
{`Algorithm:
1. Wait for next slot boundary
2. Transmit frame at slot beginning
3. If collision occurs:
   - Wait random number of slots
   - Retransmit

Throughput = G × e^(-G)
Maximum throughput = 1/e ≈ 0.368 (36.8%)`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* CSMA Protocols */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-purple-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
            CSMA Protocols
          </h2>
          
          <div className="space-y-4">
            <p className="text-gray-300">Carrier Sense Multiple Access - Listen before transmitting</p>
            
            <div className="bg-gray-900/50 p-4 rounded border-l-2 border-purple-400">
              <h4 className="font-semibold text-purple-300 mb-3">CSMA/CD (Collision Detection)</h4>
              <p className="text-gray-300 text-sm mb-2">Used in Ethernet - detect collisions during transmission</p>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                <pre className="whitespace-pre">
{`Algorithm:
1. Listen to channel (carrier sense)
2. If idle: start transmission
3. If busy: wait until idle, then transmit
4. While transmitting: monitor for collisions
5. If collision detected:
   - Send jam signal
   - Stop transmission
   - Wait random backoff time
   - Retry

Binary Exponential Backoff:
After n collisions, wait random time in [0, 2^n - 1] slot times`}
                </pre>
              </div>
            </div>
            
            <div className="bg-gray-900/50 p-4 rounded border-l-2 border-purple-400">
              <h4 className="font-semibold text-purple-300 mb-3">CSMA/CA (Collision Avoidance)</h4>
              <p className="text-gray-300 text-sm mb-2">Used in WiFi - avoid collisions through coordination</p>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                <pre className="whitespace-pre">
{`Algorithm:
1. Listen to channel
2. If idle for DIFS time: transmit
3. If busy: wait until idle + random backoff
4. Use RTS/CTS for hidden terminal problem:
   - Send RTS (Request to Send)
   - Receive CTS (Clear to Send)
   - Transmit data
   - Receive ACK

Backoff Window:
CW = min(2^n × CWmin, CWmax)
where n = number of retransmissions`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Token-Based Protocols */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-yellow-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-yellow-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
            Token-Based Protocols
          </h2>
          
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-yellow-300 mb-3">Token Ring</h4>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                  <pre className="whitespace-pre">
{`Physical: Ring topology
Logical: Token circulation

Operation:
1. Token circulates around ring
2. Node with data captures token
3. Transmits frame with token
4. Frame travels full ring
5. Sender removes frame, releases token

Advantages:
- No collisions
- Bounded access delay
- Fair access`}
                  </pre>
                </div>
              </div>
              
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-yellow-300 mb-3">Token Bus</h4>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                  <pre className="whitespace-pre">
{`Physical: Bus topology
Logical: Token passing

Operation:
1. Stations form logical ring
2. Token passed station to station
3. Station holds token to transmit
4. Passes token to next station

Features:
- Combines bus physical with ring logical
- Deterministic access
- Priority mechanisms`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Channelization Protocols */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-red-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-red-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
            Channelization Protocols
          </h2>
          
          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-red-300 mb-2">TDMA</h4>
                <p className="text-gray-300 text-sm mb-2">Time Division Multiple Access</p>
                <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs border border-gray-700">
                  <pre className="whitespace-pre">
{`Channel divided into time slots
Each station assigned specific slots
Synchronization required

Example:
Slot 1: Station A
Slot 2: Station B  
Slot 3: Station C
Slot 4: Station A
...`}
                  </pre>
                </div>
              </div>
              
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-red-300 mb-2">FDMA</h4>
                <p className="text-gray-300 text-sm mb-2">Frequency Division Multiple Access</p>
                <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs border border-gray-700">
                  <pre className="whitespace-pre">
{`Channel divided into frequency bands
Each station assigned specific frequency
No time coordination needed

Example:
Station A: 900-910 MHz
Station B: 910-920 MHz
Station C: 920-930 MHz`}
                  </pre>
                </div>
              </div>
              
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-red-300 mb-2">CDMA</h4>
                <p className="text-gray-300 text-sm mb-2">Code Division Multiple Access</p>
                <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs border border-gray-700">
                  <pre className="whitespace-pre">
{`Each station assigned unique code
All stations use same frequency
Spread spectrum technique

Data × Code = Transmitted signal
Received signal × Code = Original data`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WiFi MAC (802.11) */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-indigo-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-indigo-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
            WiFi MAC (802.11)
          </h2>
          
          <div className="space-y-4">
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-indigo-300 mb-3">DCF (Distributed Coordination Function)</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                <pre className="whitespace-pre">
{`Basic Access Method:
1. Sense channel for DIFS period
2. If idle: transmit immediately
3. If busy: wait + random backoff
4. Successful transmission: wait SIFS, send ACK

RTS/CTS Method (for hidden terminals):
1. Send RTS after channel idle + backoff
2. Receive CTS from destination
3. Transmit data frame
4. Receive ACK

Inter-Frame Spaces:
SIFS (Short): 10μs - highest priority
DIFS (DCF): SIFS + 2×slot_time - normal data
EIFS (Extended): longest - after error`}
                </pre>
              </div>
            </div>
            
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-indigo-300 mb-2">Hidden Terminal Problem</h4>
              <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs border border-gray-700">
                <pre className="whitespace-pre">
{`Problem: A and C can't hear each other, both transmit to B
Solution: RTS/CTS handshake

A → B: RTS
B → A,C: CTS (C hears this and defers)
A → B: DATA
B → A: ACK`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Ethernet MAC */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-orange-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-orange-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
            Ethernet MAC
          </h2>
          
          <div className="space-y-4">
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-orange-300 mb-3">CSMA/CD Operation</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                <pre className="whitespace-pre">
{`1. Listen before transmit (Carrier Sense)
2. Transmit if channel idle
3. Monitor for collisions while transmitting
4. If collision detected:
   - Send 32-bit jam sequence
   - Stop transmission
   - Wait random backoff time
   - Retry (up to 16 attempts)

Minimum Frame Size: 64 bytes
- Ensures collision detection
- 2 × propagation delay × bit rate

Maximum Frame Size: 1518 bytes
- Prevents monopolization`}
                </pre>
              </div>
            </div>
            
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-orange-300 mb-2">Modern Ethernet</h4>
              <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                <li><strong>Full-duplex:</strong> No collisions, no CSMA/CD needed</li>
                <li><strong>Switched:</strong> Each port is separate collision domain</li>
                <li><strong>Flow control:</strong> PAUSE frames for congestion control</li>
                <li><strong>Auto-negotiation:</strong> Speed and duplex mode selection</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Performance Comparison */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-gray-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-gray-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-gray-500 rounded-full mr-3"></span>
            Protocol Performance Comparison
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm bg-gray-900/50 rounded shadow border border-gray-600/30">
              <thead className="bg-gray-800/80">
                <tr>
                  <th className="p-3 text-left text-gray-200">Protocol</th>
                  <th className="p-3 text-left text-gray-200">Max Throughput</th>
                  <th className="p-3 text-left text-gray-200">Access Delay</th>
                  <th className="p-3 text-left text-gray-200">Fairness</th>
                  <th className="p-3 text-left text-gray-200">Complexity</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-t border-gray-600/50">
                  <td className="p-3 font-semibold text-green-400">Pure ALOHA</td>
                  <td className="p-3">18.4%</td>
                  <td className="p-3">Low</td>
                  <td className="p-3">Fair</td>
                  <td className="p-3">Very Low</td>
                </tr>
                <tr className="border-t border-gray-600/50">
                  <td className="p-3 font-semibold text-green-400">Slotted ALOHA</td>
                  <td className="p-3">36.8%</td>
                  <td className="p-3">Low</td>
                  <td className="p-3">Fair</td>
                  <td className="p-3">Low</td>
                </tr>
                <tr className="border-t border-gray-600/50">
                  <td className="p-3 font-semibold text-purple-400">CSMA/CD</td>
                  <td className="p-3">~85%</td>
                  <td className="p-3">Variable</td>
                  <td className="p-3">Good</td>
                  <td className="p-3">Medium</td>
                </tr>
                <tr className="border-t border-gray-600/50">
                  <td className="p-3 font-semibold text-yellow-400">Token Ring</td>
                  <td className="p-3">~100%</td>
                  <td className="p-3">Bounded</td>
                  <td className="p-3">Excellent</td>
                  <td className="p-3">High</td>
                </tr>
                <tr className="border-t border-gray-600/50">
                  <td className="p-3 font-semibold text-red-400">TDMA</td>
                  <td className="p-3">~100%</td>
                  <td className="p-3">Fixed</td>
                  <td className="p-3">Perfect</td>
                  <td className="p-3">Medium</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MacProtocols;
