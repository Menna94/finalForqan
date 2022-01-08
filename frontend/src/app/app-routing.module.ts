import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonorsComponent } from './pages/donors/donors.component';
import { HomeComponent } from './pages/home/home.component';
import { RecipientsComponent } from './pages/recipients/recipients.component';
import { RegisterComponent } from './pages/register/register.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { StoreComponent } from './pages/store/store.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'store', component: StoreComponent },
  { path: 'donors', component: DonorsComponent },
  { path: 'recipients', component: RecipientsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
