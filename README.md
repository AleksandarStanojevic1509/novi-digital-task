## Installation

### Requirements:

- **Operating System:** Linux-based Operating System (Ubuntu or Debian-like preferred)
- **Git:** [How to install](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- **Docker Engine:** [How to install](https://docs.docker.com/engine/install/debian/#install-using-the-convenience-script)
  [Configure rootless support](https://docs.docker.com/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user)
- **Docker Compose V2:** [How to install](https://docs.docker.com/compose/install/linux/#install-using-the-repository)
- **Node.js:** >18.x [How to install](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)

### Run application with client and server on local:

#### Client and server will be runned from local machine, and dependenices must me spined with docker compose.

- **Clone Repository:** `git clone git@github.com:AleksandarStanojevic1509/novi-digital-task.git -b main novi-digital-task`
- **Install dependency:** navgate to novi-digital-task/client `npm install` && novi-digital-task/server `npm install`
- **Run Docker:** navigate to root folder type `docker compose up --build` this will spin mongoDB and redis
- **Run Server:** navigate to server from root `cd novi-digital-task/server/ && npm run dev`
- **Run Client:** navigate to client from root `cd novi-digital-task/client/ && npm run dev`
- **Web app:** web app will be at `http://localhost:5173`

### Run standalone application:

- **Clone Repository:** `git clone git@github.com:AleksandarStanojevic1509/novi-digital-task.git -b main novi-digital-task`
- **Run Docker:** navigate to root folder type `docker compose -f docker-compose.standalone.yml up --build` this will spin whole app
- **Web app:** web app will be at `http://localhost:8080`
