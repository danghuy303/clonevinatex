import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    private isLoadingUser = false; // Flag để tránh gọi GetCurrentUser() nhiều lần đồng thời

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
    ) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        (window as any).routeSnapShot = state.url;

        // Kiểm tra xem có access_token trong localStorage không
        const accessToken = localStorage.getItem('access_token');

        if (!accessToken || !this.authenticationService.isTokenValid()) {
            // Nếu không có token hoặc token không hợp lệ (hết hạn), điều hướng về reporteos/#/login
            this.authenticationService.logout();
            return false;
        }

        // Nếu có token, kiểm tra xem currentUser có tồn tại và hợp lệ không
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser && this.authenticationService.isUserValid(currentUser)) {
            // User đã đăng nhập hợp lệ, cho phép truy cập
            return true;
        }

        // Nếu đang load user info, chờ đợi
        if (this.isLoadingUser) {
            return false;
        }

        // Token tồn tại nhưng chưa có thông tin user hợp lệ, gọi GetCurrentUser
        this.isLoadingUser = true;
        try {
            const user: any = await this.authenticationService.GetCurrentUser().toPromise();
            if (!this.authenticationService.isUserValid(user)) {
                // GetCurrentUser trả về "Chưa đăng nhập" hoặc không hợp lệ -> chuyển về reporteos
                console.warn('GetCurrentUser returned unauthenticated or invalid user:', user);
                this.authenticationService.logout();
                return false;
            }
            // Nếu thành công và hợp lệ, cho phép truy cập
            (window as any).autoLogin = true;
            return true;
        } catch (error) {
            // Nếu lỗi (token hết hạn hoặc không hợp lệ), điều hướng về reporteos/#/login
            console.error('Failed to get current user:', error);
            this.authenticationService.logout();
            return false;
        } finally {
            this.isLoadingUser = false;
        }
    }
}
