/* Trang tuyển dụng: dữ liệu vị trí, popup và form ứng tuyển (gửi vào Google Form). */
/* =====================================================================
   ẢNH (chỉ dùng bên trong popup vị trí, làm ảnh trang trí)
   Ảnh dùng chung nằm ở thư mục /images/ của website (ngang hàng với /tuyendung/).
   ===================================================================== */
var IMAGES = {
  facade_night:    "Mặt tiền Hanoi Neighbors lên đèn buổi tối",
  sofa_skylight:   "Góc sofa dưới giếng trời",
  facade_shutters: "Mặt tiền với cửa chớp và đèn treo",
  bar_crowd:       "Hàng xóm quây quần bên quầy bar",
  serving_sofa:    "Phục vụ khách ở góc sofa",
  coffee_waffle:   "Ly cà phê, bánh waffle và tờ báo",
  bar_counter:     "Quầy bar với máy pha cà phê",
  cup_menu:        "Tách cà phê và thực đơn trên bàn gỗ",
  courtyard:       "Sân trong nhìn từ trên cao",
  staff_sunset:    "Một ca làm trong nắng chiều",
  sofa_art:        "Góc sofa với tranh và gối"
};
function imgUrl(key){ return "/images/" + key + ".jpg"; }
function imgAlt(key){ return IMAGES[key]; }

/* =====================================================================
   NỘI DUNG 6 VỊ TRÍ (giữ nguyên văn từ các trang Gamma)
   t = tiêu đề mục, d = nội dung (cho phép <b> để in đậm)
   ===================================================================== */
var PLACES = ["114 Tuệ Tĩnh, Hai Bà Trưng, Hà Nội", "8 Nguyễn Thiếp, Ba Đình, Hà Nội"];
var WHY_PHOTOS = ["bar_crowd", "serving_sofa"];

