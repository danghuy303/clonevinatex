import { InputNumber } from 'primeng/inputnumber';

export function configureDecimalEditing(): void {
  const prototype = InputNumber.prototype;
  const drafts = new WeakMap<InputNumber, string>();
  const originalFocus = prototype.onInputFocus;
  const originalBlur = prototype.onInputBlur;
  const originalInput = prototype.onUserInput;
  const originalKeyDown = prototype.onInputKeyDown;
  const originalFormattedValue = prototype.formattedValue;
  const originalSpin = prototype.spin;
  const originalWriteValue = prototype.writeValue;

  function normalize(input: InputNumber, text: string): string {
    return text.replace(input._decimal, '.').replace(',', '.')
      .replace(input._minusSign, '-').replace(input._numeral, input._index);
  }

  function numericValue(text: string): number | null {
    return /\d/.test(text) ? Number(text) : null;
  }

  function editText(input: InputNumber, display: string): string {
    return input.format ? display.replace(input._group, '') : display;
  }

  prototype.onInputFocus = function (event) {
    if (this.mode === 'decimal' && !this.prefix && !this.suffix &&
        this.numberFormat.resolvedOptions().maximumFractionDigits > 0) {
      const element = this.input.nativeElement as HTMLInputElement;
      const draft = editText(this, element.value);
      element.value = draft;
      drafts.set(this, draft);
    }
    originalFocus.call(this, event);
  };

  // Keep native text editing and caret behavior while a decimal draft is active.
  for (const method of ['onInputKeyPress', 'onPaste', 'onInputClick'] as const) {
    const original = prototype[method];
    prototype[method] = function (event?: Event) {
      if (!drafts.has(this)) {
        original.call(this, event);
      }
    };
  }

  prototype.onInputKeyDown = function (event) {
    if (!drafts.has(this) || event.which === 38 || event.which === 40) {
      originalKeyDown.call(this, event);
    }
  };

  prototype.onUserInput = function (event: InputEvent) {
    const previous = drafts.get(this);
    if (previous === undefined) {
      originalInput.call(this, event);
      return;
    }
    const element = this.input.nativeElement as HTMLInputElement;
    const draft = element.value;
    const normalized = normalize(this, draft);
    const { maximumFractionDigits } = this.numberFormat.resolvedOptions();
    if (!/^-?\d*(?:\.\d*)?$/.test(normalized) ||
        (normalized.split('.')[1]?.length || 0) > maximumFractionDigits) {
      const caret = Math.max(0, (element.selectionStart || 0) - Math.max(0, draft.length - previous.length));
      element.value = previous;
      element.setSelectionRange(caret, caret);
      return;
    }

    drafts.set(this, draft);
    const value = numericValue(normalized);
    element.setAttribute('aria-valuenow', value === null ? '' : String(value));
    this.handleOnInput(event, numericValue(normalize(this, previous)), value);
  };

  prototype.formattedValue = function () {
    return drafts.get(this) ?? originalFormattedValue.call(this);
  };

  prototype.writeValue = function (value) {
    originalWriteValue.call(this, value);
    const draft = drafts.get(this);
    if (draft !== undefined && numericValue(normalize(this, draft)) !== value) {
      drafts.set(this, editText(this, this.formatValue(value)));
    }
  };

  prototype.spin = function (event, direction) {
    const draft = drafts.get(this);
    if (draft === undefined) {
      originalSpin.call(this, event, direction);
      return;
    }
    const current = numericValue(normalize(this, draft));
    const value = this.validateValue((current ?? 0) + this.step * direction);
    const display = this.formatValue(value);
    if (this.maxlength && display.length > this.maxlength) {
      return;
    }
    const element = this.input.nativeElement as HTMLInputElement;
    const text = editText(this, display);
    element.value = text;
    drafts.set(this, text);
    element.setAttribute('aria-valuenow', String(value));
    this.updateModel(event, value);
    this.handleOnInput(event, current, value);
  };

  prototype.onInputBlur = function (event) {
    const draft = drafts.get(this);
    if (draft === undefined) {
      originalBlur.call(this, event);
      return;
    }
    drafts.delete(this);
    const element = this.input.nativeElement as HTMLInputElement;
    const parsed = numericValue(normalize(this, draft));
    const value = parsed === null ? null : this.validateValue(parsed);
    this.focused = false;
    element.value = this.formatValue(value);
    element.setAttribute('aria-valuenow', value === null ? '' : String(value));
    this.updateModel(event, value);
    this.onBlur.emit(event);
  };
}
