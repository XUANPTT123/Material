export class ArrayUtils {
  /** 🗺️ Duyệt mảng và biến đổi từng phần tử */
  static map<T, R>(arr: T[], callback: (item: T) => R): R[] {
    return arr.map(callback);
  }

  /** 🔍 Lọc ra phần tử thỏa điều kiện */
  static filter<T>(arr: T[], condition: (item: T) => boolean): T[] {
    return arr.filter(condition);
  }

  /** 🧭 Tìm phần tử đầu tiên thỏa điều kiện */
  static find<T>(arr: T[], condition: (item: T) => boolean): T | undefined {
    return arr.find(condition);
  }

  /** ➕ Cộng dồn hoặc gộp dữ liệu */
  static reduce<T, R>(arr: T[], reducer: (acc: R, item: T) => R, initialValue: R): R {
    return arr.reduce(reducer, initialValue);
  }

  /** ✅ Có ít nhất 1 phần tử thỏa điều kiện */
  static some<T>(arr: T[], condition: (item: T) => boolean): boolean {
    return arr.some(condition);
  }

  /** 🧾 Tất cả phần tử đều thỏa điều kiện */
  static every<T>(arr: T[], condition: (item: T) => boolean): boolean {
    return arr.every(condition);
  }

  /** 📥 Thêm phần tử vào cuối mảng (trả về mảng mới) */
  static push<T>(arr: T[], item: T): T[] {
    return [...arr, item];
  }

  /** 📤 Xóa phần tử đầu tiên (trả về mảng mới) */
  static shift<T>(arr: T[]): T[] {
    return arr.slice(1);
  }

  /** 🔢 Sắp xếp mảng (copy để không thay đổi mảng gốc) */
  static sort<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
    return [...arr].sort(compareFn);
  }
}
