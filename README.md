# 🍖 El Gaucho Restaurant Website

Website nhà hàng cao cấp với thiết kế hiện đại, responsive và đầy đủ tính năng.

## 📋 Tính năng

- ✅ Thiết kế responsive (mobile, tablet, desktop)
- ✅ Navigation menu với smooth scroll
- ✅ Hero section ấn tượng
- ✅ Phần giới thiệu nhà hàng
- ✅ Thực đơn với tab phân loại (Khai vị, Món chính, Tráng miệng, Đồ uống)
- ✅ Gallery hình ảnh với hiệu ứng lightbox
- ✅ Form đặt bàn trực tuyến
- ✅ Footer với thông tin liên hệ
- ✅ Animations và transitions mượt mà

## 📁 Cấu trúc thư mục

```
elgacho/
│
├── index.html          # Trang chủ chính
├── css/
│   └── style.css       # File CSS styling
├── js/
│   └── script.js       # File JavaScript
├── images/             # Thư mục chứa hình ảnh
│   └── README.md       # Hướng dẫn về hình ảnh cần thêm
└── README.md          # File này
```

## 🚀 Cách sử dụng

### 1. Thêm hình ảnh
Đầu tiên, thêm các hình ảnh vào thư mục `images/`. Xem file `images/README.md` để biết chi tiết về hình ảnh cần thiết.

### 2. Tùy chỉnh nội dung

#### Thay đổi thông tin liên hệ
Mở file `index.html` và tìm section `#contact` để thay đổi:
- Địa chỉ
- Số điện thoại
- Email
- Giờ mở cửa
- Links mạng xã hội

#### Chỉnh sửa thực đơn
Trong file `index.html`, tìm section `#menu` để:
- Thêm/xóa món ăn
- Thay đổi giá cả
- Cập nhật mô tả

#### Thay đổi màu sắc
Mở file `css/style.css` và chỉnh sửa các biến CSS trong `:root`:
```css
--primary-color: #8b4513;     /* Màu chính */
--secondary-color: #d4a574;   /* Màu phụ */
--dark-color: #1a1a1a;        /* Màu tối */
```

### 3. Chạy website

#### Cách 1: Mở trực tiếp
- Double click vào file `index.html` để mở trong trình duyệt

#### Cách 2: Sử dụng Live Server (khuyến nghị)
```powershell
# Nếu bạn có Python đã cài đặt
cd d:\elgacho
python -m http.server 8000
```
Sau đó mở trình duyệt và truy cập: `http://localhost:8000`

#### Cách 3: Sử dụng VS Code Live Server
- Cài extension "Live Server" trong VS Code
- Right click vào `index.html`
- Chọn "Open with Live Server"

## 🌐 Triển khai lên domain

### BƯỚC 1: Chuẩn bị nơi lưu trữ (Chọn Hosting)

Vì đây là website tĩnh (HTML/CSS/JS) không cần server backend, bạn có 3 lựa chọn tốt nhất:

#### 🌟 **Cách 1: GitHub Pages (Khuyến nghị - MIỄN PHÍ)**
**Ưu điểm:** Miễn phí 100%, tự động deploy, HTTPS miễn phí, nhanh & ổn định
**Nhược điểm:** Phải biết Git cơ bản

**Các bước:**
1. Tạo tài khoản GitHub (github.com)
2. Tạo Repository tên `vck2910.github.io` (thay `vck2910` bằng username của bạn)
3. Upload toàn bộ files từ folder `elgacho` vào repo
4. Vào Settings → Pages → chọn `main` branch
5. Website sẽ tự động deploy tại: `https://vck2910.github.io`

**Trỏ domain vck2910.id.vn về GitHub:**
- Vào zonedns.vn (nơi bạn quản lý domain)
- Tìm phần "DNS Records" hoặc "Bản ghi DNS"
- Thêm bản ghi CNAME:
  - Type: `CNAME`
  - Host: `@` (hoặc để trống)
  - Value: `vck2910.github.io`
  - TTL: `3600`

