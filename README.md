# ✨ OUR LITTLE UNIVERSE — CHÚC MỪNG SINH NHẬT BÉ XU XINH ✨

> **Website chúc mừng sinh nhật cao cấp, lãng mạn và ngập tràn bất ngờ dành riêng cho Bé Xu Xinh từ Anh (Bùi Huỳnh Phước Tài).**  
> Thiết kế theo phong cách *Vũ Trụ & Ngân Hà (Celestial Galaxy & Stardust Fantasy)* với đầy đủ tương tác khám phá!

---

## 🌟 TỔNG QUAN VÀ TÍNH NĂNG NỔI BẬT

1. **The Magic Gate (Cánh Cổng Kỳ Diệu):**
   - Màn hình mở đầu toàn cảnh bầu trời đêm tinh vân tím hồng huyền ảo.
   - Phong thư phát sáng và lời nhắn thì thầm: *“Anh có một điều đặc biệt muốn dành tặng em…”*
   - Nút bấm **“OPEN YOUR LITTLE UNIVERSE ✨”** kích hoạt hiệu ứng bùng nổ ánh sáng, cánh hoa hồng, trái tim bay và pháo hoa đưa người xem vào thế giới chính.

2. **Hero Section (Her Special Day):**
   - Tiêu đề cinematic với hiệu ứng chữ phát sáng *Text Shimmer* & *Glow*.
   - Trái tim pha lê 3D phát sáng nhấp nháy theo nhịp thở.
   - Parallax tương tác theo chuyển động chuột.

3. **Birthday Countdown (Bộ Đếm Khoảnh Khắc):**
   - Tự động tính toán theo ngày sinh nhật cấu hình (Hỗ trợ định dạng `YYYY-MM-DD`).
   - Nếu chưa đến ngày: Đếm ngược Ngày, Giờ, Phút, Giây với đồng hồ sang trọng.
   - Nếu đúng ngày sinh nhật: Tự động chuyển sang chế độ chúc mừng **“IT'S YOUR SPECIAL DAY! 🎂”**.
   - Nếu ngày sinh nhật đã qua: Không hiển thị số âm; chuyển sang đếm số ngày đồng hành cùng tuổi mới ngập tràn hạnh phúc.

4. **Our Memories (Thước Phim Tình Yêu - Album Kỷ Niệm):**
   - Bố cục ảnh Polaroid đan xen phong cách tạp chí nghệ thuật (Editorial Layout).
   - Hover phóng to nhẹ, đổ bóng và viền ánh sáng.
   - Xem ảnh toàn màn hình (Lightbox) với phím điều hướng `←`, `→` và phím `Escape` để đóng.

5. **Love Letter (Lá Thư Tình Gửi Em):**
   - Phong thư cổ điển với con dấu sáp trái tim nổi bật giữa ánh nến lung linh.
   - Nút **“OPEN MY LETTER 💌”** mở ra lá thư trên nền giấy giả da cao cấp mạ viền vàng.
   - Hiệu ứng gõ chữ (Typewriter) chân thực kèm âm thanh lấp lánh nhẹ nhàng.
   - Có sẵn nút **“ĐỌC TOÀN BỘ LÁ THƯ”** để hiện nhanh khi cần.

6. **Interactive Celebration (Bữa Tiệc Tinh Tú):**
   - **Bánh sinh nhật nhiều tầng:** Ngọn nến lung linh, nút **“THỔI NẾN ✨”** dập tắt nến bằng làn khói mờ và tiếng pháo hoa rực rỡ; có thể thắp lại nến bất cứ lúc nào.
   - **Bắn pháo hoa Canvas:** Tương tác chạm vào bầu trời để bắn pháo hoa với hạt sáng vật lý mượt mà 60 FPS.
   - **Bầu trời điều ước tinh tú (Wishes Constellation):** Bé Xu Xinh gõ điều ước và nhấn gửi: Ngay lập tức pháo hoa bùng nổ, âm thanh pháo nổ vang lên và điều ước hiện ra lấp lánh ngay trên màn hình. Không lưu trữ dữ liệu cũ, mang lại cảm giác khoảnh khắc điều ước thiêng liêng và riêng tư!

7. **Background Music (Trình Phát Nhạc Lãng Mạn):**
   - Widget đĩa than xoay phát nhạc tinh tế ở góc phải màn hình, có thể thu gọn hoặc mở rộng.
   - Tùy chỉnh âm lượng, nút Play/Pause, Mute.
   - **Tính năng độc quyền:** Tích hợp bộ tạo âm thanh hộp nhạc (Web Audio API Synthesizer) du dương êm ái, hoạt động ngay cả khi bạn chưa kịp bỏ file nhạc vào mà không bao giờ gặp lỗi!

