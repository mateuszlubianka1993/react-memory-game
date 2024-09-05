export const ROUTER_PATHS = {
    HOME: '/',
    ABOUT: '/about',
    NEW_GAME: '/new-game',
};

export const HOMEPAGE_ROUTES = [
    {
        path: ROUTER_PATHS.NEW_GAME,
        text: 'New Game',
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
