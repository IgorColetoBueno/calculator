## Getting Started on the Calculator

### Backend

***Make sure you have docker and docker compose installed and configured***

In first you must create a .env file. I have created a .env.example, so you can duplicate it and create the .env for your application

Enter on **/api** folder and run the following commands:

1. ```npm i```

2. ```docker-compose up -d```

3. ```npx prisma migrate dev```

4. ```npm start```
 
### Frontend

Create another terminal on **/frontend** folder and run the following commands:

1. ```npm i```

2. ```npm run dev```

