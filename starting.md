🚀 Quick Start Guide - Run Everything Next Time
📋 Simple 3-Step Process
Save this guide! Use it every time you want to run your Kafka project.

STEP 1: Start Docker (Kafka + Services)
Open Command Prompt or PowerShell:

Bash

cd D:\WORKS\Kafka-project

docker-compose up -d
Wait 30-60 seconds for all services to start.

STEP 2: Start Backend
Open NEW Command Prompt:

Bash

cd D:\WORKS\Kafka-project\backend

gradlew.bat bootRun
Wait for: Started ProducerConsumerApplication

STEP 3: Start Frontend
Open ANOTHER Command Prompt:

Bash

cd D:\WORKS\Kafka-project\frontend

npm start
Browser opens automatically at: http://localhost:3000

✅ That's It!
Your complete Kafka system is now running! 🎉

📝 Detailed Guide with Verification
1️⃣ Start Docker Services
Bash

# Navigate to project folder
cd D:\WORKS\Kafka-project

# Start all containers
docker-compose up -d
Verify Docker is Running:
Bash

docker ps
You should see 5 containers:

✅ kafka
✅ zookeeper
✅ kafka-ui
✅ prometheus
✅ grafana
Check Services:
Service	URL	Check
Kafka UI	http://localhost:8090	Should open
Prometheus	http://localhost:9090	Should open
Grafana	http://localhost:3001	Should open (admin/admin)
2️⃣ Start Backend (Spring Boot)
Open NEW terminal window:

Bash

# Navigate to backend
cd D:\WORKS\Kafka-project\backend

# Run backend
gradlew.bat bootRun
Wait for this message:
text

Started ProducerConsumerApplication in X.XXX seconds
Verify Backend:
Open browser: http://localhost:8080/actuator/health

Should show:

JSON

{"status":"UP"}
3️⃣ Start Frontend (React)
Open ANOTHER new terminal:

Bash

# Navigate to frontend
cd D:\WORKS\Kafka-project\frontend

# Start React app
npm start
Browser auto-opens at:
text

http://localhost:3000
🛑 How to Stop Everything
Stop in This Order:
1. Stop Frontend
In frontend terminal, press: Ctrl + C

2. Stop Backend
In backend terminal, press: Ctrl + C

3. Stop Docker
Bash

cd D:\WORKS\Kafka-project

docker-compose down
🔄 Quick Reference Commands
Check if Docker is Running:
Bash

docker ps
Check Docker Logs:
Bash

# All services
docker-compose logs

# Specific service
docker logs kafka
docker logs zookeeper
Restart Single Service:
Bash

docker restart kafka
docker restart zookeeper
View Backend Logs:
Backend terminal shows live logs automatically

View Frontend Logs:
Frontend terminal shows live logs automatically

📁 Create Batch Files (Windows) - One-Click Start!
File 1: start-docker.bat
Create file: D:\WORKS\Kafka-project\start-docker.bat

batch

@echo off
echo Starting Docker Services...
cd /d D:\WORKS\Kafka-project
docker-compose up -d
echo.
echo Waiting for services to start...
timeout /t 30 /nobreak
echo.
echo Docker Services Started!
echo Kafka UI: http://localhost:8090
echo Prometheus: http://localhost:9090
echo Grafana: http://localhost:3001
pause
File 2: start-backend.bat
Create file: D:\WORKS\Kafka-project\start-backend.bat

batch

@echo off
echo Starting Backend...
cd /d D:\WORKS\Kafka-project\backend
gradlew.bat bootRun
pause
File 3: start-frontend.bat
Create file: D:\WORKS\Kafka-project\start-frontend.bat

batch

@echo off
echo Starting Frontend...
cd /d D:\WORKS\Kafka-project\frontend
npm start
pause
File 4: stop-all.bat
Create file: D:\WORKS\Kafka-project\stop-all.bat

batch

@echo off
echo Stopping All Services...
cd /d D:\WORKS\Kafka-project
docker-compose down
echo.
echo All Services Stopped!
pause
🎯 Next Time Startup (Using Batch Files):
Double-click: start-docker.bat → Wait 30 seconds
Double-click: start-backend.bat → Wait for "Started..."
Double-click: start-frontend.bat → Browser opens
That's it! 🚀