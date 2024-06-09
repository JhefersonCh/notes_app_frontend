class NavigationService {
  navigate = null;

  setNavigate(navigateFunction) {
    this.navigate = navigateFunction;
  }

  dynamicUrl(url) {
    if (this.navigate) {
      this.navigate(url);
    } else {
      console.error('Navigate function is not set');
    }
  }
}

const navigationService = new NavigationService();
export default navigationService;