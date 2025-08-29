import React from 'react';

const CongestionControl = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4 border-l-4 border-blue-500 pl-4">Congestion Control</h1>
        <p className="text-lg text-gray-300 leading-relaxed">
          TCP congestion control mechanisms prevent network congestion by dynamically adjusting the transmission rate based on network conditions and feedback.
        </p>
      </div>

      <div className="space-y-8">
        {/* Overview */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-blue-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
            Congestion Control Overview
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-blue-300 mb-2">Purpose</h4>
              <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                <li>Prevent network collapse</li>
                <li>Ensure fair resource sharing</li>
                <li>Maximize network utilization</li>
                <li>Adapt to changing conditions</li>
                <li>Maintain stability</li>
              </ul>
            </div>
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-blue-300 mb-2">Key Concepts</h4>
              <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                <li>Congestion window (cwnd)</li>
                <li>Slow start threshold (ssthresh)</li>
                <li>Round trip time (RTT)</li>
                <li>Packet loss detection</li>
                <li>Additive increase, multiplicative decrease</li>
              </ul>
            </div>
          </div>
        </section>

        {/* TCP Tahoe */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-green-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-green-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            TCP Tahoe Algorithm
          </h2>
          <div className="space-y-4">
            <p className="text-gray-300">
              The original TCP congestion control algorithm with slow start and congestion avoidance phases.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-green-300 mb-3">Slow Start Phase</h4>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                  <pre className="whitespace-pre">
{`Initial: cwnd = 1 MSS
For each ACK received:
  cwnd = cwnd + 1 MSS

Growth: Exponential (doubles each RTT)
1 → 2 → 4 → 8 → 16 → 32...

Condition: cwnd < ssthresh`}
                  </pre>
                </div>
              </div>
              
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-green-300 mb-3">Congestion Avoidance</h4>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                  <pre className="whitespace-pre">
{`For each ACK received:
  cwnd = cwnd + (1 MSS / cwnd)

Growth: Linear (increases by 1 MSS per RTT)
32 → 33 → 34 → 35 → 36...

Condition: cwnd >= ssthresh`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-green-300 mb-3">Timeout Response</h4>
              <div className="bg-gray-900 text-red-400 p-3 rounded font-mono text-xs border border-gray-700">
                <pre className="whitespace-pre">
{`On timeout:
1. ssthresh = max(cwnd/2, 2 MSS)
2. cwnd = 1 MSS
3. Restart slow start
4. Retransmit lost segment`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* TCP Reno */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-purple-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
            TCP Reno Algorithm
          </h2>
          <div className="space-y-4">
            <p className="text-gray-300">
              Enhanced version of Tahoe with fast retransmit and fast recovery mechanisms.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-purple-300 mb-3">Fast Retransmit</h4>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                  <pre className="whitespace-pre">
{`On receiving 3 duplicate ACKs:
1. Retransmit lost segment immediately
2. Don't wait for timeout
3. Enter fast recovery

Duplicate ACK count:
ACK1 → ACK1 → ACK1 → ACK1
                      ↑
                 Retransmit`}
                  </pre>
                </div>
              </div>
              
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-purple-300 mb-3">Fast Recovery</h4>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                  <pre className="whitespace-pre">
{`On fast retransmit:
1. ssthresh = cwnd / 2
2. cwnd = ssthresh + 3 MSS
3. For each additional dup ACK:
   cwnd = cwnd + 1 MSS
4. On new ACK: cwnd = ssthresh`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-purple-300 mb-3">Reno vs Tahoe Comparison</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm bg-gray-800/50 rounded border border-gray-600/30">
                  <thead className="bg-gray-700/50">
                    <tr>
                      <th className="p-2 text-left text-gray-200">Event</th>
                      <th className="p-2 text-left text-gray-200">Tahoe</th>
                      <th className="p-2 text-left text-gray-200">Reno</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300 text-xs">
                    <tr className="border-t border-gray-600/50">
                      <td className="p-2 font-semibold text-purple-400">3 Dup ACKs</td>
                      <td className="p-2 text-red-400">cwnd = 1, slow start</td>
                      <td className="p-2 text-green-400">Fast retransmit + recovery</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-2 font-semibold text-purple-400">Timeout</td>
                      <td className="p-2 text-red-400">cwnd = 1, slow start</td>
                      <td className="p-2 text-red-400">cwnd = 1, slow start</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Congestion Window Evolution */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-yellow-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-yellow-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
            Congestion Window Evolution
          </h2>
          <div className="space-y-4">
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-yellow-300 mb-3">Typical cwnd Behavior</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                <pre className="whitespace-pre">
{`Time →
cwnd
  ↑
32|     /\\
  |    /  \\
16|   /    \\    /\\
  |  /      \\  /  \\
 8| /        \\/    \\
  |/                \\
 1|__________________|→
  SS   CA   Loss  Recovery

SS = Slow Start
CA = Congestion Avoidance
Loss = Packet Loss Event
Recovery = Fast Recovery (Reno)`}
                </pre>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h5 className="font-semibold text-yellow-400 mb-2">Slow Start</h5>
                <ul className="list-disc list-inside text-gray-300 text-xs space-y-1">
                  <li>Exponential growth</li>
                  <li>cwnd doubles per RTT</li>
                  <li>Probe available bandwidth</li>
                  <li>Continue until ssthresh</li>
                </ul>
              </div>
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h5 className="font-semibold text-yellow-400 mb-2">Congestion Avoidance</h5>
                <ul className="list-disc list-inside text-gray-300 text-xs space-y-1">
                  <li>Linear growth</li>
                  <li>+1 MSS per RTT</li>
                  <li>Conservative approach</li>
                  <li>Maintain stability</li>
                </ul>
              </div>
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h5 className="font-semibold text-yellow-400 mb-2">Loss Recovery</h5>
                <ul className="list-disc list-inside text-gray-300 text-xs space-y-1">
                  <li>Multiplicative decrease</li>
                  <li>cwnd = cwnd / 2</li>
                  <li>Quick response to congestion</li>
                  <li>Prevent network collapse</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Modern Algorithms */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-red-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-red-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
            Modern Congestion Control Algorithms
          </h2>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-red-300 mb-3">TCP NewReno</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li>Improved fast recovery</li>
                  <li>Handles multiple losses better</li>
                  <li>Partial ACK handling</li>
                  <li>More robust than Reno</li>
                </ul>
              </div>
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-red-300 mb-3">TCP SACK</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li>Selective acknowledgments</li>
                  <li>Identifies specific lost segments</li>
                  <li>More efficient recovery</li>
                  <li>Reduces unnecessary retransmissions</li>
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-red-300 mb-3">TCP Vegas</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li>RTT-based congestion detection</li>
                  <li>Proactive approach</li>
                  <li>Avoids packet loss</li>
                  <li>Better for high-speed networks</li>
                </ul>
              </div>
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-red-300 mb-3">TCP Cubic</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li>Cubic window growth function</li>
                  <li>Better for high-bandwidth networks</li>
                  <li>RTT-independent fairness</li>
                  <li>Default in Linux</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* BBR Algorithm */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-indigo-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-indigo-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
            BBR (Bottleneck Bandwidth and RTT)
          </h2>
          <div className="space-y-4">
            <p className="text-gray-300">
              Google's modern congestion control algorithm that focuses on measuring bottleneck bandwidth and RTT instead of packet loss.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-indigo-300 mb-3">Key Principles</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li>Model-based approach</li>
                  <li>Measure bottleneck bandwidth</li>
                  <li>Measure minimum RTT</li>
                  <li>Avoid buffer bloat</li>
                  <li>Maximize throughput</li>
                </ul>
              </div>
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-indigo-300 mb-3">Operating States</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li><strong>Startup:</strong> Find bandwidth</li>
                  <li><strong>Drain:</strong> Empty queues</li>
                  <li><strong>ProbeBW:</strong> Probe for more bandwidth</li>
                  <li><strong>ProbeRTT:</strong> Probe for minimum RTT</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-indigo-300 mb-3">BBR vs Loss-based Algorithms</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm bg-gray-800/50 rounded border border-gray-600/30">
                  <thead className="bg-gray-700/50">
                    <tr>
                      <th className="p-2 text-left text-gray-200">Aspect</th>
                      <th className="p-2 text-left text-gray-200">Loss-based (Reno/Cubic)</th>
                      <th className="p-2 text-left text-gray-200">BBR</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300 text-xs">
                    <tr className="border-t border-gray-600/50">
                      <td className="p-2 font-semibold text-indigo-400">Signal</td>
                      <td className="p-2">Packet loss</td>
                      <td className="p-2">Bandwidth & RTT</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-2 font-semibold text-indigo-400">Buffer usage</td>
                      <td className="p-2">Fills buffers</td>
                      <td className="p-2">Minimizes buffering</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-2 font-semibold text-indigo-400">Latency</td>
                      <td className="p-2">Higher</td>
                      <td className="p-2">Lower</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-2 font-semibold text-indigo-400">Throughput</td>
                      <td className="p-2">Good</td>
                      <td className="p-2">Better</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Fairness and Performance */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-orange-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-orange-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
            Fairness and Performance Metrics
          </h2>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-orange-300 mb-3">Fairness Criteria</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li><strong>Max-min fairness:</strong> Maximize minimum allocation</li>
                  <li><strong>Proportional fairness:</strong> Weighted by utility</li>
                  <li><strong>TCP fairness:</strong> Equal share among flows</li>
                  <li><strong>RTT fairness:</strong> Independent of round-trip time</li>
                </ul>
              </div>
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-orange-300 mb-3">Performance Metrics</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li><strong>Throughput:</strong> Data rate achieved</li>
                  <li><strong>Latency:</strong> End-to-end delay</li>
                  <li><strong>Utilization:</strong> Network resource usage</li>
                  <li><strong>Convergence:</strong> Time to reach steady state</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-orange-300 mb-3">AIMD (Additive Increase, Multiplicative Decrease)</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                <pre className="whitespace-pre">
{`Additive Increase:
cwnd = cwnd + α (typically α = 1 MSS per RTT)

Multiplicative Decrease:
cwnd = cwnd × β (typically β = 0.5)

Properties:
- Converges to fair allocation
- Stable and efficient
- Responsive to congestion`}
                </pre>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CongestionControl;
