import { State, Action, StateContext, Actions, ofAction } from '@ngxs/store';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

export class Navigate {
  static readonly type = '[router] navigate';
  constructor(public payload: string) {}
}

@State<string>({
  name: 'router',
  defaults: ''
})
export class RouterState {
  // Awesome feature of NGXS ==> Directly inject angular's service
  constructor(private router: Router) {}

  @Action(Navigate)
  async changeRoute(context: StateContext<string>, action: Navigate) {
    const path = action.payload;
    await this.router.navigate([path]);
    context.setState(path);
  }
}
// Listen to Event stream
@Injectable()
export class RouteHandler {
  constructor(private router: Router, private action$: Actions) {
    this.action$
      .pipe(ofAction(Navigate))
      .subscribe(({ payload }) => this.router.navigate([payload]));
  }
}
