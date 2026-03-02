#!/bin/bash

# TestivAI CDP SDK - Run All Framework Examples
# This script runs tests for all supported frameworks

set -e

echo "🚀 Running TestivAI CDP SDK Framework Examples"
echo "=============================================="

# Check if API key is set
if [ -z "$TESTIVAI_API_KEY" ]; then
    echo "❌ Error: TESTIVAI_API_KEY environment variable is not set"
    echo "Please set it with: export TESTIVAI_API_KEY=your-api-key-here"
    exit 1
fi

# Check if the app is running
if ! curl -s http://localhost:3000 > /dev/null; then
    echo "❌ Error: Demo app is not running on http://localhost:3000"
    echo "Please start it with: npm run dev"
    exit 1
fi

echo "✅ API key and app running - starting tests..."
echo ""

# Function to run framework tests
run_framework() {
    local framework=$1
    echo "📦 Running $framework tests..."
    echo "--------------------------------"
    
    case $framework in
        "playwright")
            npm run test:playwright
            ;;
        "webdriverio")
            cd webdriverio
            if [ ! -d "node_modules" ]; then
                echo "Installing dependencies..."
                npm install
            fi
            npm test
            cd ..
            ;;
        "cypress")
            cd cypress
            if [ ! -d "node_modules" ]; then
                echo "Installing dependencies..."
                npm install
            fi
            npm test
            cd ..
            ;;
        "selenium-python")
            cd selenium-python
            if [ ! -d "venv" ]; then
                echo "Creating Python virtual environment..."
                python3 -m venv venv
            fi
            source venv/bin/activate
            pip install -r requirements.txt
            pytest
            cd ..
            ;;
        "rspec-capybara")
            cd rspec-capybara
            if [ ! -d "vendor/bundle" ]; then
                echo "Installing Ruby dependencies..."
                bundle install
            fi
            bundle exec rspec
            cd ..
            ;;
        "selenium-java")
            cd selenium-java
            if [ ! -d "target" ]; then
                echo "Installing Java dependencies..."
                mvn clean install
            fi
            mvn test
            cd ..
            ;;
        "cucumber-java")
            cd cucumber-java
            if [ ! -d "target" ]; then
                echo "Installing Java dependencies..."
                mvn clean install
            fi
            mvn test
            cd ..
            ;;
    esac
    
    echo ""
}

# Run specific framework if provided, otherwise run all
if [ $# -eq 1 ]; then
    run_framework $1
else
    echo "Running all frameworks..."
    run_framework "playwright"
    run_framework "webdriverio"
    run_framework "cypress"
    run_framework "selenium-python"
    run_framework "rspec-capybara"
    run_framework "selenium-java"
    run_framework "cucumber-java"
fi

echo "✅ All tests completed!"
echo "📊 Check your TestivAI dashboard for visual regression results"
