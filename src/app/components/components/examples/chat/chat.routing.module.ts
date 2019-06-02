import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from 'src/app/components/components/examples/chat/chat.component';

const routes: Routes = [{
  path: '',
  component: ChatComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})

export class ChatRoutingModule { }