FROM node:20.0.0

RUN mkdir -p /app
WORKDIR /app
ADD . /app

RUN npm install

RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["npm", "start"]