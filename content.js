(function () {
    function checkAndDismiss(intervalId) {
        const dialog = document.querySelector('yt-confirm-dialog-renderer.style-scope');
        
        if (dialog && dialog.offsetParent !== null) {
            const confirmBtn = dialog.querySelector('#confirm-button .yt-spec-touch-feedback-shape__fill') || dialog.querySelector('#confirm-button');
            
            if (confirmBtn) {
                // 1. Ưu tiên TUYỆT ĐỐI: Bật lại video ngay lập tức không chần chừ
                const v = document.querySelector('video');
                if (v && v.paused) {
                    v.play().catch(() => {}); // Bắt lỗi catch để tránh console báo đỏ nếu trình duyệt dở chứng
                }

                // 2. Sau đó mới click tắt popup 
                confirmBtn.click(); 

                // 3. Dừng vòng lặp quét
                if (intervalId) clearInterval(intervalId);
            }
        }
    }

    function onVideoChange() {
        let tries = 0;
        
        const t = setInterval(() => {
            checkAndDismiss(t);
            tries++;
            
            if (tries >= 60) {
                clearInterval(t);
            }
        }, 50);
    }

    document.addEventListener("yt-navigate-finish", onVideoChange);
})();