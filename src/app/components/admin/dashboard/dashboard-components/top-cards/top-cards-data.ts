export interface topcard {
    bgcolor: string,
    icon: string,
    subtitle: string
}

export const topcards: topcard[] = [

    {
        bgcolor: 'success',
        icon: 'bi bi-wallet',
        subtitle: 'Doanh Thu Tổng'
    },
    {
        bgcolor: 'danger',
        icon: 'bi bi-coin',
        subtitle: 'Doanh Thu Tour'
    },
    {
        bgcolor: 'warning',
        icon: 'bi bi-basket3',
        subtitle: 'Doanh Thu Khách Sạn'
    },
    {
        bgcolor: 'info',
        icon: 'bi bi-bag',
        subtitle: 'Doanh Thu Máy Bay'
    },

]
