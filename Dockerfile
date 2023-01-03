FROM alpine:latest

RUN apk update
RUN apk add tini

ADD ./hello-world/target/aarch64-unknown-linux-musl/release/hello-world /usr/local/bin/hello-world

RUN apk add --no-cache curl && \
    rm -f /var/cache/apk/*

ADD ./docker_entrypoint.sh /usr/local/bin/docker_entrypoint.sh
RUN chmod a+x /usr/local/bin/docker_entrypoint.sh
