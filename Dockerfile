FROM node:20

# Update package lists and install required tools
RUN apt-get update && apt-get install -y --no-install-recommends \
    wget \
    build-essential \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install GLIBC 2.27
WORKDIR /tmp
RUN wget http://ftp.gnu.org/gnu/libc/glibc-2.27.tar.gz && \
    tar -xvzf glibc-2.27.tar.gz && \
    cd glibc-2.27 && \
    mkdir build && cd build && \
    ../configure --prefix=/opt/glibc-2.27 && \
    make -j$(nproc) && \
    make install && \
    rm -rf /tmp/glibc-2.27*

# Add GLIBC to library path
ENV LD_LIBRARY_PATH=/opt/glibc-2.27/lib:$LD_LIBRARY_PATH

# Set up application directory
RUN mkdir -p /app
WORKDIR /app
COPY . /app

# Install application dependencies
RUN npm install

# Expose application port
ENV HOST=0.0.0.0
EXPOSE 3000

# Start the application
CMD ["npm", "start"]