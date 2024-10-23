import ViewModel from "../schema/view-model";

class ViewService {
  private readonly viewModel;

  constructor() {
    this.viewModel = ViewModel;
  }
}

export default ViewService;