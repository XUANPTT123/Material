/**
 * 🧩 Các hàm tiện ích xử lý chuỗi (String Utils)
 * Dùng trong Playwright hoặc JS/TS project
 */

export class StringUtils {
  /** ✂️ Xóa khoảng trắng đầu & cuối */
  static trim(str: string): string {
    return str.trim();
  }

  /** 🔡 Chuyển hết sang chữ thường */
  static toLower(str: string): string {
    return str.toLowerCase();
  }

  /** 🔠 Chuyển hết sang chữ in hoa */
  static toUpper(str: string): string {
    return str.toUpperCase();
  }

  /** 🔍 Kiểm tra chuỗi có chứa đoạn con hay không */
  static includes(str: string, sub: string): boolean {
    return str.includes(sub);
  }

  /** 🔄 Thay thế đoạn text (mặc định chỉ thay lần đầu) */
  static replace(str: string, from: string, to: string): string {
    return str.replace(from, to);
  }

  /** 🔄 Thay tất cả các đoạn giống nhau bằng regex */
  static replaceAll(str: string, from: string, to: string): string {
    const regex = new RegExp(from, "g");
    return str.replace(regex, to);
  }

  /** ✂️ Cắt chuỗi thành mảng theo ký tự phân tách */
  static split(str: string, separator: string): string[] {
    return str.split(separator);
  }

  /** 🧮 Lấy chuỗi con từ start đến end */
  static substring(str: string, start: number, end?: number): string {
    return str.substring(start, end);
  }

  /** 🔢 Tìm vị trí đầu tiên của chuỗi con */
  static indexOf(str: string, sub: string): number {
    return str.indexOf(sub);
  }

  /** 🆕 Viết hoa chữ cái đầu tiên của từng từ */
  static capitalizeWords(str: string): string {
    return str
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  /** 🔁 Đảo ngược chuỗi */
  static reverse(str: string): string {
    return str.split("").reverse().join("");
  }

  /** 🎲 Tạo chuỗi ngẫu nhiên (ví dụ cho test data) */
  static randomString(length: number): string {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}
