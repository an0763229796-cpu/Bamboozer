# Bamboozer AI Quant Trading

Bamboozer là website giới thiệu nền tảng giao dịch định lượng đa tài sản bằng AI. Website tập trung vào mô hình **Non-Custodial**: người dùng giữ tài sản trên tài khoản sàn cá nhân, còn Bamboozer kết nối thông qua API với quyền đọc và đặt lệnh, không yêu cầu quyền rút tiền.

## Nội dung Website

### Hero và AI Asset Analysis

- Giới thiệu nền tảng AI Quant Trading.
- Mô phỏng phân tích BTC, ETH, NVDA, XAU/USD và EUR/USD.
- Hiển thị khuyến nghị BUY/SELL/HOLD.
- Confidence Score và đồng thuận nhiều khung thời gian.
- Entry Zone, Stop Loss theo ATR và Take Profit.
- Lý do kỹ thuật, Fear & Greed, DXY và VIX.
- Biểu đồ nến, order book, spread và WebSocket telemetry.

### Hạt lượng tử WebGL

- Hiệu ứng hạt lượng tử Three.js dùng làm nền toàn website.
- Chỉ render một canvas dùng chung để giảm tải khi cuộn.
- Tự dừng khi vùng hiệu ứng không còn hiển thị.
- Có cơ chế giảm mật độ particle, DPR và chi phí tính toán trên GPU.

### Value Pillars

Website giải thích ba lợi thế chính:

1. **Non-Custodial**: không giữ tiền và không yêu cầu quyền rút tiền.
2. **White-Box Explainable AI**: giải thích cơ sở phân tích thay vì dùng tín hiệu hộp đen.
3. **All-in-One Trading Lifecycle**: phân tích, viết indicator, backtest, chạy bot và theo dõi PnL trong một giao diện.

### Blockchain và API Security

- AES-256-GCM client-side encryption.
- HMAC-SHA256 order signing.
- API key không có quyền rút tiền.
- Mô phỏng quy trình xác thực lệnh mã hóa.
- Bảng so sánh quyền API được phép và bị cấm.

### Audience Section

Website có nội dung riêng cho:

- Full-time Trader.
- Part-time Trader.
- Beginner Trader.

Mỗi nhóm có mô tả, lợi ích, công cụ đề xuất và CTA riêng.

### Integrations

Danh sách các sàn crypto được hỗ trợ gồm Binance, OKX, Bybit, Bitget, Coinbase, Kraken, KuCoin, Gate.io, Bitfinex, Deepcoin và HTX.

Website cũng giới thiệu các nền tảng Stocks/Forex:

- Interactive Brokers.
- Alpaca Finance.
- MetaTrader 4/5.
- TradingView Webhook.
- OANDA / Forex.com.

Logo Bamboozer và logo sàn được ưu tiên lấy từ asset local trong `src/assets/images`, với fallback CDN cho các logo chưa có file local.

### Product Modules

Sáu module được trình diễn bằng các mockup tương tác:

- AI Asset Analysis.
- Indicator IDE và Pine Script AI.
- Trading Bot, Grid Bot và Smart DCA.
- Strategy Dashboard và PnL Metrics.
- Trading Terminal và Market Signal Center.
- Exchange Accounts và API Connection.

### Onboarding

Quy trình bắt đầu gồm ba bước:

1. Kết nối sàn qua API.
2. Chọn và cấu hình công cụ.
3. Theo dõi danh mục và luôn giữ quyền kiểm soát.

### Video Tutorials

Website có khu vực Bamboozer Academy với các video mô phỏng về:

- Tổng quan nền tảng.
- Phân tích thị trường và Confidence Score.
- Grid Bot và DCA Bot.
- Indicator IDE.
- Tạo API key an toàn không có quyền rút tiền.

### Pricing và Credits

