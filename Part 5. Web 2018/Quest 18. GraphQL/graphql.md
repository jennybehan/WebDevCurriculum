## Checklist

-   REST 기반의 API 는 무엇인가요? 어떤 장점과 단점을 가지고 있을까요?

    -   Resource 를 기준으로 Endpoint 를 나누기 때문에 Endpoint 와 Resource 가 1:1 관계이다.
    -   장점: 클라이언트마다 재사용할 수 있다?
    -   단점: REST 기반의 API 로 URI 를 관리하다보면 생성하고 관리해야 할 endpoint 수가 계속 늘어난다. 클라이언트 개발자가 데이터를 선택적으로 받아올 수 없고 서버에서 정해진 양식을 모두 받아 처리해야 한다. 데이터를 선택할 수 없기 때문에 네트워크 요청을 여러번 생성해 데이터 오버페칭, 혹은 언더페칭 되기도 한다. 요청에 대한 응답으로 어떤 데이터가 포함되어 있는지 명세를 요청하거나 직접 요청을 날려 확인하는 작업을 거쳐야 하는 번거로움도 있다.

-   GraphQL API 는 무엇인가요? REST 의 어떤 단점을 보완해 주나요?

    -   데이터를 요청하는 방법을 정의한 문법(data Query Language)
    -   필요한 데이터만 요청할 수 있고 한번의 요청으로 여러 리소스의 데이터를 전송받을 수 있다.
    -   타입시스템을 활용하여 데이터를 정의한다.
    -   REST 의 URI 보다 간결하게 작성되는 쿼리. 요청한 필드와 그 형태와 같은 구조의 데이터가 반환된다. 따라서 원하는 데이터 필드를 요청할 수 있고 응답 데이터의 구조를 예상할 수 있다.
    -   여러가지 API 에 요청을 생성하는 대신 컴포넌트에 필요한 데이터만을 요청할 수 있다.
    -   서버는 요청을 받으면 해당 요청의 유효성 검사를 진행한다. 해당 함수 및 인자를 지원하는가를 판단하고 지원할 경우 함수를 실행해 결과를 반환한다.

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
