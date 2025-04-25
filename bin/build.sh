#!/bin/bash

npm install
npx prisma generate
npx prisma migrate deploy
npm run build