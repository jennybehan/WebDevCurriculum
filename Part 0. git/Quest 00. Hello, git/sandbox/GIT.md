# Hello, git!

## Checklist

### 버전 관리 시스템은 왜 필요한가요?

프로젝트의 전체 히스토리를 파악하고 추적할 수 있으며 동시에 여러 사람이 하나의 프로젝트를 만드는 데에 유용하기 때문입니다.
프로젝트의 전체 히스토리가 파악되면 이전 버전으로 돌아가 버그의 근본 원인을 분석할 수 있으며 이를 바탕으로 문제를 해결할 수 있습니다.
브랜치를 만들고 또 합치는 과정에서 여러 분기의 변경사항들이 충돌하지는 않는 지 파악할 수 있습니다.

### git 외의 버전관리 시스템에는 무엇이 있나요? git은 그 시스템과 어떤 점이 다르며, 어떤 장점을 가지고 있나요?

#### 기타 버전관리 시스템

CVS, SVN(Subversion). 하나의 풀 버전 히스토리를 가진 중앙 레포지토리가 존재하고, 개발자는 작업 사본을 가지고 작업합니다.

#### Git의 다른 점, 특징

##### 분산저장

Git은 분산버전 관리 시스템으로 하나의 작업 사본이 아니라 모든 개발자들이 각자 본인의 작업 레포지토리를 가지고 있습니다. 즉 SVN과 달리 Git은 중앙 레포지토리와 작업 사본을 구분하지 않습니다.

* 이를 지원하기 위해 레포지토리 간 서로의 이력을 `push`, `pull` 하는 기능을 가지고 있습니다.

##### 비선형적인 개발 워크플로우 지원가능

Git은 비선형적인 개발 워크플로우에 용이합니다. 이를 지원하는 강력한 기능으로 `branch`와 `merge` 기능이 있습니다. `branch` 기능 덕분에 개발자는 독립적인 코드 환경에서 안전하게 새로운 시도들을 해볼 수 있습니다.

##### 보안

보안상에서도 Git은 다른 시스템들 보다 안전합니다. SHA1이라는 암호 해시 보안 알고리즘을 사용해 파일의 내용 뿐 아니라 파일과 디렉토리, 버전, 태그 및 커밋 간 관계까지 모두 들어있는 Git 리포지토리를 보호합니다.

##### 저장

* SVN은 중앙서버로 원격 푸시하는 방식입니다. 인터넷에 연결되어야만 프로젝트의 변경 이력들을 저장할 수 있습니다. GIT의 경우에는 인터넷에 연결될 필요없이 로컬에서 캡쳐 및 빌드할 수 있으며, 필요할 때 원격에 푸시할 수 있습니다. 
* 변경된 내용을 파일 단위로 저장하는 SVN과 달리 Git은 스냅샷 단위로 저장합니다. 따라서 Git은 파일 내에서도 변경 이력이 있을 때마다 매번 저장합니다.

### git의 `clone`/`add`/`commit`/`push`/`pull`/`branch`/`stash` 명령은 무엇이며 어떨 때 이용하나요? 그리고 어떻게 사용하나요?

* `clone`: 이미 존재하는 원격 저장소를 복사하여 완전히 독립적인 이력과 환경을 가질 수 있도록 하는 명령입니다. 특정 디렉토리에 복사하거나 태그 설정을 할 수 있습니다.
> git clone <repo 주소>
> git clone <repo 주소> <특정 directory>
> git clone <tag> <repo 주소>

* `add`: 변경 사항을 작업 영역에서 스테이징 영역으로 추가하는 명령입니다. 다음 커밋에 어떤 변경 내용을 넣을 지 특정합니다. commit을 하기 전까지는 기록에 남지 않습니다.
> git add <file>
> git add <directory>
> git add -p
> git add .

* `commit`: 프로젝트의 현재 변경 사항에 대한 스냅샷을 캡쳐합니다. 일종의 '저장' 기능입니다. 캡쳐한 내용은 로컬에만 반영됩니다. commit된 스냅샷은 안전한 것으로 간주되며 특별한 일이 없는 한 변경되지 않습니다.

