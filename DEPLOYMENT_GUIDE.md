# 📖 Hướng Dẫn Chi Tiết Triển Khai Website

---

## 🎯 Bước 0: Chuẩn Bị

✅ Đã có website HTML/CSS/JS trong folder `d:\elgacho\`
✅ Domain: `vck2910.id.vn` (quản lý tại zonedns.vn)
✅ Cần chọn 1 trong 4 cách deploy dưới đây

---

## 🌟 CÁCH 1: GitHub Pages (KHUYẾN NGHỊ)

### Tại sao chọn GitHub Pages?
- ✅ **MIỄN PHÍ 100%**
- ✅ HTTPS miễn phí
- ✅ Không cần lo quản lý server
- ✅ Tự động deploy khi push code
- ✅ Tốc độ nhanh (CDN toàn cầu)
- ✅ Bảo mật cao

### Các bước chi tiết:

#### Bước 1: Tạo tài khoản GitHub
1. Vào github.com
2. Nhấn "Sign up"
3. Tạo account với email

#### Bước 2: Tạo Repository
1. Sau khi đăng nhập, nhấn dấu "+" góc trên trái
2. Chọn "New repository"
3. **Tên repo PHẢI là:** `vck2910.github.io` (thay `vck2910` bằng username)
4. Chọn "Public"
5. Nhấn "Create repository"

#### Bước 3: Upload Code lên GitHub

**Cách A: Dùng Git từ Terminal (Khuyến nghị)**

1. Mở PowerShell trong folder `d:\elgacho`
2. Chạy các lệnh:

```powershell
# Cấu hình Git
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# Khởi tạo Git
git init

# Thêm tất cả files
git add .

# Commit
git commit -m "Initial website upload"

# Thêm remote (thay vck2910 bằng username của bạn)
git remote add origin https://github.com/vck2910/vck2910.github.io.git

# Push lên GitHub (sẽ yêu cầu login)
git branch -M main
git push -u origin main
```

**Cách B: Upload qua Web Interface**

1. Vào repo trên GitHub
2. Nhấn "Add file" → "Upload files"
3. Kéo thả toàn bộ files từ `d:\elgacho` (trừ .git folder)
4. Nhấn "Commit changes"

#### Bước 4: Kiểm tra GitHub Pages Settings
1. Vào repo → Settings
2. Tìm "Pages" ở sidebar trái
3. Xác nhận "Source" là `main` branch
4. Chờ 1-2 phút, GitHub sẽ deploy tự động
5. Bạn sẽ thấy URL: `https://vck2910.github.io`

#### Bước 5: Trỏ Domain vck2910.id.vn về GitHub

1. **Vào zonedns.vn:**
   - Đăng nhập tài khoản
   - Chọn domain `vck2910.id.vn`
   - Tìm "Quản lý DNS" hoặc "DNS Management"

2. **⚠️ QUAN TRỌNG: Xóa A records cũ (nếu có)**
   - Tìm các A record với Host `@` 
   - Xóa hết

3. **Thêm 4 A Records cho root domain:**
   - Type: `A` | Host: `@` | Value: `185.199.108.153` | TTL: `3600`
   - Type: `A` | Host: `@` | Value: `185.199.109.153` | TTL: `3600`
   - Type: `A` | Host: `@` | Value: `185.199.110.153` | TTL: `3600`
   - Type: `A` | Host: `@` | Value: `185.199.111.153` | TTL: `3600`
   - Nhấn Save sau mỗi record

4. **Thêm CNAME cho www:**
   - Type: `CNAME`
   - Host: `www`
   - Value: `vck2910.github.io`
   - TTL: `3600`
   - Nhấn Save

5. **Chờ 30 phút - 24 giờ** để DNS cập nhật

#### Bước 6: Cấu hình Custom Domain trên GitHub

1. **Vào GitHub repo** của bạn
2. **Settings → Pages**
3. Phần **"Custom domain"**, nhập: `vck2910.id.vn`
4. Nhấn **Save**
5. Chờ GitHub verify DNS (1-5 phút)
6. ✅ Khi verify xong, tick **"Enforce HTTPS"**

#### Bước 7: Kiểm tra kết quả
1. Mở: `https://vck2910.id.vn`
2. Nếu thấy website → ✅ Thành công!
3. Nếu không: 
   - Chờ thêm chút và refresh (Ctrl+F5)
   - Kiểm tra DNS Records có đúng không

#### Bước 8: Cập nhật lần sau
Mỗi khi bạn muốn cập nhật website:

```powershell
cd d:\elgacho
git add .
git commit -m "Update content"
git push
```

Website sẽ tự động deploy trong 1-2 phút! 🚀

---

## 💨 CÁCH 2: Netlify

### Tại sao chọn Netlify?
- ✅ MIỄN PHÍ (gói lên đến 100GB)
- ✅ Rất dễ dùng, UI đẹp
- ✅ Form handling tự động
- ✅ Preview builds cho mỗi commit
- ✅ Fast CDN

### Các bước:

1. **Chuẩn bị code trên GitHub** (như Cách 1, bước 1-3)

2. **Vào netlify.com:**
   - Nhấn "Deploy"
   - Đăng nhập bằng GitHub
   - Chọn `vck2910.github.io` repo

3. **Cấu hình build (bỏ qua nếu là site tĩnh):**
   - Build command: (để trống)
   - Publish directory: `.` (root folder)
   - Nhấn "Deploy"

4. **Chờ deploy xong (~1 phút)**

