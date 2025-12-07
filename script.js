document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('mode-toggle');
    const body = document.body;
    const errroContent = document.getElementById('errro-content');
    const arrrchiveContent = document.getElementById('arrrchive-content');

    // 토글 버튼 텍스트 업데이트 함수
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

        // 2. 콘텐츠 컨테이너 전환 (대응되는 콘텐츠만 보이게)
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