# 🌤️ Weather Monitoring Application

A robust weather monitoring application built with Node.js and Express, using the OpenWeatherMap API to fetch and display real-time weather data for multiple cities. The app includes automated weather data collection, data storage, and alert features, all of which are containerized for easy deployment.

## 📑 Table of Contents
- [Features](#features)
- [Design Choices](#design-choices)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Architecture Overview](#architecture-overview)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Docker Setup](#docker-setup)
  - [Building the Docker Image](#building-the-docker-image)
  - [Running the Docker Container](#running-the-docker-container)
  - [Using Docker Compose](#using-docker-compose)
- [Dependencies](#dependencies)
- [API Endpoints](#api-endpoints)


## 🌟 Features
- **Real-time Weather Data:** Fetches and displays current weather for multiple cities.
- **In-memory Data Storage:** Uses SQLite for lightweight data storage.
- **Alert System:** Notifies users when temperature crosses a specified threshold.
- **Daily Summaries:** Provides daily weather summaries for each city.
- **Automated Data Collection:** Uses cron jobs to fetch and store weather data periodically.
- **Containerized Deployment:** Easily deployable using Docker.

## 🛠 Design Choices

1. **Node.js with Express:** Chosen for its efficiency in handling asynchronous operations and ease of building RESTful APIs.
2. **SQLite:** An in-memory database was used for simplicity and performance. Suitable for small-scale applications where data persistence between restarts isn't a priority.
3. **Axios:** Utilized for making HTTP requests to the OpenWeatherMap API due to its simplicity and promise-based API.
4. **Node-cron:** Selected for scheduling periodic weather data fetches without the need for an external job scheduler.
5. **Docker:** The entire application, including the web server and database, is containerized for consistent and portable deployments.

## 🛠 Technologies Used
- **Node.js**: JavaScript runtime environment
- **Express**: Web framework for Node.js
- **Axios**: HTTP client for API requests
- **SQLite**: Lightweight SQL database engine
- **Node-cron**: Scheduler for automated tasks
- **Docker**: Containerization platform

## 📋 Prerequisites
Before setting up the application, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Docker](https://www.docker.com/products/docker-desktop) (for running containers)
- [Docker Compose](https://docs.docker.com/compose/) (for multi-container setups)
- [Git](https://git-scm.com/) (for version control)

## 🏗️ Architecture Overview

The application follows a simple architecture:
- **Backend (Node.js):** Handles API requests, fetches data from the OpenWeatherMap API, processes weather data, and interacts with the SQLite database.
- **Database (SQLite):** Used for storing weather data in-memory for real-time processing.
- **Frontend (HTML/CSS/JavaScript):** Displays weather data on a web-based dashboard.
- **Scheduling:** Automated tasks are handled by `node-cron` to fetch weather data periodically.

## 🚀 Installation

### Step 1: Clone the Repository
```bash
git clone https://github.com/your-username/weather-monitoring.git
cd weather-monitoring
