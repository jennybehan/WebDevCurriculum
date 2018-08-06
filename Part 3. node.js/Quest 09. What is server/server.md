## Checklist
* 인터넷은 어떻게 동작하나요? OSI 7 Layer에 입각하여 설명해 보세요.

물리 계층과 데이터 링크 계층의 이더넷, 토큰링 같은 하드웨어로 기기 연결.


////

4계층까지는 바이트 데이터를 전송하며 데이터의 의미를 따지지 않는다. 5계층 이상부터 데이터의 의미를 따지므로 각 OS마다 화면 표시와 문서 편집을 위해 나름의 문자 코드를 사용한다.

엡 프로토콜인 HTTP을 통해 서버와 브라우저가 대화를 주고받으며 이 내용은 모두 문자로 되어있다. (따라서 문자 코드가 중요하다.) 5계층부터는 통신 내용에 해당하는 것으로 프로그래머가 만드는 내용이다.

* 우리가 브라우저의 주소 창에 www.knowre.com 을 쳤을 때, 어떤 과정을 통해 노리의 서버 주소를 알게 되나요?

1. OS가 'www.knowre.com'의 IP 주소를 찾기 위해 DNS 쿼리를 보냅니다.
    * DNS: 도메인 이름 시스템 - 도메인 이름을 컴퓨터의 IP로 번역하는 역할
    * IP 주소: 모든 컴퓨터가 인터넷에 연결될 수 있도록 하기 위해 유니크한 숫자로 되어있는 식별자
2. DNS 서버가 IP 주소를 응답으로 보냅니다. 
    * 어떠케??
3. OS가 해당 IP 주소에 있는 TCP 연결을 오픈합니다.
4. TCP 연결이 설정되고 나면 OS는 TCP 연결을 통해 HTTP 메시지를 해당 IP로 보냅니다.
    * TCP(Transmission Control Protocol): 유선을 통해 정보를 보내기 위한 데이터 형식을 정의합니다.(HTTP, FTP 등에 사용됨)

----

## 스터디 노트

1. OSI(개방시스템상호연결) 모델

- 네트워크 통신을 체계적으로 다루는 ISO 표준(1984)
- 개방시스템이란 기반구조와 관계없이 시스템간의 통신을 제공하는 프로토콜의 집합
- OSI 모델이 제공됨으로써, 다양한 프로세스들이 네트워크상의 다른 시스템 응용프로그램과 정보처리 작업을 해당 시스템의 사양이나 환경에 영향을 받지 않고 수행하게 된다. 즉 프로세스 상호 간 데이터 통신, 데이터 저장, 자원 관릴, 아전 보호 및 응용 프로그램의 지원 등 협업을 용이하게 하기 위해 규정된 것으로 계층구조를 가짐으로써 데이터 자체의 흐름을 각 구간별로 알 수 있고 서로 다른 벤더사와의 호환에도 용이하다.
- OSI 모델보다 TCP/IP 모델이 먼저 개발되었다. 둘 간의 계층은 정확하게 서로 일치하지 않는다. TCP/IP 프로토콜에는 세션과 표현 계층이 없다.

2. OSI layer 단계

- Layer 1: 물리 계층 - 기본 네트워크 하드웨어 전송 기술. 데이터를 물리 매체상으로 전송하는 역할을 담당하는 계층으로, 전송을 위해 필요한 물리적 링크의 설정, 유지, 해제를 담당한다. 네트워크 어댑터, 리피터, 네트워크 허브, 모뎀 등의 하드웨어 장비가 있다.

- Layer 2: 데이터링크 계층 - 전송단위는 Frame, 물리계층의 전송설비를 신뢰할 수 있는 링크로 변환하여 상위 계층인 네트워크 계층에 오류 없는 물리계층으로 보여지게 한다. 네트워크 계층에서 정보를 받아 주소와 제어정보를 헤더와 테일에 추가한다.

- Layer 3: 네트워크 계층 - 전송단위는 Packet, 주소는 IP를 사용. 상위 계층 데이터를 작은 크기의 패킷으로 분할하여 전송하는 역할을 수행한다.

- Layer 4: 전송(transport) 계층 - 전송단위는 Segment, 주소는 Port 사용, 전송 계층을 기점으로 하위 계층으로 이루어진 사용자 서비스로 구별될 수 있다. 발신지 대 목적지(end to end) 간 제어와 에러를 관리함.

- Layer 5: 세션 계층 - 전송단위는 message, 통신 시스템 간의 상호 대화를 설정, 유지, 동기화 한다. 실제 이용자의 응용프로그램 사이에서 세션이라 불리는 연결을 확립, 유지, 동기화 한다. 표현계층으로부터 받은 데이터를 효율적인 세션 관리를 위해 짧은 데이터 단윌로 나눈 후 전송 계층으로 보낸다. 

- Layer 6: 표현 계층 - 데이터의 표현. 데이터의 암호화, 압축, 문자 코드 담당. OS간 데이터 형식 차이를 다루는 부담을 덜어줌. MIME 인코딩, 암호화... 통신에서 전달된 숫자가 바이트로 표현, 비트 나열의 전기 신호로 전달된다.

- Layer 7: 응용 계층 - 사용자가 네트워크에 접속하는 것을 가능하게 한다. 사용자 인터페이스 제공.