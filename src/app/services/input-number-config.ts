import { InputNumber } from 'primeng/inputnumber';

/**
 * Cấu hình toàn cục cho PrimeNG InputNumber:
 * Ưu tiên sử dụng format theo định dạng của máy tính và trình duyệt người dùng (Browser / OS Locale).
 * 
 * Các vị trí ô input number trong template bị hardcode thuộc tính locale="en-EN" hoặc locale="en-US"
 * sẽ được tự động bỏ qua để Intl.NumberFormat sử dụng locale mặc định của môi trường (undefined),
 * đảm bảo dấu phân cách hàng nghìn và dấu thập phân hiển thị và nhập liệu đồng bộ theo thiết lập máy người dùng.
 */
export function configureInputNumberLocale(): void {
  try {
    Object.defineProperty(InputNumber.prototype, 'locale', {
      get() {
        // Nếu không có locale hoặc là các giá trị hardcode ('en-EN', 'en-US'),
        // trả về undefined để Intl.NumberFormat tự động nhận diện locale của máy và trình duyệt.
        if (!this._localeOption || this._localeOption === 'en-EN' || this._localeOption === 'en-US') {
          return undefined;
        }
        return this._localeOption;
      },
      set(localeOption: string) {
        this._localeOption = localeOption;
        if (this.updateConstructParser) {
          this.updateConstructParser();
        }
      },
      configurable: true,
      enumerable: true,
    });
  } catch (error) {
    console.error('Lỗi khi cấu hình locale mặc định cho InputNumber:', error);
  }
}

// Tự động kích hoạt khi import
configureInputNumberLocale();