8. **Final Section & Replay:**
   - Kết thúc đầy lắng đọng với thông điệp: *“THE WORLD IS MORE BEAUTIFUL WITH YOU IN IT.”*
   - Nút **“XEM LẠI MÓN QUÀ TỪ ĐẦU ↺”** để thưởng thức lại từ cánh cổng mở đầu.

---

## 🛠️ CẤU TRÚC THƯ MỤC DỰ ÁN

Dự án được phân chia thành nhiều module rõ ràng, chuyên nghiệp để bạn dễ dàng quản lý:

```
d:\Của em\
├── public/
│   ├── music/
│   │   ├── README.txt              # Hướng dẫn thêm nhạc
│   │   └── birthday.mp3            # Đặt file bài hát của bạn vào đây
│   └── photos/
│       ├── memory-1.svg            # Ảnh kỷ niệm 1
│       ├── memory-2.svg            # Ảnh kỷ niệm 2
│       └── ... (tới memory-8.svg)
├── src/
│   ├── config/
│   │   └── birthday.ts             # ⭐ FILE QUAN TRỌNG NHẤT: Chứa toàn bộ nội dung tùy biến
│   ├── types/
│   │   └── index.ts                # Định nghĩa kiểu dữ liệu TypeScript
│   ├── utils/
│   │   └── soundEffects.ts         # Bộ tổng hợp âm thanh Web Audio API (không cần tải thêm file)
│   ├── hooks/
│   │   ├── useCountdown.ts         # Logic tính toán đếm ngược ngày sinh nhật chuẩn xác
│   │   └── useAudioPlayer.ts       # Hook điều khiển âm nhạc thông minh & tự phục hồi
│   ├── components/
│   │   ├── common/
│   │   │   ├── StardustCanvas.tsx       # Bầu trời sao và sao băng 60 FPS
│   │   │   ├── FloatingHeartsCanvas.tsx # Trái tim lơ lửng nhẹ nhàng
│   │   │   └── SectionHeader.tsx        # Tiêu đề sang trọng kiểu tạp chí
│   │   ├── gate/
│   │   │   └── TheMagicGate.tsx         # Màn hình mở đầu Cánh Cổng Phép Màu
│   │   ├── hero/
│   │   │   └── HeroSection.tsx          # Màn hình Hero với Trái Tim Pha Lê 3D
│   │   ├── countdown/
│   │   │   └── CountdownSection.tsx     # Khu vực đếm ngược thời gian
│   │   ├── gallery/
│   │   │   ├── MemoriesGallery.tsx      # Thư viện ảnh Polaroid
│   │   │   └── LightboxModal.tsx        # Xem ảnh toàn màn hình & phím tắt
│   │   ├── letter/
│   │   │   ├── LoveLetterSection.tsx    # Bức thư tình và phong bì sáp
│   │   │   └── TypewriterText.tsx       # Hiệu ứng gõ chữ
│   │   ├── gift/
│   │   │   └── GiftBox3D.tsx            # Hộp quà 3D bất ngờ
│   │   ├── celebration/
│   │   │   ├── CelebrationSection.tsx   # Khu vực tiệc mừng trung tâm
│   │   │   ├── BirthdayCake.tsx         # Bánh sinh nhật & thổi nến
│   │   │   ├── FireworksCanvas.tsx      # Canvas pháo hoa tương tác
│   │   │   └── WishesConstellation.tsx  # Gửi điều ước lên chòm sao
│   │   ├── music/
│   │   │   └── AudioPlayerWidget.tsx    # Widget đĩa than phát nhạc
│   │   └── final/
│   │       └── FinalSection.tsx         # Lời chào kết thúc xúc động
│   ├── App.tsx                     # Điều phối luồng trải nghiệm
│   ├── main.tsx                    # Entry point của React
│   └── index.css                   # Custom theme, glassmorphism, hiệu ứng glow
├── index.html                      # Tải font chữ Google Fonts cao cấp
├── vite.config.ts                  # Cấu hình Vite & Tailwind v4
└── package.json
```

---

## 🎨 HƯỚNG DẪN CÁ NHÂN HÓA (CHỈ CẦN SỬA 1 FILE)

Mọi dữ liệu hiển thị trên website đều được quy tụ về file:
📁 **`src/config/birthday.ts`**

