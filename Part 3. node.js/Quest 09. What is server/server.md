## Checklist

### 인터넷은 어떻게 동작하나요? OSI 7 Layer에 입각하여 설명해 보세요.

* 7계층(Application) - 사용자 인터페이스 역할을 담당하며 네트워크 간의 연결, 데이터 생성을 맡아 합니다. 사용자 입장에서 네트워크를 이용할 수 있게 해주는 역할을 담당합니다. 일반적인 응용 소프트웨어들이 사용하는 계층으로 HTTP, FTP, TELNET, SSH 등의 표준 애필리케이션 프로토콜과 함께 직접 개발한 프로토콜들이 위치합니다.

* 6계층(Presentation) - 네트워크로 보내지는 데이터 형식을 규정합니다. 데이터의 형식상의 차이를 사용자 대신 처리해 데이터를 보내는 쪽과 받는 쪽이 정확한 데이터 형식을 사용할 수 있도록 해주는 역할도 합니다. MIME 인코딩이나 암호화 등에 관한 동작이 이루어집니다.

* 5계층(Session) - 세션 계층은 응용프로세스 간 통신을 위한 인증 및 방법을 제공합니다. TCP/IP 세션을 만들고 없애는 책임을 지고 통신 중에 연결이 끊어지지 않도록 연결 상태를 유지시켜 줍니다.

* 4계층(Transport) - 사용자가 보낸 데이터가 목적지에 정확하게 도착하도록 관리합니다(발신지 대 목적지(end to end) 간 제어와 에러 관리). 패킷 생성, 패킷 오류 관리를 담당합니다. 전송단위는 Segment, 주소는 Port를 사용합니다. 대표적인 프로토콜은 TCP입니다.

* 3계층(Network) - 노드를 연결해 네트워크를 구성하기 위한 프로토콜이 정의되어 있는 계층입니다. 스위칭, 라우팅 등 데이터 경로설정을 맡아합니다. 대표적인 프로토콜이 IP(노드 식별)입니다. 
  * IP - 인터넷 주소 형식은 `nnn.nnn.nnn.nnn`으로 nnn은 0-255 사이의 숫자입니다. 이 주소를 IP(Internet Protocol) 주소라고 합니다. 인터넷에 연결되어 있는 컴퓨터는 모두 고유한 IP 주소를 가집니다.

* 2계층(Data Link) - 물리적인 전송 링크를 통해 자료를 안전하게 전송하는 계층입니다. 데이터 링크 계층에서는 비트 단위의 논리 자료로 단위를 나누고 이 단위를 프레임이라고 부릅니다. 이 계층을 담당하는 장비는 스위치, 브릿지 등이고 프로토콜에는 ARP, RARP, ICMP 등이 있습니다.

  * MAC(Media Access Control): 네트워크 카드의 물리적인 주소로 데이터가 목적지 컴퓨터로 전달되기 위해 필요합니다. 네트워크 계층의 IP 주소가 논리 주소라면 MAC은 물리 주소.
  * 이더넷, 토큰링

* 1계층(Physical) - 물리 계층으로 네트워크 카드들이 사용하는 케이블 종류, 데이터 송수신 속도, 신호의 전기 전압 등의 물리적인 표준을 정의합니다. 이 계층을 담당하는 장비는 케이블, 허브, 리피터 등입니다.

### 우리가 브라우저의 주소 창에 www.knowre.com 을 쳤을 때, 어떤 과정을 통해 노리의 서버 주소를 알게 되나요?

1. 브라우저가 'www.knowre.com'의 IP 주소를 찾기 위해 DNS 쿼리(GET)를 보냅니다. 
2. 브라우저의 C++ 코드가 HTTP 요청 메시지 포맷을 만들기 위해 바이트의 배열을 만듭니다.
3. 브라우저가 OS에게 www.knowre.com을 찾아달라는 요청을 보냅니다.
4. OS가 www.knowre.com의 IP 주소를 찾아달라는 DNS 쿼리를 보냅니다.
    * 도메인 이름 확인을 요청하는 컴퓨터는 요청에서 이름을 확인할 수 있는 DNS 서버가 발견될 때까지 계층 구조의 위로 리다이렉팅 합니다.
