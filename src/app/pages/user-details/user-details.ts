import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-details',
  imports: [RouterModule],
  templateUrl: './user-details.html',
  styleUrl: './user-details.scss',
})
export class UserDetailsComponent {

  userService = inject(UserService);

  users = this.userService.getUsers();

}
