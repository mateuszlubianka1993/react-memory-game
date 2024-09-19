export const ROUTER_PATHS = {
    ROOT: '/',
    HOME: '/',
    ABOUT: '/about',
    NEW_GAME: '/new-game',
    BEST_RESULTS: '/best-results',
};

export const HOMEPAGE_ROUTES = [
    {
        path: ROUTER_PATHS.NEW_GAME,
        text: 'New Game',
    },
    {
        path: ROUTER_PATHS.BEST_RESULTS,
        text: 'Results',
    },
    {
        path: ROUTER_PATHS.ABOUT,
        text: 'About',
    },
];

export default {
    ROUTER_PATHS,
    HOMEPAGE_ROUTES,
};
