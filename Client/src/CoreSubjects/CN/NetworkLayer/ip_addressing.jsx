import React from 'react';

const IPAddressing = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4 border-l-4 border-blue-500 pl-4">IP Addressing</h1>
        <p className="text-lg text-gray-300 leading-relaxed">
          IP addressing is a logical means of assigning addresses to devices on a network. Each device requires a unique IP address to communicate over the internet.
        </p>
      </div>

      <div className="space-y-8">
        {/* IPv4 Addressing */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-blue-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
            IPv4 Addressing
          </h2>
          
          <div className="space-y-4">
            <p className="text-gray-300">32-bit addresses written in dotted decimal notation</p>
            
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-blue-300 mb-3">Address Structure</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                <pre className="whitespace-pre">
{`IPv4 Address: 192.168.1.100
Binary:       11000000.10101000.00000001.01100100

Structure:
- 32 bits total
- 4 octets (8 bits each)
- Range: 0.0.0.0 to 255.255.255.255
- Total addresses: 2^32 = 4,294,967,296

Example Breakdown:
192.168.1.100
└─┬─┘└─┬─┘└┬┘└─┬─┘
  │   │  │   │
  │   │  │   └── Host part
  │   │  └────── Network part
  │   └───────── Network part  
  └───────────── Network part`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Address Classes */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-green-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-green-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            IPv4 Address Classes
          </h2>
          
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm bg-gray-900/50 rounded shadow border border-gray-600/30">
                <thead className="bg-gray-800/80">
                  <tr>
                    <th className="p-3 text-left text-gray-200">Class</th>
                    <th className="p-3 text-left text-gray-200">Range</th>
                    <th className="p-3 text-left text-gray-200">Default Mask</th>
                    <th className="p-3 text-left text-gray-200">Networks</th>
                    <th className="p-3 text-left text-gray-200">Hosts/Network</th>
                    <th className="p-3 text-left text-gray-200">Usage</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-t border-gray-600/50">
                    <td className="p-3 font-semibold text-green-400">A</td>
                    <td className="p-3">1.0.0.0 - 126.255.255.255</td>
                    <td className="p-3">255.0.0.0 (/8)</td>
                    <td className="p-3">126</td>
                    <td className="p-3">16,777,214</td>
                    <td className="p-3">Large networks</td>
                  </tr>
                  <tr className="border-t border-gray-600/50">
                    <td className="p-3 font-semibold text-blue-400">B</td>
                    <td className="p-3">128.0.0.0 - 191.255.255.255</td>
                    <td className="p-3">255.255.0.0 (/16)</td>
                    <td className="p-3">16,384</td>
                    <td className="p-3">65,534</td>
                    <td className="p-3">Medium networks</td>
                  </tr>
                  <tr className="border-t border-gray-600/50">
                    <td className="p-3 font-semibold text-purple-400">C</td>
                    <td className="p-3">192.0.0.0 - 223.255.255.255</td>
                    <td className="p-3">255.255.255.0 (/24)</td>
                    <td className="p-3">2,097,152</td>
                    <td className="p-3">254</td>
                    <td className="p-3">Small networks</td>
                  </tr>
                  <tr className="border-t border-gray-600/50">
                    <td className="p-3 font-semibold text-orange-400">D</td>
                    <td className="p-3">224.0.0.0 - 239.255.255.255</td>
                    <td className="p-3">N/A</td>
                    <td className="p-3">N/A</td>
                    <td className="p-3">N/A</td>
                    <td className="p-3">Multicast</td>
                  </tr>
                  <tr className="border-t border-gray-600/50">
                    <td className="p-3 font-semibold text-red-400">E</td>
                    <td className="p-3">240.0.0.0 - 255.255.255.255</td>
                    <td className="p-3">N/A</td>
                    <td className="p-3">N/A</td>
                    <td className="p-3">N/A</td>
                    <td className="p-3">Experimental</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-green-300 mb-3">Class Identification</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                <pre className="whitespace-pre">
{`Class A: First bit = 0    (0xxxxxxx)
Class B: First bits = 10   (10xxxxxx)
Class C: First bits = 110  (110xxxxx)
Class D: First bits = 1110 (1110xxxx)
Class E: First bits = 1111 (1111xxxx)

Examples:
10.0.0.1     → Class A (first octet: 10)
172.16.1.1   → Class B (first octet: 172)
192.168.1.1  → Class C (first octet: 192)
224.0.0.1    → Class D (first octet: 224)`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Subnetting */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-purple-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
            Subnetting
          </h2>
          
          <div className="space-y-4">
            <p className="text-gray-300">Dividing a network into smaller subnetworks for better organization and security</p>
            
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-purple-300 mb-3">Subnet Mask</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                <pre className="whitespace-pre">
{`Purpose: Separates network and host portions

Example: 192.168.1.0/24
IP Address:    192.168.1.100
Subnet Mask:   255.255.255.0
Binary Mask:   11111111.11111111.11111111.00000000

Network portion: 192.168.1.0 (first 24 bits)
Host portion:    .100 (last 8 bits)

CIDR Notation:
/8  = 255.0.0.0       (Class A default)
/16 = 255.255.0.0     (Class B default)  
/24 = 255.255.255.0   (Class C default)
/25 = 255.255.255.128
/26 = 255.255.255.192
/27 = 255.255.255.224
/28 = 255.255.255.240
/29 = 255.255.255.248
/30 = 255.255.255.252`}
                </pre>
              </div>
            </div>
            
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-purple-300 mb-3">Subnetting Example</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                <pre className="whitespace-pre">
{`Network: 192.168.1.0/24 (256 addresses)
Requirement: 4 subnets with 60 hosts each

Solution: Use /26 (64 addresses per subnet)

Subnet 1: 192.168.1.0/26   (192.168.1.1   - 192.168.1.62)
Subnet 2: 192.168.1.64/26  (192.168.1.65  - 192.168.1.126)
Subnet 3: 192.168.1.128/26 (192.168.1.129 - 192.168.1.190)
Subnet 4: 192.168.1.192/26 (192.168.1.193 - 192.168.1.254)

Calculations:
- Borrowed bits: 2 (for 4 subnets)
- Host bits: 6 (64 addresses - 2 = 62 usable)
- Subnet mask: 255.255.255.192 (/26)`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* VLSM */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-yellow-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-yellow-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
            VLSM (Variable Length Subnet Masking)
          </h2>
          
          <div className="space-y-4">
            <p className="text-gray-300">Allows different subnet sizes within the same network for efficient address utilization</p>
            
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-yellow-300 mb-3">VLSM Example</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                <pre className="whitespace-pre">
{`Network: 192.168.1.0/24
Requirements:
- Subnet A: 100 hosts
- Subnet B: 50 hosts  
- Subnet C: 25 hosts
- Subnet D: 10 hosts

Solution:
Subnet A: 192.168.1.0/25   (126 hosts) - /25 = 128 addresses
Subnet B: 192.168.1.128/26 (62 hosts)  - /26 = 64 addresses
Subnet C: 192.168.1.192/27 (30 hosts)  - /27 = 32 addresses
Subnet D: 192.168.1.224/28 (14 hosts)  - /28 = 16 addresses

Address Allocation:
A: 192.168.1.1   - 192.168.1.126   (126 usable)
B: 192.168.1.129 - 192.168.1.190   (62 usable)
C: 192.168.1.193 - 192.168.1.222   (30 usable)
D: 192.168.1.225 - 192.168.1.238   (14 usable)`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Private Addresses */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-red-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-red-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
            Private IP Addresses
          </h2>
          
          <div className="space-y-4">
            <p className="text-gray-300">Reserved address ranges for internal networks (RFC 1918)</p>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-red-300 mb-3">Class A Private</h4>
                <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs border border-gray-700">
                  <pre className="whitespace-pre">
{`Range: 10.0.0.0/8
From:  10.0.0.0
To:    10.255.255.255
Hosts: 16,777,216

Usage:
- Large enterprises
- ISP networks
- Data centers`}
                  </pre>
                </div>
              </div>
              
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-red-300 mb-3">Class B Private</h4>
                <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs border border-gray-700">
                  <pre className="whitespace-pre">
{`Range: 172.16.0.0/12
From:  172.16.0.0
To:    172.31.255.255
Hosts: 1,048,576

Usage:
- Medium enterprises
- Campus networks
- VPN networks`}
                  </pre>
                </div>
              </div>
              
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-red-300 mb-3">Class C Private</h4>
                <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs border border-gray-700">
                  <pre className="whitespace-pre">
{`Range: 192.168.0.0/16
From:  192.168.0.0
To:    192.168.255.255
Hosts: 65,536

Usage:
- Home networks
- Small offices
- SOHO routers`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* IPv6 Addressing */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-indigo-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-indigo-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
            IPv6 Addressing
          </h2>
          
          <div className="space-y-4">
            <p className="text-gray-300">128-bit addresses written in hexadecimal notation</p>
            
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-indigo-300 mb-3">Address Structure</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                <pre className="whitespace-pre">
{`IPv6 Address: 2001:0db8:85a3:0000:0000:8a2e:0370:7334

Structure:
- 128 bits total
- 8 groups of 16 bits each
- Written in hexadecimal
- Separated by colons
- Total addresses: 2^128 = 340 undecillion

Address Compression:
Full:        2001:0db8:85a3:0000:0000:8a2e:0370:7334
Compressed:  2001:db8:85a3::8a2e:370:7334

Rules:
- Leading zeros can be omitted
- Consecutive zero groups can be replaced with ::
- :: can only be used once per address`}
                </pre>
              </div>
            </div>
            
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-indigo-300 mb-3">IPv6 Address Types</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold text-indigo-300 mb-2">Unicast</h5>
                  <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                    <li><strong className="text-indigo-400">Global:</strong> 2000::/3 (Internet routable)</li>
                    <li><strong className="text-indigo-400">Link-local:</strong> fe80::/10 (Local segment)</li>
                    <li><strong className="text-indigo-400">Unique local:</strong> fc00::/7 (Private)</li>
                    <li><strong className="text-indigo-400">Loopback:</strong> ::1 (localhost)</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-semibold text-indigo-300 mb-2">Multicast & Anycast</h5>
                  <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                    <li><strong className="text-indigo-400">Multicast:</strong> ff00::/8</li>
                    <li><strong className="text-indigo-400">Anycast:</strong> Same as unicast</li>
                    <li><strong className="text-indigo-400">All nodes:</strong> ff02::1</li>
                    <li><strong className="text-indigo-400">All routers:</strong> ff02::2</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NAT */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-teal-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-teal-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
            Network Address Translation (NAT)
          </h2>
          
          <div className="space-y-4">
            <p className="text-gray-300">Translates private IP addresses to public IP addresses for internet communication</p>
            
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-teal-300 mb-3">NAT Types</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-800/50 p-3 rounded border border-gray-600/30">
                  <h5 className="font-semibold text-teal-300 mb-2">Static NAT</h5>
                  <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs border border-gray-700">
                    <pre className="whitespace-pre">
{`One-to-one mapping
Private: 192.168.1.10
Public:  203.0.113.10

Always same translation
Used for servers`}
                    </pre>
                  </div>
                </div>
                
                <div className="bg-gray-800/50 p-3 rounded border border-gray-600/30">
                  <h5 className="font-semibold text-teal-300 mb-2">Dynamic NAT</h5>
                  <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs border border-gray-700">
                    <pre className="whitespace-pre">
{`Pool of public IPs
Private: 192.168.1.x
Public:  203.0.113.1-10

First-come basis
Limited connections`}
                    </pre>
                  </div>
                </div>
                
                <div className="bg-gray-800/50 p-3 rounded border border-gray-600/30">
                  <h5 className="font-semibold text-teal-300 mb-2">PAT (Port Address Translation)</h5>
                  <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs border border-gray-700">
                    <pre className="whitespace-pre">
{`Many-to-one with ports
192.168.1.10:1234 → 203.0.113.1:5000
192.168.1.11:1234 → 203.0.113.1:5001

Most common NAT type
Overloading`}
                    </pre>
                  </div>
                </div>
                
                <div className="bg-gray-800/50 p-3 rounded border border-gray-600/30">
                  <h5 className="font-semibold text-teal-300 mb-2">Port Forwarding</h5>
                  <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs border border-gray-700">
                    <pre className="whitespace-pre">
{`External port → Internal IP:port
203.0.113.1:80 → 192.168.1.10:80
203.0.113.1:22 → 192.168.1.11:22

For hosting services`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DHCP */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-orange-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-orange-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
            DHCP (Dynamic Host Configuration Protocol)
          </h2>
          
          <div className="space-y-4">
            <p className="text-gray-300">Automatically assigns IP addresses and network configuration to devices</p>
            
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-orange-300 mb-3">DHCP Process (DORA)</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                <pre className="whitespace-pre">
{`1. DISCOVER (Client → Broadcast)
   Client: "I need an IP address"
   Destination: 255.255.255.255:67
   Source: 0.0.0.0:68

2. OFFER (Server → Client)
   Server: "Here's an available IP: 192.168.1.100"
   Includes: IP, subnet mask, gateway, DNS, lease time

3. REQUEST (Client → Server)
   Client: "I accept 192.168.1.100"
   Confirms the offered configuration

4. ACKNOWLEDGE (Server → Client)
   Server: "192.168.1.100 is yours for 24 hours"
   Lease established`}
                </pre>
              </div>
            </div>
            
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-orange-300 mb-3">DHCP Configuration</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                <pre className="whitespace-pre">
{`DHCP Scope Configuration:
- IP Range: 192.168.1.100 - 192.168.1.200
- Subnet Mask: 255.255.255.0
- Default Gateway: 192.168.1.1
- DNS Servers: 8.8.8.8, 8.8.4.4
- Lease Duration: 24 hours
- Exclusions: 192.168.1.1 - 192.168.1.99 (static)

Reservations:
MAC: 00:1B:44:11:3A:B7 → IP: 192.168.1.50 (printer)
MAC: 00:50:56:C0:00:08 → IP: 192.168.1.51 (server)`}
                </pre>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default IPAddressing;
