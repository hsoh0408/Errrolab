document.addEventListener('DOMContentLoaded', () => {
    // 1. DOM 요소 변수 선언
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');

    // 갤러리 및 모드 관련 요소
    const toggleButton = document.getElementById('mode-toggle');
    const body = document.body;
    const errroContent = document.getElementById('errro-content');
    const arrrchiveContent = document.getElementById('arrrchive-content');
    const errroIcon = document.getElementById('errro-icon');
    const archiveIcon = document.getElementById('archive-icon');
    const archiverR = document.querySelector('.archiver-r-section');

    // 로고 및 글리치, 팝업 관련 요소
    const dynamicLogo = document.getElementById('dynamic-logo');
    const allGlitchTextElements = document.querySelectorAll('.glitch-text');
    const popup = document.getElementById('retro-popup');

    // 로고 링크 요소 (새로 가져옴)
    const logoLinkElement = document.getElementById('home-link');

    // --- 1. 페이지 전환 로직 (SPA 스타일) ---
    function setActivePage(targetPageId) {
        pages.forEach(page => {
            if (page.id === targetPageId) {
                page.classList.add('active');
                page.classList.remove('inactive');
                page.style.position = 'relative';
            } else {
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

    // --- 로고 클릭 이벤트 리스너 추가 (수정/추가됨) ---
    if (logoLinkElement) {
        logoLinkElement.addEventListener('click', (e) => {
            e.preventDefault();
            setActivePage('home');
            window.scrollTo(0, 0);
            window.history.pushState(null, '', '#home');
        });
    }

    // 초기 페이지 설정: #home 페이지로 시작
    const initialPage = 'home';
    setActivePage(initialPage);


    // --- 2. 갤러리 모드 토글 및 로고 이미지 전환 로직 ---
    function updateToggleText(isErrroMode) {
        if (!toggleButton) return;
        const errroText = toggleButton.querySelector('.mode-text:first-child');
        const arrrchiveText = toggleButton.querySelector('.mode-text:last-child');

        if (isErrroMode) {
            errroText.classList.add('current-mode');
            arrrchiveText.classList.remove('current-mode');
        } else {
            errroText.classList.remove('current-mode');
            arrrchiveText.classList.add('current-mode');
        }
    }

    function updateLogoImage(isErrroMode) {
        if (dynamicLogo) {
            if (isErrroMode) {
                dynamicLogo.src = 'errrolab_logo_errro.png';
            } else {
                dynamicLogo.src = 'errrolab_logo_archive.png';
            }
        }
    }

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

    function updateArchiverVisibility(isErrroMode) {
        if (archiverR) {
            if (isErrroMode) {
                archiverR.classList.add('archiver-hidden');
                archiverR.classList.remove('archiver-visible');
            } else {
                archiverR.classList.add('archiver-visible');
                archiverR.classList.remove('archiver-hidden');
            }
        }
    }

    updateLogoImage(true);
    updateIcons(true);
    updateArchiverVisibility(false);

    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            const isErrroMode = body.classList.toggle('errro-mode');
            body.classList.toggle('arrrchive-mode', !isErrroMode);

            updateLogoImage(isErrroMode);
            updateIcons(isErrroMode);
            updateArchiverVisibility(isErrroMode);

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

    // 간헐적 글리치 효과 적용 함수 (확률 40%)
    function initiateGlitch() {
        const allGlitchElements = document.querySelectorAll('.glitch-text'); // 부제목

        if (allGlitchElements.length === 0 && !dynamicLogo) return;

        // 40% 확률로 글리치 실행
        if (Math.random() < 0.4) {
            // 텍스트 글리치 적용 (부제목)
            allGlitchElements.forEach(el => {
                el.classList.add('glitch-active');
            });

            // 이미지 글리치 적용 (로고)
            if (dynamicLogo) {
                dynamicLogo.classList.add('glitch-image-active');
            }

            // 0.5초 후 글리치 종료
            setTimeout(() => {
                allGlitchElements.forEach(el => {
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

            const randomX = Math.floor(Math.random() * 200) - 100;
            const randomY = Math.floor(Math.random() * 50) - 25;
            popup.style.transform = `translate(calc(-50% + ${randomX}px), ${randomY}px)`;

            popup.classList.remove('popup-inactive');
            popup.style.opacity = '1';

            popup.addEventListener('click', hidePopup, { once: true });

            setTimeout(hidePopup, 10000);
        }
    }

    // 타이머 설정
    if (popup) {
        setInterval(initiateGlitch, 1000);

        setInterval(() => {
            if (Math.random() < 0.33) {
                showPopup();
            }
        }, 30000);
    }
});