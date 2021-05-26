module.exports = [

    {
        text: '懵逼指南', link: '/guide/'
    },
    {
        text: '面试宝典',
        items: [
            { text: '初级开发篇', link: '/baodian/zero/' },
            { text: '中高进阶篇', link: '/baodian/high/' },
        ]
    },
    {
        text: '容器&服务器&运维',
        items: [
            {
                text: 'Docker', items: [
                    { text: 'Docker基础', link: '/container/docker/docker-basic' },
                    { text: 'Docker应用', link: '/container/docker/docker-apply' }
                ]
            },
            {
                text: 'Jenkins', items: [
                    { text: 'Jenkins安装', link: '/container/jenkins/jenkins-inst' },
                    { text: 'Jenkins的应用', link: '/container/jenkins/jenkins-apply' }
                ]
            }, {
                text: 'Nginx', items: [
                    { text: 'Nginx基础', link: '/container/nginx/nginx-basic' },
                ]
            }

        ]
    },
    // { text: 'TimeLine', link: '/timeline/', icon: 'reco-date' },

    {
        text: '工具箱',
        items: [
            {
                text: '教程链接',
                items: [
                    { text: 'Docker教程', link: 'https://www.runoob.com/docker/docker-tutorial.html' }
                ]
            },
            {
                text: '云服务',
                items: [
                    { text: '阿里云', link: 'https://www.aliyun.com/' }
                    // { text: '腾讯云', link: 'https://cloud.tencent.com/' }
                ]
            }
            // {
            //     text: '博客指南',
            //     items: [
            //         { text: '掘金', link: 'https://juejin.im/' },
            //         { text: 'CSDN', link: 'https://blog.csdn.net/' }
            //     ]
            // }
        ]
    }
]
