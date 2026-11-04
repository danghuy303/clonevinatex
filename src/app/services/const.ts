export const vn =
{
    firstDayOfWeek: 0,
    dayNames: ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"],
    dayNamesShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
    dayNamesMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
    monthNames: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
    monthNamesShort: ["Th1", "Th2", "Th3", "Th4", "Th5", "Th6", "Th7", "Th8", "Th9", "Th10", "Th11", "Th12"],
    today: 'Hôm nay',
    clear: 'Xóa',
    dateFormat: 'dd/mm/yyyy',
    weekHeader: 'Tuần'
};

export const vungMien = [
    { label: 'Miền Bắc', value: 'MienBac' },
    { label: 'Miền Trung', value: 'MienTrung' },
    { label: 'Miền Nam', value: 'MienNam' }
];

export const capQuanLy = [
    { label: 'Chưa có giấy tờ pháp lý', value: 1 },
    { label: 'Có quyết định giao đất', value: 2 },
    { label: 'Có hợp đồng thuê', value: 3 },
    { label: 'Có sổ đỏ', value: 4 },
];

export const congDoan = [
    { label: 'Chải', value: 'CHAI' },
    { label: 'Chải kỹ', value: 'CHAIKY' },
    { label: 'Ghép đợt I (sơ bộ)', value: 'GHEPDOT1' },
    { label: 'Ghép đợt II (đầu ra)', value: 'GHEPDOT2' },
    { label: 'Thô', value: 'THO' },
    { label: 'Sợi con', value: 'SOICON' },
    { label: 'Sợi ống', value: 'SOIONG' },
];

export const maskOption = {
    mask: "separator.3",
    thousand: ",",
};

export interface DonViTinhSanLuongContext {
    value: string;
    label: string;
    fieldLabel: string;
    unit: string;
}

export const listDonViTinh_SanLuong: { label: string; value: string }[] = [
    { label: 'Bảo dưỡng theo sản lượng (tấn)', value: 'SanLuong' },
    { label: 'Bảo dưỡng theo Giờ', value: 'Gio' },
    { label: 'Bảo dưỡng theo Km', value: 'Km' },
    { label: 'Bảo dưỡng theo Tấn/km', value: 'TanKm' },
];

export const DON_VI_TINH_SAN_LUONG_CONFIG: Record<string, DonViTinhSanLuongContext> = {
    'SanLuong': {
        value: 'SanLuong',
        label: 'Bảo dưỡng theo sản lượng (tấn)',
        fieldLabel: 'Sản lượng (tấn)',
        unit: 'tấn'
    },
    'Gio': {
        value: 'Gio',
        label: 'Bảo dưỡng theo Giờ',
        fieldLabel: 'Bảo dưỡng theo Giờ',
        unit: 'giờ'
    },
    'Km': {
        value: 'Km',
        label: 'Bảo dưỡng theo Km',
        fieldLabel: 'Bảo dưỡng theo Km',
        unit: 'km'
    },
    'TanKm': {
        value: 'TanKm',
        label: 'Bảo dưỡng theo Tấn/km',
        fieldLabel: 'Bảo dưỡng theo Tấn/km',
        unit: 'tấn/km'
    }
};

export function getDonViTinhSanLuongContext(val?: string): DonViTinhSanLuongContext {
    if (!val) {
        return DON_VI_TINH_SAN_LUONG_CONFIG['SanLuong'];
    }
    const clean = val.trim().toLowerCase();
    if (clean === 'gio' || clean.includes('giờ') || clean === 'hour') {
        return DON_VI_TINH_SAN_LUONG_CONFIG['Gio'];
    }
    if (clean === 'tankm' || clean.includes('tấn/km') || clean.includes('tan/km')) {
        return DON_VI_TINH_SAN_LUONG_CONFIG['TanKm'];
    }
    if (clean === 'km') {
        return DON_VI_TINH_SAN_LUONG_CONFIG['Km'];
    }
    return DON_VI_TINH_SAN_LUONG_CONFIG['SanLuong'];
}