- Các gói Free, Basic, Pro và Premium.
- Thanh toán theo tháng hoặc theo năm.
- Tính toán số Credits cần dùng theo số lượt phân tích và số bot.
- Hiển thị giới hạn AI, bot và tài khoản API theo từng gói.
- Mô tả các quy tắc sử dụng Credits.

### FAQ và Footer

- FAQ về bảo mật, lợi nhuận, bot, Credits và thị trường hỗ trợ.
- Risk disclosure cho giao dịch crypto, cổ phiếu, hàng hóa và forex.
- Thông tin công ty, điều khoản dịch vụ, chính sách bảo mật và API security.

## Tính năng tương tác

- Chuyển ngôn ngữ `VI / 中文` trên Navbar.
- Ngôn ngữ được lưu trong `localStorage`.
- Responsive layout cho desktop, tablet và mobile.
- Mobile menu riêng để tránh header bị tràn.
- Tawk.to chatbox trên desktop và tự ẩn trên mobile.
- Contact form gửi email qua FormSubmit AJAX.
- Referral modal và Register modal.
- Quick Guide drawer cho từng module.
- Demo video modal.
- Logo và hình ảnh sàn giao dịch từ asset local.

## Công nghệ

- React 19.
- TypeScript.
- Vite.
- Tailwind CSS v4.
- Three.js.
- Lucide React.
- Motion.
- Express và dotenv cho các phần mở rộng server.
- Vercel Speed Insights và Vercel Analytics có thể tích hợp thêm khi deploy.

## Cài đặt và chạy local

Yêu cầu Node.js và npm.

```bash
npm install
npm run dev
```

Mở website tại:

```text
http://localhost:3000
```

## Các lệnh chính

```bash
npm run dev       # Chạy development server
npm run lint      # Typecheck TypeScript
npm run build     # Build production
npm run preview   # Xem bản build production
```

Trên Windows PowerShell, nếu `npm` bị chặn bởi Execution Policy, dùng:

```bash
npm.cmd run lint
npm.cmd run build
```

## Biến môi trường

Sao chép `.env.example` thành `.env.local` nếu cần cấu hình môi trường:

```dotenv
GEMINI_API_KEY="your_gemini_api_key"
APP_URL="http://localhost:3000"
```

`GEMINI_API_KEY` dùng cho các tính năng gọi Gemini AI. Không commit API key thật vào repository.

## Email liên hệ

Contact form gửi request tới FormSubmit và chuyển nội dung tới địa chỉ email cấu hình trong `ContactModal`. Lần gửi đầu tiên có thể yêu cầu xác nhận kích hoạt từ FormSubmit.

## Tawk.to Chat

Widget Tawk.to được đặt trong `index.html`. Widget bị ẩn trên viewport mobile để tránh che nội dung và làm chật giao diện.

## Vercel Analytics và Speed Insights

Đây là các tích hợp tùy chọn cho production. Project hiện là Vite React, không phải Next.js.

Cài đặt:

```bash
npm install @vercel/analytics @vercel/speed-insights
```

Trong `src/main.tsx`, có thể thêm component tương ứng cho React/Vite theo tài liệu chính thức của Vercel trước khi deploy.

- [Vercel Analytics](https://vercel.com/docs/analytics/quickstart)
- [Vercel Speed Insights](https://vercel.com/docs/speed-insights/quickstart)

Sau khi deploy, mở website production để bắt đầu thu thập dữ liệu. Content blocker hoặc trình duyệt bảo mật có thể ngăn các request analytics.

## Build output

Bản production được tạo trong thư mục `dist/`. Khi deploy static hosting, dùng `dist` làm thư mục publish.

## Lưu ý

- Các giá trị phân tích, giá, PnL và tín hiệu trong mockup chỉ nhằm mục đích minh họa giao diện.
- Giao dịch tài chính luôn có rủi ro. Website không cung cấp cam kết lợi nhuận.
- Không cấp quyền rút tiền cho API key kết nối với dịch vụ bên thứ ba.
