## Topics

### ORM(Object relational mapping)

애플리캐이션의 객체형 데이터(Application Object)와 DB의 관계형 데이터(RDB의 Relational Table)를 mapping 하는 것이다.

객체형 데이터와 관계형 데이터의 각 속성들을 매핑할 경우 관계형 데이터를 객체형 데이터처럼 사용가능하다.

관계형 데이터와 객체 지향 프로그래밍 언어가 서로 호환되지 않는 것을 임피던스 부정합이라고 하는데 ORM을 통해 객체형 데이터와 관계형 데이터가 일치하지 않는 문제를 해결하여 SQL문 작성 없이 매핑 설정을 통해 데이터 베이스의 table 데이터를 객체로 전달받을 수 있다.

### sequelize

### 모델간의 관계들(BelongsTo, HasOne, HasMany, BelongsToMany)

sequelize에서 연관 관계를 생성하기 위한 함수들. 모델(소스)에 있는 belongsTo, hasOne, hasMany, belongsToMany 함수 중 하나를 호출할 때 다른 모델을 함수(대상)의 첫번재 인수로 제공한다.

-   BelongsTo: 소스에 외래키와 단일 연관성 믹스인을 추가
-   HasOne: 대상에 외래키를 추가하고 소스에 단일 연관성 믹스인을 추가
-   HasMany: 대상에 외래키를 추가하고 소스에 복수 연관성 믹스인을 추가
-   BelongsToMany: 조인 테이블과 N:M 연관을 만들고, 소스에 복수 연관성 믹스인을 추가합니다. junction 테이블은 sourceId와 targetId로 작성

### 각종 쿼리

#### `CREATE`, `SELECT`, `UPDATE`, `DELETE`

## Checklist

### ORM을 사용하는 것은 사용하지 않는 것에 비해 어떤 장단점을 가지고 있나요?

#### 장점

-   ORM은 DBMS에 종속적이지 않다, 매핑 설정만 해주면 로직을 건드릴 필요 없다. 즉 개발자는 OOP로 만드는 application 개발에만 신경쓰고 데이터에 대해서는 고려를 덜 해도 된다.

-   OOP의 클래스 구조와 Object graph는 RDBMS의 table, relation으로 표현 가능한데 서로 표현 방식에 차이가 있기 때문에 이를 매핑을 통해 변환해주어야 한다.

#### 단점

### 모델간의 1:1, 1:N, N:M 관계는 각각 무엇이고 어떨 때 사용하나요?

모델: 모델은 데이터베이스의 테이블을 나타낸다. 클래스의 인스턴스는 데이터베이스의 행을 의미한다.
