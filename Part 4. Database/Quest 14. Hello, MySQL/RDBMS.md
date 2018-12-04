# DataBase

## RDBMS

키(key)와 값(value)들의 관계를 테이블화 시킨 데이터베이스.

- row(튜플, 레코드)는 primitive key(식별키)
- column(속성, 필드)은 각 로우에 맞게 각각이 하나의 값만을 보유
- 이 row, column의 집합이 관계
- table은 같은 속성을 공유하는 이 row, column의 집합이며 즉 관계를 뜻함

### MySQL

- 오픈소스형 RDBMS (썬 마이크로시스템즈 -> 오라클)

## 각종 쿼리

### `CREATE`, `SELECT`, `UPDATE`, `DELETE`

SQL Statement
- Data Definition Statements: `CREATE`
- Data Manipulation Statements: `SELECT`, `UPDATE`, `DELETE`

CREATE:

https://dev.mysql.com/doc/refman/8.0/en/create-table.html

SELECT: 하나 이상의 테이블에서 선택된 행을 검색하는 데 사용한다. (테이블을 참조하지 않고 계산 된 행을 검색하는 데 사용될 수도 있음)

```
SELECT t1.*, t2.* FROM t1 INNER JOIN t2 ...
```

UPDATE: 테이블의 행을 수정한다. `WITH` 절로 시작하여 액세스 할 공통 테이블 표현식을 정의할 수도 있다.

```
UPDATE t SET id = id + 1;
```

DELETE: 테이블 내에서 행을 제거하고 삭제된 행의 수를 반환한다. `WITH` 절로 시작하여 액세스 할 공통 테이블 표현식을 정의할 수도 있다.

다음 단일 테이블 삭제 예제에서 `where_condition`은 삭제할 행을 식별하는 조건이다. `WHERE` 절이 없으면 모든 행이 삭제된다. `ORDER BY` 절은 행이 삭제되는 순서를 지정한다. `LIMIT` 절은 삭제할 수 있는 행 수를 제한한다(단일 테이블 삭제에서만 적용, 다중 테이블 삭제에는 적용되지 않음).

```
DELETE [LOW_PRIORITY] [QUICK] [IGNORE] FROM tbl_name
    [WHERE where_condition]
    [ORDER BY ...]
    [LIMIT row_count]

DELETE FROM somelog WHERE user = 'jcole'
ORDER BY timestamp_column LIMIT 1;
```

## Hash

### SHA256

## Checklist

### RDBMS에 길이를 알 수 없는 배열을 저장하려면 어떻게 설계해야 할까요?

### RDBMS 테이블의 정규화는 무엇인가요?

- 정규화는 column의 값이 원자화 되어야 한다는 속성에서 기인한다. 즉 비원자성 값을 제거하여 데이터 중복을 제거하는 것이다.

### MySQL 엔진에는 어떤 것들이 있나요?

### RDBMS에서 테이블의 인덱싱은 무엇인가요? 인덱싱을 하면 어떤 점이 다르며, 어떤 식으로 동작하나요?

### DB에 사용자의 암호를 평문으로 저장하지 않고도 사용자의 암호를 인증하는 것이 가능한 이유는 무엇일까요?

## Quest

### 로컬 MySQL 서버에서 Quest 12~13의 결과물을 MySQL 기반으로 만들어 보고자 합니다.

  * 먼저 테이블이 어떻게 설계되어야 할지, 어떤 정보를 담고 있어야 할지 생각해 보세요
  * 사용자의 암호는 어떤 식으로 저장해야 할까요?

    **주의: 실제 node.js 프로그래밍을 할 필요는 없습니다. 알맞는 테이블만 생성하고 그 생성을 위한 SQL문을 제시하면 됩니다!**
