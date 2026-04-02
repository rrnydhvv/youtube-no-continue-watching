(function () {
    function keepStreamAliveAndCleanUI() {
        const v = document.querySelector('video');
        const dialog = document.querySelector('yt-confirm-dialog-renderer');
        
        // Kiểm tra xem bảng hỏi của YouTube có đang hiển thị không
        let confirmBtn = null;
        if (dialog && dialog.offsetParent !== null) {
            confirmBtn = dialog.querySelector('#confirm-button .yt-spec-touch-feedback-shape__fill') || dialog.querySelector('#confirm-button');
        }

        // CHỈ XỬ LÝ ÉP PLAY KHI CÓ BẢNG HỎI CỦA YOUTUBE
        if (confirmBtn) {
            // 1. Tự động click tắt bảng
            confirmBtn.click();
            
            // 2. Ép video chạy tiếp
            if (v && v.paused) {
                const isNearEnd = v.currentTime > v.duration - 1;
                if (!v.ended && !isNearEnd) {
                    v.play().catch(() => {});
                }
            }
        }
    }

    document.addEventListener('pause', function(event) {
        if (event.target && event.target.tagName === 'VIDEO') {
            // Vẫn giữ delay 200ms và 1000ms để chờ trình duyệt load xong cái bảng của YouTube (nếu có)
            // Lúc này bạn có chuyển tab nhanh cỡ nào thì code vẫn hoạt động đúng.
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