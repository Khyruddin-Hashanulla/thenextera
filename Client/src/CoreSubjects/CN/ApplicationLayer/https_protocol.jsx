import React from 'react';

const HTTPSProtocol = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4 border-l-4 border-blue-500 pl-4">HTTPS PROTOCOL</h1>
        <p className="text-lg text-gray-300 leading-relaxed">
          HTTPS (HTTP Secure) is an extension of HTTP that uses encryption via SSL/TLS to provide secure communication over computer networks.
        </p>
      </div>

      <div className="space-y-8">
        {/* HTTPS Overview */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-blue-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
            HTTPS OVERVIEW
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-blue-300 mb-2">Key Features</h4>
              <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                <li>Encrypted communication</li>
                <li>Data integrity protection</li>
                <li>Server authentication</li>
                <li>Client authentication (optional)</li>
                <li>Protection against eavesdropping</li>
                <li>Prevention of tampering</li>
              </ul>
            </div>
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-blue-300 mb-2">Security Benefits</h4>
              <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                <li>Confidentiality through encryption</li>
                <li>Integrity via digital signatures</li>
                <li>Authentication using certificates</li>
                <li>Non-repudiation</li>
                <li>Protection from man-in-the-middle attacks</li>
                <li>SEO benefits (Google ranking factor)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* HTTP vs HTTPS */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-green-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-green-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            HTTP vs HTTPS COMPARISON
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm bg-gray-900/50 rounded shadow border border-gray-600/30">
              <thead className="bg-gray-800/80">
                <tr>
                  <th className="p-3 text-left text-gray-200">Aspect</th>
                  <th className="p-3 text-left text-gray-200">HTTP</th>
                  <th className="p-3 text-left text-gray-200">HTTPS</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-t border-gray-600/50">
                  <td className="p-3 font-semibold text-green-400">Security</td>
                  <td className="p-3 text-red-400">Unencrypted</td>
                  <td className="p-3 text-green-400">Encrypted (SSL/TLS)</td>
                </tr>
                <tr className="border-t border-gray-600/50">
                  <td className="p-3 font-semibold text-green-400">Port</td>
                  <td className="p-3">80</td>
                  <td className="p-3">443</td>
                </tr>
                <tr className="border-t border-gray-600/50">
                  <td className="p-3 font-semibold text-green-400">URL Prefix</td>
                  <td className="p-3">http://</td>
                  <td className="p-3">https://</td>
                </tr>
                <tr className="border-t border-gray-600/50">
                  <td className="p-3 font-semibold text-green-400">Certificate</td>
                  <td className="p-3 text-red-400">Not required</td>
                  <td className="p-3 text-green-400">SSL/TLS certificate required</td>
                </tr>
                <tr className="border-t border-gray-600/50">
                  <td className="p-3 font-semibold text-green-400">Performance</td>
                  <td className="p-3 text-green-400">Faster</td>
                  <td className="p-3 text-yellow-400">Slightly slower (encryption overhead)</td>
                </tr>
                <tr className="border-t border-gray-600/50">
                  <td className="p-3 font-semibold text-green-400">SEO Impact</td>
                  <td className="p-3 text-red-400">Lower ranking</td>
                  <td className="p-3 text-green-400">Higher ranking (Google preference)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SSL/TLS Handshake */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-purple-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
            SSL/TLS HANDSHAKE PROCESS
          </h2>
          <div className="space-y-4">
            <p className="text-gray-300">
              The SSL/TLS handshake establishes a secure connection between client and server before data transmission.
            </p>
            
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-purple-300 mb-3">Handshake Steps</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                <pre className="whitespace-pre">
{`Client                           Server
  |                                 |
  | 1. ClientHello                  |
  |   - TLS version                 |
  |   - Cipher suites               |
  |   - Random number               |
  |-------------------------------->|
  |                                 |
  | 2. ServerHello                  |
  |   - Selected TLS version        |
  |   - Selected cipher suite       |
  |   - Random number               |
  |<--------------------------------|
  |                                 |
  | 3. Certificate                  |
  |   - Server's public key         |
  |<--------------------------------|
  |                                 |
  | 4. ServerHelloDone              |
  |<--------------------------------|
  |                                 |
  | 5. ClientKeyExchange            |
  |   - Pre-master secret           |
  |   (encrypted with server's      |
  |    public key)                  |
  |-------------------------------->|
  |                                 |
  | 6. ChangeCipherSpec             |
  |-------------------------------->|
  |                                 |
  | 7. Finished                     |
  |   (encrypted with session key)  |
  |-------------------------------->|
  |                                 |
  | 8. ChangeCipherSpec             |
  |<--------------------------------|
  |                                 |
  | 9. Finished                     |
  |   (encrypted with session key)  |
  |<--------------------------------|
  |                                 |
  |    Secure Communication         |
  |<===============================>|`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Certificates and PKI */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-yellow-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-yellow-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
            SSL/TLS CERTIFICATES AND PKI
          </h2>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-yellow-300 mb-3">Certificate Types</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li><strong>Domain Validated (DV):</strong> Basic validation</li>
                  <li><strong>Organization Validated (OV):</strong> Business verification</li>
                  <li><strong>Extended Validation (EV):</strong> Highest assurance</li>
                  <li><strong>Wildcard:</strong> Covers subdomains</li>
                  <li><strong>Multi-Domain (SAN):</strong> Multiple domains</li>
                </ul>
              </div>
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-yellow-300 mb-3">Certificate Authorities</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li><strong>Let's Encrypt:</strong> Free, automated</li>
                  <li><strong>DigiCert:</strong> Premium CA</li>
                  <li><strong>Comodo/Sectigo:</strong> Popular choice</li>
                  <li><strong>GlobalSign:</strong> Enterprise solutions</li>
                  <li><strong>GeoTrust:</strong> Budget-friendly</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-yellow-300 mb-3">Certificate Structure</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                <pre className="whitespace-pre">
{`X.509 Certificate Contents:
- Version: X.509 version (v3)
- Serial Number: Unique identifier
- Signature Algorithm: RSA, ECDSA, etc.
- Issuer: Certificate Authority name
- Validity Period: Not before/after dates
- Subject: Domain/organization info
- Public Key: Server's public key
- Extensions: Key usage, SAN, etc.
- Digital Signature: CA's signature`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Encryption Algorithms */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-red-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-red-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
            ENCRYPTION ALGORITHMS AND CIPHER SUITES
          </h2>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-red-300 mb-3">Symmetric Encryption</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li><strong>AES-256:</strong> Advanced Encryption Standard</li>
                  <li><strong>AES-128:</strong> Faster, still secure</li>
                  <li><strong>ChaCha20:</strong> Stream cipher (mobile-friendly)</li>
                  <li><strong>3DES:</strong> Legacy, being phased out</li>
                </ul>
              </div>
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-red-300 mb-3">Asymmetric Encryption</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li><strong>RSA:</strong> Widely supported, 2048+ bits</li>
                  <li><strong>ECDSA:</strong> Elliptic curve, more efficient</li>
                  <li><strong>EdDSA:</strong> Modern, high performance</li>
                  <li><strong>DH/ECDH:</strong> Key exchange algorithms</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-red-300 mb-3">Modern Cipher Suite Example</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                <pre className="whitespace-pre">
{`TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384

Components:
- TLS: Protocol version
- ECDHE: Elliptic Curve Diffie-Hellman Ephemeral (key exchange)
- RSA: Authentication algorithm
- AES_256_GCM: Symmetric encryption (AES 256-bit with GCM mode)
- SHA384: Hash function for message authentication

Perfect Forward Secrecy: ✓ (ECDHE provides this)`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* TLS Versions */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-indigo-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-indigo-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
            TLS VERSIONS AND SECURITY
          </h2>
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm bg-gray-900/50 rounded shadow border border-gray-600/30">
                <thead className="bg-gray-800/80">
                  <tr>
                    <th className="p-3 text-left text-gray-200">Version</th>
                    <th className="p-3 text-left text-gray-200">Year</th>
                    <th className="p-3 text-left text-gray-200">Status</th>
                    <th className="p-3 text-left text-gray-200">Key Features</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-t border-gray-600/50">
                    <td className="p-3 font-semibold text-red-400">SSL 3.0</td>
                    <td className="p-3">1996</td>
                    <td className="p-3 text-red-400">Deprecated</td>
                    <td className="p-3">Vulnerable to POODLE attack</td>
                  </tr>
                  <tr className="border-t border-gray-600/50">
                    <td className="p-3 font-semibold text-red-400">TLS 1.0</td>
                    <td className="p-3">1999</td>
                    <td className="p-3 text-red-400">Deprecated</td>
                    <td className="p-3">Vulnerable to BEAST, POODLE</td>
                  </tr>
                  <tr className="border-t border-gray-600/50">
                    <td className="p-3 font-semibold text-yellow-400">TLS 1.1</td>
                    <td className="p-3">2006</td>
                    <td className="p-3 text-red-400">Deprecated</td>
                    <td className="p-3">Fixed BEAST, still has weaknesses</td>
                  </tr>
                  <tr className="border-t border-gray-600/50">
                    <td className="p-3 font-semibold text-green-400">TLS 1.2</td>
                    <td className="p-3">2008</td>
                    <td className="p-3 text-green-400">Widely used</td>
                    <td className="p-3">AEAD ciphers, SHA-256</td>
                  </tr>
                  <tr className="border-t border-gray-600/50">
                    <td className="p-3 font-semibold text-green-400">TLS 1.3</td>
                    <td className="p-3">2018</td>
                    <td className="p-3 text-green-400">Latest</td>
                    <td className="p-3">Faster handshake, improved security</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-indigo-300 mb-3">TLS 1.3 Improvements</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold text-indigo-400 mb-2">Performance</h5>
                  <ul className="list-disc list-inside text-gray-300 text-xs space-y-1">
                    <li>1-RTT handshake (vs 2-RTT in 1.2)</li>
                    <li>0-RTT resumption</li>
                    <li>Faster connection establishment</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-indigo-400 mb-2">Security</h5>
                  <ul className="list-disc list-inside text-gray-300 text-xs space-y-1">
                    <li>Removed weak cipher suites</li>
                    <li>Perfect forward secrecy mandatory</li>
                    <li>Encrypted handshake messages</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HTTPS Implementation */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-orange-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-orange-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
            HTTPS IMPLEMENTATION BEST PRACTICES
          </h2>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-orange-300 mb-3">Server Configuration</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li>Use TLS 1.2+ only</li>
                  <li>Strong cipher suites</li>
                  <li>HSTS headers</li>
                  <li>Certificate pinning</li>
                  <li>OCSP stapling</li>
                  <li>Perfect forward secrecy</li>
                </ul>
              </div>
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-orange-300 mb-3">Security Headers</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li><strong>HSTS:</strong> Force HTTPS</li>
                  <li><strong>CSP:</strong> Content Security Policy</li>
                  <li><strong>X-Frame-Options:</strong> Clickjacking protection</li>
                  <li><strong>X-Content-Type-Options:</strong> MIME sniffing</li>
                  <li><strong>Referrer-Policy:</strong> Control referrer info</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-orange-300 mb-3">HSTS Header Example</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                <pre className="whitespace-pre">
{`Strict-Transport-Security: max-age=31536000; includeSubDomains; preload

Components:
- max-age=31536000: Cache for 1 year
- includeSubDomains: Apply to all subdomains
- preload: Include in browser preload lists

Benefits:
- Prevents protocol downgrade attacks
- Protects against cookie hijacking
- Eliminates mixed content warnings`}
                </pre>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HTTPSProtocol;
