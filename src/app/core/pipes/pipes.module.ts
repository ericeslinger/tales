import { CommonModule } from '@angular/common';
import { ExtractIdPipe } from './extract-id.pipe';
import { NgModule } from '@angular/core';
import { SkillsortPipe } from './skillsort.pipe';
import { SortByPipe } from './sort-by.pipe';
import { TrackByPropertyPipe } from './trackbyproperty.pipe';

@NgModule({
  declarations: [TrackByPropertyPipe, SkillsortPipe, SortByPipe, ExtractIdPipe],
  imports: [CommonModule],
  exports: [TrackByPropertyPipe, SkillsortPipe, SortByPipe, ExtractIdPipe],
})
export class PipesModule {}