### 1. Đổi tên và ngày sinh nhật
Mở file `src/config/birthday.ts` và chỉnh sửa:
```typescript
recipient: {
  name: "Em Yêu",                   // Tên hiển thị của cô ấy (Ví dụ: "Hương Giang")
  nickname: "Công Chúa Của Anh",    // Biệt danh đáng yêu
  birthDate: "2002-11-15",          // ĐỊNH DẠNG: YYYY-MM-DD (Năm-Tháng-Ngày)
  birthYear: 2002,
},
sender: {
  name: "Anh",                      // Tên của bạn
  nickname: "Chàng trai của em",
}
```

### 2. Đổi nội dung lá thư tình (Love Letter)
Trong mục `letter` của file `src/config/birthday.ts`:
```typescript
letter: {
  salutation: "Gửi em, cô gái đặc biệt của anh,",
  paragraphs: [
    "Chúc mừng sinh nhật em!",
    "Anh mong tuổi mới sẽ mang đến cho em thật nhiều niềm vui...",
    // Bạn có thể thêm hoặc sửa các đoạn văn theo cảm xúc của riêng mình
  ],
  closing: "Happy Birthday, my love. ❤️",
  signature: "Người luôn thương và tự hào về em",
}
```

### 3. Thay ảnh kỷ niệm thật của hai bạn
1. Chuẩn bị khoảng 6 - 8 bức ảnh đẹp của hai người (định dạng `.jpg`, `.png`, hoặc `.webp`).
2. Chép các file ảnh vào thư mục:  
   👉 `public/photos/` (ví dụ: `my-photo-1.jpg`, `my-photo-2.jpg`...).
3. Trong `src/config/birthday.ts`, cập nhật đường dẫn `url` và `caption`:
   ```typescript
   {
     id: "mem-1",
     url: "/photos/my-photo-1.jpg",
     title: "Lần đầu gặp gỡ",
     date: "14/02/2023",
     location: "Hà Nội",
     caption: "Khoảnh khắc đầu tiên ánh mắt chạm nhau...",
     tag: "First Date",
   }
   ```

### 4. Thêm bài hát yêu thích của cô ấy
1. Chọn một bản nhạc MP3 lãng mạn mà cô ấy yêu thích (ví dụ: *Until I Found You*, *Golden Hour*, *Can't Take My Eyes Off You*...).
2. Đổi tên file thành `birthday.mp3` và sao chép vào:  
   👉 `public/music/birthday.mp3`.
3. Cập nhật thông tin bài hát trong `src/config/birthday.ts`:
   ```typescript
   audio: {
     title: "Tên bài hát của bạn",
     artist: "Tên nghệ sĩ / Ca sĩ",
     src: "/music/birthday.mp3",
     autoPlayAfterGate: true,
     enableFallbackSynthesizer: true,
   }
   ```

---

## 🚀 HƯỚNG DẪN CHẠY LOCAL (TRÊN MÁY TÍNH CỦA BẠN)

### 1. Chạy môi trường phát triển (Development):
Mở terminal tại thư mục dự án và chạy:
```powershell
npm run dev
```
Trình duyệt sẽ mở tại địa chỉ: `http://localhost:5173`. Bạn có thể chỉnh sửa code và xem thay đổi ngay lập tức!

### 2. Kiểm tra bản build hoàn chỉnh:
```powershell
npm run build
npm run preview
```

---

## 🌐 HƯỚNG DẪN TRIỂN KHAI LÊN HOSTING (ĐỂ GỬI LINK CHO NGƯỜI YÊU)

Bạn có thể đưa website này lên mạng hoàn toàn **MIỄN PHÍ** chỉ trong 2 phút để gửi đường link cho bạn gái:

### Cách 1: Sử dụng Vercel (Khuyên dùng nhất - Siêu nhanh)
1. Tải [Vercel CLI](https://vercel.com/) hoặc đăng ký tài khoản tại [vercel.com](https://vercel.com).
2. Chạy lệnh:
   ```powershell
   npx vercel
   ```
3. Nhấn `Enter` để đồng ý các thiết lập mặc định. Sau 30 giây, bạn sẽ nhận được một đường link tuyệt đẹp dạng `https://our-universe-yourname.vercel.app` để gửi tặng cô ấy!

### Cách 2: Kéo thả thủ công trên Netlify Drop
1. Chạy lệnh build:
   ```powershell
   npm run build
   ```
2. Thư mục `dist` sẽ được tạo ra.
3. Truy cập [app.netlify.com/drop](https://app.netlify.com/drop).
4. Kéo toàn bộ thư mục `dist` thả vào trình duyệt. Netlify sẽ cấp ngay một tên miền miễn phí!

---

## 💖 LỜI CHÚC

Chúc bạn và bạn gái có một ngày sinh nhật thật ngọt ngào, ấm áp và đong đầy những khoảnh khắc đáng nhớ nhất cùng món quà đặc biệt này! ✨

