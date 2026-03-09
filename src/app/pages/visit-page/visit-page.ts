import { Component, effect, inject, signal } from '@angular/core';
import { UserService } from '../../services/user-service';
import { CommonModule, Location } from '@angular/common';
import { DialogService } from '../../services/dialog-service';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { finalize, timer } from 'rxjs';
@Component({
  selector: 'app-visit-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './visit-page.html',
  styleUrl: './visit-page.scss',
})
export class VisitPage {

  userService = inject(UserService);
  dialogService = inject(DialogService);
  location = inject(Location);

  characters = signal<any[]>([]);
  page = signal<number>(1);
  loading = signal(true);
  selectedIndex = signal<number | null>(null);

  recordsToShow = signal<number>(10);
  fb = inject(FormBuilder);

  editForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    gender: ['', Validators.required],
    location: ['', Validators.required]
  });
  constructor() {

    effect(() => {
      const currentPage = this.page();
      this.loading.set(true);
      this.userService
        .getCharacters(currentPage).pipe(
          finalize(() => {
            timer(1000).subscribe(() => this.loading.set(false));
          })
        )
        .subscribe(res => {
          this.characters.set(res.results);
        });
    });

  }

  selectRow(index: number) {
    this.selectedIndex.set(index);
  }

  clearSelection() {
    this.selectedIndex.set(null);
  }

  deleteRow() {
    this.dialogService.openConfirmDeleteDialog().afterClosed().subscribe(result => {
      if (result) {
        const index = this.selectedIndex();
        if (index === null) return;
        const updated = [...this.characters()];
        updated.splice(index, 1);
        this.characters.set(updated);
        this.selectedIndex.set(null);
      }

    });

  }

  editRow(template: any) {
    const index = this.selectedIndex();
    if (index === null) return;
    const character = this.characters()[index];
    this.editForm.patchValue({
      name: character.name,
      gender: character.gender,
      location: character.location.name
    });
    this.dialogService.openTemplateDialog(template);
  }

  saveEdit() {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }
    const index = this.selectedIndex();
    if (index === null) return;
    const updated = [...this.characters()];
    updated[index] = {
      ...updated[index],
      name: this.editForm.value.name,
      gender: this.editForm.value.gender,
      location: {
        ...updated[index].location,
        name: this.editForm.value.location
      }
    };
    this.characters.set(updated);
    this.dialogService.closeAllDialogs();
  }

  changeRecords(count: number) {
    this.recordsToShow.set(count);
  }
  goBack() {
    this.location.back();
  }
  prevPage() {
    if (this.page() > 1) {
      this.page.update(p => p - 1);
    }
  }

  nextPage() {
    this.page.update(p => p + 1);
  }
}