var JOBS = [
  {
    value:"QUẢN LÝ CỬA HÀNG", title:"QUẢN LÝ CỬA HÀNG", count:"03",
    pay:"10.000.000 – 15.000.000 VNĐ/ tháng", payNote:"(tuỳ năng lực)",
    hero:"facade_night",
    tasks:{ h:"Bạn sẽ làm gì tại Hanoi Neighbors?", items:[
      {t:"Quản lý nhân sự", d:"Tuyển dụng, đào tạo và quản lý đội ngũ nhân sự."},
      {t:"Điều phối công việc", d:"Sắp xếp lịch làm việc, tổ chức họp nhân viên định kỳ hàng tháng."},
      {t:"Đảm bảo chất lượng", d:"Kiểm soát chất lượng dịch vụ, chăm sóc khách hàng."},
      {t:"Quản lý vật liệu", d:"Theo dõi, kiểm soát nguyên vật liệu, tài sản và cơ sở vật chất của cửa hàng."},
      {t:"Quản lý nhân viên", d:"Tính lương, chấm công, quản lý chế độ phúc lợi nhân viên."},
      {t:"Hỗ trợ vận hành", d:"Hỗ trợ công việc vận hành khi đông khách."},
      {t:"Xử lý vấn đề", d:"Xử lý các vấn đề phát sinh trong ca làm việc."},
      {t:"Nhiệm vụ khác", d:"Thực hiện các nhiệm vụ khác theo yêu cầu từ Ban Quản Lý."}
    ]},
    reqs:{ h:"Bạn cần gì để ứng tuyển?", photo:"sofa_skylight", items:[
      {t:"Kinh nghiệm quản lý", d:"Có kinh nghiệm điều hành nhân sự."},
      {t:"Thời gian làm việc", d:"Tối thiểu <b>01 năm kinh nghiệm</b> ở vị trí tương đương."},
      {t:"Kỹ năng lợi thế", d:"Biết và từng làm việc với kỹ năng <b>Barista hoặc Bartender</b>."},
      {t:"Kỹ năng mềm", d:"Kỹ năng giao tiếp, xử lý tình huống, làm việc nhóm."},
      {t:"Phẩm chất cá nhân", d:"Chủ động, trách nhiệm, tinh thần phục vụ khách hàng."}
    ]},
    perks:{ h:"Chính sách phúc lợi & đãi ngộ", groups:[{ items:[
      {t:"Lương cứng", d:"10.000.000 – 15.000.000 VNĐ/ tháng (tuỳ năng lực).", feature:true},
      {t:"Tăng lương", d:"Xét duyệt tăng lương định kỳ."},
      {t:"Thưởng", d:"Thưởng KPI + Thưởng Lễ Tết."},
      {t:"Hỗ trợ ăn uống", d:"Hỗ trợ tiền ăn: 30.000 VNĐ/ca."},
      {t:"Phương tiện", d:"Hỗ trợ gửi xe hàng tháng."},
      {t:"Làm thêm giờ", d:"Lương nhân đôi sau 23h."},
      {t:"Môi trường", d:"Party nội bộ hàng tháng, môi trường vui vẻ, cởi mở."}
    ]}]},
    why:{ h:"Tại sao bạn nên gia nhập Hanoi Neighbors?", items:[
      {t:"Không gian sáng tạo", d:"Được làm việc trong một không gian thân thiện, chuyên nghiệp và đầy cảm hứng."},
      {t:"Văn hóa độc đáo", d:"Nơi bạn được sống đúng chất mình, chỉ cần có điểm chung: sự tử tế."},
      {t:"Cơ hội phát triển", d:"Công việc vừa vui - vừa thử thách - vừa có cơ hội phát triển."},
      {t:"Cộng đồng gắn kết", d:"Một cửa hàng tuyệt vời bắt đầu từ những người hàng xóm tuyệt vời."}
    ]}
  },
  {
    value:"TRƯỞNG CA / TRỢ LÝ QUẢN LÝ", title:"TRƯỞNG CA/TRỢ LÝ QUẢN LÝ", count:"03",
    pay:"8.500.000 – 12.000.000 VNĐ/ tháng", payNote:"(tuỳ năng lực)",
    hero:"facade_shutters",
    tasks:{ h:"Bạn sẽ làm gì tại vị trí này?", items:[
      {t:"Hỗ trợ Quản lý Cửa hàng", d:"Hỗ trợ Quản lý Cửa hàng trong công tác vận hành hàng ngày."},
      {t:"Đào tạo và giám sát nhân viên", d:"Đào tạo, giám sát và hỗ trợ nhân viên trong ca làm việc."},
      {t:"Kiểm soát vật liệu", d:"Theo dõi, kiểm soát nguyên vật liệu, cơ sở vật chất."},
      {t:"Báo cáo định kỳ", d:"Duy trì báo cáo định kỳ với Quản lý cửa hàng."},
      {t:"Chăm sóc khách hàng", d:"Chăm sóc khách hàng, đảm bảo trải nghiệm dịch vụ tốt nhất."},
      {t:"Hỗ trợ vận hành", d:"Trực tiếp tham gia hỗ trợ vận hành quán khi đông khách."},
      {t:"Xử lý tình huống", d:"Xử lý nhanh chóng các tình huống phát sinh trong ca."},
      {t:"Công việc khác", d:"Thực hiện các công việc khác theo yêu cầu từ cấp trên."}
    ]},
    reqs:{ h:"Bạn cần gì để ứng tuyển?", items:[
      {d:"Có kinh nghiệm quản lý hoặc điều hành nhân sự."},
      {d:"Tối thiểu <b>06 tháng kinh nghiệm</b> ở vị trí tương đương."},
      {d:"Biết kỹ năng <b>Barista hoặc Bartender</b>."},
      {d:"Chủ động, tinh thần trách nhiệm, giao tiếp tốt."},
      {d:"Sẵn sàng học hỏi và đồng hành lâu dài."}
    ]},
    perks:{ h:"Chính sách phúc lợi & đãi ngộ", groups:[
      { label:"Lương thưởng hấp dẫn", items:[
        {t:"Lương cứng:", d:"8.500.000 – 12.000.000 VNĐ/ tháng (tuỳ năng lực).", feature:true},
        {d:"<b>Lương nhân đôi sau 23h.</b>"},
        {d:"<b>Thưởng nhân viên xuất sắc hàng tháng.</b>"},
        {d:"<b>Xét duyệt tăng lương định kỳ.</b>"},
        {d:"<b>Thưởng Tết.</b>"}
      ]},
      { label:"Phúc lợi khác", items:[
        {d:"<b>Hỗ trợ gửi xe hàng tháng.</b>"},
        {d:"Party nội bộ hàng tháng, môi trường vui vẻ, gắn kết."}
      ]}
    ]},
    why:{ h:"Tại sao bạn nên gia nhập Hanoi Neighbors?", items:[
      {t:"Môi trường làm việc", d:"Ở Hanoi Neighbors, Trưởng ca không chỉ là người quản lý ca làm mà còn là <strong>người giữ lửa cho không khí quán mỗi ngày</strong>. Bạn sẽ được trao quyền để chủ động sắp xếp, vận hành và xây dựng trải nghiệm tốt nhất cho cả khách hàng và đồng đội – trong một môi trường luôn đề cao sự <strong>chân thành, tôn trọng và hỗ trợ lẫn nhau</strong>."},
      {t:"Phát triển kỹ năng leader", d:"Bạn sẽ có cơ hội trau dồi kỹ năng quản lý, giao tiếp, xử lý tình huống và chăm sóc khách hàng chuyên nghiệp. Công việc tại Hanoi Neighbors không chỉ giúp bạn rèn luyện sự <strong>chủ động, linh hoạt và tinh tế</strong>, mà còn là bước đệm tuyệt vời nếu bạn muốn theo đuổi sự nghiệp trong ngành F&amp;B hoặc bất kỳ môi trường dịch vụ nào."}
    ]}
  },
  {
    value:"BAR LEAD", title:"BAR LEAD (Trưởng Bộ Phận Bar)", count:"03",
    pay:"8.000.000 – 10.000.000 VNĐ/ tháng", payNote:"(tuỳ năng lực)",
    hero:"coffee_waffle",
    tasks:{ h:"Bạn sẽ làm gì tại vị trí này?", items:[
      {t:"Đào tạo và hỗ trợ", d:"Đào tạo nhân viên mới và đồng hành, hỗ trợ nhân viên cũ nâng cao kỹ năng."},
      {t:"Quản lý kho", d:"Kiểm soát kho nguyên vật liệu và cơ sở vật chất thuộc bộ phận Bar."},
      {t:"Đảm bảo chất lượng", d:"Đảm bảo chất lượng đồ uống, kiểm soát thời gian phục vụ."},
      {t:"Vệ sinh", d:"Duy trì vệ sinh quầy bar và khu vực làm việc."},
      {t:"Tổ chức họp", d:"Tổ chức cuộc họp nội bộ Bar tối thiểu 1 lần/tháng."},
      {t:"Phát triển sản phẩm", d:"Nghiên cứu, phát triển và đề xuất đồ uống mới."},
      {t:"Báo cáo", d:"Làm báo cáo hàng tháng và chịu trách nhiệm toàn bộ hoạt động của bộ phận Bar."}
    ]},
    shifts:{ h:"Thời gian làm việc", items:[["Ca sáng","7:45 – 16:30"],["Ca tối","16:00 – 24:00"]], notes:["Full-time linh hoạt (26 công/tháng, ca 8 tiếng)"] },
    reqs:{ h:"Bạn cần gì để ứng tuyển?", photo:"bar_counter", items:[
      {t:"Kinh nghiệm", d:"Có tối thiểu <b>06 tháng kinh nghiệm</b> ở vị trí tương đương."},
      {t:"Kỹ năng chuyên môn", d:"Thành thạo kỹ năng <b>Barista (có kinh nghiệm với cà phê máy) hoặc Bartender</b>."},
      {t:"Phẩm chất cá nhân", d:"Nhanh nhẹn, thân thiện, giao tiếp tốt."},
      {t:"Thái độ làm việc", d:"Chăm chỉ, trung thực, có tinh thần trách nhiệm cao."}
    ]},
    perks:{ h:"Chính sách phúc lợi & đãi ngộ", groups:[{ items:[
      {t:"Lương cứng", d:"8.000.000 – 10.000.000 VNĐ/ tháng (tuỳ năng lực)", feature:true},
      {t:"Lương sau 23h", d:"Lương nhân đôi sau 23h"},
      {t:"Phúc lợi", d:"Hỗ trợ gửi xe, thưởng xuất sắc, party hàng tháng"},
      {d:"<b>Thưởng nhân viên xuất sắc hàng tháng.</b>"},
      {d:"<b>Party nội bộ hàng tháng, môi trường cởi mở, gắn kết.</b>"},
      {d:"<b>Xét duyệt tăng lương định kỳ.</b>"},
      {d:"Thưởng Tết."}
    ]}]},
    why:{ h:"Tại sao bạn nên gia nhập Hanoi Neighbors?", items:[
      {t:"Không gian sáng tạo", d:"Được làm việc trong một không gian thân thiện, chuyên nghiệp và đầy cảm hứng."},
      {t:"Văn hóa độc đáo", d:"Nơi bạn được sống đúng chất mình, chỉ cần có điểm chung: sự tử tế."},
      {t:"Cơ hội phát triển", d:"Công việc vừa vui - vừa thử thách - vừa có cơ hội phát triển."},
      {t:"Cộng đồng gắn kết", d:"Một cửa hàng tuyệt vời bắt đầu từ những người Hàng xóm tuyệt vời."}
    ]}
  },
  {
    value:"NHÂN VIÊN PHA CHẾ", title:"NHÂN VIÊN PHA CHẾ (FULL-TIME)", count:"05",
    pay:"7.500.000 – 9.000.000 VNĐ/ tháng", payNote:"(tùy năng lực)",
    hero:"cup_menu",
    tasks:{ h:"Bạn sẽ làm gì?", photo:"coffee_waffle", items:[
      {t:"Chuẩn bị nguyên vật liệu và dụng cụ", d:"Chuẩn bị nguyên vật liệu và dụng cụ quầy bar trước mỗi ca làm việc."},
      {t:"Pha chế đồ uống", d:"Trực tiếp pha chế các món trong thực đơn, đảm bảo chất lượng &amp; thẩm mỹ."},
      {t:"Vệ sinh an toàn", d:"Giữ gìn vệ sinh, đảm bảo an toàn thực phẩm tại quầy bar."},
      {t:"Tư vấn khách hàng", d:"Gợi ý, tư vấn món cho khách khi cần."},
      {t:"Phát triển menu", d:"Tham gia đóng góp ý tưởng, phát triển menu đồ uống mới."},
      {t:"Hỗ trợ đồng đội", d:"Hỗ trợ đồng đội khi quán đông khách."},
      {t:"Nhiệm vụ khác", d:"Thực hiện các nhiệm vụ khác theo yêu cầu từ Quản lý."}
    ]},
    reqs:{ h:"Bạn cần gì để ứng tuyển?", items:[
      {t:"Kinh nghiệm", d:"Có kinh nghiệm pha chế từ <b>06 tháng trở lên</b>.<br>Biết pha cà phê máy là một lợi thế lớn."},
      {t:"Kỹ năng", d:"Nhanh nhẹn, thân thiện, giao tiếp tốt."},
      {t:"Phẩm chất", d:"Chăm chỉ, trung thực, linh hoạt và có trách nhiệm với công việc."}
    ]},
    shifts:{ h:"Thời gian làm việc", items:[["Ca sáng","7:45 – 16:30"],["Ca tối","16:00 – 24:00"]], notes:["<em>Lương nhân đôi từ 23h – 24h</em>","Full-time linh hoạt (26 công/tháng, ca 8 tiếng)"] },
    perks:{ h:"Quyền lợi & Đãi ngộ", groups:[{ items:[
      {t:"Lương cứng khởi điểm", d:"7.500.000 – 9.000.000 VNĐ/ tháng (tùy năng lực)", feature:true},
      {t:"Lương nhân đôi", d:"Lương nhân đôi sau 23h"},
      {t:"Công/tháng", d:"Full-time linh hoạt"},
      {t:"Thưởng xuất sắc", d:"Thưởng nhân viên xuất sắc hàng tháng"},
      {t:"Party nội bộ", d:"Party nội bộ hàng tháng – làm hết sức, quẩy hết mình"},
      {t:"Tăng lương", d:"Xét duyệt tăng lương định kỳ"},
      {t:"Thưởng Tết", d:"Thưởng Tết"}
    ]}]},
    order:["tasks","reqs","shifts","perks"],
    why:{ h:"Tại sao bạn nên gia nhập Hanoi Neighbors?", items:[
      {t:"Môi trường làm việc", d:"Tại Hanoi Neighbors, bạn không chỉ pha chế – bạn là <strong>người kể chuyện qua từng ly cà phê, tách trà và món cocktail</strong>. Chúng mình tin rằng từng hương vị đều có thể kết nối con người, và bạn chính là người góp phần tạo nên trải nghiệm đó. Môi trường làm việc thân thiện, sáng tạo và tràn đầy cảm hứng đang chờ bạn."},
      {t:"Cơ hội phát triển", d:"Bạn sẽ được <strong>training bài bản về kỹ thuật pha chế, kiến thức đồ uống</strong> từ cà phê, trà đến cocktail. Không chỉ vậy, công việc còn giúp bạn rèn luyện tư duy dịch vụ, khả năng làm việc nhóm, xử lý áp lực và phát triển tư duy thẩm mỹ, sáng tạo trong từng chi tiết nhỏ. Đây sẽ là nền tảng vững chắc nếu bạn muốn theo đuổi nghề pha chế lâu dài."}
    ]}
  },
  {
    value:"NHÂN VIÊN BÀN - FULLTIME", title:"NHÂN VIÊN PHỤC VỤ (FULL-TIME)", count:"08",
    pay:"7.000.000 – 8.000.000 VNĐ/ tháng", payNote:"(tuỳ năng lực)",
    hero:"courtyard",
    tasks:{ h:"Bạn sẽ làm gì ở vị trí này?", photo:"staff_sunset", items:[
      {d:"Dọn dẹp, giữ gìn vệ sinh không gian quán"},
      {d:"Đón tiếp và phục vụ khách hàng với thái độ thân thiện"},
      {d:"Ghi nhận order đồ uống, món ăn và chuyển thông tin đến bộ phận Bar/Bếp"},
      {d:"Phục vụ đồ ăn, thức uống đến bàn khách"},
      {d:"Dọn dẹp bàn sau khi khách dùng xong"},
      {d:"Thanh toán hóa đơn cho khách hàng"},
      {d:"Hỗ trợ đồng đội trong giờ cao điểm"},
      {d:"Thực hiện các công việc khác theo sự phân công của Quản lý"}
    ]},
    shifts:{ h:"Thời gian làm việc", lead:"Full-time linh hoạt (26 công/tháng, ca 8 tiếng)", items:[["Ca sáng","7:45 – 16:30"],["Ca tối","16:00 – 24:00"]], notes:[] },
    reqs:{ h:"Bạn cần gì để ứng tuyển?", items:[
      {d:"Yêu thích công việc dịch vụ"},
      {d:"Nhanh nhẹn, thân thiện, giao tiếp tốt"},
      {d:"Có kinh nghiệm phục vụ từ 06 tháng trở lên"}
    ]},
    perks:{ h:"Chính sách phúc lợi & đãi ngộ", groups:[{ items:[
      {t:"Lương cứng hàng tháng", d:"7.000.000 – 8.000.000 VNĐ/ tháng (tuỳ năng lực)", feature:true},
      {t:"Lương nhân đôi", d:"Sau 23h"},
      {t:"Thưởng", d:"Thưởng Tết &amp; Tháng lương 13"},
      {d:"Hỗ trợ gửi xe hàng tháng."},
      {d:"Thưởng nhân viên xuất sắc hàng tháng."},
      {d:"Party nội bộ hàng tháng, môi trường thân thiện, vui vẻ."},
      {d:"Xét duyệt tăng lương định kỳ."}
    ]}]},
    why:{ h:"Tại sao bạn nên gia nhập Hanoi Neighbors?", items:[
      {t:"Môi trường làm việc", d:"Tại Hanoi Neighbors, bạn không chỉ đơn giản là một nhân viên, bạn là một người hàng xóm thân thiết. Chúng mình tin vào sức mạnh của những kết nối nhỏ bé, mỗi ngày cùng nhau tạo ra một không gian dễ chịu, nơi ai cũng có thể là chính mình. Đây là nơi bạn có thể làm việc với nụ cười, được lắng nghe và phát triển trong một môi trường chân thành mà chuyên nghiệp."},
      {t:"Cơ hội phát triển", d:"Công việc không chỉ gói gọn trong việc phục vụ bàn. Bạn sẽ được training đầy đủ về kỹ năng giao tiếp, chăm sóc khách hàng, vận hành quán cà phê, và hiểu sâu hơn về văn hóa dịch vụ. Đây là nơi tuyệt vời để bạn rèn luyện sự tỉ mỉ, linh hoạt và xây dựng tư duy phục vụ chuyên nghiệp – những kỹ năng hữu ích cho bất kỳ công việc nào sau này."}
    ]}
  },
  {
    value:"NHÂN VIÊN BÀN - PARTTIME", title:"NHÂN VIÊN PHỤC VỤ (PART-TIME)", count:"15",
    pay:"22.000 – 30.000 VNĐ/giờ", payNote:"",
    hero:"sofa_art",
    tasks:{ h:'Bạn sẽ làm gì khi gia nhập "hàng xóm"?', items:[
      {t:"Dọn dẹp, giữ không gian quán", d:"Dọn dẹp, giữ không gian quán luôn sạch đẹp, ấm cúng."},
      {t:"Chào đón khách", d:"Chào đón khách bằng nụ cười tươi nhất."},
      {t:"Nhận order", d:"Nhận order món ăn, đồ uống và chuyển cho bộ phận Bar/Bếp."},
      {t:"Phục vụ món", d:"Phục vụ món lên bàn, đảm bảo khách luôn hài lòng."},
      {t:"Dọn dẹp sau khi khách dùng xong", d:"Dọn dẹp sau khi khách dùng xong."},
      {t:"Thanh toán hóa đơn", d:"Thanh toán hóa đơn."},
      {t:"Hỗ trợ team", d:"Hỗ trợ team trong giờ cao điểm (vì hàng xóm tốt là hàng xóm biết giúp nhau!)."}
    ]},
    shifts:{ h:"Thời gian làm việc linh hoạt", items:[["Ca sáng","7:45 – 12:00"],["Ca chiều","12:00 – 18:00"],["Ca tối","18:00 – 24:00"]], notes:["<em>(Lương nhân đôi từ 23h – 24h)</em>","5 ca/tuần, ca 5 tiếng (tối thiểu)"] },
    reqs:{ h:"Bạn cần gì để ứng tuyển?", photo:"serving_sofa", items:[
      {t:"Tính cách", d:"Chỉ cần <b>nhanh nhẹn, vui vẻ, giao tiếp tốt</b>."},
      {t:"Kinh nghiệm", d:"<b>Không yêu cầu kinh nghiệm</b> — bạn cứ tới, tụi mình sẽ chỉ bạn từ A tới Z!"},
      {t:"Thái độ", d:"Thái độ <b>chăm chỉ, trung thực, linh hoạt</b>."}
    ]},
    perks:{ h:"Chính sách phúc lợi & đãi ngộ", groups:[{ items:[
      {t:"Lương cứng:", d:"22.000 – 30.000 VNĐ/giờ", feature:true},
      {d:"Lương nhân đôi sau 23h &amp; Hỗ trợ gửi xe hàng tháng"},
      {d:"Thưởng Tết"},
      {d:"Xét duyệt tăng lương định kỳ"},
      {t:"Party nội bộ hàng tháng", d:"Quẩy hết mình cùng anh em hàng xóm"},
      {d:"Thưởng nhân viên xuất sắc hàng tháng"}
    ]}]},
    why:{ h:"Tại sao bạn nên gia nhập Hanoi Neighbors?", items:[
      {t:"Môi trường làm việc", d:"Tại Hanoi Neighbors, bạn không chỉ đơn giản là một nhân viên, bạn là <strong>một người hàng xóm thân thiết</strong>. Chúng mình tin vào sức mạnh của những kết nối nhỏ bé, mỗi ngày cùng nhau tạo ra một không gian dễ chịu, nơi ai cũng có thể là chính mình. Đây là nơi bạn có thể làm việc với nụ cười, được lắng nghe và phát triển trong một môi trường <strong>chân thành mà chuyên nghiệp.</strong>"},
      {t:"Cơ hội phát triển", d:"Công việc không chỉ gói gọn trong việc phục vụ bàn. Bạn sẽ được training đầy đủ về <strong>kỹ năng giao tiếp, chăm sóc khách hàng, vận hành quán cà phê</strong>, và hiểu sâu hơn về <strong>văn hóa dịch vụ</strong>. Đây là nơi tuyệt vời để bạn rèn luyện sự <strong>tỉ mỉ, linh hoạt</strong> và xây dựng <strong>tư duy phục vụ chuyên nghiệp</strong> – những kỹ năng hữu ích cho bất kỳ công việc nào sau này."}
    ]}
  }
];

