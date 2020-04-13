//左侧导航栏配置
//引入图标
import {
    UsergroupAddOutlined,
    HomeOutlined,
    RedditOutlined,
    DeploymentUnitOutlined,
    DesktopOutlined,
    MailOutlined,
} from '@ant-design/icons';

const menuList = [
    {
        title:"首页",
        key:"/home",
        icon:HomeOutlined
    },
    {
        title: "管理员中心",
        key: "/user",
        icon: DesktopOutlined,
    },
    {
        title: "人员管理",
        key: "elder",
        icon: RedditOutlined,
        children: [
            {
                title: "人员信息统计",
                key: "/elder",
                icon: RedditOutlined,
            },
            {
                title: "人员信息详情",
                key: "/elderInfo/:id",
                icon: RedditOutlined,
            },
            {
                title: "人员管理333",
                key: "/elder3",
                icon: RedditOutlined,
            },
        ]
    },
    {
        title: "社区管理",
        key: "community",
        icon: UsergroupAddOutlined,
        children: [
            {
                title: "社区信息",
                key: "/community",
                icon: UsergroupAddOutlined,
            },
            {
                title: "社区详情",
                key: "/communityInfo/:id",
                icon: UsergroupAddOutlined,
            },
            {
                title: "社区信息修改",
                key: "/updateCommunity",
                icon: UsergroupAddOutlined,
            },
        ]
    },
    {
        title: "互助管理",
        key: "assistance",
        icon: MailOutlined,
        children: [
            {
                title: "互助管理111",
                key: "/assistance1",
                icon: MailOutlined,
            },
            {
                title: "互助管理22",
                key: "/assistance2",
                icon: MailOutlined,
            },
            {
                title: "互助管理333",
                key: "/assistance3",
                icon: MailOutlined,
            },
        ]
    },
    {
        title: "关于系统",
        key: "about",
        icon: DeploymentUnitOutlined,
       
    },
]

export default menuList;