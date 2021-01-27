import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutLoginHeaderComponent } from './layout/layout-login-header/layout-login-header.component';
import { LayoutLoginFooterComponent } from './layout/layout-login-footer/layout-login-footer.component';
import { AccionesFirebaseComponent } from './acciones-firebase/acciones-firebase.component';

@NgModule({
  declarations: [LayoutLoginHeaderComponent, LayoutLoginFooterComponent, AccionesFirebaseComponent],
  imports: [CommonModule],
  exports: [LayoutLoginFooterComponent, LayoutLoginHeaderComponent],
})
export class ComponentsModule {}
