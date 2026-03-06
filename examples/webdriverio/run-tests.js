const { spawn } = require('child_process');
const { EventEmitter } = require('events');
const path = require('path');
const fs = require('fs');

class TestRunner extends EventEmitter {
  constructor() {
    super();
    this.devServer = null;
    this.serverPort = null;
    this.testProcess = null;
  }

  async startDevServer() {
    return new Promise((resolve, reject) => {
      console.log('🚀 Starting dev server...');
      
      // Start the dev server from the root directory
      this.devServer = spawn('npm', ['run', 'dev'], {
        cwd: path.resolve(__dirname, '../..'),
        stdio: ['pipe', 'pipe', 'pipe'],
        detached: true  // Create a new process group
      });

      let output = '';
      
      this.devServer.stdout.on('data', (data) => {
        const text = data.toString();
        output += text;
        process.stdout.write(text);
        
        // Look for the port in Vite's output
        const portMatch = text.match(/Local:\s+http:\/\/localhost:(\d+)/);
        if (portMatch) {
          this.serverPort = portMatch[1];
          console.log(`✅ Dev server started on port ${this.serverPort}`);
          resolve();
        }
      });

      this.devServer.stderr.on('data', (data) => {
        process.stderr.write(data);
      });

      this.devServer.on('error', (error) => {
        reject(error);
      });

      this.devServer.on('exit', (code) => {
        if (code !== 0 && !this.serverPort) {
          reject(new Error(`Dev server exited with code ${code}`));
        }
      });

      // Timeout after 30 seconds
      setTimeout(() => {
        if (!this.serverPort) {
          reject(new Error('Timeout waiting for dev server to start'));
        }
      }, 30000);
    });
  }

  async runTests() {
    return new Promise((resolve, reject) => {
      console.log(`\n🧪 Running tests on port ${this.serverPort}...`);
      
      // Set environment variable for the port
      const env = {
        ...process.env,
        TEST_SERVER_PORT: this.serverPort,
        TESTIVAI_API_KEY: process.env.TESTIVAI_API_KEY || fs.readFileSync(path.resolve(__dirname, '.env'), 'utf8').match(/TESTIVAI_API_KEY=(.+)/)[1]
      };

      // Run the test command
      const testCommand = `npx testivai run "npx wdio run wdio.conf.cjs --spec component-showcase.test.cjs"`;
      this.testProcess = spawn('sh', ['-c', testCommand], {
        cwd: __dirname,
        stdio: 'inherit',
        env
      });

      this.testProcess.on('exit', (code) => {
        if (code === 0) {
          console.log('\n✅ Tests completed successfully');
          resolve();
        } else {
          console.log(`\n❌ Tests failed with exit code ${code}`);
          reject(new Error(`Tests failed with exit code ${code}`));
        }
      });

      this.testProcess.on('error', (error) => {
        reject(error);
      });
    });
  }

  async stopDevServer() {
    if (this.devServer) {
      console.log('\n🛑 Stopping dev server...');
      
      // Kill the entire process group to ensure all child processes die
      try {
        // On macOS/Linux, kill the process group
        process.kill(-this.devServer.pid, 'SIGTERM');
      } catch (e) {
        // Fallback to killing just the process
        this.devServer.kill('SIGTERM');
      }
      
      // Force kill after 5 seconds
      setTimeout(() => {
        if (this.devServer && !this.devServer.killed) {
          try {
            process.kill(-this.devServer.pid, 'SIGKILL');
          } catch (e) {
            this.devServer.kill('SIGKILL');
          }
        }
      }, 5000);
      
      // Wait for process to exit
      return new Promise((resolve) => {
        this.devServer.on('exit', () => {
          console.log('✅ Dev server stopped');
          resolve();
        });
        
        // Don't wait forever
        setTimeout(() => {
          console.log('⚠️  Dev server did not exit gracefully');
          resolve();
        }, 3000);
      });
    }
  }

  async cleanup() {
    console.log('\n🧹 Cleaning up existing processes...');
    
    const promises = [];
    
    // Kill any Vite processes on common ports
    const ports = ['5173', '5174', '5175', '5176', '5177', '5178', '5179', '5180'];
    for (const port of ports) {
      const promise = new Promise((resolve) => {
        try {
          const lsof = spawn('lsof', ['-ti', `:${port}`]);
          let pids = '';
          
          lsof.stdout.on('data', (data) => {
            pids += data.toString();
          });
          
          lsof.on('close', (code) => {
            if (code === 0 && pids.trim()) {
              const pidList = pids.trim().split('\n');
              pidList.forEach(pid => {
                if (pid) {
                  try {
                    process.kill(pid, 'SIGTERM');
                    console.log(`  Killed process ${pid} on port ${port}`);
                  } catch (e) {
                    // Process might already be dead
                  }
                }
              });
            }
            resolve();
          });
        } catch (e) {
          resolve();
        }
      });
      promises.push(promise);
    }
    
    // Also kill any npm processes running vite
    const vitePromise = new Promise((resolve) => {
      try {
        const pgrep = spawn('pgrep', ['-f', 'vite']);
        let pids = '';
        
        pgrep.stdout.on('data', (data) => {
          pids += data.toString();
        });
        
        pgrep.on('close', (code) => {
          if (code === 0 && pids.trim()) {
            const pidList = pids.trim().split('\n');
            pidList.forEach(pid => {
              if (pid) {
                try {
                  process.kill(pid, 'SIGTERM');
                  console.log(`  Killed vite process ${pid}`);
                } catch (e) {
                  // Process might already be dead
                }
              }
            });
          }
          resolve();
        });
      } catch (e) {
        resolve();
      }
    });
    promises.push(vitePromise);
    
    // Wait for all cleanup operations to complete
    await Promise.all(promises);
    
    // Wait a moment for processes to die
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  async run() {
    try {
      // Cleanup any existing processes
      await this.cleanup();
      
      // Start dev server
      await this.startDevServer();
      
      // Wait a bit for server to be fully ready
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Run tests
      await this.runTests();
      
      process.exit(0);
    } catch (error) {
      console.error('\n❌ Error:', error.message);
      process.exit(1);
    } finally {
      // Always cleanup
      await this.stopDevServer();
    }
  }
}

// Handle Ctrl+C
process.on('SIGINT', async () => {
  console.log('\n\n🛑 Received SIGINT, cleaning up...');
  if (runner.devServer) {
    await runner.stopDevServer();
  }
  process.exit(0);
});

// Run the tests
const runner = new TestRunner();
runner.run();
