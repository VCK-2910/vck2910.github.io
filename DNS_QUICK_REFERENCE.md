# 🎯 DNS Setup cho GitHub Pages - Tóm Tắt Nhanh

## ✅ ĐÚNG - Làm theo này

### DNS Records cần thêm:

```
┌─────────────────────────────────────────────┐
│  4 A Records cho vck2910.id.vn              │
├─────────┬───────┬────────────────────┬──────┤
│ Type    │ Host  │ Value              │ TTL  │
├─────────┼───────┼────────────────────┼──────┤
│ A       │ @     │ 185.199.108.153    │ 3600 │
│ A       │ @     │ 185.199.109.153    │ 3600 │
│ A       │ @     │ 185.199.110.153    │ 3600 │
│ A       │ @     │ 185.199.111.153    │ 3600 │
└─────────┴───────┴────────────────────┴──────┘

┌─────────────────────────────────────────────┐
│  1 CNAME cho www.vck2910.id.vn              │
├─────────┬───────┬────────────────────┬──────┤
│ Type    │ Host  │ Value              │ TTL  │
├─────────┼───────┼────────────────────┼──────┤
│ CNAME   │ www   │ vck2910.github.io  │ 3600 │
└─────────┴───────┴────────────────────┴──────┘
```

### Kết quả:
✅ `vck2910.id.vn` → Hoạt động  
✅ `www.vck2910.id.vn` → Hoạt động  
✅ HTTPS tự động  
✅ Fast & Secure  

---

## ❌ SAI - ĐỪNG làm thế này

### DNS Record SAI:

```
┌─────────────────────────────────────────────┐
│  ❌ CNAME cho root domain (SAI!)            │
├─────────┬───────┬────────────────────┬──────┤
│ Type    │ Host  │ Value              │ TTL  │
├─────────┼───────┼────────────────────┼──────┤
│ CNAME   │ @     │ vck2910.github.io  │ 3600 │  ← ❌ LỖI!
└─────────┴───────┴────────────────────┴──────┘
```

### Lỗi nhận được:
> ❌ "Tên Record không hợp lệ. Bạn không thể tạo CNAME record trùng với domain gốc!"

---

## 🔄 Quy Trình 3 Bước

### **1️⃣ Cấu hình DNS tại Zonedns.vn**

```
Vào zonedns.vn
    ↓
Chọn domain: vck2910.id.vn
    ↓
Quản lý DNS
    ↓
Thêm 4 A records (@ → 185.199.108-111.153)
    ↓
Thêm 1 CNAME record (www → vck2910.github.io)
    ↓
Save
```

### **2️⃣ Cấu hình Custom Domain trên GitHub**

```
Vào GitHub repo
    ↓
Settings → Pages
    ↓
Custom domain: vck2910.id.vn
    ↓
Save
    ↓
Chờ verify (✅ xuất hiện)
    ↓
Tick "Enforce HTTPS"
```

### **3️⃣ Chờ & Kiểm tra**

```
Chờ 30 phút - 2 giờ
    ↓
Mở: https://vck2910.id.vn
    ↓
Thấy website? → ✅ XONG!
```

---

## 📋 Checklist

Đã hoàn thành các bước sau chưa?

- [ ] Code đã upload lên GitHub
- [ ] Repo name đúng: `[username].github.io`
- [ ] GitHub Pages đã enable (Settings → Pages)
- [ ] Website test OK tại: `https://[username].github.io`
- [ ] Đã xóa CNAME record cũ (nếu có)
- [ ] Đã thêm 4 A records với Host `@`
- [ ] Đã thêm CNAME record với Host `www`
- [ ] Đã cấu hình Custom Domain trên GitHub
- [ ] Đã chờ DNS cập nhật (30 phút+)
- [ ] Test: `https://vck2910.id.vn`

---

## 🛠️ Command để Test

### Kiểm tra A records:
```powershell
nslookup vck2910.id.vn
```
**Phải thấy:** `185.199.108.153` (và 3 IP khác)

### Kiểm tra CNAME:
```powershell
nslookup www.vck2910.id.vn
```
**Phải thấy:** `canonical name = vck2910.github.io`

### Xóa DNS cache (Windows):
```powershell
ipconfig /flushdns
```

---

## 💡 Mẹo

### ⚡ Tăng tốc DNS propagation:
1. Dùng DNS công cộng:
   - Cloudflare: `1.1.1.1`
   - Google: `8.8.8.8`
2. Xóa cache browser: `Ctrl + Shift + Delete`
3. Hard refresh: `Ctrl + F5`

### 🔍 Theo dõi DNS propagation:
- Vào: **whatsmydns.net**
- Nhập: `vck2910.id.vn`
- Type: `A`
- Xem màu xanh = đã cập nhật ✅

---

## 📱 Quick Reference Card

```
┌─────────────────────────────────────────────────┐
│          DNS cho GitHub Pages                   │
├─────────────────────────────────────────────────┤
│                                                 │
│  Root Domain (vck2910.id.vn):                  │
│    ✅ 4 × A records                            │
│    ❌ KHÔNG dùng CNAME                         │
│                                                 │
│  Subdomain (www.vck2910.id.vn):                │
│    ✅ 1 × CNAME record                         │
│                                                 │
│  IP Addresses (GitHub Pages):                  │
│    • 185.199.108.153                           │
│    • 185.199.109.153                           │
│    • 185.199.110.153                           │
│    • 185.199.111.153                           │
│                                                 │
│  Thời gian chờ DNS: 30 phút - 24 giờ           │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 🆘 Troubleshooting

| Triệu chứng | Nguyên nhân | Giải pháp |
|-------------|-------------|-----------|
| Lỗi "Tên Record không hợp lệ" | Dùng CNAME cho @ | Dùng A records |
| Website không mở | DNS chưa cập nhật | Chờ thêm 1-2 giờ |
| HTTPS lỗi | Chưa enforce HTTPS | GitHub Settings → enforce |
| www không hoạt động | Thiếu CNAME | Thêm www CNAME record |

---

**Print hoặc bookmark trang này để tham khảo nhanh! 📌**
