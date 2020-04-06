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
                title: "人员管理111",
                key: "/elder1",
                icon: RedditOutlined,
            },
            {
                title: "人员管理22",
                key: "/elder2",
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
                title: "社区管理111",
                key: "/community1",
                icon: UsergroupAddOutlined,
            },
            {
                title: "社区管理22",
                key: "/community2",
                icon: UsergroupAddOutlined,
            },
            {
                title: "社区管理333",
                key: "/community3",
                icon: UsergroupAddOutlined,
            },
        ]
    },
    {
        title: "社区管理",
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
       
    }
]

export default menuList;