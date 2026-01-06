export const adminMenu = [
    { //quan ly nguoi dung
        name: 'menu.admin.manage-users', menus: [
            {
                name: 'menu.admin.crud', link: '/system/user-manage'
            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'
            },
            {
                name: 'menu.admin.manage-doctors', link: '/system/doctor-manage'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },
            // {
            //     name: 'menu.admin.manage-admin', link: '/system/admin-manage'
            // },
            { //quan ly ke hoac kham benh

                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'
            }
        ]
    },

    { //quan ly phong kham
        name: 'menu.admin.clinic', menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/clinic-manage'
            },
        ]
    },

    { //quan ly chuyen khoa
        name: 'menu.admin.specialty', menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/specialty-manage'
            },
        ]
    },

    { //quan ly bai dang
        name: 'menu.admin.handbook', menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/handbook-manage'
            },
        ]
    },

];

export const doctorMenu = [
    {
        name: 'menu.admin.manage-users',
        menus: [
            {
                // Quản lý thông tin bác sĩ (trang cấu hình hồ sơ bác sĩ)
                name: 'menu.admin.manage-doctors',
                link: '/system/doctor-manage'
            },
            {
                // Quản lý lịch khám của bác sĩ
                name: 'menu.doctor.manage-schedule',
                link: '/doctor/manage-schedule'
            }
        ]
    }
];