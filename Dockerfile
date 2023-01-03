FROM alpine:3.17

RUN apk update
RUN apk add --no-cache tini && \
    rm -f /var/cache/apk/*

ARG ARCH
ADD ./hello-world/target/${ARCH}-unknown-linux-musl/release/hello-world /usr/local/bin/hello-world
RUN chmod +x /usr/local/bin/hello-world
ADD ./docker_entrypoint.sh /usr/local/bin/docker_entrypoint.sh
RUN chmod a+x /usr/local/bin/docker_entrypoint.sh
