document.addEventListener('DOMContentLoaded', () => {
    // 1. DOM 요소 변수 선언
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');

    // 갤러리 및 모드 관련 요소
    const toggleButton = document.getElementById('mode-toggle');
    const body = document.body;
    const errroContent = document.getElementById('errro-content');
    const arrrchiveContent = document.getElementById('arrrchive-content');
    const errroIcon = document.getElementById('errro-icon'); // 토글 아이콘
    const archiveIcon = document.getElementById('archive-icon'); // 토글 아이콘
    const archiverR = document.querySelector('.archiver-r-section'); // ARRRCHIVER R 섹션

    // 로고 및 글리치, 팝업 관련 요소
    const dynamicLogo = document.getElementById('dynamic-logo');
    const allGlitchTextElements = document.querySelectorAll('.glitch-text'); // 부제목
    const popup = document.getElementById('retro-popup');

    // --- 1. 페이지 전환 로직 (SPA 스타일) ---
    function setActivePage(targetPageId) {
        pages.forEach(page => {
            if (page.id === targetPageId) {
                // 활성화될 페이지
                page.classList.add('active');
                page.classList.remove('inactive');
                page.style.position = 'relative';
            } else {
                // 비활성화될 페이지
                page.classList.add('inactive');
                page.classList.remove('active');
                page.style.position = 'absolute';
            }
        });

        // 내비게이션 링크 활성 상태 업데이트
        navLinks.forEach(link => {
            if (link.getAttribute('data-page') === targetPageId) {
                link.classList.add('active-nav');
            } else {
                link.classList.remove('active-nav');
            }
        });
    }

    // 내비게이션 링크 클릭 이벤트 설정
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPageId = link.getAttribute('data-page');
            setActivePage(targetPageId);
            window.scrollTo(0, 0);
            window.history.pushState(null, '', `#${targetPageId}`);
        });
    });

    // 초기 페이지 설정: #home 페이지로 시작
    const initialPage = 'home';
    setActivePage(initialPage);


    // --- 2. 갤러리 모드 토글 및 로고 이미지 전환 로직 ---

    // 로고 이미지 경로 전환 함수
    function updateLogoImage(isErrroMode) {
        if (dynamicLogo) {
            if (isErrroMode) {
                dynamicLogo.src = 'errrolab_logo_errro.png';
            } else {
                dynamicLogo.src = 'errrolab_logo_archive.png';
            }
        }
    }

    // 갤러리 아이콘 시각적 상태 업데이트 함수 (토글 아이콘 전환)
    function updateIcons(isErrroMode) {
        if (errroIcon && archiveIcon) {
            if (isErrroMode) {
                errroIcon.classList.add('active-icon');
                errroIcon.classList.remove('inactive-icon');
                archiveIcon.classList.remove('active-icon');
                archiveIcon.classList.add('inactive-icon');
            } else {
                errroIcon.classList.remove('active-icon');
                errroIcon.classList.add('inactive-icon');
                archiveIcon.classList.add('active-icon');
                archiveIcon.classList.remove('inactive-icon');
            }
        }
    }

    // ARRRCHIVER R 소개 섹션 전환 함수 (5번 요청 반영)
    function updateArchiverVisibility(isErrroMode) {
        if (archiverR) {
            if (isErrroMode) {
                // ERRRO 모드: R 소개 숨김
                archiverR.classList.add('archiver-hidden');
                archiverR.classList.remove('archiver-visible');
            } else {
                // ARRRCHIVE 모드: R 소개 보임
                archiverR.classList.add('archiver-visible');
                archiverR.classList.remove('archiver-hidden');
            }
        }
    }

    // 초기 로고 및 아이콘 설정
    updateLogoImage(true);
    updateIcons(true);
    updateArchiverVisibility(false); // 초기에는 R 소개 숨김

    // 토글 버튼 클릭 이벤트 설정
    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            const isErrroMode = body.classList.toggle('errro-mode');
            body.classList.toggle('arrrchive-mode', !isErrroMode);

            updateLogoImage(isErrroMode);
            updateIcons(isErrroMode);
            updateArchiverVisibility(isErrroMode); // R 소개 전환

            // 갤러리 콘텐츠 전환 (ERRRO 이미지 <-> ARRRCHIVE 이미지)
            if (errroContent && arrrchiveContent) {
                if (isErrroMode) {
                    errroContent.classList.add('active');
                    errroContent.classList.remove('inactive');
                    arrrchiveContent.classList.add('inactive');
                    arrrchiveContent.classList.remove('active');
                } else {
                    errroContent.classList.add('inactive');
                    errroContent.classList.remove('active');
                    arrrchiveContent.classList.add('active');
                    arrrchiveContent.classList.remove('inactive');
                }
            }
        });
    }


    // --- 3. 글리치 및 팝업 효과 로직 ---

    function hidePopup() {
        if (popup) {
            popup.style.opacity = '0';
            setTimeout(() => {
                popup.classList.add('popup-inactive');
                popup.style.display = 'none';
            }, 300);
        }
    }

    // 간헐적 글리치 효과 적용 함수 (확률 40% 적용)
    function initiateGlitch() {
        if (allGlitchTextElements.length === 0 && !dynamicLogo) return;

        // 40% 확률로 글리치 실행
        if (Math.random() < 0.4) {
            // 텍스트 글리치 적용 (부제목)
            allGlitchTextElements.forEach(el => {
                el.classList.add('glitch-active');
            });

            // 이미지 글리치 적용 (로고)
            if (dynamicLogo) {
                dynamicLogo.classList.add('glitch-image-active');
            }

            // 0.5초 후 글리치 종료
            setTimeout(() => {
                allGlitchTextElements.forEach(el => {
                    el.classList.remove('glitch-active');
                });
                if (dynamicLogo) {
                    dynamicLogo.classList.remove('glitch-image-active');
                }
            }, 500);
        }
    }

    // 팝업 표시 함수 (랜덤 위치)
    function showPopup() {
        if (popup && popup.classList.contains('popup-inactive')) {
            popup.style.display = 'block';

            // 팝업 위치를 랜덤하게 조정
            const randomX = Math.floor(Math.random() * 200) - 100;
            const randomY = Math.floor(Math.random() * 50) - 25;
            popup.style.transform = `translate(calc(-50% + ${randomX}px), ${randomY}px)`;

            popup.classList.remove('popup-inactive');
            popup.style.opacity = '1';

            // 팝업 전체를 클릭했을 때 닫히도록 이벤트 리스너 추가 
            popup.addEventListener('click', hidePopup, { once: true });

            // 10초 후 팝업 자동 숨김
            setTimeout(hidePopup, 10000);
        }
    }

    // 로고 호버 글리치: 마우스 오버 시 이미지 글리치 적용
    const logoLink = document.getElementById('home-link');
    if (logoLink) {
        logoLink.addEventListener('mouseenter', () => {
            if (dynamicLogo) dynamicLogo.classList.add('glitch-image-active');
        });
        logoLink.addEventListener('mouseleave', () => {
            if (dynamicLogo) dynamicLogo.classList.remove('glitch-image-active');
        });
    }

    // 타이머 설정
    if (popup) {
        // 로고/부제목 간헐적 글리치 효과 1초마다 체크
        setInterval(initiateGlitch, 1000);

        // 팝업 30초마다 33% 확률로 등장 체크
        setInterval(() => {
            if (Math.random() < 0.33) {
                showPopup();
            }
        }, 30000);
    }
});