/* =====================================================================
   BIỂU TƯỢNG
   ===================================================================== */
var ICON = {
  pin:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.6"/></svg>',
  arrow:'<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 8h11M9 4l4 4-4 4"/></svg>',
  check:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  sun:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  sunset:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M17 18a5 5 0 0 0-10 0M12 9V2M4.2 10.2l1.4 1.4M1 18h2M21 18h2M18.4 11.6l1.4-1.4M23 22H1M16 5l-4-3-4 3"/></svg>',
  moon:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
  cash:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.6"/><path d="M6 10v4M18 10v4"/></svg>',
  trend:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/></svg>',
  gift:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M19 12v9H5v-9M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5"/></svg>',
  cup:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M17 8h1a4 4 0 0 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z"/><path d="M6 2v2M10 2v2M14 2v2"/></svg>',
  bike:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6h2l3 11.5M5.5 17.5L9 9h6l-3 8.5H5.5"/></svg>',
  party:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5.8 11.3L2 22l10.7-3.8"/><path d="M4 3h.01M22 8h.01M15 2h.01M22 20h.01M22 2l-2.2.7a3 3 0 0 0-2 3.3c.2 1-.5 2-1.6 2h-.4M22 13l-.8-.3a2 2 0 0 0-2.5 1l-.3.7"/><path d="M11 13c1.9 1.9 2.8 4.1 2 4.9-.8.8-3-.1-4.9-2-1.9-1.9-2.8-4.1-2-4.9.8-.8 3 .1 4.9 2z"/></svg>',
  calendar:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
  heart:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21.2l8.8-8.8a5.5 5.5 0 0 0 0-7.8z"/></svg>',
  star:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg>'
};
function perkIcon(text){
  var s = text.toLowerCase();
  if (/nhân đôi|23h|làm thêm giờ/.test(s)) return ICON.moon;
  if (/tăng lương/.test(s)) return ICON.trend;
  if (/gửi xe|phương tiện/.test(s)) return ICON.bike;
  if (/tiền ăn|ăn uống/.test(s)) return ICON.cup;
  if (/party/.test(s)) return ICON.party;
  if (/thưởng|tết/.test(s)) return ICON.gift;
  if (/công\/tháng/.test(s)) return ICON.calendar;
  if (/lương/.test(s)) return ICON.cash;
  if (/môi trường/.test(s)) return ICON.heart;
  return ICON.star;
}
function shiftIcon(label){
  var s = label.toLowerCase();
  if (s.indexOf("sáng") > -1) return ICON.sun;
  if (s.indexOf("chiều") > -1) return ICON.sunset;
  return ICON.moon;
}

