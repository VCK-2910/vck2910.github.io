# 🚀 Quick Start: Deploy với GitHub Pages (5 phút)

**Cách NHANH NHẤT & MIỄN PHÍ để đưa website lên mạng**

---

## ✅ Chuẩn bị

- [ ] Có tài khoản GitHub (hoặc tạo tại github.com)
- [ ] Có folder `d:\elgacho` với website
- [ ] Có Git cài đặt (tải từ git-scm.com)

---

## 🎯 5 Bước Deploy

### **Bước 1: Tạo GitHub Account (2 phút)**

1. Vào **github.com**
2. Nhấn **"Sign up"**
3. Tạo username (ví dụ: `vck2910`)
4. Xác nhận email

💡 **Username này dùng cho cây ticket lần sau!**

---

### **Bước 2: Tạo Repository (1 phút)**

1. **Đăng nhập GitHub**
2. Nhấn **dấu "+" góc trên trái** → **"New repository"**
3. **Tên repo phải chính xác:** `vck2910.github.io`
   - (thay `vck2910` bằng GitHub username của bạn)
4. Chọn **"Public"**
5. Nhấn **"Create repository"**

> ⚠️ **TÊN REPO PHẢI CHÍNH XÁC, NẾU SAI SẼ KHÔNG HOẠT ĐỘNG!**

---

### **Bước 3: Upload Website (1 phút)**

**Cách dễ nhất - Web Interface:**

1. Vào repo vừa tạo
2. Nhấn **"Add file"** → **"Upload files"**
3. **Kéo thả folder `d:\elgacho` vào đây**
   - (hoặc select files → chọn từng file)
4. Nhấn **"Commit changes"**

**✅ DONE! Code đã lên GitHub**

---

### **Bước 4: Kích Hoạt GitHub Pages (30 giây)**

1. Vào repo → **Settings** (đầu trang)
2. Click **"Pages"** (sidebar trái)
3. Xác nhận:
   - Source: **`main`** branch
   - Folder: **`/ (root)`**
4. Chờ 1-2 phút, GitHub sẽ deploy tự động

**✅ Website sẽ nhìn thấy tại:** `https://vck2910.github.io`

---

### **Bước 5: Trỏ Domain vck2910.id.vn (1 phút)**

**Vào zonedns.vn:**

1. **Đăng nhập** tài khoản zonedns
2. Chọn domain **`vck2910.id.vn`**
3. Tìm **"DNS Management"** hoặc **"Zone Management"**
4. **Thêm CNAME Record:**

| Field | Value |
|-------|-------|
| **Type** | CNAME |
| **Host** | @ (hoặc để trống) |
| **Target/Value** | `vck2910.github.io` |
| **TTL** | 3600 |

5. **Save**

**⏳ Chờ 30 phút - 24 giờ** (bình thường 1-2 giờ)

---

## ✨ Kiểm Tra Kết Quả

```
Mở trình duyệt:
👉 https://vck2910.id.vn

Nếu thấy website → ✅ THÀNH CÔNG!
```

---

## 📝 Cập Nhật Website Lần Sau

**Mỗi khi muốn update:**

### Cách 1: Web Interface (Dễ nhất)
1. Vào repo trên GitHub
2. Chọn file cần edit
3. Nhấn ✏️ (edit)
4. Thay đổi nội dung
5. Nhấn **"Commit changes"**
6. **Done! Website cập nhật tự động trong 1-2 phút**

### Cách 2: Dùng Git (Pro)
```powershell
cd d:\elgacho
git add .
git commit -m "Update content"
git push
```

---

## 🎉 Bạn Làm Xong!

| Công Việc | Status |
|-----------|--------|
| Website tĩnh | ✅ |
| Upload GitHub | ✅ |
| GitHub Pages | ✅ |
| Domain | ✅ |
| HTTPS | ✅ (tự động) |
| Miễn phí | ✅ |

---

## ❓ Có Vấn Đề?

**Website không hiển thị:**
- [ ] Chờ 30 phút DNS update
- [ ] Refresh: `Ctrl + F5` (xóa cache)
- [ ] Kiểm tra repo name có đúng `[username].github.io` không

**Cần chi tiết hơn?**
- Xem file `DEPLOYMENT_GUIDE.md` (4 cách khác)

---

**Năng lượng! 🚀 Website của bạn sắp lên mạng!**
