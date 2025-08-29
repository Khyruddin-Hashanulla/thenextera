import React from 'react';

const DNSSystem = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4 border-l-4 border-blue-500 pl-4">DNS SYSTEM</h1>
        <p className="text-lg text-gray-300 leading-relaxed">
          The Domain Name System (DNS) is a hierarchical distributed naming system that translates human-readable domain names into IP addresses.
        </p>
      </div>

      <div className="space-y-8">
        {/* DNS OVERVIEW */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-blue-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
            DNS SYSTEM OVERVIEW
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-blue-300 mb-2">PRIMARY FUNCTIONS</h4>
              <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                <li>Domain name to IP address translation</li>
                <li>Reverse DNS lookups (IP to domain)</li>
                <li>Mail server discovery (MX records)</li>
                <li>Service discovery (SRV records)</li>
                <li>Load balancing and failover</li>
                <li>Domain validation and security</li>
              </ul>
            </div>
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-blue-300 mb-2">KEY CHARACTERISTICS</h4>
              <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                <li>Hierarchical structure</li>
                <li>Distributed database</li>
                <li>Caching for performance</li>
                <li>Redundancy and fault tolerance</li>
                <li>Global namespace</li>
                <li>Protocol independence</li>
              </ul>
            </div>
          </div>
        </section>

        {/* DNS HIERARCHY */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-green-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-green-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            DNS SYSTEM HIERARCHY STRUCTURE
          </h2>
          <div className="space-y-4">
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-green-300 mb-3">DOMAIN NAME STRUCTURE</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                <pre className="whitespace-pre">
{`WWW.EXAMPLE.COM.
 |    |      |  |
 |    |      |  └── ROOT (.)
 |    |      └───── TOP-LEVEL DOMAIN (TLD)
 |    └──────────── SECOND-LEVEL DOMAIN (SLD)
 └───────────────── SUBDOMAIN (THIRD-LEVEL)

HIERARCHY LEVELS:
1. ROOT DOMAIN (.)
2. TOP-LEVEL DOMAINS (.COM, .ORG, .NET)
3. SECOND-LEVEL DOMAINS (EXAMPLE.COM)
4. SUBDOMAINS (WWW.EXAMPLE.COM, MAIL.EXAMPLE.COM)`}
                </pre>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-green-300 mb-3">TLD CATEGORIES</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li><strong>GENERIC TLDs:</strong> .COM, .ORG, .NET, .INFO</li>
                  <li><strong>COUNTRY CODE TLDs:</strong> .US, .UK, .DE, .JP</li>
                  <li><strong>SPONSORED TLDs:</strong> .EDU, .GOV, .MIL</li>
                  <li><strong>NEW GTLDs:</strong> .APP, .DEV, .TECH, .BLOG</li>
                </ul>
              </div>
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-green-300 mb-3">ROOT SERVERS</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li>13 LOGICAL ROOT SERVER CLUSTERS (A-M)</li>
                  <li>HUNDREDS OF PHYSICAL INSTANCES WORLDWIDE</li>
                  <li>MANAGED BY DIFFERENT ORGANIZATIONS</li>
                  <li>AUTHORITATIVE FOR ROOT ZONE</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* DNS RECORD TYPES */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-purple-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
            DNS SYSTEM RECORD TYPES
          </h2>
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm bg-gray-900/50 rounded shadow border border-gray-600/30">
                <thead className="bg-gray-800/80">
                  <tr>
                    <th className="p-3 text-left text-gray-200">RECORD TYPE</th>
                    <th className="p-3 text-left text-gray-200">PURPOSE</th>
                    <th className="p-3 text-left text-gray-200">EXAMPLE</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-t border-gray-600/50">
                    <td className="p-3 font-semibold text-purple-400">A</td>
                    <td className="p-3">MAPS DOMAIN TO IPV4 ADDRESS</td>
                    <td className="p-3 font-mono text-xs">EXAMPLE.COM → 192.0.2.1</td>
                  </tr>
                  <tr className="border-t border-gray-600/50">
                    <td className="p-3 font-semibold text-purple-400">AAAA</td>
                    <td className="p-3">MAPS DOMAIN TO IPV6 ADDRESS</td>
                    <td className="p-3 font-mono text-xs">EXAMPLE.COM → 2001:DB8::1</td>
                  </tr>
                  <tr className="border-t border-gray-600/50">
                    <td className="p-3 font-semibold text-purple-400">CNAME</td>
                    <td className="p-3">CANONICAL NAME (ALIAS)</td>
                    <td className="p-3 font-mono text-xs">WWW → EXAMPLE.COM</td>
                  </tr>
                  <tr className="border-t border-gray-600/50">
                    <td className="p-3 font-semibold text-purple-400">MX</td>
                    <td className="p-3">MAIL EXCHANGE SERVER</td>
                    <td className="p-3 font-mono text-xs">10 MAIL.EXAMPLE.COM</td>
                  </tr>
                  <tr className="border-t border-gray-600/50">
                    <td className="p-3 font-semibold text-purple-400">NS</td>
                    <td className="p-3">NAME SERVER</td>
                    <td className="p-3 font-mono text-xs">NS1.EXAMPLE.COM</td>
                  </tr>
                  <tr className="border-t border-gray-600/50">
                    <td className="p-3 font-semibold text-purple-400">PTR</td>
                    <td className="p-3">REVERSE DNS LOOKUP</td>
                    <td className="p-3 font-mono text-xs">1.2.0.192.IN-ADDR.ARPA</td>
                  </tr>
                  <tr className="border-t border-gray-600/50">
                    <td className="p-3 font-semibold text-purple-400">SOA</td>
                    <td className="p-3">START OF AUTHORITY</td>
                    <td className="p-3 font-mono text-xs">ZONE METADATA</td>
                  </tr>
                  <tr className="border-t border-gray-600/50">
                    <td className="p-3 font-semibold text-purple-400">TXT</td>
                    <td className="p-3">TEXT INFORMATION</td>
                    <td className="p-3 font-mono text-xs">SPF, DKIM RECORDS</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* DNS RESOLUTION PROCESS */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-yellow-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-yellow-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
            DNS SYSTEM RESOLUTION PROCESS
          </h2>
          <div className="space-y-4">
            <p className="text-gray-300">
              DNS SYSTEM RESOLUTION INVOLVES MULTIPLE STEPS AND SERVERS TO TRANSLATE A DOMAIN NAME INTO AN IP ADDRESS.
            </p>
            
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-yellow-300 mb-3">RESOLUTION STEPS</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                <pre className="whitespace-pre">
{`CLIENT QUERY: WWW.EXAMPLE.COM

1. CLIENT → RECURSIVE RESOLVER
   "WHAT IS THE IP FOR WWW.EXAMPLE.COM?"

2. RECURSIVE RESOLVER → ROOT SERVER (.)
   "WHERE CAN I FIND .COM DOMAINS?"
   RESPONSE: "ASK THE .COM TLD SERVERS"

3. RECURSIVE RESOLVER → TLD SERVER (.COM)
   "WHERE CAN I FIND EXAMPLE.COM?"
   RESPONSE: "ASK NS1.EXAMPLE.COM"

4. RECURSIVE RESOLVER → AUTHORITATIVE SERVER
   "WHAT IS THE IP FOR WWW.EXAMPLE.COM?"
   RESPONSE: "192.0.2.1"

5. RECURSIVE RESOLVER → CLIENT
   "WWW.EXAMPLE.COM IS 192.0.2.1"

CACHE AT EACH LEVEL FOR FUTURE QUERIES`}
                </pre>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-yellow-300 mb-3">QUERY TYPES</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li><strong>RECURSIVE:</strong> FULL RESOLUTION BY RESOLVER</li>
                  <li><strong>ITERATIVE:</strong> STEP-BY-STEP REFERRALS</li>
                  <li><strong>NON-RECURSIVE:</strong> CACHE-ONLY LOOKUP</li>
                </ul>
              </div>
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-yellow-300 mb-3">RESPONSE CODES</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li><strong>NOERROR:</strong> SUCCESSFUL QUERY</li>
                  <li><strong>NXDOMAIN:</strong> DOMAIN DOESN'T EXIST</li>
                  <li><strong>SERVFAIL:</strong> SERVER FAILURE</li>
                  <li><strong>REFUSED:</strong> QUERY REFUSED</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* DNS CACHING */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-red-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-red-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
            DNS SYSTEM CACHING AND TTL
          </h2>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-red-300 mb-3">CACHE LEVELS</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li><strong>BROWSER CACHE:</strong> LOCAL BROWSER STORAGE</li>
                  <li><strong>OS CACHE:</strong> OPERATING SYSTEM RESOLVER</li>
                  <li><strong>ROUTER CACHE:</strong> LOCAL NETWORK EQUIPMENT</li>
                  <li><strong>ISP CACHE:</strong> INTERNET SERVICE PROVIDER</li>
                  <li><strong>PUBLIC RESOLVERS:</strong> GOOGLE, CLOUDFLARE DNS</li>
                </ul>
              </div>
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-red-300 mb-3">TTL (TIME TO LIVE)</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li>DETERMINES CACHE DURATION</li>
                  <li>SET BY AUTHORITATIVE SERVER</li>
                  <li>BALANCES PERFORMANCE VS FRESHNESS</li>
                  <li>COMMON VALUES: 300S - 86400S</li>
                  <li>LOWER TTL = MORE QUERIES, FRESHER DATA</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-red-300 mb-3">CACHE BEHAVIOR EXAMPLE</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                <pre className="whitespace-pre">
{`DNS RECORD WITH TTL:
EXAMPLE.COM.  3600  IN  A  192.0.2.1
              ^^^^
              TTL IN SECONDS (1 HOUR)

CACHE TIMELINE:
T=0:    QUERY SENT, RESPONSE CACHED (TTL=3600)
T=1800: CACHE HIT, TTL=1800 REMAINING
T=3600: CACHE EXPIRES, NEW QUERY NEEDED
T=3601: FRESH QUERY SENT TO AUTHORITATIVE SERVER

BENEFITS:
- REDUCED QUERY LOAD
- FASTER RESPONSE TIMES
- IMPROVED RELIABILITY`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* DNS SECURITY */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-indigo-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-indigo-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
            DNS SYSTEM SECURITY (DNSSEC)
          </h2>
          <div className="space-y-4">
            <p className="text-gray-300">
              DNSSEC PROVIDES AUTHENTICATION AND INTEGRITY FOR DNS RESPONSES USING DIGITAL SIGNATURES.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-indigo-300 mb-3">SECURITY THREATS</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li><strong>DNS SPOOFING:</strong> FAKE DNS RESPONSES</li>
                  <li><strong>CACHE POISONING:</strong> CORRUPT CACHED DATA</li>
                  <li><strong>MAN-IN-THE-MIDDLE:</strong> INTERCEPT QUERIES</li>
                  <li><strong>DDOS ATTACKS:</strong> OVERWHELM DNS SERVERS</li>
                  <li><strong>DNS HIJACKING:</strong> REDIRECT TRAFFIC</li>
                </ul>
              </div>
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-indigo-300 mb-3">DNSSEC RECORD TYPES</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li><strong>DNSKEY:</strong> PUBLIC KEY FOR ZONE</li>
                  <li><strong>RRSIG:</strong> DIGITAL SIGNATURE</li>
                  <li><strong>DS:</strong> DELEGATION SIGNER</li>
                  <li><strong>NSEC/NSEC3:</strong> AUTHENTICATED DENIAL</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-indigo-300 mb-3">DNSSEC VALIDATION PROCESS</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                <pre className="whitespace-pre">
{`CHAIN OF TRUST:
ROOT ZONE (.) → TLD (.COM) → DOMAIN (EXAMPLE.COM)

1. ROOT ZONE SIGNED BY ROOT KEY
2. .COM ZONE SIGNED, DS RECORD IN ROOT
3. EXAMPLE.COM SIGNED, DS RECORD IN .COM
4. WWW.EXAMPLE.COM RECORD SIGNED BY EXAMPLE.COM KEY

VALIDATION:
- VERIFY SIGNATURE WITH PUBLIC KEY
- CHECK KEY AUTHENTICITY VIA DS RECORDS
- FOLLOW CHAIN UP TO TRUSTED ROOT KEY
- REJECT IF ANY SIGNATURE FAILS`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* DNS OVER HTTPS/TLS */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-orange-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-orange-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
            MODERN DNS SYSTEM PROTOCOLS
          </h2>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-orange-300 mb-3">DNS OVER HTTPS (DOH)</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li>ENCRYPTS DNS QUERIES OVER HTTPS</li>
                  <li>PORT 443 (STANDARD HTTPS)</li>
                  <li>HARDER TO BLOCK OR MONITOR</li>
                  <li>SUPPORTED BY MAJOR BROWSERS</li>
                  <li>RFC 8484 STANDARD</li>
                </ul>
              </div>
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-orange-300 mb-3">DNS OVER TLS (DOT)</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li>ENCRYPTS DNS QUERIES OVER TLS</li>
                  <li>DEDICATED PORT 853</li>
                  <li>LOWER OVERHEAD THAN DOH</li>
                  <li>EASIER TO IDENTIFY AND MANAGE</li>
                  <li>RFC 7858 STANDARD</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-orange-300 mb-3">PUBLIC DNS SYSTEM RESOLVERS</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm bg-gray-800/50 rounded border border-gray-600/30">
                  <thead className="bg-gray-700/50">
                    <tr>
                      <th className="p-2 text-left text-gray-200">PROVIDER</th>
                      <th className="p-2 text-left text-gray-200">IPV4</th>
                      <th className="p-2 text-left text-gray-200">IPV6</th>
                      <th className="p-2 text-left text-gray-200">FEATURES</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300 text-xs">
                    <tr className="border-t border-gray-600/50">
                      <td className="p-2 font-semibold text-orange-400">GOOGLE</td>
                      <td className="p-2 font-mono">8.8.8.8</td>
                      <td className="p-2 font-mono">2001:4860:4860::8888</td>
                      <td className="p-2">FAST, RELIABLE</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-2 font-semibold text-orange-400">CLOUDFLARE</td>
                      <td className="p-2 font-mono">1.1.1.1</td>
                      <td className="p-2 font-mono">2606:4700:4700::1111</td>
                      <td className="p-2">PRIVACY-FOCUSED</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-2 font-semibold text-orange-400">QUAD9</td>
                      <td className="p-2 font-mono">9.9.9.9</td>
                      <td className="p-2 font-mono">2620:FE::FE</td>
                      <td className="p-2">SECURITY FILTERING</td>
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

export default DNSSystem;
