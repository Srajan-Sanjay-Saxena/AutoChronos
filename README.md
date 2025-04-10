# AutoChronos 

## Table of contents:
- About the project
- Use of solid principles and design patterns
- List of tools used
- The architecture of the project
- Setting up and running the code
- Demonstration of the working model
- Important links
- Contributors

## About the project:
- Project area -> Distributed Job scheduler with support for periodic and one time jobs.
- Detailed information -> Build a highly scalable and performant scheduler which can schedule tasks to workers. The job types can be periodic as well as one time.
- Job scheduling -> Jobs are sent to the main server, which then pushes them in a BullMQ queue. The workers take jobs from the queue, one-by-one and then execute them in their local system.
- Periodic jobs -> The period of the job is taken using cron. Then, at the fixed intervals, server pushes the job in the queue. Then, workers execute the job in their local system.
- Execution:
  1. The frontend user gives command to execute to the website. 
  2. The frontend sends API request to backend.
  3. Backend server receives the request and sends the task to one of the workers.
  4. The workers do the task.

## Use of solid principles and design patterns:
- TypeScript <span style="color: red; font-weight: bold">SOLID</span> principles.
- TypeScript <span style="color: blue; font-weight: bold">SINGLETON</span> patterns.
- TypeScript <span style="color: yellow; font-weight: bold">FACEDE</span> patterns.
- TypeScript <span style="color: green; font-weight: bold">STRATEGY</span> patterns.
- TypeScript <span style="color: aqua; font-weight: bold">BUILDER</span> patterns

## List of tools used:
### Below is the list of tools used for this project -
- [NextJS](https://nextjs.org/)
- [NodeJS](https://nodejs.org/en)
- [MongoDB](https://www.mongodb.com/)
- [BullMQ](https://docs.bullmq.io/) and [Redis](https://redis.io/)
- [Docker](https://www.docker.com/) and [Docker Swarm](https://docs.docker.com/engine/swarm/)

### Deployment -
#### [Vercel](https://vercel.com/) for frontend |  [Render](https://render.com/) for backend
#### Pricing: Free versions used (Paid versions are also available.)
#### Why it is the best fit: 
- Simple and easy to use
- Auto scaling of applications
- Git integration for continuous deployment
- Managed databases (PostgreSQL, Redis)
- Supports multiple languages (Node.js, Python, etc.)
- Free SSL, automatic HTTPS, and DDoS protection
#### Alternatives: 
- DigitalOcean
- Fly.io
- Google Cloud Run
- Dokku

## Architecture:
![Logo]()

## Setting up and running the code:
#### Steps to run the code in your local computer -
1. Cloning the code -> Open a terminal in your command prompt and enter this command to clone the project in your local machine : 
```bash 
git clone https://github.com/Srajan-Sanjay-Saxena/AutoChronos
```
2. Install the necessary packages using this command on terminal:
```bash
pnpm i
```
3. Make sure you have a redis container running in background on port 6379.
4. Run these commands in your terminal:
```bash
pnpm start-express
pnpm start-redis
```
5. You should now have the backend running on your system.

## Demonstration of the working model:
<br>

[![Demo video]()]()

## Important Links:
- [Link to the frontend repo](https://github.com/vivekmaurya001/TaskMaster)
- [Link to the deployed site for backend](http://localhost:3001)
- [Link to the deployed site for frontend](http://localhost:3000)

## Contributors:
1. [Srajan Sanjay Saxena](https://github.com/Srajan-Sanjay-Saxena)
2. [Siddhant Baranwal](https://github.com/Siddhant-Baranwal)
3. [Vivek Maurya](https://github.com/vivekmaurya001)
4. [Saksham Chauhan](https://github.com/kaneki003)

