import React from 'react';

const FlowControl = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4 border-l-4 border-blue-500 pl-4">Flow Control</h1>
        <p className="text-lg text-gray-300 leading-relaxed">
          Flow control mechanisms ensure that a fast sender does not overwhelm a slow receiver by regulating the rate of data transmission.
        </p>
      </div>

      <div className="space-y-8">
        {/* Basic Concepts */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-blue-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
            Flow Control Fundamentals
          </h2>
          <div className="space-y-4">
            <p className="text-gray-300">
              Flow control is necessary because sender and receiver may operate at different speeds
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 p-4 rounded shadow border border-gray-600/30">
                <h3 className="font-semibold text-blue-300 mb-2">Without Flow Control</h3>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li>Buffer overflow at receiver</li>
                  <li>Data loss and corruption</li>
                  <li>Inefficient resource utilization</li>
                  <li>Poor network performance</li>
                </ul>
              </div>
              
              <div className="bg-gray-900/50 p-4 rounded shadow border border-gray-600/30">
                <h3 className="font-semibold text-blue-300 mb-2">With Flow Control</h3>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li>Prevents buffer overflow</li>
                  <li>Ensures reliable data delivery</li>
                  <li>Optimizes bandwidth usage</li>
                  <li>Maintains system stability</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Stop-and-Wait */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-green-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-green-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            Stop-and-Wait Protocol
          </h2>
          
          <div className="space-y-4">
            <p className="text-gray-300">Simplest flow control mechanism where sender waits for acknowledgment before sending next frame</p>
            
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-green-300 mb-3">Protocol Operation</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                <pre className="whitespace-pre">
{`Sender:
1. Send frame
2. Start timer
3. Wait for ACK
4. If ACK received: send next frame
5. If timeout: retransmit frame

Receiver:
1. Receive frame
2. Check for errors
3. If no error: send ACK
4. If error: discard frame (no ACK)`}
                </pre>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 p-4 rounded border-l-2 border-green-400">
                <h4 className="font-semibold text-green-300 mb-2">Advantages</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li>Simple to implement</li>
                  <li>Low memory requirements</li>
                  <li>Reliable data delivery</li>
                  <li>Easy error recovery</li>
                </ul>
              </div>
              
              <div className="bg-gray-900/50 p-4 rounded border-l-2 border-red-400">
                <h4 className="font-semibold text-red-300 mb-2">Disadvantages</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li>Poor bandwidth utilization</li>
                  <li>High latency impact</li>
                  <li>Inefficient for long delays</li>
                  <li>Single frame in transit</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-green-300 mb-2">Efficiency Calculation</h4>
              <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs border border-gray-700">
                <pre className="whitespace-pre">
{`Efficiency = Transmission Time / (Transmission Time + 2 × Propagation Time)
           = Tt / (Tt + 2 × Tp)
           = 1 / (1 + 2a)  where a = Tp/Tt`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Sliding Window */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-purple-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
            Sliding Window Protocol
          </h2>
          
          <div className="space-y-4">
            <p className="text-gray-300">Advanced flow control allowing multiple frames in transit simultaneously</p>
            
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-purple-300 mb-3">Window Concept</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                <pre className="whitespace-pre">
{`Sender Window: [0][1][2][3][4] ... [W-1]
               ↑              ↑
            Send_base    Next_seq_num

Receiver Window: [0][1][2][3][4] ... [W-1]
                 ↑
              Rcv_base

Window slides as frames are acknowledged`}
                </pre>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-900/50 p-4 rounded border-l-2 border-purple-400">
                <h4 className="font-semibold text-purple-300 mb-3">Go-Back-N (GBN)</h4>
                <p className="text-gray-300 text-sm mb-2">Sender can transmit up to N frames without waiting for ACK</p>
                <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs border border-gray-700">
                  <pre className="whitespace-pre">
{`Sender:
- Maintains window of size N
- Sends frames 0, 1, 2, ..., N-1
- If timeout for frame i: retransmit i, i+1, ..., N-1

Receiver:
- Only accepts frames in order
- Discards out-of-order frames
- Sends cumulative ACK for last correctly received frame`}
                  </pre>
                </div>
              </div>
              
              <div className="bg-gray-900/50 p-4 rounded border-l-2 border-purple-400">
                <h4 className="font-semibold text-purple-300 mb-3">Selective Repeat (SR)</h4>
                <p className="text-gray-300 text-sm mb-2">Receiver accepts out-of-order frames within window</p>
                <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs border border-gray-700">
                  <pre className="whitespace-pre">
{`Sender:
- Maintains individual timers for each frame
- Retransmits only timed-out frames
- More complex but efficient

Receiver:
- Buffers out-of-order frames
- Sends individual ACKs for each frame
- Delivers frames to upper layer in order`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Window Size Considerations */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-yellow-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-yellow-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
            Window Size Optimization
          </h2>
          
          <div className="space-y-4">
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-yellow-300 mb-3">Optimal Window Size</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                <pre className="whitespace-pre">
{`For 100% efficiency:
Window Size ≥ 1 + 2a

Where:
a = Propagation delay / Transmission delay
  = (Distance / Speed) / (Frame size / Bandwidth)

Example:
Distance = 3000 km, Speed = 2×10⁸ m/s
Frame size = 1000 bits, Bandwidth = 1 Mbps

Tp = 3×10⁶ / 2×10⁸ = 0.015 s
Tt = 1000 / 10⁶ = 0.001 s
a = 0.015 / 0.001 = 15

Optimal window size = 1 + 2×15 = 31 frames`}
                </pre>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-yellow-300 mb-2">Small Window Size</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li>Underutilized bandwidth</li>
                  <li>Poor efficiency</li>
                  <li>Frequent waiting periods</li>
                  <li>Lower memory usage</li>
                </ul>
              </div>
              
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-yellow-300 mb-2">Large Window Size</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li>Better bandwidth utilization</li>
                  <li>Higher memory requirements</li>
                  <li>Complex error recovery</li>
                  <li>Potential buffer overflow</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Error Recovery */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-red-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-red-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
            Error Recovery Mechanisms
          </h2>
          
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-red-300 mb-3">Timeout-based Recovery</h4>
                <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs border border-gray-700">
                  <pre className="whitespace-pre">
{`if (timer_expires) {
    retransmit_frame();
    restart_timer();
}

Timeout value = 2 × RTT + processing delay`}
                  </pre>
                </div>
                <p className="text-gray-300 text-sm mt-2">Used when ACK is lost or delayed</p>
              </div>
              
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-red-300 mb-3">NAK-based Recovery</h4>
                <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs border border-gray-700">
                  <pre className="whitespace-pre">
{`if (frame_error_detected) {
    send_NAK(frame_number);
}

// Sender retransmits immediately
if (NAK_received) {
    retransmit_frame(frame_number);
}`}
                  </pre>
                </div>
                <p className="text-gray-300 text-sm mt-2">Faster recovery for detected errors</p>
              </div>
            </div>
          </div>
        </section>

        {/* Real-world Implementations */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-indigo-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-indigo-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
            Real-world Implementations
          </h2>
          
          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-indigo-300 mb-2">TCP</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li>Sliding window protocol</li>
                  <li>Adaptive window sizing</li>
                  <li>Congestion control</li>
                  <li>Selective acknowledgment</li>
                </ul>
              </div>
              
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-indigo-300 mb-2">HDLC</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li>Go-Back-N protocol</li>
                  <li>7-bit sequence numbers</li>
                  <li>Window size up to 127</li>
                  <li>Point-to-point links</li>
                </ul>
              </div>
              
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-indigo-300 mb-2">802.11 WiFi</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li>Stop-and-wait for unicast</li>
                  <li>No ACK for broadcast</li>
                  <li>RTS/CTS for flow control</li>
                  <li>Block acknowledgment</li>
                </ul>
              </div>
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
                  <th className="p-3 text-left text-gray-200">Efficiency</th>
                  <th className="p-3 text-left text-gray-200">Memory Usage</th>
                  <th className="p-3 text-left text-gray-200">Complexity</th>
                  <th className="p-3 text-left text-gray-200">Error Recovery</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-t border-gray-600/50">
                  <td className="p-3 font-semibold text-green-400">Stop-and-Wait</td>
                  <td className="p-3">1/(1+2a)</td>
                  <td className="p-3">Low</td>
                  <td className="p-3">Simple</td>
                  <td className="p-3">Timeout only</td>
                </tr>
                <tr className="border-t border-gray-600/50">
                  <td className="p-3 font-semibold text-purple-400">Go-Back-N</td>
                  <td className="p-3">N/(1+2a)</td>
                  <td className="p-3">Medium</td>
                  <td className="p-3">Medium</td>
                  <td className="p-3">Retransmit all</td>
                </tr>
                <tr className="border-t border-gray-600/50">
                  <td className="p-3 font-semibold text-yellow-400">Selective Repeat</td>
                  <td className="p-3">N/(1+2a)</td>
                  <td className="p-3">High</td>
                  <td className="p-3">Complex</td>
                  <td className="p-3">Selective retransmit</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 text-sm text-gray-400">
            <strong>Note:</strong> N = window size, a = propagation delay / transmission delay
          </div>
        </section>
      </div>
    </div>
  );
};

export default FlowControl;
