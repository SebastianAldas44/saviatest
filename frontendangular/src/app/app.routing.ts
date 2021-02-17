import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListPersonaComponent } from './components/persona/list-persona/list-persona.component';
import { CreatePersonaComponent } from './components/persona/create-persona/create-persona.component';
import { EditPersonaComponent } from './components/persona/edit-persona/edit-persona.component';

const AppRoutes: Routes = [
	{ path: '', component: ListPersonaComponent },
	{ path: 'crear', component: CreatePersonaComponent },
	{ path: 'editar/:id', component: EditPersonaComponent }
];

export const AppRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(AppRoutes);