import { BirthdayConfig } from '../types';

/**
 * =======================================================================
 * CẤU HÌNH DÀNH RIÊNG CHO: BÉ XU XINH
 * Người gửi: Bùi Huỳnh Phước Tài (Anh)
 * Sinh nhật: 30/10 (Tròn 21 tuổi)
 * Phong cách: Vũ trụ & Dải ngân hà lãng mạn
 * =======================================================================
 */

export const BIRTHDAY_CONFIG: BirthdayConfig = {
  // THÔNG TIN NGƯỜI NHẬN
  recipient: {
    name: "Bé Xu Xinh",
    nickname: "Bé iu của anh",
    birthDate: "2005-10-30", // Ngày sinh nhật 30/10 - Kỷ niệm tròn 21 năm thiên thần hạ cánh!
    birthYear: 2005,
    timezone: "Asia/Ho_Chi_Minh",
  },

  // THÔNG TIN NGƯỜI GỬI
  sender: {
    name: "Bùi Huỳnh Phước Tài",
    nickname: "Anh người iu bé nhỏ mỏng manh",
  },

  // MÀN HÌNH CHÍNH (HERO SECTION)
  hero: {
    titleEn: "HAPPY BIRTHDAY",
    subtitleEn: "BÉ XU XINH",
    taglineEn: "Today 30/10, the entire galaxy celebrates our little angel.",
    messageVi: "Hôm nay 30/10 – một ngày siêu to khổng lồ của cả vũ trụ! Chúc mừng sinh nhật tuổi 21 của Bé Xu Xinh – thiên thần nhỏ hạ cánh xuống trái đất và giờ đã thuộc về tay anh, dìa diaaaaa ^^!",
    subMessageVi: "Cảm ơn em vì đã xuất hiện và làm cho dải ngân hà của anh ngập tràn ánh sao, nụ cười và những điều kỳ diệu nhất ✨",
    ctaText: "KHÁM PHÁ ĐIỀU BẤT NGỜ 💌",
  },

  // NỘI DUNG LÁ THƯ TÌNH CẢM SÂU SẮC (LOVE LETTER)
  letter: {
    salutation: "Hello bé iu của anh ^^,",
    paragraphs: [
      "Hôm nay là ngày gì vậy taaaa... àaaaaaa, 30/10! Một ngày siêu đặc biệt, siêu to khổng lồ không chỉ với em và gia đình, mà có khi vũ trụ cũng phải nín thở chúc mừng ^^.",
      "Đúng ngày này 21 năm trước, tiếng khóc oe oe của một thiên thần nhỏ đã hạ cánh xuống trái đất. Và may mắn đỉnh chóp nhất đời anh là thiên thần ấy giờ đã thuộc về tay mình, dìa diaaaaa ^^!",
      "Tôi – Bùi Huỳnh Phước Tài – xin đại diện cho toàn thể bà con lối xóm, già trẻ gái trai khắp 4 phương 8 hướng, gửi ngàn lời chúc xịn sò nhất đến bé iu của anh. Tuổi 21 rồi, anh chúc em:\n\n• Mau ăn chóng lớn, trộm vía khỏe re để không bị đau ốm vặt nữa :'(\n• Mọi dự định, công việc, học hành đều “đầu xuôi đuôi lọt”, cầu gì được nấy.\n• Cười nhiều mỗi ngày, cười haha hớ hớ tít cả mắt lên, vì lúc em cười là lúc em xinh đẹp và đáng yêu nhất trần đời! Úm ba la xì bùa mọi chuyện buồn phiền xui xẻo biến mất ngay lập tức, cấm bén mảng đến bé iu của tui -.-\n• Bỏ ngay mấy tật xấu như lười ăn hay bỏ bữa, thay vào đó là chăm ăn tẩm bổ và đi học chăm chỉ khum cúp tiết nữa nha :'))",
      "Thay mặt thiên hạ xong rồi, giờ tới tâm tư riêng của \"anh người iu bé nhỏ\" nè: Anh mong em thương anh nhiều hơn một xíu, bớt hung dữ, bớt la mắng người ta lại :'( Vì anh mỏng manh dễ vỡ lắm, phải nhẹ nhàng nâng niu chiều chuộng chứ không anh sợ anh khóc nhè đó! Với cả, đi tắm là nhớ cẩn thận, cứ facetime để anh canh chừng cho yên tâm, lỡ trượt chân hay có chuyện gì anh lo sốt vó lên được :'(",
      "Hy vọng em sẽ thích món quà này nha. Thấy anh chọn đồ có gu chuẩn fashionista chưa :')) Buổi đi chơi tối nay nếu có gì sơ suất thì em xí xóa bỏ qua cho anh nha, đừng có đè đầu uýnh anh tội nghiệp :'( Năm sau tròn 22 tuổi, anh hứa sẽ làm một quả sinh nhật còn \"dè de dé de\" hoành tráng hơn năm nay nhiều!",
      "Yêu em siêu nhiều, yêu vô tận, yêu tới khi hai đứa già nhăn nheo luôn ^^"
    ],
    closing: "IU BÉ NHẤT TRÊN ĐỜI! Je t'aime! ❤️",
    signature: "Bùi Huỳnh Phước Tài (Anh người iu bé nhỏ mỏng manh dễ vỡ)",
  },

  // HỘP QUÀ BẤT NGỜ (THE GIFT BOX)
  gift: {
    ribbonColor: "#f472b6",
    boxColor: "#831843",
    surpriseTitle: "Món Quà Chuẩn Gu Fashionista Cho Bé Xu Xinh",
    surpriseMessage: "Thấy anh chọn đồ có gu chuẩn fashionista chưa :')) Nhưng điều tuyệt vời nhất không phải là món quà này, mà là nụ cười của Bé Xu Xinh khi mở nó ra! ❤️",
    subQuote: "Buổi đi chơi tối nay có gì sơ suất thì xí xóa bỏ qua cho anh nha, đừng đè đầu uýnh anh tội nghiệp :'( Năm sau tròn 22 tuổi anh hứa làm quả sinh nhật còn \"dè de dé de\" hoành tráng hơn nữa!",
  },

  // ALBUM ẢNH KỶ NIỆM (OUR MEMORIES)
  memories: [
    {
      id: "mem-1",
      url: "/photos/anh1.jpg",
      title: "Khoảnh khắc 1",
      date: "",
      location: "",
      caption: "",
      aspectRatio: "portrait"
    },
    {
      id: "mem-2",
      url: "/photos/anh2.jpg",
      title: "Khoảnh khắc 2",
      date: "",
      location: "",
      caption: "",
      aspectRatio: "portrait"
    },
    {
      id: "mem-3",
      url: "/photos/anh3.jpg",
      title: "Khoảnh khắc 3",
      date: "",
      location: "",
      caption: "",
      aspectRatio: "portrait"
    },
    {
      id: "mem-4",
      url: "/photos/anh4.jpg",
      title: "Khoảnh khắc 4",
      date: "",
      location: "",
      caption: "",
      aspectRatio: "square"
    },
    {
      id: "mem-5",
      url: "/photos/anh5.jpg",
      title: "Khoảnh khắc 5",
      date: "",
      location: "",
      caption: "",
      aspectRatio: "portrait"
    },
    {
      id: "mem-6",
      url: "/photos/anh6.jpg",
      title: "Khoảnh khắc 6",
      date: "",
      location: "",
      caption: "",
      aspectRatio: "portrait"
    },
    {
      id: "mem-7",
      url: "/photos/anh7.jpg",
      title: "Khoảnh khắc 7",
      date: "",
      location: "",
      caption: "",
      aspectRatio: "square"
    },
    {
      id: "mem-8",
      url: "/photos/anh8.jpg",
      title: "Khoảnh khắc 8",
      date: "",
      location: "",
      caption: "",
      aspectRatio: "portrait"
    }
  ],

  // KHU VỰC TƯƠNG TÁC CHÚC MỪNG (CELEBRATION)
  celebration: {
    cakeTitle: "Chiếc Bánh Sinh Nhật Tuổi 21 Của Bé Xu Xinh",
    cakeSubtitle: "Úm ba la xì bùa mọi muộn phiền tan biến! Bé Xu Xinh hãy nhắm mắt ước một điều rồi thổi nến nha ✨",
    wishPrompt: "GỬI MỘT ĐIỀU ƯỚC 🌠",
    wishesPlaceholder: "Viết điều ước gửi đến vũ trụ cho tuổi 21 rực rỡ của Bé Xu Xinh...",
    initialWishes: [
      {
        id: "wish-1",
        sender: "Bùi Huỳnh Phước Tài (Anh người iu bé nhỏ)",
        content: "Chúc bé iu của anh tuổi 21 mau ăn chóng lớn, khỏe re, cười tít mắt mỗi ngày và thương anh nhiều hơn nha! ❤️",
        timestamp: "Vừa xong",
        starColor: "#f472b6"
      },
      {
        id: "wish-2",
        sender: "Đại diện toàn thể bà con lối xóm 4 phương 8 hướng",
        content: "Chúc Bé Xu Xinh học hành công việc đầu xuôi đuôi lọt, cầu gì được nấy, khum cúp tiết nữa nha! 🌟",
        timestamp: "Hôm nay",
        starColor: "#fbbf24"
      },
      {
        id: "wish-3",
        sender: "Vũ Trụ & Dải Ngân Hà",
        content: "Hôm nay 30/10, cả vũ trụ nín thở chúc mừng sinh nhật thiên thần Bé Xu Xinh tròn 21 tuổi! 💫",
        timestamp: "Hôm nay",
        starColor: "#c084fc"
      }
    ]
  },

  // ÂM NHẠC NỀN (BACKGROUND MUSIC)
  audio: {
    title: "Giai Điệu Ngân Hà Tặng Bé Xu Xinh",
    artist: "Phước Tài & Celestial Stardust Piano",
    src: "/music/birthday.mp3",
    autoPlayAfterGate: true,
    enableFallbackSynthesizer: true,
  }
};
