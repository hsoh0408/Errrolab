document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const contentArea = document.getElementById('content-area');

    // 갤러리 전용 토글 요소
    const toggleButton = document.getElementById('mode-toggle');
    const body = document.body;
    const errroContent = document.getElementById('errro-content');
    const arrrchiveContent = document.getElementById('arrrchive-content');

    // --- 1. 페이지 전환 로직 (SPA 스타일) ---
    function setActivePage(targetPageId) {
        pages.forEach(page => {
            if (page.id === targetPageId) {
                page.classList.add('active');
                page.classList.remove('inactive');
            } else {
                page.classList.add('inactive');
                page.classList.remove('active');
            }
        });
        // 갤러리 페이지일 때만 모드 토글 컨텐츠가 보이게 처리 (CSS에서 이미 처리되지만 JS로 한 번 더 명확히)
        const isGallery = (targetPageId === 'gallery');
        document.getElementById('toggle-container').style.display = isGallery ? 'block' : 'none';

        // 내비게이션 링크 활성 상태 업데이트
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
            window.history.pushState(null, '', `#${targetPageId}`); // URL 해시 업데이트
        });
    });

    // --- 1. 페이지 전환 로직 (SPA 스타일) ---
    // ... (중략: setActivePage 함수는 그대로 유지) ...

    // URL 해시에 따라 초기 페이지 설정
    // 초기 페이지를 'about'으로 강제 설정합니다.
    const initialPage = 'about';
    setActivePage(initialPage);


    // --- 2. 갤러리 모드 토글 로직 (중략: 기존 로직은 그대로 유지) ---
    // ...


    // --- 2. 갤러리 모드 토글 로직 (기존 로직 유지) ---
    function updateToggleText(isErrroMode) {
        const errroText = toggleButton.querySelector('.mode-text:first-child');
        const arrrchiveText = toggleButton.querySelector('.mode-text:last-child');
        // script.js 파일 수정

        // ... (1. 페이지 전환 로직은 그대로 유지) ...

        // 갤러리 전용 토글 요소
        const toggleButton = document.getElementById('mode-toggle');
        const body = document.body;
        const errroContent = document.getElementById('errro-content');
        const arrrchiveContent = document.getElementById('arrrchive-content');

        // ... (updateToggleText 함수는 그대로 유지) ...

        // 초기 상태 설정
        const isErrro = body.classList.contains('errro-mode');
        updateToggleText(isErrro);

        toggleButton.addEventListener('click', () => {
            // 1. Body 클래스 전환 (전체 테마 변경)
            const isErrroMode = body.classList.toggle('errro-mode');
            body.classList.toggle('arrrchive-mode', !isErrroMode);

            // 2. 갤러리 콘텐츠 컨테이너 전환 (수정할 필요 없이, 이 로직이 두 콘텐츠를 전환합니다.)
            if (isErrroMode) {
                // ERRRO 모드 활성화: ERRRO 콘텐츠만 보임
                errroContent.classList.add('active');
                errroContent.classList.remove('inactive');
                arrrchiveContent.classList.add('inactive');
                arrrchiveContent.classList.remove('active');
            } else {
                // ARRRCHIVE 모드 활성화: ARRRCHIVE 콘텐츠만 보임
                errroContent.classList.add('inactive');
                errroContent.classList.remove('active');
                arrrchiveContent.classList.add('active');
                arrrchiveContent.classList.remove('inactive');
            }

            // 3. 토글 버튼 텍스트 업데이트
            updateToggleText(isErrroMode);
        });
    });