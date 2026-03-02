# ⚠️ LỖI: "Tên Record không hợp lệ" - CNAME trùng với domain gốc

## 🐛 Lỗi gặp phải

Khi bạn thêm DNS record:
```
Type: CNAME
Host: @ (hoặc để trống)
Value: vck2910.github.io
```

**Bạn nhận lỗi:**
> ❌ "Tên Record không hợp lệ. Bạn không thể tạo CNAME record trùng với domain gốc!"

---

## 💡 Giải Thích

### Tại sao lỗi này xảy ra?

**CNAME** (Canonical Name) record **KHÔNG THỂ** dùng cho:
- Root domain / Zone apex (ký hiệu `@` hoặc để trống Host)
- Ví dụ: `vck2910.id.vn`

**Lý do kỹ thuật:**
- Root domain cần có các record bắt buộc: NS (Name Server), SOA (Start of Authority)
- CNAME sẽ "ghi đè" toàn bộ records khác
- DNS chuẩn (RFC 1912) **CẤM** CNAME tại root domain

---

## ✅ Giải Pháp: Dùng A Records

### Cho GitHub Pages:

**Thay vì CNAME, dùng 4 A Records:**

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A | @ | 185.199.108.153 | 3600 |
| A | @ | 185.199.109.153 | 3600 |
| A | @ | 185.199.110.153 | 3600 |
| A | @ | 185.199.111.153 | 3600 |

**Và 1 CNAME cho www:**

| Type | Host | Value | TTL |
|------|------|-------|-----|
| CNAME | www | vck2910.github.io | 3600 |

---

## 📝 Các Bước Chi Tiết

### **Bước 1: Vào Zonedns.vn**
1. Đăng nhập
2. Chọn domain: `vck2910.id.vn`
3. Vào "Quản lý DNS" hoặc "DNS Management"

### **Bước 2: Xóa Record Sai (nếu có)**
- Nếu có CNAME record với Host `@` → **Xóa nó**
- Nếu có A records cũ với Host `@` → **Xóa hết**

### **Bước 3: Thêm 4 A Records**

**Thêm record thứ 1:**
- Nhấn **"Add Record"** hoặc **"+"**
- Type: **A**
- Host: **@** (hoặc để trống)
- Value: **185.199.108.153**
- TTL: **3600**
- **Save**

**Thêm record thứ 2:**
- Nhấn **"Add Record"** lần nữa
- Type: **A**
- Host: **@**
- Value: **185.199.109.153**
- TTL: **3600**
- **Save**

**Thêm record thứ 3:**
- Type: **A**
- Host: **@**
- Value: **185.199.110.153**
- TTL: **3600**
- **Save**

**Thêm record thứ 4:**
- Type: **A**
- Host: **@**
- Value: **185.199.111.153**
- TTL: **3600**
- **Save**

### **Bước 4: Thêm CNAME cho www**
- Nhấn **"Add Record"**
- Type: **CNAME**
- Host: **www**
- Value: **vck2910.github.io**
- TTL: **3600**
- **Save**

### **Bước 5: Cấu hình GitHub Pages**

1. Vào **GitHub repo** → **Settings** → **Pages**
2. Ở phần **"Custom domain"**, nhập: `vck2910.id.vn`
3. Nhấn **Save**
4. Chờ verify (1-5 phút)
5. Khi có dấu ✅, tick **"Enforce HTTPS"**

### **Bước 6: Chờ DNS Cập Nhật**
- ⏳ **30 phút - 2 giờ**: Thường xong
- ⏳ **Tối đa 24 giờ**: Hiếm gặp

---

## 🔍 Kiểm Tra Cấu Hình

### Kiểm tra A records:
```powershell
nslookup vck2910.id.vn
```

**Kết quả mong đợi:**
```
Name:    vck2910.id.vn
Addresses:  185.199.108.153
            185.199.109.153
            185.199.110.153
            185.199.111.153
```

### Kiểm tra CNAME cho www:
```powershell
nslookup www.vck2910.id.vn
```

**Kết quả mong đợi:**
```
www.vck2910.id.vn    canonical name = vck2910.github.io
```

---

## 📊 Bảng So Sánh

| Thuộc tính | CNAME @ (❌ SAI) | A Records (✅ ĐÚNG) |
|------------|------------------|---------------------|
| **Cho root domain** | ❌ Không được phép | ✅ Được phép |
| **Cho subdomain (www)** | ✅ Được phép | ✅ Được phép |
| **Với GitHub Pages** | ❌ Lỗi | ✅ Hoạt động |
| **Tuân thủ DNS chuẩn** | ❌ Vi phạm RFC 1912 | ✅ Đúng chuẩn |

---

## ❓ FAQ

### Q: Tại sao phải thêm 4 A records?
**A:** GitHub Pages có 4 IP servers để load balancing và failover. Thêm cả 4 để đảm bảo uptime cao.

### Q: Có thể chỉ thêm 1 A record không?
**A:** Có, nhưng không khuyến nghị. Nếu server đó down thì website bạn cũng down.

### Q: CNAME có dùng được cho subdomain không?
**A:** Có! CNAME dùng tốt cho:
- `www.vck2910.id.vn`
- `blog.vck2910.id.vn`
- `shop.vck2910.id.vn`

### Q: Netlify/Vercel có bị lỗi tương tự không?
**A:** Có! Những platform này thường yêu cầu:
- A record (hoặc ALIAS/ANAME) cho root domain
- CNAME cho subdomain

---

## 🆘 Vẫn Lỗi?

### Checklist:
- [ ] Đã xóa CNAME record cũ với Host `@`?
- [ ] Đã thêm **cả 4** A records?
- [ ] Host là `@` (không phải `vck2910` hay gì khác)?
- [ ] Đã Save sau mỗi record?
- [ ] Đã đợi 30 phút?
- [ ] Đã cấu hình Custom Domain trên GitHub?

---

## 📚 Tham Khảo

- [GitHub Pages - DNS Config](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [RFC 1912 - DNS Requirements](https://datatracker.ietf.org/doc/html/rfc1912)
- [DNS CNAME Limitations](https://www.rfc-editor.org/rfc/rfc1912.html#section-2.4)

---

**Chúc bạn thành công! 🎉**