5. **Trỏ domain:**
   - Vào Netlify Site Settings
   - Custom domains → Add domain
   - Nhập: `vck2910.id.vn`
   - Netlify sẽ cho bạn các DNS records
   - Vào zonedns.vn thêm records đó

6. **Bước xong! 🎉**

---

## 🚀 CÁCH 3: Vercel

### Tại sao chọn Vercel?
- ✅ MIỄN PHÍ
- ✅ Rất nhanh (serverless functions)
- ✅ Tích hợp Next.js (nếu sau này upgrade)
- ✅ Preview URLs tự động

### Các bước:

1. **Code trên GitHub** (như Cách 1)

2. **Vào vercel.com:**
   - Nhấn "Deploy"
   - Đăng nhập bằng GitHub
   - "Import Project"
   - Chọn repo

3. **Cấu hình:**
   - Framework: "Other"
   - Root Directory: `.`
   - Nhấn "Deploy"

4. **Trỏ domain:**
   - Vào Settings → Domains
   - Add: `vck2910.id.vn`
   - Copy DNS records
   - Thêm vào zonedns.vn

5. **Xong! ✅**

---

## 📦 CÁCH 4: Shared Hosting (Nếu đã mua)

Sử dụng nếu bạn đã có account hosting từ Vietnix, Azdigi, iNET, v.v.

### Upload qua cPanel (File Manager):

1. **Vào cPanel hosting:**
   - Đăng nhập với credentials
   - Tìm "File Manager"

2. **Upload files:**
   - Mở folder `public_html` (hoặc `www`)
   - Upload toàn bộ files từ `d:\elgacho`
   - Đảm bảo `index.html` ở root

3. **Cấu hình addons domain (nếu cần):**
   - Vào "Addon Domains"
   - Thêm `vck2910.id.vn` trỏ về folder chứa files

### Upload qua FTP:

1. **Cài FileZilla (ftp://filezilla-project.org)**

2. **Cấu hình kết nối:**
   - Host: `ftp.zonedns.vn` (hoặc host của provider)
   - Username: tên FTP của bạn
   - Password: mật khẩu FTP
   - Port: 21
   - Nhấn "Quickconnect"

3. **Kéo thả files:**
   - Trái: folder `d:\elgacho`
   - Phải: folder `public_html`
   - Kéo thả toàn bộ content

4. **Trỏ DNS:**
   - Vào zonedns.vn
   - Thêm A Record:
     ```
     Type: A
     Host: @
     Value: [IP hosting - lấy từ email xác nhận]
     ```
   - Thêm www CNAME:
     ```
     Type: CNAME
     Host: www
     Value: vck2910.id.vn
     ```

5. **SSL (HTTPS):**
   - cPanel → AutoSSL
   - Nhấn "Issue" → chờ xong

---

## 🔍 Kiểm Tra Kết Quả

### Sau khi deploy, kiểm tra:

1. **Mở trình duyệt:**
   ```
   https://vck2910.id.vn
   ```

2. **Nếu thấy website:** ✅ Thành công!

3. **Nếu không thấy:**
   - Chờ 30 phút - 24h DNS cập nhật
   - Refresh: `Ctrl + F5` (xóa cache)
   - Kiểm tra DNS: `nslookup vck2910.id.vn`

4. **Kiểm tra HTTPS:**
   - Phải có ổ khóa 🔒 ở URL bar
   - Nếu red/yellow warning → chờ SSL cấp lại

---

## 🛠️ Bảo Trì & Cập Nhật

### Cập nhật nội dung:

**GitHub Pages/Netlify/Vercel:**
```powershell
cd d:\elgacho
git add .
git commit -m "Update: [mô tả thay đổi]"
git push
# Deploy tự động trong 1-2 phút
```

**Shared Hosting (FTP):**
- Upload files mới lên public_html
- Overwrite file cũ nếu cần

### Theo dõi hiệu suất:

- **GitHub Pages:** Vào repo → Insights
- **Netlify:** Dashboard → Analytics
- **Vercel:** Dashboard → Analytics
- **Shared Hosting:** cPanel → Metrics

---

## 💡 Lời Khuyên

✅ **Chọn GitHub Pages nếu:**
- Bạn là beginner
- Muốn miễn phí 100%
- Không muốn lo server

✅ **Chọn Netlify nếu:**
- Muốn UI đẹp & dễ dùng
- Có thể muốn dùng form handling

✅ **Chọn Vercel nếu:**
- Có thể upgrade sang Next.js sau
- Muốn performance cực tốt

✅ **Chọn Shared Hosting nếu:**
- Đã mua domain + hosting combo
- Muốn quản lý toàn bộ server

---

## ❓ FAQ

### Q: DNS mất bao lâu để cập nhật?
A: Bình thường 30 phút - 24 giờ. Nếu chờ quá lâu, kiểm tra records có đúng không.

### Q: Làm sao cập nhật website?
A: Push code mới lên GitHub (git push) → tự động deploy trong 1-2 phút.

### Q: Có thể đổi hosting sau không?
A: Có, chỉ cần sửa DNS records. Không mất data.

### Q: HTTPS có an toàn không?
A: Có, tất cả các cách đều có SSL miễn phí. Rất an toàn.

### Q: Tốc độ website sẽ như thế nào?
A: Rất nhanh (<2s). GitHub Pages/Netlify/Vercel đều dùng CDN toàn cầu.

---

**Bạn cần hỗ trợ cách nào? Hãy cho tôi biết! 😊**
