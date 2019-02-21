# docker registry

## htpasswd 파일 만들기

> htpasswd -c [파일명] [유저명]
> docker run --rm --entrypoint htpasswd registry:2 -Bbn admin 1234 >> ./auth/htpasswd

## docker 설정

insecure registries에 사용할 포트를 등록한다  
(로컬 : localhost:5000)


## in local test environment

edit /etc/host

## create TSL certs

> openssl req -newkey rsa:2048 -nodes -keyout registry_auth.key -x509 -days 365 -out registry_auth.crt
