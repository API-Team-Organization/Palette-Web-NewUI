# **AI 기반 홍보물 생성 서비스**  
### 개발 기간: 2024.03.14 - 2024.10.23

## 👥 팀원 소개

| 역할 | 이름 | GitHub |
|------|------|--------|
| **Web** | 주강현 | [@gk7734](https://github.com/gk7734) |
| **Server** | 박주영 | [@jombidev](https://github.com/jombidev) |
| **Server** | 권지용 | [@gwon11225](https://github.com/gwon11225) |
| **Android** | 이성은 | [@qpeterp](https://github.com/qpeterp) |
| **Android** | 서승훈 | [@서승현-github](https://github.com/seo1016) |
| **iOS** | 박준현 | [@4rNe5](https://github.com/4rNe5) |

## 📖 프로젝트 소개

교내 대회, 기업 이벤트, 지역행사 등에서 홍보물 제작은 필수적이지만, 외주 제작은 비용이 높고 직접 제작은 시간과 노력이 많이 듭니다. <br> 
또한 상용 디자인 툴의 가격 부담도 큽니다. 이러한 문제를 해결하기 위해 AI 기술(Claude 3, Flux.1, ComfyUI)을 활용한 <br>
자동화 디자인 플랫폼 **Palette**를 개발했습니다. 누구나 손쉽게 고품질의 홍보물을 제작할 수 있는 서비스를 제공합니다.

## 🚀 시작 가이드

### 요구사항
- Node.js 18.0.0 이상
- npm 또는 pnpm

### 설치 및 실행
- Repository 클론: ```git clone https://github.com/API-Team-Organization/Palette-Web-NewUI.git cd Palette-Web-NewUI```
- 의존성 설치: ```npm install``` | ```pnpm install```
- 개발 서버 실행: ```npm run dev``` | ```pnpm dev```

## 🛠 기술 스택

### Environment
![WebStorm](https://img.shields.io/badge/WebStorm-000000?style=for-the-badge&logo=WebStorm&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

### Development
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)

### State Management & HTTP Client
![Zustand](https://img.shields.io/badge/zustand-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Axios](https://img.shields.io/badge/axios-671ddf?style=for-the-badge&logo=axios&logoColor=white)

### Deployment
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

## ✨ 주요 기능

- **AI 홍보물 생성**: 사용자 입력을 바탕으로 AI가 자동으로 홍보물 디자인 생성
- **홍보물 모아보기**: 생성된 홍보물들을 한눈에 확인할 수 있는 갤러리 기능
- **다양한 해상도 지원**: 용도에 맞는 다양한 크기의 홍보물 생성 지원
- **실시간 소통**: Socket.io를 통한 실시간 생성 과정 확인
- **반응형 디자인**: 모든 디바이스에서 최적화된 사용자 경험 제공

## 🏆 수상 내역

- **FIX 2024 ITCE 프로젝트 발표회** - API 대상 (2024.10.26)
- **대한민국 소프트웨어대전 2024** 출품 (2024.12.04 - 2024.12.06)
