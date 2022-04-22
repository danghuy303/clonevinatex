import { KhauHaoTaiSanModalComponent } from '../khau-hao-tai-san-quy-trinh/khau-hao-tai-san-modal/khau-hao-tai-san-modal.component';
import { LapkehoachlichxichnamComponent } from '../lapkehoachlichxichnam/lapkehoachlichxichnam.component';
import { LapkehoachthangComponent } from '../lapkehoachthang/lapkehoachthang.component';
import { ModalcapnhatbaogiaComponent } from '../modal/modalcapnhatbaogia/modalcapnhatbaogia.component';
import { ModalthanhlytaisanComponent } from '../modal/modalthanhlytaisan/modalthanhlytaisan.component';
import { ModalthuhoitaisanComponent } from '../modal/modalthuhoitaisan/modalthuhoitaisan.component';
import { NhapvattuComponent } from '../nhapvattu/nhapvattu.component';
import { VattucanthayComponent } from '../vattucanthay/vattucanthay.component';

export const QuyTrinh = {
  BAOCAOSUCOSUACHUA: {
    Component: "",
    ServiceProp: "",
    ServiceMethod: "",
    ModalPrototype: "GetQuyTrinh",
    ModalType: "CallIn"
  },
  QUYTRINHBANGIAOTAISAN: {
    Component: ModalcapnhatbaogiaComponent,
    ServiceProp: "BanGiaoTaiSan",
    ServiceMethod: "Get",
    ModalPrototype: "GetQuyTrinh",
    ModalType: "CallIn"
  },
  QUYTRINHKHAUHAOTAISAN: {
    Component: KhauHaoTaiSanModalComponent,
    ServiceProp: "KhauHaoTaiSan",
    ServiceMethod: "Get",
    ModalPrototype: "",
    ModalType: "CallOut"
  },
  DENGHITHAYDOIVATTU: {
    Component: VattucanthayComponent,
    ServiceProp: "QuyTrinhDeNghiThayVatTu",
    ServiceMethod: "Get",
    ModalPrototype: "",
    ModalType: "CallOut"
  },
  LAPKEHOACHLICHXICHNAM: {
    Component: LapkehoachlichxichnamComponent,
    ServiceProp: "ListLichXichNam",
    ServiceMethod: "Get",
    ModalPrototype: "",
    ModalType: "CallOut"
  },
  LAPKEHOACHLICHXICHTHANG: {
    Component: LapkehoachthangComponent,
    ServiceProp: "LichXichThang",
    ServiceMethod: "Get",
    ModalPrototype: "",
    ModalType: "CallOut"
  },
  // NHAPKHAUHAOTAISAN: {
  //   Component: LapkehoachlichxichnamComponent,
  //   ServiceProp: "QuyTrinhDeNghiThayVatTu",
  //   ServiceMethod: "Get",
  //   ModalPrototype: "",
  //   ModalType: "CallOut"
  // },
  NHAPVATTUDUTRU: {
    Component: NhapvattuComponent,
    ServiceProp: "QuyTrinhNhapTu",
    ServiceMethod: "Get",
    ModalPrototype: "",
    ModalType: "CallOut"
  },
  QUYTRINHBAODUONGTAISAN: {
    Component: LapkehoachlichxichnamComponent,
    ServiceProp: "QuyTrinhDeNghiThayVatTu",
    ServiceMethod: "Get",
    ModalPrototype: "",
    ModalType: "CallOut"
  },
  QUYTRINHDIEUCHUYENTAISAN: {
    Component: LapkehoachlichxichnamComponent,
    ServiceProp: "QuyTrinhDeNghiThayVatTu",
    ServiceMethod: "Get",
    ModalPrototype: "",
    ModalType: "CallOut"
  },
  QUYTRINHNHAPTAISAN: {
    Component: LapkehoachlichxichnamComponent,
    ServiceProp: "QuyTrinhDeNghiThayVatTu",
    ServiceMethod: "Get",
    ModalPrototype: "",
    ModalType: "CallOut"
  },
  QUYTRINHTHANHLYTAISAN: {
    Component: LapkehoachlichxichnamComponent,
    ServiceProp: "QuyTrinhDeNghiThayVatTu",
    ServiceMethod: "Get",
    ModalPrototype: "",
    ModalType: "CallOut"
  },
  QUYTRINHTHOIHANCUNGCAP: {
    Component: LapkehoachlichxichnamComponent,
    ServiceProp: "QuyTrinhDeNghiThayVatTu",
    ServiceMethod: "Get",
    ModalPrototype: "",
    ModalType: "CallOut"
  },
  QUYTRINHTHUHOITAISAN: {
    Component: ModalthuhoitaisanComponent,
    ServiceProp: "PhieuThuHoiTaiSan",
    ServiceMethod: "Get",
    ModalPrototype: "",
    ModalType: "CallOut"
  },
  QUYTRINHXULYSUCO: {
    Component: LapkehoachlichxichnamComponent,
    ServiceProp: "QuyTrinhDeNghiThayVatTu",
    ServiceMethod: "Get",
    ModalPrototype: "",
    ModalType: "CallOut"
  },
  THANHLYTAISAN: {
    Component: ModalthanhlytaisanComponent,
    ServiceProp: "ThanhLyTaiSan",
    ServiceMethod: "Get",
    ModalPrototype: "",
    ModalType: "CallOut"
  },
}