/* =====================================================================
   DỰNG THẺ VỊ TRÍ
   ===================================================================== */
function photo(key, w, cls, caption){
  return '<figure class="polaroid ' + (cls||'') + '"><span class="tape"></span><img src="' + imgUrl(key) + '" alt="' + imgAlt(key) + '" loading="lazy" decoding="async">' +
         (caption ? '<figcaption>' + caption + '</figcaption>' : '') + '</figure>';
}

// Biểu tượng nghề cho từng thẻ vị trí (thay cho ảnh)
var ROLE_ICON = [
  // Quản lý cửa hàng: mái nhà / cửa hàng
  '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5L5 4h14l2 5.5"/><path d="M3 9.5a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0"/><path d="M5 12v8h14v-8"/><path d="M10 20v-5h4v5"/></svg>',
  // Trưởng ca: bảng phân ca
  '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1"/><path d="M9 10l1.5 1.5L13 9M9 15.5l1.5 1.5L13 14.5M15 10.5h1M15 16h1"/></svg>',
  // Bar Lead: bình lắc
  '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2h4l-.5 3h-3z"/><path d="M9 5h6l1 3H8z"/><path d="M8 8h8l-1.2 12.2a2 2 0 0 1-2 1.8h-1.6a2 2 0 0 1-2-1.8z"/><path d="M9 13h6"/></svg>',
  // Pha chế: tách cà phê
  '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h12v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M16 10h1.5a2.5 2.5 0 0 1 0 5H16"/><path d="M3 21h14"/><path d="M8 3c-.6.8-.6 1.7 0 2.5M11.5 3c-.6.8-.6 1.7 0 2.5"/></svg>',
  // Phục vụ full-time: khay phục vụ
  '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17h18"/><path d="M4.5 17a7.5 7.5 0 0 1 15 0"/><path d="M12 9.5V8M10.5 8h3"/><path d="M5 20h14"/></svg>',
  // Phục vụ part-time: đồng hồ
  '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5M9.5 2h5M12 2v3"/></svg>'
];

