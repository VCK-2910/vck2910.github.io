# 🎨 Admin Page Builder - Hướng Dẫn Sử Dụng

## 📋 Tổng Quan

Admin Page Builder là công cụ kéo thả trực quan giúp bạn xây dựng trang web mà không cần code, giống như web4s.

## 🚀 Cách Sử Dụng

### 1. Truy Cập Admin Panel

Mở file `admin/index.html` trong trình duyệt:
```
file:///d:/elgacho/admin/index.html
```

Hoặc nếu đã deploy lên GitHub Pages:
```
https://vck2910.id.vn/admin/
```

### 2. Giao Diện Admin

#### **Sidebar Trái - Component Library** 📦
Chứa 20+ components có sẵn, chia thành 4 nhóm:

**Layout Components:**
- 📄 Section - Phần content chính
- 📦 Container - Khung chứa content
- 📊 Row - Hàng với nhiều cột

**Content Components:**
- 📝 Heading - Tiêu đề
- ✍️ Text - Đoạn văn bản
- 🔘 Button - Nút bấm
- 🖼️ Image - Hình ảnh
- 🎬 Video - Video embed
- ➖ Divider - Đường phân cách
- ⬜ Spacer - Khoảng trống

**Menu/Navigation:**
- 🧭 Navbar - Menu điều hướng
- 🍽️ Menu Tabs - Menu danh mục món ăn

**Form Elements:**
- 📋 Form - Form hoàn chỉnh
- ⌨️ Input - Ô nhập liệu
- 📝 Textarea - Ô text lớn

**Special Components:**
- 🎴 Card - Thẻ nội dung
- 🖼️ Gallery - Bộ sưu tập ảnh
- 💬 Testimonial - Đánh giá khách hàng
- ⭐ Icon - Biểu tượng
- 🗺️ Map - Bản đồ Google
- 📱 Social Links - Mạng xã hội

#### **Canvas Giữa - Vùng Làm Việc** 🎨
- Kéo thả components vào đây
- Click vào element để chọn
- Zoom: 50% - 150%
- Responsive views: Desktop/Tablet/Mobile

#### **Sidebar Phải - Properties Panel** ⚙️
3 tabs chỉnh sửa:

**Content Tab:**
- Chỉnh sửa text/nội dung

**Style Tab:**
- Background color
- Text color
- Font size
- Padding (trên/phải/dưới/trái)

**Advanced Tab:**
- Chỉnh sửa HTML trực tiếp

### 3. Workflow Cơ Bản

#### **Bước 1: Thêm Component**
1. Kéo component từ sidebar trái
2. Thả vào canvas giữa
3. Component sẽ xuất hiện

#### **Bước 2: Chỉnh Sửa**
1. Click vào component đã thêm
2. Sidebar phải sẽ hiện properties
3. Thay đổi nội dung, màu sắc, kích thước

#### **Bước 3: Sắp Xếp**
Mỗi component có 4 nút điều khiển:
- ⬆️ Di chuyển lên
- ⬇️ Di chuyển xuống
- 📋 Sao chép
- 🗑️ Xóa

#### **Bước 4: Lưu & Export**

**Preview (Xem trước):**
```
Click nút "Preview" → Xem trang như người dùng
```

**Save (Lưu vào trình duyệt):**
```
Click nút "Save" → Lưu vào localStorage
Lần sau mở admin sẽ tự động hỏi có muốn load không
```

**Export (Xuất file HTML):**
```
Click nút "Export HTML" → Download file .html
File này có thể upload lên server hoặc GitHub Pages
```

## ⌨️ Phím Tắt

| Phím | Chức Năng |
|------|-----------|
| `Ctrl + Z` | Undo (hoàn tác) |
| `Ctrl + Shift + Z` hoặc `Ctrl + Y` | Redo (làm lại) |
| `Ctrl + S` | Save (lưu) |
| `Ctrl + D` | Duplicate (sao chép element đang chọn) |
| `Delete` | Xóa element đang chọn |

## 🎯 Toolbar Canvas

### Device Views
- 🖥️ **Desktop** - Xem trên PC (100% width)
- 📱 **Tablet** - Xem trên tablet (768px)
- 📱 **Mobile** - Xem trên điện thoại (375px)

### Zoom Controls
- ➖ Zoom Out (thu nhỏ)
- ➕ Zoom In (phóng to)
- Mức zoom: 50%, 75%, 100%, 125%, 150%