> git commit
> git commit -a
> git commit -m "COMMIT MESSAGE"
> git commit --amend

* `push`: 로컬에 커밋된 사항을 원격 레포지토리에 전송하는 명령입니다. 이를 통해 팀 멤버들이 변경된 내용에 접근할 수 있습니다.

> git push
> git push --force
> git push

* `pull`: 원격 레포지토리에서 내용을 가져오고 해당 내용과 일치하도록 로컬 레포지토리를 업데이트 하는 명령입니다. 협업 시 주로 사용합니다. 
* `git pull` 명령은 `git fetch`와 `git merge`의 조합입니다. `git pull`을 실행하면 HEAD가 가리키는 로컬 브랜치에 대해 `git fetch`를 실행해 컨텐츠를 다운로드 합니다. 그런 뒤 `git merge`를 실행하여 merge 커밋을 생성하고 HEAD가 새로운 커밋을 가리키도록 업데이트 됩니다.

> git pull

* `branch`: 브랜치를 작성, 나열, 이름 변경 및 삭제할 수 있는 명령입니다. 새로운 기능을 추가하거나 버그를 수정할 때 변경 사항을 캡슐화할 수 있습니다. branch를 이용하면 불안정한 코드가 주 코드베이스에 병합되기가 더 어려워지고 메인 브랜치에 병합하기 전에 기록을 정리할 수 있습니다.

> git branch (--list) (레포지토리의 모든 브랜치 리스트를 보여줌)
> git branch <branch>
> git branch -d <branch>
> git branch -m <branch> (브랜치 이름 변경)
> git branch -a (리모트 브랜치 리스트를 보여줌)
> git checkout <branch> (브랜치 이동)

* `stash`: 부가적인 저장 기능으로, 아직 커밋할 준비가 되지 않은 변경 이력들을 임시로 저장해 둘 수 있습니다. stash를 사용하려면 해당 내용은 항상 스테이지 상태에 있어야 합니다.

> git stash
> git stash list
> git stash pop
> git stash pop <stash@{<n>}> (불러올 stash 내역 중 특정할 때 사용)
> git stash save "STASH COMMENT" (컨텍스트를 기억해 놓기 위함)
> git stash -p (파일 내에서 일부만 stash할 경우)
> git stash branch <branch> <stash@{<n>}> (특정 stash 내용으로 브랜치를 생성할 경우)
> git stash drop <stash@{<n>}> (특정 stash를 버릴 경우)
> git stash clear (모든 stash를 없앨 경우)

### 학습 참고자료

