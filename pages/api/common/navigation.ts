const NavigationService = {
    navigateToRoot: () => {
        const path: string = location.protocol + '//' + location.host;
        window.location.href = path;
    },
};

export default NavigationService;