var grid = document.getElementById("jobGrid");
JOBS.forEach(function(job, i){
  var b = document.createElement("button");
  b.type = "button";
  b.className = "job-card";
  b.setAttribute("data-job", i);
  b.innerHTML =
    '<span class="top"><span class="no">' + (i+1) + '</span><span class="role-ic">' + ROLE_ICON[i] + '</span></span>' +
    '<p class="name">' + job.value + '</p>' +
    '<span class="meta"><span class="chip">Số lượng cần tuyển: ' + job.count + '</span><span class="chip pay">' + job.pay + '</span></span>' +
    '<span class="more">Xem chi tiết ' + ICON.arrow + '</span>';
  b.addEventListener("click", function(){ openJob(i, true); });
  grid.appendChild(b);
});

/* =====================================================================
   DỰNG NỘI DUNG POPUP
   ===================================================================== */
function sectionHead(n, h){
  return '<div class="m-h rv"><span class="idx">0' + n + '</span><h3>' + h + '</h3></div>';
}
function renderTasks(sec){
  var numbered = sec.items.some(function(x){ return x.t; });
  var list = '<div class="tasks' + (sec.photo ? ' one' : '') + '">' + sec.items.map(function(x, k){
    return '<div class="task rv' + (x.t ? '' : ' plain') + '"><span class="num">' + (k+1) + '</span>' +
      (x.t ? '<strong>' + x.t + '</strong>' : '') + '<span>' + x.d + '</span></div>';
  }).join('') + '</div>';
  if (!sec.photo) return list;
  return '<div class="split"><div>' + list + '</div><div class="side rv">' + photo(sec.photo, 700, '', imgAlt(sec.photo)) + '</div></div>';
}
function renderShifts(sec){
  return (sec.lead ? '<p class="rv" style="margin:0 0 14px;font-weight:600">' + sec.lead + '</p>' : '') +
    '<div class="shifts">' + sec.items.map(function(s){
      return '<div class="shift rv"><span class="ic">' + shiftIcon(s[0]) + '</span><span><small>' + s[0] + '</small><b>' + s[1] + '</b></span></div>';
    }).join('') + '</div>' +
    (sec.notes && sec.notes.length ? '<ul class="shift-notes rv">' + sec.notes.map(function(n){ return '<li>' + n + '</li>'; }).join('') + '</ul>' : '');
}
function renderReqs(sec){
  var list = '<ul class="checks">' + sec.items.map(function(x){
    return '<li class="rv' + (x.t ? '' : ' plain') + '"><span class="ck">' + ICON.check + '</span><div>' +
      (x.t ? '<strong>' + x.t + '</strong>' : '') + '<span>' + x.d + '</span></div></li>';
  }).join('') + '</ul>';
  if (!sec.photo) return list;
  return '<div class="split rev"><div class="side rv">' + photo(sec.photo, 700, '', imgAlt(sec.photo)) + '</div><div>' + list + '</div></div>';
}
function renderPerks(sec){
  return sec.groups.map(function(g){
    return '<div class="perk-group">' + (g.label ? '<p class="perk-group-label rv">' + g.label + '</p>' : '') +
      '<div class="perks">' + g.items.map(function(x){
        var cls = 'perk rv' + (x.feature ? ' feature' : '') + (x.t ? '' : ' solo');
        return '<div class="' + cls + '"><span class="ic">' + perkIcon((x.t||'') + ' ' + x.d) + '</span>' +
          (x.feature ? '<div>' : '') +
          (x.t ? '<strong>' + x.t + '</strong>' : '') + '<span>' + x.d + '</span>' +
          (x.feature ? '</div>' : '') + '</div>';
      }).join('') + '</div></div>';
  }).join('');
}
function renderWhy(sec){
  return '<div class="why-photos">' + WHY_PHOTOS.map(function(k){ return '<div class="rv">' + photo(k, 900, '', imgAlt(k)) + '</div>'; }).join('') + '</div>' +
    '<div class="why">' + sec.items.map(function(x){
      return '<div class="rv"><b>' + x.t + '</b><p>' + x.d + '</p></div>';
    }).join('') + '</div>';
}