5. DNS 서버가 입력한 도메인 이름의 IP 주소를 얻으면 응답으로 보냅니다. 
    * 네임서버(Name server: DNS를 제공하는 서버)는 바로 이 도메인 이름과 IP의 상호변환을 가능하게 해주는 서버입니다.
    * 이 서버가 제공하는 DNS(도메인 이름 시스템)이 호스트의 도메인 이름을 호스트의 네트워크 주소로 바꾸거나 그 반대의 변환을 수행합니다.
    * 도메인 이름은 2개의 네임서버를 갖게 되는데, 이는 두개의 네임 서버가 서로 병렬적으로 동작하면서 네임서비스를 보다 안정적으로 연결되도록 합니다. 네임서버는 도메인과 IP를 연결시켜 줍니다. 도메인을 등록해도 네임서버에 해당 도메인이 어떤 IP로 연결되었는지에 대한 정보가 없다면 그 도메인으로 접속되지 않습니다.
6. OS가 해당 IP 주소에 있는 TCP 연결을 오픈합니다.

(7. TCP 연결이 설정되고 나면 OS는 TCP 연결을 통해 HTTP 메시지를 해당 서버 주소로 보냅니다. 8. 웹 브라우저는 웹 서버에 연결하고 원하는 웹 페이지에 대한 프로토콜 스택을 통해 HTTP 요청을 보냅니다. 9. 서버 소프트웨어는 HTTP 요청을 구문분석한 다음 응답으로 보낼 메시지를 결정합니다. 이 메시지를 HTTP로 형식화 한 다음 OS가 TCP를 통해 이 응답메시지를 보낸 사람에게 다시 보내도록 요청합니다.)

    * DNS: 도메인 이름 시스템 - 도메인 이름을 컴퓨터의 IP로 번역하는 역할로 계층 구조로 구성되어 있음.
    * IP 주소: 모든 컴퓨터가 인터넷에 연결될 수 있도록 하기 위해 유니크한 숫자로 되어있는 식별자
    * TCP(Transmission Control Protocol): 유선을 통해 정보를 보내기 위한 데이터 형식을 정의합니다.(HTTP, FTP 등에 사용됨) 응용 프로그램 프로토콜을 대상 컴퓨터의 올바른 응용 프로그램으로 라우팅합니다. 이를 위해 포트번호가 사용됩니다. 포트는 각 컴퓨터에서 별도의 체널로 생각할 수 있습니다(프로세스?).

## Quest

* tracert(Windows가 아닌 경우 traceroute) 명령을 통해 www.google.com 까지 가는 경로를 찾아 보세요.

```sh
hanjuyeon-ui-MacBook-Pro:~ juyeonhan$ traceroute www.google.com
traceroute: Warning: www.google.com has multiple addresses; using 108.177.125.104
traceroute to www.google.com (108.177.125.104), 64 hops max, 52 byte packets
 1  192.168.100.1 (192.168.100.1)  2.232 ms  1.654 ms  1.036 ms
 2  210.206.68.65 (210.206.68.65)  4.799 ms  4.335 ms  3.643 ms // 내 IP
 3  10.19.14.61 (10.19.14.61)  4.997 ms  3.228 ms  4.569 ms // Internet Assigned Numbers Authority (IANA) - 최상위 도메인 관리기관
 4  1.208.11.13 (1.208.11.13)  3.643 ms // APNIC (아시아 태평양 네트워크 정보 센터)
    1.213.11.21 (1.213.11.21)  3.644 ms
    1.208.11.13 (1.208.11.13)  1.913 ms
 5  1.213.8.57 (1.213.8.57)  2.157 ms
    1.208.8.57 (1.208.8.57)  6.426 ms
    1.208.8.157 (1.208.8.157)  2.852 ms
 6  1.213.147.5 (1.213.147.5)  5.434 ms
    1.208.145.13 (1.208.145.13)  6.006 ms  7.099 ms
 7  1.208.107.122 (1.208.107.122)  4.375 ms  2.601 ms
    1.208.145.18 (1.208.145.18)  4.137 ms
 8  203.233.60.189 (203.233.60.189)  6.173 ms
    210.120.117.113 (210.120.117.113)  91.120 ms
    210.120.102.253 (210.120.102.253)  5.204 ms
 9  1.208.104.222 (1.208.104.222)  89.575 ms
    1.208.145.38 (1.208.145.38)  47.401 ms
    1.208.107.78 (1.208.107.78)  49.336 ms
10  1.208.148.206 (1.208.148.206)  40.471 ms
    1.208.106.106 (1.208.106.106)  40.785 ms
    1.208.148.206 (1.208.148.206)  41.650 ms
11  72.14.215.29 (72.14.215.29)  40.873 ms  39.026 ms  47.442 ms // Google LLC (1600 Amphitheatre Parkway, Mountain View, CA)
12  108.170.241.112 (108.170.241.112)  39.550 ms
    108.170.241.45 (108.170.241.45)  40.860 ms
    108.170.241.108 (108.170.241.108)  51.294 ms
13  72.14.233.107 (72.14.233.107)  41.508 ms
    72.14.234.245 (72.14.234.245)  48.701 ms
    209.85.250.133 (209.85.250.133)  47.118 ms
14  209.85.142.172 (209.85.142.172)  60.061 ms
    216.239.41.7 (216.239.41.7)  54.128 ms  80.505 ms
15  108.170.234.123 (108.170.234.123)  56.791 ms
    72.14.233.19 (72.14.233.19)  55.692 ms
    72.14.233.81 (72.14.233.81)  54.506 ms
16  * * *
17  * * *
18  * * *
19  * * *
20  * * *
21  * * *
22  * * *
23  * * *
24  * * *
25  108.177.125.104 (108.177.125.104)  64.002 ms  66.221 ms  59.004 ms
```

  * 어떤 IP주소들이 있나요?
    * ISP(인터넷 회선 제공 사업체), Google, 방화벽 등
  * 그 IP주소들은 어디에 위치해 있나요?
  * traceroute 
        - "Print the route packets take to network host", 즉 해당 호스트 혹은 단말까지의 패킷 이동 경로를 보여준다는 것. 시스템 A에서 시스템 B까지 패킷 이동 과정에서 발생하는 소요시간과 경로, 손실내용 등을 확인할 수 있다.
        - 최대 경로수(Hop 수)는 30개로 한정되어 있음.??? 내 터미널에서는 64개 라고 나오는데..
  * output : `<ttl> ( <hostname> ( <IP address> ) <round trip time>* )*`
    * TTL: 패킷 전송 중에 라우팅 프로토콜의 이상으로 경로상에 무한 루프가 발생하는 현상을 방지하기 위한 필드. IP 패킷 전송 시 64로 설정.
    * 최종 목적지에 도달할 때까지 TTL 필드 값을 1씩 증가시켜 가면서 echo request(인터넷 상의 어떤 호스트가 제대로 동작하고 있는지 확인하는 메시지) 패킷을 전송. 각 라우터에서 시간초과 될 때 echo response 메시지(라우터 이름, IP 주소 포함)를 반송함(이때 ping이 사용됨.)

