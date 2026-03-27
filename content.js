(function () {
    function keepStreamAliveAndCleanUI() {
        const v = document.querySelector('video');
        
        if (v && v.paused && document.hidden) {
            // ĐIỀU KIỆN VÁ LỖI:
            // 1. !v.ended: Video chưa kết thúc hẳn.
            // 2. v.currentTime < v.duration - 1: Video không nằm ở 1 giây cuối cùng.
            // (Nếu ở 1s cuối, khả năng cao là đang chuyển bài -> KHÔNG can thiệp)
            const isNearEnd = v.currentTime > v.duration - 1;

            if (!v.ended && !isNearEnd) {
                v.play().catch(() => {});
            }
        }

        // Tác vụ dọn dẹp UI vẫn giữ nguyên
        const dialog = document.querySelector('yt-confirm-dialog-renderer');
        if (dialog && dialog.offsetParent !== null) {
            const confirmBtn = dialog.querySelector('#confirm-button .yt-spec-touch-feedback-shape__fill') || dialog.querySelector('#confirm-button');
            if (confirmBtn) {
                confirmBtn.click();
            }
        }
    }

    document.addEventListener('pause', function(event) {
        if (event.target && event.target.tagName === 'VIDEO') {
            // Tăng độ trễ lên 200ms để nhường sân cho trình phát của YT xử lý chuyển bài
            setTimeout(keepStreamAliveAndCleanUI, 200);
            setTimeout(keepStreamAliveAndCleanUI, 1000);
        }
    }, true);
    
    document.addEventListener("yt-navigate-finish", () => {
        setTimeout(keepStreamAliveAndCleanUI, 1000);
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