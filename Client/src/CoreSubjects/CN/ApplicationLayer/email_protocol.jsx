import React from 'react';

const EmailProtocol = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4 border-l-4 border-blue-500 pl-4">Email Protocols</h1>
        <p className="text-lg text-gray-300 leading-relaxed">
          Email protocols enable the transmission, retrieval, and management of electronic messages across networks using standardized communication methods.
        </p>
      </div>

      <div className="space-y-8">
        {/* Email System Overview */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-blue-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
            Email System Overview
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-blue-300 mb-2">Core Components</h4>
              <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                <li><strong>Mail User Agent (MUA):</strong> Email client</li>
                <li><strong>Mail Transfer Agent (MTA):</strong> SMTP server</li>
                <li><strong>Mail Delivery Agent (MDA):</strong> Local delivery</li>
                <li><strong>Mail Access Agent (MAA):</strong> POP3/IMAP server</li>
                <li><strong>DNS MX Records:</strong> Mail routing</li>
              </ul>
            </div>
            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-blue-300 mb-2">Email Flow</h4>
              <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                <li>Compose message in email client</li>
                <li>Submit to outgoing SMTP server</li>
                <li>Route through intermediate MTAs</li>
                <li>Deliver to recipient's mail server</li>
                <li>Store in recipient's mailbox</li>
                <li>Retrieve via POP3/IMAP</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SMTP Protocol */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-green-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-green-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            SMTP (Simple Mail Transfer Protocol)
          </h2>
          <div className="space-y-4">
            <p className="text-gray-300">
              SMTP is the standard protocol for sending email messages between servers and from clients to servers.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-green-300 mb-3">SMTP Characteristics</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li>Text-based protocol</li>
                  <li>Uses TCP port 25 (standard)</li>
                  <li>Port 587 (submission)</li>
                  <li>Port 465 (SMTPS - deprecated)</li>
                  <li>Push protocol (sender initiated)</li>
                  <li>Store-and-forward mechanism</li>
                </ul>
              </div>
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-green-300 mb-3">SMTP Commands</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li><strong>HELO/EHLO:</strong> Identify client</li>
                  <li><strong>MAIL FROM:</strong> Specify sender</li>
                  <li><strong>RCPT TO:</strong> Specify recipient</li>
                  <li><strong>DATA:</strong> Message content</li>
                  <li><strong>QUIT:</strong> Close connection</li>
                  <li><strong>RSET:</strong> Reset transaction</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-green-300 mb-3">SMTP Transaction Example</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                <pre className="whitespace-pre">
{`Client                           Server
  |                                 |
  | TCP Connection (Port 25)        |
  |<===============================>|
  |                                 |
  |                            220 mail.example.com ESMTP
  |<--------------------------------|
  |                                 |
  | EHLO client.example.org         |
  |-------------------------------->|
  |                                 |
  |                            250-mail.example.com Hello
  |                            250-SIZE 52428800
  |                            250-AUTH LOGIN PLAIN
  |                            250 STARTTLS
  |<--------------------------------|
  |                                 |
  | MAIL FROM:<sender@example.org>  |
  |-------------------------------->|
  |                                 |
  |                            250 OK
  |<--------------------------------|
  |                                 |
  | RCPT TO:<recipient@example.com> |
  |-------------------------------->|
  |                                 |
  |                            250 OK
  |<--------------------------------|
  |                                 |
  | DATA                            |
  |-------------------------------->|
  |                                 |
  |                            354 Start mail input
  |<--------------------------------|
  |                                 |
  | Subject: Test Message           |
  | From: sender@example.org        |
  | To: recipient@example.com       |
  |                                 |
  | Hello, this is a test message.  |
  | .                               |
  |-------------------------------->|
  |                                 |
  |                            250 Message accepted
  |<--------------------------------|
  |                                 |
  | QUIT                            |
  |-------------------------------->|
  |                                 |
  |                            221 Goodbye
  |<--------------------------------|`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* POP3 Protocol */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-purple-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
            POP3 (Post Office Protocol v3)
          </h2>
          <div className="space-y-4">
            <p className="text-gray-300">
              POP3 is a simple protocol for downloading email messages from a server to a local client.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-purple-300 mb-3">POP3 Characteristics</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li>Download-and-delete model</li>
                  <li>Uses TCP port 110 (standard)</li>
                  <li>Port 995 (POP3S - SSL/TLS)</li>
                  <li>Stateless protocol</li>
                  <li>Offline email access</li>
                  <li>Single device oriented</li>
                </ul>
              </div>
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-purple-300 mb-3">POP3 States</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li><strong>Authorization:</strong> User authentication</li>
                  <li><strong>Transaction:</strong> Message operations</li>
                  <li><strong>Update:</strong> Apply changes and quit</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-purple-300 mb-3">POP3 Commands</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm bg-gray-800/50 rounded border border-gray-600/30">
                  <thead className="bg-gray-700/50">
                    <tr>
                      <th className="p-2 text-left text-gray-200">Command</th>
                      <th className="p-2 text-left text-gray-200">Purpose</th>
                      <th className="p-2 text-left text-gray-200">Example</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300 text-xs">
                    <tr className="border-t border-gray-600/50">
                      <td className="p-2 font-semibold text-purple-400">USER</td>
                      <td className="p-2">Specify username</td>
                      <td className="p-2 font-mono">USER john@example.com</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-2 font-semibold text-purple-400">PASS</td>
                      <td className="p-2">Provide password</td>
                      <td className="p-2 font-mono">PASS secret123</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-2 font-semibold text-purple-400">STAT</td>
                      <td className="p-2">Mailbox statistics</td>
                      <td className="p-2 font-mono">+OK 3 messages (1024 bytes)</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-2 font-semibold text-purple-400">LIST</td>
                      <td className="p-2">List messages</td>
                      <td className="p-2 font-mono">LIST 1</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-2 font-semibold text-purple-400">RETR</td>
                      <td className="p-2">Retrieve message</td>
                      <td className="p-2 font-mono">RETR 1</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-2 font-semibold text-purple-400">DELE</td>
                      <td className="p-2">Mark for deletion</td>
                      <td className="p-2 font-mono">DELE 1</td>
                    </tr>
                    <tr className="border-t border-gray-600/50">
                      <td className="p-2 font-semibold text-purple-400">QUIT</td>
                      <td className="p-2">Close connection</td>
                      <td className="p-2 font-mono">QUIT</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* IMAP Protocol */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-yellow-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-yellow-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
            IMAP (Internet Message Access Protocol)
          </h2>
          <div className="space-y-4">
            <p className="text-gray-300">
              IMAP allows clients to access and manage email messages stored on a mail server with advanced features.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-yellow-300 mb-3">IMAP Advantages</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li>Server-side message storage</li>
                  <li>Multi-device synchronization</li>
                  <li>Folder management</li>
                  <li>Partial message download</li>
                  <li>Server-side search</li>
                  <li>Message flags and labels</li>
                </ul>
              </div>
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-yellow-300 mb-3">IMAP Features</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li>Uses TCP port 143 (standard)</li>
                  <li>Port 993 (IMAPS - SSL/TLS)</li>
                  <li>Stateful protocol</li>
                  <li>Online and offline modes</li>
                  <li>Hierarchical folder structure</li>
                  <li>Message threading</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-yellow-300 mb-3">IMAP States and Commands</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                <pre className="whitespace-pre">
{`IMAP States:
1. Not Authenticated
2. Authenticated  
3. Selected
4. Logout

Common Commands:
- LOGIN: Authenticate user
- SELECT: Choose mailbox
- FETCH: Retrieve messages/parts
- SEARCH: Find messages
- STORE: Modify message flags
- COPY: Copy messages
- EXPUNGE: Permanently delete
- CREATE: Create mailbox
- LIST: List mailboxes
- LOGOUT: Close connection

Example Session:
C: A001 LOGIN john@example.com password
S: A001 OK LOGIN completed
C: A002 SELECT INBOX
S: A002 OK SELECT completed
C: A003 FETCH 1:5 (FLAGS BODY[HEADER])
S: A003 OK FETCH completed`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Protocol Comparison */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-red-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-red-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
            POP3 vs IMAP Comparison
          </h2>
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm bg-gray-900/50 rounded shadow border border-gray-600/30">
                <thead className="bg-gray-800/80">
                  <tr>
                    <th className="p-3 text-left text-gray-200">Feature</th>
                    <th className="p-3 text-left text-gray-200">POP3</th>
                    <th className="p-3 text-left text-gray-200">IMAP</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-t border-gray-600/50">
                    <td className="p-3 font-semibold text-red-400">Storage Location</td>
                    <td className="p-3 text-yellow-400">Local client</td>
                    <td className="p-3 text-green-400">Server-side</td>
                  </tr>
                  <tr className="border-t border-gray-600/50">
                    <td className="p-3 font-semibold text-red-400">Multi-device Access</td>
                    <td className="p-3 text-red-400">Poor</td>
                    <td className="p-3 text-green-400">Excellent</td>
                  </tr>
                  <tr className="border-t border-gray-600/50">
                    <td className="p-3 font-semibold text-red-400">Offline Access</td>
                    <td className="p-3 text-green-400">Full</td>
                    <td className="p-3 text-yellow-400">Cached messages only</td>
                  </tr>
                  <tr className="border-t border-gray-600/50">
                    <td className="p-3 font-semibold text-red-400">Server Storage</td>
                    <td className="p-3 text-green-400">Minimal</td>
                    <td className="p-3 text-red-400">High</td>
                  </tr>
                  <tr className="border-t border-gray-600/50">
                    <td className="p-3 font-semibold text-red-400">Folder Management</td>
                    <td className="p-3 text-red-400">Limited</td>
                    <td className="p-3 text-green-400">Full support</td>
                  </tr>
                  <tr className="border-t border-gray-600/50">
                    <td className="p-3 font-semibold text-red-400">Bandwidth Usage</td>
                    <td className="p-3 text-green-400">Lower</td>
                    <td className="p-3 text-yellow-400">Higher</td>
                  </tr>
                  <tr className="border-t border-gray-600/50">
                    <td className="p-3 font-semibold text-red-400">Search Capability</td>
                    <td className="p-3 text-red-400">Client-side only</td>
                    <td className="p-3 text-green-400">Server-side</td>
                  </tr>
                  <tr className="border-t border-gray-600/50">
                    <td className="p-3 font-semibold text-red-400">Best Use Case</td>
                    <td className="p-3">Single device, limited storage</td>
                    <td className="p-3">Multiple devices, collaboration</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Email Security */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-indigo-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-indigo-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
            Email Security
          </h2>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-indigo-300 mb-3">Authentication Methods</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li><strong>SPF:</strong> Sender Policy Framework</li>
                  <li><strong>DKIM:</strong> DomainKeys Identified Mail</li>
                  <li><strong>DMARC:</strong> Domain-based Message Authentication</li>
                  <li><strong>SMTP AUTH:</strong> SMTP authentication</li>
                  <li><strong>OAuth 2.0:</strong> Modern authentication</li>
                </ul>
              </div>
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-indigo-300 mb-3">Encryption</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li><strong>STARTTLS:</strong> Opportunistic encryption</li>
                  <li><strong>SSL/TLS:</strong> Transport encryption</li>
                  <li><strong>S/MIME:</strong> Message-level encryption</li>
                  <li><strong>PGP/GPG:</strong> End-to-end encryption</li>
                  <li><strong>MTA-STS:</strong> Strict Transport Security</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-indigo-300 mb-3">Security Best Practices</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h5 className="font-semibold text-indigo-400 mb-2">Server Security</h5>
                  <ul className="list-disc list-inside text-gray-300 text-xs space-y-1">
                    <li>Use strong authentication</li>
                    <li>Enable encryption (TLS)</li>
                    <li>Implement rate limiting</li>
                    <li>Regular security updates</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-indigo-400 mb-2">Client Security</h5>
                  <ul className="list-disc list-inside text-gray-300 text-xs space-y-1">
                    <li>Use secure connections</li>
                    <li>Verify certificates</li>
                    <li>Strong passwords/2FA</li>
                    <li>Regular client updates</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-indigo-400 mb-2">Message Security</h5>
                  <ul className="list-disc list-inside text-gray-300 text-xs space-y-1">
                    <li>Digital signatures</li>
                    <li>Message encryption</li>
                    <li>Spam filtering</li>
                    <li>Virus scanning</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Modern Email Trends */}
        <section className="bg-gray-800/70 p-6 rounded-lg border border-orange-500/30 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-orange-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
            Modern Email Technologies
          </h2>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-orange-300 mb-3">Cloud Email Services</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li><strong>Microsoft 365:</strong> Exchange Online</li>
                  <li><strong>Google Workspace:</strong> Gmail for Business</li>
                  <li><strong>Amazon SES:</strong> Simple Email Service</li>
                  <li><strong>Proton Mail:</strong> Privacy-focused</li>
                  <li><strong>Zoho Mail:</strong> Business email</li>
                </ul>
              </div>
              <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
                <h4 className="font-semibold text-orange-300 mb-3">Advanced Features</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li>AI-powered spam filtering</li>
                  <li>Smart categorization</li>
                  <li>Real-time collaboration</li>
                  <li>Mobile optimization</li>
                  <li>API integrations</li>
                  <li>Analytics and reporting</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-900/50 p-4 rounded border border-gray-600/30">
              <h4 className="font-semibold text-orange-300 mb-3">Email Standards Evolution</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs border border-gray-700">
                <pre className="whitespace-pre">
{`Timeline of Email Standards:
1971: First email sent (Ray Tomlinson)
1982: SMTP RFC 821
1988: POP2 RFC 1081
1994: IMAP4 RFC 1730
1995: MIME RFC 2045-2049
2001: SMTP Extensions RFC 2821
2008: DKIM RFC 4871
2012: DMARC RFC 7489
2018: MTA-STS RFC 8461

Current Trends:
- Zero-trust security models
- AI-powered threat detection
- Enhanced privacy controls
- Mobile-first design
- API-driven integrations`}
                </pre>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EmailProtocol;
