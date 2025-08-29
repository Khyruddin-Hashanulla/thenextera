import React from 'react';

const ErrorDetection = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Error Detection & Correction</h1>
        <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
          Error detection and correction techniques ensure reliable data transmission over unreliable communication channels by detecting and correcting transmission errors.
        </p>
      </div>

      <div className="space-y-6 sm:space-y-8">
        {/* Types of Errors */}
        <section className="bg-gray-700/50 border border-gray-600 p-4 sm:p-6 rounded-lg border-l-4 border-red-400">
          <h2 className="text-xl sm:text-2xl font-semibold text-red-400 mb-3 sm:mb-4">Types of Transmission Errors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-gray-800/70 border border-gray-600 p-3 sm:p-4 rounded">
              <h3 className="font-semibold text-red-300 mb-2 text-sm sm:text-base">Single-bit Error</h3>
              <p className="text-gray-300 text-xs sm:text-sm mb-2">Only one bit in the data unit is changed</p>
              <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs">
                <pre className="whitespace-pre">
{`Original: 10110001
Error:    10010001  (bit 3 flipped)
          ↑`}
                </pre>
              </div>
            </div>
            <div className="bg-gray-800/70 border border-gray-600 p-3 sm:p-4 rounded">
              <h3 className="font-semibold text-red-300 mb-2 text-sm sm:text-base">Burst Error</h3>
              <p className="text-gray-300 text-xs sm:text-sm mb-2">Multiple consecutive bits are changed</p>
              <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs">
                <pre className="whitespace-pre">
{`Original: 10110001
Error:    10001101  (bits 3-6 changed)
          ↑↑↑↑`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Parity Check */}
        <section className="bg-gray-700/50 border border-gray-600 p-4 sm:p-6 rounded-lg border-l-4 border-blue-400">
          <h2 className="text-xl sm:text-2xl font-semibold text-blue-400 mb-3 sm:mb-4">Parity Check</h2>
          
          <div className="space-y-3 sm:space-y-4">
            <p className="text-gray-300 text-sm sm:text-base">Simple error detection method using an additional parity bit</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-gray-800/70 border border-gray-600 p-3 sm:p-4 rounded">
                <h4 className="font-semibold text-blue-300 mb-2 text-sm sm:text-base">Even Parity</h4>
                <p className="text-gray-300 text-xs sm:text-sm mb-2">Total number of 1s (including parity) is even</p>
                <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs">
                  <pre className="whitespace-pre">
{`Data: 1011001 (4 ones)
Parity bit: 0 (to make total even)
Transmitted: 10110010`}
                  </pre>
                </div>
              </div>
              
              <div className="bg-gray-800/70 border border-gray-600 p-3 sm:p-4 rounded">
                <h4 className="font-semibold text-blue-300 mb-2 text-sm sm:text-base">Odd Parity</h4>
                <p className="text-gray-300 text-xs sm:text-sm mb-2">Total number of 1s (including parity) is odd</p>
                <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs">
                  <pre className="whitespace-pre">
{`Data: 1011001 (4 ones)
Parity bit: 1 (to make total odd)
Transmitted: 10110011`}
                  </pre>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/70 border border-gray-600 p-3 sm:p-4 rounded border-l-2 border-blue-400">
              <h4 className="font-semibold text-blue-300 mb-2 text-sm sm:text-base">Two-Dimensional Parity</h4>
              <p className="text-gray-300 text-xs sm:text-sm mb-2">Parity bits for both rows and columns</p>
              <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs">
                <pre className="whitespace-pre">
{`Data Block:
1 0 1 1 | 1  (row parity)
0 1 1 0 | 0
1 1 0 1 | 1
0 0 1 1 | 0
---------
0 0 1 1   (column parity)`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Checksum */}
        <section className="bg-gray-700/50 border border-gray-600 p-4 sm:p-6 rounded-lg border-l-4 border-green-400">
          <h2 className="text-xl sm:text-2xl font-semibold text-green-400 mb-3 sm:mb-4">Checksum</h2>
          
          <div className="space-y-3 sm:space-y-4">
            <p className="text-gray-300 text-sm sm:text-base">Error detection method based on sum of data segments</p>
            
            <div className="bg-gray-800/70 border border-gray-600 p-3 sm:p-4 rounded">
              <h4 className="font-semibold text-green-300 mb-3 text-sm sm:text-base">Internet Checksum Algorithm</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs">
                <pre className="whitespace-pre">
{`1. Divide data into 16-bit segments
2. Add all segments using 1's complement arithmetic
3. Take 1's complement of the sum = checksum
4. Append checksum to data

Example:
Segment 1: 1001100110011001
Segment 2: 1010101010101010
Sum:       0100010001000011
Checksum:  1011101110111100 (1's complement)`}
                </pre>
              </div>
            </div>
            
            <div className="bg-gray-800/70 border border-gray-600 p-3 sm:p-4 rounded">
              <h4 className="font-semibold text-green-300 mb-2 text-sm sm:text-base">Verification Process</h4>
              <ol className="list-decimal list-inside text-gray-300 text-xs sm:text-sm space-y-1">
                <li>Receiver adds all segments including checksum</li>
                <li>If result is all 1s, no error detected</li>
                <li>If result contains 0s, error detected</li>
              </ol>
            </div>
          </div>
        </section>

        {/* CRC */}
        <section className="bg-gray-700/50 border border-gray-600 p-4 sm:p-6 rounded-lg border-l-4 border-purple-400">
          <h2 className="text-xl sm:text-2xl font-semibold text-purple-400 mb-3 sm:mb-4">Cyclic Redundancy Check (CRC)</h2>
          
          <div className="space-y-3 sm:space-y-4">
            <p className="text-gray-300 text-sm sm:text-base">Most powerful error detection method using polynomial division</p>
            
            <div className="bg-gray-800/70 border border-gray-600 p-3 sm:p-4 rounded">
              <h4 className="font-semibold text-purple-300 mb-3 text-sm sm:text-base">CRC Process</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs">
                <pre className="whitespace-pre">
{`1. Choose generator polynomial G(x)
2. Append n zeros to data (n = degree of G(x))
3. Divide extended data by G(x) using XOR
4. Remainder = CRC code
5. Replace appended zeros with CRC

Example with G(x) = x³ + x + 1 (1011):
Data: 1101 → 1101000 (append 3 zeros)
Divide by 1011:
  1101000 ÷ 1011 = quotient, remainder = 001
CRC code: 001
Transmitted: 1101001`}
                </pre>
              </div>
            </div>
            
            <div className="bg-gray-800/70 border border-gray-600 p-3 sm:p-4 rounded">
              <h4 className="font-semibold text-purple-300 mb-2 text-sm sm:text-base">Common CRC Standards</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm">
                  <thead className="bg-gray-600">
                    <tr>
                      <th className="p-2 text-left text-cyan-400">Standard</th>
                      <th className="p-2 text-left text-cyan-400">Polynomial</th>
                      <th className="p-2 text-left text-cyan-400">Application</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-t border-gray-600">
                      <td className="p-2">CRC-8</td>
                      <td className="p-2 font-mono">x⁸ + x² + x + 1</td>
                      <td className="p-2">ATM, ISDN</td>
                    </tr>
                    <tr className="border-t border-gray-600">
                      <td className="p-2">CRC-16</td>
                      <td className="p-2 font-mono">x¹⁶ + x¹⁵ + x² + 1</td>
                      <td className="p-2">USB, Modbus</td>
                    </tr>
                    <tr className="border-t border-gray-600">
                      <td className="p-2">CRC-32</td>
                      <td className="p-2 font-mono">x³² + x²⁶ + x²³ + ...</td>
                      <td className="p-2">Ethernet, ZIP</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Hamming Code */}
        <section className="bg-gray-700/50 border border-gray-600 p-4 sm:p-6 rounded-lg border-l-4 border-yellow-400">
          <h2 className="text-xl sm:text-2xl font-semibold text-yellow-400 mb-3 sm:mb-4">Hamming Code</h2>
          
          <div className="space-y-3 sm:space-y-4">
            <p className="text-gray-300 text-sm sm:text-base">Error correction code that can detect and correct single-bit errors</p>
            
            <div className="bg-gray-800/70 border border-gray-600 p-3 sm:p-4 rounded">
              <h4 className="font-semibold text-yellow-300 mb-3 text-sm sm:text-base">Hamming Code Construction</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs">
                <pre className="whitespace-pre">
{`For m data bits, need r parity bits where 2^r ≥ m + r + 1

Example: 4 data bits (1011)
Need 3 parity bits (2³ = 8 ≥ 4 + 3 + 1)

Position: 1 2 3 4 5 6 7
Bit:      P₁ P₂ D₁ P₃ D₂ D₃ D₄
Data:     ?  ?  1  ?  0  1  1

P₁ covers positions 1,3,5,7: P₁ ⊕ D₁ ⊕ D₂ ⊕ D₄ = ? ⊕ 1 ⊕ 0 ⊕ 1 = 0
P₂ covers positions 2,3,6,7: P₂ ⊕ D₁ ⊕ D₃ ⊕ D₄ = ? ⊕ 1 ⊕ 1 ⊕ 1 = 1  
P₃ covers positions 4,5,6,7: P₃ ⊕ D₂ ⊕ D₃ ⊕ D₄ = ? ⊕ 0 ⊕ 1 ⊕ 1 = 0

Result: 0110111`}
                </pre>
              </div>
            </div>
            
            <div className="bg-gray-800/70 border border-gray-600 p-3 sm:p-4 rounded">
              <h4 className="font-semibold text-yellow-300 mb-2 text-sm sm:text-base">Error Detection & Correction</h4>
              <ol className="list-decimal list-inside text-gray-300 text-xs sm:text-sm space-y-1">
                <li>Calculate syndrome by checking parity bits</li>
                <li>If syndrome = 0, no error</li>
                <li>If syndrome ≠ 0, syndrome value indicates error position</li>
                <li>Flip the bit at error position to correct</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Reed-Solomon */}
        <section className="bg-gray-700/50 border border-gray-600 p-4 sm:p-6 rounded-lg border-l-4 border-indigo-400">
          <h2 className="text-xl sm:text-2xl font-semibold text-indigo-400 mb-3 sm:mb-4">Reed-Solomon Codes</h2>
          
          <div className="space-y-3 sm:space-y-4">
            <p className="text-gray-300 text-sm sm:text-base">Powerful error correction codes used in many applications</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-gray-800/70 border border-gray-600 p-3 sm:p-4 rounded">
                <h4 className="font-semibold text-indigo-300 mb-2 text-sm sm:text-base">Capabilities</h4>
                <ul className="list-disc list-inside text-gray-300 text-xs sm:text-sm space-y-1">
                  <li>Can correct multiple symbol errors</li>
                  <li>Works with symbols (not just bits)</li>
                  <li>Can correct up to t errors with 2t parity symbols</li>
                  <li>Excellent for burst error correction</li>
                </ul>
              </div>
              
              <div className="bg-gray-800/70 border border-gray-600 p-3 sm:p-4 rounded">
                <h4 className="font-semibold text-indigo-300 mb-2 text-sm sm:text-base">Applications</h4>
                <ul className="list-disc list-inside text-gray-300 text-xs sm:text-sm space-y-1">
                  <li>CD/DVD/Blu-ray discs</li>
                  <li>QR codes and barcodes</li>
                  <li>Satellite communications</li>
                  <li>Digital television (DVB)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="bg-gray-700/50 border border-gray-600 p-4 sm:p-6 rounded-lg border-l-4 border-gray-400">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-300 mb-3 sm:mb-4">Comparison of Error Control Methods</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm bg-gray-800/70 border border-gray-600 rounded">
              <thead className="bg-gray-600">
                <tr>
                  <th className="p-3 text-left text-cyan-400">Method</th>
                  <th className="p-3 text-left text-cyan-400">Detection</th>
                  <th className="p-3 text-left text-cyan-400">Correction</th>
                  <th className="p-3 text-left text-cyan-400">Overhead</th>
                  <th className="p-3 text-left text-cyan-400">Complexity</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-t border-gray-600">
                  <td className="p-3 font-semibold">Parity</td>
                  <td className="p-3">Single-bit</td>
                  <td className="p-3">No</td>
                  <td className="p-3">Low</td>
                  <td className="p-3">Very Low</td>
                </tr>
                <tr className="border-t border-gray-600">
                  <td className="p-3 font-semibold">Checksum</td>
                  <td className="p-3">Multiple-bit</td>
                  <td className="p-3">No</td>
                  <td className="p-3">Medium</td>
                  <td className="p-3">Low</td>
                </tr>
                <tr className="border-t border-gray-600">
                  <td className="p-3 font-semibold">CRC</td>
                  <td className="p-3">Excellent</td>
                  <td className="p-3">No</td>
                  <td className="p-3">Low-Medium</td>
                  <td className="p-3">Medium</td>
                </tr>
                <tr className="border-t border-gray-600">
                  <td className="p-3 font-semibold">Hamming</td>
                  <td className="p-3">Single-bit</td>
                  <td className="p-3">Single-bit</td>
                  <td className="p-3">High</td>
                  <td className="p-3">Medium</td>
                </tr>
                <tr className="border-t border-gray-600">
                  <td className="p-3 font-semibold">Reed-Solomon</td>
                  <td className="p-3">Excellent</td>
                  <td className="p-3">Multiple symbols</td>
                  <td className="p-3">High</td>
                  <td className="p-3">High</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ErrorDetection;
