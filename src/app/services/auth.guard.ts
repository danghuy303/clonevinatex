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
            // Nếu không có token hoặc token không hợp lệ, redirect về login
            this.router.navigate(['/login']);
            return false;
        }

        // Nếu có token, kiểm tra xem currentUser có tồn tại không
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            // User đã đăng nhập, cho phép truy cập
            return true;
        }

        // Nếu đang load user info, chờ đợi
        if (this.isLoadingUser) {
            return false;
        }

        // Token tồn tại nhưng chưa lấy thông tin user, gọi GetCurrentUser
        this.isLoadingUser = true;
        try {
            await this.authenticationService.GetCurrentUser().toPromise();
            // Nếu thành công, cho phép truy cập
            (window as any).autoLogin = true;
            return true;
        } catch (error) {
            // Nếu lỗi (token hết hạn hoặc không hợp lệ), redirect về login
            console.error('Failed to get current user:', error);
            localStorage.removeItem('access_token');
            localStorage.removeItem('currentUser');
            this.router.navigate(['/login']);
            return false;
        } finally {
            this.isLoadingUser = false;
        }
    }
}
