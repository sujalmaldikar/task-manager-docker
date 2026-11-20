# Task Manager – Full-Stack Docker Application

A full-stack Task Manager application built with React, Node.js, Express, and PostgreSQL, containerized using Docker and orchestrated with Docker Compose.

The application demonstrates containerization, multi-container orchestration, persistent database storage, health checks, and Nginx reverse proxy configuration.

## Features

- Create, view, update, and delete tasks.
- Mark tasks as completed or pending.
- React-based user interface.
- RESTful API using Node.js and Express.
- PostgreSQL database for persistent storage.
- Docker containers for frontend, backend, and database.
- Docker Compose for managing multiple services.
- Nginx reverse proxy for API requests.
- Container health checks and service dependencies.
- Persistent PostgreSQL data using Docker named volumes.

## Tech Stack

| Technology | Purpose |
|---|---|
| React + Vite | Frontend |
| Node.js | Backend runtime |
| Express.js | REST API |
| PostgreSQL 16 | Database |
| Docker | Containerization |
| Docker Compose | Multi-container orchestration |
| Nginx | Frontend server and reverse proxy |

## Architecture

```text
                Browser
                   |
                   | http://localhost:8080
                   v
          +-------------------+
          | Frontend Container|
          | React + Nginx     |
          +-------------------+
                   |
                   | /api requests
                   v
          +-------------------+
          | Backend Container |
          | Node.js + Express |
          +-------------------+
                   |
                   | PostgreSQL connection
                   v
          +-------------------+
          | Database Container|
          | PostgreSQL 16     |
          +-------------------+
                   |
                   v
          Docker Named Volume
             taskmanager_data
```

## Project Structure

```text
task-manager-docker/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── routes/
│   │   │   └── taskRoutes.js
│   │   └── server.js
│   ├── Dockerfile
│   └── .dockerignore
│
├── database/
│   └── init.sql
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── Dockerfile
│   ├── nginx.conf
│   └── .dockerignore
│
├── .gitignore
├── docker-compose.yml
└── README.md
```

## Prerequisites

Install the following before running the application:

- Docker Desktop
- Docker Compose

## Environment Configuration

Create a `.env` file in the project root.

```env
# PostgreSQL Configuration
POSTGRES_DB=taskmanager
POSTGRES_USER=taskuser
POSTGRES_PASSWORD=taskpass123

# Backend Database Connection
DB_HOST=db
DB_PORT=5432
DB_NAME=taskmanager
DB_USER=taskuser
DB_PASSWORD=taskpass123

# Application Ports
BACKEND_PORT=5000
FRONTEND_PORT=8080
```

Change the example database password before using this configuration in a shared or production environment.

**Important:** Never commit your actual `.env` file or database credentials to GitHub.

## Run the Application

### 1. Clone the repository

```bash
git clone https://github.com/sujalmaldikar/task-manager-docker.git
```

### 2. Enter the project directory

```bash
cd task-manager-docker
```

### 3. Create the environment file

Create the root `.env` file using the configuration shown above.

### 4. Build and start containers

```bash
docker compose up -d --build
```

This builds the frontend and backend images and starts all three services.

### 5. Check container status

```bash
docker compose ps
```

### 6. Access the application

Open:

http://localhost:8080

## API Endpoints

Base URL: `http://localhost:8080/api`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/tasks` | Retrieve all tasks |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |
| GET | `/health` | Check backend and database health |

## Useful Docker Commands

**Start services**

```bash
docker compose up -d
```

**Build and start services**

```bash
docker compose up -d --build
```

**View running containers**

```bash
docker compose ps
```

**View logs**

```bash
docker compose logs -f
```

**View backend logs**

```bash
docker compose logs -f backend
```

**Stop services**

```bash
docker compose stop
```

**Restart services**

```bash
docker compose restart
```

**Stop and remove containers and network**

```bash
docker compose down
```

The named database volume is preserved by this command.

**Warning:** Avoid `docker compose down -v` unless you intentionally want to delete the database volume and its stored data.

## Database Persistence

PostgreSQL data is stored using a Docker named volume:

```text
taskmanager_data
```

This volume keeps database records even when containers are restarted or recreated.

The database initialization script is:

```text
database/init.sql
```

It creates the tasks table and inserts initial sample records when PostgreSQL initializes a new, empty data directory.

## Learning Outcomes

Through this project, I practiced:

- Writing Dockerfiles for frontend and backend applications.
- Building a multi-stage Docker image for React.
- Creating and managing Docker containers.
- Configuring Docker Compose services and networking.
- Implementing container health checks.
- Configuring Nginx as a reverse proxy.
- Connecting Node.js applications to PostgreSQL.
- Managing persistent storage with Docker volumes.
- Using Git and GitHub for version control.

## Author

**Sujal Maldikar**

GitHub: [@sujalmaldikar](https://github.com/sujalmaldikar)

Project Repository: [task-manager-docker](https://github.com/sujalmaldikar/task-manager-docker)