#### 💨 **Cách 2: Netlify (MIỄN PHÍ)**
**Ưu điểm:** Rất dễ dàng, UI thân thiện, tự động deploy từ GitHub, build tự động
**Nhược điểm:** Cần kết nối GitHub

**Các bước:**
1. Giải nén code lên GitHub
2. Vào netlify.com → đăng nhập bằng GitHub
3. Chọn "New site from Git" → chọn repo
4. Ngôn ngữ chọn "None" (vì là static site)
5. Deploy thành công, lấy URL
6. Tại Netlify → Domain settings → thêm custom domain `vck2910.id.vn`

#### 🚀 **Cách 3: Vercel (MIỄN PHÍ)**
**Ưu điểm:** Rất nhanh, integrated CI/CD, preview builds
**Nhược điểm:** Giống Netlify, cần GitHub

**Các bước:**
1. Upload code lên GitHub
2. Vào vercel.com → đăng nhập bằng GitHub
3. Chọn "Import Project" → chọn repo
4. Deploy (framework tự động detect)
5. Thêm custom domain `vck2910.id.vn` trong Settings

#### 📦 **Cách 4: Shared Hosting truyền thống (CÓ PHÍ)**
Nếu bạn đã mua hosting từ gói Shared Hosting:

1. **Đăng nhập vào control panel (cPanel/Plesk)**
2. **Vào File Manager → public_html**
3. **Upload toàn bộ files:**
   - Tất cả files trong folder `elgacho`
   - Giữ nguyên cấu trúc thư mục
4. **File `index.html` phải ở thư mục root (public_html)**

**Hoặc dùng FTP Client (FileZilla):**
```
Host: ftp.zonedns.vn (hoặc host của bạn)
Port: 21
Username: [tên đăng nhập FTP]
Password: [mật khẩu FTP]
```
- Connect → kéo thả files từ `elgacho` vào thư mục `public_html`

### BƯỚC 2: Trỏ Domain về Hosting (Cấu hình DNS)

**Nếu dùng GitHub Pages/Netlify/Vercel:**
Làm theo hướng dẫn ở trên (thêm CNAME)

**Nếu dùng Shared Hosting với Zonedns:**

1. Vào **zonedns.vn** → **Quản lý domain** → **vck2910.id.vn**
2. Tìm phần **"DNS Records"** hoặc **"Zone Records"**
3. **Thêm bản ghi A:**
   ```
   Type: A
   Host: @ (hoặc để trống)
   Value: [IP_của_hosting] (lấy từ provider)
   TTL: 3600
   ```
4. **Thêm bản ghi CNAME cho www:**
   ```
   Type: CNAME
   Host: www
   Value: vck2910.id.vn
   TTL: 3600
   ```
5. Chờ 30 phút - 24 giờ để cập nhật DNS

### BƯỚC 3: Xác minh Deploy

**Kiểm tra xem website đã online chưa:**

1. Mở trình duyệt
2. Gõ: `https://vck2910.id.vn`
3. Nếu thấy website → ✅ Thành công!
4. Nếu chưa: Chờ thêm DNS cập nhật hoặc click F5 → Ctrl+Shift+Delete (xóa cache)

### BƯỚC 4: Cài đặt SSL (HTTPS)

**GitHub Pages/Netlify/Vercel:** Tự động HTTPS ✅

**Shared Hosting:**
- Vào cPanel
- Tìm **AutoSSL** hoặc **Let's Encrypt**
- Nhấn **Issue** hoặc **Install**
- Hoàn tất, domain sẽ có ổ khóa xanh 🔒

## 🎨 Tùy chỉnh nâng cao

