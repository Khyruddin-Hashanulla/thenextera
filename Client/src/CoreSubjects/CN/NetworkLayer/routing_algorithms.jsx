import React from 'react';

const RoutingAlgorithms = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4 border-l-4 border-blue-500 pl-4">Routing Algorithms</h1>
        <p className="text-lg text-gray-300 leading-relaxed">
          Routing algorithms determine the best path for data packets to travel from source to destination across interconnected networks.
        </p>
      </div>

      <div className="space-y-8">
        {/* Classification */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-blue-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
            Algorithm Classification
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-900/50 p-4 rounded shadow border border-gray-600/30">
              <h3 className="font-semibold text-blue-300 mb-2">By Information Source</h3>
              <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                <li><strong className="text-blue-400">Global:</strong> Complete network topology known</li>
                <li><strong className="text-blue-400">Decentralized:</strong> Only local information available</li>
              </ul>
            </div>
            
            <div className="bg-gray-900/50 p-4 rounded shadow border border-gray-600/30">
              <h3 className="font-semibold text-blue-300 mb-2">By Adaptability</h3>
              <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                <li><strong className="text-blue-400">Static:</strong> Routes computed offline, rarely change</li>
                <li><strong className="text-blue-400">Dynamic:</strong> Routes adapt to network changes</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Distance Vector */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-green-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-green-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            Distance Vector Routing
          </h2>
          
          <div className="space-y-4">
            <p className="text-gray-300">Distributed algorithm where each node maintains distance estimates to all destinations</p>
            
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-green-300 mb-3">Bellman-Ford Algorithm</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                <pre className="whitespace-pre">
{`Algorithm:
1. Initialize: distance to self = 0, others = ∞
2. For each neighbor, exchange distance vectors
3. Update distances using Bellman-Ford equation:
   Dx(y) = min{c(x,v) + Dv(y)} for all neighbors v

Example:
Node A's table:
Dest | Cost | Next Hop
  B  |  2   |    B
  C  |  3   |    B  
  D  |  4   |    B

Bellman-Ford: Dx(y) = min over all neighbors v of {c(x,v) + Dv(y)}`}
                </pre>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 p-4 rounded border-l-2 border-green-400">
                <h4 className="font-semibold text-green-300 mb-2">Advantages</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li>Simple to implement</li>
                  <li>Distributed computation</li>
                  <li>Self-correcting</li>
                  <li>Automatic adaptation to failures</li>
                </ul>
              </div>
              
              <div className="bg-gray-900/50 p-4 rounded border-l-2 border-red-400">
                <h4 className="font-semibold text-red-300 mb-2">Disadvantages</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li>Count-to-infinity problem</li>
                  <li>Slow convergence</li>
                  <li>Routing loops possible</li>
                  <li>Poor scalability</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Link State */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-purple-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
            Link State Routing
          </h2>
          
          <div className="space-y-4">
            <p className="text-gray-300">Each node maintains complete network topology and computes shortest paths</p>
            
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-purple-300 mb-3">Dijkstra's Algorithm</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                <pre className="whitespace-pre">
{`Algorithm:
1. Initialize: distance to source = 0, others = ∞
2. Add source to visited set
3. For each iteration:
   - Find unvisited node with minimum distance
   - Add to visited set
   - Update distances to neighbors

Pseudocode:
function dijkstra(graph, source):
    dist[source] = 0
    for each vertex v in graph:
        if v ≠ source: dist[v] = ∞
    
    while unvisited nodes exist:
        u = node with minimum dist[u]
        remove u from unvisited
        for each neighbor v of u:
            alt = dist[u] + length(u, v)
            if alt < dist[v]:
                dist[v] = alt
                prev[v] = u`}
                </pre>
              </div>
            </div>
            
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-purple-300 mb-3">Link State Process</h4>
              <ol className="list-decimal list-inside text-gray-300 text-sm space-y-1">
                <li><strong className="text-purple-400">Discover neighbors:</strong> Send HELLO packets</li>
                <li><strong className="text-purple-400">Measure link costs:</strong> RTT, bandwidth, etc.</li>
                <li><strong className="text-purple-400">Flood LSAs:</strong> Link State Advertisements</li>
                <li><strong className="text-purple-400">Build topology:</strong> Complete network graph</li>
                <li><strong className="text-purple-400">Compute paths:</strong> Run Dijkstra's algorithm</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Path Vector */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-yellow-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-yellow-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
            Path Vector Routing
          </h2>
          
          <div className="space-y-4">
            <p className="text-gray-300">Extension of distance vector that includes complete path information</p>
            
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-yellow-300 mb-3">BGP (Border Gateway Protocol)</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                <pre className="whitespace-pre">
{`Path Vector Advertisement:
Destination: 192.168.1.0/24
Path: [AS100, AS200, AS300]
Next Hop: 10.1.1.1

Algorithm:
1. Receive path vector from neighbor
2. Check for loops (own AS in path)
3. If no loop, add own AS to path
4. Apply routing policies
5. Advertise to other neighbors

Loop Prevention:
If receiving AS sees its own AS number in path → reject route`}
                </pre>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-yellow-300 mb-2">Features</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li>Loop-free routing</li>
                  <li>Policy-based routing</li>
                  <li>Scalable for large networks</li>
                  <li>Inter-domain routing</li>
                </ul>
              </div>
              
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-yellow-300 mb-2">Applications</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li>Internet backbone routing</li>
                  <li>ISP interconnection</li>
                  <li>Multi-homed networks</li>
                  <li>Traffic engineering</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Hierarchical Routing */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-red-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-red-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
            Hierarchical Routing
          </h2>
          
          <div className="space-y-4">
            <p className="text-gray-300">Organize network into hierarchy to improve scalability</p>
            
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-red-300 mb-3">Two-Level Hierarchy</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                <pre className="whitespace-pre">
{`Structure:
- Autonomous Systems (AS) - top level
- Routers within AS - bottom level

Routing:
- Intra-AS: OSPF, RIP (within AS)
- Inter-AS: BGP (between AS)

Example:
AS 100 ← BGP → AS 200
  ↓ OSPF        ↓ OSPF
Routers       Routers

Benefits:
- Reduced routing table size: O(√N) instead of O(N)
- Administrative boundaries
- Policy control`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Routing Protocols */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-indigo-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-indigo-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
            Common Routing Protocols
          </h2>
          
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-indigo-300 mb-3">RIP (Routing Information Protocol)</h4>
                <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs border border-gray-700">
                  <pre className="whitespace-pre">
{`Type: Distance Vector
Metric: Hop count (max 15)
Updates: Every 30 seconds
Convergence: Slow

Features:
- Simple configuration
- Split horizon with poison reverse
- Triggered updates
- Hold-down timers`}
                  </pre>
                </div>
              </div>
              
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-indigo-300 mb-3">OSPF (Open Shortest Path First)</h4>
                <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs border border-gray-700">
                  <pre className="whitespace-pre">
{`Type: Link State
Metric: Cost (bandwidth-based)
Updates: Event-driven
Convergence: Fast

Features:
- Hierarchical areas
- VLSM support
- Authentication
- Load balancing`}
                  </pre>
                </div>
              </div>
              
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-indigo-300 mb-3">EIGRP (Enhanced IGRP)</h4>
                <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs border border-gray-700">
                  <pre className="whitespace-pre">
{`Type: Advanced Distance Vector
Metric: Composite (BW, delay, etc.)
Updates: Partial, triggered
Convergence: Very fast

Features:
- DUAL algorithm
- Unequal cost load balancing
- Classless routing
- Neighbor discovery`}
                  </pre>
                </div>
              </div>
              
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-indigo-300 mb-3">BGP (Border Gateway Protocol)</h4>
                <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs border border-gray-700">
                  <pre className="whitespace-pre">
{`Type: Path Vector
Metric: Policy-based
Updates: Incremental
Convergence: Slow but stable

Features:
- Inter-AS routing
- Policy routing
- Route aggregation
- Community attributes`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Performance Comparison */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-gray-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-gray-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-gray-500 rounded-full mr-3"></span>
            Algorithm Comparison
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm bg-gray-900/50 rounded shadow border border-gray-600/30">
              <thead className="bg-gray-800/80">
                <tr>
                  <th className="p-3 text-left text-gray-200">Algorithm</th>
                  <th className="p-3 text-left text-gray-200">Complexity</th>
                  <th className="p-3 text-left text-gray-200">Convergence</th>
                  <th className="p-3 text-left text-gray-200">Scalability</th>
                  <th className="p-3 text-left text-gray-200">Overhead</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-t border-gray-600/50">
                  <td className="p-3 font-semibold text-green-400">Distance Vector</td>
                  <td className="p-3">O(N×E)</td>
                  <td className="p-3">Slow</td>
                  <td className="p-3">Poor</td>
                  <td className="p-3">Low</td>
                </tr>
                <tr className="border-t border-gray-600/50">
                  <td className="p-3 font-semibold text-purple-400">Link State</td>
                  <td className="p-3">O(N²)</td>
                  <td className="p-3">Fast</td>
                  <td className="p-3">Good</td>
                  <td className="p-3">High</td>
                </tr>
                <tr className="border-t border-gray-600/50">
                  <td className="p-3 font-semibold text-yellow-400">Path Vector</td>
                  <td className="p-3">O(N×P)</td>
                  <td className="p-3">Medium</td>
                  <td className="p-3">Excellent</td>
                  <td className="p-3">Medium</td>
                </tr>
                <tr className="border-t border-gray-600/50">
                  <td className="p-3 font-semibold text-red-400">Hierarchical</td>
                  <td className="p-3">O(√N)</td>
                  <td className="p-3">Fast</td>
                  <td className="p-3">Excellent</td>
                  <td className="p-3">Low</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 text-sm text-gray-400">
            <strong>Note:</strong> N = nodes, E = edges, P = path length
          </div>
        </section>
      </div>
    </div>
  );
};

export default RoutingAlgorithms;
