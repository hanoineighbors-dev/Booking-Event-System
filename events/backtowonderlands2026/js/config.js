/* Cấu hình trang. Sau khi deploy Apps Script, dán URL Web App vào API_URL.
   Để trống API_URL (hoặc thêm ?demo=1 vào địa chỉ trang) thì trang chạy chế độ thử, dữ liệu giả lưu trong trình duyệt. */
window.RH_CONFIG = {
  API_URL: 'https://script.google.com/macros/s/AKfycbyRaY4iM1nf7LZDbrryamAPaIVNyCuB8RM2TmAjaKC1UoOs3dtyXmq5VfRCLtV-Ni2O/exec',
  EVENT: {
    name: 'Back to the Rabbit Hole',
    date: '2026-10-31T20:30:00+07:00',
    whenText: 'Thứ Bảy 31.10 · Cửa hang mở 20:30',
    where: 'Sincerely, Hanoi Neighbors',
    address: 'Tầng 6, 131 Hoàng Cầu, Hà Nội',
    mapUrl: 'https://maps.google.com/?q=131+Ho%C3%A0ng+C%E1%BA%A7u,+H%C3%A0+N%E1%BB%99i',
    fanpage: '' // link fanpage để khách nhắn khi cần, để trống thì không hiện
  }
};