function renderJob(job, i){
  var order = job.order || ["tasks","shifts","reqs","perks"];
  var renderers = {tasks:renderTasks, shifts:renderShifts, reqs:renderReqs, perks:renderPerks};
  var n = 0, body = '';
  order.forEach(function(key){
    if (!job[key]) return;
    n++;
    body += '<section class="m-sec">' + sectionHead(n, job[key].h) + renderers[key](job[key]) + '</section>';
  });
  n++;
  body += '<section class="m-sec">' + sectionHead(n, job.why.h) + renderWhy(job.why) + '</section>';

  return '' +
    '<div class="m-hero">' +
      '<img class="sheet-logo" src="/images/logo-ngang.png" alt="Hanoi Neighbors" width="760" height="252">' +
      '<div class="photo rv">' + photo(job.hero, 1000, '', 'Hanoi Neighbors') + '</div>' +
      '<div class="txt">' +
        '<span class="m-eyebrow rv">Tuyển dụng · Vị trí ' + (i+1) + '/' + JOBS.length + '</span>' +
        '<h2 class="m-title rv" id="mTitle"><small>VỊ TRÍ:</small>' + job.title + '</h2>' +
        '<p class="rv" style="margin:0 0 10px;font-weight:700">Địa điểm làm việc:</p>' +
        '<ul class="places rv">' + PLACES.map(function(p){ return '<li>' + ICON.pin + '<span>' + p + '</span></li>'; }).join('') + '</ul>' +
        '<div class="stats rv">' +
          '<div class="stat"><small>Số lượng cần tuyển</small><b>' + job.count + '</b></div>' +
          '<div class="stat pay"><small>Lương cứng</small><b>' + job.pay + '</b>' + (job.payNote ? '<small style="color:#C8BFAF;letter-spacing:0;text-transform:none;font-weight:400">' + job.payNote + '</small>' : '') + '</div>' +
        '</div>' +
      '</div>' +
    '</div>' +
    body +
    '<div class="sheet-cta"><div class="inner"><span class="lbl">Đăng ký ứng tuyển<b>' + job.value + '</b></span>' +
      '<button type="button" class="apply-btn" data-apply="' + i + '">Đăng ký ứng tuyển ' + ICON.arrow + '</button></div></div>' +
    '<p class="m-end">Hy vọng chúng ta sẽ về chung một nhà!</p>';
}

