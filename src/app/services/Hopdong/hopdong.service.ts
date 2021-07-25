import { StoreService } from './../store.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { httpOptions, API } from './../host';
import { number } from '@amcharts/amcharts4/core';
@Injectable({
    providedIn: 'root'
})
export class HopDongService {
    constructor(private http: HttpClient,private store: StoreService) { }

//    QuyTrinhHopDong() {
//         let url = API.HopDong;
//         return {
//             GetList: (data) => {
             
//                 data.idDuAn = this.store.getCurrent();
//                 return this.http.post(url + 'HopDong/GetListQuyTrinhHopDong', data, httpOptions);
//             },
//             Get: (Id) => {
//                 return this.http.get(url + `HopDong/GetQuyTrinhHopDong?Id=${Id}`, httpOptions);
//             },
//             Set: (data) => {
//                 return this.http.post(url + 'HopDong/SetQuyTrinhHopDong', data, httpOptions);
//             },
//             Deletes: (data) => {
//                 return this.http.post(url + 'HopDong/DeleteQuyTrinhHopDong', data, httpOptions);
//             },
//         }
//     }


    QuyTrinhHopDong() {
        let url = API.HopDong;
        return {
         
            GetList: (data) => {
                console.log(data);
                data.idDuAn  =53
                return this.http.post(url + 'HopDong/GetListQuyTrinhHopDong', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `HopDong/GetQuyTrinhHopDong?Id=${Id}`, httpOptions);
            },
            // Set: (data) => {
            //     return this.http.post(url + 'SetGiaoKeHoachSanXuat', data, httpOptions);
            // },
            // Delete: (data) => {
            //     return this.http.post(url + 'DeleteGiaoKeHoachSanXuat', data, httpOptions);
            // },

        }
    }

}
