# Hello, git!

## 스터디 노트
## git init
새로운 Git 저장소를 생성합니다. 버전없는 기존 프로젝트를 Git 저장소로 변환하거나 새로운 빈 저장소를 초기화시킵니다.

- Git과 관련한 메타데이터들이 들어있는 `.git` 파일을 생성합니다.
- HEAD 파일도 생성됩니다.

## git add
* `git add -p`: 해당 디렉토리에 있는 파일 중 일부를 다음 커밋을 위해 스테이징 시킨다. (파일 내부에서만 사용)

## git commit
### 실습해보기
* `git commit --amend`로 커밋 합치기
#### `amend` 사용 시 주의점
* amend된 커밋은 완전히 새로운 커밋이며 이전 커밋은 더이상 현재 브랜치에 존재하지 않는다. 따라서 공용 스냅샷을 제거한 것과 같은 결과가 되므로 협업 시 다른 개발자가 작업한 내용을 없애지 않도록 주의해야 한다.

## git diff
* `git diff`를 사용하면
1. 경로 없이 호출할 경우 전체 레포지토리의 모든 변경사항을 보여준다.
2. 마지막 커밋 후 만들어진 커밋되지 않은 변경사항을 확인할 수 있다.
3. 브랜치 간 변경 내용은 점 연산자로 확인할 수 있다.
```
// two dot operator
git diff branch1..branch2

// three dot operator
git diff branch1...branch3
```
4. 브랜치 간 특정 파일을 비교하려면 `git diff`의 세번째 인수로 파일 경로를 전달할 수 있다.
`git diff master new_branch ./diff_test.txt`

## git rebase
오래된 커밋이나 여러 개의 커밋을 수정하기 위해 사용하며, 일련의 커밋들을 새로운 베이스 커밋으로 합칠 수 있다. 따라서 프로젝트의 히스토리가 모두 없어진 것처럼 보이기도 한다.

### 참고 그림
![rebase image - atlassian git tutorial](https://www.atlassian.com/dam/jcr:e4a40899-636b-4988-9774-eaa8a440575b/02.svg)

### git rebase -i(interactive)
모든 커밋을 움직이는 대신 개별 커밋들을 변경할 수 있다.

### git merge와 다른 점
`git merge`는 항상 앞으로 이동하는(forward moving) 변경 기록이다. 반면 `git rebase`는 강력한 히스토리 재작성 기능을 가지고 있다.

### 왜 사용하나?
선형적인 프로젝트 히스토리를 유지하여 나중에 기록을 다시 봐야할 일이 생기거나 버그가 생겼을 때 용이하기 위해서.
`rebase`를 사용하면 브랜치 히스토리를 깨끗하게 유지해서 늘 최신 상태의 마스터 브랜치에서 작업한 것처럼 보이며, merge시 깔끔하게 마스터 브랜치에 적용된다. 

* [더 참고해 볼 내용](https://www.atlassian.com/git/tutorials/merging-vs-rebasing)

## git reflog
`git reset --soft`로 커밋을 되돌리다가 잘못 되돌렸을 경우 `git reflog`를 이용해 변경사항을 확인하고 다시 `git reset`을 이용해 기록된 `HEAD@{<n>}`으로 되돌아 갈 수 있다.

## git branch
`git branch` 명령을 사용하여 브랜치를 생성, 삭제, 이름 변경, 목록 보기 등을 할 수 있다. 

```
// 레포지토리에 있는 브랜치들을 살펴보기
git branch // git branch --list와 동일하다.

// <branch-name>이라는 이름의 branch 생성하기
// * 주의: 해당 브랜치로 체크아웃 되지는 않음.
git branch <branch-name>

// <branch-name>이라는 이름의 branch 삭제하기
// -d를 사용하면 안전하게 삭제 - merge되지 않은 변경사항들을 삭제하지 않음
// -D는 force delete
git branch -d <branch-name>
git branch -D <branch-name>

// 브랜치명 변경하기
git branch -m <branch-name>

// 리모트 브랜치 모두 보기
git branch -a
```

브랜치간에는 전환하거나 분기 된 기록을 다시 함께 넣을 수는 없다 따라서 다음 명령들이 중요하다.

### 함께 봐야하는 명령
- `git checkout`
- `git merge`