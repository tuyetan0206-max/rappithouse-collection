# Rappit House Collection

Website giống mẫu: tra cứu hoa, xem ai sở hữu, BXH thành viên, thành viên tự tích/xóa hoa.

## Chạy thử
```bash
npm install
npm run dev
```
Mở http://localhost:3000

## Deploy Vercel
Upload thư mục này lên GitHub, sau đó Vercel → New Project → Import → Deploy.

## Dùng online thật cho 34 thành viên
1. Tạo project Supabase.
2. Chạy `supabase/schema.sql` trong SQL Editor.
3. Copy `.env.example` thành `.env.local`, điền URL và ANON KEY.
4. Sau này có thể thay phần localStorage trong `app/page.tsx` bằng Supabase realtime để tất cả thành viên cập nhật chung.