* [Atlassian Git Tutorial](https://www.atlassian.com/git/tutorials/setting-up-a-repository)

---

## 스터디 노트

### git init

새로운 Git 저장소를 생성합니다. 버전없는 기존 프로젝트를 Git 저장소로 변환하거나 새로운 빈 저장소를 초기화시킵니다.

* Git과 관련한 메타데이터들이 들어있는 `.git` 파일을 생성합니다.
* HEAD 파일도 생성됩니다.

### git add

* `git add -p`: 해당 디렉토리에 있는 파일 중 일부를 다음 커밋을 위해 스테이징 시킨다. (파일 내부에서만 사용)

### git commit

#### 실습해보기

* `git commit --amend`로 커밋 합치기

#### `amend` 사용 시 주의점

* amend된 커밋은 완전히 새로운 커밋이며 이전 커밋은 더이상 현재 브랜치에 존재하지 않는다. 따라서 공용 스냅샷을 제거한 것과 같은 결과가 되므로 협업 시 다른 개발자가 작업한 내용을 없애지 않도록 주의해야 한다.

#### git diff

* `git diff`를 사용하면,

1. 경로 없이 호출할 경우 전체 레포지토리의 모든 변경사항을 보여준다.
2. 마지막 커밋 후 만들어진 커밋되지 않은 변경사항을 확인할 수 있다.
3. 브랜치 간 변경 내용은 점 연산자로 확인할 수 있다.

```sh
// two dot operator
git diff branch1..branch2

// three dot operator
git diff branch1...branch3
```

4. 브랜치 간 특정 파일을 비교하려면 `git diff`의 세번째 인수로 파일 경로를 전달할 수 있다.

`git diff master new_branch ./diff_test.txt`

### git rebase

오래된 커밋이나 여러 개의 커밋을 수정하기 위해 사용하며, 일련의 커밋들을 새로운 베이스 커밋으로 합칠 수 있다. 따라서 프로젝트의 히스토리가 모두 없어진 것처럼 보이기도 한다.

#### 참고 그림

![rebase image * atlassian git tutorial](https://www.atlassian.com/dam/jcr:e4a40899-636b-4988-9774-eaa8a440575b/02.svg)

### git rebase -i(interactive)

모든 커밋을 움직이는 대신 개별 커밋들을 변경할 수 있다.

### git merge와 다른 점

`git merge`는 항상 앞으로 이동하는(forward moving) 변경 기록이다. 반면 `git rebase`는 강력한 히스토리 재작성 기능을 가지고 있다.

### 왜 사용하나?

선형적인 프로젝트 히스토리를 유지하여 나중에 기록을 다시 봐야할 일이 생기거나 버그가 생겼을 때 용이하기 위해서.
`rebase`를 사용하면 브랜치 히스토리를 깨끗하게 유지해서 늘 최신 상태의 마스터 브랜치에서 작업한 것처럼 보이며, merge시 깔끔하게 마스터 브랜치에 적용된다. 

* [더 참고해 볼 내용](https://www.atlassian.com/git/tutorials/merging-vs-rebasing)

### git reflog

`git reset --soft`로 커밋을 되돌리다가 잘못 되돌렸을 경우 `git reflog`를 이용해 변경사항을 확인하고 다시 `git reset`을 이용해 기록된 `HEAD@{<n>}`으로 되돌아 갈 수 있다.

### git branch

`git branch` 명령을 사용하여 브랜치를 생성, 삭제, 이름 변경, 목록 보기 등을 할 수 있다.

```sh
// 레포지토리에 있는 브랜치들을 살펴보기
git branch // git branch --list와 동일하다.

// <branch-name>이라는 이름의 branch 생성하기
// * 주의: 해당 브랜치로 체크아웃 되지는 않음.
git branch <branch-name>

// <branch-name>이라는 이름의 branch 삭제하기
// -d를 사용하면 안전하게 삭제 * merge되지 않은 변경사항들을 삭제하지 않음
// -D는 force delete
git branch -d <branch-name>
git branch -D <branch-name>

// 브랜치명 변경하기
git branch -m <branch-name>

// 리모트 브랜치 모두 보기
git branch -a
```

### git remote

* remote repo와 연결할 수 있는 두가지 방법: HTTP, SSH(Secure Shell) protocol
* HTTP로 연결할 경우에는 커밋을 푸시할 수 없다.
* 읽고 쓸 수 있는 권한에 접근하기 위해서는 SSH를 사용해야 한다.

### *SSH key problem 

* 참고 [SSH Keys for GitHub](https://jdblischak.github.io/2014-09-18-chicago/novice/git/05-sshkeys.html)
* 새로운 브랜치를 따서 작업하던 중, 해당 내용을 푸시하려고 하면 푸시가 되지 않고 `git@github.com: Permission denied (publickey. fatal: Could not read from remote repository. Pleasemake sure you have the correct access rightsand therepository exists.`라는 오류가 떴음
* `~/.ssh/id_rsa.pub` 에서 퍼블릭 키를 생성함.
* 새로운 ssh key를 깃허브 계정 settings에서 생성하고 위에서 만든키를 넣음
  * 이때 내 깃허브에 등록된 메일 주소를 맨 뒤에 추가함

(정확히 어떤 문제였는지 더 파악해야 함. [헷갈렸던 링크](https://help.github.com/articles/error-permission-denied-publickey/))

### 3 trees

> The Commit Tree (HEAD), The Staging Index, and The Working Directory.
* Working Directory: 작업공간
* The Staging Index: 작업한 변경사항이 추가되는 영역
* The Commit Tree (HEAD)