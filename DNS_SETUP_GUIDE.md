# 🌐 Hướng Dẫn Cấu Hình DNS Chi Tiết

**Bước quan trọng nhất: Khi người dùng gõ vck2910.id.vn, DNS sẽ "chỉ đường" tới hosting của bạn**

---

## 🎯 Khái Niệm Cơ Bản

- **Domain** = Tên website (vck2910.id.vn)
- **Hosting** = "Mảnh đất" chứa files website
- **DNS** = "Bản đồ" chỉ dẫn từ tên miền đến hosting

```
Người dùng gõ: vck2910.id.vn
        ↓
    DNS xem: "vck2910.id.vn" → "github.com" (hoặc IP xxx.xxx.xxx.xxx)
        ↓
    Trình duyệt lấy website từ đó
        ↓
    Hiển thị website ✅
```

---

## 📍 Các Loại DNS Records

Bạn cần biết 2 loại chính:

### **A Record**
- **Dùng cho:** Trỏ domain tới địa chỉ IP trực tiếp
- **Ví dụ:**
  ```
  Type: A
  Host: @
  Value: 123.45.67.89 (IP của hosting)
  ```
- **Khi dùng:** Root domain (@), Shared Hosting, VPS, **GitHub Pages**
- ⚠️ **Bắt buộc cho root domain** - không thể dùng CNAME!

### **CNAME Record**
- **Dùng cho:** Trỏ subdomain tới domain khác
- **Ví dụ:**
  ```
  Type: CNAME
  Host: www (hoặc blog, shop, etc.)
  Value: vck2910.github.io (hoặc netlify.app, vercel.app)
  ```
- **Khi dùng:** Subdomains như www, blog, shop
- ⚠️ **KHÔNG thể dùng cho root domain (@)**

---

## 🔧 Bước Cấu Hình Chi Tiết

### **Nếu Dùng GitHub Pages:**

#### **Bước 1: Vào Zonedns.vn**
1. Đăng nhập: **zonedns.vn**
2. Chọn **"Quản Lý Domain"** hoặc **"My Domains"**
3. Tìm domain **`vck2910.id.vn`**
4. Nhấn **"Manage DNS"** hoặc **"Quản Lý DNS"**

#### **Bước 2: Tìm Phần DNS Records**
- Tìm bảng với các cột: **Type | Host | Value | TTL**
- Hoặc: **Type | Name | Content | TTL**

#### **Bước 3: Thêm A Records (Cho Root Domain)**

⚠️ **LƯU Ý:** Không thể dùng CNAME cho root domain (@)! Phải dùng A records.

**Xóa A records cũ (nếu có), sau đó thêm 4 A records sau:**

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A | @ | 185.199.108.153 | 3600 |
| A | @ | 185.199.109.153 | 3600 |
| A | @ | 185.199.110.153 | 3600 |
| A | @ | 185.199.111.153 | 3600 |

**Cách thêm:**
- Nhấn **"Add Record"** hoặc **"+"**
- **Type:** A
- **Host:** @ (hoặc để trống)
- **Value:** (mỗi IP một record)
- **TTL:** 3600
- **Save**
- Lặp lại 4 lần cho 4 IP addresses

#### **Bước 4: Thêm CNAME cho www**

| Type | Host | Value | TTL |
|------|------|-------|-----|
| CNAME | www | vck2910.github.io | 3600 |

- **Type:** CNAME
- **Host:** www
- **Value:** vck2910.github.io
- **TTL:** 3600
- **Save**

#### **Bước 5: Chờ DNS Cập Nhật**
- ⏳ **30 phút** - thường nhanh nhất
- ⏳ **1-2 giờ** - bình thường
- ⏳ **Tối đa 24 giờ** - hiếm gặp

---

### **Nếu Dùng Netlify:**

1. **Vào Netlify site settings**
2. **Tìm "Domain management"**
3. **Thêm custom domain:** `vck2910.id.vn`
4. **Netlify sẽ hiển thị DNS records:**
   ```
   Type: CNAME
   Host: vck2910
   Value: vck2910.netlify.com
   ```
5. **Copy exact values → Thêm vào zonedns.vn**

---

### **Nếu Dùng Vercel:**

1. **Vào Vercel → Project → Settings**
2. **Domains → Add Domain**
3. **Nhập:** `vck2910.id.vn`
4. **Vercel sẽ cho records:**
   ```
   Type: CNAME
   Host: @ (hoặc vck2910)
   Value: cname.vercel-dns.com
   ```
5. **Thêm vào zonedns.vn**

---

### **Nếu Dùng Shared Hosting:**

1. **Lấy IP hosting từ:**
   - Email xác nhận từ nhà cung cấp
   - cPanel → Account Information

2. **Vào zonedns.vn, thêm A Record:**
   ```
   Type: A
   Host: @ (hoặc để trống)
   Value: 45.32.123.45 (IP hosting của bạn)
   TTL: 3600
   ```