* Wireshark를 통해 www.google.com 으로 요청을 날렸을 떄 어떤 TCP 패킷이 오가는지 확인해 보세요
    * TCP 패킷을 주고받는 과정은 어떻게 되나요?
    * 각각의 패킷에 어떤 정보들이 담겨 있나요?
* telnet 명령을 통해 www.google.com URL에 HTTP 요청을 날려 보세요.

    ```
    brew install telnet
    telnet http://www.google.com/ 80
    GET /calendar HTTP/1.0
    HOST: www.google.com
    ```
    * 어떤 헤더들이 있나요?
    ```
    HTTP/1.0 301 Moved Permanently
    Location: https://calendar.google.com/calendar
    Content-Type: text/html; charset=UTF-8
    Date: Wed, 08 Aug 2018 08:37:26 GMT
    Expires: Wed, 08 Aug 2018 08:37:26 GMT
    Cache-Control: private, max-age=0
    X-Content-Type-Options: nosniff
    X-Frame-Options: SAMEORIGIN
    X-XSS-Protection: 1; mode=block
    Server: GSE
    Accept-Ranges: none
    Vary: Accept-Encoding
    ```

    * 그 헤더들은 어떤 역할을 하나요?

      * 시작줄: Status line. HTTP 버전, 상태코드, 응답구문으로 이루어져 있으며 실행해야 할 요청 혹은 요청에 대한 성공 혹은 실패를 나타냄
      * Location: 서버의 응답이 컨텐츠가 다른 곳으로 옮겨졌다는 의미인 301이므로 Location 헤더를 통해 해당 URL을 지정해 줌(301, 302 일때만 볼 수 있는 헤더)
      * Content-type: 서버가 보내는 컨텐츠의 형식을 표현. 브라우저가 이 형식에 따라 적절하게 처리할 수 있다. charset은 컨텐츠의 인코딩을 지정한다. 인코딩이 제대로 되어있지 않으면 문자가 깨질 수 있다.
      * Date: 현재 날짜와 시간을 표시한다.
      * Expires: Expires 헤더는 응답이 더 이상 신선하지 않다고 판단할 날짜/시간을 포함한다. 0과 같은, 유효하지 않은 날짜는 과거의 시간을 나타내어 리소스가 이미 만료되었음을 의미한다. 응답 내에 "max-age" 혹은 "s-max-age" 디렉티브를 지닌 Cache-Control 헤더가 존재할 경우, Expires 헤더는 무시됩니다.
      * Cache-Control: 브라우저가 이 페이지를 캐쉬로 처리할 때 참고하라는 의미이며 no-cache로 지정할 경우 캐시하지 말라는 의미다. no-cache는 관리자 페이지, 로그인 페이지와 같이 중요한 페이지일 경우 설정한다.
      * X-Content-Type-Options: Content-Type 헤더에 명시된 MIME 유형이 변경되어서는 안됨을 나타냄
      * X-Frame-Options: 브라우저가 <frame>, <iframe> 또는 <object>에서 페이지를 렌더링 할 수 있어야하는지 여부를 나타낸다. 콘텐츠가 다른 사이트에 퍼지지 않도록 함으로써 클릭 공격을 피할 수 있다. `SAMEORIGIN`가 있는 페이지의 경우 페이지 자체와 동일한 출처의 프레임에만 표시 될 수 있다.
      * X-XSS-Protection: XXS 공격을 감지 할 때 페이지 로드를 중지시킬 수 있다. 해당 값(`1; mode=block`은 XSS 필터링을 사용하며 공격이 탐지되면 안전하지 않는 영역을 제거하는게 아니라, 페이지 렌더링을 중단한다는 의미다.)
      * Server: 요청을 처리하기 위한 원(origin) 서버의 소프트웨어 정보를 포함하고 있습니다. (GSE: 구글 서블릿 엔진)
      * Accept-Ranges: 부분 요청의 지원을 알리기 위해 서버에 의해 사용되는 표식이다. 이 필드의 값은 범위를 정의하기 위해 사용될 수 있는 단위를 가리킨다. (`none`: 지원되는 범위의 단위가 없음을 나타내는데, 이는 헤더가 존재하지 않는 경우와 동일하므로 거의 사용되지 않음. IE9같은 브라우저의 경우 다운로드 매니저의 일시중지 버튼을 비활설화(disable) 혹은 제거(remove)할 때 쓰임)
      * Vary: 향후 요청 헤더를 일치시켜 원 서버에서 새 요청을 요청하는 대신 캐시 된 응답을 사용할 수 있는지 여부를 결정한다. Vary 헤더는 동일한 200 OK 응답에 설정된 것과 똑같이 304 Not Modified 응답에도 설정해야 한다.

