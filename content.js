(function () {
    // Tách riêng hàm dọn rác UI để dùng lại nhiều lần
    function cleanUI() {
        const dialog = document.querySelector('yt-confirm-dialog-renderer');
        if (dialog && dialog.offsetParent !== null) {
            const confirmBtn = dialog.querySelector('#confirm-button .yt-spec-touch-feedback-shape__fill') || dialog.querySelector('#confirm-button');
            if (confirmBtn) {
                confirmBtn.click();
            }
        }
    }

    // Hàm giữ luồng nhạc
    function keepStreamAlive() {
        const v = document.querySelector('video');
        if (v && v.paused && !v.ended && document.hidden) {
            v.play().catch(() => {});
        }
        cleanUI();
    }

    // 1. Lắng nghe khi video bị ép dừng
    document.addEventListener('pause', function(event) {
        if (event.target && event.target.tagName === 'VIDEO') {
            setTimeout(keepStreamAlive, 100);
            setTimeout(keepStreamAlive, 500);
            setTimeout(keepStreamAlive, 1500);
        }
    }, true);
    
    // 2. Lắng nghe khi chuyển video mới
    document.addEventListener("yt-navigate-finish", () => {
        setTimeout(keepStreamAlive, 1000);
        setTimeout(keepStreamAlive, 2000);
    });

    // 3. CHIÊU CUỐI: Lắng nghe khi bạn vừa quay trở lại tab YouTube
    document.addEventListener("visibilitychange", () => {
        if (!document.hidden) {
            // Khi tab hiển thị lại, quét dọn ngay lập tức
            cleanUI();
            // Quét dự phòng thêm 2 lần phòng trường hợp YouTube vẽ giao diện chậm mất vài mili-giây
            setTimeout(cleanUI, 300);
            setTimeout(cleanUI, 800);
        }
    });
})();