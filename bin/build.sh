#!/bin/bash

npm install
npm run build
npx prisma migrate deploy