### Thay đổi fonts
Trong `index.html`, thay đổi link Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=TenFont&display=swap" rel="stylesheet">
```

### Thêm tính năng mới
Các ví dụ có thể thêm:
- Tích hợp Google Maps
- Chatbot hỗ trợ
- Đặt món online
- Reviews từ khách hàng
- Blog/tin tức

## 📱 Responsive Design

Website tự động điều chỉnh cho:
- 📱 Mobile (< 480px)
- 📱 Tablet (481px - 768px)
- 💻 Desktop (> 768px)

## 🔧 Troubleshooting

### Hình ảnh không hiển thị
- Kiểm tra tên file có đúng không
- Đảm bảo file ảnh nằm trong thư mục `images/`
- Kiểm tra đường dẫn trong HTML

### Menu không hoạt động
- Mở Console trong trình duyệt (F12)
- Kiểm tra có lỗi JavaScript không
- Đảm bảo file `js/script.js` được load đúng

### Styling không áp dụng
- Xóa cache trình duyệt (Ctrl + F5)
- Kiểm tra file `css/style.css` có tồn tại không

## 📞 Hỗ trợ

Nếu cần hỗ trợ, hãy kiểm tra:
1. Console trong Developer Tools (F12)
2. Network tab để xem file nào không load được
3. Đảm bảo tất cả đường dẫn file đúng

## 📝 License

Website này được tạo cho mục đích cá nhân. Bạn có thể tự do chỉnh sửa và sử dụng.

## 📚 Hướng Dẫn Triển Khai

### **Bạn mới bắt đầu?**
👉 Xem file: **[QUICK_START.md](QUICK_START.md)** - Deploy trong 5 phút!

### **Muốn hiểu chi tiết?**
👉 Xem file: **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - 4 cách deploy khác nhau

### **Cấu hình DNS phức tạp?**
👉 Xem file: **[DNS_SETUP_GUIDE.md](DNS_SETUP_GUIDE.md)** - Hướng dẫn cấu hình DNS chi tiết

### **⚠️ Gặp lỗi "Tên Record không hợp lệ"?**
👉 Xem file: **[FIX_CNAME_ERROR.md](FIX_CNAME_ERROR.md)** - Fix lỗi không thể tạo CNAME @ ngay!

### **🔧 GitHub báo "Domain does not resolve"?**
👉 Xem file: **[FIX_GITHUB_DNS_ERROR.md](FIX_GITHUB_DNS_ERROR.md)** - Fix lỗi DNS không resolve!

### **🔍 Kiểm tra DNS nhanh:**
```powershell
# Chạy script kiểm tra DNS tự động
.\check-dns.ps1

# Hoặc file .bat
.\check-dns.bat
```

---

## 🎯 Các bước tiếp theo

1. ✅ Thêm hình ảnh thật của nhà hàng vào folder `images/`
2. ✅ Cập nhật thông tin liên hệ (địa chỉ, phone, email)
3. ✅ Chỉnh sửa thực đơn theo món ăn thực tế
4. ✅ Thay đổi màu sắc phù hợp với thương hiệu (trong `css/style.css`)
5. ✅ Test trên nhiều thiết bị khác nhau
6. ✅ **[Triển khai lên hosting](QUICK_START.md)** ← Bắt đầu từ đây!
7. ✅ Cài đặt Google Analytics (nếu cần)
8. ✅ Tối ưu SEO

---

## 🚀 Nhanh Nhất để Deploy

**Muốn lên mạng ngay?**

```powershell
# 1. Mở PowerShell trong folder d:\elgacho
cd d:\elgacho

# 2. Upload lên GitHub
git init
git add .
git commit -m "Initial website"
git branch -M main
git remote add origin https://github.com/[USERNAME]/[USERNAME].github.io.git
git push -u origin main

# 3. Vào GitHub Settings → Pages → enable
# Website sẽ live tại: https://[USERNAME].github.io

# 4. Trỏ domain qua DNS
# → Xem DNS_SETUP_GUIDE.md
```

**Chi tiết hơn:** Đọc [QUICK_START.md](QUICK_START.md)

---

**Chúc bạn thành công! 🎉 Website sắp lên mạng!**
