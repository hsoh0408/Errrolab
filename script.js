document.addEventListener('DOMContentLoaded', () => {
    // 1. DOM 요소 변수 선언
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const toggleButton = document.getElementById('mode-toggle');
    const body = document.body;
    const errroContent = document.getElementById('errro-content');
    const arrrchiveContent = document.getElementById('arrrchive-content');
    const glitchElement = document.getElementById('logo');
    const popup = document.getElementById('retro-popup');

    // --- 1. 페이지 전환 로직 (SPA 스타일) ---
    function setActivePage(targetPageId) {
        pages.forEach(page => {
            if (page.id === targetPageId) {
                // 활성화될 페이지 설정: 높이를 잡게 하고 보이게 함
                page.classList.add('active');
                page.classList.remove('inactive');
                page.style.position = 'relative';
            } else {
                // 비활성화될 페이지 설정: 숨기고 겹치게 함
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

    // 초기 페이지 설정: About 페이지로 시작
    const initialPage = 'about';
    setActivePage(initialPage);


    // --- 2. 갤러리 모드 토글 로직 ---
    function updateToggleText(isErrroMode) {
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

    // 토글 버튼 클릭 이벤트 설정
    const isErrro = body.classList.contains('errro-mode');
    if (toggleButton) {
        updateToggleText(isErrro);

        toggleButton.addEventListener('click', () => {
            const isErrroMode = body.classList.toggle('errro-mode');
            body.classList.toggle('arrrchive-mode', !isErrroMode);

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
            updateToggleText(isErrroMode);
        });
    }


    // --- 3. 글리치 및 팝업 효과 로직 ---

    // 팝업 숨김 함수 (팝업 전체 클릭 시 실행)
    function hidePopup() {
        if (popup) {
            popup.style.opacity = '0';
            setTimeout(() => {
                popup.classList.add('popup-inactive');
                popup.style.display = 'none';
            }, 300);
        }
    }

    // 간헐적 글리치 효과 적용 함수
    function initiateGlitch() {
        if (!glitchElement) return;
        if (Math.random() < 0.05) { // 5% 확률로 글리치 실행
            glitchElement.classList.add('glitch-active');
            setTimeout(() => {
                glitchElement.classList.remove('glitch-active');
            }, 500);
        }
    }

    // 팝업 표시 함수
    function showPopup() {
        if (popup && popup.classList.contains('popup-inactive')) {
            popup.style.display = 'block';

            // 팝업 위치를 랜덤하게 조정
            const randomX = Math.floor(Math.random() * 200) - 100;
            const randomY = Math.floor(Math.random() * 50) - 25;
            popup.style.transform = `translate(calc(-50% + ${randomX}px), ${randomY}px)`;

            popup.classList.remove('popup-inactive');
            popup.style.opacity = '1';

            // 팝업 전체를 클릭했을 때 닫히도록 이벤트 리스너 추가 (팝업이 띄워질 때마다 추가)
            popup.addEventListener('click', hidePopup, { once: true }); // 한 번만 실행되도록 once: true 사용

            // 10초 후 팝업 자동 숨김
            setTimeout(hidePopup, 10000);
        }
    }

    // 타이머 설정
    if (popup) {
        // 로고 글리치 효과 1초마다 체크
        setInterval(initiateGlitch, 1000);

        // 팝업 30초마다 33% 확률로 등장 체크
        setInterval(() => {
            if (Math.random() < 0.33) {
                showPopup();
            }
        }, 30000);
    }
});