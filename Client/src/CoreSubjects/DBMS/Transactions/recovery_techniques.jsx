import React from 'react';

const RecoveryTechniquesSubtopic = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-cyan-400 mb-4">Recovery Techniques</h1>
        <p className="text-lg text-gray-300 leading-relaxed">
          Learn database recovery methods, logging techniques, and failure handling to ensure data durability and consistency.
        </p>
      </div>

      <div className="space-y-8">
        {/* Types of Failures */}
        <section>
          <h2 className="text-2xl font-semibold text-green-400 mb-4">Types of Database Failures</h2>
          <div className="bg-gray-700/50 border border-gray-600 p-6 rounded-lg">
            <p className="text-gray-300 mb-4">
              Database systems must handle various types of failures to maintain data integrity:
            </p>
            
            <div className="space-y-4">
              <div className="bg-gray-900 p-4 rounded border-l-4 border-red-500">
                <h4 className="font-semibold text-red-400 mb-2">1. Transaction Failures</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-800 p-3 rounded">
                    <h5 className="font-semibold text-white mb-2">Logical Errors</h5>
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                      <li>Division by zero</li>
                      <li>Invalid data input</li>
                      <li>Constraint violations</li>
                      <li>Deadlock detection</li>
                    </ul>
                  </div>
                  <div className="bg-gray-800 p-3 rounded">
                    <h5 className="font-semibold text-white mb-2">System Errors</h5>
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                      <li>Memory overflow</li>
                      <li>Resource unavailability</li>
                      <li>Operating system errors</li>
                      <li>Network timeouts</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 p-4 rounded border-l-4 border-red-500">
                <h4 className="font-semibold text-red-400 mb-2">2. System Failures</h4>
                <div className="bg-gray-800 p-3 rounded">
                  <p className="text-gray-300 text-sm mb-2">
                    <strong className="text-white">System Crash:</strong> Loss of main memory contents due to power failure, 
                    hardware malfunction, or software bugs. Secondary storage remains intact.
                  </p>
                  <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                    <li>Power outages</li>
                    <li>Operating system crashes</li>
                    <li>DBMS software failures</li>
                    <li>Hardware component failures</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-900 p-4 rounded border-l-4 border-red-500">
                <h4 className="font-semibold text-red-400 mb-2">3. Media Failures</h4>
                <div className="bg-gray-800 p-3 rounded">
                  <p className="text-gray-300 text-sm mb-2">
                    <strong className="text-white">Disk Failure:</strong> Loss of secondary storage data due to disk crashes, 
                    head crashes, or controller failures.
                  </p>
                  <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                    <li>Disk head crashes</li>
                    <li>Disk controller failures</li>
                    <li>Storage media corruption</li>
                    <li>Natural disasters</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Log-Based Recovery */}
        <section>
          <h2 className="text-2xl font-semibold text-purple-400 mb-4">Log-Based Recovery</h2>
          <div className="bg-gray-700/50 border border-gray-600 p-6 rounded-lg">
            <p className="text-gray-300 mb-4">
              <strong className="text-white">Transaction Logs</strong> record all database modifications to enable recovery from failures.
            </p>
            
            <div className="space-y-4">
              <div className="bg-gray-900 p-4 rounded border-l-4 border-purple-500">
                <h4 className="font-semibold text-purple-400 mb-2">Log Record Structure:</h4>
                <div className="bg-gray-800 p-3 rounded">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong className="text-white">Basic Log Record Fields:</strong>
                      <ul className="list-disc list-inside mt-1 space-y-1 text-gray-300">
                        <li>Transaction ID (TID)</li>
                        <li>Data item identifier</li>
                        <li>Old value (before image)</li>
                        <li>New value (after image)</li>
                        <li>Log sequence number (LSN)</li>
                      </ul>
                    </div>
                    <div>
                      <strong className="text-white">Special Log Records:</strong>
                      <ul className="list-disc list-inside mt-1 space-y-1 text-gray-300">
                        <li>&lt;Ti, start&gt; - Transaction start</li>
                        <li>&lt;Ti, commit&gt; - Transaction commit</li>
                        <li>&lt;Ti, abort&gt; - Transaction abort</li>
                        <li>&lt;checkpoint&gt; - Checkpoint record</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 p-4 rounded border-l-4 border-purple-500">
                <h4 className="font-semibold text-purple-400 mb-2">Write-Ahead Logging (WAL) Protocol:</h4>
                <div className="space-y-3">
                  <div className="bg-gray-800 p-3 rounded">
                    <h5 className="font-semibold text-white mb-2">WAL Rules:</h5>
                    <ol className="list-decimal list-inside text-gray-300 text-sm space-y-1">
                      <li><strong className="text-white">Before writing data:</strong> Log record must be written to stable storage</li>
                      <li><strong className="text-white">Before commit:</strong> All log records for the transaction must be in stable storage</li>
                      <li><strong className="text-white">Force-write:</strong> Log records are immediately written to disk</li>
                      <li><strong className="text-white">No-force:</strong> Data pages may remain in buffer until convenient to write</li>
                    </ol>
                  </div>
                  
                  <div className="bg-gray-800 p-3 rounded">
                    <h5 className="font-semibold text-white mb-2">Example Log Sequence:</h5>
                    <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs">
                      &lt;T1, start&gt;<br/>
                      &lt;T1, X, 100, 150&gt;  -- T1 updates X from 100 to 150<br/>
                      &lt;T2, start&gt;<br/>
                      &lt;T2, Y, 200, 250&gt;  -- T2 updates Y from 200 to 250<br/>
                      &lt;T1, commit&gt;<br/>
                      &lt;T2, Z, 300, 350&gt;  -- T2 updates Z from 300 to 350<br/>
                      &lt;T2, abort&gt;
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recovery Algorithms */}
        <section>
          <h2 className="text-2xl font-semibold text-yellow-400 mb-4">Recovery Algorithms</h2>
          <div className="bg-gray-700/50 border border-gray-600 p-6 rounded-lg">
            <p className="text-gray-300 mb-4">
              Recovery algorithms use log information to restore database consistency after failures.
            </p>
            
            <div className="space-y-4">
              <div className="bg-gray-900 p-4 rounded border-l-4 border-yellow-500">
                <h4 className="font-semibold text-yellow-400 mb-2">UNDO Recovery:</h4>
                <div className="space-y-3">
                  <div className="bg-gray-800 p-3 rounded">
                    <h5 className="font-semibold text-white mb-2">When to Use UNDO:</h5>
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                      <li>Transaction was active during system crash</li>
                      <li>Transaction explicitly aborted</li>
                      <li>No commit record found in log</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-800 p-3 rounded">
                    <h5 className="font-semibold text-white mb-2">UNDO Process:</h5>
                    <ol className="list-decimal list-inside text-gray-300 text-sm space-y-1">
                      <li>Scan log backwards from end</li>
                      <li>For each update record &lt;Ti, X, old_val, new_val&gt;</li>
                      <li>If Ti is in undo-list, restore X = old_val</li>
                      <li>Continue until start of transaction</li>
                      <li>Write &lt;Ti, abort&gt; to log</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 p-4 rounded border-l-4 border-yellow-500">
                <h4 className="font-semibold text-yellow-400 mb-2">REDO Recovery:</h4>
                <div className="space-y-3">
                  <div className="bg-gray-800 p-3 rounded">
                    <h5 className="font-semibold text-white mb-2">When to Use REDO:</h5>
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                      <li>Transaction committed before crash</li>
                      <li>Commit record exists in log</li>
                      <li>Changes may not have been written to disk</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-800 p-3 rounded">
                    <h5 className="font-semibold text-white mb-2">REDO Process:</h5>
                    <ol className="list-decimal list-inside text-gray-300 text-sm space-y-1">
                      <li>Scan log forwards from beginning</li>
                      <li>For each update record &lt;Ti, X, old_val, new_val&gt;</li>
                      <li>If Ti is in redo-list, set X = new_val</li>
                      <li>Continue until end of log</li>
                      <li>Ensure all committed changes are applied</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 p-4 rounded border-l-4 border-yellow-500">
                <h4 className="font-semibold text-yellow-400 mb-2">UNDO/REDO Recovery Algorithm:</h4>
                <div className="bg-gray-800 p-3 rounded">
                  <h5 className="font-semibold text-white mb-2">Three-Phase Recovery:</h5>
                  <ol className="list-decimal list-inside text-gray-300 text-sm space-y-2">
                    <li>
                      <strong className="text-white">Analysis Phase:</strong> Scan log to determine which transactions were active, 
                      committed, or aborted at time of crash
                    </li>
                    <li>
                      <strong className="text-white">REDO Phase:</strong> Replay all committed transactions from log to ensure 
                      durability of committed changes
                    </li>
                    <li>
                      <strong className="text-white">UNDO Phase:</strong> Rollback all incomplete transactions to ensure 
                      atomicity of uncommitted changes
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Checkpointing */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">Checkpointing</h2>
          <div className="bg-gray-700/50 border border-gray-600 p-6 rounded-lg">
            <p className="text-gray-300 mb-4">
              <strong className="text-white">Checkpoints</strong> reduce recovery time by periodically saving database state to stable storage.
            </p>
            
            <div className="space-y-4">
              <div className="bg-gray-900 p-4 rounded border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-400 mb-2">Simple Checkpoint:</h4>
                <div className="bg-gray-800 p-3 rounded">
                  <h5 className="font-semibold text-white mb-2">Checkpoint Process:</h5>
                  <ol className="list-decimal list-inside text-gray-300 text-sm space-y-1">
                    <li>Stop accepting new transactions</li>
                    <li>Wait for all active transactions to complete</li>
                    <li>Force-write all log records to stable storage</li>
                    <li>Force-write all modified buffers to disk</li>
                    <li>Write checkpoint record to log</li>
                    <li>Resume normal operation</li>
                  </ol>
                  <p className="text-red-400 text-sm mt-2">
                    <strong>Disadvantage:</strong> System unavailable during checkpoint
                  </p>
                </div>
              </div>

              <div className="bg-gray-900 p-4 rounded border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-400 mb-2">Fuzzy Checkpoint:</h4>
                <div className="bg-gray-800 p-3 rounded">
                  <h5 className="font-semibold text-white mb-2">Non-Blocking Checkpoint:</h5>
                  <ol className="list-decimal list-inside text-gray-300 text-sm space-y-1">
                    <li>Record list of active transactions</li>
                    <li>Continue normal transaction processing</li>
                    <li>Gradually write dirty buffers to disk</li>
                    <li>Write checkpoint record with active transaction list</li>
                    <li>No system downtime required</li>
                  </ol>
                  <p className="text-green-400 text-sm mt-2">
                    <strong>Advantage:</strong> System remains available during checkpoint
                  </p>
                </div>
              </div>

              <div className="bg-gray-900 p-4 rounded border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-400 mb-2">Recovery with Checkpoints:</h4>
                <div className="bg-gray-800 p-3 rounded">
                  <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs mb-3">
                    Timeline: ... T1 ... checkpoint ... T2 ... T3 ... CRASH<br/>
                    <br/>
                    Recovery Process:<br/>
                    1. Find most recent checkpoint in log<br/>
                    2. Only need to consider transactions after checkpoint<br/>
                    3. REDO committed transactions (T2 if committed)<br/>
                    4. UNDO active transactions (T3 if not committed)
                  </div>
                  <p className="text-gray-300 text-sm">
                    Transactions that completed before the checkpoint (T1) don't need recovery processing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Shadow Paging */}
        <section>
          <h2 className="text-2xl font-semibold text-indigo-400 mb-4">Shadow Paging</h2>
          <div className="bg-gray-700/50 border border-gray-600 p-6 rounded-lg">
            <p className="text-gray-300 mb-4">
              <strong className="text-white">Shadow Paging</strong> is an alternative recovery technique that maintains two page tables: 
              current and shadow.
            </p>
            
            <div className="space-y-4">
              <div className="bg-gray-900 p-4 rounded border-l-4 border-indigo-500">
                <h4 className="font-semibold text-indigo-400 mb-2">Shadow Paging Mechanism:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-800 p-3 rounded">
                    <h5 className="font-semibold text-white mb-2">Shadow Page Table</h5>
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                      <li>Points to database pages at transaction start</li>
                      <li>Never modified during transaction</li>
                      <li>Used for recovery if transaction aborts</li>
                      <li>Represents consistent database state</li>
                    </ul>
                  </div>
                  <div className="bg-gray-800 p-3 rounded">
                    <h5 className="font-semibold text-white mb-2">Current Page Table</h5>
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                      <li>Modified during transaction execution</li>
                      <li>Points to new pages for modified data</li>
                      <li>Becomes permanent on commit</li>
                      <li>Discarded on abort</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 p-4 rounded border-l-4 border-indigo-500">
                <h4 className="font-semibold text-indigo-400 mb-2">Advantages & Disadvantages:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-800 p-3 rounded">
                    <h5 className="font-semibold text-green-400 mb-2">✅ Advantages:</h5>
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                      <li>No need for log records</li>
                      <li>Fast recovery (just restore shadow table)</li>
                      <li>Simple abort mechanism</li>
                      <li>No UNDO/REDO operations needed</li>
                    </ul>
                  </div>
                  <div className="bg-gray-800 p-3 rounded">
                    <h5 className="font-semibold text-red-400 mb-2">❌ Disadvantages:</h5>
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                      <li>Data fragmentation increases</li>
                      <li>Garbage collection needed</li>
                      <li>Commit overhead is high</li>
                      <li>Difficult to support concurrent transactions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Backup and Restore */}
        <section>
          <h2 className="text-2xl font-semibold text-orange-400 mb-4">Backup and Restore</h2>
          <div className="bg-gray-700/50 border border-gray-600 p-6 rounded-lg">
            <p className="text-gray-300 mb-4">
              <strong className="text-white">Backup strategies</strong> protect against media failures and provide long-term data protection.
            </p>
            
            <div className="space-y-4">
              <div className="bg-gray-900 p-4 rounded border-l-4 border-orange-500">
                <h4 className="font-semibold text-orange-400 mb-2">Types of Backups:</h4>
                <div className="space-y-3">
                  <div className="bg-gray-800 p-3 rounded">
                    <h5 className="font-semibold text-white mb-2">Full Backup</h5>
                    <p className="text-gray-300 text-sm">
                      Complete copy of entire database. Provides complete recovery capability but 
                      requires significant storage space and time.
                    </p>
                  </div>
                  <div className="bg-gray-800 p-3 rounded">
                    <h5 className="font-semibold text-white mb-2">Incremental Backup</h5>
                    <p className="text-gray-300 text-sm">
                      Only backs up data changed since last backup. Faster and requires less storage, 
                      but recovery is more complex.
                    </p>
                  </div>
                  <div className="bg-gray-800 p-3 rounded">
                    <h5 className="font-semibold text-white mb-2">Differential Backup</h5>
                    <p className="text-gray-300 text-sm">
                      Backs up all changes since last full backup. Compromise between full and 
                      incremental backups.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 p-4 rounded border-l-4 border-orange-500">
                <h4 className="font-semibold text-orange-400 mb-2">Recovery from Media Failure:</h4>
                <div className="bg-gray-800 p-3 rounded">
                  <h5 className="font-semibold text-white mb-2">Recovery Steps:</h5>
                  <ol className="list-decimal list-inside text-gray-300 text-sm space-y-1">
                    <li>Restore database from most recent backup</li>
                    <li>Apply log records from backup time to failure time</li>
                    <li>REDO all committed transactions</li>
                    <li>UNDO all uncommitted transactions</li>
                    <li>Verify database consistency</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RecoveryTechniquesSubtopic;
