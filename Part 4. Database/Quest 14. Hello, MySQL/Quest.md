## Quest

### 로컬 MySQL 서버에서 Quest 12~13의 결과물을 MySQL 기반으로 만들어 보고자 합니다.

> 먼저 테이블이 어떻게 설계되어야 할지, 어떤 정보를 담고 있어야 할지 생각해 보세요

#### memo table

-   UserId
-   PostId
-   Title
-   Content

```sql
CREATE TABLE memos
(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  content VARCHAR(300),
  FOREIGN KEY(id)
    REFERENCES users(id)
    ON DELETE CASCADE
);
```

#### user table

-   UserId
-   UserPw
-   openLog
-   ..?

```sql
CREATE TABLE users
(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  account VARCHAR(32) NOT NULL,
  password VARCHAR(256) NOT NULL,
  author VARCHAR(32) NOT NULL,
  UNIQUE KEY user_account(account)
);
```

```sql
CREATE TABLE access_log
(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

  FOREIGN KEY(id)
    REFERENCES users(id)
    ON DELETE CASCADE
);

-- order by updated_at
```

> 사용자의 암호는 어떤 식으로 저장해야 할까요?

서버에서 해시함수로 암호화 해서 저장한다.