/* =====================================================================
   MỞ / ĐÓNG POPUP
   - Đóng bằng: nút X, phím Esc, bấm ra ngoài, hoặc nút Back của điện thoại
   - Mỗi vị trí có link riêng: .../tuyen-dung.html#vi-tri-3
   ===================================================================== */
var modal = document.getElementById("jobModal");
var sheet = document.getElementById("sheet");
var sheetBody = document.getElementById("sheetBody");
var closeBtn = document.getElementById("closeBtn");
var current = -1, lastFocus = null, afterClose = null, observer = null;

function openJob(i, push){
  current = i;
  lastFocus = document.activeElement;
  sheetBody.innerHTML = renderJob(JOBS[i], i);
  sheet.scrollTop = 0;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("locked");
  if (push) history.pushState({hnbJob: i}, "", "#vi-tri-" + (i+1));
  setTimeout(function(){ closeBtn.focus({preventScroll:true}); }, 50);

  if (observer) observer.disconnect();
  var els = sheetBody.querySelectorAll(".rv");
  if ("IntersectionObserver" in window){
    observer = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting){ e.target.classList.add("in"); observer.unobserve(e.target); }
      });
    }, {root: sheet, rootMargin: "0px 0px -6% 0px", threshold: 0.08});
    els.forEach(function(el, k){
      el.style.transitionDelay = Math.min((k % 6) * 60, 300) + "ms";
      observer.observe(el);
    });
  } else {
    els.forEach(function(el){ el.classList.add("in"); });
  }
}

function doClose(){
  if (current < 0) return;
  current = -1;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("locked");
  if (observer) observer.disconnect();
  if (lastFocus && lastFocus.focus) lastFocus.focus({preventScroll:true});
  var fn = afterClose; afterClose = null;
  if (fn) setTimeout(fn, 60);
}

