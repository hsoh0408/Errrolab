document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');

    // 갤러리 전용 토글 요소
    const toggleButton = document.getElementById('mode-toggle');
    const body = document.body;
    const errroContent = document.getElementById('errro-content');
    const arrrchiveContent = document.getElementById('arrrchive-content');

    // --- 1. 페이지 전환 로직 (SPA 스타일) ---
    function setActivePage(targetPageId) {
        pages.forEach(page => {
            if (page.id === targetPageId) {
                // 활성화될 페이지: 보이게 하고, position을 relative로 설정하여 메인 콘텐츠의 높이를 차지하도록 함
                page.classList.add('active');
                page.classList.remove('inactive');
                page.style.position = 'relative'; // 높이를 잡게 함
            } else {
                // 비활성화될 페이지: 숨기고, position을 absolute로 설정하여 다른 페이지 위에 겹쳐지게 함
                page.classList.add('inactive');
                page.classList.remove('active');
                page.style.position = 'absolute'; // 화면 밖으로 밀어냄
            }
        });

        // 내비게이션 링크 활성 상태 업데이트 (선택적)
        navLinks.forEach(link => {
            if (link.getAttribute('data-page') === targetPageId) {
                link.classList.add('active-nav');
            } else {
                link.classList.remove('active-nav');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPageId = link.getAttribute('data-page');
            setActivePage(targetPageId);
            // 페이지 전환 후 화면 상단으로 스크롤
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

    // 초기 토글 텍스트 상태 설정
    const isErrro = body.classList.contains('errro-mode');
    if (toggleButton) { // 토글 버튼이 존재할 때만 실행
        updateToggleText(isErrro);

        toggleButton.addEventListener('click', () => {
            // 1. Body 클래스 전환 (전체 테마 변경)
            const isErrroMode = body.classList.toggle('errro-mode');
            body.classList.toggle('arrrchive-mode', !isErrroMode);

            // 2. 갤러리 콘텐츠 컨테이너 전환 (ERRRO/ARRRCHIVE 콘텐츠 분리)
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
            // 3. 토글 버튼 텍스트 업데이트
            updateToggleText(isErrroMode);
        });
    }


    // --- 3. 글리치 및 팝업 효과 로직 ---
    const glitchElement = document.getElementById('logo'); // 글리치 적용 요소 (로고)
    const popup = document.getElementById('retro-popup');

    // 팝업 요소들이 모두 존재하는지 확인
    if (popup) {
        const okButton = popup.querySelector('.ok-button');

        // 간헐적 글리치 효과 적용 함수
        function initiateGlitch() {
            if (!glitchElement) return;

            // 5% 확률로 글리치 실행
            if (Math.random() < 0.05) {
                glitchElement.classList.add('glitch-active');
                // 0.5초 후 글리치 종료
                setTimeout(() => {
                    glitchElement.classList.remove('glitch-active');
                }, 500);
            }
        }

        // 팝업 표시 함수
        function showPopup() {
            if (popup.classList.contains('popup-inactive')) {
                popup.style.display = 'block';
                // 팝업이 나타나는 위치를 랜덤하게 조정 (가리지 않도록)
                const randomX = Math.floor(Math.random() * 200) - 100; // -100px ~ +100px
                const randomY = Math.floor(Math.random() * 50) - 25; // -25px ~ +25px
                popup.style.transform = `translate(calc(-50% + ${randomX}px), ${randomY}px)`;

                popup.classList.remove('popup-inactive');
                popup.style.opacity = '1';

                // 10초 후 팝업 자동 숨김
                setTimeout(hidePopup, 10000);
            }
        }

        // 팝업 숨김 함수
        function hidePopup() {
            popup.style.opacity = '0';
            setTimeout(() => {
                popup.classList.add('popup-inactive');
                popup.style.display = 'none';
            }, 300);
        }

        // OK 버튼 클릭 시 숨김
        if (okButton) {
            okButton.addEventListener('click', hidePopup);
        }

        // 타이머 설정: 글리치는 매 1초마다, 팝업은 매 30초마다 체크
        setInterval(initiateGlitch, 1000);

        // 1/3 확률로 팝업이 30초마다 등장
        setInterval(() => {
            if (Math.random() < 0.33) {
                showPopup();
            }
        }, 30000);
    }
});