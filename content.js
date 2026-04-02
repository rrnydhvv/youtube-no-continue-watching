(function () {
    // Nhận trạng thái "chụp ảnh" (wasHiddenAtPause) để quyết định có ép play hay không
    function keepStreamAliveAndCleanUI(wasHiddenAtPause) {
        const v = document.querySelector('video');
        const dialog = document.querySelector('yt-confirm-dialog-renderer');
        
        // 1. Dọn dẹp bảng hỏi "Bạn có đang xem không?" nếu nó xuất hiện
        if (dialog && dialog.offsetParent !== null) {
            const confirmBtn = dialog.querySelector('#confirm-button .yt-spec-touch-feedback-shape__fill') || dialog.querySelector('#confirm-button');
            if (confirmBtn) {
                confirmBtn.click();
            }
        }

        // 2. Logic ép video chạy tiếp cực kỳ chặt chẽ:
        // CHỈ ép chạy nếu TẠI THỜI ĐIỂM PAUSE, tab đang bị ẩn (nghĩa là YouTube tự động ngắt ngầm).
        if (v && v.paused && wasHiddenAtPause) {
            const isNearEnd = v.currentTime > v.duration - 1;
            if (!v.ended && !isNearEnd) {
                v.play().catch(() => {});
            }
        }
    }

    document.addEventListener('pause', function(event) {
        if (event.target && event.target.tagName === 'VIDEO') {
            // Lấy NGAY LẬP TỨC trạng thái ẩn/hiện của tab tại thời điểm xảy ra sự kiện Pause
            const isHiddenRightNow = document.hidden;
            
            // Truyền trạng thái đó vào hàm, lúc này bạn chuyển tab nhanh cỡ nào cũng không bị lỗi nữa
            setTimeout(() => keepStreamAliveAndCleanUI(isHiddenRightNow), 200);
            setTimeout(() => keepStreamAliveAndCleanUI(isHiddenRightNow), 1000);
        }
    }, true);
    
    document.addEventListener("yt-navigate-finish", () => {
        // Mặc định truyền false khi chuyển video để tránh lỗi tự play ngoài ý muốn
        setTimeout(() => keepStreamAliveAndCleanUI(false), 1000);
    });

    document.addEventListener("visibilitychange", () => {
        if (!document.hidden) {
            const dialog = document.querySelector('yt-confirm-dialog-renderer');
            if (dialog) {
                const confirmBtn = dialog.querySelector('#confirm-button');
                if (confirmBtn) confirmBtn.click();
            }
        }
    });
})();