function requestClose(then){
  afterClose = then || null;
  if (history.state && typeof history.state.hnbJob === "number") {
    history.back(); // popstate sẽ gọi doClose
  } else {
    if (location.hash.indexOf("#vi-tri-") === 0) history.replaceState(null, "", location.pathname + location.search);
    doClose();
  }
}

window.addEventListener("popstate", function(){
  var m = location.hash.match(/^#vi-tri-(\d)$/);
  if (m && JOBS[m[1]-1]) { if (current !== m[1]-1) openJob(m[1]-1, false); }
  else doClose();
});

closeBtn.addEventListener("click", function(){ requestClose(); });
modal.querySelector("[data-close]").addEventListener("click", function(){ requestClose(); });
document.addEventListener("keydown", function(e){
  if (current < 0) return;
  if (e.key === "Escape") { e.preventDefault(); requestClose(); }
  if (e.key === "Tab") { // giữ phím Tab trong popup
    var f = sheet.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])');
    if (!f.length) return;
    var first = f[0], last = f[f.length-1];
    if (e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
  }
});

// Nút "Đăng ký ứng tuyển" trong popup: đóng popup, chọn sẵn vị trí, cuộn tới form
sheetBody.addEventListener("click", function(e){
  var btn = e.target.closest("[data-apply]");
  if (!btn) return;
  var job = JOBS[+btn.getAttribute("data-apply")];
  requestClose(function(){
    var r = document.querySelector('input[name="entry.1595190573"][value="' + job.value + '"]');
    if (r){ r.checked = true; document.getElementById("positionField").classList.remove("invalid"); }
    var card = document.getElementById("formCard");
    document.getElementById("dang-ky").scrollIntoView({behavior:"smooth"});
    card.classList.remove("flash"); void card.offsetWidth; card.classList.add("flash");
    setTimeout(function(){ document.getElementById("f-name").focus({preventScroll:true}); }, 700);
  });
});

// Mở thẳng một vị trí nếu link có #vi-tri-N
(function(){
  var m = location.hash.match(/^#vi-tri-(\d)$/);
  if (m && JOBS[m[1]-1]) openJob(m[1]-1, false);
})();

/* =====================================================================
   FORM: gửi thẳng vào Google Form gốc, câu trả lời vẫn đổ về Google Sheet cũ
   ===================================================================== */
(function(){
  var FORM_ACTION = "https://docs.google.com/forms/d/e/1FAIpQLSeyfA6ZGsqPMbRZbO2drSw0wOHY54GD2IWFonVqWfbqLgudlQ/formResponse";
  var DOB_ENTRY   = "entry.1331518805";

  var form   = document.getElementById("applyForm");
  var card   = document.getElementById("formCard");
  var btn    = document.getElementById("submitBtn");
  var errBox = document.getElementById("formError");
  var dob    = document.getElementById("f-dob");

  dob.max = new Date().toISOString().slice(0,10);

  function isValidPhone(v){
    var digits = v.replace(/[^\d]/g, "");
    return /^[+\d\s().-]+$/.test(v.trim()) && digits.length >= 9 && digits.length <= 12;
  }

  function validate(){
    var ok = true, first = null;
    form.querySelectorAll(".field[data-required]").forEach(function(f){
      var type = f.getAttribute("data-required"), valid = true;
      if (type === "text"){ valid = f.querySelector("input").value.trim() !== ""; }
      else if (type === "date"){ valid = !!dob.value && dob.value <= dob.max; }
      else if (type === "phone"){ valid = isValidPhone(f.querySelector("input").value); }
      else { valid = !!f.querySelector("input:checked"); }
      f.classList.toggle("invalid", !valid);
      if (!valid){ ok = false; if (!first) first = f; }
    });
    if (first){ first.scrollIntoView({behavior:"smooth", block:"center"}); }
    return ok;
  }

  function clearInvalid(e){
    var f = e.target.closest(".field");
    if (f && f.classList.contains("invalid")) f.classList.remove("invalid");
  }
  form.addEventListener("input", clearInvalid);
  form.addEventListener("change", clearInvalid);

  document.getElementById("clearBtn").addEventListener("click", function(){
    form.reset();
    form.querySelectorAll(".invalid").forEach(function(f){ f.classList.remove("invalid"); });
  });

  form.addEventListener("submit", function(e){
    e.preventDefault();
    errBox.style.display = "none";
    if (!validate()) return;

    if (document.getElementById("f-website").value){ card.classList.add("done"); return; }

    var data = new URLSearchParams();
    form.querySelectorAll("input[name], select[name]").forEach(function(el){
      if ((el.type === "radio" || el.type === "checkbox") && !el.checked) return;
      var v = el.value.trim();
      if (v !== "") data.append(el.name, v);
    });
    var parts = dob.value.split("-");
    data.append(DOB_ENTRY + "_year",  parts[0]);
    data.append(DOB_ENTRY + "_month", String(parseInt(parts[1],10)));
    data.append(DOB_ENTRY + "_day",   String(parseInt(parts[2],10)));

    btn.disabled = true; btn.textContent = "Đang gửi...";

    fetch(FORM_ACTION, { method:"POST", mode:"no-cors", body:data })
      .then(function(){
        card.classList.add("done");
        card.scrollIntoView({behavior:"smooth", block:"center"});
      })
      .catch(function(){ errBox.style.display = "block"; })
      .finally(function(){ btn.disabled = false; btn.textContent = "Gửi đăng ký"; });
  });
})();
