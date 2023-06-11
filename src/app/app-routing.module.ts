import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScoreComponent } from './homepage/score/score.component';
import { HomepageComponent } from './homepage/homepage.component';
import { InputComponent } from './homepage/input/input.component';

const routes: Routes = [
  { path: '', component: HomepageComponent,children: [
    { path: 'score', component: ScoreComponent },
    { path: 'input', component: InputComponent },
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
