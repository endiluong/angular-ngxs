import { State, Selector, Action, StateContext } from '@ngxs/store';
import { StartOver, AddTopping, RemoveTopping } from './salad.actions';

export class SaladStateModel {
  dressing: string;
  price: number;
  toppings: string[];
}
const defaults: SaladStateModel = {
  dressing: 'ranch',
  price: 9.99,
  toppings: []
};

@State<SaladStateModel>({
  name: 'salad',
  defaults
})
export class SaladState {
  @Selector()
  static getDressing(state: SaladStateModel) {
    return state.dressing.toLocaleUpperCase();
  }

  @Action(AddTopping)
  addTopping(context: StateContext<SaladStateModel>, action: AddTopping) {
    const current = context.getState();
    const toppings = [...current.toppings, action.payload];
    context.patchState({
      toppings,
      price: current.price + 0.5
    });
  }

  @Action(RemoveTopping)
  RemoveTopping(
    { patchState, getState }: StateContext<SaladStateModel>,
    action: RemoveTopping
  ) {
    patchState({
      toppings: getState().toppings.filter(
        topping => topping !== action.payload
      ),
      price: getState().price - 0.5
    });
  }

  @Action(StartOver)
  reset({ setState }: StateContext<SaladStateModel>) {
    setState({ ...defaults });
  }
}
