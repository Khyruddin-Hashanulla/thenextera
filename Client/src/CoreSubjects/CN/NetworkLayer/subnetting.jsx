import React from 'react';

const Subnetting = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4 border-l-4 border-blue-500 pl-4">Subnetting</h1>
        <p className="text-lg text-gray-300 leading-relaxed">
          Subnetting is the process of dividing a network into smaller sub-networks to improve network performance, security, and management.
        </p>
      </div>

      <div className="space-y-8">
        {/* Subnetting Basics */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-blue-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
            Subnetting Fundamentals
          </h2>
          <div className="space-y-4">
            <p className="text-gray-300">
              Subnetting allows network administrators to create multiple logical networks within a single network address space.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-blue-300 mb-2">Benefits</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li>Improved network performance</li>
                  <li>Enhanced security</li>
                  <li>Better network organization</li>
                  <li>Efficient IP address utilization</li>
                </ul>
              </div>
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-blue-300 mb-2">Key Concepts</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li>Network ID and Host ID</li>
                  <li>Subnet mask</li>
                  <li>CIDR notation</li>
                  <li>Broadcast address</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Subnet Mask */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-green-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-green-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            Subnet Masks
          </h2>
          <div className="space-y-4">
            <p className="text-gray-300">
              A subnet mask determines which portion of an IP address represents the network and which represents the host.
            </p>
            
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-green-300 mb-3">Default Subnet Masks</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm bg-gray-900 rounded border border-gray-700">
                  <thead className="bg-gray-800">
                    <tr>
                      <th className="p-3 text-left text-gray-200">Class</th>
                      <th className="p-3 text-left text-gray-200">IP Range</th>
                      <th className="p-3 text-left text-gray-200">Default Mask</th>
                      <th className="p-3 text-left text-gray-200">CIDR</th>
                      <th className="p-3 text-left text-gray-200">Hosts</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-t border-gray-700">
                      <td className="p-3 font-semibold text-green-400">Class A</td>
                      <td className="p-3">1.0.0.0 - 126.255.255.255</td>
                      <td className="p-3">255.0.0.0</td>
                      <td className="p-3">/8</td>
                      <td className="p-3">16,777,214</td>
                    </tr>
                    <tr className="border-t border-gray-700">
                      <td className="p-3 font-semibold text-green-400">Class B</td>
                      <td className="p-3">128.0.0.0 - 191.255.255.255</td>
                      <td className="p-3">255.255.0.0</td>
                      <td className="p-3">/16</td>
                      <td className="p-3">65,534</td>
                    </tr>
                    <tr className="border-t border-gray-700">
                      <td className="p-3 font-semibold text-green-400">Class C</td>
                      <td className="p-3">192.0.0.0 - 223.255.255.255</td>
                      <td className="p-3">255.255.255.0</td>
                      <td className="p-3">/24</td>
                      <td className="p-3">254</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-green-300 mb-3">Subnet Mask Calculation</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                <pre className="whitespace-pre">
{`IP Address:    192.168.1.100
Subnet Mask:   255.255.255.0  (/24)

Binary representation:
IP:    11000000.10101000.00000001.01100100
Mask:  11111111.11111111.11111111.00000000
       ^^^^^^^^ ^^^^^^^^ ^^^^^^^^ ^^^^^^^^
       Network  Network  Network  Host

Network ID:    192.168.1.0
Broadcast:     192.168.1.255
Host Range:    192.168.1.1 - 192.168.1.254`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* CIDR Notation */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-purple-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
            CIDR Notation
          </h2>
          <div className="space-y-4">
            <p className="text-gray-300">
              Classless Inter-Domain Routing (CIDR) provides a more flexible way to allocate IP addresses and route IP packets.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-purple-300 mb-3">CIDR Examples</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-300">
                    <span>/24</span>
                    <span>255.255.255.0</span>
                    <span>254 hosts</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>/25</span>
                    <span>255.255.255.128</span>
                    <span>126 hosts</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>/26</span>
                    <span>255.255.255.192</span>
                    <span>62 hosts</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>/27</span>
                    <span>255.255.255.224</span>
                    <span>30 hosts</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>/28</span>
                    <span>255.255.255.240</span>
                    <span>14 hosts</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-purple-300 mb-3">CIDR Calculation Formula</h4>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                  <pre className="whitespace-pre">
{`Number of hosts = 2^(32-prefix) - 2

Examples:
/24: 2^(32-24) - 2 = 2^8 - 2 = 254 hosts
/25: 2^(32-25) - 2 = 2^7 - 2 = 126 hosts
/26: 2^(32-26) - 2 = 2^6 - 2 = 62 hosts

-2 accounts for:
- Network address
- Broadcast address`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Subnetting Examples */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-yellow-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-yellow-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
            Subnetting Examples
          </h2>
          <div className="space-y-4">
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-yellow-300 mb-3">Example 1: Dividing Class C Network</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                <pre className="whitespace-pre">
{`Original Network: 192.168.1.0/24 (254 hosts)
Requirement: 4 subnets with ~60 hosts each

Solution: Use /26 (62 hosts per subnet)

Subnet 1: 192.168.1.0/26   (192.168.1.1   - 192.168.1.62)
Subnet 2: 192.168.1.64/26  (192.168.1.65  - 192.168.1.126)
Subnet 3: 192.168.1.128/26 (192.168.1.129 - 192.168.1.190)
Subnet 4: 192.168.1.192/26 (192.168.1.193 - 192.168.1.254)`}
                </pre>
              </div>
            </div>

            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-yellow-300 mb-3">Example 2: Variable Length Subnet Masking (VLSM)</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                <pre className="whitespace-pre">
{`Network: 192.168.1.0/24
Requirements:
- Subnet A: 100 hosts (/25 - 126 hosts)
- Subnet B: 50 hosts  (/26 - 62 hosts)
- Subnet C: 20 hosts  (/27 - 30 hosts)
- Subnet D: 10 hosts  (/28 - 14 hosts)

Allocation:
Subnet A: 192.168.1.0/25   (192.168.1.1   - 192.168.1.126)
Subnet B: 192.168.1.128/26 (192.168.1.129 - 192.168.1.190)
Subnet C: 192.168.1.192/27 (192.168.1.193 - 192.168.1.222)
Subnet D: 192.168.1.224/28 (192.168.1.225 - 192.168.1.238)`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Subnetting Steps */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-red-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-red-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
            Subnetting Process
          </h2>
          <div className="space-y-4">
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-red-300 mb-3">Step-by-Step Process</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded font-bold">1</span>
                  <div>
                    <h5 className="font-semibold text-red-300">Determine Requirements</h5>
                    <p className="text-gray-300 text-sm">Number of subnets needed and hosts per subnet</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded font-bold">2</span>
                  <div>
                    <h5 className="font-semibold text-red-300">Calculate Subnet Bits</h5>
                    <p className="text-gray-300 text-sm">Subnet bits = log₂(number of subnets)</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded font-bold">3</span>
                  <div>
                    <h5 className="font-semibold text-red-300">Determine New Subnet Mask</h5>
                    <p className="text-gray-300 text-sm">Add subnet bits to original prefix length</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded font-bold">4</span>
                  <div>
                    <h5 className="font-semibold text-red-300">Calculate Subnet Increment</h5>
                    <p className="text-gray-300 text-sm">Increment = 256 - subnet octet value</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded font-bold">5</span>
                  <div>
                    <h5 className="font-semibold text-red-300">List All Subnets</h5>
                    <p className="text-gray-300 text-sm">Start from network address, add increment</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-red-300 mb-3">Quick Reference Table</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-xs bg-gray-900 rounded border border-gray-700">
                  <thead className="bg-gray-800">
                    <tr>
                      <th className="p-2 text-left text-gray-200">Subnet Bits</th>
                      <th className="p-2 text-left text-gray-200">Subnets</th>
                      <th className="p-2 text-left text-gray-200">Host Bits</th>
                      <th className="p-2 text-left text-gray-200">Hosts/Subnet</th>
                      <th className="p-2 text-left text-gray-200">Subnet Mask</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-t border-gray-700">
                      <td className="p-2">1</td>
                      <td className="p-2">2</td>
                      <td className="p-2">7</td>
                      <td className="p-2">126</td>
                      <td className="p-2">255.255.255.128</td>
                    </tr>
                    <tr className="border-t border-gray-700">
                      <td className="p-2">2</td>
                      <td className="p-2">4</td>
                      <td className="p-2">6</td>
                      <td className="p-2">62</td>
                      <td className="p-2">255.255.255.192</td>
                    </tr>
                    <tr className="border-t border-gray-700">
                      <td className="p-2">3</td>
                      <td className="p-2">8</td>
                      <td className="p-2">5</td>
                      <td className="p-2">30</td>
                      <td className="p-2">255.255.255.224</td>
                    </tr>
                    <tr className="border-t border-gray-700">
                      <td className="p-2">4</td>
                      <td className="p-2">16</td>
                      <td className="p-2">4</td>
                      <td className="p-2">14</td>
                      <td className="p-2">255.255.255.240</td>
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

export default Subnetting;
