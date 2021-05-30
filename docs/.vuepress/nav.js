module.exports = [

    {
        text: '前端',
        items: [
            { text: 'Js&Jquery', link: '/baodian/zero/' },
            { text: 'H5', link: '/baodian/high/' },
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
                    { text: 'Jenkins的应用', link: '/container/jenkins/jenkins-apply-springboot' }
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
         
        ]
    },

    {
        text: '生活点滴',
        items: [
            { text: '生活', link: '/life/life/one' },
            { text: '旅游', link: '/life/travel/xiamen' },
        ]
    },
]
