const NavigationService = {
  navigateToRoot: () => {
    const path: string = location.protocol + "//" + location.host;
    window.location.href = path;
  },
  getApiEndPointURL: ({ endPoint = "list-engines" }) =>
    `${window?.location?.protocol || "http:"}//${
      window?.location?.host || "localhost:3000"
    }/api/${endPoint}`,
};

export default NavigationService;
