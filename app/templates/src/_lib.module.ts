import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
<% if(!skipStyles){ %>
import { LibComponent } from './component/lib.component';<% } %>
import { LibService } from './service/lib.service';

// Export module's public API<% if(!skipStyles){ %>
export { LibComponent } from './component/lib.component';<% } %>
export { LibService } from './service/lib.service';

@NgModule({
  imports: [
    CommonModule
  ]<% if(!skipStyles){ %>,
  exports: [LibComponent],
  declarations: [LibComponent]<% } %>
})
export class LibModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LibModule,
      providers: [LibService]
    };
  }
}