3. **Thêm www CNAME:**
   ```
   Type: CNAME
   Host: www
   Value: vck2910.id.vn
   TTL: 3600
   ```

---

## ✅ Kiểm Tra DNS Records

### **Cách 1: Dùng Công Cụ Online**
1. Vào: **mxtoolbox.com** hoặc **dnschecker.org**
2. Nhập domain: `vck2910.id.vn`
3. Kiểm tra **CNAME** hoặc **A** records
4. Nếu thấy value đúng → ✅ Đã cấu hình

### **Cách 2: Dùng Command Line (Windows)**

Mở PowerShell:
```powershell
# Kiểm tra CNAME
nslookup vck2910.id.vn

# Nếu thấy dòng:
# Non-authoritative answer:
# CNAME: vck2910.github.io
# → ✅ Đúng rồi!
```

### **Cách 3: Kiểm Tra Trực Tiếp**
1. Mở trình duyệt
2. Gõ: `https://vck2910.id.vn`
3. Nếu thấy website → ✅ Cấu hình thành công!

---

## ⚠️ Lỗi Phổ Biến & Cách Fix

### **Lỗi 1: "ERR_NAME_NOT_RESOLVED"**
- **Nguyên nhân:** DNS chưa trỏ hoặc records sai
- **Fix:**
  - [ ] Chờ 30 phút - 24 giờ
  - [ ] Kiểm tra records ở zonedns có đúng không
  - [ ] Refresh: `Ctrl + F5`

### **Lỗi 2: "This site can't be reached"**
- **Nguyên nhân:** DNS đúng nhưng hosting chưa ready
- **Fix:**
  - [ ] Kiểm tra website lên GitHub Pages chưa
  - [ ] Chờ GitHub deploy xong (1-2 phút)
  - [ ] Kiểm tra repo name có chính xác không

### **Lỗi 3: "DNS Propagation Delayed"**
- **Nguyên nhân:** DNS được ISP cache lâu
- **Fix:**
  - [ ] Đợi thêm
  - [ ] Dùng DNS công cộng: `1.1.1.1` (Cloudflare)
  - [ ] Trên Windows: `ipconfig /flushdns` (xóa cache DNS)

### **Lỗi 4: www không hoạt động**
- **Nguyên nhân:** Thiếu www CNAME record
- **Fix:**
  - [ ] Thêm www CNAME record
  - [ ] Value: domain chính hoặc GitHub Pages domain

---

## 🔒 HTTPS / SSL Certificate

### **GitHub Pages/Netlify/Vercel:**
- ✅ **Tự động HTTPS** - không phải cấu hình

### **Shared Hosting:**
1. Vào cPanel
2. Tìm **"AutoSSL"** hoặc **"Let's Encrypt"**
3. Nhấn **"Issue"**
4. Chờ 5-10 phút
5. Website sẽ có 🔒 xanh

---

## 📊 DNS Propagation Checker

**Theo dõi DNS cập nhật từng bước:**

1. Vào: **whatsmydns.net**
2. Nhập domain: `vck2910.id.vn`
3. Chọn record type: **A** hoặc **CNAME**
4. Xem các DNS server toàn thế giới đã cập nhật chưa
5. Màu xanh = cập nhật ✅, Đỏ = chưa ⏳

---

## 📝 Checklist Cấu Hình

- [ ] Tôi đã biết GitHub username của mình
- [ ] Repo name chính xác: `[username].github.io`
- [ ] Website upload lên GitHub rồi
- [ ] GitHub Pages bật (Settings → Pages)
- [ ] Vào zonedns.vn
- [ ] Thêm CNAME record với value = repo GitHub
- [ ] Chờ 30 phút - 24 giờ
- [ ] Test: `https://vck2910.id.vn`
- [ ] Website hiển thị ✅

---

## 💡 Mẹo & Thứ Tự Tốt Nhất

1. **Deploy code lên hosting TRƯỚC** (GitHub Pages/Netlify/v.v.)
2. **Chờ hosting ready** (repo public, pages enable)
3. **RỒIHẠ MỚI trỏ DNS**
4. **Cuối cùng chờ DNS cập nhật**

❌ **Sai:** Trỏ DNS trước → Git confused
✅ **Đúng:** Deploy xong → Rồi trỏ DNS

---

## 🆘 Cần Giúp?

Nếu stuck, kiểm tra:
1. **GitHub Pages live chưa?** (test tại `[username].github.io`)
2. **DNS record test tại whatsmydns.net**
3. **Cache xóa hết? (Ctrl + F5)**
4. **Chờ đủ thời gian chưa? (tối thiểu 30 phút)**

---

**Chúc bạn thành công! 🎉 DNS setup xong = 80% công việc hoàn thành!**
