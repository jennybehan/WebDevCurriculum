# DataBase

## RDBMS

키(key)와 값(value)들의 관계를 테이블화 시킨 데이터베이스.

-   row(튜플, 레코드)는 primitive key(식별키)
-   column(속성, 필드)은 각 로우에 맞게 각각이 하나의 값만을 보유
-   이 row, column의 집합이 관계
-   table은 같은 속성을 공유하는 이 row, column의 집합이며 즉 관계를 뜻함

### MySQL

-   오픈소스형 RDBMS (썬 마이크로시스템즈 -> 오라클)

## 각종 쿼리

### `CREATE`, `SELECT`, `UPDATE`, `DELETE`

#### SQL Statement

-   Data Definition Statements: `CREATE`
-   Data Manipulation Statements: `SELECT`, `UPDATE`, `DELETE`

*   CREATE: 주어진 이름(`db_name`)으로 데이터베이스를 생성한다. CREATE 문을 사용하려면 데이터베이스에 대한 권한(?)이 필요하다. CREATE SCHEMA는 CREATE DATABASE와 같은 의미를 지닌다.

```
CREATE {DATABASE | SCHEMA} [IF NOT EXISTS] db_name
```

-   SELECT: 하나 이상의 테이블에서 선택된 행을 검색하는 데 사용한다. (테이블을 참조하지 않고 계산 된 행을 검색하는 데 사용될 수도 있음)

```
SELECT t1.*, t2.* FROM t1 INNER JOIN t2 ...
```

-   UPDATE: 테이블의 행을 수정한다. `WITH` 절로 시작하여 액세스 할 공통 테이블 표현식을 정의할 수도 있다.

```
UPDATE t SET id = id + 1;
```

-   DELETE: 테이블 내에서 행을 제거하고 삭제된 행의 수를 반환한다. `WITH` 절로 시작하여 액세스 할 공통 테이블 표현식을 정의할 수도 있다.

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

단방향 암호화 기법으로 평문을 암호화 된 텍스트로 만들어 준다. 평문인 password를 해시 알고리즘을 이용해 고정된 길이의 암호화된 문자열로 바꾸는 게 해시를 이용한 암호화 기법이다. 즉 특정 입력에 대해 항상 동일한 해시값을 리턴하며 이 점을 이용해 인증이 가능하다.

(Encryption: 양방향 암호화 기법, 암호화 된 텍스트를 다시 평문으로도 복호화 함)

### SHA256

-   SHA: 안전한 해시 알고리즘(Secure Hash Algorithm).
-   SHA256: 해시 값 크기가 256, 길이 한계 64, 32 바이트 워드를 사용하는 알고리즘.

## Checklist

### RDBMS에 길이를 알 수 없는 배열을 저장하려면 어떻게 설계해야 할까요?

-   JOIN을 사용하여 결합한다.

### RDBMS 테이블의 정규화는 무엇인가요?

-   정규화는 column의 값이 원자화 되어야 한다는 속성에서 기인한다. 즉 비원자성 값을 제거하여 데이터 중복을 제거하는 것이다.

### MySQL 엔진에는 어떤 것들이 있나요?

-   InnoDB : MySQL 8.0의 기본 스토리지 엔진. InnoDB는 사용자 데이터를 클러스터 된 인덱스에 저장하여 기본 키를 기반으로 일반적인 쿼리에 대한 I/O를 줄이며 데이터 무결성을 유지하기 위해 FOREIGN KEY 참조 무결성 제약 조건도 지원한다. 하지만 DB 프로세스가 비정상 종료하면 테이블이 파손될 가능성이 높다거나 트랜잭션 기능이 없고 update, delete, insert(추가처리 이외)가 테이블 락(Table Lock)으로 되어 있어서 갱신이 많은 용도로는 성능적으로 불리하다는 몇가지 단점도 존재함.

-   MyISAM : 이 테이블은 공간이 적습니다. 테이블 수준 잠금은 읽기 / 쓰기 작업 부하에서 성능을 제한하므로 웹 및 데이터웨어 하우징 구성에서 읽기 전용 또는 읽기 대부분의 작업 부하에서 주로 사용. 스토리지 엔진 전체에서 사전에 정의한 소수의 파일에 데이터를 저장하고, 트랜잭션을 지원하며, 비정상 종료시 복구기능이 있고, 데이터 갱신이 로우 락(Row Lock)으로 되어 있는 등 MyISAM에는 없는 장점이 있다. 데이터량에 따라서는 시작, 정지가 수 분 정도 걸린다거나 테이블 조작을 모두 DB를 경유해서 수행해야 하는 등의 단점도 존재

-   Memory : 모든 데이터를 RAM에 저장하여 중요하지 않은 데이터를 빠르게 검색해야하는 환경에 빠르게 액세스 할 수 있음. 이 엔진은 이전에는 HEAP 엔진으로 알려져 있으며 사용 사례가 감소 중이다.

