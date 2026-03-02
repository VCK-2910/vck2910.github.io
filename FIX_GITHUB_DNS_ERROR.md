# 🔧 Fix: "Domain does not resolve to the GitHub Pages server"

## ❌ Lỗi Bạn Đang Gặp

```
⚠️ Both vck2910.id.vn and its alternate name are improperly configured
Domain does not resolve to the GitHub Pages server.
```

**Nghĩa là:** DNS records chưa trỏ đúng về GitHub Pages hoặc chưa cập nhật xong.

---

## 🔍 Bước 1: Kiểm Tra DNS Records Hiện Tại

### Mở PowerShell và chạy:

```powershell
nslookup vck2910.id.vn
```

**Kiểm tra kết quả:**

### ✅ ĐÚNG - Bạn sẽ thấy:
```
Server:  dns.server.com
Address:  xxx.xxx.xxx.xxx

Non-authoritative answer:
Name:    vck2910.id.vn
Addresses:  185.199.108.153
            185.199.109.153
            185.199.110.153
            185.199.111.153
```

### ❌ SAI - Nếu thấy:
```
*** dns.server.com can't find vck2910.id.vn: Non-existent domain
```
→ DNS chưa cập nhật hoặc records chưa đúng!

---

## 🛠️ Bước 2: Sửa DNS Records tại Zonedns.vn

### A. Đăng nhập Zonedns

1. Vào: **https://zonedns.vn**
2. Đăng nhập tài khoản
3. Chọn domain: **vck2910.id.vn**
4. Tìm **"Quản lý DNS"** hoặc **"DNS Management"** hoặc **"Zone Records"**

### B. Xóa Records Cũ (nếu có)

Tìm và **XÓA** các records sau (nếu có):
- ❌ CNAME record với Host `@`
- ❌ A records cũ với Host `@` (nếu không phải IP của GitHub)
- ❌ Bất kỳ record nào trỏ sai

### C. Thêm A Records Mới

**Nhấn "Add Record" hoặc "+" và thêm từng record:**

#### Record 1:
```
Type: A
Name/Host: @ (hoặc để trống, hoặc "vck2910.id.vn")
Value/Points to: 185.199.108.153
TTL: 3600 (hoặc 1 Hour)
```
→ **Save**

#### Record 2:
```
Type: A
Name/Host: @
Value: 185.199.109.153
TTL: 3600
```
→ **Save**

#### Record 3:
```
Type: A
Name/Host: @
Value: 185.199.110.153
TTL: 3600
```
→ **Save**

#### Record 4:
```
Type: A
Name/Host: @
Value: 185.199.111.153
TTL: 3600
```
→ **Save**

### D. Thêm CNAME cho www

```
Type: CNAME
Name/Host: www
Value/Points to: [USERNAME].github.io (thay [USERNAME] bằng GitHub username của bạn)
TTL: 3600
```
→ **Save**

**Ví dụ:** Nếu username là `vck2910` thì Value là `vck2910.github.io`

---

## ⏰ Bước 3: Chờ DNS Propagation

### DNS cần thời gian để cập nhật:
- ⏳ **15-30 phút**: Nhanh nhất (nếu TTL thấp)
- ⏳ **1-2 giờ**: Bình thường
- ⏳ **24 giờ**: Tối đa

### Theo dõi DNS Propagation:

1. **Vào:** https://www.whatsmydns.net
2. **Nhập:** `vck2910.id.vn`
3. **Select type:** `A`
4. **Nhấn Search**

**Xem màu:**
- 🟢 **Xanh với IP 185.199.108.153** → DNS đã cập nhật ✅
- 🔴 **Đỏ hoặc không có kết quả** → Chưa cập nhật, chờ thêm ⏳

---

## 🔄 Bước 4: Xóa Cache DNS (Windows)

Để kiểm tra nhanh hơn, xóa DNS cache trên máy bạn:

```powershell
# Mở PowerShell as Admin
ipconfig /flushdns

# Kiểm tra lại
nslookup vck2910.id.vn
```

---

## 🎯 Bước 5: Cấu Hình Lại GitHub Pages

### Sau khi DNS đã cập nhật (thấy IP 185.199.xxx):

1. **Vào GitHub repo** của bạn
2. **Settings → Pages**
3. **Xóa Custom Domain** (nếu có)
   - Xóa `vck2910.id.vn`
   - Save
4. **Chờ 30 giây**
5. **Nhập lại Custom Domain:**
   - Nhập: `vck2910.id.vn` (KHÔNG có `https://` hay `www`)
   - **Save**
6. **GitHub sẽ check:**
   - ⏳ Chờ 1-5 phút
   - ✅ Khi xuất hiện dấu tick xanh → Success!
