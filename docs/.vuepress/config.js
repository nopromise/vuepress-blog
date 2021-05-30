module.exports = {
    title: 'NOPR BLOG',
    description: 'RECORD AND SHARE',

    //build后生成的目录   ./ 是package.json所在的当前目录；默认在.vuepress目录下 
    // dest: './dist',
    port: '7777',
    head: [
        ['link', { rel: 'icon', href: '/img/5.ico' }],
        ["link", { rel: "stylesheet", href: "/css/style.css" }],
        ["script", { charset: "utf-8", src: "/js/main.js" }],//新加入

        ["meta", {name: "robots", content: "all"}],
        ["meta", {name: "author", content: "nopr"}],
        ["meta", {name: "keywords", content: "NOPR,Java 全栈知识体系, java体系, java知识体系, java框架,java详解,java学习路线,java spring, java面试, 知识体系, java技术体系, java编程, java编程指南,java开发体系, java开发,java教程,java,java数据结构, 算法, 开发基础"}],
        ["meta", {name: "apple-mobile-web-app-capable", content: "yes"}]


    ],
    markdown: {
        lineNumbers: true,
        toc: { includeLevel: [2, 3, 4, 5] }
    },

    // theme: 'reco',//主题

    themeConfig: {
        // type: 'blog',
        // 博客配置
        // blogConfig: {
        //     category: {
        //         location: 2,     // 在导航栏菜单中所占的位置，默认2
        //         text: 'Category' // 默认文案 “分类”
        //     },
        //     tag: {
        //         location: 3,     // 在导航栏菜单中所占的位置，默认3
        //         text: 'Tag'      // 默认文案 “标签”
        //     },
        //     socialLinks: [     // 信息栏展示社交信息
        //         { icon: 'reco-github', link: 'https://github.com/recoluan' },
        //         { icon: 'reco-npm', link: 'https://www.npmjs.com/~reco_luan' }
        //     ]
        // },


        // logo: '/img/logo.jpg',

        nav: require("./nav.js"),

        sidebar: require("./sidebar.js"),
        subSidebar: 'auto',//在所有页面中启用自动生成子侧边栏，原 sidebar 仍然兼容
        sidebarDepth: 0,
        lastUpdated: 'Last Updated',
        searchMaxSuggestoins: 10,
        serviceWorker: {
            updatePopup: {
                message: "有新的内容.",
                buttonText: '更新'
            }
        },
        editLinks: true,
        editLinkText: '在 GitHub 上编辑此页 ！'
    },

    // plugins: [
    //     ['@vuepress/back-to-top'],
    //     [['vuepress-plugin-code-copy', true]]
    // ]

    plugins: [
        ['@vuepress/back-to-top'],
        ['vuepress-plugin-code-copy', true],
        //右侧锚点导航栏
        ['vuepress-plugin-right-anchor'],
        // ['@vuepress/medium-zoom', {
        //     selector: 'img',
        //     // See: https://github.com/francoischalifour/medium-zoom#options
        //     options: {
        //       margin: 16
        //     }
        // }],
        // ["vuepress-plugin-toolbar", {
        //     "opts": [
        //         {
        //             "icon": "",
        //             "name": "文本展示",
        //             "popover": {
        //                 "type": "text",
        //                 "title": "纯文本说明",
        //                 "text": "这是一个纯文本的内容展示，就是一段话"
        //             }
        //         }
        //     ]
        // }
        // ]
    ]

}
