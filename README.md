# YouTube No Continue Watching 🚫⏸️

> Đập tan thông báo "Video paused. Continue watching?" đầy phiền toái. Nghe nhạc, moshpit, cày podcast thâu đêm suốt sáng không lo bị ngắt quãng! 🎧✨

A lightweight, highly optimized Chrome Extension that automatically dismisses the annoying "Video paused. Continue watching?" popup on YouTube and seamlessly resumes playback. Built specifically to survive browser background throttling.

---

## ✨ Tính năng nổi bật (Why is this better?)

Khác với các tiện ích "bỏ qua quảng cáo" hay "tự động click" thông thường, extension này được tối ưu cực độ cho việc chạy nền:

* 🚀 **Bất tử ở Background (Background Tab Survival):** Trình duyệt Chrome thường có thói quen "bóp" (throttle) hiệu năng các tab chạy ngầm. Tiện ích này không dùng `setInterval` hay `MutationObserver` liên tục nên miễn nhiễm hoàn toàn với cơ chế đó, mượt mà 100% khi nghe nhạc ẩn tab.
* ⚡ **Zero Idle CPU Usage:** Kiến trúc Event-driven siêu sạch. Nó chỉ "thức dậy" khi HTML5 Video phát tín hiệu `pause`. Điểm cộng: Không ăn CPU khi bạn dạo web bình thường, không gây rò rỉ RAM (Memory Leak).
* 🧠 **Vượt mặt Lazy Rendering:** Xử lý triệt để trò tối ưu UI của YouTube. Tách biệt luồng phát âm thanh và luồng dọn dẹp giao diện (DOM), giúp video tiếp tục chạy lại ngay tắp lự, thậm chí **chưa kịp hiện cái khối popup đó ra**.
* 🎯 **Plug & Play:** Không cần tùy chỉnh lằng nhằng. Cài xong là xõa!

## 🛠️ Cài đặt siêu tốc (Installation)

Vì tiện ích này tập trung vào sự tối giản và chưa public trên Chrome Web Store, bạn có thể cài đặt thủ công (Load unpacked) chỉ trong 30 giây:

1. **Tải mã nguồn:** 
   Clone repository này về máy, hoặc bấm nút xanh `Code` -> `Download ZIP` rồi giải nén.
   ```bash
   git clone https://github.com/your-username/youtube-no-continue-watching.git
   ```

2. **Mở Chrome Extensions:**
   Mở trình duyệt Chrome/Edge/Brave, nhập đường dẫn sau vào thanh địa chỉ:
   ```text
   chrome://extensions/
   ```

3. **Kích hoạt Developer Mode:**
   Bật công tắc **"Chế độ cho nhà phát triển"** (Developer mode) ở góc phải phía trên.

4. **Kéo thả hoặc Cài đặt:**
   Bấm nút **"Tải tiện ích đã giải nén"** (Load unpacked) và chọn thư mục chứa code vừa tải về là xong! 🎉

## 💡 Cách hoạt động (Under the hood)

Không phức tạp hóa vấn đề. Extension chèn một đoạn Vanilla JavaScript siêu nhẹ vào trang YouTube để:
1. Lắng nghe trực tiếp sự kiện `pause` ở tầng `document`.
2. Truy xuất thẳng đối tượng `<video>` hoặc `<audio>` đang phát.
3. Nếu phát hiện bị dừng đột ngột (không phải do chính người dùng click pause), thực thi `video.play()` ngay lập tức.
4. Xóa các hộp thoại Confirm Dialog lảng vảng trên DOM.

---
*If this extension brings you joy (and uninterrupted music), consider giving it a ⭐!*