7. **Tick "Enforce HTTPS"** (sau khi verify xong)

---

## 📊 Bước 6: Kiểm Tra Từng Bước

### Checklist Debug:

```powershell
# 1. Kiểm tra A records
nslookup vck2910.id.vn
# Phải thấy: 185.199.108.153 (hoặc 109/110/111)

# 2. Kiểm tra CNAME cho www
nslookup www.vck2910.id.vn
# Phải thấy: canonical name = [username].github.io

# 3. Kiểm tra GitHub Pages đang chạy
# Mở: https://[username].github.io
# Phải thấy website

# 4. Test domain
ping vck2910.id.vn
# Phải thấy: Reply from 185.199.xxx.xxx
```

---

## 🐛 Troubleshooting - Các Lỗi Phổ Biến

### Lỗi 1: "NXDOMAIN" khi nslookup
**Nguyên nhân:** DNS records chưa được tạo hoặc domain chưa active  
**Fix:**
- Kiểm tra lại zonedns.vn có records chưa
- Đảm bảo domain đã active (không bị suspend)
- Chờ thêm 1-2 giờ

### Lỗi 2: DNS trả về IP khác (không phải 185.199.xxx)
**Nguyên nhân:** A records trỏ sai  
**Fix:**
- Xóa A records cũ
- Thêm đúng 4 IP của GitHub Pages
- Chờ DNS cập nhật

### Lỗi 3: "Check again" button không chuyển ✅
**Nguyên nhân:** DNS chưa propagate hoặc sai records  
**Fix:**
- Chờ thêm 30 phút
- Kiểm tra DNS với whatsmydns.net
- Xóa custom domain và thêm lại

### Lỗi 4: www hoạt động nhưng root không (hoặc ngược lại)
**Nguyên nhân:** Thiếu A records hoặc CNAME  
**Fix:**
- Đảm bảo có CẢ 4 A records cho root
- Đảm bảo có CNAME cho www
- Kiểm tra cả 2: `nslookup vck2910.id.vn` và `nslookup www.vck2910.id.vn`

---

## 🔑 Điểm Quan Trọng

### ⚠️ Host/Name Field trong DNS Management:

Một số DNS providers hiển thị khác nhau:

| Provider Format | Root Domain (@) | Subdomain (www) |
|----------------|-----------------|-----------------|
| **Cách 1** | `@` | `www` |
| **Cách 2** | Để trống | `www` |
| **Cách 3** | `vck2910.id.vn` | `www.vck2910.id.vn` |

**Thử từng cách** nếu cách đầu không work!

---

## ✅ Khi Nào Biết Đã Thành Công?

### Dấu hiệu DNS đã OK:

1. ✅ `nslookup vck2910.id.vn` → thấy `185.199.xxx.xxx`
2. ✅ GitHub Pages → Custom domain có dấu ✅ xanh
3. ✅ Không còn warning đỏ "improperly configured"
4. ✅ Mở `https://vck2910.id.vn` → thấy website
5. ✅ Có ổ khóa 🔒 xanh ở thanh địa chỉ

---

## 📞 Vẫn Không Work?

### Nếu đã chờ > 24 giờ và vẫn lỗi:

1. **Chụp screenshot:**
   - DNS records tại zonedns.vn
   - Kết quả `nslookup`
   - Error message từ GitHub

2. **Kiểm tra với support zonedns:**
   - Domain có active không?
   - DNS nameservers có đúng không?

3. **Test với subdomain thay vì root:**
   - Thử dùng `www.vck2910.id.vn` làm custom domain
   - Xem có work không

---

## 🎯 Quick Fix Checklist

Làm theo thứ tự này:

- [ ] **Xóa hết DNS records cũ** tại zonedns.vn
- [ ] **Thêm 4 A records** (185.199.108/109/110/111.153)
- [ ] **Thêm 1 CNAME** cho www
- [ ] **Save & chờ 30 phút**
- [ ] **Test:** `nslookup vck2910.id.vn`
- [ ] **Xóa cache DNS:** `ipconfig /flushdns`
- [ ] **GitHub:** Remove custom domain → Save
- [ ] **GitHub:** Add custom domain lại → Save
- [ ] **Chờ verify** (✅ xuất hiện)
- [ ] **Enable HTTPS**
- [ ] **Test:** `https://vck2910.id.vn`

---

## 📖 Tham Khảo

- [GitHub Pages DNS Docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain)
- [DNS Checker Tool](https://www.whatsmydns.net)
- [DNS Propagation Info](https://dnschecker.org)

---

**Kiên nhẫn là chìa khóa! DNS cần thời gian. Thường thì sau 1-2 giờ sẽ OK! 🚀**
