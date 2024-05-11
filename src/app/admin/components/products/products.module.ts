import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component'; 
import {MatFormFieldModule } from '@angular/material/form-field'; 
import {MatInputModule  } from '@angular/material/input'; 
import {MatButtonModule} from '@angular/material/button'; 
import {MatTableModule} from '@angular/material/table'; 
import { MatPaginator } from '@angular/material/paginator';
import { DeleteDirective } from '../../../directives/admin/delete.directive';
import {MatDialogModule} from '@angular/material/dialog'; 
import { DeleteDialogComponent } from '../../../dialog/delete-dialog/delete-dialog.component'; 
import { FileuploadComponent } from '../../../services/common/fileupload/fileupload.component';
import { FileuploadModule } from '../../../services/common/fileupload/fileupload.module';

@NgModule({
    declarations: [
        ProductsComponent,
        CreateComponent,
        ListComponent,
        DeleteDirective,
        DeleteDialogComponent
    ],
    imports: [
        CommonModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatTableModule,
        MatPaginator,
        MatDialogModule,
        RouterModule.forChild([
            { path: "", component: ProductsComponent }
        ]),
        FileuploadModule
    ]
})
export class ProductsModule { }
