import { DecimalPipe } from '@angular/common';
import { InputNumber } from 'primeng/inputnumber';
import { parseLocaleNumber } from './globalfunction';

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

    // Chuẩn hóa getOptions để tránh lỗi RangeError khi minFractionDigits > 3 hoặc truyền chuỗi rỗng ""
    const originalGetOptions = InputNumber.prototype.getOptions;
    if (originalGetOptions) {
      InputNumber.prototype.getOptions = function () {
        const options = originalGetOptions.call(this);
        if (options.minimumFractionDigits === ('' as any) || options.minimumFractionDigits === null) {
          options.minimumFractionDigits = undefined;
        } else if (typeof options.minimumFractionDigits === 'string') {
          const parsedMin = parseInt(options.minimumFractionDigits, 10);
          options.minimumFractionDigits = isNaN(parsedMin) ? undefined : parsedMin;
        }
        if (options.maximumFractionDigits === ('' as any) || options.maximumFractionDigits === null) {
          options.maximumFractionDigits = undefined;
        } else if (typeof options.maximumFractionDigits === 'string') {
          const parsedMax = parseInt(options.maximumFractionDigits, 10);
          options.maximumFractionDigits = isNaN(parsedMax) ? undefined : parsedMax;
        }
        if (
          typeof options.minimumFractionDigits === 'number' &&
          (options.maximumFractionDigits === undefined || options.maximumFractionDigits < options.minimumFractionDigits)
        ) {
          options.maximumFractionDigits = Math.max(options.minimumFractionDigits, 3);
        }
        return options;
      };
    }

    // Hỗ trợ nhập dấu thập phân theo định dạng máy ngay cả khi minFractionDigits = 0 hoặc undefined
    const originalInsert = InputNumber.prototype.insert;
    if (originalInsert) {
      InputNumber.prototype.insert = function (
        event: any,
        text: string,
        sign: { isDecimalSign?: boolean; isMinusSign?: boolean } = { isDecimalSign: false, isMinusSign: false }
      ) {
        if (sign && sign.isDecimalSign && this.input?.nativeElement) {
          const inputEl = this.input.nativeElement;
          const selectionStart = inputEl.selectionStart;
          const selectionEnd = inputEl.selectionEnd;
          const inputValue = inputEl.value.trim();
          const decimalCharIndex = inputValue.search(this._decimal);
          if (this._decimal) {
            this._decimal.lastIndex = 0;
          }
          const maxFractionDigits = this.numberFormat
            ? this.numberFormat.resolvedOptions().maximumFractionDigits
            : 3;

          if (decimalCharIndex === -1 && maxFractionDigits > 0) {
            const decimalChar =
              new Intl.NumberFormat(this.locale, { useGrouping: false })
                .format(1.1)
                .replace(this._numeral, '')
                .trim()
                .charAt(0) || text;
            const prefix = inputValue.slice(0, selectionStart) || '0';
            const suffix = inputValue.slice(selectionEnd);
            inputEl.value = prefix + decimalChar + suffix;
            const newPos = prefix.length + decimalChar.length;
            inputEl.setSelectionRange(newPos, newPos);
            return;
          }
        }
        return originalInsert.call(this, event, text, sign);
      };
    }

    // Cấu hình toàn cục cho Angular DecimalPipe (| number) để hiển thị text số đồng bộ theo định dạng máy
    if (DecimalPipe && DecimalPipe.prototype) {
      DecimalPipe.prototype.transform = function (value: any, digitsInfo?: string, locale?: string): any {
        if (value === null || value === undefined || value === '') {
          return null;
        }
        const num = typeof value === 'number' ? value : parseLocaleNumber(value);
        if (num === null || isNaN(num)) {
          return null;
        }

        let minInt = 1;
        let minFrac = 0;
        let maxFrac = 3;

        if (typeof digitsInfo === 'string' && digitsInfo.trim() !== '') {
          const match = digitsInfo.trim().match(/^(\d+)?\.(?:(\d+)(?:-(\d+))?)?$/);
          if (match) {
            if (match[1] !== undefined) {
              minInt = parseInt(match[1], 10);
            }
            if (match[2] !== undefined) {
              minFrac = parseInt(match[2], 10);
              maxFrac = minFrac;
            }
            if (match[3] !== undefined) {
              maxFrac = parseInt(match[3], 10);
            }
          }
        }

        minInt = Math.max(1, Math.min(21, isNaN(minInt) ? 1 : minInt));
        minFrac = Math.max(0, Math.min(20, isNaN(minFrac) ? 0 : minFrac));
        maxFrac = Math.max(minFrac, Math.min(20, isNaN(maxFrac) ? Math.max(minFrac, 3) : maxFrac));

        const targetLocale = (!locale || locale === 'en-EN' || locale === 'en-US' || locale === 'en') ? undefined : locale;

        try {
          return new Intl.NumberFormat(targetLocale, {
            minimumIntegerDigits: minInt,
            minimumFractionDigits: minFrac,
            maximumFractionDigits: maxFrac,
            useGrouping: true,
          }).format(num);
        } catch {
          return num.toLocaleString(targetLocale, {
            minimumFractionDigits: minFrac,
            maximumFractionDigits: maxFrac,
          });
        }
      };
    }
  } catch (error) {
    console.error('Lỗi khi cấu hình locale mặc định cho InputNumber:', error);
  }
}

// Tự động kích hoạt khi import
configureInputNumberLocale();
