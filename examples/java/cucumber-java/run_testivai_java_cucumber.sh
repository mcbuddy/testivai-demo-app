#!/bin/bash

# TestivAI Java Cucumber Test Runner
# This script starts the dev server and runs Java Cucumber tests with TestivAI

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to cleanup processes
cleanup() {
    echo -e "\n${YELLOW}🧹 Cleaning up existing processes...${NC}"
    
    # Kill any Vite processes on common ports
    for port in 5173 5174 5175 5176 5177 5178 5179 5180; do
        pids=$(lsof -ti :$port 2>/dev/null || true)
        if [ -n "$pids" ]; then
            echo "$pids" | xargs -r kill -SIGTERM
            echo "  Killed processes on port $port"
        fi
    done
    
    # Kill any npm processes running vite
    pgrep -f vite | xargs -r kill -SIGTERM 2>/dev/null || true
    
    # Wait a moment for processes to die
    sleep 1
}

# Function to stop dev server
stop_dev_server() {
    if [ -n "$DEV_SERVER_PID" ]; then
        echo -e "\n${YELLOW}🛑 Stopping dev server...${NC}"
        
        # Kill the process group
        kill -SIGTERM -$DEV_SERVER_PID 2>/dev/null || true
        
        # Force kill after 5 seconds
        sleep 2
fi
        if kill -0 -$DEV_SERVER_PID 2>/dev/null; then
            kill -SIGKILL -$DEV_SERVER_PID 2>/dev/null || true
        fi
        
        wait $DEV_SERVER_PID 2>/dev/null || true
        echo -e "${GREEN}✅ Dev server stopped${NC}"
    fi
}

# Handle Ctrl+C
trap 'echo -e "\n\n${YELLOW}🛑 Received SIGINT, cleaning up...${NC}"; stop_dev_server; exit 0' INT

# Cleanup any existing processes
cleanup

# Get the script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"

echo -e "${GREEN}🚀 Starting dev server...${NC}"

# Start the dev server from the root directory
npm run dev > /tmp/dev_server.log 2>&1 &
DEV_SERVER_PID=$!

# Monitor dev server output for port
echo "Waiting for dev server to start..."
timeout=30
while [ $timeout -gt 0 ]; do
    if grep -q "Local:" /tmp/dev_server.log; then
        SERVER_PORT=$(grep "Local:" /tmp/dev_server.log | sed -E 's/.*Local:\s+http:\/\/localhost:(\d+).*/\1/')
        if [ -n "$SERVER_PORT" ]; then
            echo -e "${GREEN}✅ Dev server started on port $SERVER_PORT${NC}"
            break
        fi
    fi
    
    # Check if process is still running
    if ! kill -0 $DEV_SERVER_PID 2>/dev/null; then
        echo -e "${RED}❌ Dev server exited unexpectedly${NC}"
        cat /tmp/dev_server.log
        exit 1
    fi
    
    sleep 1
    timeout=$((timeout - 1))
done

if [ $timeout -eq 0 ]; then
    echo -e "${RED}❌ Timeout waiting for dev server to start${NC}"
    cat /tmp/dev_server.log
    exit 1
fi

# Wait a bit for server to be fully ready 
sleep 2
fi

# Set environment variables
export TEST_SERVER_PORT=$SERVER_PORT
export TESTIVAI_API_KEY="${TESTIVAI_API_KEY:-$(cat "$SCRIPT_DIR/.env" | grep TESTIVAI_API_KEY | cut -d'=' -f2)}"

if [ -z "$TESTIVAI_API_KEY" ]; then
    echo -e "${RED}❌ TESTIVAI_API_KEY not set. Please set it as an environment variable or in .env file${NC}"
    exit 1
fi

# Run tests
echo -e "\n${GREEN}🧪 Running Java Cucumber tests on port $SERVER_PORT...${NC}"
cd "$SCRIPT_DIR"

if testivai run "mvn test"; then
    echo -e "\n${GREEN}✅ Java Cucumber tests completed successfully${NC}"
    EXIT_CODE=0
else
    echo -e "\n${RED}❌ Java Cucumber tests failed${NC}"
    EXIT_CODE=1
fi

# Always cleanup
stop_dev_server

# Clean up log file
rm -f /tmp/dev_server.log

exit $EXIT_CODE
