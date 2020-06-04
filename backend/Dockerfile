FROM golang:1.13-alpine as builder
WORKDIR /app

RUN apk --no-cache add musl-dev util-linux-dev build-base
ADD . /app
RUN CGO_ENABLED=1 go build -tags netgo -a -ldflags "-linkmode external -extldflags '-static' -s -w" -v -o backend .

FROM alpine:latest  
RUN apk --update --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /app/backend .
COPY ./test.db /root/test.db
COPY ./docker/entrypoint.sh /root/entrypoint.sh

EXPOSE 7000

CMD ["./entrypoint.sh"]
