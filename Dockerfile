FROM arm64v8/alpine:3.12

RUN apk update
RUN apk add tini

ADD ./hello-world/target/aarch64-unknown-linux-musl/release/hello-world /usr/local/bin/hello-world
ADD ./docker_entrypoint.sh /usr/local/bin/docker_entrypoint.sh
RUN chmod a+x /usr/local/bin/docker_entrypoint.sh

WORKDIR /root

EXPOSE 80

ENTRYPOINT ["/usr/local/bin/docker_entrypoint.sh"]
