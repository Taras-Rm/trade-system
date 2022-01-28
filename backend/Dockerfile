FROM golang:latest

WORKDIR /app

COPY . /app/

RUN go mod download
RUN go build -o trade-app main.go

CMD ["./trade-app"]