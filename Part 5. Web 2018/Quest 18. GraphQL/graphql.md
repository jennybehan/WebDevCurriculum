## Checklist

-   REST 기반의 API 는 무엇인가요? 어떤 장점과 단점을 가지고 있을까요?

    -   특징: URI 중심으로 데이터의 CRUD 진행, Resource 를 기준으로 Endpoint 를 나누기 때문에 Endpoint 와 Resource 가 1:1 관계이다. 서버 사이드에서 데이터를 정의한다. XML, HTML, JSON 등 다양한 형식의 데이터를 허용한다.
    -   장점: 다양한 데이터 타입 지원, 가벼운 구조로 네트워크 페이로드를 줄여 성능이 좋음, HTTP 캐싱을 사용하면 보내고받는 데이터 양을 줄일 수 있음
    -   단점: REST 기반의 API 로 URI 를 관리하다보면 생성하고 관리해야 할 endpoint 수가 계속 늘어난다. 클라이언트 개발자가 데이터를 선택적으로 받아올 수 없고 서버에서 정해진 양식을 모두 받아 처리해야 한다. 데이터를 선택할 수 없기 때문에 네트워크 요청을 여러번 생성해 데이터 오버페칭, 혹은 언더페칭 되기도 한다. 요청에 대한 응답으로 어떤 데이터가 포함되어 있는지 명세를 요청하거나 직접 요청을 날려 확인하는 작업을 거쳐야 하는 번거로움도 있다.

-   GraphQL API 는 무엇인가요? REST 의 어떤 단점을 보완해 주나요?

    -   특징: Query 와 Mutation 으로 데이터의 CRUD 를 진행한다, endpoint 가 하나다. 따라서 한번의 요청으로 여러 리소스의 데이터를 전송받을 수 있으며 필요한 데이터만 요청할 수 있다, 클라이언트 사이드에서 데이터를 정의한다, 타입시스템을 활용하여 데이터를 정의한다. JSON 형식의 데이터만 허용한다.
    -   장점: REST 의 URI 보다 간결하게 쿼리를 작성할 수 있다. 데이터를 반환하는 데에 한번의 쿼리만 요청하면 된다. 이러한 데이터 페칭 방식은 네트워크 페이로드를 크게 줄이고 애플리케이션 성능을 향상시킨다. 또한 요청한 필드와 그 형태와 같은 구조의 데이터가 반환되므로 클라이언트 개발자는 원하는 데이터 필드를 요청할 수 있고 응답 데이터의 구조를 예상할 수 있다.

    -   Query: data 를 요청하는 함수(GET, read-only)

    ```javascript
    query {
        accounts {
            id
            username
            email
        }
    }
    ```

    -   Mutation: data 를 수정하는 역할의 함수를 내부에 구현한다.(POST, PUT, DELETE)

    ```javascript
    mutation {
        createAccount(username: "User", email: "Email") {
            id
            username
            email
        }
    }
    ```

    -   Resolver: query 에서 특정 필드에 대한 요청이 있을 때 그것을 어떤 로직으로 처리할지 GraphQL 에게 알려주는 역할
    -   Schema: graphql 이 쿼리하는 스키마(IDL)
    -   enum: way to specify a list of possible values

*   GraphQL 스키마는 어떤 역할을 하며 어떤 식으로 정의되나요?
    -   node.js 상에서 GraphQL 서버를 실행하고 스키마를 정의하려면 어떻게 해야 하나요?
*   GraphQL 리졸버는 어떤 역할을 하며 어떤 식으로 정의되나요?
    -   GraphQL 리졸버의 성능 향상을 위한 DataLoader 는 무엇이고 어떻게 쓰나요?
*   클라이언트 상에서 GraphQL 요청을 보내려면 어떻게 해야 할까요?
    -   Apollo Client 의 장점은 무엇일까요?
    -   Apollo Client 를 쓰지 않고 Vanilla JavaScript 로 GraphQL 요청을 보내려면 어떻게 해야 할까요?

## Quest

-   직전 퀘스트의 메모장의 서버 부분을 GraphQL API 로 리팩토링 해 보세요.