-   CSV : 쉼표로 구분 된 값이있는 텍스트 파일. CSV 테이블을 사용하면 데이터를 CSV 형식으로 가져 오거나 덤프하여 동일한 형식을 읽고 쓰는 스크립트 및 응용 프로그램과 데이터를 교환 할 수 있다. CSV 테이블은 인덱싱되지 않기 때문에 일반적으로작업 중에 InnoDB 테이블에 데이터를 보관하고 가져 오기 또는 내보내기 단계에서만 CSV 테이블을 사용한다.

-   Archive : 압축, 인덱싱 없음.거의 참조되지 않는 많은 양의 히스토리, 아카이브 또는 보안 감사 정보를 저장 및 검색하기 위한 것.

-   NDB (NDBCLUSTER라고도 함) : 클러스터 된 데이터베이스 엔진. 가능한 한 높은 가동 시간 및 가용성이 필요한 응용 프로그램에 적합.

-   Federated : 여러 개의 물리적 서버에서 하나의데이터베이스를 만들기 위해 별도의 MySQL 서버를 연결할 수있는 기능을 제공함. 분산 환경에 적합

*   https://dev.mysql.com/doc/refman/8.0/en/storage-engines.html
*   https://ojava.tistory.com/25

### RDBMS에서 테이블의 인덱싱은 무엇인가요? 인덱싱을 하면 어떤 점이 다르며, 어떤 식으로 동작하나요?

테이블 데이터를 조회할 때 빠르고 효과적으로 조회할 수 있도록 돕는 SortedList. 테이블 내의 1개 이상의 컬럼을 값과 키-값으로 매칭하여 별도의 참조 테이블처럼 만드는 것.

-   특징: 테이블에 대한 별도의 참조 테이블 같은 형식. 값을 찾아오는 데에는 빠르지만 수정, 삭제할 때는 인덱스 테이블을 갱신해야 하기 때문에 느리다. (이미 정렬되어 있으므로 찾아오는 것은 빠르지만 변경할 때 다시 정렬해서 저장해야 하므로 수행 시간이 늘어남)
-   동작: 만약 테이블이 쿼리에 있는 컬럼에 대한 인텍스를 가지고 있다면, 모든 데이터를 조사하지 않고 인덱싱 된 테이블에서 필드를 검색해 온다.

-   컬럼을 하나만 지정해서 효율적으로 사용하려면 중복이 적은 컬럼을 인덱스로 만드는 것이 좋다(최대한 많이 걸러내기 위해). 여러 개의 컬럼을 지정할 경우 중복이 많은 순에서 적은 순으로 컬럼을 지정하는 것이 좋다.

```sql
CREATE INDEX index_name
ON table_name (column 1, column2, ...);
```

```sql
CREATE UNIQUE INDEX index_name
ON table_name (column 1, column2, ...);
```

### DB에 사용자의 암호를 평문으로 저장하지 않고도 사용자의 암호를 인증하는 것이 가능한 이유는 무엇일까요?

서버에서 secret key를 가지고 실제 암호가 아니라 암호화 된 내용을 저장하기 때문에. 다시 평문으로 풀려면 sectet key가 필요하다.

### 기타

-   NOT NULL

*   열이 NULL 값을 가질 수 없음을 보장합니다.

-   UNIQUE

*   열의 모든 값이 서로 다른지 확인한다. 해당 열이나 열 집합의 고유성을 보장한다. (PRIMARY KEY 조건에는 자동으로 UNIQUE 제약 조건이 있다.)

-   PRIMARY KEY

*   NOT NULL과 UNIQUE의 조합. UNIQUE 값을 포함해야 하고 NULL 값은 포함할 수 없다.
*   테이블의 각 행을 고유하게 식별함.
*   테이블당 하나만 존재해야 하지만 하나 또는 여러 개의 필드로 구성될 수 있다.

```sql
CREATE TABLE Persons (
  ID int NOT NULL,
  username VARCHAR(32) NOT NULL,
  PRIMARY KEY (ID)
)
```

-   FOREIGN KEY(외래키)

*   서로 다른 테이블을 연결할 때 사용하는 키. 다른 테이블의 행, 레코드를 고유하게 식별
*   다른 테이블의 PRIMARY KEY를 참조하는 한 테이블의 필드(혹은 필드 모음)
*   외래 키가 들어있는 테이블이 하위 테이블이다. 해당 후보 키를 가지고 있는 테이블이 상위 테이블이다.
*   테이블 사이에 기본키와 외래키를 매칭해서 의미없는 레코드의 조합을 제거할 수 있다.

```sql
CREATE TABLE Memos (
  memoId INT NOT NULL,
  username VARCHAR(32) NOT NULL,
  PRIMIARY KEY (memoID),
  FOREIGN KEY (ID) REFERENCES Persons(ID)
)
```

**주의: 실제 node.js 프로그래밍을 할 필요는 없습니다. 알맞는 테이블만 생성하고 그 생성을 위한 SQL문을 제시하면 됩니다!**
