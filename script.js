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

    // URL 해시에 따라 초기 페이지 설정
    const initialPage = window.location.hash ? window.location.hash.substring(1) : 'about';
    setActivePage(initialPage);


    // --- 2. 갤러리 모드 토글 로직 (기존 로직 유지) ---
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

    // 초기 상태 설정
    const isErrro = body.classList.contains('errro-mode');
    updateToggleText(isErrro);

    toggleButton.addEventListener('click', () => {
        // 1. Body 클래스 전환 (전체 테마 변경)
        const isErrroMode = body.classList.toggle('errro-mode');
        body.classList.toggle('arrrchive-mode', !isErrroMode);

        // 2. 갤러리 콘텐츠 컨테이너 전환
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

        // 3. 토글 버튼 텍스트 업데이트
        updateToggleText(isErrroMode);
    });

});