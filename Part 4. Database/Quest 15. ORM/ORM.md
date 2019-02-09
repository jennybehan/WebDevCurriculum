## Topics

### ORM(Object relational mapping)

객체지향 Object와 DB의 Table이 1:1로 매칭될 수 있도록 하는 것이다.

```
// 1:1 matching

Object - Table
Instance - Row
```

ORM은 애플리캐이션의 객체형 데이터(Application Object)와 DB의 관계형 데이터(RDB의 Relational Table)를 mapping 해준다.

-   임피던스 부정합: 객체형 데이터 Object와 관계형 데이터 Table이 일치하지 않는 문제. ORM을 이용하면 SQL문 작성 없이 매핑 설정을 통해 DB의 Table 데이터를 Object로 전달받을 수 있다.

### sequelize

-   NodeJS에서 가장 많이 사용하고 있는 ORM. 자바스크립트 구문을 자동으로 SQL로 변경해준다.
-   Promise를 기반으로 동작한다.

-   relation? read replication?

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

-   특정 DBMS에 종속적이지 않다. 매핑 설정만 해주면 로직을 건드릴 필요 없다. 즉 개발자는 OOP로 만드는 application 개발에만 신경쓰고 데이터에 대해서는 고려를 덜 해도 된다.

-   SQL문이 코드에 들어가지 않아 깔끔한 코드를 유지할 수 있다.

-   ORM이 nesting 데이터(??)를 바인딩해준다..

#### 단점

-   직접 query를 하는 것에 비해 퍼포먼스가 느리다.
-   Query tuning(?)이 힘들다.

### 모델간의 1:1, 1:N, N:M 관계는 각각 무엇이고 어떨 때 사용하나요?

모델: 모델은 데이터베이스의 테이블을 나타냄.

#### 1:1 관계

-   데이터 A가 자신의 정보를 담고있는 테이블과만 관계가 있는 경우. ex. 작성자(1):작성자에 대한 정보(1)
-   USER -> `hasMany` -> MEMO
-   MEMO -> `belongsTo` -> MEMO

```javascript
db.User.hasMany(db.Memo, {
    foreignKey: "author",
    sourceKey: "id"
})
db.Memo.belongsTo(db.User, {
    foreignKey: "author",
    targetKey: "id"
})
```

#### 1:N 관계

-   데이터 A는 여러개의 데이터 B를 만들 수 있지만 데이터 B는 하나의 데이터 A만 가지는 경우. ex. 작성자(1):메모(N)
-   USER -> `hasOne` -> INFO
-   INFO -> `belongsTo` -> USER

```javascript
db.User.hasOne(db.Info, {
    foreignKey: "user_id",
    sourceKey: "id"
})
db.Info.belongsTo(db.User, {
    foreignKey: "user_id",
    targetKey: "id"
})
```

#### N:M 관계

-   데이터 A에 여러개의 데이터 B가 만들어질 수 있으며 반대로 데이터 B도 데이터 A에 여러개 달릴 수 있다. ex. 메모(N):해시태그(M)
-   MEMO -> `belongsToMany` -> TAG
-   TAG -> `belongsToMany` -> MEMO

```javascript
db.Memo.belongsToMany(db.Tag, {
    through: "MemoHashTag"
})
db.Tag.belongsToMany(db.Memo, {
    through: "MemoHashTag"
})

// through 속성에 이름을 적어주면 모델이 생성된다.
// Memo의 아이디와 Tag의 아이디가 저장된다.
```

MySQL에서는 JOIN이라는 기능으로 여러 테이블 간의 관계를 파악해 결과를 도출한다. 시퀄라이즈는 JOIN 기능을 알아서 구현해 주는 대신 테이블 간에 어떤 관계가 있는 지 알려줘야 한다.

### 기타

#### Model define options

define 옵션의 첫번째 파라미터는 모델의 이름, 두번재 파라미터는 table schema와 맵핑되는 정보, 세번째 파라미터는 config 옵션이다.

```javascript
sequelize.define('Model1', {
    id: {
        type: ...,
        primaryKey: ...,
        autoIncrement: ...,
    },
    name: {
        // ...
    }
}, {
    classMethods: {},
    tableName: 'publisher',
    freezetableName: true,
    underscored: true,
    timestamps: false
});
```

##### options

-   type: 데이터 타입
-   primaryKey: 기본 키 설정(`default: false`)
-   autoIncrement: 연속적인 데이터인 경우 true 설정(`default: false`)
-   allowNull: NOT NULL 조건인 경우 true 설정(`default: false`)
-   unique: unique 조건인 경우 (??)
-   validate: 각 column에 대한 validation check 옵션 설정
-   freezeTableName: sequelize는 테이블 이름을 자동으로 복수형으로 만드는데, 이를 피하기 위해 해당 옵션을 true로 설정할 수 있다.

##### config

-   timestamps: sequelize는 테이블 생성 후 자동으로 createdAt, updatedAt 컬럼을 생성한다. false로 설정하면 이를 막을 수 있다.
-   paranoid: true인 경우 deletedAt이 테이블에 추가된다. 해당 row를 삭제하면 실제로 데이터가 삭제되는 게 아니라 deletedAt에 삭제된 날짜가 추가되며 deletedAt에 날짜가 표기된 row는 find 작업 시 제외된다. 데이터가 실제로 삭제되지 않지만 삭제된 것처럼 보인다.
    > 만약 무조건 삭제하고 싶다면 `{force: delete}`를 destroy의 파라미터로 던진다.
-   tableName: 실제 테이블 이름

*   spread? classMethods?

##### .sequelizerc?

-   http://docs.sequelizejs.com/manual/tutorial/migrations.html#the-sequelizerc-file

-   config: sequelize를 실행하는데 필요한 구성
-   migration: 테이블에 대한 모든 변경 사항이 포함 된 파일
-   seeders: 기본 데이터로 테이블을 초기화하기
