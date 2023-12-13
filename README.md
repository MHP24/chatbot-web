# MHP Virtual Assistant
<p align="center">
  <a href="https://mg-hp.com/" target="blank"><img src="https://mg-hp.com/msc/logo.jpg" width="200" alt="MHP Logo" /></a>

  <div align="center">
    <img src="https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png" width="30" height="30"/>
    <img src="https://user-images.githubusercontent.com/25181517/183890598-19a0ac2d-e88a-4005-a8df-1ee36782fde1.png" width="30" height="30"/>
    <img src="https://user-images.githubusercontent.com/25181517/202896760-337261ed-ee92-4979-84c4-d4b829c7355d.png" width="30" height="30"/>
    <img src="https://github.com/marwin1991/profile-technology-icons/assets/136815194/519bfaf3-c242-431e-a269-876979f05574" width="30" height="30"/>
    <img src="https://user-images.githubusercontent.com/25181517/182884894-d3fa6ee0-f2b4-4960-9961-64740f533f2a.png" width="30" height="30"/>
    <img src="https://user-images.githubusercontent.com/25181517/183896128-ec99105a-ec1a-4d85-b08b-1aa1620b2046.png" width="30" height="30"/>
    <img src="https://user-images.githubusercontent.com/25181517/117207330-263ba280-adf4-11eb-9b97-0ac5b40bc3be.png" width="30" height="30"/>
    <img src="https://github.com/marwin1991/profile-technology-icons/assets/62091613/b40892ef-efb8-4b0e-a6b5-d1cfc2f3fc35" width="30" height="30"/>
    <img src="https://user-images.githubusercontent.com/25181517/187955008-981340e6-b4cc-441b-80cf-7a5e94d29e7e.png" width="30" height="30"/>
  </div>
  
</p>

## 1. Installation
### Client Installation

Before running the client, ensure you have [Node.js](https://nodejs.org/en) installed (version 18 or higher).

   
1 . Navigate to the client directory:

```bash
  cd client
```

 2 . Install dependencies using Yarn:
```bash
  yarn
```

 3 . Replace .env.example variables and rename it as __.env file__

 4 . Start the development server:
```bash
  yarn start:dev
```

<hr/>

### Server Installation

Before running the server, ensure you have [Node.js](https://nodejs.org/en) installed (version 18 or higher) and [Docker](https://www.docker.com/) installed and running.

 1 . Navigate to the server directory:
```bash
  cd server
```

 2 . Install dependencies using Yarn:
```bash
  yarn
```

 3 . Replace .env.example variables and rename it as __.env file__

 4 . Generate Prisma client:
```bash
  yarn prisma:generate
```

 5 . Start Docker in the server directory:
```bash
  docker-compose up -d
```

 6 . Run database migrations with Prisma:
```bash
  yarn prisma:migrate
```

 7 . Start the development server:
```bash
  yarn start:dev
```
