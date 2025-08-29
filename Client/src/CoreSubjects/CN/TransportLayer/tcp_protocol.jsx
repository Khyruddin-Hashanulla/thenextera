import React from 'react';

const TCPProtocol = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4 border-l-4 border-blue-500 pl-4">TCP PROTOCOL</h1>
        <p className="text-lg text-gray-300 leading-relaxed">
          TRANSMISSION CONTROL PROTOCOL (TCP) IS A RELIABLE, CONNECTION-ORIENTED TRANSPORT PROTOCOL THAT ENSURES ORDERED AND ERROR-FREE DELIVERY OF DATA BETWEEN APPLICATIONS.
        </p>
      </div>

      <div className="space-y-8">
        {/* TCP Overview */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-blue-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
            TCP CHARACTERISTICS
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-blue-300 mb-2">KEY FEATURES</h4>
              <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                <li>CONNECTION-ORIENTED PROTOCOL</li>
                <li>RELIABLE DATA DELIVERY</li>
                <li>ERROR DETECTION AND CORRECTION</li>
                <li>FLOW CONTROL MECHANISM</li>
                <li>CONGESTION CONTROL</li>
                <li>FULL-DUPLEX COMMUNICATION</li>
              </ul>
            </div>
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-blue-300 mb-2">SERVICES PROVIDED</h4>
              <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                <li>STREAM-ORIENTED DATA TRANSFER</li>
                <li>ORDERED DATA DELIVERY</li>
                <li>DUPPLICATE ELIMINATION</li>
                <li>CONNECTION MANAGEMENT</li>
                <li>MULTIPLEXING VIA PORT NUMBERS</li>
                <li>BUFFERING AND SEGMENTATION</li>
              </ul>
            </div>
          </div>
        </section>

        {/* TCP Header */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-green-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-green-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            TCP HEADER STRUCTURE
          </h2>
          <div className="space-y-4">
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                <pre className="whitespace-pre">
{`0                   1                   2                   3
0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|          SOURCE PORT          |       DESTINATION PORT       |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                        SEQUENCE NUMBER                        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    ACKNOWLEDGMENT NUMBER                      |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|  DATA |           |U|A|P|R|S|F|                               |
| OFFSET| RESERVED  |R|C|S|S|Y|I|            WINDOW             |
|       |           |G|K|H|T|N|N|                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|           CHECKSUM            |         URGENT POINTER        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    OPTIONS                    |    PADDING    |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+`}
                </pre>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-green-300 mb-3">HEADER FIELDS (PART 1)</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li><strong>SOURCE PORT (16 BITS):</strong> SENDING APPLICATION</li>
                  <li><strong>DESTINATION PORT (16 BITS):</strong> RECEIVING APPLICATION</li>
                  <li><strong>SEQUENCE NUMBER (32 BITS):</strong> DATA ORDERING</li>
                  <li><strong>ACK NUMBER (32 BITS):</strong> NEXT EXPECTED BYTE</li>
                  <li><strong>DATA OFFSET (4 BITS):</strong> HEADER LENGTH</li>
                </ul>
              </div>
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-green-300 mb-3">CONTROL FLAGS</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li><strong>URG:</strong> URGENT POINTER VALID</li>
                  <li><strong>ACK:</strong> ACKNOWLEDGMENT VALID</li>
                  <li><strong>PSH:</strong> PUSH DATA IMMEDIATELY</li>
                  <li><strong>RST:</strong> RESET CONNECTION</li>
                  <li><strong>SYN:</strong> SYNCHRONIZE SEQUENCE NUMBERS</li>
                  <li><strong>FIN:</strong> FINISH CONNECTION</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* TCP Connection Management */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-purple-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
            CONNECTION MANAGEMENT
          </h2>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-purple-300 mb-3">THREE-WAY HANDSHAKE (CONNECTION ESTABLISHMENT)</h4>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                  <pre className="whitespace-pre">
{`CLIENT                    SERVER
  |                         |
  |  SYN (SEQ=X)           |
  |----------------------->|
  |                         |
  |  SYN+ACK (SEQ=Y,ACK=X+1)|
  |<-----------------------|
  |                         |
  |  ACK (SEQ=X+1,ACK=Y+1) |
  |----------------------->|
  |                         |
  |   CONNECTION ESTABLISHED |`}
                  </pre>
                </div>
              </div>
              
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-purple-300 mb-3">FOUR-WAY HANDSHAKE (CONNECTION TERMINATION)</h4>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                  <pre className="whitespace-pre">
{`CLIENT                    SERVER
  |                         |
  |  FIN (SEQ=X)           |
  |----------------------->|
  |                         |
  |  ACK (ACK=X+1)         |
  |<-----------------------|
  |                         |
  |  FIN (SEQ=Y)           |
  |<-----------------------|
  |                         |
  |  ACK (ACK=Y+1)         |
  |----------------------->|
  |                         |
  |   CONNECTION CLOSED     |`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TCP State Diagram */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-yellow-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-yellow-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
            TCP STATE TRANSITIONS
          </h2>
          <div className="space-y-4">
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-yellow-300 mb-3">CONNECTION STATES</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="bg-gray-800 p-2 rounded text-sm">
                    <span className="font-semibold text-yellow-400">CLOSED:</span>
                    <span className="text-gray-300 ml-2">NO CONNECTION</span>
                  </div>
                  <div className="bg-gray-800 p-2 rounded text-sm">
                    <span className="font-semibold text-yellow-400">LISTEN:</span>
                    <span className="text-gray-300 ml-2">WAITING FOR CONNECTION</span>
                  </div>
                  <div className="bg-gray-800 p-2 rounded text-sm">
                    <span className="font-semibold text-yellow-400">SYN-SENT:</span>
                    <span className="text-gray-300 ml-2">SYN SENT, WAITING FOR SYN-ACK</span>
                  </div>
                  <div className="bg-gray-800 p-2 rounded text-sm">
                    <span className="font-semibold text-yellow-400">SYN-RECEIVED:</span>
                    <span className="text-gray-300 ml-2">SYN RECEIVED, WAITING FOR ACK</span>
                  </div>
                  <div className="bg-gray-800 p-2 rounded text-sm">
                    <span className="font-semibold text-yellow-400">ESTABLISHED:</span>
                    <span className="text-gray-300 ml-2">CONNECTION ACTIVE</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="bg-gray-800 p-2 rounded text-sm">
                    <span className="font-semibold text-yellow-400">FIN-WAIT-1:</span>
                    <span className="text-gray-300 ml-2">FIN SENT, WAITING FOR ACK</span>
                  </div>
                  <div className="bg-gray-800 p-2 rounded text-sm">
                    <span className="font-semibold text-yellow-400">FIN-WAIT-2:</span>
                    <span className="text-gray-300 ml-2">WAITING FOR REMOTE FIN</span>
                  </div>
                  <div className="bg-gray-800 p-2 rounded text-sm">
                    <span className="font-semibold text-yellow-400">CLOSE-WAIT:</span>
                    <span className="text-gray-300 ml-2">REMOTE FIN RECEIVED</span>
                  </div>
                  <div className="bg-gray-800 p-2 rounded text-sm">
                    <span className="font-semibold text-yellow-400">LAST-ACK:</span>
                    <span className="text-gray-300 ml-2">WAITING FOR FINAL ACK</span>
                  </div>
                  <div className="bg-gray-800 p-2 rounded text-sm">
                    <span className="font-semibold text-yellow-400">TIME-WAIT:</span>
                    <span className="text-gray-300 ml-2">WAITING FOR 2MSL TIMEOUT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Flow Control */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-red-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-red-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
            FLOW CONTROL (SLIDING WINDOW)
          </h2>
          <div className="space-y-4">
            <p className="text-gray-300">
              TCP USES A SLIDING WINDOW MECHANISM TO CONTROL THE FLOW OF DATA AND PREVENT BUFFER OVERFLOW AT THE RECEIVER.
            </p>
            
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-red-300 mb-3">SLIDING WINDOW OPERATION</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                <pre className="whitespace-pre">
{`SENDER WINDOW:
[1][2][3][4][5][6][7][8][9][10]
 ^           ^               ^
 |           |               |
SENT &    SENT BUT        CAN SEND
ACKED     NOT ACKED       (WINDOW SIZE)

RECEIVER WINDOW:
[1][2][3][4][5][6][7][8][9][10]
 ^           ^               ^
 |           |               |
RECEIVED  NEXT EXPECTED   BUFFER SPACE
& ACKED   SEQUENCE NUMBER  (WINDOW SIZE)`}
                </pre>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-red-300 mb-2">WINDOW SIZE FACTORS</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li>RECEIVER BUFFER SPACE</li>
                  <li>NETWORK CONGESTION</li>
                  <li>PROCESSING CAPACITY</li>
                  <li>APPLICATION READ RATE</li>
                </ul>
              </div>
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-red-300 mb-2">WINDOW MANAGEMENT</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li>DYNAMIC WINDOW SIZING</li>
                  <li>ZERO WINDOW ADVERTISEMENT</li>
                  <li>WINDOW SCALING OPTION</li>
                  <li>SILLY WINDOW SYNDROME PREVENTION</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Error Recovery */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-indigo-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-indigo-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
            ERROR DETECTION AND RECOVERY
          </h2>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-indigo-300 mb-3">TIMEOUT AND RETRANSMISSION</h4>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                  <pre className="whitespace-pre">
{`RTO CALCULATION:
SRTT = (1-α) × SRTT + α × RTT
RTTVAR = (1-β) × RTTVAR + β × |RTT - SRTT|
RTO = SRTT + 4 × RTTVAR

WHERE:
α = 1/8, β = 1/4
SRTT = SMOOTHED RTT
RTTVAR = RTT VARIATION`}
                  </pre>
                </div>
              </div>
              
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-indigo-300 mb-3">FAST RETRANSMIT</h4>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                  <pre className="whitespace-pre">
{`SENDER                 RECEIVER
  |  SEGMENT 1            |
  |--------------------->|
  |  SEGMENT 2 (LOST)     |
  |---X                   |
  |  SEGMENT 3            |
  |--------------------->|
  |     ACK 1             |
  |<---------------------|
  |  SEGMENT 4            |
  |--------------------->|
  |     ACK 1 (DUP)       |
  |<---------------------|
  |  SEGMENT 5            |
  |--------------------->|
  |     ACK 1 (DUP)       |
  |<---------------------|
  |     ACK 1 (DUP)       |
  |<---------------------|
  |  RETRANSMIT SEG 2     |
  |--------------------->|`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TCP Options */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-orange-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-orange-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
            TCP OPTIONS
          </h2>
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm bg-gray-900/50 rounded shadow border border-gray-600/30">
                <thead className="bg-gray-800/80">
                  <tr>
                    <th className="p-3 text-left text-gray-200">OPTION</th>
                    <th className="p-3 text-left text-gray-200">LENGTH</th>
                    <th className="p-3 text-left text-gray-200">PURPOSE</th>
                    <th className="p-3 text-left text-gray-200">USAGE</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-t border-gray-600/50">
                    <td className="p-3 font-semibold text-orange-400">MSS</td>
                    <td className="p-3">4 BYTES</td>
                    <td className="p-3">MAXIMUM SEGMENT SIZE</td>
                    <td className="p-3">SYN SEGMENTS ONLY</td>
                  </tr>
                  <tr className="border-t border-gray-600/50">
                    <td className="p-3 font-semibold text-orange-400">WINDOW SCALE</td>
                    <td className="p-3">3 BYTES</td>
                    <td className="p-3">SCALE WINDOW SIZE</td>
                    <td className="p-3">SYN SEGMENTS ONLY</td>
                  </tr>
                  <tr className="border-t border-gray-600/50">
                    <td className="p-3 font-semibold text-orange-400">SACK PERMITTED</td>
                    <td className="p-3">2 BYTES</td>
                    <td className="p-3">ENABLE SELECTIVE ACK</td>
                    <td className="p-3">SYN SEGMENTS ONLY</td>
                  </tr>
                  <tr className="border-t border-gray-600/50">
                    <td className="p-3 font-semibold text-orange-400">SACK</td>
                    <td className="p-3">VARIABLE</td>
                    <td className="p-3">SELECTIVE ACKNOWLEDGMENT</td>
                    <td className="p-3">DATA SEGMENTS</td>
                  </tr>
                  <tr className="border-t border-gray-600/50">
                    <td className="p-3 font-semibold text-orange-400">TIMESTAMP</td>
                    <td className="p-3">10 BYTES</td>
                    <td className="p-3">RTT MEASUREMENT</td>
                    <td className="p-3">ALL SEGMENTS</td>
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

export default TCPProtocol;
