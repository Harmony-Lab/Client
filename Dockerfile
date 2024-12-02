FROM node:23.0.0

RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /app
WORKDIR /app
ADD . /app

RUN npm install

ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["npm", "start"]