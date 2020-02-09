import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Material from "@angular/material";
import {DragDropModule} from '@angular/cdk/drag-drop'; 
import { MatProgressButtonsModule } from 'mat-progress-buttons';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Material.MatToolbarModule,
    Material.MatGridListModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatRadioModule,
    Material.MatSelectModule,
    Material.MatCheckboxModule,
    Material.MatDatepickerModule,
    Material.MatNativeDateModule,
    Material.MatButtonModule,
    Material.MatSnackBarModule,
    Material.MatTableModule,
    Material.MatIconModule,
    Material.MatPaginatorModule,
    Material.MatSortModule,
    Material.MatDialogModule,
    Material.MatCardModule,
    Material.MatListModule,
    Material.MatProgressBarModule,
    Material.MatSidenavModule,
    Material.MatMenuModule,
    Material.MatTreeModule,
    Material.MatChipsModule,
    Material.MatExpansionModule,
    Material.MatBadgeModule,
    Material.MatProgressSpinnerModule,
    Material.MatTabsModule,
    DragDropModule,
    MatProgressButtonsModule.forRoot()
 
    
  ],
  exports:[
    Material.MatToolbarModule,
    Material.MatGridListModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatRadioModule,
    Material.MatSelectModule,
    Material.MatCheckboxModule,
    Material.MatDatepickerModule,
    Material.MatNativeDateModule,
    Material.MatButtonModule,
    Material.MatSnackBarModule,
    Material.MatTableModule,
    Material.MatIconModule,
    Material.MatPaginatorModule,
    Material.MatSortModule,
    Material.MatDialogModule,
    Material.MatCardModule,
    Material.MatListModule,
    Material.MatProgressBarModule,
    Material.MatSidenavModule,
    Material.MatMenuModule,
    Material.MatTreeModule,
    Material.MatChipsModule,
    Material.MatExpansionModule,
    Material.MatBadgeModule,
    Material.MatProgressSpinnerModule,
    Material.MatTabsModule,
    DragDropModule,
    MatProgressButtonsModule
  ]
})
export class MaterialModule { }