----

## 스터디 노트

1. OSI(개방시스템상호연결) 모델

* 네트워크 통신을 체계적으로 다루는 ISO 표준(1984)
* 개방시스템이란 기반구조와 관계없이 시스템간의 통신을 제공하는 프로토콜의 집합
* OSI 모델이 제공됨으로써, 다양한 프로세스들이 네트워크상의 다른 시스템 응용프로그램과 정보처리 작업을 해당 시스템의 사양이나 환경에 영향을 받지 않고 수행하게 된다. 즉 프로세스 상호 간 데이터 통신, 데이터 저장, 자원 관릴, 아전 보호 및 응용 프로그램의 지원 등 협업을 용이하게 하기 위해 규정된 것으로 계층구조를 가짐으로써 데이터 자체의 흐름을 각 구간별로 알 수 있고 서로 다른 벤더사와의 호환에도 용이하다.
* OSI 모델보다 TCP/IP 모델이 먼저 개발되었다. 둘 간의 계층은 정확하게 서로 일치하지 않는다. TCP/IP 프로토콜에는 세션과 표현 계층이 없다.

2. TCP/IP 프로토콜

- 패킷은 네트워크를 통해 전송되는 기본 정보 단위입니다. 기본 패킷은 송신 및 수신 시스템의 주소가 있는 헤더, 본문 또는 전송될 데이터가 있는 페이로드로 구성됩니다. 패킷이 TCP/IP 프로토콜 스택을 통해 이동함에 따라 각 계층의 프로토콜은 기본 헤더에서 필드를 추가하거나 제거합니다. 송신 시스템의 프로토콜이 패킷 헤더에 데이터를 추가하면 이 프로세스를 데이터 캡슐화라고 합니다.

- TCP는 양방향 프로토콜이므로 송신자(Sender)와 수신자(Receiver) 간의 세션이 수립되어야 하는 과정이 필요하다. 그 과정을 TCP 3 Way Handshake라고 부른다.

## 참고
* [OSI](https://web.stanford.edu/class/msande91si/www-spr04/readings/week1/InternetWhitepaper.htm)
* [TCP](https://docs.oracle.com/cd/E38901_01/html/E38894/ipov-29.html)
