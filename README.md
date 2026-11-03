# hanoineighbors.com

Website của Hanoi Neighbors. Chạy trên **GitHub Pages**: mỗi khi nhánh `main` thay đổi, GitHub tự build site bằng **Jekyll** (khoảng 1–2 phút) rồi đưa lên hanoineighbors.com. Không cần cài đặt hay server gì thêm.

## Sơ đồ site

```
/                       Trang chủ: giới thiệu, sự kiện, tuyển dụng, cơ sở
├── /events/            Danh sách sự kiện: "Sắp diễn ra" và "Đã diễn ra"
│   ├── /events/dragbrunch/             Trang đặt chỗ Dập Dìu Drag Brunch (trang riêng)
│   └── /events/backtowonderlands2026/  Halloween 2026 (trang riêng)
├── /tuyendung/         Tuyển dụng và form ứng tuyển
└── /404.html           Trang báo không tìm thấy
```

Luồng điều hướng: menu trên cùng (Sự kiện · Cơ sở · Tuyển dụng) và chân trang giống nhau ở mọi trang chính. Trang event riêng có link quay về `/events/` và trang chủ.

## Cấu trúc thư mục

```
_config.yml           Cấu hình chung: tên site, mô tả, ảnh chia sẻ, link mạng xã hội
_data/
  navigation.yml      Menu trên cùng và chân trang
  locations.yml       Các cơ sở (tên, địa chỉ, link chỉ đường)
  events.yml          Danh sách sự kiện, dùng cho trang chủ và /events/
_layouts/default.html Khung chung của mọi trang chính
_includes/            Các mảnh dùng lại: head, header, footer, thẻ sự kiện…
assets/css/site.css   Giao diện dùng chung (màu, chữ, menu, nút, thẻ sự kiện, chân trang)
assets/css/<trang>.css  Giao diện riêng từng trang (home, events, tuyendung)
assets/js/site.js     Hiệu ứng, tự chuyển sự kiện đã qua, đọc lịch Drag Brunch
assets/js/tuyendung.js  Dữ liệu vị trí và form tuyển dụng
images/               Ảnh dùng chung
events/<slug>/        Trang riêng của từng sự kiện (tự mang giao diện của mình)
event/                Chuyển hướng link cũ /event → /events/dragbrunch/
```

File **có** phần `---` ở đầu (front matter) sẽ được Jekyll ghép vào khung chung. File **không có** phần đó (như các trang trong `events/<slug>/`) được giữ nguyên, không bị đụng tới.

## Việc thường làm

### Thêm một sự kiện

1. Làm trang riêng của sự kiện trong thư mục `events/<ten-su-kien>/` (vd `events/noel2026/index.html`). Trang này tự do thiết kế. Nên có link quay về `/events/`.
2. Mở `_data/events.yml`, chép một mục có sẵn, sửa nội dung rồi đặt lên **đầu** danh sách:
   - `kind: one-off` cho sự kiện một đêm. **Bắt buộc** có `end` (giờ kết thúc, ghi kèm `+07:00`).
   - `kind: series` cho loại đặt chỗ theo buổi.
3. Lưu lại. Trang chủ và `/events/` tự hiện sự kiện mới. Qua giờ `end`, sự kiện tự chuyển sang "Đã diễn ra", không cần sửa gì thêm.

### Thêm hoặc sửa cơ sở

Sửa `_data/locations.yml`. Trang chủ, chân trang và thẻ sự kiện tự cập nhật.

> Form tuyển dụng (`tuyendung/index.html`) có danh sách cơ sở riêng, **phải viết y hệt** lựa chọn trong Google Form. Khi đổi tên cơ sở, sửa cả hai chỗ.

### Thêm một trang mới (vd Menu, Về chúng mình)

1. Tạo `menu/index.html` với phần đầu:
   ```
   ---
   title: Menu
   description: Một câu mô tả ngắn, hiện trên Google và khi chia sẻ link.
   css: [events]
   ---
   <div class="page-hero"><div class="wrap"><h1>Menu</h1></div></div>
   … nội dung …
   ```
   (`css: [events]` dùng lại phần đầu tối giản của trang sự kiện. Muốn giao diện riêng thì tạo `assets/css/menu.css` và ghi `css: [menu]`.)
2. Muốn hiện trên menu: thêm một dòng vào `_data/navigation.yml`.

### Thêm link mạng xã hội

Điền link vào mục `social:` trong `_config.yml`. Chân trang tự hiện.

## Mở rộng sang site khác

Có hai cách, tuỳ mức độ tách biệt:

| Cách | Địa chỉ | Khi nào dùng |
|---|---|---|
| Thư mục trong repo này | `hanoineighbors.com/<ten>/` | Nội dung thuộc thương hiệu chính: trang event, menu, landing page cho từng cơ sở |
| Repo riêng + tên miền con | `<ten>.hanoineighbors.com` | Công cụ hoặc ứng dụng độc lập, có nhịp cập nhật riêng (vd repo `vj`) |

Với repo riêng: bật GitHub Pages cho repo đó, thêm file `CNAME` chứa `<ten>.hanoineighbors.com`, rồi tạo bản ghi DNS `CNAME <ten> → hanoineighbors-dev.github.io` ở nơi quản lý tên miền.

> Lưu ý: repo riêng **không** tự hiện ở `hanoineighbors.com/<ten-repo>/`, vì tên miền chính đang gắn với repo này. Ví dụ `vj` hiện chỉ chạy ở `hanoineighbors-dev.github.io/vj/`.

## Quy trình cập nhật

1. Không sửa thẳng trên `main`. Tạo nhánh mới (trên web: khi commit chọn *Create a new branch… and start a pull request*).
2. Mở Pull Request, xem lại thay đổi, rồi **Merge**.
3. Sau 1–2 phút, kiểm tra trên hanoineighbors.com. Tab *Actions* trên GitHub cho biết lần build có thành công không. Nếu build lỗi, site giữ nguyên bản cũ, không bị hỏng.
4. Merge xong thì xoá nhánh đó (nút *Delete branch* trên trang Pull Request).

## Xem thử trên máy (tuỳ chọn)

Cần Ruby và Jekyll 3.10 (cùng phiên bản GitHub Pages dùng):

```
jekyll serve
```

rồi mở http://localhost:4000.
