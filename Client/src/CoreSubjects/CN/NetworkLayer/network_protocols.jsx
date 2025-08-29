import React from 'react';

const NetworkProtocols = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4 border-l-4 border-blue-500 pl-4">Network Layer Protocols</h1>
        <p className="text-lg text-gray-300 leading-relaxed">
          Network layer protocols are responsible for routing packets across networks, addressing, and providing logical network topology.
        </p>
      </div>

      <div className="space-y-8">
        {/* IP Protocol */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-blue-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
            Internet Protocol (IP)
          </h2>
          
          <div className="space-y-4">
            <p className="text-gray-300">Core protocol providing packet delivery service across networks</p>
            
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-blue-300 mb-3">IPv4 Header Structure</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
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
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

Field Descriptions:
- Version: IP version (4 for IPv4)
- IHL: Internet Header Length (5-15 words)
- Type of Service: QoS and priority
- Total Length: Entire packet size (header + data)
- Identification: Unique packet identifier
- Flags: Control fragmentation (DF, MF)
- Fragment Offset: Position of fragment
- TTL: Maximum hops before discard
- Protocol: Next layer protocol (TCP=6, UDP=17)
- Header Checksum: Error detection
- Source/Destination: IP addresses`}
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 p-4 rounded border-l-2 border-blue-400">
                <h4 className="font-semibold text-blue-300 mb-2">IP Features</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li>Connectionless service</li>
                  <li>Best-effort delivery</li>
                  <li>Packet fragmentation</li>
                  <li>Logical addressing</li>
                  <li>Routing capability</li>
                </ul>
              </div>
              
              <div className="bg-gray-900/50 p-4 rounded border-l-2 border-red-400">
                <h4 className="font-semibold text-red-300 mb-2">IP Limitations</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li>No reliability guarantee</li>
                  <li>No flow control</li>
                  <li>No error recovery</li>
                  <li>No duplicate detection</li>
                  <li>No sequencing</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ICMP */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-green-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-green-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            ICMP (Internet Control Message Protocol)
          </h2>
          
          <div className="space-y-4">
            <p className="text-gray-300">Error reporting and diagnostic protocol for IP networks</p>
            
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-green-300 mb-3">ICMP Message Types</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm bg-gray-900/50 rounded shadow border border-gray-600/30">
                  <thead className="bg-gray-800/80">
                    <tr>
                      <th className="p-3 text-left text-gray-200">Type</th>
                      <th className="p-3 text-left text-gray-200">Code</th>
                      <th className="p-3 text-left text-gray-200">Description</th>
                      <th className="p-3 text-left text-gray-200">Usage</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-t border-gray-600/50">
                      <td className="p-3 font-semibold text-green-400">0</td>
                      <td className="p-3">0</td>
                      <td className="p-3">Echo Reply</td>
                      <td className="p-3">Ping response</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-3 font-semibold text-green-400">3</td>
                      <td className="p-3">0-15</td>
                      <td className="p-3">Destination Unreachable</td>
                      <td className="p-3">Network/host/port unreachable</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-3 font-semibold text-green-400">5</td>
                      <td className="p-3">0-3</td>
                      <td className="p-3">Redirect</td>
                      <td className="p-3">Route optimization</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-3 font-semibold text-green-400">8</td>
                      <td className="p-3">0</td>
                      <td className="p-3">Echo Request</td>
                      <td className="p-3">Ping command</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-3 font-semibold text-green-400">11</td>
                      <td className="p-3">0-1</td>
                      <td className="p-3">Time Exceeded</td>
                      <td className="p-3">TTL expired, traceroute</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-green-300 mb-3">ICMP Tools</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
{`Ping - Connectivity Testing:
$ ping google.com
PING google.com (172.217.164.110): 56 data bytes
64 bytes from 172.217.164.110: icmp_seq=0 ttl=117 time=12.345 ms
64 bytes from 172.217.164.110: icmp_seq=1 ttl=117 time=11.234 ms

Traceroute - Path Discovery:
$ traceroute google.com
1  192.168.1.1 (192.168.1.1)  1.234 ms  1.123 ms  1.456 ms
2  10.0.0.1 (10.0.0.1)  5.678 ms  5.432 ms  5.789 ms
3  203.0.113.1 (203.0.113.1)  12.345 ms  12.123 ms  12.456 ms

Pathping - Combined ping/traceroute (Windows):
$ pathping google.com
Tracing route to google.com [172.217.164.110]
Computing statistics for 25 seconds...`}
              </div>
            </div>
          </div>
        </section>

        {/* ARP */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-purple-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
            ARP (Address Resolution Protocol)
          </h2>
          
          <div className="space-y-4">
            <p className="text-gray-300">Maps IP addresses to MAC addresses on local network segments</p>
            
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-purple-300 mb-3">ARP Process</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
{`ARP Request (Broadcast):
Source: Host A wants to send to Host B (192.168.1.100)
Message: "Who has 192.168.1.100? Tell 192.168.1.50"
Destination: FF:FF:FF:FF:FF:FF (broadcast MAC)

ARP Reply (Unicast):
Source: Host B (192.168.1.100)
Message: "192.168.1.100 is at 00:1B:44:11:3A:B7"
Destination: Host A's MAC address

ARP Table Entry:
IP Address      MAC Address         Type    Interface
192.168.1.100   00:1B:44:11:3A:B7   dynamic eth0
192.168.1.1     00:50:56:C0:00:08   static  eth0

ARP Commands:
arp -a                    # View ARP table
arp -d 192.168.1.100     # Delete entry
arp -s 192.168.1.100 00:1B:44:11:3A:B7  # Static entry`}
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-purple-300 mb-2">ARP Types</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li><strong className="text-purple-400">ARP:</strong> IP to MAC resolution</li>
                  <li><strong className="text-purple-400">RARP:</strong> MAC to IP resolution</li>
                  <li><strong className="text-purple-400">Proxy ARP:</strong> Router responds for hosts</li>
                  <li><strong className="text-purple-400">Gratuitous ARP:</strong> Announce own mapping</li>
                </ul>
              </div>
              
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-purple-300 mb-2">Security Issues</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li><strong className="text-purple-400">ARP Spoofing:</strong> False MAC mappings</li>
                  <li><strong className="text-purple-400">ARP Poisoning:</strong> Cache corruption</li>
                  <li><strong className="text-purple-400">Man-in-the-middle:</strong> Traffic interception</li>
                  <li><strong className="text-purple-400">Mitigation:</strong> Static ARP, DAI</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* IGMP */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-yellow-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-yellow-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
            IGMP (Internet Group Management Protocol)
          </h2>
          
          <div className="space-y-4">
            <p className="text-gray-300">Manages multicast group memberships between hosts and routers</p>
            
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-yellow-300 mb-3">IGMP Versions</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gray-800/50 p-3 rounded border border-gray-600/30">
                  <h5 className="font-semibold text-yellow-300 mb-2">IGMPv1</h5>
                  <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs border border-gray-700">
{`Messages:
- Membership Query
- Membership Report

Features:
- Basic join/leave
- No explicit leave
- Timer-based cleanup`}
                  </div>
                </div>
                
                <div className="bg-gray-800/50 p-3 rounded border border-gray-600/30">
                  <h5 className="font-semibold text-yellow-300 mb-2">IGMPv2</h5>
                  <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs border border-gray-700">
{`Messages:
- General Query
- Group-Specific Query
- Membership Report
- Leave Group

Features:
- Explicit leave
- Querier election
- Faster convergence`}
                  </div>
                </div>
                
                <div className="bg-gray-800/50 p-3 rounded border border-gray-600/30">
                  <h5 className="font-semibold text-yellow-300 mb-2">IGMPv3</h5>
                  <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs border border-gray-700">
{`Messages:
- General Query
- Group/Source Query
- Membership Report

Features:
- Source filtering
- Include/Exclude lists
- SSM support`}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-yellow-300 mb-3">Multicast Addresses</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
{`Class D Address Range: 224.0.0.0 - 239.255.255.255

Reserved Addresses:
224.0.0.1    All Hosts (local subnet)
224.0.0.2    All Routers (local subnet)
224.0.0.5    OSPF All Routers
224.0.0.6    OSPF Designated Routers
224.0.0.9    RIP Version 2
224.0.0.22   IGMP

Administratively Scoped:
239.0.0.0/8  Private multicast (like RFC 1918)

Source-Specific Multicast (SSM):
232.0.0.0/8  SSM range (IGMPv3 required)`}
              </div>
            </div>
          </div>
        </section>

        {/* IPSec */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-red-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-red-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
            IPSec (IP Security)
          </h2>
          
          <div className="space-y-4">
            <p className="text-gray-300">Security framework providing authentication, integrity, and confidentiality for IP packets</p>
            
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-red-300 mb-3">IPSec Components</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-800/50 p-3 rounded border border-gray-600/30">
                  <h5 className="font-semibold text-red-300 mb-2">Protocols</h5>
                  <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                    <li><strong className="text-red-400">AH:</strong> Authentication Header</li>
                    <li><strong className="text-red-400">ESP:</strong> Encapsulating Security Payload</li>
                    <li><strong className="text-red-400">IKE:</strong> Internet Key Exchange</li>
                    <li><strong className="text-red-400">ISAKMP:</strong> Security Association management</li>
                  </ul>
                </div>
                
                <div className="bg-gray-800/50 p-3 rounded border border-gray-600/30">
                  <h5 className="font-semibold text-red-300 mb-2">Modes</h5>
                  <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                    <li><strong className="text-red-400">Transport:</strong> End-to-end protection</li>
                    <li><strong className="text-red-400">Tunnel:</strong> Gateway-to-gateway</li>
                    <li><strong className="text-red-400">Host-to-host:</strong> Direct connection</li>
                    <li><strong className="text-red-400">Site-to-site:</strong> VPN tunnels</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-red-300 mb-3">IPSec Packet Structure</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
{`Transport Mode (AH):
[IP Header][AH Header][TCP/UDP Header][Data]
           ←─── Authenticated ────→

Transport Mode (ESP):
[IP Header][ESP Header][TCP/UDP Header][Data][ESP Trailer][ESP Auth]
           ←──────── Encrypted ────────→
           ←─────────── Authenticated ──────────→

Tunnel Mode (ESP):
[New IP][ESP][Original IP][TCP/UDP][Data][ESP Trailer][ESP Auth]
        ←─────────── Encrypted ──────────→
        ←──────────── Authenticated ────────────→

Security Association (SA):
- SPI: Security Parameter Index
- Destination IP
- Security Protocol (AH/ESP)
- Encryption/Authentication algorithms
- Keys and key lifetimes`}
              </div>
            </div>
          </div>
        </section>

        {/* Mobile IP */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-indigo-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-indigo-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
            Mobile IP
          </h2>
          
          <div className="space-y-4">
            <p className="text-gray-300">Allows mobile devices to maintain connectivity while moving between networks</p>
            
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-indigo-300 mb-3">Mobile IP Components</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gray-800/50 p-3 rounded border border-gray-600/30">
                  <h5 className="font-semibold text-indigo-300 mb-2">Mobile Node (MN)</h5>
                  <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                    <li>Device that moves</li>
                    <li>Has home address</li>
                    <li>Gets care-of address</li>
                    <li>Registers with HA</li>
                  </ul>
                </div>
                
                <div className="bg-gray-800/50 p-3 rounded border border-gray-600/30">
                  <h5 className="font-semibold text-indigo-300 mb-2">Home Agent (HA)</h5>
                  <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                    <li>Router in home network</li>
                    <li>Maintains binding table</li>
                    <li>Intercepts packets</li>
                    <li>Tunnels to MN</li>
                  </ul>
                </div>
                
                <div className="bg-gray-800/50 p-3 rounded border border-gray-600/30">
                  <h5 className="font-semibold text-indigo-300 mb-2">Foreign Agent (FA)</h5>
                  <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                    <li>Router in foreign network</li>
                    <li>Provides care-of address</li>
                    <li>Forwards registration</li>
                    <li>Decapsulates packets</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-indigo-300 mb-3">Mobile IP Operation</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
{`1. Agent Discovery:
   - HA/FA broadcast advertisements
   - MN listens for agents
   - Determines if in home/foreign network

2. Registration:
   - MN gets care-of address from FA
   - MN sends registration request to HA via FA
   - HA creates binding (home address ↔ care-of address)
   - HA sends registration reply

3. Packet Delivery:
   - Correspondent sends to MN's home address
   - HA intercepts packet (proxy ARP)
   - HA tunnels packet to care-of address
   - FA decapsulates and delivers to MN

4. Reverse Path:
   - MN can send directly to correspondent
   - Or use reverse tunneling through HA

Triangle Routing Problem:
CN → HA → FA → MN (inefficient)
Solution: Route optimization with binding updates`}
              </div>
            </div>
          </div>
        </section>

        {/* Protocol Comparison */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-gray-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-gray-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-gray-500 rounded-full mr-3"></span>
            Protocol Comparison
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm bg-gray-900/50 rounded shadow border border-gray-600/30">
              <thead className="bg-gray-800/80">
                <tr>
                  <th className="p-3 text-left text-gray-200">Protocol</th>
                  <th className="p-3 text-left text-gray-200">Purpose</th>
                  <th className="p-3 text-left text-gray-200">Layer</th>
                  <th className="p-3 text-left text-gray-200">Key Features</th>
                  <th className="p-3 text-left text-gray-200">Common Use</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-t border-gray-600/50">
                  <td className="p-3 font-semibold text-blue-400">IP</td>
                  <td className="p-3">Packet routing</td>
                  <td className="p-3">Network</td>
                  <td className="p-3">Addressing, fragmentation</td>
                  <td className="p-3">All internet traffic</td>
                </tr>
                <tr className="border-t border-gray-600/50">
                  <td className="p-3 font-semibold text-green-400">ICMP</td>
                  <td className="p-3">Error reporting</td>
                  <td className="p-3">Network</td>
                  <td className="p-3">Diagnostics, control</td>
                  <td className="p-3">Ping, traceroute</td>
                </tr>
                <tr className="border-t border-gray-600/50">
                  <td className="p-3 font-semibold text-purple-400">ARP</td>
                  <td className="p-3">Address resolution</td>
                  <td className="p-3">Network/Data Link</td>
                  <td className="p-3">IP to MAC mapping</td>
                  <td className="p-3">Local network communication</td>
                </tr>
                <tr className="border-t border-gray-600/50">
                  <td className="p-3 font-semibold text-yellow-400">IGMP</td>
                  <td className="p-3">Multicast management</td>
                  <td className="p-3">Network</td>
                  <td className="p-3">Group membership</td>
                  <td className="p-3">Video streaming, conferencing</td>
                </tr>
                <tr className="border-t border-gray-600/50">
                  <td className="p-3 font-semibold text-red-400">IPSec</td>
                  <td className="p-3">Security</td>
                  <td className="p-3">Network</td>
                  <td className="p-3">Encryption, authentication</td>
                  <td className="p-3">VPNs, secure communication</td>
                </tr>
                <tr className="border-t border-gray-600/50">
                  <td className="p-3 font-semibold text-indigo-400">Mobile IP</td>
                  <td className="p-3">Mobility support</td>
                  <td className="p-3">Network</td>
                  <td className="p-3">Location transparency</td>
                  <td className="p-3">Mobile devices, roaming</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NetworkProtocols;
