const manifestForPlugIn = {
    registerType: 'autoUpdate',
    includeAssests: ['favicon.ico', "logo192.png", "logo512.svg"],
    manifest: {
        name: "pkmn-collect-tool",
        short_name: "pkmn-collect-tool",
        description: "An app to catch them all",
        icons: [{
            src: '/logo192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'favicon'
        },
        {
            src: '/logo512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'favicon'
        },
        {
            src: '/logo192.png',
            sizes: '180x180',
            type: 'image/png',
            purpose: 'apple touch icon',
        },
        {
            src: '/logo512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
        }
        ],
        theme_color: '#171717',
        background_color: '#f0e7db',
        display: "standalone",
        scope: '/',
        start_url: "/",
        orientation: 'portrait'
    }
}

export default manifestForPlugIn;