### History
- ↶ Undo - Hoàn tác bước trước
- ↷ Redo - Làm lại bước đã hoàn tác

## 💡 Tips & Tricks

### 1. Xây Dựng Layout
```
1. Kéo Section vào canvas
2. Kéo Container vào trong Section
3. Kéo Row để tạo cột
4. Thêm content vào các cột
```

### 2. Tùy Chỉnh Màu Sắc
```
1. Chọn element
2. Sang Style tab
3. Chọn Background color
4. Chọn Text color
```

### 3. Responsive Design
```
1. Xây dựng trên Desktop view
2. Chuyển sang Tablet view để kiểm tra
3. Chuyển sang Mobile view để điều chỉnh
```

### 4. Tái Sử Dụng Components
```
1. Tạo một component đẹp
2. Click nút Copy (hoặc Ctrl+D)
3. Chỉnh sửa nội dung của bản sao
```

### 5. Edit HTML Nâng Cao
```
1. Chọn element
2. Sang Advanced tab
3. Chỉnh sửa HTML trực tiếp
4. Paste code từ nguồn khác
```

## 🔧 Tính Năng Nâng Cao

### Auto Save
- Tự động lưu 50 bước thao tác gần nhất
- Có thể Undo/Redo không giới hạn trong session

### Local Storage
- Lưu page vào trình duyệt
- Mở lại admin sẽ hỏi có load không
- An toàn ngay cả khi tắt máy

### Export Clean HTML
- File export không chứa code admin
- Chỉ có HTML/CSS thuần túy
- Sẵn sàng deploy

## 🚢 Deploy Trang Đã Tạo

### Cách 1: Thay Thế index.html Hiện Tại
```bash
1. Export HTML từ admin
2. Đổi tên file thành index.html
3. Replace file index.html cũ
4. Commit & push lên GitHub
```

### Cách 2: Tạo Trang Mới
```bash
1. Export HTML
2. Đổi tên thành about.html hoặc menu.html
3. Add vào repo
4. Push lên GitHub
5. Truy cập: vck2910.id.vn/about.html
```

### Cách 3: Integraton với Trang Hiện Tại
```bash
1. Export HTML
2. Copy phần trong <body>
3. Paste vào index.html tại vị trí muốn thêm
4. Push lên GitHub
```

## 📝 Ví Dụ Workflow

### Tạo Trang "About Us"

```
1. Kéo Section (Hero)
   - Background: #C41E3A
   - Text color: white
   - Padding: 100px
   - Content: "About Our Restaurant"

2. Kéo Section (Story)
   - Kéo Container vào
   - Kéo Row (2 columns) vào Container
   - Column 1: Image
   - Column 2: Text với story

3. Kéo Section (Team)
   - Kéo Gallery vào
   - Thay hình team members
   
4. Kéo Section (Testimonials)
   - Kéo nhiều Testimonial cards
   
5. Preview → Save → Export
```

## ❓ Troubleshooting

### Component không hiển thị sau khi kéo?
- Kiểm tra đã thả đúng vào canvas chưa
- Refresh trang và thử lại

### Không thể chỉnh sửa properties?
- Đảm bảo đã click chọn element (viền xanh)
- Thử chọn lại element

### Export HTML bị lỗi?
- Kiểm tra trình duyệt có cho phép download không
- Thử trên trình duyệt khác (Chrome recommended)

### Save/Load không hoạt động?
- Kiểm tra localStorage có bị disabled không
- Xóa cache trình duyệt và thử lại

## 🎓 Học Thêm

### Customization
- Chỉnh sửa `css/admin.css` để thay đổi giao diện admin
- Chỉnh sửa `js/admin.js` để thêm tính năng mới
- Thêm components mới vào `getComponentTemplate()`

### Integration
- Có thể tích hợp với backend PHP/Node.js
- Có thể lưu vào database thay vì localStorage
- Có thể thêm user authentication

## 📞 Support

Nếu gặp vấn đề:
1. Kiểm tra Console (F12) xem có lỗi không
2. Đảm bảo file structure đúng
3. Test trên Chrome/Edge mới nhất

## 🎉 Tính Năng Sắp Có

- [ ] Responsive breakpoint editor
- [ ] Animation builder
- [ ] Template library
- [ ] Multi-page management
- [ ] Collaboration features
- [ ] Version control
- [ ] Media library
- [ ] SEO settings panel

---

**Happy Building! 🚀**

Giờ bạn có thể tạo trang web chuyên nghiệp mà không cần code!
