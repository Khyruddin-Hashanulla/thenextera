import React from 'react';

const InterprocessCommunicationSubtopic = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Inter-Process Communication</h1>
        <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
          Learn mechanisms for processes to communicate and synchronize with each other.
        </p>
      </div>

      <div className="space-y-6 sm:space-y-8">
        {/* IPC Overview */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-cyan-400 mb-3 sm:mb-4">Need for IPC</h2>
          <div className="bg-gray-700/50 border border-gray-600 p-4 sm:p-6 rounded-lg">
            <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
              <strong>Inter-Process Communication (IPC)</strong> allows processes to exchange data and coordinate activities.
            </p>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="bg-gray-800/50 border border-gray-600 p-3 sm:p-4 rounded border-l-4 border-cyan-500">
                <h4 className="font-semibold text-cyan-300 mb-2 text-sm sm:text-base">Why IPC is Needed:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <div className="bg-gray-700/50 border border-gray-600 p-2 rounded">
                      <h5 className="font-semibold text-white text-xs sm:text-sm">Information Sharing</h5>
                      <p className="text-gray-300 text-xs">Multiple processes need access to same data</p>
                    </div>
                    <div className="bg-gray-700/50 border border-gray-600 p-2 rounded">
                      <h5 className="font-semibold text-white text-xs sm:text-sm">Computation Speedup</h5>
                      <p className="text-gray-300 text-xs">Parallel execution of subtasks</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-gray-700/50 border border-gray-600 p-2 rounded">
                      <h5 className="font-semibold text-white text-xs sm:text-sm">Modularity</h5>
                      <p className="text-gray-300 text-xs">Divide system functions into separate processes</p>
                    </div>
                    <div className="bg-gray-700/50 border border-gray-600 p-2 rounded">
                      <h5 className="font-semibold text-white text-xs sm:text-sm">Convenience</h5>
                      <p className="text-gray-300 text-xs">User can work on multiple tasks simultaneously</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 border border-gray-600 p-3 sm:p-4 rounded border-l-4 border-cyan-500">
                <h4 className="font-semibold text-cyan-300 mb-2 text-sm sm:text-base">IPC Models:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-gray-700/50 border border-gray-600 p-2 sm:p-3 rounded">
                    <h5 className="font-semibold text-white mb-2 text-xs sm:text-sm">Shared Memory</h5>
                    <p className="text-gray-300 text-xs sm:text-sm mb-2">Processes share a region of memory</p>
                    <ul className="list-disc list-inside text-gray-300 text-xs space-y-1">
                      <li>Fast communication</li>
                      <li>Requires synchronization</li>
                      <li>System calls only for setup</li>
                    </ul>
                  </div>
                  <div className="bg-gray-700/50 border border-gray-600 p-2 sm:p-3 rounded">
                    <h5 className="font-semibold text-white mb-2 text-xs sm:text-sm">Message Passing</h5>
                    <p className="text-gray-300 text-xs sm:text-sm mb-2">Processes exchange messages via system calls</p>
                    <ul className="list-disc list-inside text-gray-300 text-xs space-y-1">
                      <li>No shared variables</li>
                      <li>Useful for distributed systems</li>
                      <li>System calls for each message</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Shared Memory */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-purple-400 mb-3 sm:mb-4">Shared Memory</h2>
          <div className="bg-gray-700/50 border border-gray-600 p-4 sm:p-6 rounded-lg">
            <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
              Shared memory allows processes to access the same memory segment for fast data exchange.
            </p>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="bg-gray-800/50 border border-gray-600 p-3 sm:p-4 rounded border-l-4 border-purple-500">
                <h4 className="font-semibold text-purple-300 mb-2 text-sm sm:text-base">How Shared Memory Works:</h4>
                <div className="bg-gray-700/50 border border-gray-600 p-2 sm:p-3 rounded">
                  <div className="text-xs sm:text-sm space-y-2">
                    <p><strong>1.</strong> Process requests shared memory segment from OS</p>
                    <p><strong>2.</strong> OS creates segment and returns identifier</p>
                    <p><strong>3.</strong> Process attaches segment to its address space</p>
                    <p><strong>4.</strong> Other processes attach to same segment</p>
                    <p><strong>5.</strong> Processes read/write directly to shared memory</p>
                    <p><strong>6.</strong> Processes detach when done</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 border border-gray-600 p-3 sm:p-4 rounded border-l-4 border-purple-500">
                <h4 className="font-semibold text-purple-300 mb-2 text-sm sm:text-base">POSIX Shared Memory Example:</h4>
                <div className="bg-gray-900 text-green-400 p-2 sm:p-3 rounded font-mono text-xs overflow-x-auto">
                  <pre className="whitespace-pre">
{`#include <sys/mman.h>
#include <fcntl.h>

// Producer
int shm_fd = shm_open("/myshm", O_CREAT | O_RDWR, 0666);
ftruncate(shm_fd, SIZE);
char* ptr = mmap(0, SIZE, PROT_WRITE, MAP_SHARED, shm_fd, 0);
sprintf(ptr, "Hello from producer!");

// Consumer
int shm_fd = shm_open("/myshm", O_RDONLY, 0666);
char* ptr = mmap(0, SIZE, PROT_READ, MAP_SHARED, shm_fd, 0);
printf("%s", ptr);`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Message Passing */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-orange-400 mb-3 sm:mb-4">Message Passing</h2>
          <div className="bg-gray-700/50 border border-gray-600 p-4 sm:p-6 rounded-lg">
            <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
              Message passing provides communication through send() and receive() operations.
            </p>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="bg-gray-800/50 border border-gray-600 p-3 sm:p-4 rounded border-l-4 border-orange-500">
                <h4 className="font-semibold text-orange-300 mb-2 text-sm sm:text-base">Message Passing Operations:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-gray-700/50 border border-gray-600 p-2 sm:p-3 rounded">
                    <h5 className="font-semibold text-white mb-2 text-xs sm:text-sm">send(destination, message)</h5>
                    <ul className="list-disc list-inside text-gray-300 text-xs sm:text-sm space-y-1">
                      <li>Send message to destination</li>
                      <li>Can be blocking or non-blocking</li>
                      <li>May require buffering</li>
                    </ul>
                  </div>
                  <div className="bg-gray-700/50 border border-gray-600 p-2 sm:p-3 rounded">
                    <h5 className="font-semibold text-white mb-2 text-xs sm:text-sm">receive(source, message)</h5>
                    <ul className="list-disc list-inside text-gray-300 text-xs sm:text-sm space-y-1">
                      <li>Receive message from source</li>
                      <li>Can be blocking or non-blocking</li>
                      <li>May wait for message arrival</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pipes */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-indigo-400 mb-3 sm:mb-4">Pipes</h2>
          <div className="bg-gray-700/50 border border-gray-600 p-4 sm:p-6 rounded-lg">
            <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
              <strong>Pipes</strong> provide a conduit for communication between processes.
            </p>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="bg-gray-800/50 border border-gray-600 p-3 sm:p-4 rounded border-l-4 border-indigo-500">
                <h4 className="font-semibold text-indigo-300 mb-2 text-sm sm:text-base">Anonymous Pipes</h4>
                <p className="text-gray-300 text-xs sm:text-sm mb-2 sm:mb-3">
                  Communication between parent and child processes on same machine.
                </p>
                <div className="bg-gray-900 text-green-400 p-2 sm:p-3 rounded font-mono text-xs overflow-x-auto">
                  <pre className="whitespace-pre">
{`#include <unistd.h>

int pipefd[2];
pipe(pipefd);  // Create pipe

if (fork() == 0) {
  // Child process
  close(pipefd[1]);  // Close write end
  read(pipefd[0], buffer, sizeof(buffer));
} else {
  // Parent process
  close(pipefd[0]);  // Close read end
  write(pipefd[1], "Hello", 5);
}`}
                  </pre>
                </div>
              </div>

              <div className="bg-gray-800/50 border border-gray-600 p-3 sm:p-4 rounded border-l-4 border-indigo-500">
                <h4 className="font-semibold text-indigo-300 mb-2 text-sm sm:text-base">Named Pipes (FIFOs)</h4>
                <p className="text-gray-300 text-xs sm:text-sm mb-2 sm:mb-3">
                  Communication between unrelated processes via filesystem.
                </p>
                <div className="bg-gray-900 text-green-400 p-2 sm:p-3 rounded font-mono text-xs overflow-x-auto">
                  <pre className="whitespace-pre">
{`// Create named pipe
mkfifo("/tmp/mypipe", 0666);

// Writer process
int fd = open("/tmp/mypipe", O_WRONLY);
write(fd, "Hello", 5);

// Reader process
int fd = open("/tmp/mypipe", O_RDONLY);
read(fd, buffer, sizeof(buffer));`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-green-400 mb-3 sm:mb-4">IPC Mechanism Comparison</h2>
          <div className="bg-gray-700/50 border border-gray-600 p-4 sm:p-6 rounded-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm border-collapse border border-gray-600">
                <thead className="bg-gray-600">
                  <tr>
                    <th className="border border-gray-500 p-2 text-left text-white">Mechanism</th>
                    <th className="border border-gray-500 p-2 text-left text-white">Speed</th>
                    <th className="border border-gray-500 p-2 text-left text-white">Scope</th>
                    <th className="border border-gray-500 p-2 text-left text-white">Synchronization</th>
                    <th className="border border-gray-500 p-2 text-left text-white">Use Case</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  <tr>
                    <td className="border border-gray-500 p-2 font-semibold text-gray-300">Shared Memory</td>
                    <td className="border border-gray-500 p-2 text-gray-300">Very Fast</td>
                    <td className="border border-gray-500 p-2 text-gray-300">Local</td>
                    <td className="border border-gray-500 p-2 text-gray-300">Manual</td>
                    <td className="border border-gray-500 p-2 text-gray-300">High-speed data exchange</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-500 p-2 font-semibold text-gray-300">Pipes</td>
                    <td className="border border-gray-500 p-2 text-gray-300">Fast</td>
                    <td className="border border-gray-500 p-2 text-gray-300">Local</td>
                    <td className="border border-gray-500 p-2 text-gray-300">Automatic</td>
                    <td className="border border-gray-500 p-2 text-gray-300">Shell commands, parent-child</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-500 p-2 font-semibold text-gray-300">Message Queues</td>
                    <td className="border border-gray-500 p-2 text-gray-300">Medium</td>
                    <td className="border border-gray-500 p-2 text-gray-300">Local</td>
                    <td className="border border-gray-500 p-2 text-gray-300">Automatic</td>
                    <td className="border border-gray-500 p-2 text-gray-300">Structured messaging</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-500 p-2 font-semibold text-gray-300">Sockets</td>
                    <td className="border border-gray-500 p-2 text-gray-300">Slow</td>
                    <td className="border border-gray-500 p-2 text-gray-300">Local/Remote</td>
                    <td className="border border-gray-500 p-2 text-gray-300">Manual</td>
                    <td className="border border-gray-500 p-2 text-gray-300">Network communication</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default InterprocessCommunicationSubtopic;
