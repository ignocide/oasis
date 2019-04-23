# OASIS

msa로 구성된 서버입니다.  
spring cloud zuul을 기반으로 되어 있습니다. 

## 구성

gateway, config, eureka의 기본적인 구성

## 관리

docker로 관리하며 docker-registry 사용하여 홈 서버에 이미지 저장 관리 

## Services
  
### auth-service

인증 관련 서비스, jwt와 spring-security를 활용

#### tech

spring, java, spring-security

### tweet-service  

무언가를 알려주는 서비스, telegram을 이용하여 소통  
택배 알림, 위치 정보, 날씨정보, 환율, 뉴스 등의 기능


#### tech

typescript, telegram 


### todo-service

테스크 서비스 


#### tech

spring


### woofer-service

과거 woofer 프로젝트 리부트, 주로 youtube를 이용한 음악 관련 서비스를 제공

#### tech

typescript

### sandbox 

각각의 서비스에서 jwt를 유효성을 인증해주는 모듈,  
msa 특성상 공용으로 사용되는 기능들의 관리가 필요하기 때문에 생긴 모듈

#### tech

java, spring security


## Side Project


### node-server  

비공개 프로젝트로 koajs를 기반으로 하고 있는 서버, 사용 관점에 있어서 스프링과 유사하게 사용 가능하다. 

```
class TestRoute extends Router {


    constructor() {
        super('')
    }

    @GetMapping('/test')
    getTest(@Ctx ctx: IRouterContext, @RequestBody a: string, @RequestBody b: string, @RequestBody c: string): void {
        ctx.body = 'Hello World!';
    }

    @PostMapping('/user')
    @MiddlewareRunner(abc.funcA, abc.funcB, abc.funcC)
    getTest2(@RequestBody user: User, ctx: IRouterContext): void {
        // console.log(this)
        ctx.body = `user info is that ${JSON.stringify(user)}`;
    }

    @GetMapping('/test/:id')
    getIdTest(@PathVariable('id') id: number, ctx: IRouterContext): void {
        ctx.body = `id is ${id}`;
    }
}
```


### spring-cloud-config-client-js

nodejs프로젝트에서 spring-cloud-config 서버에 접속하여 알맞는 설정파일을 받을 수 있도록 해주는 모듈  
[spring-cloud-confg-client-js](https://github.com/ignocide/spring-cloud-confg-client-js)

### oasis-web

oasis 프로젝트에서 todo와 woofer서비스에 대한 웹  
react, typescript 그리고 nextjs를 이용해서 만들고 있다.  
[oasis-web](https://github.com/ignocide/oasis-web)


## before exec in local with docker

* config-service must be started, before other services start up
